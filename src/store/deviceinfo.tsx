import { Storage } from "@capacitor/storage";
import { time, timeStamp } from "console";

export const setDeviceInfo = async (deviceid) => {
  await Storage.set({
    key: "deviceid",
    value: deviceid,
  });
};

export const doNextUpdate = async (timestamp) => {
  const updateInterval = 1000 //milliseconden

  const lastUpdateTimeStamp = await Storage.get({
    key: "lastUpdate",
  });

  if(+lastUpdateTimeStamp.value > 0){

    if(+lastUpdateTimeStamp.value <= (timestamp - updateInterval)){
      //console.log(lastUpdateTimeStamp.value + " - " + timestamp + " -> true");
      await Storage.set({
        key: "lastUpdate",
        value: timestamp,
      });
      return true;
    } else {
      //console.log(lastUpdateTimeStamp.value + " - " + timestamp + " -> false");
      return false;
    }
  } else {
    await Storage.set({
      key: "lastUpdate",
      value: timestamp,
    });
    //console.log(lastUpdateTimeStamp.value + " - " + timestamp + " -> true");
    return true;
  }
}

export const setLocation = async (longitude, latitude) => {
  await setLongitude(longitude);
  await setLatitude(latitude);
};

export const checkChangedLocation = async (longitude, latitude) => {
  const storageLongitude = await Storage.get({
    key: "longitude",
  });
  const storageLatitude = await Storage.get({
    key: "latitude",
  });
  if (longitude === storageLongitude && latitude === storageLatitude) {
    return false;
  } else {
    return true;
  }
};

const setLongitude = async (longitude) => {
  await Storage.set({
    key: "longitude",
    value: longitude,
  });
};

const setLatitude = async (latitude) => {
  await Storage.set({
    key: "latitude",
    value: latitude,
  });
};

export const getDeviceInfo = async () => {
  const deviceid = await Storage.get({
    key: "deviceid",
  });
  return deviceid.value;
};

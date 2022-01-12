import { Storage } from "@capacitor/storage";

// store the device id in the local storage
export const setDeviceInfo = async (deviceid) => {
  await Storage.set({
    key: "deviceid",
    value: deviceid,
  });
};

// this is a check to see if we can already update the users location in the local storage
export const doNextUpdate = async (timestamp) => {
  const updateInterval = 1000 //milliseconden

  const lastUpdateTimeStamp = await Storage.get({
    key: "lastUpdate",
  });

  if(+lastUpdateTimeStamp.value > 0){

    if(+lastUpdateTimeStamp.value <= (timestamp - updateInterval)){
      await Storage.set({
        key: "lastUpdate",
        value: timestamp,
      });
      return true;
    } else {
      return false;
    }
  } else {
    await Storage.set({
      key: "lastUpdate",
      value: timestamp,
    });
    return true;
  }
}

// set the users location by longitude and latitude in the local storage
export const setLocation = async (longitude, latitude) => {
  await setLongitude(longitude);
  await setLatitude(latitude);
};

// check to see if the users have moved (android app is pretty accurate)
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

// set the users longitude in the local storage
const setLongitude = async (longitude) => {
  await Storage.set({
    key: "longitude",
    value: longitude,
  });
};


// set the users latitude in the local storage
const setLatitude = async (latitude) => {
  await Storage.set({
    key: "latitude",
    value: latitude,
  });
};

// give the user device id back to the frontend
export const getDeviceInfo = async () => {
  const deviceid = await Storage.get({
    key: "deviceid",
  });
  return deviceid.value;
};

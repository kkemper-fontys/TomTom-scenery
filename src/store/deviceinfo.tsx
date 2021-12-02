import { Storage } from "@capacitor/storage";

export const setDeviceInfo = async (deviceid) => {
  await Storage.set({
    key: "deviceid",
    value: deviceid,
  });
};

export const getDeviceInfo = async () => {
  const deviceid = await Storage.get({
    key: "deviceid",
  });
  return deviceid.value;
};

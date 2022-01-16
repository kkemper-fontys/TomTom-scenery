import { Storage } from "@capacitor/storage";

export let poiStorageLength = 0;

// get the users favorite categories by id stored in the local storage
export const getPois = async () => {
  const pois = await Storage.get({
    key: "pois",
  });
  if (!pois.value) {
    return { poiArray: [] };
  } else {
    const json = JSON.parse(pois.value);
    return json;
  }
};

// add a category to the users favorite categories in the local storage by id
export const setPois = async (
  name: string,
  lon: string,
  lat: string,
  categoryId: number
) => {
  const { poiArray } = await getPois();
  const tempArr = [...poiArray];
  tempArr.push({ name, lon, lat, categoryId });
  poiStorageLength++;
  await Storage.set({
    key: "pois",
    value: JSON.stringify({ poiArray: tempArr }),
  });
};

// remove a category to the users favorite categories in the local storage by id
export const removeStorageCategories = async (givenName: string) => {
  const { poiArray } = await getPois();
  const tempArr = [...poiArray];
  const newArray = tempArr.filter((name) => name != givenName);
  poiStorageLength--;
  await Storage.set({
    key: "pois",
    value: JSON.stringify({ poiArray: newArray }),
  });
};

import { Storage } from "@capacitor/storage";

export let categoryStorageLength = 0;
export let subCategory = false;
export let subCatSelected = false;

export const getStorageCategories = async () => {
  const categories = await Storage.get({
    key: "categories",
  });
  if (!categories.value) {
    return { categoryArray: [] };
  } else {
    const json = JSON.parse(categories.value);
    return json;
  }
};

export const getApiCategories = async () => {
  const categories = await Storage.get({
    key: "categories",
  });
  const string = JSON.parse(categories.value).categoryArray.join();
  return string;
};

export const getCategoryById = async (catID) => {
  const { categoryArray } = await getStorageCategories();
  const tempArr = [...categoryArray];
  if (tempArr.indexOf(catID) < 0) {
    return false;
  } else {
    return true;
  }
};

export const setStorageCategories = async (catID: number) => {
  const { categoryArray } = await getStorageCategories();
  const tempArr = [...categoryArray];
  tempArr.push(catID);
  categoryStorageLength++;
  await Storage.set({
    key: "categories",
    value: JSON.stringify({ categoryArray: tempArr }),
  });
};

export const removeStorageCategories = async (catID: number) => {
  const { categoryArray } = await getStorageCategories();
  const tempArr = [...categoryArray];
  const newArray = tempArr.filter((id) => id != catID);
  categoryStorageLength--;
  await Storage.set({
    key: "categories",
    value: JSON.stringify({ categoryArray: newArray }),
  });
};

export const getCategoryStorageLength = async () => {
  const { categoryArray } = await getStorageCategories();
  const tempArr = [...categoryArray];
  return { length: tempArr.length };
};

export const toggleCategorySet = async () => {
  if (subCategory) {
    subCategory = false;
  } else {
    subCategory = true;
  }
};

export const setSubCat = (subType) => {
  subCategory = subType;
};

export const setSubCatSelected = () => {
  subCatSelected = true;
}
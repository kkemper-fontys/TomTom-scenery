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

export const getStorageCategoriesName = async () => {
  const categories = await Storage.get({
    key: "catName",
  });
  if (!categories.value) {
    return { catNameArray: [] };
  } else {
    const json = JSON.parse(categories.value);
    return json;
  }
};

export const setStorageCategories = async (catID: number, catName: string) => {
  const { categoryArray } = await getStorageCategories();
  const tempArr = [...categoryArray];
  tempArr.push(catID);
  categoryStorageLength++;
  await Storage.set({
    key: "categories",
    value: JSON.stringify({ categoryArray: tempArr }),
  });

  const { catNameArray } = await getStorageCategoriesName();
  const tempArray = [...catNameArray];
  tempArray.push(catName);
  await Storage.set({
    key: "catName",
    value: JSON.stringify({ catNameArray: tempArray }),
  });
};

export const removeStorageCategories = async (catID: number, catName: string) => {
  const { categoryArray } = await getStorageCategories();
  const tempArr = [...categoryArray];
  const newArray = tempArr.filter((id) => id != catID);
  categoryStorageLength--;
  await Storage.set({
    key: "categories",
    value: JSON.stringify({ categoryArray: newArray }),
  });

  const { catNameArray } = await getStorageCategoriesName();
  const tempArray = [...catNameArray]; 
  const newNameArray = tempArray.filter((originalName) => originalName != catName);
  await Storage.set({
    key: "catName",
    value: JSON.stringify({ catNameArray: newNameArray }),
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
};

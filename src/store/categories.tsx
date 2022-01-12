import { Storage } from "@capacitor/storage";

export let categoryStorageLength = 0;
export let subCategory = false;
export let subCatSelected = false;

// get the users favorite categories by id stored in the local storage 
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

// get the users favorite categories by id stored in the local storage
export const getApiCategories = async () => {
  const categories = await Storage.get({
    key: "categories",
  });
  const string = JSON.parse(categories.value).categoryArray.join();
  return string;
};

// check to see if a category is a users favorite category with an id
export const getCategoryById = async (catID) => {
  const { categoryArray } = await getStorageCategories();
  const tempArr = [...categoryArray];
  if (tempArr.indexOf(catID) < 0) {
    return false;
  } else {
    return true;
  }
};

// get the users favorite categories by named stored in the local storage
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

// add a category to the users favorite categories in the local storage by id
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

// remove a category to the users favorite categories in the local storage by id
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

// check how many favorite categories the user has
export const getCategoryStorageLength = async () => {
  const { categoryArray } = await getStorageCategories();
  const tempArr = [...categoryArray];
  return { length: tempArr.length };
};

// change the to show category page from category to subcategory and vise versa
export const toggleCategorySet = async () => {
  if (subCategory) {
    subCategory = false;
  } else {
    subCategory = true;
  }
};

// this variable is to let the frontend know if we want to show subcategories
export const setSubCat = (subType) => {
  subCategory = subType;
};

// this variable is to let the frontend know we already selected subcategories
export const setSubCatSelected = () => {
  subCatSelected = true;
};

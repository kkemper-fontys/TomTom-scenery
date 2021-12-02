import { Storage } from "@capacitor/storage";

const initialLanguage = "nl_nl";
export const availableLanguages = [
  { key: 1, name: "nl_nl", display_name: "NL" },
  { key: 2, name: "en_gb", display_name: "EN" },
  { key: 3, name: "de_de", display_name: "DE" },
];

export const getLanguage = async () => {
  const language = await Storage.get({
    key: "language",
  });
  if (language.value === null) {
    return initialLanguage;
  } else {
    return language.value;
  }
};

export const setLanguage = async (lang) => {
  await Storage.set({
    key: "language",
    value: lang,
  });
};

// const setName = async () => {
//   await Storage.set({
//     key: 'name',
//     value: 'Max',
//   });
// };

// const checkName = async () => {
//   const { value } = await Storage.get({ key: 'name' });

//   alert(`Hello ${value}!`);
// };

// const removeName = async () => {
//   await Storage.remove({ key: 'name' });
// };

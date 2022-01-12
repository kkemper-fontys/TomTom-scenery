import { Storage } from "@capacitor/storage";

// this is the default language for all users (this can be changed to mimic the users default device language)
const initialLanguage = "nl_nl";

// the languages available in the database
export const availableLanguages = [
  { key: 1, name: "nl_nl", display_name: "NL" },
  { key: 2, name: "en_gb", display_name: "EN" },
  { key: 3, name: "de_de", display_name: "DE" },
];

// give the users current language back to the frontend from the local storage
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

// change the users language in the local storage
export const setLanguage = async (lang) => {
  await Storage.set({
    key: "language",
    value: lang,
  });
};
import { availableLanguages, setLanguage } from "../../../store/language";

// this function creates a language selectbox
const Language = (props) => {
  // check the local storage for available languages
  const available_languages = availableLanguages;
  const content = available_languages.map((keyname, i) => (
    <option key={i} value={available_languages[i].name}>
      {available_languages[i].display_name}
    </option>
  ));

  // change the language if we click on a different language
  const languageHandler = (event) => {
    setLanguage(event.target.value);
  };

  // this shows the language selectbox on screen
  return (
    <form className="language_form" onClick={props.onClick}>
      <select name="language" onChange={languageHandler}>
        {content}
      </select>
    </form>
  );
};

export default Language;

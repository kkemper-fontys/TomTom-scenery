import { availableLanguages, setLanguage } from "../../../store/language";

const Language = (props) => {
  const available_languages = availableLanguages;
  const content = available_languages.map((keyname, i) => (
    <option key={i} value={available_languages[i].name}>
      {available_languages[i].display_name}
    </option>
  ));

  const languageHandler = (event) => {
    setLanguage(event.target.value);
  };

  return (
    <form className="language_form" onClick={props.onClick}>
      <select name="language" onChange={languageHandler}>
        {content}
      </select>
    </form>
  );
};

export default Language;

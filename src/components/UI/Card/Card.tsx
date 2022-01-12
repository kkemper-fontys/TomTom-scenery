import { useEffect, useState } from "react";
import {
  getCategoryById,
  removeStorageCategories,
  setStorageCategories,
} from "../../../store/categories";

// this functions creates the category cards
const Card: React.FC<any> = (props) => {
  const [clicked, setClicked] = useState(false);

  // check the local storage to see if the user already selected some categories 
  const checkStorage = async () => {
    return await getCategoryById(props.tomtom_id);
  };

  // check the local storage on the first run of this function
  useEffect(() => {
    checkStorage().then((res) => {
      if (res) {
        setClicked(true);
      }
    })
  });

  // what to do when the user clicks on a category card
  const categoryClickHandler = async () => {

    // check to see if this card was already clicked and marked as a category the user is interested in
    if (!clicked) {
      // if it's not already clicked, push the category to the local storage
      setStorageCategories(props.tomtom_id, props.tomtom_name);
      setClicked(true);
    } else {
      // if it is already clicked, remove the category from the local storage
      removeStorageCategories(props.tomtom_id, props.tomtom_name);
      setClicked(false);
    }
    // delay the click method to give the function time to store it in the local storage
    setTimeout(() => {
      props.onClick();
    }, 100);
  };

  // this is where the card is created
  return (
    <div className={`gradient ${clicked ? "card_clicked" : ""}`} onClick={categoryClickHandler}>
      <div
        className={`card ${props.className ? props.className : ""} ${
          clicked ? "cat_clicked" : ""
        }`}
      >
        {props.children}
      </div>
    </div>
  );
};

export default Card;

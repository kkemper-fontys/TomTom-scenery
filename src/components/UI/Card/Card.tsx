import { useEffect, useState } from "react";
import {
  getCategoryById,
  removeStorageCategories,
  setStorageCategories,
} from "../../../store/categories";

const Card: React.FC<any> = (props) => {
  const [clicked, setClicked] = useState(false);

  const checkStorage = async () => {
    return await getCategoryById(props.tomtom_id);
  };

  useEffect(() => {
    checkStorage().then((res) => {
      if (res) {
        setClicked(true);
      }
    })
  });

  const categoryClickHandler = async () => {
    if (!clicked) {
      setStorageCategories(props.tomtom_id);
      setClicked(true);
    } else {
      removeStorageCategories(props.tomtom_id);
      setClicked(false);
    }
    setTimeout(() => {
      props.onClick();
    }, 100);
  };

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

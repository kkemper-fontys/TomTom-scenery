import ReactDOM from "react-dom";
import { setSubCat, setSubCatSelected, subCategory, toggleCategorySet } from "../../../store/categories";

// the bottomdrop is an overlay to show the buttons and how much (sub)categories the user selected
const BottomDrop = (props) => {

  // what to do when the next button is pressed
  const nextBtnHandler = () => {

    // check to see if we already in the subcategory section
    if(!subCategory){
      setSubCat(true);
    } else {
      setSubCatSelected();
    }
    props.onNextClick();
  };

  // what to do when the previous button is pressed (only visible when we are in the subcategory section)
  const prevBtnHandler = () => {
    setSubCat(false);
    props.onPrevClick();
  };


  // this creates the overlay
  return ReactDOM.createPortal(
    <div className="bottomdrop">
      <div className="bottomdrop-selected"></div>
      <div className="bottomdrop-buttons">
        <div className="bottomdrop-buttons-prevbutton" onClick={prevBtnHandler}>Previous</div>
        <div className="bottomdrop-selected">{props.selected} selected</div>
        <div className="bottomdrop-buttons-nextbutton" onClick={nextBtnHandler}>
          Next
        </div>
      </div>
    </div>,
    document.getElementById("bottomdrop-root")
  );
};

export default BottomDrop;

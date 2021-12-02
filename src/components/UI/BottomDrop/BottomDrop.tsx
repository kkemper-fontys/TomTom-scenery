import ReactDOM from "react-dom";
import { setSubCat, setSubCatSelected, subCategory, toggleCategorySet } from "../../../store/categories";

const BottomDrop = (props) => {
  const nextBtnHandler = () => {
    if(!subCategory){
      setSubCat(true);
    } else {
      setSubCatSelected();
    }
    props.onNextClick();
  };

  const prevBtnHandler = () => {
    setSubCat(false);
    props.onPrevClick();
  };


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

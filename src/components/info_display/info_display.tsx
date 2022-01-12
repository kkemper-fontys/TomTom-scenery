// this functions creates a console popup to debug our code without a debugconsole (in android app)
const InfoDisplay = (props) => {
  return (
    <div className="info_display">
      <div className="info_display-title">Console</div>
      <div>{props.showAlpha}</div>
      <div>{props.showBeta}</div>
      <div>{props.showGamma}</div>
    </div>
  );
};

export default InfoDisplay;

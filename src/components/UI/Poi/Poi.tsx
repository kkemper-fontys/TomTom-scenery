import React from "react";

const Poi = (props) => {
  const screenWidth = window.innerWidth; // check the used width by the browser
  const screenHeight = window.innerHeight; // check the used height by the browser

  const lonItem = props.longitude;
  const latItem = props.latitude;
  const minLon = props.minLon;
  const minLat = props.minLat;
  const maxLon = props.maxLon;
  const maxLat = props.maxLat;

  const xItem = ((lonItem - minLon) / (maxLon - minLon)) * screenWidth;
  const yItem = ((latItem - minLat) / (maxLat - minLat)) * screenHeight;

  const clickHandler = () => {
    alert(props.poiName);
  }

  // console.log(xItem + " - " + yItem)
  return (
    <div onClick={clickHandler}
      className="poi"
      style={{
        top: "calc(" + yItem + "px - 200px)",
        left: "calc(" + xItem + "px - 65px)",
      }}
    >
      <img src={props.image_url} />
      <div className="poi-title">{props.poiName}</div>
      <div className="poi-address">{props.poiAddress}</div>
    </div>
  );
};

export default Poi;

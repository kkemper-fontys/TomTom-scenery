import React from "react";
import { getDeviceInfo } from "../../../store/deviceinfo";

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

  const clickHandler = async () => {
    alert(props.poiName);
    const deviceid = await getDeviceInfo();

    try {
      const apiCall =
        "https://api.keeskemper.nl/key/updateUserCategory/" + deviceid + "/" + props.category_id; // TODO tijd instellen
      const response = await fetch(apiCall); // API call -> wait for response

      if (!response.ok) {
        throw new Error("Something went wrong here");
      }
    } catch (error) {
      console.log(error.message);
    }
  }

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
      <div className="poi-type">{props.poiCategory}</div>
    </div>
  );
};

export default Poi;

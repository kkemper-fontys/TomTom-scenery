// import { useState, useEffect } from "react";

import { IonIcon } from "@ionic/react";
import { navigate } from "ionicons/icons";
import { useEffect, useState } from "react";
import Poi from "../Poi/Poi";
import PoiHolder from "../Poi/PoiHolder";

// import Card from "./components/UI/Card/Card";                                                                      IK MOET DE BREEDTE EN HOOGTE VAN DE MAP IN PIXELS DOEN!!
// import CardHolder from "./components/UI/Card/CardHolder";

const Kaart = (props) => {

  const lonCenter = props.longitude; // the longitute of my center point of view
  const latCenter = props.latitude; // the lattitude of my center point of view
  const mapLength = 1000; // the width of the map in meters

  const lonItem = 5.44589; // the longitude of the target to show on the map (change this to json object in the future)
  const latItem = 51.44974; // the latitude of the target to show on the map (change this to json object in the future)

  /* DONT CHANGE ANYTHING AFTER THIS!!! */
  const screenWidth = window.innerWidth; // check the used width by the browser
  const screenHeight = window.innerHeight; // check the used height by the browser
  const mapDimensions = screenHeight / screenWidth; // calculate a multiplier to differentiate between these two

  const minLon =
    lonCenter - ((((mapLength / 2099) * 3367) / 1.11) * 0.00001) / 2; // lowerleft x-point of the map
  const maxLon =
    lonCenter + ((((mapLength / 2099) * 3367) / 1.11) * 0.00001) / 2; // upperright x-point of the map
  const minLat =
    latCenter - (((mapLength / 1.11) * 0.00001) / 2) * mapDimensions; // lowerleft y-point of the map
  const maxLat =
    latCenter + (((mapLength / 1.11) * 0.00001) / 2) * mapDimensions; // upperright y-point of the map

  const xItem = ((lonItem - minLon) / (maxLon - minLon)) * screenWidth;
  const yItem = ((latItem - minLat) / (maxLat - minLat)) * screenHeight;
  const bBox = minLon + "," + minLat + "," + maxLon + "," + maxLat;
  //const calculatedBbox = (longitute - (mapWidthInMeters / 1.11 * 0.00001 / 2)) + "," + (latitude - (mapHeightInMeters / 1.11 * 0.00001 / 2)) + "," + (longitute + (mapWidthInMeters / 1.11 * 0.00001 / 2)) + "," + (latitude + (mapHeightInMeters / 1.11 * 0.00001 / 2));

  const prefix = "https://api.tomtom.com/map/1/staticimage?";
  const key = "akRRoJXWg8BsEebGgXquaebxtD95DZ2d";
  const zoom = "15";
  const center = "5.453,51.451";
  // const minLon = "5.379357";  // linksonder
  // const maxLon = "5.540497";  // linksonder
  // const minLat = "51.400277"; // rechtsboven
  // const maxLat = "51.476037"; // rechtsboven
  // const bBox = minLon + "," + minLat + "," + maxLon + "," + maxLat;
  const format = "png";
  const layer = "basic";
  const style = "main";
  const view = "Unified";
  const mapWidth = screenWidth;
  const mapHeight = screenHeight;
  const centerSource =
    prefix +
    "key=" +
    key +
    "&zoom=" +
    zoom +
    "&center=" +
    center +
    "&format=" +
    format +
    "&layer=" +
    layer +
    "&style=" +
    style +
    "&view=" +
    view +
    "&width=" +
    mapWidth +
    "&height=" +
    mapHeight;
  // const bboxSource = prefix + "key=" + key + "&zoom=" + zoom + "&bbox=" + bBox + "&format=" + format + "&layer=" + layer + "&style=" + style + "&view=" + view;
  const calculatedBboxSource =
    prefix +
    "key=" +
    key +
    "&zoom=" +
    zoom +
    "&bbox=" +
    bBox +
    "&format=" +
    format +
    "&layer=" +
    layer +
    "&style=" +
    style +
    "&view=" +
    view;

  // console.log(calculatedBboxSource);

  return (
    <div>
      <div className="map" style={{ top: 0 + "px", left: 0 + "px" }}>
        <img
          src={calculatedBboxSource}
          width={screenWidth}
          height={screenHeight}
          alt="this is the map"
        />
        <div className="center">
          <IonIcon icon={navigate} style={{"width":"30px", "height":"30px", "color":"red", "transform":`rotate(${props.alpha-45}deg)`}} />
        </div>
        <div className="info_display-alpha">{props.alpha}</div>
      </div>
      <PoiHolder minLon={minLon} minLat={minLat} maxLon={maxLon} maxLat={maxLat} />
    </div>
  );
}

export default Kaart;

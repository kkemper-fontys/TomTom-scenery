import { useState } from "react";
import { getStorageCategoriesName } from "../../../store/categories";
import { getDeviceInfo } from "../../../store/deviceinfo";
import Poi from "./Poi";

// this function will create a holder to put all the Points of Interest in and get those Points of Interest from the backend API
const PoiHolder = (props) => {
  const [fetchedPois, setFetchedPois] = useState([]);
  const minLon = props.minLon;
  const minLat = props.minLat;
  const maxLon = props.maxLon;
  const maxLat = props.maxLat;

  // make an API call get a Point of Interest from the backend by categoryname and the users current position
  const getPoiByCat = async (catName) => {
    try {
      const apiCall =
        "http://backend.keeskemper.nl:8080/getpoi/" +
        encodeURIComponent(catName) +
        "/" +
        props.latitude +
        "/" +
        props.longitude;

      // API call -> wait for response
      const response = await fetch(apiCall, { mode: "cors" }); 
      
      // is it a good request?
      if (!response.ok) {
        throw new Error("No JSON data returned.");
      }

      const data = await response.json();
      setFetchedPois([data]);
    } catch (error) {
      console.log("Error getting PoI data: " + error.message);
    }
  };

  // this function is to get the users favorite categories from the local storage and request a Point of Interest from the backend
  const getPoiByLocal = async () => {

    // check to see if we already got a valid position of the user
    if (props.longitude !== 1 && props.latitude !== 1) {
      const categories = await getStorageCategoriesName();
      categories.catNameArray.map((value) => {
        getPoiByCat(value);
      });
    }
  };

  getPoiByLocal();

  // dit moet nog veranderd worden!!!
  // useEffect(() => {
  //   console.log('test');
  //   const interval = setInterval(() => {
  //     console.log('refresh');
  //     getPoiByLocal();
  //   }, 3000)
  //   return () => clearInterval(interval);
  // }, []);

  // this will create the Point of Interest holder with the Points of Interest inside of it
  return (
    <div>
      {fetchedPois.map((data, key) => {
        return (
          <Poi
            key={data.name + Math.random()}
            longitude={data.lon}
            latitude={data.lat}
            minLon={minLon}
            minLat={minLat}
            maxLon={maxLon}
            maxLat={maxLat}
            poiName={data.name}
            poiCategory="restaurant"
            category_id={data.categoryId}
            image_url=""
          />
        );
      })}
    </div>
  );
};

export default PoiHolder;

import { useEffect, useState } from "react";
import { getStorageCategoriesName } from "../../../store/categories";
import { getDeviceInfo } from "../../../store/deviceinfo";
import { setPois } from "../../../store/pois";
import Poi from "./Poi";

// this function will create a holder to put all the Points of Interest in and get those Points of Interest from the backend API
const PoiHolder = (props) => {
  const [fetchedPois, setFetchedPois] = useState([]);
  const minLon = props.minLon;
  const minLat = props.minLat;
  const maxLon = props.maxLon;
  const maxLat = props.maxLat;

  // this function is to get the users favorite categories from the local storage and request a Point of Interest from the backend
  const getPoiByLocal = async () => {
    // check to see if we already got a valid position of the user
    if (props.longitude !== 1 && props.latitude !== 1) {
      const categories = await getStorageCategoriesName();
      
      let category_list = "";
      categories.catNameArray.map((value) => {
        // getPoiByCat(value);
        if (category_list == "") {
          category_list += encodeURIComponent(value);
        } else {
          category_list += "," + encodeURIComponent(value);
        }
      });

      try {
        const apiCall =
          "https://api.keeskemper.nl/key/getpoi/" +
          category_list +
          "/" +
          props.latitude +
          "/" +
          props.longitude;

        // API call -> wait for response
        const response = await fetch(apiCall); 

        // is it a good request?
        if (!response.ok) {
          throw new Error("No JSON data returned.");
        }
        const data = await response.json();
        setFetchedPois(data);
        
      } catch (error) {
        console.log("Error getting PoI data: " + error.message);
      }
    }
  };

  useEffect(() => {
    getPoiByLocal();
  }, [props]);

  getPoiByLocal();

  // this will create the Point of Interest holder with the Points of Interest inside of it
  return (
    <div>
      {fetchedPois.map((data) => {
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
            poiCategory={data.categoryName}
            category_id={data.categoryId}
            address={data.address}
            image_url=""
          />
        );
      })}
    </div>
  );
};

export default PoiHolder;

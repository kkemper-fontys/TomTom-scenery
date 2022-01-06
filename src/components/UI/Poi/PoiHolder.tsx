import { useState } from "react";
import { getDeviceInfo } from "../../../store/deviceinfo";
import Poi from "./Poi";

const PoiHolder = (props) => {
  const [fetchedPois, setFetchedPois] = useState([]);
  const minLon = props.minLon;
  const minLat = props.minLat;
  const maxLon = props.maxLon;
  const maxLat = props.maxLat;

  // Deze functie gaat gebruik maken van de localhost server van Ronald
  const getPoiByLocal = async () => {
    const deviceid = await getDeviceInfo();
    if (props.longitude !== 1 && props.latitude !== 1) {
      try {
        const apiCall =
          "http://backend.keeskemper.nl:8080/getpoi/restaurant/" +
          props.latitude +
          "/" +
          props.longitude;
        console.log(apiCall);
        const response = await fetch(apiCall, { mode: "cors" }); // API call -> wait for response

        if (!response.ok) {
          throw new Error("Can't get PoI data");
        }

        const data = await response.json();
        console.log(data);
        setFetchedPois([data]);
      } catch (error) {
        console.log(error.message);
      }
    }
  };
  getPoiByLocal();

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

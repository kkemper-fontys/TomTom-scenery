import { useState } from "react";
import { getDeviceInfo } from "../../../store/deviceinfo";
import Poi from "./Poi";

const PoiHolder = (props) => {
  const [fetchedPois, setFetchedPois] = useState([]);
  const minLon = props.minLon;
  const minLat = props.minLat;
  const maxLon = props.maxLon;
  const maxLat = props.maxLat;

  const getPoi = async () => {
    const deviceid = await getDeviceInfo();

    try {
      const apiCall =
        "https://api.keeskemper.nl/key/poi/" + deviceid + "/1627941600"; // TODO tijd instellen
      const response = await fetch(apiCall); // API call -> wait for response

      if (!response.ok) {
        throw new Error("Something went wrong here");
      }

      const data = await response.json();
      setFetchedPois(data.poi);

    } catch (error) {
      console.log(error.message);
    }
  };
  getPoi();

  return (
    <div>
      {fetchedPois.map((data, key) => {
        return (
          <Poi
            key={data.id}
            longitude={data.longitude}
            latitude={data.latitude}
            minLon={minLon}
            minLat={minLat}
            maxLon={maxLon}
            maxLat={maxLat}
            poiName={data.name}
            image_url={data.category_link_url}
          />
        );
      })}
    </div>
  );
};

export default PoiHolder;

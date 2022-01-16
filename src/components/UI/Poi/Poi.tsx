import { getDeviceInfo } from "../../../store/deviceinfo";

// this functions vreates a Point of Interest on the map
const Poi = (props) => {
  const screenWidth = window.innerWidth; // check the used width by the browser
  const screenHeight = window.innerHeight; // check the used height by the browser

  // get the dimensions of the map in longitude and latitude
  const lonItem = props.longitude;
  const latItem = props.latitude;
  const minLon = props.minLon;
  const minLat = props.minLat;
  const maxLon = props.maxLon;
  const maxLat = props.maxLat;

  // set the position of the item on the screen
  const xItem = ((lonItem - minLon) / (maxLon - minLon)) * screenWidth;
  const yItem = ((latItem - minLat) / (maxLat - minLat)) * screenHeight;

  // console.log("x: " + xItem + " - y: "+yItem);
  console.log("minLat: " + minLat + " - lat: " + latItem);
  // console.log("("+lonItem+" - "+minLon+") / (" + maxLon + " - " + minLon + ") * " + screenWidth + " = " + xItem);

  // what to do if a Point of Interest is clicked
  const clickHandler = async () => {

    alert(props.poiName + "\n" + props.address); // normally this would go to the TomTom Go App, however we dont have this app
    const deviceid = await getDeviceInfo();

    // update the users favorite categories to show more of his favorite Points of Interest
    try {
      const apiCall =
        "https://api.keeskemper.nl/key/updateUserCategory/" + deviceid + "/" + props.category_id;
      
      // API call -> wait for response
      const response = await fetch(apiCall); 
    
      // is it a good request?
      if (!response.ok) {
        throw new Error("Cant update the users category list.");
      }

    } catch (error) {
      console.log("Error updating the users categorylist: " + error.message);
    }
  }

  // this will put the Point of Interest on the map
  return (
    <div onClick={clickHandler}
      className="poi"
      style={{
        top: "calc(" + yItem + "px - 140px)",
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

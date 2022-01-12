import React from "react";
import { IonContent, IonPage } from "@ionic/react";
import Categories from "../components/categories/categories";
import { Device } from "@capacitor/device";
import { getDeviceInfo, setDeviceInfo } from "../store/deviceinfo";
import { useHistory } from "react-router";

// this function will create homepage with the categories
const Home: React.FC = () => {
  const history = useHistory();

  // get the device id and store this locally
  const logDeviceId = async () => {
    const info = await Device.getId();
    setDeviceInfo(info.uuid);
    checkDeviceId();
  };
  
  // check with a backend API call if the device id is already being used
  const checkDeviceId = async () => {
    try {
      // get the locally stored device id
      const device_id = await getDeviceInfo();
      const apiCall =
        "https://api.keeskemper.nl/key/getUserById/" + device_id;

      // API call -> wait for response
      const response = await fetch(apiCall); 

      // is it a good request?
      if (!response.ok) {
        throw new Error("No matching device id found.");
      }

      // it is a good request! -> go the the map
      if(response.ok){
        history.push("/TTMap");
      }
    } catch (error) {
      console.log("Error getting device data: " + error.message);
    }
  };

  logDeviceId();

  // this will create the initial content on the screen
  return (
    <IonPage>
      <IonContent fullscreen className="background-dark">
        <Categories />
      </IonContent>
    </IonPage>
  );
};

export default Home;

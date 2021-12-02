import React from "react";
import { IonContent, IonPage } from "@ionic/react";
import Categories from "../components/categories/categories";
// import { Insomnia } from '@ionic-native/insomnia/ngx';

import { Device } from "@capacitor/device";

import { useState } from "react";
import { getDeviceInfo, setDeviceInfo } from "../store/deviceinfo";
import { useHistory } from "react-router";

const Home: React.FC = () => {
  const [longitude, setLongitude] = useState(1);
  const [latitude, setLatitude] = useState(1);
  const history = useHistory();

  const logDeviceId = async () => {
    const info = await Device.getId();
    setDeviceInfo(info.uuid);
    checkDeviceId();
  };

  // const keepawake = new Insomnia();
  // keepawake.keepAwake();

  const checkDeviceId = async () => {
    try {
      const device_id = await getDeviceInfo();
      const apiCall =
        "https://api.keeskemper.nl/key/getUserById/" + device_id;

      const response = await fetch(apiCall); // API call -> wait for response

      if (!response.ok) {
        throw new Error("Something went wrong here");
      }
      if(response.ok){
        console.log("gelukt!");
        history.push("/TTMap");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  logDeviceId();

  return (
    <IonPage>
      <IonContent fullscreen className="background-dark">
        <Categories />
      </IonContent>
    </IonPage>
  );
};

export default Home;

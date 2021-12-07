import React, { useEffect } from "react";
import {
  IonAlert,
  IonButton,
  IonContent,
  IonIcon,
  IonList,
  IonPage,
} from "@ionic/react";

import { alert } from "ionicons/icons";
import { Geolocation } from "@capacitor/geolocation";
import { Device } from "@capacitor/device";
import { Motion } from "@capacitor/motion";

import { useState } from "react";
import Language from "../components/UI/Language/Language";
import Kaart from "../components/UI/Kaart/Kaart";
import { getDeviceInfo } from "../store/deviceinfo";

const TTMap: React.FC = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [longitude, setLongitude] = useState(1);
  const [latitude, setLatitude] = useState(1);
  const [deviceID, setDeviceID] = useState("");
  const [numAlpha, setNumAlpha] = useState(0);

  function getPermission() {
    setTimeout(() => {
      Geolocation.checkPermissions()
        .then((result) => {
          return;
        })
        .catch((error) => {
          Geolocation.requestPermissions();
          getPermission();
        });
    }, 1000);
  }

  const logDeviceId = async () => {
    const info = await Device.getId();
    setDeviceID(info.uuid);
  };

  const setUserLocation = async () => {
    const deviceid = await getDeviceInfo();
    if (longitude > 1) {
      try {
        const apiCall =
          "https://api.keeskemper.nl/key/update/user/" +
          deviceid +
          "/" +
          longitude +
          "," +
          latitude;
        const response = await fetch(apiCall); // API call -> wait for response

        if (!response.ok) {
          throw new Error("Something went wrong here");
        }
      } catch (error) {
        //console.log(error.message);
      }
    }
  };

  async function getCurrentPosition() {
    // const perm = await Geolocation.requestPermissions();
    console.log(Date.now());
    await Geolocation.watchPosition(
      { timeout: 5000, enableHighAccuracy: true },
      (result) => {
        if (result && result.coords) {
          setLongitude(result.coords.longitude);
          setLatitude(result.coords.latitude);
        }
      }
    );
    await setUserLocation();
  }

  useEffect(() => {
    getPermission();
    getCurrentPosition();
    logDeviceId();
  }, []);

  Motion.addListener("orientation", (res) => {
    setTimeout(() => {
      if (res.alpha) {
        setNumAlpha(Math.round(res.alpha - 45));
      }
    }, 2000);
  });

  const bottomDropClickHandler = () => {};

  return (
    <IonPage>
      <IonContent fullscreen className="background-dark">
        <IonList></IonList>
        <section className="categories-header">
          <img src="images/logo_tomtom.png" alt="logo employer" />
          <IonButton
            onClick={() => {
              setShowAlert(true);
            }}
          >
            <IonIcon icon={alert} />
          </IonButton>
          <IonAlert
            isOpen={showAlert}
            onDidDismiss={() => setShowAlert(false)}
            cssClass="my-custom-class"
            header={"Alert"}
            message={`lon: ${longitude}<br>lat: ${latitude}`}
            buttons={["OK"]}
          />
          <Language onClick={bottomDropClickHandler} />
        </section>
        <Kaart longitude={longitude} latitude={latitude} alpha={numAlpha} />
        {/* <InfoDisplay showAlpha={showAlpha} showBeta={showBeta} showGamma={showGamma} /> */}
      </IonContent>
    </IonPage>
  );
};

export default TTMap;

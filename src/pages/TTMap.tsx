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
import { Motion } from "@capacitor/motion";

import { useState } from "react";
import Language from "../components/UI/Language/Language";
import Kaart from "../components/UI/Kaart/Kaart";
import { getDeviceInfo } from "../store/deviceinfo";

// this function will create the map on the screen
const TTMap: React.FC = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [longitude, setLongitude] = useState(1);
  const [latitude, setLatitude] = useState(1);
  const [numAlpha, setNumAlpha] = useState(0);

  // check to see if the user already gave permission to use his location
  function getPermission() {
    // check every second if permission is already given
    setTimeout(() => {
      Geolocation.checkPermissions()
        .then((result) => {
          // permission granted!
          console.log("Permission granted!");
          return;
        })
        .catch((error) => {
          // no permission yet, request permission
          Geolocation.requestPermissions();
          console.log("Error getting permission: " + error.message);
          getPermission();
        });
    }, 1000);
  }

  // update the users position in the database (overwrite)
  const setUserLocation = async () => {
    // get the localy stored device id
    const deviceid = await getDeviceInfo();
    // check to see if we already have a valid location
    if (longitude > 1) {
      try {
        const apiCall =
          "https://api.keeskemper.nl/key/update/user/" +
          deviceid +
          "/" +
          longitude +
          "," +
          latitude;

        // API call -> wait for response
        const response = await fetch(apiCall);

        // is it a good request?
        if (!response.ok) {
          throw new Error("Can't update location data");
        }
      } catch (error) {
        console.log(
          "Error while updating users location data: " + error.message
        );
      }
    }
  };

  // get the users current position
  async function getCurrentPosition() {
    await Geolocation.getCurrentPosition({ enableHighAccuracy: true })
      .then((result) => {
        // we got a good position, store this locally
        if (result && result.coords) {
          setLongitude(result.coords.longitude);
          setLatitude(result.coords.latitude);
        }
      })
      .catch((error) => {
        // can't get the users position
        console.log("Error getting position: " + error.message);
      });

    // store the users position in the local storage
    await setUserLocation();

    // get a new position in 3 seconds
    setTimeout(getCurrentPosition, 3000);
  }

  // get the users permission to fetch his location data and fetch his location 
  useEffect(() => {
    getPermission();
    getCurrentPosition();
  }, []);

  // get the users orientation and rotate the pointer on the map accordingly to it
  Motion.addListener("orientation", (res) => {
    setTimeout(() => {
      if (res.alpha) {
        setNumAlpha(Math.round(res.alpha - 45));
      }
    }, 3000);
  });

  // this function does nothing here, but it used in Language.tsx
  const bottomDropClickHandler = () => {};

  // this creates the map on the screen
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

import React, { useState, useEffect } from "react";

import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  PermissionsAndroid,
  Platform,
  Button,
  TouchableOpacity,
} from "react-native";

import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import Geolocation from "@react-native-community/geolocation";
import Geocoder from "react-native-geocoding";
import { colors } from "../themes/color";
import { primaryColor } from "../themes/color"; // Dynamic Themes
import { fontsRegular, fontsBold } from "../assets/fonts/fonts";
import { useSelector } from "react-redux";

const initialRegion = {
  latitude: -37.78825,
  longitude: -122.4324,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};
const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = 0.01;

const Maps = (props) => {
  const isEditable = useSelector(
    (state) => state.dynamicModule.tablelist.rowDetails.editable
  );

  const { data, themeData, changedValues, renderMarker, markers } = props;

  const [currentLongitude, setCurrentLongitude] = useState("...");
  const [currentLatitude, setCurrentLatitude] = useState("...");
  const [locationStatus, setLocationStatus] = useState("");
  const [locationaddress, setLocationAddress] = useState("");
  const [locationlat, setLocationLat] = useState();
  const [locationlong, setLocationLong] = useState();
  const [locationenable, setLocationEnable] = useState(false);
  const [ready, setReady] = useState(true);
  const [region, setRegion] = useState();
  const [marker, setMarker] = useState();
  const [editmarker, setEditMarker] = useState();
  const [editmap, setEditMap] = useState(false);
  Geocoder.init(themeData.auth.googleMapAuthKey);

  const isObjectEmpty = (object) => {
    var isEmpty = true;
    for (keys in object) {
      isEmpty = false;
      break; // exiting since we found that the object is not empty
    }
    return isEmpty;
  };

  useEffect(() => {
    var isEmpty = isObjectEmpty(
      data?.value != undefined
        ? data?.value
        : data?.customOptions?.defaultValue != "" &&
          data?.customOptions?.defaultValue != undefined
        ? data?.customOptions?.defaultValue
        : null
    ); // will return true;

    if (isEmpty == false) {
      const region = {
        latitude:
          data?.value != undefined
            ? data?.value?.latitude
            : data?.customOptions?.defaultValue != "" &&
              data?.customOptions?.defaultValue != undefined
            ? data?.customOptions?.defaultValue?.latitude
            : null,
        longitude:
          data?.value != undefined
            ? data?.value?.longitude
            : data?.customOptions?.defaultValue != "" &&
              data?.customOptions?.defaultValue != undefined
            ? data?.customOptions?.defaultValue?.longitude
            : null,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      };

      const editmarker = {
        latitude:
          data?.value != undefined
            ? data?.value?.latitude
            : data?.customOptions?.defaultValue != "" &&
              data?.customOptions?.defaultValue != undefined
            ? data?.customOptions?.defaultValue?.latitude
            : null,
        longitude:
          data?.value != undefined
            ? data?.value?.longitude
            : data?.customOptions?.defaultValue != "" &&
              data?.customOptions?.defaultValue != undefined
            ? data?.customOptions?.defaultValue?.longitude
            : null,
      };

      setRegion(region);
      setEditMarker(editmarker);

      setLocationAddress(
        data?.value != undefined
          ? data?.value?.address
          : data?.customOptions?.defaultValue != "" &&
            data?.customOptions?.defaultValue != undefined
          ? data?.customOptions?.defaultValue?.address
          : null
      );
      setEditMap(true);
    }

    if (data.customOptions.required) {
      if (data.value != undefined) {
        changedValues(data.value, data.id, true);
      } else if (
        data?.customOptions?.defaultValue != "" &&
        data?.customOptions?.defaultValue != undefined
      ) {
        changedValues(data?.customOptions?.defaultValue, data.id, true);
      } else {
        changedValues("", data.id, false);
      }
    } else {
      if (data.value != undefined) {
        changedValues(data.value, data.id, true);
      } else if (
        data?.customOptions?.defaultValue != "" &&
        data?.customOptions?.defaultValue != undefined
      ) {
        changedValues(data?.customOptions?.defaultValue, data.id, true);
      } else {
        changedValues("", data.id, true);
      }
    }
  }, []);

  const getcurrentlocation = () => {
    const requestLocationPermission = async () => {
      if (Platform.OS === "ios") {
        getOneTimeLocation();
        subscribeLocationLocation();
      } else {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: "Location Access Required",
              message: "This App needs to Access your location",
            }
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            //To Check, If Permission is granted
            getOneTimeLocation();
            subscribeLocationLocation();
          } else {
            setLocationStatus("Permission Denied");
          }
        } catch (err) {
          console.warn(err);
        }
      }
    };
    requestLocationPermission();
    return () => {
      Geolocation.clearWatch(watchID);
    };
  };

  const getOneTimeLocation = () => {
    console.log("welcome geolocation");
    setLocationStatus("Getting Location ...");
    Geolocation.getCurrentPosition(
      //Will give you the current location
      (position) => {
        setLocationStatus("You are Here");

        //getting the Longitude from the location json
        const currentLongitude = JSON.stringify(position.coords.longitude);

        //getting the Latitude from the location json
        const currentLatitude = JSON.stringify(position.coords.latitude);

        const region = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        };

        const marker = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };

        setRegion(region);
        setMarker(marker);

        setLocationLat(position.coords.latitude);
        setLocationLong(position.coords.longitude);

        console.log("position.coords.latitude", locationlat);
        console.log("position.coords.longitude", locationlong);

        Geocoder.from(position.coords.latitude, position.coords.longitude)
          .then((json) => {
            console.log(json);
            // var addressComponent = json.results[0].formatted_address;

            setLocationAddress(json.results[0].formatted_address);

            changedValues(
              {
                address: json.results[0].formatted_address,
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              },
              data.id,
              true
            );

            setLocationEnable(true);
          })
          .catch((error) => console.warn(error));

        //Setting Longitude state
        setCurrentLongitude(currentLongitude);

        //Setting Longitude state
        setCurrentLatitude(currentLatitude);
      },
      (error) => {
        setLocationStatus(error.message);
      },
      {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 1000,
      }
    );
  };

  const onMapReady = (e) => {
    if (!ready) {
      setReady(true);
    }
  };

  const subscribeLocationLocation = () => {
    console.log("welcome subscribe");
    watchID = Geolocation.watchPosition(
      (position) => {
        //Will give you the location on location change

        setLocationStatus("You are Here");
        // console.log("posiion", position);

        //getting the Longitude from the location json
        const currentLongitude = JSON.stringify(position.coords.longitude);

        //getting the Latitude from the location json
        const currentLatitude = JSON.stringify(position.coords.latitude);

        //Setting Longitude state
        setCurrentLongitude(currentLongitude);

        //Setting Latitude state
        setCurrentLatitude(currentLatitude);
      },
      (error) => {
        setLocationStatus(error.message);
      },
      {
        enableHighAccuracy: false,
        maximumAge: 1000,
      }
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, margin: 10 }}>
      <View
        style={{
          height: 500,
          width: "100%",
          // backgroundColor: "red",
          borderColor: "#0000001F",
          borderRadius: 0.5,
          borderWidth: 0.5,
        }}
      >
        {data.customOptions.displayMapOption == "Map+Text" ||
        data.customOptions.displayMapOption == "Map" ? (
          <MapView
            provider={PROVIDER_GOOGLE}
            pitchEnabled={
              data?.customOptions?.isFieldDisabled
                ? !data?.customOptions?.isFieldDisabled
                : isEditable
            }
            rotateEnabled={
              data?.customOptions?.isFieldDisabled
                ? !data?.customOptions?.isFieldDisabled
                : isEditable
            }
            scrollEnabled={
              data?.customOptions?.isFieldDisabled
                ? !data?.customOptions?.isFieldDisabled
                : isEditable
            }
            zoomEnabled={
              data?.customOptions?.isFieldDisabled
                ? !data?.customOptions?.isFieldDisabled
                : isEditable
            }
            renderMarker={renderMarker}
            initialRegion={initialRegion}
            // ref={ map => { this.map = map }}
            data={markers}
            onMapReady={onMapReady}
            style={{
              height: "60%",
              width: "95%",
              marginLeft: 10,
              marginTop: 5,
            }}
            region={region}
          >
            {/* <Marker
              coordinate={
                 marker ? marker : { latitude: 26.74561, longitude: 86.259431 }
              }
            /> */}

            {editmap == true ? (
              <Marker
                coordinate={
                  editmarker
                    ? editmarker
                    : { latitude: 26.74561, longitude: 86.259431 }
                }
              />
            ) : (
              <Marker
                coordinate={
                  marker ? marker : { latitude: 26.74561, longitude: 86.259431 }
                }
              />
            )}
          </MapView>
        ) : (
          <View
            style={{
              height: "60%",
              width: "95%",
              marginLeft: 10,
              marginTop: 5,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ alignItems: "center", justifyContent: "center" }}>
              No map enable
            </Text>
          </View>
        )}

        <View style={{ height: "38%", width: "100%", marginTop: 5 }}>
          <View
            style={{
              height: "30%",
              width: "100%",
              marginTop: 5,
              flexDirection: "row",
            }}
          >
            <TouchableOpacity
              disabled={
                data?.customOptions?.isFieldDisabled
                  ? data?.customOptions?.isFieldDisabled
                  : isEditable != undefined
                  ? !isEditable
                  : false
              }
              style={{ height: "100%", width: "50%" }}
            ></TouchableOpacity>
            <TouchableOpacity
              disabled={
                data?.customOptions?.isFieldDisabled
                  ? data?.customOptions?.isFieldDisabled
                  : isEditable != undefined
                  ? !isEditable
                  : false
              }
              style={{
                height: "100%",
                width: "48%",
                borderRadius: 5,
                borderColor: primaryColor(themeData),
                borderWidth: 0.5,
                backgroundColor: data?.customOptions?.isFieldDisabled
                  ? colors.buttonlightGrayColor
                  : isEditable
                  ? colors.buttonlightGrayColor
                  : null,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => {
                getcurrentlocation();
              }}
            >
              <Text
                style={{
                  color: data?.customOptions?.isFieldDisabled
                    ? colors.staticGrayLabelColor
                    : isEditable
                    ? colors.staticGrayLabelColor
                    : primaryColor(themeData),
                  fontFamily: fontsRegular(themeData),
                }}
              >
                GET LOCATION
              </Text>
            </TouchableOpacity>
          </View>

          {data.customOptions.displayMapOption == "Map+Text" ||
          data.customOptions.displayMapOption == "Text" ? (
            <Text
              style={{
                color: colors.textColor,
                margin: 10,
                fontSize: 14,
                fontFamily: fontsRegular(themeData),
              }}
            >
              Address
            </Text>
          ) : null}

          {data.customOptions.displayMapOption == "Map+Text" ||
          data.customOptions.displayMapOption == "Text" ? (
            <Text
              style={{
                color: colors.staticTextColor,
                fontFamily: fontsRegular(themeData),
                fontSize: 16,
                marginLeft: 10,
              }}
            >
              {locationaddress}
            </Text>
          ) : null}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.staticWhiteColor,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  boldText: {
    fontSize: 25,
    color: "red",
    marginVertical: 16,
  },
});

export default Maps;

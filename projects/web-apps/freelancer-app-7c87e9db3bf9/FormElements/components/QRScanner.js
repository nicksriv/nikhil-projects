import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking,
  View,
  Image,
  SafeAreaView,
  Modal,
  TouchableHighlight,
} from "react-native";
import QRCodeScanner from "react-native-qrcode-scanner";
import { RNCamera } from "react-native-camera";
import Icon from "react-native-vector-icons/MaterialIcons";
import { colors, primaryColor } from "../themes/color";
import { fontsRegular, fontsBold } from "../assets/fonts/fonts";
import { RA } from "../assets/fontSize/fontSize";
import { useSelector } from "react-redux";

const Scanner = (props) => {
  const isEditable = useSelector(
    (state) => state.dynamicModule.tablelist.rowDetails.editable
  );

  const { data, themeData, changedValues } = props;
  const [shouldShow, setShouldShow] = useState(false);
  const [scanned, setScanned] = useState("");
  const [scan, setScan] = useState(false);
  const [scannedvalue, setScannedValue] = useState(false);

  useEffect(() => {

    if (data.value != null) {
      setScanned(data.value);
      setShouldShow(false);
      setScannedValue(true);
    }

    if (!data.customOptions?.required) {
      changedValues("", data.id, true);
    }
  }, [data.value]);

  const onSuccess = (e) => {
    console.log("namemeeee", e.data);
    setScanned(e.data);
    setShouldShow(false);
    setScannedValue(true);
    changedValues(e.data, data.id, true);
  };

  return (
    <View style={{ flex: 1 }}>
      <Modal animationType="fade" transparent={false} visible={shouldShow}>
        <TouchableOpacity
          style={{
            height: RA(80),
            width: RA(80),
            marginTop: RA(80),
            marginLeft: RA(10),
            // backgroundColor: 'yellow',
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => {
            setShouldShow(false);
          }}
        >
          <Image
            source={require("../assets/images/close.png")}
            style={{ height: RA(25), width: RA(25) }}
          />
        </TouchableOpacity>
        <View style={{ flex: 1, backgroundColor: colors.staticWhiteColor }}>
          <QRCodeScanner
            onRead={onSuccess}
            flashMode={RNCamera.Constants.FlashMode.torch}
            topContent={<View />}
            bottomContent={
              <TouchableOpacity style={styles.buttonTouchable}>
                {/* <Text style={styles.buttonText}>Scanned Value: {scanned}</Text> */}
              </TouchableOpacity>
            }
          />
        </View>
        <Text
          style={{
            alignSelf: "center",
            fontFamily: fontsRegular(themeData),
            color: colors.staticTextColor,
            fontSize: RA(15),
          }}
        >
          Note: Scan the barcode with the camera
        </Text>
      </Modal>
      <View style={{ flexDirection: "row", paddingTop: RA(10) }}>
        <Text
          style={{
            marginTop: RA(10),
            marginLeft: RA(10),
            fontFamily: fontsRegular(themeData),
            color: colors.staticTextColor,
          }}
        >
          {data?.label}
        </Text>
        {data.customOptions?.required ? (
          <Text
            style={{
              color: colors.staticRedColor,
              marginLeft: RA(5),
              marginTop: RA(10),
              fontFamily: fontsRegular(themeData),
            }}
          >
            *
          </Text>
        ) : null}
      </View>
      <View
        style={{
          height: RA(100),
          width: "95%",
          backgroundColor: colors.staticWhiteColor,
          borderRadius: 5,
          borderWidth: 0.8,
          borderColor: colors.staticBlackColor,
          marginLeft: RA(10),
          marginTop: RA(10),
          flexDirection: "row",
          marginBottom: RA(10),
        }}
      >
        <View
          style={{
            height: "100%",
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <View
            style={{
              height: "60%",
              width: "60%",
              alignSelf: "center",
              marginLeft: RA(10),
            }}
          >
            <View
              style={{
                height: "100%",
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
                borderColor: colors.staticTextColor,
                borderWidth: 0.5,
                borderRadius: 5,
              }}
            >
              {scannedvalue ? (
                <Text
                  style={{
                    fontFamily: fontsRegular(themeData),
                    fontSize: RA(17),
                    fontWeight: "500",
                    color: colors.staticTextColor,
                  }}
                >
                  {scanned}
                </Text>
              ) : (
                <Text
                  style={{
                    fontFamily: fontsRegular(themeData),
                    fontSize: RA(17),
                    fontWeight: "500",
                    color: colors.staticTextColor,
                  }}
                >
                  Barcode Scanner
                </Text>
              )}
            </View>
          </View>
          <TouchableOpacity
            style={{
              height: "100%",
              width: "30%",
              justifyContent: "center",
              alignItems: "center",
            }}
            disabled={isEditable != undefined ? !isEditable : false}
            onPress={() => {
              setShouldShow(true);
            }}
          >
            {/* <Image
              source={require("../assets/images/Camera.png")}
              style={{ height: 25, width: 25 }}
            /> */}
            <Icon
              name="photo-camera"
              size={25}
              style={{ color: colors.staticBlackColor }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
export default Scanner;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleStyle: {
    fontSize: 20,
    textAlign: "center",
  },
  signature: {
    height: "100%",
    width: "100%",
  },
  // buttonStyle: {
  //   flex: 1,
  //   justifyContent: "center",
  //   alignItems: "center",
  //   height: 50,
  //   backgroundColor: "#50BFB7",
  //   margin: 10,
  // },
  // buttonStyle1: {
  //   flex: 1,
  //   justifyContent: "center",
  //   alignItems: "center",
  //   height: 50,
  //   borderColor: "#50BFB7",
  //   borderWidth: 0.5,
  //   margin: 10,
  // },
});

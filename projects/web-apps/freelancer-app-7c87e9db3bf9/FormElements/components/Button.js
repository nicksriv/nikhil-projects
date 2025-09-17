import React, { useEffect, useCallback } from "react";
import { StyleSheet, View, Linking } from "react-native";
import { Button } from "react-native-paper";
import { colors, primaryColor } from "../themes/color"; // Dynamic Themes
import { R } from "@app/res/index";

const ButtonScreen = (props) => {
  const { data, changedValues, themeData } = props;
  console.log("values == Button111 ", props);
  const supportedURL = data.customOptions.Hyperlink;

  useEffect(() => {
    console.log(
      "values == Button111customOptionsnew ",
      data.customOptions.buttonAction
    );
  }, []);

  const OpenURLButton = ({ link, children }) => {
    console.log("urllllll", supportedURL);
    const handlePress = useCallback(async () => {
      // Checking if the link is supported for links with custom URL scheme.
      const supported = await Linking.canOpenURL(supportedURL);
      console.log("urllllllsupported", supported);

      if (supportedURL.indexOf("http") == 0) {
        await Linking.openURL(supportedURL);
      } else {
        alert("This is not valid url!");
      }
    }, [supportedURL]);
    return (
      <Button
        mode={data?.buttonType == "hyperlink" ? "text" : "outlined"}
        type="text"
        color={
          data?.buttonType == "hyperlink"
            ? primaryColor(themeData)
            : data?.buttonType == "secondary"
            ? "#000000"
            : data?.buttonType == "primary"
            ? "#000000"
            : null
        }
        onPress={handlePress}
        style={{
          margin: 10,
          height: 50,
          width: "95%",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor:
            data?.buttonType == "hyperlink"
              ? null
              : data?.buttonType == "secondary"
              ? colors.buttonlightGrayColor
              : data?.buttonType == "primary"
              ? primaryColor(themeData)
              : null
        }}
      >
        {data.label}
      </Button>
    );
  };

  const passvalues = () => {
    changedValues(data.customOptions.buttonAction, data.id, true);
  };

  return data.buttonType == "primary" || data.buttonType == "secondary" ? (
    <Button
      mode={data?.buttonType == "hyperlink" ? "text" : "outlined"}
      type="text"
      textColor={
        data?.buttonType == "hyperlink"
          ? primaryColor(themeData)
          : data?.buttonType == "secondary"
        ? R.colors.white
          : data?.buttonType == "primary"
        ? R.colors.white
          : null
      }
      onPress={() => {
        passvalues();
      }}
      style={{
        margin: 10,
        height: 50,
        width: "95%",
        justifyContent: "center",
        // alignItems: "center",
        backgroundColor:
          data?.buttonType == "hyperlink"
            ? null
            : data?.buttonType == "secondary"
            ? colors.buttonlightGrayColor
            : data?.buttonType == "primary"
            ? primaryColor(themeData)
            : null
      }}
    >
      {data.label}
    </Button>
  ) : (
    <View
      style={{
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
        margin: 8
      }}
    >
      <OpenURLButton>{data.label}</OpenURLButton>
    </View>
  );
};

export default ButtonScreen;

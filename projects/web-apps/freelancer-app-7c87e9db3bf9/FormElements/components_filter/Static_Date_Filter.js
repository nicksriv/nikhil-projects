import React, { useEffect, useState } from "react";
import { View, Text, Dimensions, Platform } from "react-native";
import DatePicker from "react-native-date-picker";
import Icon from "react-native-vector-icons/MaterialIcons";
import moment from "moment";
import { colors, primaryColor } from "../themes/color";
import { fontsRegular, fontsBold } from "../assets/fonts/fonts";
import { RA } from "../assets/fontSize/fontSize";

export default (props) => {
  const {
    data,
    changedValuesDate,
    widthFull,
    hint,
    themeData,
    resetValue,
    //preFilledParam,
  } = props;

  console.log("ssss3333 =preFilledParam== ", widthFull);

  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const [defaultDate, setDefaultDate] = useState(hint);

  useEffect(() => {
    setDefaultDate(hint);
    changedValuesDate("", hint);
  }, [resetValue]);

  const renderLabel = () => {
    if (defaultDate != hint) {
      return (
        <View
          style={{
            position: "absolute",
            flexDirection: "row",
            backgroundColor: colors.staticWhiteColor,
            left: 12,
            top: -5,
            zIndex: 999,
            paddingHorizontal: RA(5),
            fontSize: 14,
          }}
        >
          <Text
            style={{
              color: colors.staticGrayColor,
              fontFamily: fontsRegular(themeData),
              fontSize: 12,
              fontWeight: "400",
            }}
          >
            {" " + data?.hint != undefined ? hint : data?.hint}
          </Text>
        </View>
      );
    }
    return null;
  };

  return (
    <View style={{ width: "50%"}}>
      {renderLabel()}

      <View
        style={{
          height: RA(51),
          flexDirection: "row",
          borderColor: colors.staticGrayLabelColor,
          borderWidth: 1,
          margin: RA(5),
          borderRadius: RA(2),
          justifyContent: "center",
          alignItems: "center",
          // width: widthFull ? "93%" : '100%',
          // marginLeft:RA(9),
          // marginTop: RA(5),
        }}
      >
        <Text
          style={{
            color: colors.staticGrayLabelColor,
            fontFamily: fontsRegular(themeData),
            marginLeft: data?.customOptions?.required ? 13 : 5,
            width: widthFull
              ? Dimensions.get("window").width - 45
              : Dimensions.get("window").width / 2.4,
            fontSize: 15,
          }}
        >
          {defaultDate == undefined ? hint : defaultDate}
        </Text>
        <Icon
          name="date-range"
          color={colors.staticGrayLabelColor}
          size={20}
          style={{ marginLeft: -37 }}
          onPress={() => setShow(true)}
        />
      </View>

      <DatePicker
        mode="date"
        modal
        open={show}
        date={date}
        onConfirm={(date) => {
          setShow(false);
          setDate(date);
          setDefaultDate(moment(date).format("DD-MM-yyyy"));
          changedValuesDate(moment(date).format("DD-MM-yyyy"), data?.hint);
        }}
        onCancel={() => {
          setShow(false);
        }}
      />
    </View>
  );

  // return (
  //   <View
  //     style={{
  //       height: RA(50),
  //       flexDirection: "row",
  //       width: "48%",
  //       borderColor: colors.staticGrayColor,
  //       borderWidth: 1,
  //       borderRadius: RA(2),
  //       justifyContent: "center",
  //       alignItems: "center",
  //     }}
  //   >
  //     <Text
  //       style={{
  //         color: colors.staticGrayLabelColor,
  //         fontFamily: fontsRegular(themeData),
  //         marginLeft: data?.customOptions?.required ? 13 : 5,
  //         width: widthFull
  //           ? Dimensions.get("window").width - 45
  //           : Dimensions.get("window").width / 2.4,
  //         fontSize: RA(15),
  //       }}
  //     >
  //       {defaultDate == undefined ? hint : defaultDate}
  //     </Text>
  //     <Icon
  //       name="date-range"
  //       color={colors.staticGrayLabelColor}
  //       size={20}
  //       style={{ marginLeft: -RA(5) }}
  //       onPress={() => setShow(true)}
  //     />

  //     <DatePicker
  //       mode="date"
  //       modal
  //       open={show}
  //       date={date}
  //       onConfirm={(date) => {
  //         setShow(false);
  //         setDate(date);
  //         setDefaultDate(moment(date).format("DD-MM-yyyy"));
  //         changedValuesDate(moment(date).format("DD-MM-yyyy"), hint);
  //       }}
  //       onCancel={() => {
  //         setShow(false);
  //       }}
  //     />
  //   </View>
  // );
};

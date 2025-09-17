import React, { useEffect, useState } from "react";
import { View, Text, Platform } from "react-native";
import DatePicker from "react-native-date-picker";
import Icon from "react-native-vector-icons/MaterialIcons";
import moment from "moment";
import { fontsRegular, fontsBold } from "../assets/fonts/fonts";
import { colors } from "../themes/color";
import { RA } from "../assets/fontSize/fontSize";
import { useSelector } from "react-redux";
export default (props) => {
  const isEditable = useSelector(
    (state) => state.dynamicModule.tablelist.rowDetails.editable
  );
  const {
    data,
    formik,
    customStyle,
    placeholderText,
    type,
    index,
    changedValues,
    themeData,
  } = props;
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [minimumDate1, setMinimumDate] = useState();
  const [defaultDate, setDefaultDate] = useState(
    data.customOptions.defaultDateOptions == "current"
      ? moment(date).format(data.customOptions.dateFormat.replace("dd", "DD"))
      : data.customOptions.defaultDateOptions == "custom"
      ? moment(data.customOptions.defaultDate).format(
          data.customOptions.dateFormat.replace("dd", "DD")
        )
      : data.value != undefined
      // ? moment(data.value).format(
      //     data.customOptions.dateFormat.replace("dd", "DD")
      //   )
      ? data.value
      : ""
  );
  useEffect(() => {
    if (data.customOptions.disablePastDates) {
      // var d = new Date();
      //var pastYear = d.getFullYear() - 20;
      // d.setFullYear(pastYear);
      setMinimumDate(new Date());
    } else {
      //setMinimumDate('');
    }
  }, []);

  useEffect(() => {
    if (data.customOptions.defaultDateOptions == "current" || "custom") {
      changedValues(defaultDate, data.id, true);
    } else if (data.customOptions.required && defaultDate == "Date") {
      changedValues("", data.id, false);
    }
  }, [defaultDate]);

  const renderLabel = () => {
    if (defaultDate != "") {
      return (
        <View
          style={{
            position: "absolute",
            flexDirection: "row",
            backgroundColor: colors.backgroundColor,
            left: 22,
            top: -3,
            zIndex: 999,
            paddingHorizontal: RA(5),
            fontSize: 14,
          }}
        >
          {/* {!data.customOptions.required ? null : (
            <Text
              style={{
                color: colors.staticRedColor,
                fontFamily: fontsRegular(themeData),
              }}
            >
              {" "}
              *
            </Text>
          )} */}

          <Text
            style={[
              {
                color: colors.staticTextColor,
                fontFamily: fontsRegular(themeData),
              },
            ]}
          >
            {" " + data?.label}
          </Text>
        </View>
      );
    }
    return null;
  };

  return (
    <View style={{ marginTop: 10, marginBottom: 10 }}>
      {/* <Text
        style={{
          marginVertical: 10,
          marginLeft: 20,
          fontFamily: fontsRegular(themeData),
        }}
      >
        {data?.label}
      </Text> */}
      {renderLabel()}
      <View
        style={{
          height: 60,
          width: "95%",
          flexDirection: "row",
          borderColor: colors.staticBlackColor,
          backgroundColor: colors.backgroundColor,
          borderWidth: 1,
          borderRadius: 5,
          justifyContent: "space-between",
          alignContent: "center",
          alignItems: "center",
          alignSelf: "center",
          marginVertical: 5,
        }}
      >
        {defaultDate.length > 0 ? null : data.customOptions?.required ? (
          <Text
            style={{
              color: "red",
              position: "absolute",
              marginLeft: 10,
              marginTop: 25,
              fontFamily: fontsRegular(themeData),
            }}
          >
            *
          </Text>
        ) : null}
        <Text
          style={{
            color: colors.staticGrayLabelColor,
            fontSize: 16,
            marginLeft: data.customOptions?.required ? 18 : 10,
            fontFamily: fontsRegular(themeData),
          }}
        >
          {defaultDate == "" ? data?.label : defaultDate}
        </Text>
        {data.customOptions.defaultDateOptions == "current" ? (
          <Icon
            name="date-range"
            size={25}
            color={colors.staticGrayLabelColor}
            style={{ marginRight: 10, opacity: 0.5 }}
          />
        ) : (
          <Icon
            name="date-range"
            size={25}
            color={colors.staticGrayLabelColor}
            disabled={isEditable != undefined ? !isEditable : false}
            onPress={() =>
              data.customOptions.readOnly
                ? ""
                : data.customOptions.defaultDateOptions == "current"
                ? setShow(false)
                : setShow(true)
            }
            style={{ marginRight: 10 }}
          />
        )}
      </View>
      <DatePicker
        mode="date"
        modal
        open={show}
        date={date}
        minimumDate={minimumDate1}
        //maximumDate={new Date()}
        onConfirm={(date) => {
          setShow(false);
          setDate(date);
          setDefaultDate(
            moment(date).format(
              data.customOptions.dateFormat.replace("dd", "DD")
            )
          );
          changedValues(
            moment(date).format(
              data.customOptions.dateFormat.replace("dd", "DD")
            ),
            data.id,
            true
          );
        }}
        onCancel={() => {
          setShow(false);
        }}
      />
    </View>
  );
};

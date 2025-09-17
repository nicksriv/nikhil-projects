import React, { useState, useEffect } from "react";
import { View, Text, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import Icon from "react-native-vector-icons/MaterialIcons";
import moment from "moment";
import { fontsRegular, fontsBold } from "../assets/fonts/fonts";
import { colors } from "../themes/color";
import { RA } from "../assets/fontSize/fontSize";
import { useSelector } from "react-redux";

const Time = (props) => {
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
  const [time, setTime] = useState(new Date());
  const [defaultTime, setDefaultTime] = useState({
    id:
      data.customOptions.defaultTime == "current"
        ? moment(time).format(data.customOptions.checked ? "hh:mm a" : "HH:mm")
        : data.customOptions.defaultTime == "custom"
        ? moment(data.customOptions.cutomTime).format(
            data.customOptions.checked ? "hh:mm a" : "HH:mm"
          )
        : data.value?.id != undefined
        ? data.value?.id
        : "",
    time: data.value?.time != undefined ? data.value?.time : "",
  });
  const [mode, setMode] = useState("time");
  const [show, setShow] = useState(false);
  const [showError, setShowError] = useState(false);
  const onChange = (event, selectedTime) => {
    console.log("selectedTimeselectedTimeselectedTime = ", selectedTime);
    const currentTime = selectedTime || time;
    setShow(Platform.OS === "ios");
    if (data.customOptions.disableTime) {
      if (
        moment(currentTime).format(
          data.customOptions.checked ? "hh:mm a" : "HH:mm"
        ) <
        moment(new Date()).format(
          data.customOptions.checked ? "hh:mm a" : "HH:mm"
        )
      ) {
        setShow(false);
        setShowError(true);
        setDefaultTime({ id: "", time: "" });
      } else {
        setTime(currentTime);
        setShow(false);
        setDefaultTime({
          id: moment(currentTime).format(
            data.customOptions.checked ? "hh:mm a" : "HH:mm"
          ),
          time: currentTime.toISOString(),
        });
        setShowError(false);
        changedValues(
          {
            id: moment(currentTime).format(
              data.customOptions.checked ? "hh:mm a" : "HH:mm"
            ),
            time: currentTime.toISOString(),
          },
          data.id,
          true
        );
      }
    } else {
      setTime(currentTime);
      setShow(false);
      setDefaultTime({
        id: moment(currentTime).format(
          data.customOptions.checked ? "hh:mm a" : "HH:mm"
        ),
        time: currentTime.toISOString(),
      });
      setShowError(false);
      changedValues(
        {
          id: moment(currentTime).format(
            data.customOptions.checked ? "hh:mm a" : "HH:mm"
          ),
          time: currentTime.toISOString(),
        },
        data.id,
        true
      );
    }
    changedValues(
      {
        id: moment(currentTime).format(
          data.customOptions.checked ? "hh:mm a" : "HH:mm"
        ),
        time: currentTime.toISOString(),
      },
      data.id,
      true
    );
  };
  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };
  const showTimepicker = () => {
    showMode("time");
  };
  useEffect(() => {
    if (data.customOptions.defaultTime == "current" || "custom") {
      changedValues(defaultTime, data.id, true);
    } else if (data.customOptions.required && defaultTime.id == "Time") {
      changedValues("", data.id, false);
    }
  }, [defaultTime]);

  const renderLabel = () => {
    if (defaultTime.id != "Time") {
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
                color: colors.staticGrayLabelColor,
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
          marginVertical: 5,
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
        }}
      >
        {defaultTime.id.length > 0 ? null : data.customOptions?.required ? (
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
            fontFamily: fontsRegular(themeData),
            marginLeft: data.customOptions?.required ? 18 : 10,
          }}
        >
          {defaultTime.id == "" ? data?.label : defaultTime.id}
        </Text>
        <View>
          <Icon
            name="timer"
            size={25}
            disabled={isEditable != undefined ? !isEditable : false}
            onPress={
              data.customOptions.defaultTime == "current"
                ? null
                : showTimepicker
            }
            style={{
              marginRight: 10,
              opacity: data.customOptions.defaultTime == "current" ? 0.5 : 1,
            }}
            color={colors.staticGrayLabelColor}
          />
        </View>
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          display={Platform.OS == "ios" ? "inline" : "default"}
          value={time}
          mode={mode}
          is24Hour={Platform.OS == "ios" ? null : false}
          //locale={Platform.OS == "ios" ? "es-ES" : null}
          onChange={onChange}
        />
      )}
      {showError ? (
        <Text
          style={{
            color: "red",
            marginLeft: 15,
            marginTop: 1,
            fontFamily: fontsRegular(themeData),
          }}
        >
          Time should be greater or equal to current time
        </Text>
      ) : null}
    </View>
  );
};
export default Time;

import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { HelperText, RadioButton } from "react-native-paper";
import { fontsRegular, fontsBold } from "../assets/fonts/fonts";
import { colors, primaryColor } from "../themes/color"; // Dynamic Themes
import { useSelector } from "react-redux";

const SingleChoice = (props) => {
  const isEditable = useSelector(
    (state) => state.dynamicModule.tablelist.rowDetails.editable
  );

  const { data, changedValues, isRequiredFieldsFilled, themeData } = props;
  const [choiceValue, setChoiceValue] = useState(
    data.value != undefined ? data.value : ""
  );

  useEffect(() => {
    if (data.customOptions.required) {
      if (data.value != undefined) {
        changedValues(data.value, data.id, true);
      } else {
        changedValues("", data.id, false);
      }
    } else {
      if (data.value != undefined) {
        changedValues(data.value, data.id, true);
      } else {
        changedValues("", data.id, true);
      }
    }
  }, []);

  const selectedValue = (newValue) => {
    setChoiceValue(newValue);
    changedValues(newValue, data.id, true);
  };

  const renderSingleChoiceOptions = ({ item, index }) => {
    return (
      <View style={styles.optionsContainer}>
        <RadioButton.Android
          value={item.label}
          disabled={isEditable != undefined ? !isEditable : false}
          uncheckedColor={colors.staticGrayColor}
          color={primaryColor(themeData)}
        />
        <Text
          style={[
            styles.labelStyle,
            {
              fontFamily: fontsRegular(themeData),
              color: colors.staticTextColor,
            },
          ]}
        >
          {item.label}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <Text
        style={{
          marginVertical: 10,
          marginLeft: 20,
          color: colors.staticTextColor,
          fontFamily: fontsRegular(themeData),
        }}
      >
        <Text
          style={{
            fontSize: 15,
            color: "red",
            fontFamily: fontsRegular(themeData),
          }}
        >
          {data.customOptions.required ? "*  " : null}
        </Text>
        {data?.label}
      </Text>
      <RadioButton.Group
        onValueChange={(newValue) => selectedValue(newValue)}
        value={choiceValue}
      >
        <View style={{ marginLeft: 10 }}>
          <FlatList
            data={data.singleChoiceOptions}
            keyExtractor={(item) => item.key}
            renderItem={renderSingleChoiceOptions}
            // horizontal={false}
            numColumns={
              data?.customOptions?.columns == "0"
                ? 0
                : data?.customOptions?.columns > 4
                ? 4
                : data?.customOptions?.columns
            }
            //columnWrapperStyle={{justifyContent: 'space-between'}}
            //contentContainerStyle={{ width: "100%" }}
            horizontal={data?.customOptions?.columns == "0" ? true : false}
          />
        </View>
      </RadioButton.Group>
      <View style={styles.helpersWrapper}>
        <HelperText
          type="error"
          style={styles.helper}
          visible={
            false
            // isRequiredFieldsFilled &&
            // data.customOptions.required &&
            // choiceValue.length == 0
          }
        >
          {"Required"}
        </HelperText>
      </View>
    </View>
  );
};

export default SingleChoice;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginTop: 10,
  },
  optionsContainer: {
    // width: "50%",
    // justifyContent: "space-around",
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    padding: 2,
  },
  labelStyle: {
    fontSize: 12,
    textAlign: "left",
    width: 55,
  },
});

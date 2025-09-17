import React from "react";

import {
  View,
  StyleSheet,
  Platform,
  ViewStyle,
  Modal,
  TextStyle,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { obj } from "../../util/object";
import Text from "./Text";
import IconButton from "./IconButton";
import { R } from "../../res";

const PickerC = (props) => {
  const [value, setValue] = React.useState(null);
  const [index_current_item, setCurrentItemIndex] = React.useState(0);
  const [isIOSPickerVisible, setIOSPickerVisible] = React.useState(false);
  const [dataArray, setDataArray] = React.useState([]);
  // @ts-ignore

  React.useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  function onValueChange(value, position) {
    const newDataArray = [...dataArray];
    const { multiple, onValueChange } = props;

    //parent callback
    if (onValueChange) {
      setCurrentItemIndex(position);
      onValueChange(value.valueKey, position);
    }

    //Check if checker is for multiple select
    if (!multiple) {
      setValue(value), setIOSPickerVisible(false);
      return;
    }

    //For removing item upon click
    if (dataArray.includes(value)) {
      const result = dataArray.filter((item) => item !== value);
      setDataArray(result);
      return;
    }

    //default for multiple clicks
    setIOSPickerVisible(true),
      newDataArray.push(value),
      setDataArray(newDataArray);
    return;
  }

  const {
    options,
    style,
    itemColor,
    keyExtractor,
    labelKey,
    valueKey,
    placeHolder,
  } = props;
  return (
    <View style={Platform.OS === "ios" ? {} : [styles.root]}>
      <View style={styles.rootIOS}>
        <TouchableOpacity onPress={() => setIOSPickerVisible(true)}>
          <View style={styles.pickerCustom}>
            {props.multiple ? (
              !dataArray.length ? (
                <View style={{ flex: 1, flexDirection: "row" }}>
                  <Text style={{ color: R.colors.text.placeHolder }}>
                    {placeHolder ? placeHolder : "Select"}
                  </Text>
                </View>
              ) : (
                <View style={{ flex: 1, flexDirection: "row" }}>
                  {dataArray.map((item, i) => {
                    return (
                      <View
                        style={{
                          backgroundColor: "lightgrey",
                          marginHorizontal: 2,
                          borderRadius: 6,
                          padding: 6,
                        }}
                      >
                        <Text
                          variant="content"
                          color={R.colors.text.secondary}
                          font={"regular"}
                          ellipsizeMode="middle"
                          numberOfLines={1}
                          style={{ marginHorizontal: 5 }}
                        >
                          {item}
                        </Text>
                      </View>
                    );
                  })}
                </View>
              )
            ) : !value ? (
              <Text style={{ color: R.colors.text.placeHolder }}>
                {placeHolder ? placeHolder : "Select"}
              </Text>
            ) : (
              <Text
                variant="content"
                color={R.colors.text.secondary}
                font={"regular"}
                ellipsizeMode="middle"
                numberOfLines={1}
              >
                {options[index_current_item].title
                  ? `${options[index_current_item].title}`
                  : options[index_current_item].reason
                  ? `${options[index_current_item].reason}`
                  : `${options[index_current_item].value}`}
              </Text>
            )}
            <View
              style={{
                position: "absolute",
                right: R.units.scale(0),
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <IconButton
                type="AntDesign"
                name={"caretdown"}
                size={"xxs"}
                color={"#8a8a8a"}
              />
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <Modal
        visible={isIOSPickerVisible}
        animationType="fade"
        statusBarTranslucent={true}
        transparent={true}
      >
        <TouchableWithoutFeedback onPress={() => setIOSPickerVisible(false)}>
          <View style={styles.vwModalContainer}>
            <View style={styles.vwModal}>
              {options &&
                options.map((op, index) => {
                  return (
                    <Text
                      key={index}
                      variant="title3"
                      font={"regular"}
                      color={
                        [`opi_${index}`, op[valueKey]].includes(value)
                          ? itemColor.selected
                          : itemColor.default
                      }
                      onPress={() => {
                        // setIOSPickerVisible(false);
                        onValueChange(op, index);
                      }}
                      style={{
                        paddingHorizontal: R.units.scale(15),
                        paddingVertical: R.units.scale(10),
                        backgroundColor: dataArray.includes(op[labelKey])
                          ? "lightgrey"
                          : "#fff",
                      }}
                    >
                      {op[labelKey] ? op[labelKey] : `Option ${index}`}
                    </Text>
                  );
                })}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    borderRadius: R.units.scale(5),
    marginHorizontal: R.units.scale(10),
    backgroundColor: R.colors.background.tab,
  },
  rootIOS: {
    height: R.units.scale(40),
    justifyContent: "space-between",
    alignItems: "center",
  },
  pickerCustom: {
    paddingHorizontal: R.units.scale(5),
    width: 300,
    height: R.units.scale(40),
    justifyContent: "center",
    alignContent: "center",
  },
  vwModalContainer: {
    width: "100%",
    height: "100%",
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: R.colors._helper.hexToRGB(R.colors.black, 0.6),
  },
  vwModal: {
    width: "90%",
    borderRadius: R.units.scale(4),
    // padding: R.units.scale(10),
    backgroundColor: "lightgrey",
    alignSelf: "center",
  },
});

export default PickerC;

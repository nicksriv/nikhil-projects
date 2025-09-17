import React from "react";
import { StyleSheet } from "react-native";
import Text from "../common/Text";
import View from "../common/View";
import TextInput from "../common/TextInput";
import Button from "./Button";
import { R } from "../../res";
import Card from "../common/Card";
import PickerC from "../common/Picker";

const sampleData = [
  {
    id: 1,
    title: "Car",
    valueKey: "asdaw",
  },
  {
    id: 2,
    title: "Bike",
    valueKey: "asdaw",
  },
  {
    id: 3,
    title: "Train",
    valueKey: "asdaw",
  },
];
const itemColor = {
  default: R.colors.fontPrimary,
  selected: R.colors.primary,
};

const ModuleForm = ({}) => {
  return (
    <>
      <Card style={styles.cardStyle}>
        <Text style={styles.headerText}>Short Text Field:</Text>
        <TextInput
          placeholder="Short Text Field"
          //   onChange={(value) =>
          //     onChange({
          //       key: "shortText",
          //       name: "shortText",
          //       value: value,
          // })
          //   }
        />
        <Text style={styles.headerText}>Numbers</Text>
        <TextInput
          placeholder="Enter Numbers"
          //   onChange={(value) =>
          //     onChange({
          //       key: "kycDetails",
          //       name: "panNumber",
          //       value: value,
          //     })
          //   }
        />
        <Text style={styles.headerText}>Long Text:</Text>
        <TextInput
          placeholder="Long text"
          //   onChange={(value) =>
          //     onChange({
          //       key: "personalInformationFormData",
          //       name: "address",
          //       value: value,
          //     })
          //   }
          style={styles.longInput}
        />

        <View padding={R.units.scale(10)}>
          <Button text={"SUBMIT"} />
        </View>
      </Card>
    </>
  );
};

const styles = StyleSheet.create({
  cardStyle: {
    borderRadius: R.units.scale(5),
    marginHorizontal: R.units.scale(12),
    marginVertical: R.units.scale(15),
    elevation: 4,
    padding: R.units.scale(10),
    justifyContent: "center",
  },
  cardHeader: {
    fontSize: R.units.scale(14),
    fontWeight: "500",
    marginHorizontal: R.units.scale(10),
    marginVertical: R.units.scale(5),
  },
  headerText: {
    color: R.colors.text.secondary,
    fontSize: R.units.scale(12),
    fontWeight: "500",
    // width: "40%",
    marginHorizontal: R.units.scale(10),
  },
  longInput: {
    backgroundColor: R.colors.background.tab,
    paddingHorizontal: R.units.scale(10),
    textAlign: "left",
    margin: R.units.scale(8),
    paddingVertical: R.units.scale(12),
    borderRadius: R.units.scale(5),
    minHeight: 90,
    textAlignVertical: "top",
  },
});

export default ModuleForm;

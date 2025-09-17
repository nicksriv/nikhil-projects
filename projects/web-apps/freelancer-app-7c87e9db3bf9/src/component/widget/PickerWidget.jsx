import React from "react";
import { R } from "../../res";

import View from "../common/View";
import Text from "../common/Text";
import Button from "../form/Button";
import Separator from "../common/Separator";
import Divider from "../common/Divider";
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

const PickerWidget = ({ globalStyles }) => {
  const [pickerValue, setPickerValue] = React.useState("");

  const handleChange = (data) => {
    //handle data here
    // console.log("Dataaa", data);
    // setPickerValue(data);
  };

  return (
    <>
      <View style={[globalStyles.card]}>
        <Text size="10" font="medium">
          Prop: default
        </Text>
        <Text size="10">Description: Picker</Text>
        <Separator />
        <Divider color={R.colors.primary.lightest}></Divider>
      </View>
      <Separator />
      <View style={{ marginVertical: 20 }}>
        <PickerC
          multiple={true}
          placeHolder="Select Category"
          options={sampleData}
          labelKey="title"
          itemColor={itemColor}
          //value={variantData.id}
          onValueChange={(value, position) => {
            handleChange(value);
          }}
        />
      </View>
      <View style={[globalStyles.card]}>
        <Text size="10" font="medium">
          Prop: vertical
        </Text>
        <View
          style={{
            width: "30%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View
            style={[
              globalStyles.card,
              {
                backgroundColor: R.colors.primary.lightest,
                alignItems: "center",
                justifyContent: "center",
              },
            ]}
          >
            <Text size="10">box</Text>
          </View>
          <Divider vertical={true} color={R.colors.primary.lightest}></Divider>
          <View
            style={[
              globalStyles.card,
              {
                backgroundColor: R.colors.primary.lightest,
                alignItems: "center",
                justifyContent: "center",
                width: 50,
              },
            ]}
          >
            <Text size="10">box</Text>
          </View>
        </View>
      </View>

      <View style={[globalStyles.card, { marginTop: 10 }]}>
        <Text size="10" font="medium">
          Prop: options
        </Text>

        <Text>Should Contain the data that needs to be supplied to picker</Text>

        <Divider color={R.colors.primary.lightest}></Divider>
        <Text size="10" font="medium">
          Prop: itemColor
        </Text>

        <Text>props for overriding default picker selection color</Text>
        <Divider color={R.colors.primary.lightest}></Divider>
        <Text size="10" font="medium">
          Prop: labelKey
        </Text>

        <Text>
          Key which should match the keys from the data provided to the Picker
          example {"\n"} labelKey = "title" {"\n"} sampleData = [
          {`id:1, title:"Car",valueKey:"asdaw"`}]
        </Text>
        <Divider color={R.colors.primary.lightest}></Divider>
        <Text size="10" font="medium">
          Prop: Placeholder
        </Text>

        <Text>Placeholder</Text>
        <Divider color={R.colors.primary.lightest}></Divider>

        <Text size="10" font="medium">
          Prop: onValueChange
        </Text>

        <Text>Callback function</Text>
        <Divider color={R.colors.primary.lightest}></Divider>

        <Text size="10" font="medium">
          Prop: multiple
        </Text>

        <Text>Allows Multiple Selects</Text>
        <Divider color={R.colors.primary.lightest}></Divider>
      </View>
    </>
  );
};

export default PickerWidget;

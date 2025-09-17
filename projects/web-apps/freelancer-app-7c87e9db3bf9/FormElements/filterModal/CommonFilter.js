import React, { useEffect, useState } from "react";
import { Text, TextBase, View } from "react-native";
import { RA } from "../assets/fontSize/fontSize";
import Date_Filter from "../components_filter/Date_Filter";
import MultiSelectComponent from "../components_filter/MultiSelectChip_Filter";

const CommonFilter = (props) => {
  const {
    showMultiSelect,
    showFromToDate,
    getChangedValueMultiSelect,
    getChangedValuesDateFrom,
    getChangedValuesDateTo,
    resetValue,
    preFilledParam,
  } = props;

  console.log("preFilledParam111 ", preFilledParam);

  const changedValuesDate = (item) => {
    getChangedValuesDateFrom(item);
  };

  const changedValuesDateTo = (item) => {
    getChangedValuesDateTo(item);
  };

  const changedValueMultiSelect = (item) => {
    console.log("changedValueMultiSelect111 ", item);

    getChangedValueMultiSelect(item);
  };
  return (
    <View style={{ width: "95%" }}>
      {showMultiSelect ? (
        <MultiSelectComponent
          changedValueMultiSelect={changedValueMultiSelect}
          resetValue={resetValue}
        />
      ) : (
        null
      )}

      {showMultiSelect ? (
        <>
          <Date_Filter
            widthFull={true}
            hint="Date From"
            resetValue={resetValue}
            changedValuesDate={changedValuesDate}
          />
          <Date_Filter
            widthFull={true}
            hint="Date To"
            changedValuesDate={changedValuesDateTo}
            resetValue={resetValue}
          />
        </>
      ) : null}
    </View>
  );
};
export default CommonFilter;

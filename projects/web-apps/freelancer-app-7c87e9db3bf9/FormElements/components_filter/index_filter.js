import React, { useEffect, useState } from "react";

import PropTypes from "prop-types";
import ShortText_Filter from "./ShortText_Filter";
import LongText_Filter from "./LongText_Filter";
//import Number_Filter from "./Number_Filter";
//import RadioButton_Filter from "./RadioButton_Filter";
import Date_Filter from "./Date_Filter";
//import Time_Filter from "./Time_Filter";
import Dropdown_Filter from "./Dropdown_Filter";
import Email_Filter from "./Email_Filter";
import Phone_Filter from "./Phone_Filter";

function FormElement({
  data,
  formik,
  index,
  changedValuesComponent,
  changedValuesDate,
  themeData,
  resetValue
}) {
  console.log("Component type Filter ==> ", data.type);
  return (
    <>
      {(() => {
        switch (data.type) {
          case "Short_Text":
            return (
              <ShortText_Filter
                data={data}
                themeData={themeData}
                changedValuesComponent={changedValuesComponent}
                resetValue={resetValue}
              />
            );
          case "Long_Text":
            return (
              <LongText_Filter
                data={data}
                themeData={themeData}
                changedValuesComponent={changedValuesComponent}
                resetValue={resetValue}
              />
            );

          case "Dropdown":
            return (
              <Dropdown_Filter
                data={data}
                themeData={themeData}
                changedValuesComponent={changedValuesComponent}
                resetValue={resetValue}
              />
            );
          case "Mapping_Dropdown":
            return (
              <Dropdown_Filter
                data={data}
                themeData={themeData}
                changedValuesComponent={changedValuesComponent}
                resetValue={resetValue}
              />
            );

          case "Single_Choice":
            return (
              <Dropdown_Filter
                data={data}
                themeData={themeData}
                changedValuesComponent={changedValuesComponent}
                resetValue={resetValue}
              />
            );

          case "Button_Radios":
            return (
              <Dropdown_Filter
                data={data}
                themeData={themeData}
                changedValuesComponent={changedValuesComponent}
                resetValue={resetValue}
              />
            );

          case "Check_List":
            return (
              <Dropdown_Filter
                data={data}
                themeData={themeData}
                changedValuesComponent={changedValuesComponent}
                resetValue={resetValue}
              />
            );

          case "Date_Picker":
            return (
              <Date_Filter
                data={data}
                themeData={themeData}
                changedValuesComponent={changedValuesComponent}
                changedValuesDate={changedValuesDate}
                resetValue={resetValue}
              />
            );
          // case "Time":
          //   return (
          //     <Time_Filter
          //       data={data}
          //       changedValuesComponent={changedValuesComponent}
          //     />
          //   );

          // case "Number":
          //   return (
          //     <Number_Filter
          //       data={data}
          //       changedValuesComponent={changedValuesComponent}
          //     />
          //   );

          case "Email":
            return (
              <Email_Filter
                data={data}
                themeData={themeData}
                changedValuesComponent={changedValuesComponent}
                resetValue={resetValue}
              />
            );

          case "Phone":
            return (
              <Phone_Filter
                data={data}
                themeData={themeData}
                changedValuesComponent={changedValuesComponent}
                resetValue={resetValue}
              />
            );

          default:
            return null;
        }
      })()}
    </>
  );
}

FormElement.propTypes = {
  data: PropTypes.object,
};

FormElement.defaultProps = {};

export default FormElement;

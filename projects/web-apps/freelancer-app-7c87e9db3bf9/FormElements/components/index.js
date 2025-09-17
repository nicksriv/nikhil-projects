import React from "react";

import PropTypes from "prop-types";
import ShortText from "./ShortText";
import LongText from "./LongText";
import Number from "./Number";
import Email from "./Email";
import Maps from "./Maps";
import RadioButton from "./RadioButton";
import CheckList from "./CheckList";
import SingleChoice from "./SingleChoice";
import Photo from "./Photo";
import Dropdown from "./Dropdown";
import Button from "./Button";
import Date from "./Date";
import Time from "./Time";
import Video from "./Video";
import QRScanner from "./QRScanner";
import Tile from "./Tile";
import Attachment from "./Attachment";
import Signature from "./Signature";
import Header from "./Header";
import Inputtable from "./Inputtable";
import Phone from "./Phone";

function FormElement({
  data,
  formik,
  index,
  changedValues = () => {},
  isRequiredFieldsFilled,
  themeData,
}) {
  return (
    <>
      {(() => {
        switch (data.element) {
          case "Short_Text":
            return (
              <ShortText
                // customStyle={{}}
                // placeholderText={""}
                // type={"text"}
                data={data}
                themeData={themeData}
                changedValues={changedValues}
                isRequiredFieldsFilled={isRequiredFieldsFilled}
              // formik={formik}
              // index={index}
              />
            );
          case "Long_Text":
            return (
              <LongText
                // customStyle={{}}
                // placeholderText={""}
                // type={"text"}
                data={data}
                themeData={themeData}
                changedValues={changedValues}
                isRequiredFieldsFilled={isRequiredFieldsFilled}
              // formik={formik}
              // index={index}
              />
            );
            {
              /* case "Email":
            return (
              <Email
                customStyle={{}}
                placeholderText={""}
                type={"text"}
                data={data}
                formik={formik}
                index={index}
              />
            ); */
            }
          case "Number":
            return (
              <Number
                // customStyle={{}}
                // placeholderText={""}
                // type={"number"}
                data={data}
                themeData={themeData}
                changedValues={changedValues}
                isRequiredFieldsFilled={isRequiredFieldsFilled}
              // formik={formik}
              // index={index}
              />
            );
          case "Email":
            return (
              <Email
                // customStyle={{}}
                // placeholderText={""}
                // type={"text"}
                data={data}
                themeData={themeData}
                changedValues={changedValues}
                isRequiredFieldsFilled={isRequiredFieldsFilled}
              // formik={formik}
              // index={index}
              />
            );
          case "Button":
            return (
              <Button
                // customStyle={{}}
                // placeholderText={""}
                // type={"text"}
                data={data}
                themeData={themeData}
                changedValues={changedValues}
              // formik={formik}
              // index={index}
              />
            );
          case "Location_Coordinates":
            return (
              null
              //  <Maps
              //   // customStyle={{}}
              //   // placeholderText={""}
              //   // type={"text"}
              //   data={data}
              //   themeData={themeData}
              //   changedValues={changedValues}
              // // formik={formik}
              // // index={index}
              // />
            );

          case "Signature":
            return (
              <Signature
                // customStyle={{}}

                // placeholderText={""}

                // type={"text"}

                data={data}
                themeData={themeData}
                isRequiredFieldsFilled={isRequiredFieldsFilled}
                changedValues={changedValues}
              // formik={formik}

              // index={index}
              />
            );

          case "Button_Radios":
            return (
              <RadioButton
                data={data}
                themeData={themeData}
                changedValues={changedValues}
              />
            );

          case "Single_Choice":
            return (
              <SingleChoice
                data={data}
                themeData={themeData}
                changedValues={changedValues}
                isRequiredFieldsFilled={isRequiredFieldsFilled}
              />
            );

          case "Check_List":
            return (
              <CheckList
                data={data}
                themeData={themeData}
                changedValues={changedValues}
                isRequiredFieldsFilled={isRequiredFieldsFilled}
              />
            );

          case "Photo":
            return <Photo
              data={data}
              themeData={themeData}
              changedValues={changedValues}
            />;

          case "Mapping_Dropdown":
            console.log("hrlllllll",JSON.stringify(data))
            return (
              <Dropdown
                data={data}
                themeData={themeData}
                changedValues={changedValues}
                isRequiredFieldsFilled={isRequiredFieldsFilled}
                elementType="1"
              />
            );
            case "Dropdown":
            return (
              <Dropdown
                data={data}
                themeData={themeData}
                changedValues={changedValues}
                isRequiredFieldsFilled={isRequiredFieldsFilled}
                elementType="2"

              />
            );
          case "Mapping_Dropdown":
            return (
              <Dropdown
                data={data}
                themeData={themeData}
                changedValues={changedValues}
                isRequiredFieldsFilled={isRequiredFieldsFilled}
              />
            );

          case "Date_Picker":
            return (
              <Date
                data={data}
                themeData={themeData}
                changedValues={changedValues}
                isRequiredFieldsFilled={isRequiredFieldsFilled}
              />
            );

          case "Time":
            return (
              <Time
                data={data}
                themeData={themeData}
                changedValues={changedValues}
                isRequiredFieldsFilled={isRequiredFieldsFilled}
              />
            );

          case "Video":
            return <Video
              data={data}
              themeData={themeData}
              changedValues={changedValues}
            />;

          case "Section_Header":
            return <Header data={data} themeData={themeData} />;

          case "Barcode_Scanner":
            return <QRScanner
              data={data}
              themeData={themeData}
              changedValues={changedValues}
            />;

          case "Tiles":
            return <Tile data={data} themeData={themeData} />;

          case "Configurable_List":
            return (
              <Inputtable
                data={data}
                changedValues={changedValues}
                themeData={themeData}
              />
            );
          case "Attachment":
            return <Attachment
              data={data}
              changedValues={changedValues}
              themeData={themeData}
            />;

          case "Phone":
            return (
              <Phone
                data={data}
                themeData={themeData}
                changedValues={changedValues}
                isRequiredFieldsFilled={isRequiredFieldsFilled}
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

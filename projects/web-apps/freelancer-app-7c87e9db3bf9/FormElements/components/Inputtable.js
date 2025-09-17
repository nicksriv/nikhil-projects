import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { TextInput, HelperText, DataTable, Button } from "react-native-paper";
import { ErrorMessage } from "./FormValidation";
import Icon from "react-native-vector-icons/MaterialIcons";
import DatePicker from "react-native-date-picker";
import moment from "moment";

import DateTimePicker from "@react-native-community/datetimepicker";
import { colors, primaryColor } from "../themes/color";
import { fontsRegular, fontsBold } from "../assets/fonts/fonts";

const Inputtable = (props) => {
  const { themeData } = props;
  const { data, formik, changedValues } = props;
  const [textValue, setTextValue] = useState(
    data.value != undefined ? data.value : ""
  );
  const [isFocus, setIsFocus] = useState(false);
  const [inputs, setInputs] = useState([{ key: "", value: "" }]);
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [inputid, setInputid] = useState([]);

  const addHandler = () => {
    const _inputs = [...inputs];
    _inputs.push({ key: "", value: "" });
    setInputs(_inputs);
  };

  const changeText = (text, key) => {
    const _inputs = [...inputs];
    _inputs[key].value = text;
    _inputs[key].key = key;
    setInputs(_inputs);
    // setTextValue(text)
    // changedValues(text, data.id)
  };

  const deleteHandler = (key) => {
    const _inputs = inputs.filter((input, index) => index != key);
    setInputs(_inputs);
  };

  useEffect(() => {
    console.log(
      "data.customOptions.headerList" + JSON.stringify(data.customOptions)
    );
    console.log(
      "data.customOptions.headerList" +
        JSON.stringify(data.customOptions.headerList)
    );
    console.log("iddddddddddd" + data.id);
    setInputid(data.id);
    data.hasOwnProperty("rows") ? setRows(data.rows) : setRows([]);

    //   if (changedValues.values[data.id] && changedValues.values[data.id].length) {
    //     setRows(changedValues.values[data.id]);
    // }

    console.log("valueschangedtrigeed");

    // if (formik.values[data.id] && formik.values[data.id].length) {
    //     setRows(formik.values[data.id]);
    // }
  }, []);

  // useEffect(() => {
  //     if (changedValues.values[data.id] && changedValues.values[data.id].length) {
  //         setRows(changedValues.values[data.id]);
  //     }
  // }, [changedValues.values[data.id]]);

  const TextInputCells = (props) => {
    console.log("clickeeeddrowws" + JSON.stringify(rows));
    console.log("idddddddddddtextinoput" + props.data.id);
    console.log("idddddddddddtextinoputrequired" + props.data.required);

    var key = inputid;
    var obj = {};
    obj[key] = rows;

    console.log("finalapicallvalues" + JSON.stringify(obj));

    // const [selectedDate, setDate] = useState(null);
    // const [selectedTime, setTime] = useState(null);
    const [inputValue, setInputValue] = useState([]);

    //datepicker start
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const [minimumDate1, setMinimumDate] = useState();
    const [defaultDate, setDefaultDate] = useState("Date");
    //datepicker end

    //timepicker start
    const [time, setTime] = useState(new Date());
    const [defaultTime, setDefaultTime] = useState("Time");
    const [mode, setMode] = useState("time");
    const [showtime, setShowtime] = useState(false);

    const [showError, setShowError] = useState(false);

    const onChange = (event, selectedTime) => {
      const currentTime = selectedTime || time;
      setShowtime(Platform.OS === "ios");

      console.log("timeclickifelse");
      setTime(currentTime);
      setShowtime(false);
      setDefaultTime(moment(currentTime).format("hh:mm a"));
      setShowError(false);
      updateRow(
        props.rowId,
        props.data.headerId,
        moment(currentTime).format("hh:mm a")
      );
    };

    //timepicker end

    const showMode = (currentMode) => {
      console.log("clikedmodetime");
      setShowtime(true);
      setMode(currentMode);
    };

    const showTimepicker = () => {
      console.log("clickeeedtime");
      showMode("time");
    };

    const setSelectedDate = (date) => {
      setDate(date);
      updateRow(props.rowId, props.data.headerId, date);
    };

    const setSelectedTime = (time) => {
      setTime(time);
      updateRow(props.rowId, props.data.headerId, time);
    };

    const updateData = () => {


      updateRow(props.rowId, props.data.headerId, inputValue);
    };

    let data = "";
    if (props.data.type == "Short Text Field") {
      data = (
        <TextInput
          mode={data?.fieldVariant ? data?.fieldVariant : "outlined"}
          style={{ width: 180, borderColor: "#0000001F" }}
          placeholder="Short Text Field"
          disabled={props.customOptions.editRow ? false : true}
          theme={{
            fonts: { regular: { fontFamily: fontsRegular(themeData) } },
            colors: {
              primary: primaryColor(props),
              underlineColor: "transparent",
            },
          }}
          defaultValue={props.data.value}
          variant={props.fieldVariant}
          required={props.data.required}
          value={inputValue}
          onChangeText={(text) => setInputValue(text)}
          onBlur={updateData}
        />
      );
    } else if (props.data.type == "Long Text Field") {
      data = (
        <TextInput
          mode={data?.fieldVariant ? data?.fieldVariant : "outlined"}
          style={{ width: 180, borderColor: "#0000001F" }}
          placeholder="Long Text Field"
          disabled={props.customOptions.editRow ? false : true}
          theme={{
            fonts: { regular: { fontFamily: fontsRegular(themeData) } },
            colors: {
              primary: primaryColor(props),
              underlineColor: "transparent",
            },
          }}
          defaultValue={props.data.value}
          variant={props.fieldVariant}
          required={props.data.required}
          value={inputValue}
          onChangeText={(text) => setInputValue(text)}
          onBlur={updateData}
        />
      );
    } else if (props.data.type == "Email") {
      data = (
        <TextInput
          mode={data?.fieldVariant ? data?.fieldVariant : "outlined"}
          style={{ width: 180, borderColor: "#0000001F" }}
          placeholder="Email"
          disabled={props.customOptions.editRow ? false : true}
          theme={{
            fonts: { regular: { fontFamily: fontsRegular(themeData) } },
            colors: {
              primary: primaryColor(props),
              underlineColor: "transparent",
            },
          }}
          defaultValue={props.data.value}
          variant={props.fieldVariant}
          required={props.data.required}
          value={inputValue}
          onChangeText={(text) => setInputValue(text)}
          onBlur={updateData}
        />
      );
    } else if (props.data.type == "Numbers") {
      data = (
        <TextInput
          mode={data?.fieldVariant ? data?.fieldVariant : "outlined"}
          style={{ width: 180, borderColor: "#0000001F" }}
          placeholder="Numbers"
          disabled={props.customOptions.editRow ? false : true}
          theme={{
            fonts: { regular: { fontFamily: fontsRegular(themeData) } },
            colors: {
              primary: primaryColor(props),
              underlineColor: "transparent",
            },
          }}
          defaultValue={props.data.value}
          variant={props.fieldVariant}
          required={props.data.required}
          value={inputValue}
          onChangeText={(text) => setInputValue(text)}
          onBlur={updateData}
          keyboardType={
            Platform.OS === "android"
              ? "phone-pad"
              : Platform.OS === "ios"
              ? "number-pad"
              : "numbers-and-punctuation"
          }
        />
      );
    } else if (props.data.type == "Date Picker") {
      data = (
        //   <DatePicker
        //   modal
        //   open={open}
        //   date={date}
        //   onConfirm={(date) => {
        //     setOpen(false)
        //     setDate(date)
        //   }}
        //   onCancel={() => {
        //     setOpen(false)
        //   }}
        // />

        <>
          <View
            style={{
              height: 55,
              width: 180,
              flexDirection: "row",
              borderColor: "#0000001F",
              borderWidth: 2,
              justifyContent: "space-between",
              alignContent: "center",
              alignItems: "center",
              alignSelf: "center",
              marginVertical: 5,
            }}
          >
            {data.customOptions?.required ? (
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
                marginLeft: 10,
                fontFamily: fontsRegular(themeData),
              }}
            >
              {defaultDate}
            </Text>
            <Icon
              name="date-range"
              size={25}
              onPress={() => setShow(true)}
              style={{ marginLeft: -30 }}
            />
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
              setDefaultDate(moment(date).format("DD/MM/YYYY"));
              // updateRow(props.rowId, props.data.headerId, date);
              //changedValues(date, data.componentId);
            }}
            onCancel={() => {
              setShow(false);
            }}
          />
        </>
      );
    } else if (props.data.type == "Time") {
      data = (
        <>
          <View
            style={{
              height: 55,
              width: 180,
              flexDirection: "row",
              borderColor: "#0000001F",
              borderWidth: 2,
              justifyContent: "space-between",
              alignContent: "center",
              alignItems: "center",
              alignSelf: "center",
            }}
          >
            {data.customOptions?.required ? (
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
                marginLeft: data.customOptions?.required ? 18 : 10,
                fontFamily: fontsRegular(themeData),
              }}
            >
              {defaultTime}
            </Text>
            <View>
              <Icon
                name="timer"
                size={25}
                onPress={showTimepicker}
                style={{ marginLeft: -30 }}
              />
            </View>
          </View>

          {showtime ? (
            <DateTimePicker
              testID="dateTimePicker"
              display={Platform.OS == "ios" ? "inline" : "default"}
              value={time}
              mode={mode}
              open={showtime}
              is24Hour={Platform.OS == "ios" ? null : true}
              //locale={Platform.OS == "ios" ? "es-ES" : null}
              onChange={onChange}
            />
          ) : null}
        </>
      );
    }
    return data;
  };

  const addRow = () => {
    console.log(
      "clickeeedd row new" + JSON.stringify(data.customOptions.headerList)
    );

    setOpen(true);
    setRows((rows) => [
      ...rows,
      { rowId: rows.length, values: data.customOptions.headerList },
    ]);
  };

  const deleteRow = (id) => {
    console.log("deleted" + JSON.stringify(rows));

    if (rows.length == 1) {
      console.log("lengthzeroooo");
      setRows([]);
    } else {
      let remainingRows = rows.filter((row) => {
        return row.rowId !== id;
      });
      setRows(remainingRows);
    }
  };

  const updateRow = (id, headerId, value) => {
    console.log(
      "clicked updaterow" + "id" + id + "headerId" + headerId + "value" + value
    );
    let newRows = rows.map((row) => {
      //checking for all mandatpry fields

      if (id === row.rowId) {
        console.log("clicked new if updaterow");

        let matchIndex = row.values.findIndex((v) => v.headerId === headerId);

        let newValues = row.values;
        newValues[matchIndex]["value"] = value;

        //               const clonedArrayES6 = [...matchIndex];
        // const newArray = matchIndex;

        // // False, i.e. shallow copy
        // console.log('clonedarray'+clonedArrayES6===matchIndex)

        // // True, i.e. deep copy
        // console.log('clonedarray'+newArray === matchIndex)
        //             //  let newValues = cloneDeep(row.values);
        //               newValues[matchIndex]["value"] = value;

        return { ...row, values: newValues };
      }
      return row;
    });
    setRows(newRows);
    // changedValues(data.id, newRows, true);
    changedValues(newRows, data.id);
  };

  rows.map((row, index) => (
    <DataTable.Row key={row}>
      <DataTable.Cell>
        <TextInputCells id={row + "" + index} />
      </DataTable.Cell>
    </DataTable.Row>
  ));
  const InputTable = (props) => {
    return (
      <ScrollView horizontal>
        <DataTable>
          <DataTable.Header
            style={{ backgroundColor: colors.staticWhiteColor }}
          >
            {props.tableHeaders.map((header, index) => (
              <DataTable.Title key={index} style={{ width: props.tableHeaders.length == 1 ? Dimensions.get('window').width : 200 }}>
                <Text
                  style={{ color: "red" }}
                >
                  {header.required ? " *  " : ""}
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: 'black',
                    fontWeight: "bold",
                  }}
                >
                  {header?.label}
                </Text>
              </DataTable.Title>
            ))}
          </DataTable.Header>

          {props.rows.map((row, rowIndex) => (
            <DataTable.Row key={row.rowId} style={{backgroundColor: rowIndex % 2 == 0 ? colors.componentFrameColor: colors.staticWhiteColor, paddingTop: 5, paddingBottom: 5}}>
              {props.tableHeaders.map((header, cellIndex) => (
                <DataTable.Cell key={row + cellIndex} style={{ width: 200 }}>
                  <TextInputCells
                    customOptions={props.customOptions}
                    data={header}
                    options={header.options}
                    type={header.type}
                    required={header.required}
                    fieldVariant={props.fieldVariant}
                    rowId={row.rowId}
                    value={
                      row.values.filter(
                        (v) => v.headerId === header.headerId
                      )[0].value
                        ? row.values.filter(
                            (v) => v.headerId === header.headerId
                          )[0].value
                        : ""
                    }
                  />
                </DataTable.Cell>
              ))}
              <DataTable.Cell key={row + props.tableHeaders.length + 1}>
                {props.customOptions.deleteRow ? (
                  <Icon
                    name="delete"
                    size={30}
                    value={rowIndex}
                    onPress={() => {
                      deleteRow(row.rowId);
                    }}
                  />
                ) : null}
              </DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
      </ScrollView>
    );
  };

  return (
    <View style={{margin: 10, width: "95%"}}>
      <InputTable
        customOptions={data.customOptions}
        tableHeaders={data.customOptions.headerList}
        rows={rows}
        fieldVariant={data.fieldVariant}
      />
      {(rows.length < parseInt(data.customOptions.maximalRows) ||
        data.customOptions.maximalRows == "0") && (
        <TouchableOpacity
          style={{ width: 110, margin: 10 }}
          onPress={() => {
            addRow();
          }}
        >
          <Text
            style={{
              color: "#50BFB7",
              fontSize: 14,
              fontWeight: "bold",
              fontFamily: fontsRegular(themeData),
            }}
          >
            {data.customOptions.labelAdd}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 100,
    paddingHorizontal: 30,
  },
  inputsContainer: {
    flex: 1,
    marginBottom: 5,
  },
  // textSize: {

  //   marginLeft: 15,
  //   fontSize: 18,
  //   color: '#50bfb7'
  // },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
  },
  default: {
    width: "100%",
    backgroundColor: "lightgray",
    // margin: 10,
    // height: 56,
    // width: 360,
  },
  helpersWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  helper: {
    flexShrink: 1,
  },
  counterHelper: {
    textAlign: "right",
  },
  actions: {
    flexDirection: "row",
  },
  savetextSize: {
    color: "#000",
    marginLeft: 15,
    fontSize: 16,
  },
  edittextSize: {
    color: "green",
    marginLeft: 15,
    fontSize: 16,
  },
  deletetextSize: {
    color: "red",
    marginLeft: 15,
    fontSize: 16,
  },
});

export default Inputtable;

"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _core = require("@material-ui/core");

var _styles = require("@material-ui/core/styles");

var _styles2 = require("@material-ui/styles");

var _Add = _interopRequireDefault(require("@material-ui/icons/Add"));

var _Remove = _interopRequireDefault(require("@material-ui/icons/Remove"));

var _Info = _interopRequireDefault(require("@material-ui/icons/Info"));

var _Close = _interopRequireDefault(require("@material-ui/icons/Close"));

var _CheckCircle = _interopRequireDefault(require("@material-ui/icons/CheckCircle"));

var _RadioButtonUnchecked = _interopRequireDefault(require("@material-ui/icons/RadioButtonUnchecked"));

var _V5GlobalDownloadTemplate = _interopRequireDefault(require("./V5GlobalDownloadTemplate"));

var _V5GlobalDnDFileControl = _interopRequireDefault(require("./V5GlobalDnDFileControl"));

var _ = require("..");

var XLSX = _interopRequireWildcard(require("xlsx"));

var useStyles = (0, _styles2.makeStyles)(function (theme) {
  return {};
});

function DropdownOptions(props) {
  var dropDownOptions = props.dropDownOptions,
      handleDropdownDataOptions = props.handleDropdownDataOptions,
      element = props.element,
      handledropDownOptions = props.handledropDownOptions,
      classes = props.classes;
  var localClasses = useStyles();

  var _useState = (0, _react.useState)(null),
      _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
      file = _useState2[0],
      setFile = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      _useState4 = (0, _slicedToArray2["default"])(_useState3, 2),
      isFileSelected = _useState4[0],
      setIsFileSelected = _useState4[1];

  var _useState5 = (0, _react.useState)(false),
      _useState6 = (0, _slicedToArray2["default"])(_useState5, 2),
      isProgressComplete = _useState6[0],
      setIsProgressComplete = _useState6[1];

  var _useState7 = (0, _react.useState)(false),
      _useState8 = (0, _slicedToArray2["default"])(_useState7, 2),
      isdeleted = _useState8[0],
      setisDeleted = _useState8[1]; //alert(JSON.stringify(element)


  function setDropDown(list) {
    var uploadedList = [];
    list.map(function (el, index) {
      uploadedList.push({
        value: el.label,
        label: el.label,
        key: el.__rowNum__
      });
      props.element.customOptions.optionsText = props.element.customOptions.optionsText !== undefined ? props.element.customOptions.optionsText + "\n" + (el === null || el === void 0 ? void 0 : el.label) : el === null || el === void 0 ? void 0 : el.label;
      props.element.customOptions.uploadedOptions.push({
        value: el.label,
        label: el.label,
        key: el.__rowNum__
      });
    });
  }

  var setDropDownOptions = function setDropDownOptions(fileName, uploaded) {
    props.element.fileUploaded = fileName;
    props.element.uploaded = uploaded;
  };

  var deleteUploadedOptions = function deleteUploadedOptions(isDeleted) {
    // props.element.dropDownOptions = props.element.dropDownOptions.filter((el) => {
    //     props.element.customOptions.uploadedOptions.map((prop) => {
    //         el.value !== prop.value
    //     })
    // })
    setisDeleted(true);
    var Val = props.element.dropDownOptions.filter(function (elem) {
      return !props.element.customOptions.uploadedOptions.find(function (_ref) {
        var key = _ref.key;
        return elem.key === key;
      });
    }); // let Val = props.element.dropDownOptions.filter((el) => {
    //     return props.element.customOptions.uploadedOptions.filter((prop) => {
    //         prop.value !== el.value
    //     })
    // })

    props.element.dropDownOptions = Val;
    props.element.customOptions.optionsText = "";
    props.element.dropDownOptions.map(function (el, i) {
      if (i + 1 === props.element.dropDownOptions.length) {
        props.element.customOptions.optionsText += el.value;
      } else {
        props.element.customOptions.optionsText += el.value + "\n";
      }
    });
    handledropDownOptions(props.element.dropDownOptions, props.element.customOptions.optionsText, "", false);
  };

  var handleDownload = function handleDownload() {
    var jsonToConvert = [];
    jsonToConvert.push({
      label: ""
    });
    var excelSheet = XLSX.utils.json_to_sheet(jsonToConvert);
    var workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, excelSheet, 'MASTERDATA_TABLE');
    XLSX.writeFile(workBook, 'MASTERDATA_TABLE.XLS');
  };

  (0, _react.useEffect)(function () {
    if (!isdeleted) {
      props.element.dropDownOptions = props.element.dropDownOptions.concat(props.element.customOptions.uploadedOptions);

      if (props.element.dropDownOptions.length > 0) {
        var uniqueDropDownOptions = (0, _toConsumableArray2["default"])(new Map(props.element.dropDownOptions.map(function (item) {
          return [item["value"], item];
        })).values());
        props.element.dropDownOptions = uniqueDropDownOptions;
      }
    }
  }, [props.element.dropDownOptions, props.element.customOptions.uploadedOptions]);
  (0, _react.useEffect)(function () {
    if (props.element.customOptions.uploadedOptions.length > 0) {
      var _props$element$custom;

      props.element.customOptions.uploadedOptions.map(function (el) {
        props.element.customOptions.optionsText = props.element.customOptions.optionsText !== undefined && props.element.customOptions.optionsText + "\n" + el.value;
      });
      var OptionsTextArray = (_props$element$custom = props.element.customOptions.optionsText) === null || _props$element$custom === void 0 ? void 0 : _props$element$custom.split(/\r?\n/);
      var uniqueOptionText = (0, _toConsumableArray2["default"])(new Set(OptionsTextArray));
      props.element.customOptions.optionsText = "";
      uniqueOptionText.map(function (el, i) {
        if (i + 1 === uniqueOptionText.length) {
          props.element.customOptions.optionsText += el;
        } else {
          props.element.customOptions.optionsText += el + "\n";
        }
      });
      handledropDownOptions(props.element.dropDownOptions, props.element.customOptions.optionsText, file, true);
    }
  }, [props.element.customOptions.optionsText]);
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_.V5FormBuilderDownloadTemplate, {
    handleDownloadTemplate: handleDownload,
    headerText: "Click here to download template",
    headerDescription: "MASTERDATA_TABLE.XLS"
  }), /*#__PURE__*/_react["default"].createElement(_V5GlobalDnDFileControl["default"], {
    file: file,
    setDropDown: setDropDown,
    setFile: setFile,
    isFileSelected: isFileSelected,
    setIsFileSelected: setIsFileSelected,
    isProgressComplete: isProgressComplete,
    setIsProgressComplete: setIsProgressComplete,
    dropDownOptions: props.element.dropDownOptions,
    fileUploaded: props.element.fileUploaded,
    uploaded: props.element.uploaded,
    setDropDownOptions: setDropDownOptions,
    deleteUploadedOptions: deleteUploadedOptions
  }));
}

var _default = DropdownOptions;
exports["default"] = _default;
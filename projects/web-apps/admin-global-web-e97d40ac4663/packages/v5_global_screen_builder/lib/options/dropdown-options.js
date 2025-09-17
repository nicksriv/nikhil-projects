"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
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
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
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
    _useState2 = _slicedToArray(_useState, 2),
    file = _useState2[0],
    setFile = _useState2[1];
  var _useState3 = (0, _react.useState)(false),
    _useState4 = _slicedToArray(_useState3, 2),
    isFileSelected = _useState4[0],
    setIsFileSelected = _useState4[1];
  var _useState5 = (0, _react.useState)(false),
    _useState6 = _slicedToArray(_useState5, 2),
    isProgressComplete = _useState6[0],
    setIsProgressComplete = _useState6[1];
  var _useState7 = (0, _react.useState)(false),
    _useState8 = _slicedToArray(_useState7, 2),
    isdeleted = _useState8[0],
    setisDeleted = _useState8[1];
  //alert(JSON.stringify(element)

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
    });
    // let Val = props.element.dropDownOptions.filter((el) => {
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
        var uniqueDropDownOptions = _toConsumableArray(new Map(props.element.dropDownOptions.map(function (item) {
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
      var uniqueOptionText = _toConsumableArray(new Set(OptionsTextArray));
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
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_.V5FormBuilderDownloadTemplate, {
    handleDownloadTemplate: handleDownload,
    headerText: "Click here to download template",
    headerDescription: "MASTERDATA_TABLE.XLS"
  }), /*#__PURE__*/_react.default.createElement(_V5GlobalDnDFileControl.default, {
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
exports.default = _default;
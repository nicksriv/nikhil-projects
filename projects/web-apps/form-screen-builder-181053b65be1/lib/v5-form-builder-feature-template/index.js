"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _buttonRadio = _interopRequireDefault(require("./button-radio"));

var _checklist = _interopRequireDefault(require("./checklist"));

var _datePicker = _interopRequireDefault(require("./datePicker"));

var _dropdown = _interopRequireDefault(require("./dropdown"));

var _inputTable = _interopRequireDefault(require("./input-table"));

var _input = _interopRequireDefault(require("./input"));

var _locationMap = _interopRequireDefault(require("./location-map"));

var _phone = _interopRequireDefault(require("./phone"));

var _sectionHeader = _interopRequireDefault(require("./section-header"));

var _signature = _interopRequireDefault(require("./signature"));

var _singleChoice = _interopRequireDefault(require("./single-choice"));

var _button = _interopRequireDefault(require("./button"));

var _photo = _interopRequireDefault(require("./photo"));

var _tiles = _interopRequireDefault(require("./tiles"));

var _barcodeScanner = _interopRequireDefault(require("./barcode-scanner"));

function V5FormElement(props) {
  var elementType = props.elementType;
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, function () {
    switch (elementType) {
      case 'Short_Text':
      case 'Long_Text':
      case 'Email':
        return /*#__PURE__*/_react["default"].createElement(_input["default"], {
          customStyle: {},
          placeholderText: "",
          type: "text"
        });

      case 'Number':
        return /*#__PURE__*/_react["default"].createElement(_input["default"], {
          customStyle: {},
          placeholderText: "",
          type: "number"
        });

      case 'Dropdown':
        return /*#__PURE__*/_react["default"].createElement(_dropdown["default"], null);

      case 'Single_Choice':
        return /*#__PURE__*/_react["default"].createElement(_singleChoice["default"], null);

      case 'Button_Radios':
        return /*#__PURE__*/_react["default"].createElement(_buttonRadio["default"], null);

      case 'Location_Coordinates':
        return /*#__PURE__*/_react["default"].createElement(_locationMap["default"], null);

      case 'Check_List':
        return /*#__PURE__*/_react["default"].createElement(_checklist["default"], null);

      case 'Configurable_List':
        return /*#__PURE__*/_react["default"].createElement(_inputTable["default"], null);

      case 'Signature':
        return /*#__PURE__*/_react["default"].createElement(_signature["default"], null);

      case 'Section_Header':
        return /*#__PURE__*/_react["default"].createElement(_sectionHeader["default"], null);

      case 'Date_Picker':
        return /*#__PURE__*/_react["default"].createElement(_datePicker["default"], null);

      case 'Phone':
        return /*#__PURE__*/_react["default"].createElement(_phone["default"], null);

      case 'Button':
        return /*#__PURE__*/_react["default"].createElement(_button["default"], null);

      case 'Photo':
        return /*#__PURE__*/_react["default"].createElement(_photo["default"], null);

      case 'Tiles':
        return /*#__PURE__*/_react["default"].createElement(_tiles["default"], null);

      case 'Barcode_Scanner':
        return /*#__PURE__*/_react["default"].createElement(_barcodeScanner["default"], null);

      default:
        return null;
    }
  }());
}

V5FormElement.propTypes = {
  elementType: _propTypes["default"].string.isRequired
};
V5FormElement.defaultProps = {};
var _default = V5FormElement;
exports["default"] = _default;
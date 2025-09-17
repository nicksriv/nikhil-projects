"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _objectDestructuringEmpty2 = _interopRequireDefault(require("@babel/runtime/helpers/objectDestructuringEmpty"));

var _react = _interopRequireDefault(require("react"));

var _core = require("@material-ui/core");

var _PhotoCamera = _interopRequireDefault(require("@material-ui/icons/PhotoCamera"));

var _ImageRounded = _interopRequireDefault(require("@material-ui/icons/ImageRounded"));

var V5BarcodeScanner = function V5BarcodeScanner(props) {
  (0, _objectDestructuringEmpty2["default"])(props);
  return /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      display: "flex"
    }
  }, /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      width: 100,
      height: 45,
      borderRadius: '5px',
      border: '1px solid #919191'
    }
  }, /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      padding: "12px",
      display: "flex"
    }
  }, /*#__PURE__*/_react["default"].createElement("span", {
    style: {
      color: "#666666",
      fontWeight: "400",
      fontSize: "0.75rem"
    }
  }, "Barcode"))), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(_core.IconButton, {
    style: {
      marginLeft: "27px"
    },
    disabled: true
  }, /*#__PURE__*/_react["default"].createElement(_PhotoCamera["default"], null))));
};

var _default = V5BarcodeScanner;
exports["default"] = _default;
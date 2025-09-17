"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _objectDestructuringEmpty2 = _interopRequireDefault(require("@babel/runtime/helpers/objectDestructuringEmpty"));

var _react = _interopRequireDefault(require("react"));

var V5Signature = function V5Signature(props) {
  (0, _objectDestructuringEmpty2["default"])(props);
  return /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      height: "60px",
      width: "100%",
      border: "1px solid #919191",
      borderRadius: "6px",
      backgroundColor: "#eaeaea",
      fontSize: "0.5rem"
    }
  }, /*#__PURE__*/_react["default"].createElement("span", {
    style: {
      padding: "5px"
    }
  }, "Signature Pad"));
};

var _default = V5Signature;
exports["default"] = _default;
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _objectDestructuringEmpty2 = _interopRequireDefault(require("@babel/runtime/helpers/objectDestructuringEmpty"));

var _react = _interopRequireDefault(require("react"));

var _input = _interopRequireDefault(require("./input"));

var V5Phone = function V5Phone(props) {
  (0, _objectDestructuringEmpty2["default"])(props);
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      display: "flex"
    }
  }, /*#__PURE__*/_react["default"].createElement(_input["default"], {
    type: "number",
    customStyle: {
      marginRight: "3px",
      width: "62px"
    },
    placeholderText: "+1"
  }), /*#__PURE__*/_react["default"].createElement(_input["default"], {
    type: "number",
    customStyle: {
      marginRight: "3px",
      width: "62px"
    },
    placeholderText: "000"
  }), /*#__PURE__*/_react["default"].createElement(_input["default"], {
    type: "number",
    customStyle: {},
    placeholderText: "000-0000"
  })));
};

var _default = V5Phone;
exports["default"] = _default;
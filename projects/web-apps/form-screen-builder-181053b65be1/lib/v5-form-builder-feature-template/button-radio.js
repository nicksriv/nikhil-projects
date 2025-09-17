"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _objectDestructuringEmpty2 = _interopRequireDefault(require("@babel/runtime/helpers/objectDestructuringEmpty"));

var _react = _interopRequireDefault(require("react"));

var _core = require("@material-ui/core");

var V5ButtonRadio = function V5ButtonRadio(props) {
  (0, _objectDestructuringEmpty2["default"])(props);
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_core.ButtonGroup, {
    size: "small",
    "aria-label": "outlined button group",
    disabled: true
  }, /*#__PURE__*/_react["default"].createElement(_core.Button, {
    style: {
      width: '50px',
      height: '28px'
    }
  }, /*#__PURE__*/_react["default"].createElement("span", {
    style: {
      fontSize: "0.5rem"
    }
  }, "Option1")), /*#__PURE__*/_react["default"].createElement(_core.Button, {
    style: {
      width: '50px',
      height: '28px'
    }
  }, /*#__PURE__*/_react["default"].createElement("span", {
    style: {
      fontSize: "0.5rem"
    }
  }, "Option2")), /*#__PURE__*/_react["default"].createElement(_core.Button, {
    style: {
      width: '50px',
      height: '28px'
    }
  }, /*#__PURE__*/_react["default"].createElement("span", {
    style: {
      fontSize: "0.5rem"
    }
  }, "Option3"))));
};

var _default = V5ButtonRadio;
exports["default"] = _default;
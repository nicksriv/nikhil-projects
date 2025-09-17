"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _core = require("@material-ui/core");

var V5Input = function V5Input(props) {
  var customStyle = props.customStyle,
      placeholderText = props.placeholderText,
      type = props.type;
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_core.TextField, {
    id: "name-input",
    name: "name",
    variant: "outlined",
    size: "small",
    type: type,
    style: customStyle,
    placeholder: placeholderText,
    disabled: true
  }));
};

var _default = V5Input;
exports["default"] = _default;
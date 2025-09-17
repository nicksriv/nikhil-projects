"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _objectDestructuringEmpty2 = _interopRequireDefault(require("@babel/runtime/helpers/objectDestructuringEmpty"));

var _react = _interopRequireDefault(require("react"));

var _core = require("@material-ui/core");

var V5Dropdown = function V5Dropdown(props) {
  (0, _objectDestructuringEmpty2["default"])(props);
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_core.Select, {
    labelId: "demo-simple-select-outlined-label",
    id: "demo-simple-select-outlined",
    size: "small",
    variant: "outlined",
    disabled: true
  }));
};

var _default = V5Dropdown;
exports["default"] = _default;
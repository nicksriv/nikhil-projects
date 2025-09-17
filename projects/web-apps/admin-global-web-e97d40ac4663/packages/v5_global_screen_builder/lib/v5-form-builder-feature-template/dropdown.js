"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _core = require("@material-ui/core");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError("Cannot destructure " + obj); }
var V5Dropdown = function V5Dropdown(props) {
  _objectDestructuringEmpty(props);
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_core.Select, {
    labelId: "demo-simple-select-outlined-label",
    id: "demo-simple-select-outlined",
    size: "small",
    variant: "outlined",
    disabled: true
  }));
};
var _default = V5Dropdown;
exports.default = _default;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = MaterialElementLabel;
var _react = _interopRequireDefault(require("react"));
var _core = require("@material-ui/core");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function MaterialElementLabel(props) {
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "material-element-label",
    style: {
      marginTop: "-12px"
    }
  }, /*#__PURE__*/_react.default.createElement(_core.Typography, {
    component: "span"
  }, props.data.label, " ", props.data.customOptions.required && /*#__PURE__*/_react.default.createElement("span", {
    className: "text-error"
  }, " *")));
}
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _core = require("@material-ui/core");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var V5Input = function V5Input(props) {
  var customStyle = props.customStyle,
    placeholderText = props.placeholderText,
    type = props.type;
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_core.TextField, {
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
exports.default = _default;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _core = require("@material-ui/core");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError("Cannot destructure " + obj); }
var V5SectionHeader = function V5SectionHeader(props) {
  _objectDestructuringEmpty(props);
  return /*#__PURE__*/_react.default.createElement(_core.Button, {
    size: "large",
    variant: "contained",
    disabled: true,
    style: {
      fontSize: "0.5rem",
      marginTop: "3px",
      color: "#ffffff",
      backgroundColor: "#000000",
      width: "100%"
    }
  }, "Section Header");
};
var _default = V5SectionHeader;
exports.default = _default;
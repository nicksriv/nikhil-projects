"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _core = require("@material-ui/core");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError("Cannot destructure " + obj); }
var V5Button = function V5Button(props) {
  _objectDestructuringEmpty(props);
  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_core.Button, {
    variant: "contained",
    size: "medium",
    style: {
      width: '50px',
      height: '28px'
    },
    disabled: true
  }, "BUTTON"));
};
var _default = V5Button;
exports.default = _default;
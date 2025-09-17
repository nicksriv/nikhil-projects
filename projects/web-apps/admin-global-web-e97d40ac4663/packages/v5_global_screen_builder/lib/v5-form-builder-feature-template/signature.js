"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError("Cannot destructure " + obj); }
var V5Signature = function V5Signature(props) {
  _objectDestructuringEmpty(props);
  return /*#__PURE__*/_react.default.createElement("div", {
    style: {
      height: "60px",
      width: "100%",
      border: "1px solid #919191",
      borderRadius: "6px",
      backgroundColor: "#eaeaea",
      fontSize: "0.5rem"
    }
  }, /*#__PURE__*/_react.default.createElement("span", {
    style: {
      padding: "5px"
    }
  }, "Signature Pad"));
};
var _default = V5Signature;
exports.default = _default;
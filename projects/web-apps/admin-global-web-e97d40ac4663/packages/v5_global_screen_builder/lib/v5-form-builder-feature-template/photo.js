"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _core = require("@material-ui/core");
var _PhotoCamera = _interopRequireDefault(require("@material-ui/icons/PhotoCamera"));
var _ImageRounded = _interopRequireDefault(require("@material-ui/icons/ImageRounded"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError("Cannot destructure " + obj); }
var V5Photo = function V5Photo(props) {
  _objectDestructuringEmpty(props);
  return /*#__PURE__*/_react.default.createElement("div", {
    style: {
      height: 45,
      borderRadius: '5px',
      border: '1px solid #919191',
      backgroundColor: "#eaeaea"
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      padding: "12px",
      display: "flex",
      backgroundColor: 'blueviolet'
    }
  }, /*#__PURE__*/_react.default.createElement("span", {
    style: {
      color: "#666666",
      fontWeight: "400",
      fontSize: "0.75rem"
    }
  }, "Photo"), /*#__PURE__*/_react.default.createElement("div", {
    style: {
      margin: "0 auto"
    }
  }, /*#__PURE__*/_react.default.createElement(_core.IconButton, {
    style: {
      marginRight: "10px",
      padding: "0"
    },
    disabled: true
  }, /*#__PURE__*/_react.default.createElement(_PhotoCamera.default, null)), /*#__PURE__*/_react.default.createElement(_core.IconButton, {
    style: {
      padding: "0"
    },
    disabled: true
  }, /*#__PURE__*/_react.default.createElement(_ImageRounded.default, null)))));
};
var _default = V5Photo;
exports.default = _default;
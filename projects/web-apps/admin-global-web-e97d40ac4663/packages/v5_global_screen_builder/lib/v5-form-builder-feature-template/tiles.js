"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _core = require("@material-ui/core");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError("Cannot destructure " + obj); }
var V5Tiles = function V5Tiles(props) {
  _objectDestructuringEmpty(props);
  return /*#__PURE__*/_react.default.createElement("div", {
    style: _defineProperty({
      height: 54,
      borderRadius: '5px',
      boxShadow: "300ms",
      color: "rgba(0, 0, 0, 0.87)"
    }, "boxShadow", " 0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)")
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      padding: "10px",
      display: "flex",
      flexDirection: "column"
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      margin: "0 auto",
      color: "rgb(159, 159, 159)"
    }
  }, "Title Text"), /*#__PURE__*/_react.default.createElement("div", {
    style: {
      margin: "0 auto",
      color: "rgb(33, 33, 33)",
      fontWeight: "bold"
    }
  }, "Text")));
};
var _default = V5Tiles;
exports.default = _default;
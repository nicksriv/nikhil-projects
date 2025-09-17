"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError("Cannot destructure " + obj); }
var V5InputTable = function V5InputTable(props) {
  _objectDestructuringEmpty(props);
  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      height: "30px",
      width: "100%",
      borderRadius: "6px",
      backgroundColor: "#0000001F",
      fontSize: "0.5rem",
      fontWeight: "bold"
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      padding: "8px",
      display: "flex",
      justifyContent: "space-between"
    }
  }, "Header Item 1", /*#__PURE__*/_react.default.createElement("div", {
    style: {
      textAlign: "right"
    }
  }, "Actions"))), /*#__PURE__*/_react.default.createElement("div", {
    style: {
      fontSize: "0.75rem",
      color: "#2a4fbc",
      marginLeft: "8px",
      marginTop: "2px",
      fontWeight: "bold"
    }
  }, "ADD ROW"));
};
var _default = V5InputTable;
exports.default = _default;
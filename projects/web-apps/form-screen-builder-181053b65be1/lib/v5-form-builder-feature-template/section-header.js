"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _objectDestructuringEmpty2 = _interopRequireDefault(require("@babel/runtime/helpers/objectDestructuringEmpty"));

var _react = _interopRequireDefault(require("react"));

var _core = require("@material-ui/core");

var V5SectionHeader = function V5SectionHeader(props) {
  (0, _objectDestructuringEmpty2["default"])(props);
  return /*#__PURE__*/_react["default"].createElement(_core.Button, {
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
exports["default"] = _default;
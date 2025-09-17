"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _objectDestructuringEmpty2 = _interopRequireDefault(require("@babel/runtime/helpers/objectDestructuringEmpty"));

var _react = _interopRequireDefault(require("react"));

var _core = require("@material-ui/core");

var V5Button = function V5Button(props) {
  (0, _objectDestructuringEmpty2["default"])(props);
  return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(_core.Button, {
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
exports["default"] = _default;
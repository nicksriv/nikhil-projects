"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _objectDestructuringEmpty2 = _interopRequireDefault(require("@babel/runtime/helpers/objectDestructuringEmpty"));

var _react = _interopRequireDefault(require("react"));

var _core = require("@material-ui/core");

var V5SingleChoice = function V5SingleChoice(props) {
  (0, _objectDestructuringEmpty2["default"])(props);
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_core.RadioGroup, {
    name: "demo-name",
    row: true
  }, /*#__PURE__*/_react["default"].createElement(_core.FormControlLabel, {
    disabled: true,
    control: /*#__PURE__*/_react["default"].createElement(_core.Radio, {
      size: "small"
    }),
    label: "Option 1"
  }), /*#__PURE__*/_react["default"].createElement(_core.FormControlLabel, {
    disabled: true,
    control: /*#__PURE__*/_react["default"].createElement(_core.Radio, {
      size: "small"
    }),
    label: "Option 2"
  }), /*#__PURE__*/_react["default"].createElement(_core.FormControlLabel, {
    disabled: true,
    control: /*#__PURE__*/_react["default"].createElement(_core.Radio, {
      size: "small"
    }),
    label: "Option 3"
  })));
};

var _default = V5SingleChoice;
exports["default"] = _default;
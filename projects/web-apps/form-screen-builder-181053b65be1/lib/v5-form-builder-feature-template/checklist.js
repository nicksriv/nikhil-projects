"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _objectDestructuringEmpty2 = _interopRequireDefault(require("@babel/runtime/helpers/objectDestructuringEmpty"));

var _react = _interopRequireDefault(require("react"));

var _core = require("@material-ui/core");

var V5Checklist = function V5Checklist(props) {
  (0, _objectDestructuringEmpty2["default"])(props);
  return /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      display: "flex"
    }
  }, /*#__PURE__*/_react["default"].createElement(_core.FormControlLabel, {
    control: /*#__PURE__*/_react["default"].createElement(_core.Checkbox, {
      disabled: true,
      color: "primary"
    }),
    label: 'Option 1'
  }), /*#__PURE__*/_react["default"].createElement(_core.FormControlLabel, {
    control: /*#__PURE__*/_react["default"].createElement(_core.Checkbox, {
      disabled: true,
      color: "primary"
    }),
    label: 'Option 2'
  }));
};

var _default = V5Checklist;
exports["default"] = _default;
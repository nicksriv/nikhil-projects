"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _core = require("@material-ui/core");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError("Cannot destructure " + obj); }
var V5SingleChoice = function V5SingleChoice(props) {
  _objectDestructuringEmpty(props);
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_core.RadioGroup, {
    name: "demo-name",
    row: true
  }, /*#__PURE__*/_react.default.createElement(_core.FormControlLabel, {
    disabled: true,
    control: /*#__PURE__*/_react.default.createElement(_core.Radio, {
      size: "small"
    }),
    label: "Option 1"
  }), /*#__PURE__*/_react.default.createElement(_core.FormControlLabel, {
    disabled: true,
    control: /*#__PURE__*/_react.default.createElement(_core.Radio, {
      size: "small"
    }),
    label: "Option 2"
  }), /*#__PURE__*/_react.default.createElement(_core.FormControlLabel, {
    disabled: true,
    control: /*#__PURE__*/_react.default.createElement(_core.Radio, {
      size: "small"
    }),
    label: "Option 3"
  })));
};
var _default = V5SingleChoice;
exports.default = _default;
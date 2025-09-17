"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _core = require("@material-ui/core");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError("Cannot destructure " + obj); }
var V5Checklist = function V5Checklist(props) {
  _objectDestructuringEmpty(props);
  return /*#__PURE__*/_react.default.createElement("div", {
    style: {
      display: "flex"
    }
  }, /*#__PURE__*/_react.default.createElement(_core.FormControlLabel, {
    control: /*#__PURE__*/_react.default.createElement(_core.Checkbox, {
      disabled: true,
      color: "primary"
    }),
    label: 'Option 1'
  }), /*#__PURE__*/_react.default.createElement(_core.FormControlLabel, {
    control: /*#__PURE__*/_react.default.createElement(_core.Checkbox, {
      disabled: true,
      color: "primary"
    }),
    label: 'Option 2'
  }));
};
var _default = V5Checklist;
exports.default = _default;
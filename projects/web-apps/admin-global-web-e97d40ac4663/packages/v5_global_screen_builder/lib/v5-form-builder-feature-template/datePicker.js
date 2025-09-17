"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _dateFns = _interopRequireDefault(require("@date-io/date-fns"));
var _pickers = require("@material-ui/pickers");
var _core = require("@material-ui/core");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError("Cannot destructure " + obj); }
var V5DatePicker = function V5DatePicker(props) {
  _objectDestructuringEmpty(props);
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_pickers.MuiPickersUtilsProvider, {
    utils: _dateFns.default
  }, /*#__PURE__*/_react.default.createElement(_core.Grid, {
    container: true
  }, /*#__PURE__*/_react.default.createElement(_pickers.KeyboardDatePicker, {
    variant: "inline",
    inputVariant: "outlined",
    id: "date-picker-inline",
    size: "small",
    format: "MM-dd-yyyy",
    disabled: true
  }))));
};
var _default = V5DatePicker;
exports.default = _default;
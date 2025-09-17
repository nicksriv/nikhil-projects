"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _objectDestructuringEmpty2 = _interopRequireDefault(require("@babel/runtime/helpers/objectDestructuringEmpty"));

var _react = _interopRequireDefault(require("react"));

var _dateFns = _interopRequireDefault(require("@date-io/date-fns"));

var _pickers = require("@material-ui/pickers");

var _core = require("@material-ui/core");

var V5DatePicker = function V5DatePicker(props) {
  (0, _objectDestructuringEmpty2["default"])(props);
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_pickers.MuiPickersUtilsProvider, {
    utils: _dateFns["default"]
  }, /*#__PURE__*/_react["default"].createElement(_core.Grid, {
    container: true
  }, /*#__PURE__*/_react["default"].createElement(_pickers.KeyboardDatePicker, {
    variant: "inline",
    inputVariant: "outlined",
    id: "date-picker-inline",
    size: "small",
    format: "MM-dd-yyyy",
    disabled: true
  }))));
};

var _default = V5DatePicker;
exports["default"] = _default;
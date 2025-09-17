"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _componentHeader = _interopRequireDefault(require("../form-elements/component-header"));

var _componentLabel = _interopRequireDefault(require("../form-elements/component-label"));

var _core = require("@material-ui/core");

var _pickers = require("@material-ui/pickers");

var _dateFns = _interopRequireDefault(require("@date-io/date-fns"));

var _icons = require("@material-ui/icons");

function Time(props) {
  var _useState = (0, _react.useState)(null),
      _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
      selectedDate = _useState2[0],
      handleDateChange = _useState2[1];

  var fieldVariant = "";

  if (props.globalStyles) {
    fieldVariant = !props.globalStyles.formDefault && props.data.hasOwnProperty("fieldVariant") ? props.data.fieldVariant : props.globalStyles.globalFieldVariant;
  } else {
    if (props.data.fieldVariant) fieldVariant = props.data.fieldVariant;
  }

  var inputWidth = "100%";

  if (props.data.inputFieldSize == 'large') {
    inputWidth = "100%";
  } else if (props.data.inputFieldSize == 'medium') {
    inputWidth = "50%";
  } else if (props.data.inputFieldSize == 'small') {
    inputWidth = "25%";
  }

  var propsData = props.data;
  console.log('time', props);
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "SortableItem rfb-item"
  }, /*#__PURE__*/_react["default"].createElement(_componentHeader["default"], props), /*#__PURE__*/_react["default"].createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/_react["default"].createElement(_core.Grid, {
    container: true
  }, /*#__PURE__*/_react["default"].createElement(_pickers.MuiPickersUtilsProvider, {
    utils: _dateFns["default"]
  }, /*#__PURE__*/_react["default"].createElement(_pickers.TimePicker, {
    label: propsData.label,
    onChange: handleDateChange,
    disablePast: true,
    minTime: new Date(0, 0, 0, 8),
    maxTime: new Date(0, 0, 0, 18, 45) // labelFunc={() => propsData.customOptions.defaultTime === "none" ? 'HH:MM' : selectedDate}
    ,
    value: propsData.customOptions.defaultTime === "none" ? selectedDate : propsData.customOptions.defaultTime === "custom" ? propsData.customOptions.cutomTime : propsData.customOptions.defaultTime === "current" ? new Date() : selectedDate,
    placeholder: "HH:MM",
    required: propsData.customOptions.required,
    InputLabelProps: {
      shrink: true,
      classes: {
        asterisk: 'text-error'
      }
    },
    ampm: propsData.customOptions.checked ? true : false,
    inputVariant: "outlined",
    style: {
      width: inputWidth
    },
    disabled: props.read_only ? true : propsData.customOptions.defaultTime === "none" ? false : true // read_only={props.read_only}
    ,
    InputProps: {
      endAdornment: /*#__PURE__*/_react["default"].createElement(_core.InputAdornment, {
        position: "end"
      }, props.read_only ? /*#__PURE__*/_react["default"].createElement("img", {
        style: {
          opacity: 0.5
        },
        src: "/assets/images/icons/Icon_timer.svg"
      }) : /*#__PURE__*/_react["default"].createElement("img", {
        src: "/assets/images/icons/Icon_timer.svg"
      }))
    }
  })))));
}

var _default = Time;
exports["default"] = _default;
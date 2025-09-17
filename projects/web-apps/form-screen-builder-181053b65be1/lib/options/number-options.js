"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = NumberInputOptions;

var _react = _interopRequireDefault(require("react"));

var _core = require("@material-ui/core");

var _CheckCircle = _interopRequireDefault(require("@material-ui/icons/CheckCircle"));

var _RadioButtonUnchecked = _interopRequireDefault(require("@material-ui/icons/RadioButtonUnchecked"));

var _styles = require("@material-ui/core/styles");

var useStyles = (0, _styles.makeStyles)(function (theme) {
  return {
    subHeading: {
      opacity: "0.6",
      fontSize: "16px",
      fontWeight: "normal",
      "float": 'left'
    },
    button: {
      height: "28px",
      outline: "none",
      textTransform: "capitalize"
    }
  };
});

function NumberInputOptions(props) {
  var classes = useStyles();
  var customOptions = props.element.customOptions;
  var isDisabled = props.element.customOptions.isFieldDisabled;
  var isNumberLimit = props.element.customOptions.hasOwnProperty("isNumberLimit") ? props.element.customOptions.isNumberLimit : false;

  if (isDisabled) {
    customOptions.isNumberLimit = false;
  }

  if (customOptions.isNumberLimit) {
    customOptions.min = customOptions.min;
    customOptions.max = customOptions.max;
  } else {
    customOptions.min = "";
    customOptions.max = "";
  } // const min = props.element.customOptions.hasOwnProperty('min') ? props.element.customOptions.min : 0;
  // const max = props.element.customOptions.hasOwnProperty('max') ? props.element.customOptions.max : 1;


  return /*#__PURE__*/_react["default"].createElement(_core.Grid, {
    container: true,
    direction: "row",
    xs: 12,
    className: "mt-2 mb-2"
  }, /*#__PURE__*/_react["default"].createElement(_core.Grid, {
    item: true,
    xs: 12
  }, /*#__PURE__*/_react["default"].createElement(_core.Grid, {
    container: true,
    justifyContent: "flex-start",
    className: "mt-3"
  }, /*#__PURE__*/_react["default"].createElement(_core.Grid, {
    item: true
  }, !isDisabled && /*#__PURE__*/_react["default"].createElement("h6", {
    className: "".concat(classes.subHeading)
  }, "Number Options Limit Range: ")), /*#__PURE__*/_react["default"].createElement(_core.Grid, {
    item: true
  }, /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, !isDisabled && /*#__PURE__*/_react["default"].createElement(_core.Button, {
    variant: "outlined" // style={{outline:"none"}}
    ,
    size: "small",
    onClick: function onClick(e) {
      return props.setNumberLimit('isNumberLimit', false);
    },
    name: "no",
    className: "".concat(classes.button, " ml-2 mr-2")
  }, /*#__PURE__*/_react["default"].createElement("span", null, "No"), /*#__PURE__*/_react["default"].createElement(_core.Checkbox, {
    size: "small",
    className: "p-0 ml-1",
    color: "primary",
    name: "no",
    icon: /*#__PURE__*/_react["default"].createElement(_RadioButtonUnchecked["default"], {
      className: "checkboxSize"
    }),
    checked: !isNumberLimit,
    checkedIcon: /*#__PURE__*/_react["default"].createElement(_CheckCircle["default"], {
      className: "checkboxSize"
    })
  })), !isDisabled && /*#__PURE__*/_react["default"].createElement(_core.Button, {
    variant: "outlined" //style={{outline:"none"}}
    ,
    size: "small",
    onClick: function onClick(e) {
      return props.setNumberLimit('isNumberLimit', true);
    },
    name: "yes",
    className: "".concat(classes.button, " ml-2 mr-2")
  }, /*#__PURE__*/_react["default"].createElement("span", null, "Yes"), /*#__PURE__*/_react["default"].createElement(_core.Checkbox, {
    size: "small",
    className: "p-0 ml-1",
    color: "primary",
    name: "yes",
    icon: /*#__PURE__*/_react["default"].createElement(_RadioButtonUnchecked["default"], {
      className: "checkboxSize"
    }),
    checked: isNumberLimit,
    checkedIcon: /*#__PURE__*/_react["default"].createElement(_CheckCircle["default"], {
      className: "checkboxSize"
    })
  })))))), /*#__PURE__*/_react["default"].createElement(_core.Grid, {
    container: true,
    justifyContent: "space-between"
  }, isNumberLimit && /*#__PURE__*/_react["default"].createElement(_core.Grid, {
    item: true,
    xs: 12,
    sm: 6
  }, !isDisabled && /*#__PURE__*/_react["default"].createElement(_core.TextField, {
    variant: "outlined",
    type: "number",
    label: "Min Limit",
    defaultValue: customOptions.min,
    onChange: function onChange(e) {
      return props.setNumberLimit('min', e.target.value);
    } // helperText="Minimum"
    ,
    className: "mr-2 mt-3",
    error: props.element.customOptions.min >= props.element.customOptions.max
  })), isNumberLimit && /*#__PURE__*/_react["default"].createElement(_core.Grid, {
    item: true,
    xs: 12,
    sm: 6
  }, !isDisabled && /*#__PURE__*/_react["default"].createElement(_core.TextField, {
    variant: "outlined",
    type: "number",
    label: "Max Limit",
    defaultValue: customOptions.max,
    onChange: function onChange(e) {
      return props.setNumberLimit('max', e.target.value);
    } // helperText="Maximum"
    ,
    className: "ml-2 mt-3",
    error: props.element.customOptions.max <= props.element.customOptions.min
  }))));
}
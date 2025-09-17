"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = PhoneOptions;
var _react = _interopRequireDefault(require("react"));
var _core = require("@material-ui/core");
var _styles = require("@material-ui/core/styles");
var _CheckCircle = _interopRequireDefault(require("@material-ui/icons/CheckCircle"));
var _RadioButtonUnchecked = _interopRequireDefault(require("@material-ui/icons/RadioButtonUnchecked"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
var useStyles = (0, _styles.makeStyles)(function (theme) {
  return {
    subHeading: {
      opacity: "0.6",
      fontSize: "16px",
      display: "inline",
      fontWeight: "normal"
    },
    button: {
      height: "28px"
      // outline:"none",
      // textTransform:"capatalize"
    }
  };
});

function PhoneOptions(props) {
  var classes = useStyles();
  return /*#__PURE__*/_react.default.createElement(_core.Grid, {
    container: true,
    spacing: 1
  }, /*#__PURE__*/_react.default.createElement(_core.Grid, {
    item: true,
    className: "mb-2 mt-4"
  }, /*#__PURE__*/_react.default.createElement("h6", {
    className: classes.subHeading
  }, "Country Code: "), /*#__PURE__*/_react.default.createElement(_core.FormControlLabel, {
    className: "p-0 m-0",
    size: "small",
    control: /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_core.Button, _defineProperty({
      variant: "outlined",
      className: classes.button,
      style: {
        outline: "none",
        textTransform: "capitalize"
      },
      size: "small",
      onClick: function onClick(e) {
        return props.editElementCustomOptionsProp('countryCode', false, e);
      },
      name: "no"
    }, "className", "ml-2 mr-2"), /*#__PURE__*/_react.default.createElement("span", null, "No"), /*#__PURE__*/_react.default.createElement(_core.Checkbox, {
      size: "small",
      className: "p-0 ml-1",
      color: "primary",
      name: "no",
      icon: /*#__PURE__*/_react.default.createElement(_RadioButtonUnchecked.default, {
        className: "checkboxSize"
      }),
      checked: props.c_code ? false : true,
      checkedIcon: /*#__PURE__*/_react.default.createElement(_CheckCircle.default, {
        className: "checkboxSize"
      })
    })), /*#__PURE__*/_react.default.createElement(_core.Button, _defineProperty({
      variant: "outlined",
      className: classes.button,
      style: {
        outline: "none",
        textTransform: "capitalize"
      },
      size: "small",
      onClick: function onClick(e) {
        return props.editElementCustomOptionsProp('countryCode', true, e);
      },
      name: "yes"
    }, "className", "ml-2 mr-2"), /*#__PURE__*/_react.default.createElement("span", null, "Yes"), /*#__PURE__*/_react.default.createElement(_core.Checkbox, {
      size: "small",
      className: "p-0 ml-1",
      color: "primary",
      name: "yes",
      icon: /*#__PURE__*/_react.default.createElement(_RadioButtonUnchecked.default, {
        className: "checkboxSize"
      }),
      checked: props.c_code ? true : false,
      checkedIcon: /*#__PURE__*/_react.default.createElement(_CheckCircle.default, {
        className: "checkboxSize"
      })
    })))
  })));
}
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _core = require("@material-ui/core");
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function LocationMapOption(props) {
  var displayMapOptions = [{
    value: "Map",
    key: "map"
  }, {
    value: "Text",
    key: "text"
  }, {
    value: "Map+Text",
    key: "maptext"
  }];
  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_core.FormGroup, null, /*#__PURE__*/_react.default.createElement(_core.FormControl, {
    fullWidth: true,
    variant: "outlined",
    className: "my-3"
  }, /*#__PURE__*/_react.default.createElement(_core.InputLabel, {
    id: "defaultSelect"
  }, "Display As"), /*#__PURE__*/_react.default.createElement(_core.Select, {
    labelId: "defaultSelect",
    id: "defaultSelect",
    label: "Validations",
    defaultValue: "none",
    value: props.element.customOptions.displayMapOption,
    MenuProps: {
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "left"
      },
      getContentAnchorEl: null
    },
    onChange: function onChange(event) {
      return props.setDisplayMapOptions("displayMapOption", event);
    }
  }, displayMapOptions.map(function (item) {
    return /*#__PURE__*/_react.default.createElement(_core.MenuItem, {
      key: item.key,
      value: item.value
    }, " ", item.value, " ");
  })))));
}
var _default = LocationMapOption;
exports.default = _default;
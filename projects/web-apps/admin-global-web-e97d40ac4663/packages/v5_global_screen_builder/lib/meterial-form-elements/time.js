"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _componentHeader = _interopRequireDefault(require("../form-elements/component-header"));
var _componentLabel = _interopRequireDefault(require("../form-elements/component-label"));
var _core = require("@material-ui/core");
var _pickers = require("@material-ui/pickers");
var _dateFns = _interopRequireDefault(require("@date-io/date-fns"));
var _icons = require("@material-ui/icons");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function Time(props) {
  var _useState = (0, _react.useState)(null),
    _useState2 = _slicedToArray(_useState, 2),
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
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "SortableItem rfb-item"
  }, /*#__PURE__*/_react.default.createElement(_componentHeader.default, props), /*#__PURE__*/_react.default.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/_react.default.createElement(_core.Grid, {
    container: true
  }, /*#__PURE__*/_react.default.createElement(_pickers.MuiPickersUtilsProvider, {
    utils: _dateFns.default
  }, /*#__PURE__*/_react.default.createElement(_pickers.TimePicker, {
    label: propsData.label,
    onChange: handleDateChange,
    disablePast: true,
    minTime: new Date(0, 0, 0, 8),
    maxTime: new Date(0, 0, 0, 18, 45)
    // labelFunc={() => propsData.customOptions.defaultTime === "none" ? 'HH:MM' : selectedDate}
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
    disabled: props.read_only ? true : propsData.customOptions.defaultTime === "none" ? false : true
    // read_only={props.read_only}
    ,
    InputProps: {
      endAdornment: /*#__PURE__*/_react.default.createElement(_core.InputAdornment, {
        position: "end"
      }, props.read_only ? /*#__PURE__*/_react.default.createElement("img", {
        style: {
          opacity: 0.5
        },
        src: "/assets/images/icons/Icon_timer.svg"
      }) : /*#__PURE__*/_react.default.createElement("img", {
        src: "/assets/images/icons/Icon_timer.svg"
      }))
    }
  })))));
}
var _default = Time;
exports.default = _default;
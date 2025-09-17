"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _UUID = _interopRequireDefault(require("../UUID"));
var _core = require("@material-ui/core");
var _styles = require("@material-ui/core/styles");
var _reactDatepicker = _interopRequireDefault(require("react-datepicker"));
var _dateFns = _interopRequireDefault(require("@date-io/date-fns"));
var _CheckCircle = _interopRequireDefault(require("@material-ui/icons/CheckCircle"));
var _RadioButtonUnchecked = _interopRequireDefault(require("@material-ui/icons/RadioButtonUnchecked"));
var _pickers = require("@material-ui/pickers");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
var theme = (0, _styles.createMuiTheme)({
  palette: {
    primary: {
      main: "#2C3E93"
    }
  },
  overrides: {
    MuiFormControlLabel: {
      label: {
        fontSize: '0.875rem'
      }
    }
  }
});
var DatePickerOptions = /*#__PURE__*/function (_React$Component) {
  _inherits(DatePickerOptions, _React$Component);
  var _super = _createSuper(DatePickerOptions);
  function DatePickerOptions(props) {
    var _this;
    _classCallCheck(this, DatePickerOptions);
    _this = _super.call(this, props);
    _defineProperty(_assertThisInitialized(_this), "changeDateFormat", function (e) {
      var this_element = _this.state.element;
      this_element.customOptions.dateFormat = e.target.value;
      _this.props.updateElement.call(_this.props.preview, this_element);
    });
    _defineProperty(_assertThisInitialized(_this), "changeDefaultDate", function (e) {
      var this_element = _this.state.element;
      var value = e.target.value;
      if (value == 'none') {
        this_element.customOptions.defaultDate = null;
        _this.setState({
          customDatePicker: false
        });
      } else if (value == 'current') {
        this_element.customOptions.defaultDate = new Date();
        _this.setState({
          customDatePicker: false
        });
      } else if (value == 'custom') {
        this_element.customOptions.defaultDate = new Date();
        _this.setState({
          customDatePicker: true
        });
      }
      this_element.customOptions.defaultDateOptions = e.target.value;
      _this.setState({
        element: this_element,
        dirty: true
      });
    });
    _defineProperty(_assertThisInitialized(_this), "customDateChange", function (e) {
      var this_element = _this.state.element;
      this_element.customOptions.defaultDate = e;
      _this.setState({
        element: this_element,
        dirty: true
      });
    });
    _defineProperty(_assertThisInitialized(_this), "setDisablePastDates", function (e) {
      var this_element = _this.state.element;
      this_element.customOptions.disablePastDates = e.target.value;
      _this.setState({
        element: this_element,
        dirty: true
      });
    });
    _defineProperty(_assertThisInitialized(_this), "changeFormatSeparator", function (e) {
      var this_element = _this.state.element;
      var value = e.target.value;
      var dateFormat = this_element.customOptions.dateFormat;
      var splittedDateFormat = [];
      if (dateFormat.includes('-')) {
        splittedDateFormat = dateFormat.split('-');
      } else if (dateFormat.includes('/')) {
        splittedDateFormat = dateFormat.split('/');
      } else if (dateFormat.includes('.')) {
        splittedDateFormat = dateFormat.split('.');
      }
      if (value == 'hyphen') {
        this_element.customOptions.dateFormat = splittedDateFormat.join('-');
        this_element.customOptions.formatSeparator = value;
      } else if (value == 'slash') {
        this_element.customOptions.dateFormat = splittedDateFormat.join('/');
        this_element.customOptions.formatSeparator = value;
      } else if (value == 'dot') {
        this_element.customOptions.dateFormat = splittedDateFormat.join('.');
        this_element.customOptions.formatSeparator = value;
      }
      // this.setState({ element: this_element, dirty: true, });
      _this.props.updateElement.call(_this.props.preview, this_element);
    });
    _this.state = {
      element: _this.props.element,
      data: _this.props.data,
      dirty: false,
      customDatePicker: false
    };
    return _this;
  }
  _createClass(DatePickerOptions, [{
    key: "updateOption",
    value: function updateOption() {
      var this_element = this.state.element;
      // to prevent ajax calls with no change
      if (this.state.dirty) {
        this.props.updateElement.call(this.props.preview, this_element);
        this.setState({
          dirty: false
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      if (this.state.dirty) {
        this.state.element.dirty = true;
      }
      if (this.props.element.customOptions.defaultDateOptions == 'custom') {
        this.state.customDatePicker = true;
      }
      var dateFormat1 = 'MM-dd-yyyy';
      var dateFormat2 = 'dd-MM-yyyy';
      var dateFormat3 = 'yyyy-MM-dd';
      if (this.props.element.customOptions.formatSeparator == 'hyphen') {
        dateFormat1 = 'MM-dd-yyyy';
        dateFormat2 = 'dd-MM-yyyy';
        dateFormat3 = 'yyyy-MM-dd';
      } else if (this.props.element.customOptions.formatSeparator == 'slash') {
        dateFormat1 = 'MM/dd/yyyy';
        dateFormat2 = 'dd/MM/yyyy';
        dateFormat3 = 'yyyy/MM/dd';
      } else if (this.props.element.customOptions.formatSeparator == 'dot') {
        dateFormat1 = 'MM.dd.yyyy';
        dateFormat2 = 'dd.MM.yyyy';
        dateFormat3 = 'yyyy.MM.dd';
      }
      var classes = this.props.classes;
      return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_core.Grid, {
        item: true,
        xs: 12,
        className: "element-options-border-grid padding-top-10 padding-bottom-10"
      }, /*#__PURE__*/_react.default.createElement(_core.Grid, {
        item: true,
        xs: 12,
        sm: 12,
        className: " padding-top-10 padding-bottom-10"
      }, /*#__PURE__*/_react.default.createElement(_core.FormControl, {
        component: "fieldset"
      }, /*#__PURE__*/_react.default.createElement(_core.Grid, {
        container: true,
        justifyContent: "flex-start"
      }, /*#__PURE__*/_react.default.createElement(_core.Grid, {
        item: true,
        className: "mr-2"
      }, /*#__PURE__*/_react.default.createElement("h6", {
        className: classes.text
      }, "Date Format:")), /*#__PURE__*/_react.default.createElement(_core.Grid, {
        item: true
      }, /*#__PURE__*/_react.default.createElement(_core.RadioGroup, {
        row: true,
        "aria-label": "material",
        name: "material",
        value: this.props.element.customOptions.dateFormat,
        onChange: this.changeDateFormat
      }, /*#__PURE__*/_react.default.createElement(_core.FormControlLabel, {
        style: {
          marginTop: "15px",
          marginBottom: "15px",
          marginRight: '10px'
        },
        value: dateFormat1,
        className: this.props.element.customOptions.dateFormat === dateFormat1 ? classes.checked : classes.unchecked,
        control: /*#__PURE__*/_react.default.createElement(_core.Radio, {
          color: "primary",
          icon: /*#__PURE__*/_react.default.createElement(_RadioButtonUnchecked.default, {
            className: "checkboxSize"
          }),
          checkedIcon: /*#__PURE__*/_react.default.createElement(_CheckCircle.default, {
            className: "checkboxSize"
          })
        }),
        label: "MM-DD-YYYY",
        labelPlacement: "start"
      }), /*#__PURE__*/_react.default.createElement(_core.FormControlLabel, {
        style: {
          marginTop: "15px",
          marginBottom: "15px",
          marginRight: '10px'
        },
        value: dateFormat2,
        className: this.props.element.customOptions.dateFormat === dateFormat2 ? classes.checked : classes.unchecked,
        control: /*#__PURE__*/_react.default.createElement(_core.Radio, {
          color: "primary",
          icon: /*#__PURE__*/_react.default.createElement(_RadioButtonUnchecked.default, {
            className: "checkboxSize"
          }),
          checkedIcon: /*#__PURE__*/_react.default.createElement(_CheckCircle.default, {
            className: "checkboxSize"
          })
        }),
        label: "DD-MM-YYYY",
        labelPlacement: "start"
      }), /*#__PURE__*/_react.default.createElement(_core.FormControlLabel, {
        style: {
          marginTop: "15px",
          marginBottom: "15px",
          marginRight: '10px'
        },
        value: dateFormat3,
        className: this.props.element.customOptions.dateFormat === dateFormat3 ? classes.checked : classes.unchecked,
        control: /*#__PURE__*/_react.default.createElement(_core.Radio, {
          color: "primary",
          icon: /*#__PURE__*/_react.default.createElement(_RadioButtonUnchecked.default, {
            className: "checkboxSize"
          }),
          checkedIcon: /*#__PURE__*/_react.default.createElement(_CheckCircle.default, {
            className: "checkboxSize"
          })
        }),
        label: "YYYY-MM-DD",
        labelPlacement: "start"
      })))))), /*#__PURE__*/_react.default.createElement(_core.Grid, {
        item: true,
        xs: 12,
        sm: 12,
        className: " padding-top-10 padding-bottom-10"
      }, /*#__PURE__*/_react.default.createElement(_core.FormControl, {
        component: "fieldset"
      }, /*#__PURE__*/_react.default.createElement(_core.Grid, {
        container: true,
        justifyContent: "flex-start"
      }, /*#__PURE__*/_react.default.createElement(_core.Grid, {
        item: true,
        className: "mr-2"
      }, /*#__PURE__*/_react.default.createElement("h6", {
        className: classes.text
      }, "Default Date:")), /*#__PURE__*/_react.default.createElement(_core.Grid, {
        item: true
      }, /*#__PURE__*/_react.default.createElement(_core.RadioGroup, {
        row: true,
        "aria-label": "material",
        name: "material",
        value: this.props.element.customOptions.defaultDateOptions,
        onChange: this.changeDefaultDate,
        onBlur: this.updateOption.bind(this)
      }, /*#__PURE__*/_react.default.createElement(_core.FormControlLabel, {
        style: {
          marginRight: '10px',
          marginBottom: "15px"
        },
        value: "none",
        className: this.props.element.customOptions.defaultDateOptions === "none" ? classes.checked : classes.unchecked,
        control: /*#__PURE__*/_react.default.createElement(_core.Radio, {
          color: "primary",
          icon: /*#__PURE__*/_react.default.createElement(_RadioButtonUnchecked.default, {
            className: "checkboxSize"
          }),
          checkedIcon: /*#__PURE__*/_react.default.createElement(_CheckCircle.default, {
            className: "checkboxSize"
          })
        }),
        label: "None",
        labelPlacement: "start"
      }), /*#__PURE__*/_react.default.createElement(_core.FormControlLabel, {
        style: {
          marginRight: '10px',
          marginBottom: "15px"
        },
        value: "current",
        className: this.props.element.customOptions.defaultDateOptions === "current" ? classes.checked : classes.unchecked,
        control: /*#__PURE__*/_react.default.createElement(_core.Radio, {
          color: "primary",
          icon: /*#__PURE__*/_react.default.createElement(_RadioButtonUnchecked.default, {
            className: "checkboxSize"
          }),
          checkedIcon: /*#__PURE__*/_react.default.createElement(_CheckCircle.default, {
            className: "checkboxSize"
          })
        }),
        label: "Current",
        labelPlacement: "start"
      }), /*#__PURE__*/_react.default.createElement(_core.FormControlLabel, {
        style: {
          marginRight: '10px',
          marginBottom: "15px"
        },
        value: "custom",
        className: this.props.element.customOptions.defaultDateOptions === "custom" ? classes.checked : classes.unchecked,
        control: /*#__PURE__*/_react.default.createElement(_core.Radio, {
          color: "primary",
          icon: /*#__PURE__*/_react.default.createElement(_RadioButtonUnchecked.default, {
            className: "checkboxSize"
          }),
          checkedIcon: /*#__PURE__*/_react.default.createElement(_CheckCircle.default, {
            className: "checkboxSize"
          })
        }),
        label: "Custom",
        labelPlacement: "start"
      }))))), this.state.customDatePicker && /*#__PURE__*/_react.default.createElement(_pickers.MuiPickersUtilsProvider, {
        utils: _dateFns.default
      }, /*#__PURE__*/_react.default.createElement(_core.Grid, {
        item: true,
        xs: 12,
        sm: 12,
        className: "mt-2"
      }, /*#__PURE__*/_react.default.createElement(_pickers.KeyboardDatePicker, {
        autoOk: true,
        variant: "inline",
        fullWidth: true,
        inputVariant: "outlined",
        label: "Custom Date",
        format: this.props.element.customOptions.dateFormat,
        InputAdornmentProps: {
          position: "start"
        },
        value: this.props.element.customOptions.defaultDate,
        onChange: this.customDateChange,
        className: "mt-3",
        placeholderText: this.props.element.customOptions.dateFormat != undefined ? this.props.element.customOptions.dateFormat.toUpperCase() : "MM-DD-YYYY",
        minDate: this.props.element.customOptions.disablePastDates == 'yes' ? new Date() : ''
      })))), /*#__PURE__*/_react.default.createElement(_core.Grid, {
        item: true,
        xs: 12,
        sm: 12,
        className: " padding-top-10 padding-bottom-10"
      }, /*#__PURE__*/_react.default.createElement(_core.FormControl, {
        component: "fieldset"
      }, /*#__PURE__*/_react.default.createElement(_core.Grid, {
        container: true,
        justifyContent: "flex-start"
      }, /*#__PURE__*/_react.default.createElement(_core.Grid, {
        item: true,
        className: "mr-2"
      }, /*#__PURE__*/_react.default.createElement("h6", {
        className: classes.text
      }, "Separator:")), /*#__PURE__*/_react.default.createElement(_core.Grid, {
        item: true
      }, /*#__PURE__*/_react.default.createElement(_core.RadioGroup, {
        row: true,
        "aria-label": "material",
        name: "material",
        value: this.props.element.customOptions.formatSeparator,
        onChange: this.changeFormatSeparator
      }, /*#__PURE__*/_react.default.createElement(_core.FormControlLabel, {
        style: {
          marginRight: '10px',
          marginBottom: '15px'
        },
        value: "hyphen",
        className: this.props.element.customOptions.formatSeparator === "hyphen" ? classes.checked : classes.unchecked,
        control: /*#__PURE__*/_react.default.createElement(_core.Radio, {
          color: "primary",
          icon: /*#__PURE__*/_react.default.createElement(_RadioButtonUnchecked.default, {
            className: "checkboxSize"
          }),
          checkedIcon: /*#__PURE__*/_react.default.createElement(_CheckCircle.default, {
            className: "checkboxSize"
          })
        }),
        label: "Hyphen(-)",
        labelPlacement: "start"
      }), /*#__PURE__*/_react.default.createElement(_core.FormControlLabel, {
        style: {
          marginRight: '10px',
          marginBottom: '15px'
        },
        value: "slash",
        className: this.props.element.customOptions.formatSeparator === "slash" ? classes.checked : classes.unchecked,
        control: /*#__PURE__*/_react.default.createElement(_core.Radio, {
          color: "primary",
          icon: /*#__PURE__*/_react.default.createElement(_RadioButtonUnchecked.default, {
            className: "checkboxSize"
          }),
          checkedIcon: /*#__PURE__*/_react.default.createElement(_CheckCircle.default, {
            className: "checkboxSize"
          })
        }),
        label: "Slash(/)",
        labelPlacement: "start"
      }), /*#__PURE__*/_react.default.createElement(_core.FormControlLabel, {
        style: {
          marginRight: '10px',
          marginBottom: '15px'
        },
        value: "dot",
        className: this.props.element.customOptions.formatSeparator === "dot" ? classes.checked : classes.unchecked,
        control: /*#__PURE__*/_react.default.createElement(_core.Radio, {
          color: "primary",
          icon: /*#__PURE__*/_react.default.createElement(_RadioButtonUnchecked.default, {
            className: "checkboxSize"
          }),
          checkedIcon: /*#__PURE__*/_react.default.createElement(_CheckCircle.default, {
            className: "checkboxSize"
          })
        }),
        label: "Dot(.)",
        labelPlacement: "start"
      }))))))));
    }
  }]);
  return DatePickerOptions;
}(_react.default.Component);
exports.default = DatePickerOptions;
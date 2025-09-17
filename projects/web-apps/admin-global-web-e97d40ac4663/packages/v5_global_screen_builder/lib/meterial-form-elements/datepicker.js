"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _componentHeader = _interopRequireDefault(require("../form-elements/component-header"));
var _core = require("@material-ui/core");
var _dateFns = _interopRequireDefault(require("@date-io/date-fns"));
var _pickers = require("@material-ui/pickers");
var _materialElementLabel = _interopRequireDefault(require("./material-element-label"));
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
var DatePicker = /*#__PURE__*/function (_React$Component) {
  _inherits(DatePicker, _React$Component);
  var _super = _createSuper(DatePicker);
  function DatePicker(props) {
    var _this;
    _classCallCheck(this, DatePicker);
    _this = _super.call(this, props);
    _defineProperty(_assertThisInitialized(_this), "handleDateChange", function (date) {
      var status = {
        selectedDate: date,
        error: false
      };
      var fieldResult = _this.state.fieldResult;
      fieldResult.value = status.selectedDate;
      fieldResult.error = false;
      _this.setState(status);
      _this.props.collectFieldResults(fieldResult);
    });
    _this.state = {
      selectedDate: props.result ? props.result.value : _this.props.data.customOptions.defaultDate,
      fieldResult: {
        questionId: props.data.id,
        value: '',
        error: false
      }
    };
    return _this;
  }
  _createClass(DatePicker, [{
    key: "render",
    value: function render() {
      var inputProps = {};
      var propsData = this.props.data;
      var fieldVariant = "outlined";
      if (this.props.globalStyles) {
        fieldVariant = !this.props.globalStyles.formDefault && propsData.hasOwnProperty("fieldVariant") ? propsData.fieldVariant : this.props.globalStyles.globalFieldVariant;
      } else {
        if (propsData.fieldVariant) fieldVariant = propsData.fieldVariant;
      }
      var inputWidth = "100%";
      if (this.props.data.inputFieldSize == 'large') {
        inputWidth = "100%";
      } else if (this.props.data.inputFieldSize == 'medium') {
        inputWidth = "50%";
      } else if (this.props.data.inputFieldSize == 'small') {
        inputWidth = "25%";
      }
      var formPreview = this.props.hasOwnProperty('isFormPreview') ? this.props.isFormPreview : false;
      var disabled = this.props.data.customOptions.readOnly || false;
      console.log("this.props.data.customOptions", this.props.data.customOptions);
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "SortableItem rfb-item"
      }, /*#__PURE__*/_react.default.createElement(_componentHeader.default, this.props), /*#__PURE__*/_react.default.createElement("div", {
        className: "form-group"
      }, /*#__PURE__*/_react.default.createElement(_pickers.MuiPickersUtilsProvider, {
        utils: _dateFns.default
      }, /*#__PURE__*/_react.default.createElement(_core.Grid, {
        container: true
      }, /*#__PURE__*/_react.default.createElement(_pickers.KeyboardDatePicker, {
        variant: "inline",
        inputVariant: fieldVariant,
        label: this.props.data.label,
        format: this.props.data.customOptions.dateFormat,
        id: "date-picker-inline",
        onChange: this.handleDateChange,
        value: this.props.data.customOptions.defaultDateOptions === "none" ? this.state.selectedDate : this.props.data.customOptions.defaultDate,
        autoOk: true,
        style: {
          width: inputWidth
        },
        disablePast: this.props.data.customOptions.disablePastDates,
        size: "medium",
        placeholder: this.props.data.customOptions.dateFormat != undefined ? this.props.data.customOptions.dateFormat.toUpperCase() : "MM/dd/yyyy",
        KeyboardButtonProps: {
          'aria-label': 'change date'
        },
        required: this.props.data.customOptions.required,
        InputLabelProps: {
          shrink: true,
          classes: {
            asterisk: 'text-error'
          }
        },
        disabled: this.props.read_only ? true : this.props.data.customOptions.defaultDateOptions === "none" ? false : true,
        keyboardIcon: this.props.read_only ? /*#__PURE__*/_react.default.createElement("img", {
          style: {
            opacity: 0.5
          },
          src: "/assets/images/icons/Icon_DatePicker.svg"
        }) : /*#__PURE__*/_react.default.createElement("img", {
          src: "/assets/images/icons/Icon_DatePicker.svg"
        })
      })))));
    }
  }]);
  return DatePicker;
}(_react.default.Component);
var _default = DatePicker;
exports.default = _default;
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _componentHeader = _interopRequireDefault(require("../form-elements/component-header"));

var _core = require("@material-ui/core");

var _dateFns = _interopRequireDefault(require("@date-io/date-fns"));

var _pickers = require("@material-ui/pickers");

var _materialElementLabel = _interopRequireDefault(require("./material-element-label"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var DatePicker = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(DatePicker, _React$Component);

  var _super = _createSuper(DatePicker);

  function DatePicker(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, DatePicker);
    _this = _super.call(this, props);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "handleDateChange", function (date) {
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

  (0, _createClass2["default"])(DatePicker, [{
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
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "SortableItem rfb-item"
      }, /*#__PURE__*/_react["default"].createElement(_componentHeader["default"], this.props), /*#__PURE__*/_react["default"].createElement("div", {
        className: "form-group"
      }, /*#__PURE__*/_react["default"].createElement(_pickers.MuiPickersUtilsProvider, {
        utils: _dateFns["default"]
      }, /*#__PURE__*/_react["default"].createElement(_core.Grid, {
        container: true
      }, /*#__PURE__*/_react["default"].createElement(_pickers.KeyboardDatePicker, {
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
        keyboardIcon: this.props.read_only ? /*#__PURE__*/_react["default"].createElement("img", {
          style: {
            opacity: 0.5
          },
          src: "/assets/images/icons/Icon_DatePicker.svg"
        }) : /*#__PURE__*/_react["default"].createElement("img", {
          src: "/assets/images/icons/Icon_DatePicker.svg"
        })
      })))));
    }
  }]);
  return DatePicker;
}(_react["default"].Component);

var _default = DatePicker;
exports["default"] = _default;
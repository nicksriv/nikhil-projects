"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

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

var _formik = require("formik");

var _materialElementLabel = _interopRequireDefault(require("./material-element-label"));

var _componentHeader = _interopRequireDefault(require("../form-elements/component-header"));

var _core = require("@material-ui/core");

var Yup = _interopRequireWildcard(require("yup"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var Number = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(Number, _React$Component);

  var _super = _createSuper(Number);

  function Number(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, Number);
    _this = _super.call(this, props);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "numberChange", function (event) {
      if (!event.target.value && _this.props.data.customOptions.required) {
        _this.setState({
          number: "",
          error: true,
          requiredMessage: "Please fill out mandatory field"
        });

        return;
      }

      _this.setState({
        requiredMessage: ""
      });

      var status = _this.validate(event);

      var fieldResult = _this.state.fieldResult;
      fieldResult.value = status.number;
      fieldResult.error = status.error;

      _this.setState(status);

      _this.props.collectFieldResults(fieldResult);
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "validate", function (e) {
      var number = e.target.value;

      if (!number && number == '') {
        if (_this.props.data.customOptions.required) {
          return {
            error: true,
            helperText: "Please enter a value within range ".concat(_this.props.data.customOptions.min, " and ").concat(_this.props.data.customOptions.max),
            number: number
          };
        } else {
          return {
            error: false,
            helperText: '',
            number: number
          };
        }
      } else {
        if (_this.state.isNumberLimit != null && _this.state.isNumberLimit && (parseInt(number) < _this.state.min || parseInt(number) > _this.state.max)) {
          return {
            error: true,
            helperText: "Please enter a value within range ".concat(_this.props.data.customOptions.min, " and ").concat(_this.props.data.customOptions.max),
            number: number
          };
        } else if (!/[0-9]/i.test(number)) {
          return {};
        }
      }

      return {
        error: false,
        helperText: '',
        number: number
      };
    });
    _this.state = {
      number: props.result ? props.result.value : '',
      helperText: '',
      error: false,
      min: props.data.customOptions.min,
      max: props.data.customOptions.max,
      isNumberLimit: props.data.customOptions.isNumberLimit,
      fieldResult: {
        questionId: props.data.id,
        value: '',
        error: false
      },
      requiredMessage: ""
    };
    return _this;
  }

  (0, _createClass2["default"])(Number, [{
    key: "render",
    value: function render() {
      var inputProps = {};

      if (this.props.data.customOptions.isNumberLimit) {
        inputProps.min = this.props.data.customOptions.min;
        inputProps.max = this.props.data.customOptions.max;
      }

      var inputWidth = "100%";

      if (this.props.data.inputFieldSize == 'large') {
        inputWidth = "100%";
      } else if (this.props.data.inputFieldSize == 'medium') {
        inputWidth = "50%";
      } else if (this.props.data.inputFieldSize == 'small') {
        inputWidth = "25%";
      }

      var propsData = this.props.data;
      var fieldVariant = "";

      if (this.props.globalStyles) {
        fieldVariant = !this.props.globalStyles.formDefault && propsData.hasOwnProperty("fieldVariant") ? propsData.fieldVariant : this.props.globalStyles.globalFieldVariant;
      } else {
        if (propsData.fieldVariant) fieldVariant = propsData.fieldVariant;
      }

      var formPreview = this.props.hasOwnProperty('isFormPreview') ? this.props.isFormPreview : false;
      var helperText = this.state.helperText == '' && this.props.data.customOptions.isNumberLimit ? 'Choose a number between ' + this.props.data.customOptions.min + ' and ' + this.props.data.customOptions.max : this.state.helperText;
      var disabled = this.props.read_only || false;
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "SortableItem rfb-item"
      }, /*#__PURE__*/_react["default"].createElement(_componentHeader["default"], this.props), /*#__PURE__*/_react["default"].createElement("div", {
        className: "form-group"
      }, /*#__PURE__*/_react["default"].createElement(_core.TextField, {
        style: {
          width: inputWidth
        },
        size: "small",
        type: "number",
        error: this.state.error,
        variant: fieldVariant,
        id: this.props.id,
        label: propsData.label,
        required: propsData.customOptions.required,
        name: this.props.data.fieldName,
        value: this.state.number,
        onChange: this.numberChange,
        InputProps: {
          inputProps: inputProps
        },
        helperText: this.state.requiredMessage && this.state.error && propsData.customOptions.required ? this.state.requiredMessage : helperText,
        onBlur: this.numberChange,
        disabled: disabled,
        InputLabelProps: {
          shrink: true,
          classes: {
            asterisk: 'text-error'
          }
        },
        placeholder: "Number input"
      })));
    }
  }]);
  return Number;
}(_react["default"].Component);

var _default = Number;
exports["default"] = _default;
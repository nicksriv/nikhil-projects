"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _formik = require("formik");
var _materialElementLabel = _interopRequireDefault(require("./material-element-label"));
var _componentHeader = _interopRequireDefault(require("../form-elements/component-header"));
var _core = require("@material-ui/core");
var Yup = _interopRequireWildcard(require("yup"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
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
var Number = /*#__PURE__*/function (_React$Component) {
  _inherits(Number, _React$Component);
  var _super = _createSuper(Number);
  function Number(props) {
    var _this;
    _classCallCheck(this, Number);
    _this = _super.call(this, props);
    _defineProperty(_assertThisInitialized(_this), "numberChange", function (event) {
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
    _defineProperty(_assertThisInitialized(_this), "validate", function (e) {
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
  _createClass(Number, [{
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
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "SortableItem rfb-item"
      }, /*#__PURE__*/_react.default.createElement(_componentHeader.default, this.props), /*#__PURE__*/_react.default.createElement("div", {
        className: "form-group"
      }, /*#__PURE__*/_react.default.createElement(_core.TextField, {
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
}(_react.default.Component);
var _default = Number;
exports.default = _default;
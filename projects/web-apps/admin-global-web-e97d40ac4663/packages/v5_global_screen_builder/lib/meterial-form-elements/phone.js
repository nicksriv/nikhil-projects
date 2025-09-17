"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _materialElementLabel = _interopRequireDefault(require("./material-element-label"));
var _componentHeader = _interopRequireDefault(require("../form-elements/component-header"));
var _core = require("@material-ui/core");
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
var Phone = /*#__PURE__*/function (_React$Component) {
  _inherits(Phone, _React$Component);
  var _super = _createSuper(Phone);
  function Phone(props) {
    var _this;
    _classCallCheck(this, Phone);
    _this = _super.call(this, props);
    _defineProperty(_assertThisInitialized(_this), "phoneChange", function (event) {
      var numberPattern = /^(\s*|\d+)$/;
      var value = event.target.value.replaceAll("-", "");
      if (value.match(numberPattern)) {
        if (_this.props.data.customOptions.isMasked) {
          if (value.length > 10) return;
          if (value.length > 3) {
            value = value.slice(0, 3) + "-" + value.slice(3);
          }
          if (value.length > 7) {
            value = value.slice(0, 7) + "-" + value.slice(7);
          }
          _this.setState({
            phone: value,
            phoneError: false
          }, function () {
            return _this.validate();
          });
        } else {
          if (value.length > 10) return;
          if (value.length > 3) {
            value = value.slice(0, 3) + "-" + value.slice(3);
          }
          if (value.length > 7) {
            value = value.slice(0, 7) + "-" + value.slice(7);
          }
          _this.setState({
            phone: value,
            phoneError: false
          }, function () {
            return _this.validate();
          });
        }
      } else {
        return;
      }
    });
    _defineProperty(_assertThisInitialized(_this), "countryCodeChange", function (event) {
      var value = event.target.value.replace('+', '');
      var numberPattern = /^(\s*|\d+)$/;
      if (value.match(numberPattern) && value.length <= 2) _this.setState({
        cCode: '+' + value,
        cCodeError: false
      });
    });
    _this.state = {
      phone: props.result ? props.result.value : '',
      phoneError: false,
      areaCode: props.result ? props.result.areaCode : '',
      // areaCodeError: false,
      cCode: props.result ? props.result.countryCode : '',
      cCodeError: false,
      errorText: 'Please Enter Valid Details',
      fieldResult: {
        questionId: props.data.id,
        value: '',
        areaCode: '',
        countryCode: '',
        error: false
      }
    };
    return _this;
  }
  _createClass(Phone, [{
    key: "validate",
    value:
    // areaCodeChange = event => {
    //     let value = event.target.value;

    //     let numberPattern = /^(\s*|\d+)$/;
    //     if (value.match(numberPattern) && value.length <= 3) {
    //         this.setState({ areaCode: value, areaCodeError: false });
    //     }
    // }

    function validate() {
      var customOptions = this.props.data.customOptions;
      if (!customOptions.required) return;
      var _this$state = this.state,
        phone = _this$state.phone,
        phoneError = _this$state.phoneError,
        areaCode = _this$state.areaCode,
        areaCodeError = _this$state.areaCodeError,
        cCode = _this$state.cCode,
        cCodeError = _this$state.cCodeError;
      cCodeError = cCode == '' || cCode.length < 3 ? true : false;
      // areaCodeError = (areaCode == '' && !customOptions.isMasked) ? true : false;
      phoneError = phone == '' || phone.length < 12 ? true : false;
      if (phoneError || areaCodeError || cCodeError) this.setState({
        phoneError: phoneError,
        cCodeError: cCodeError
        // areaCodeError: areaCodeError
      });
    }
  }, {
    key: "render",
    value: function render() {
      var phone = this.state.phone;
      // const areaCode = this.state.areaCode;
      var cCode = this.state.cCode;
      var propsData = this.props.data;
      var fieldVariant = "";
      if (this.props.globalStyles) {
        fieldVariant = !this.props.globalStyles.formDefault && propsData.hasOwnProperty("fieldVariant") ? propsData.fieldVariant : this.props.globalStyles.globalFieldVariant;
      } else {
        if (propsData.fieldVariant) fieldVariant = propsData.fieldVariant;
      }
      var formPreview = this.props.hasOwnProperty('isFormPreview') ? this.props.isFormPreview : false;
      var disabled = this.props.read_only || false;
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "SortableItem rfb-item"
      }, /*#__PURE__*/_react.default.createElement(_componentHeader.default, this.props), /*#__PURE__*/_react.default.createElement("div", {
        className: "form-group"
      }, /*#__PURE__*/_react.default.createElement(_core.Grid, {
        container: true,
        direction: "row",
        spacing: 1
      }, propsData.customOptions.countryCode && /*#__PURE__*/_react.default.createElement(_core.Grid, {
        item: true,
        sm: propsData.customOptions.countryCode && !this.props.isFromMastersScreen ? 4 : 5
      }, /*#__PURE__*/_react.default.createElement(_core.TextField, {
        fullWidth: true,
        size: "small",
        id: this.props.id,
        variant: fieldVariant,
        label: "Country Code",
        placeholder: "e.g: +1",
        value: cCode,
        onBlur: this.validate.bind(this),
        error: this.state.cCodeError,
        required: propsData.customOptions.required,
        disabled: disabled,
        name: this.props.data.fieldName,
        onChange: this.countryCodeChange.bind(this)
        //helperText={this.state.cCodeError ? this.state.errorText : "\'+1\'"}
        ,
        InputLabelProps: {
          shrink: true,
          classes: {
            asterisk: 'text-error'
          }
        }
      })), /*#__PURE__*/_react.default.createElement(_core.Grid, {
        item: true,
        sm: propsData.customOptions.countryCode ? 8 : 12
      }, /*#__PURE__*/_react.default.createElement(_core.TextField, {
        fullWidth: true,
        size: "small",
        id: this.props.id,
        variant: fieldVariant,
        required: propsData.customOptions.required,
        name: this.props.data.fieldName,
        value: phone,
        label: "Phone",
        placeholder: "e.g: 000-000-0000",
        disabled: disabled,
        onBlur: this.validate.bind(this),
        error: this.state.phoneError,
        onChange: this.phoneChange.bind(this),
        helperText: this.state.phoneError ? /*#__PURE__*/_react.default.createElement("p", null, "Minimum phone limit is 10 digits") : null,
        InputLabelProps: {
          shrink: true,
          classes: {
            asterisk: 'text-error'
          }
        }
      })))));
    }
  }]);
  return Phone;
}(_react.default.Component);
exports.default = Phone;
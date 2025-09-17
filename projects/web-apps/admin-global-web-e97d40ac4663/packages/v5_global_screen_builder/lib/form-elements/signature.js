"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _componentLabel = _interopRequireDefault(require("./component-label"));
var _componentHeader = _interopRequireDefault(require("./component-header"));
var _reactSignatureCanvas = _interopRequireDefault(require("react-signature-canvas"));
var _core = require("@material-ui/core");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
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
var Signature = /*#__PURE__*/function (_React$Component) {
  _inherits(Signature, _React$Component);
  var _super = _createSuper(Signature);
  function Signature(props) {
    var _this;
    _classCallCheck(this, Signature);
    _this = _super.call(this, props);
    _defineProperty(_assertThisInitialized(_this), "clear", function () {
      if (_this.state.defaultValue) {
        _this.setState({
          defaultValue: ''
        });
      } else if (_this.canvas.current) {
        _this.canvas.current.clear();
        if (_this.props.data.customOptions.required) _this.setState({
          error: true
        });
      }
    });
    _this.state = {
      defaultValue: props.defaultValue,
      error: false,
      errorColor: "red",
      positiveColor: "#CECECE"
    };
    _this.inputField = /*#__PURE__*/_react.default.createRef();
    _this.canvas = /*#__PURE__*/_react.default.createRef();
    return _this;
  }
  _createClass(Signature, [{
    key: "render",
    value: function render() {
      var defaultValue = this.state.defaultValue;
      var canClear = !!defaultValue;
      var props = {};
      props.type = 'hidden';
      props.name = this.props.data.fieldName;
      if (this.props.mutable) {
        props.defaultValue = defaultValue;
        props.ref = this.inputField;
      }
      var pad_props = {};
      // umd requires canvasProps={{ width: 400, height: 150 }}
      if (this.props.mutable) {
        pad_props.defaultValue = defaultValue;
        pad_props.ref = this.canvas;
        canClear = !this.props.read_only;
      }
      var sourceDataURL;
      if (defaultValue && defaultValue.length > 0) {
        sourceDataURL = "data:image/png;base64,".concat(defaultValue);
      }
      var isRequired = this.props.data.customOptions.required;
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "SortableItem rfb-item"
      }, /*#__PURE__*/_react.default.createElement(_componentHeader.default, this.props), /*#__PURE__*/_react.default.createElement("div", {
        className: "form-group"
      }, /*#__PURE__*/_react.default.createElement(_componentLabel.default, this.props), /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement(_core.Grid, {
        container: true,
        direction: "column",
        spacing: 1
      }, /*#__PURE__*/_react.default.createElement(_core.Grid, {
        item: true
      }, this.props.read_only === true || !!sourceDataURL ? /*#__PURE__*/_react.default.createElement("img", {
        src: sourceDataURL
      }) : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
        style: {
          width: 'fit-content',
          borderRadius: '5px',
          border: '1px solid #CECECE'
        }
      }, /*#__PURE__*/_react.default.createElement(_reactSignatureCanvas.default, _extends({}, pad_props, {
        penColor: "black",
        canvasProps: {
          width: 500,
          height: 200,
          className: 'sigCanvas'
        }
      }))), isRequired && /*#__PURE__*/_react.default.createElement(_core.FormHelperText, null, "Required"))), /*#__PURE__*/_react.default.createElement(_core.Grid, {
        item: true
      }, canClear && /*#__PURE__*/_react.default.createElement(_core.Button, {
        size: "small",
        variant: "contained",
        onClick: this.clear
      }, "Clear"))), /*#__PURE__*/_react.default.createElement("input", props)));
    }
  }]);
  return Signature;
}(_react.default.Component);
exports.default = Signature;
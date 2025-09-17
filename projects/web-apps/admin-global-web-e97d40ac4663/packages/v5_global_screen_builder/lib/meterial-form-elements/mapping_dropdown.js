"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _materialElementLabel = _interopRequireDefault(require("./material-element-label"));
var _componentHeader = _interopRequireDefault(require("../form-elements/component-header"));
var _Select = _interopRequireDefault(require("@material-ui/core/Select"));
var _MenuItem = _interopRequireDefault(require("@material-ui/core/MenuItem"));
var _InputLabel = _interopRequireDefault(require("@material-ui/core/InputLabel"));
var _FormControl = _interopRequireDefault(require("@material-ui/core/FormControl"));
var _core = require("@material-ui/core");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
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
var Dropdown = /*#__PURE__*/function (_React$Component) {
  _inherits(Dropdown, _React$Component);
  var _super = _createSuper(Dropdown);
  function Dropdown(props) {
    var _this;
    _classCallCheck(this, Dropdown);
    _this = _super.call(this, props);
    _defineProperty(_assertThisInitialized(_this), "onChangeEvent", function (e) {
      var status = {
        dropDownValue: e.target.value,
        error: false
      };
      var fieldResult = _this.state.fieldResult;
      fieldResult.value = status.dropDownValue;
      fieldResult.error = false;
      _this.setState(status);
      _this.props.collectFieldResults(fieldResult);
    });
    _this.state = {
      dropDownValue: props.result ? props.result.value : props.data.customOptions.defaultOptions,
      data: props.data || [],
      fieldResult: {
        questionId: props.data.id,
        value: '',
        error: false
      }
    };
    return _this;
  }
  _createClass(Dropdown, [{
    key: "render",
    value: function render() {
      var _this2 = this,
        _React$createElement;
      var fieldVariant = "";
      if (this.props.globalStyles) {
        fieldVariant = !this.props.globalStyles.formDefault && this.props.data.hasOwnProperty("fieldVariant") ? this.props.data.fieldVariant : this.props.globalStyles.globalFieldVariant;
      } else {
        if (this.props.data.fieldVariant) fieldVariant = this.props.data.fieldVariant;
      }
      var formPreview = this.props.hasOwnProperty('isFormPreview') ? this.props.isFormPreview : false;
      var fieldName = this.props.data.field_name;
      var inputWidth = "100%";
      if (this.props.data.inputFieldSize == 'large') {
        inputWidth = "100%";
      } else if (this.props.data.inputFieldSize == 'medium') {
        inputWidth = "50%";
      } else if (this.props.data.inputFieldSize == 'small') {
        inputWidth = "25%";
      }
      var disabled = this.props.read_only || false;
      var notRequired = {
        display: 'none'
      };
      var required = {
        display: 'inline'
      };
      console.log(this.props.data.dropDownOptions);
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "SortableItem rfb-item"
      }, /*#__PURE__*/_react.default.createElement(_componentHeader.default, this.props), /*#__PURE__*/_react.default.createElement("div", {
        className: "form-group"
      }, /*#__PURE__*/_react.default.createElement(_FormControl.default, {
        variant: "outlined",
        style: {
          minWidth: '100%'
        }
      }, /*#__PURE__*/_react.default.createElement(_InputLabel.default, {
        id: "demo-simple-select-outlined-label"
      }, /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("span", null, this.props.data.label), /*#__PURE__*/_react.default.createElement("span", {
        className: "text-error",
        style: this.props.data.customOptions.required ? required : notRequired
      }, "* "))), /*#__PURE__*/_react.default.createElement(_Select.default, (_React$createElement = {
        labelId: "demo-simple-select-outlined-label",
        id: "demo-simple-select-outlined",
        style: {
          width: inputWidth
        },
        size: "small"
      }, _defineProperty(_React$createElement, "id", this.props.id), _defineProperty(_React$createElement, "name", fieldName), _defineProperty(_React$createElement, "variant", fieldVariant), _defineProperty(_React$createElement, "label", this.props.data.label), _defineProperty(_React$createElement, "required", this.props.data.required), _defineProperty(_React$createElement, "onChange", function onChange(e) {
        return _this2.onChangeEvent(e);
      }), _defineProperty(_React$createElement, "value", this.state.dropDownValue), _defineProperty(_React$createElement, "disabled", disabled), _defineProperty(_React$createElement, "InputLabelProps", {
        shrink: true,
        classes: {
          asterisk: 'text-error'
        }
      }), _defineProperty(_React$createElement, "MenuProps", {
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "left"
        },
        getContentAnchorEl: null
      }), _React$createElement), this.props.data.customOptions.showEmptyTextOption && /*#__PURE__*/_react.default.createElement(_MenuItem.default, {
        value: "data"
      }, this.props.data.customOptions.emptyOptionText), this.props.data != undefined && this.props.data.dropDownOptions != undefined && this.props.data.dropDownOptions.map(function (option) {
        var this_key = "preview_".concat(option.label);
        return /*#__PURE__*/_react.default.createElement(_MenuItem.default, {
          value: option.label,
          key: this_key
        }, option.label);
      })))));
    }
  }]);
  return Dropdown;
}(_react.default.Component);
var _default = Dropdown;
exports.default = _default;
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _componentHeader = _interopRequireDefault(require("../form-elements/component-header"));
var _core = require("@material-ui/core");
var _materialElementLabel = _interopRequireDefault(require("./material-element-label"));
var _Button = _interopRequireDefault(require("@material-ui/core/Button"));
var _ButtonGroup = _interopRequireDefault(require("@material-ui/core/ButtonGroup"));
var _Tooltip = _interopRequireDefault(require("@material-ui/core/Tooltip"));
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
var ButtonRadios = /*#__PURE__*/function (_React$Component) {
  _inherits(ButtonRadios, _React$Component);
  var _super = _createSuper(ButtonRadios);
  function ButtonRadios(props) {
    var _this;
    _classCallCheck(this, ButtonRadios);
    _this = _super.call(this, props);
    _defineProperty(_assertThisInitialized(_this), "handleOnChangeValue", function (data) {
      var status = {
        selectedValue: data.currentTarget.value,
        error: false
      };
      var fieldResult = _this.state.fieldResult;
      fieldResult.value = status.selectedValue;
      fieldResult.error = false;
      _this.setState(status);
      _this.props.collectFieldResults(fieldResult);
    });
    _this.state = {
      selectedValue: props.result ? props.result.value : '',
      fieldResult: {
        questionId: props.data.id,
        value: '',
        error: false
      }
    };
    _this.handleOnChangeValue = _this.handleOnChangeValue.bind(_assertThisInitialized(_this));
    return _this;
  }
  _createClass(ButtonRadios, [{
    key: "render",
    value: function render() {
      var _this2 = this;
      var combinedList = [];
      var splittedIndex = [];
      for (var i = 0; i < this.props.data.buttonRadioOptions.length; i++) {
        splittedIndex.push(this.props.data.buttonRadioOptions[i]);
        if (splittedIndex.length == this.props.data.customOptions.columns || i == this.props.data.buttonRadioOptions.length - 1) {
          combinedList.push(splittedIndex);
          splittedIndex = [];
        }
      }
      var themeColor = 'inherit';
      if (this.props.data.customOptions.buttonThemeColor == "blue") {
        themeColor = 'blue';
      } else if (this.props.data.customOptions.buttonThemeColor == "red") {
        themeColor = 'red';
      } else if (this.props.data.customOptions.buttonThemeColor == "black") {
        themeColor = 'black';
      }
      var spacing = this.props.data.customOptions.spacing * 10;
      var inputProps = {};
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
      }, /*#__PURE__*/_react.default.createElement(_materialElementLabel.default, this.props), combinedList.map(function (data) {
        return /*#__PURE__*/_react.default.createElement(_core.Grid, {
          item: true,
          spacing: 4,
          style: {
            paddingTop: spacing + 'px'
          }
        }, /*#__PURE__*/_react.default.createElement(_ButtonGroup.default, {
          size: "large",
          "aria-label": "outlined button group",
          disabled: disabled
        }, data.map(function (option) {
          var this_key = "preview_".concat(option.key);
          return /*#__PURE__*/_react.default.createElement(_Tooltip.default, {
            title: option.hoverText
          }, /*#__PURE__*/_react.default.createElement(_Button.default, {
            style: {
              color: _this2.state.selectedValue == option.key ? themeColor : 'grey',
              width: '150px',
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              display: 'inline-block',
              height: '38px',
              border: '1px solid #d5d5d5',
              boxShadow: '0 2px 2px rgb(0 0 0 / 10%)',
              boxSizing: 'border-box',
              textAlign: "center"
            },
            onClick: _this2.handleOnChangeValue,
            selectedValue: _this2.state.selectedValue == option.key,
            value: option.key,
            key: this_key
          }, /*#__PURE__*/_react.default.createElement("span", {
            style: {
              display: 'block',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              padding: '0 3px',
              textTransform: "capitalize"
            }
          }, option.label)));
        })));
      })));
    }
  }]);
  return ButtonRadios;
}(_react.default.Component);
var _default = ButtonRadios;
exports.default = _default;
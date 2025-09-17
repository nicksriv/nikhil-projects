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
var Buttonn = /*#__PURE__*/function (_React$Component) {
  _inherits(Buttonn, _React$Component);
  var _super = _createSuper(Buttonn);
  function Buttonn(props) {
    var _this;
    _classCallCheck(this, Buttonn);
    _this = _super.call(this, props);
    _this.state = {};
    return _this;
  }
  _createClass(Buttonn, [{
    key: "render",
    value: function render() {
      var propsData = this.props.data;
      var propsWorkFlowData = this.props.workFlowData;
      var rejectStyle = {
        fontSize: "0.5rem",
        color: "#B00020",
        border: "1px solid #B00020",
        fontWeight: "bold"
      };
      var approveStyle = {
        fontSize: "0.5rem"
      };
      var approveBtnSpacingStyle = {
        paddingTop: "3px"
      };
      //console.log('button', this.props.data)
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "SortableItem rfb-item",
        style: propsWorkFlowData && propsWorkFlowData.isConsolidatedScreen && this.props.data.label === "APPROVE" ? approveBtnSpacingStyle : null
      }, /*#__PURE__*/_react.default.createElement(_componentHeader.default, this.props), /*#__PURE__*/_react.default.createElement("div", {
        className: "form-group",
        style: {
          display: "flex",
          width: "100%"
        }
      }, /*#__PURE__*/_react.default.createElement("div", {
        style: {
          alignSelf: "center",
          width: "100%"
        }
      }, propsWorkFlowData && !propsWorkFlowData.isConsolidatedScreen || propsWorkFlowData === undefined ? this.props.data.buttonType == "primary" ? /*#__PURE__*/_react.default.createElement(_Button.default, {
        variant: "contained",
        fullWidth: true,
        color: "primary",
        size: "medium"
      }, this.props.data.label) : this.props.data.buttonType == "secondary" ? /*#__PURE__*/_react.default.createElement(_Button.default, {
        variant: "contained",
        fullWidth: true,
        size: "medium"
      }, this.props.data.label) : this.props.data.buttonType == "hyperlink" ? /*#__PURE__*/_react.default.createElement(_core.Link, {
        target: "_blank",
        href: this.props.data.customOptions.Hyperlink,
        style: {
          textDecoration: "none"
        }
      }, /*#__PURE__*/_react.default.createElement(_Button.default, {
        fullWidth: true,
        size: "medium",
        color: "primary"
      }, this.props.data.label)) : null : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_Button.default
      //variant={`${this.props.data.label === "REJECT" ? 'outlined' : 'contained'}`}
      , {
        variant: this.props.data && this.props.data.fieldVariant,
        fullWidth: true,
        color: "primary",
        size: "medium",
        style: this.props.data.label === "REJECT" ? rejectStyle : approveStyle
      }, this.props.data.label)))));
    }
  }]);
  return Buttonn;
}(_react.default.Component);
var _default = Buttonn;
exports.default = _default;
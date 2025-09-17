"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _react = _interopRequireDefault(require("react"));

var _componentHeader = _interopRequireDefault(require("../form-elements/component-header"));

var _core = require("@material-ui/core");

var _materialElementLabel = _interopRequireDefault(require("./material-element-label"));

var _Button = _interopRequireDefault(require("@material-ui/core/Button"));

var _ButtonGroup = _interopRequireDefault(require("@material-ui/core/ButtonGroup"));

var _Tooltip = _interopRequireDefault(require("@material-ui/core/Tooltip"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var Buttonn = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(Buttonn, _React$Component);

  var _super = _createSuper(Buttonn);

  function Buttonn(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, Buttonn);
    _this = _super.call(this, props);
    _this.state = {};
    return _this;
  }

  (0, _createClass2["default"])(Buttonn, [{
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
      }; //console.log('button', this.props.data)

      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "SortableItem rfb-item",
        style: propsWorkFlowData && propsWorkFlowData.isConsolidatedScreen && this.props.data.label === "APPROVE" ? approveBtnSpacingStyle : null
      }, /*#__PURE__*/_react["default"].createElement(_componentHeader["default"], this.props), /*#__PURE__*/_react["default"].createElement("div", {
        className: "form-group",
        style: {
          display: "flex",
          width: "100%"
        }
      }, /*#__PURE__*/_react["default"].createElement("div", {
        style: {
          alignSelf: "center",
          width: "100%"
        }
      }, propsWorkFlowData && !propsWorkFlowData.isConsolidatedScreen || propsWorkFlowData === undefined ? this.props.data.buttonType == "primary" ? /*#__PURE__*/_react["default"].createElement(_Button["default"], {
        variant: "contained",
        fullWidth: true,
        color: "primary",
        size: "medium"
      }, this.props.data.label) : this.props.data.buttonType == "secondary" ? /*#__PURE__*/_react["default"].createElement(_Button["default"], {
        variant: "contained",
        fullWidth: true,
        size: "medium"
      }, this.props.data.label) : this.props.data.buttonType == "hyperlink" ? /*#__PURE__*/_react["default"].createElement(_core.Link, {
        target: "_blank",
        href: this.props.data.customOptions.Hyperlink,
        style: {
          textDecoration: "none"
        }
      }, /*#__PURE__*/_react["default"].createElement(_Button["default"], {
        fullWidth: true,
        size: "medium",
        color: "primary"
      }, this.props.data.label)) : null : /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_Button["default"] //variant={`${this.props.data.label === "REJECT" ? 'outlined' : 'contained'}`}
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
}(_react["default"].Component);

var _default = Buttonn;
exports["default"] = _default;
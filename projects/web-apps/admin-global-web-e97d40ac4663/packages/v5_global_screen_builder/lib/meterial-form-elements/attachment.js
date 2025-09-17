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
var _VideoLibrary = _interopRequireDefault(require("@material-ui/icons/VideoLibrary"));
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
var Attachment = /*#__PURE__*/function (_React$Component) {
  _inherits(Attachment, _React$Component);
  var _super = _createSuper(Attachment);
  function Attachment(props) {
    var _this;
    _classCallCheck(this, Attachment);
    _this = _super.call(this, props);
    _defineProperty(_assertThisInitialized(_this), "onChange", function (e) {
      switch (e.target.name) {
        case 'selectedFile':
          if (e.target.files.length > 0) {
            _this.setState({
              fileName: e.target.files[0].name
            });
          }
          break;
        default:
          _this.setState(_defineProperty({}, e.target.name, e.target.value));
      }
    });
    _this.state = {
      fileName: ''
    };
    return _this;
  }
  _createClass(Attachment, [{
    key: "render",
    value: function render() {
      var _this2 = this;
      var propsData = this.props.data;
      var type = this.props.data.customOptions.Attachment;
      var propsWorkFlowData = this.props.workFlowData;
      var fileName = this.state.fileName;
      var disable = this.props.read_only === undefined ? true : this.props.read_only;
      var file = null;
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
      file = fileName ? /*#__PURE__*/_react.default.createElement("span", null, fileName) : /*#__PURE__*/_react.default.createElement("span", null);
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "SortableItem rfb-item",
        style: propsWorkFlowData && propsWorkFlowData.isConsolidatedScreen && this.props.data.label === "APPROVE" ? approveBtnSpacingStyle : null
      }, /*#__PURE__*/_react.default.createElement(_componentHeader.default, this.props), /*#__PURE__*/_react.default.createElement(_materialElementLabel.default, this.props), /*#__PURE__*/_react.default.createElement(_core.Grid, {
        container: true,
        spacing: 1,
        className: "material-element-container",
        style: {
          padding: '20px 20px 10px 20px'
        }
      }, /*#__PURE__*/_react.default.createElement(_core.Grid, {
        container: true,
        justifyContent: "flex-start"
      }, /*#__PURE__*/_react.default.createElement(_core.Grid, {
        item: true,
        xs: 12,
        sm: 6,
        md: 6,
        style: {
          alignSelf: 'center'
        }
      }, /*#__PURE__*/_react.default.createElement(_core.Typography, {
        component: "span"
      }, "Attachment")), /*#__PURE__*/_react.default.createElement(_core.Grid, {
        item: true,
        xs: 12,
        sm: 6,
        md: 6
      }, /*#__PURE__*/_react.default.createElement(_Button.default, {
        disabled: disable,
        component: "label"
      }, disable ? /*#__PURE__*/_react.default.createElement("img", {
        style: {
          opacity: '0.5'
        },
        src: "/assets/images/icons/attachment_black_24dp.svg",
        alt: "attachment"
      }) : /*#__PURE__*/_react.default.createElement("img", {
        src: "/assets/images/icons/attachment_black_24dp.svg",
        alt: "attachment"
      }), /*#__PURE__*/_react.default.createElement("input", {
        type: "file",
        hidden: true,
        name: "selectedFile",
        onChange: function onChange(event) {
          return _this2.onChange(event);
        },
        id: "imageUpload",
        accept: type
      })))), /*#__PURE__*/_react.default.createElement("h6", {
        className: "mt-1",
        style: {
          marginLeft: '10rem',
          color: '#2C3E93'
        }
      }, file)));
    }
  }]);
  return Attachment;
}(_react.default.Component);
var _default = Attachment;
exports.default = _default;
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

var _materialElementLabel = _interopRequireDefault(require("./material-element-label"));

var _Button = _interopRequireDefault(require("@material-ui/core/Button"));

var _ButtonGroup = _interopRequireDefault(require("@material-ui/core/ButtonGroup"));

var _Tooltip = _interopRequireDefault(require("@material-ui/core/Tooltip"));

var _VideoLibrary = _interopRequireDefault(require("@material-ui/icons/VideoLibrary"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var Attachment = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(Attachment, _React$Component);

  var _super = _createSuper(Attachment);

  function Attachment(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, Attachment);
    _this = _super.call(this, props);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "onChange", function (e) {
      switch (e.target.name) {
        case 'selectedFile':
          if (e.target.files.length > 0) {
            _this.setState({
              fileName: e.target.files[0].name
            });
          }

          break;

        default:
          _this.setState((0, _defineProperty2["default"])({}, e.target.name, e.target.value));

      }
    });
    _this.state = {
      fileName: ''
    };
    return _this;
  }

  (0, _createClass2["default"])(Attachment, [{
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
      file = fileName ? /*#__PURE__*/_react["default"].createElement("span", null, fileName) : /*#__PURE__*/_react["default"].createElement("span", null);
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "SortableItem rfb-item",
        style: propsWorkFlowData && propsWorkFlowData.isConsolidatedScreen && this.props.data.label === "APPROVE" ? approveBtnSpacingStyle : null
      }, /*#__PURE__*/_react["default"].createElement(_componentHeader["default"], this.props), /*#__PURE__*/_react["default"].createElement(_materialElementLabel["default"], this.props), /*#__PURE__*/_react["default"].createElement(_core.Grid, {
        container: true,
        spacing: 1,
        className: "material-element-container",
        style: {
          padding: '20px 20px 10px 20px'
        }
      }, /*#__PURE__*/_react["default"].createElement(_core.Grid, {
        container: true,
        justifyContent: "flex-start"
      }, /*#__PURE__*/_react["default"].createElement(_core.Grid, {
        item: true,
        xs: 12,
        sm: 6,
        md: 6,
        style: {
          alignSelf: 'center'
        }
      }, /*#__PURE__*/_react["default"].createElement(_core.Typography, {
        component: "span"
      }, "Attachment")), /*#__PURE__*/_react["default"].createElement(_core.Grid, {
        item: true,
        xs: 12,
        sm: 6,
        md: 6
      }, /*#__PURE__*/_react["default"].createElement(_Button["default"], {
        disabled: disable,
        component: "label"
      }, disable ? /*#__PURE__*/_react["default"].createElement("img", {
        style: {
          opacity: '0.5'
        },
        src: "/assets/images/icons/attachment_black_24dp.svg",
        alt: "attachment"
      }) : /*#__PURE__*/_react["default"].createElement("img", {
        src: "/assets/images/icons/attachment_black_24dp.svg",
        alt: "attachment"
      }), /*#__PURE__*/_react["default"].createElement("input", {
        type: "file",
        hidden: true,
        name: "selectedFile",
        onChange: function onChange(event) {
          return _this2.onChange(event);
        },
        id: "imageUpload",
        accept: type
      })))), /*#__PURE__*/_react["default"].createElement("h6", {
        className: "mt-1",
        style: {
          marginLeft: '10rem',
          color: '#50BFB7'
        }
      }, file)));
    }
  }]);
  return Attachment;
}(_react["default"].Component);

var _default = Attachment;
exports["default"] = _default;
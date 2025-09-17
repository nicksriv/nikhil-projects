"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

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

var _formik = require("formik");

var _componentLabel = _interopRequireDefault(require("../form-elements/component-label"));

var _componentHeader = _interopRequireDefault(require("../form-elements/component-header"));

var _core = require("@material-ui/core");

var Yup = _interopRequireWildcard(require("yup"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var Header = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(Header, _React$Component);

  var _super = _createSuper(Header);

  function Header(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, Header);
    _this = _super.call(this, props);
    _this.state = {};
    return _this;
  }

  (0, _createClass2["default"])(Header, [{
    key: "render",
    value: function render() {
      var textAlignment = "flex-start";

      if (this.props.data.textAlignment == 'left') {
        textAlignment = "flex-start";
      } else if (this.props.data.textAlignment == 'center') {
        textAlignment = "center";
      } else if (this.props.data.textAlignment == 'right') {
        textAlignment = "flex-end";
      }

      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "SortableItem rfb-item"
      }, /*#__PURE__*/_react["default"].createElement(_componentHeader["default"], this.props), /*#__PURE__*/_react["default"].createElement("div", {
        className: "form-group",
        style: {
          display: 'flex',
          justifyContent: textAlignment
        }
      }, this.props.data.customOptions.imageFile && /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("img", {
        src: this.props.data.customOptions.imageFile,
        height: "100",
        className: "image-upload-preview"
      }), /*#__PURE__*/_react["default"].createElement("br", null)), /*#__PURE__*/_react["default"].createElement("div", {
        style: {
          alignSelf: 'center',
          paddingLeft: '10px'
        }
      }, /*#__PURE__*/_react["default"].createElement("h3", null, this.props.data.label))));
    }
  }]);
  return Header;
}(_react["default"].Component);

var _default = Header;
exports["default"] = _default;
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _core = require("@material-ui/core");
var _Edit = _interopRequireDefault(require("@material-ui/icons/Edit"));
var _Delete = _interopRequireDefault(require("@material-ui/icons/Delete"));
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
var HeaderBar = /*#__PURE__*/function (_React$Component) {
  _inherits(HeaderBar, _React$Component);
  var _super = _createSuper(HeaderBar);
  function HeaderBar() {
    _classCallCheck(this, HeaderBar);
    return _super.apply(this, arguments);
  }
  _createClass(HeaderBar, [{
    key: "render",
    value: function render() {
      var _this$props$editModeO, _this$props$onDestroy;
      var headerLabel = {
        margin: "0.6rem 0",
        color: "#fff",
        backgroundColor: "#6c757d",
        display: "inline-block",
        padding: "0.25em 0.4em",
        fontSize: "75%",
        fontEeight: "700",
        lineHeight: "1",
        textAlign: "center",
        whiteSpace: "nowrap",
        verticalAlign: "baseline",
        borderRadius: "0.25rem"
      };
      return (
        /*#__PURE__*/
        // <div className="toolbar-header">
        _react.default.createElement(_core.Grid, {
          container: true,
          justifyContent: "space-between",
          alignItems: "center",
          className: "toolbar-header"
        }, /*#__PURE__*/_react.default.createElement(_core.Grid, {
          item: true
        }, /*#__PURE__*/_react.default.createElement("span", {
          style: headerLabel
        }, this.props.data.type)), /*#__PURE__*/_react.default.createElement(_core.Grid, {
          item: true
        }, /*#__PURE__*/_react.default.createElement("div", {
          className: "toolbar-header-buttons "
        }, this.props.data.element !== 'LineBreak' && this.props.data.element !== 'Page_Break' && /*#__PURE__*/_react.default.createElement("div", {
          className: "btn is-isolated text-muted",
          style: {
            marginRight: "-15px"
          }
        }, /*#__PURE__*/_react.default.createElement(_Edit.default, {
          fontSize: "small",
          style: {
            fontSize: "1.1rem"
          },
          onClick: (_this$props$editModeO = this.props.editModeOn) === null || _this$props$editModeO === void 0 ? void 0 : _this$props$editModeO.bind(this.props.parent, this.props.data)
        })), /*#__PURE__*/_react.default.createElement("div", {
          className: "btn is-isolated text-muted"
        }, /*#__PURE__*/_react.default.createElement(_Delete.default, {
          fontSize: "small",
          style: {
            fontSize: "1.1rem",
            marginRight: "-15px"
          },
          onClick: (_this$props$onDestroy = this.props.onDestroy) === null || _this$props$onDestroy === void 0 ? void 0 : _this$props$onDestroy.bind(this, this.props.data)
        })))))
        // </div>
      );
    }
  }]);
  return HeaderBar;
}(_react.default.Component);
exports.default = HeaderBar;
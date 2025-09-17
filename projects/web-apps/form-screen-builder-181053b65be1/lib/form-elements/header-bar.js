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

var _core = require("@material-ui/core");

var _Edit = _interopRequireDefault(require("@material-ui/icons/Edit"));

var _Delete = _interopRequireDefault(require("@material-ui/icons/Delete"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var HeaderBar = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(HeaderBar, _React$Component);

  var _super = _createSuper(HeaderBar);

  function HeaderBar() {
    (0, _classCallCheck2["default"])(this, HeaderBar);
    return _super.apply(this, arguments);
  }

  (0, _createClass2["default"])(HeaderBar, [{
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
        _react["default"].createElement(_core.Grid, {
          container: true,
          justifyContent: "space-between",
          alignItems: "center",
          className: "toolbar-header"
        }, /*#__PURE__*/_react["default"].createElement(_core.Grid, {
          item: true
        }, /*#__PURE__*/_react["default"].createElement("span", {
          style: headerLabel
        }, this.props.data.type)), /*#__PURE__*/_react["default"].createElement(_core.Grid, {
          item: true
        }, /*#__PURE__*/_react["default"].createElement("div", {
          className: "toolbar-header-buttons "
        }, this.props.data.element !== 'LineBreak' && this.props.data.element !== 'Page_Break' && /*#__PURE__*/_react["default"].createElement("div", {
          className: "btn is-isolated text-muted",
          style: {
            marginRight: "-15px"
          }
        }, /*#__PURE__*/_react["default"].createElement(_Edit["default"], {
          fontSize: "small",
          style: {
            fontSize: "1.1rem"
          },
          onClick: (_this$props$editModeO = this.props.editModeOn) === null || _this$props$editModeO === void 0 ? void 0 : _this$props$editModeO.bind(this.props.parent, this.props.data)
        })), /*#__PURE__*/_react["default"].createElement("div", {
          className: "btn is-isolated text-muted"
        }, /*#__PURE__*/_react["default"].createElement(_Delete["default"], {
          fontSize: "small",
          style: {
            fontSize: "1.1rem",
            marginRight: "-15px"
          },
          onClick: (_this$props$onDestroy = this.props.onDestroy) === null || _this$props$onDestroy === void 0 ? void 0 : _this$props$onDestroy.bind(this, this.props.data)
        }))))) // </div>

      );
    }
  }]);
  return HeaderBar;
}(_react["default"].Component);

exports["default"] = HeaderBar;
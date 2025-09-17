"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _core = require("@material-ui/core");
var _componentHeader = _interopRequireDefault(require("../form-elements/component-header"));
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
var TilesThemeColorEnum = {
  CUSTOM: "custom",
  WHITE: "white",
  RED: "red",
  BLUE: "blue"
};
var Tiles = /*#__PURE__*/function (_React$Component) {
  _inherits(Tiles, _React$Component);
  var _super = _createSuper(Tiles);
  function Tiles(props) {
    _classCallCheck(this, Tiles);
    return _super.call(this, props);
  }
  _createClass(Tiles, [{
    key: "render",
    value: function render() {
      var _this = this;
      var propsData = this.props.data;
      var arrCards = [];
      if (propsData.customOptions.columns > 1) {
        var cols = 12 / propsData.customOptions.columns;
        for (var index = 0; index < propsData.customOptions.columns; index++) {
          arrCards.push({
            xs: '12',
            sm: cols * 2,
            md: cols
          });
        }
      } else {
        arrCards.push({
          xs: '12',
          sm: '12',
          md: '12'
        });
      }
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "SortableItem rfb-item"
      }, /*#__PURE__*/_react.default.createElement(_componentHeader.default, this.props), /*#__PURE__*/_react.default.createElement("div", {
        className: "form-group"
      }, /*#__PURE__*/_react.default.createElement(_core.Grid, {
        container: true,
        spacing: propsData.customOptions.spacing || 2
      }, arrCards.map(function (c, i) {
        return /*#__PURE__*/_react.default.createElement(_core.Grid, {
          item: true,
          xs: c.xs || 12,
          sm: c.sm || 12,
          md: c.md || 12
        }, /*#__PURE__*/_react.default.createElement(_core.Card, {
          elevation: 0,
          style: {
            backgroundColor: "".concat(_this.props.data && _this.props.data.customOptions.tileProperties[i].tilesColor === TilesThemeColorEnum.RED ? "rgb(216, 67, 21)" : _this.props.data.customOptions.tileProperties[i].tilesColor === TilesThemeColorEnum.BLUE ? "rgb(30, 136, 229)" : _this.props.data.customOptions.tileProperties[i].tilesColor === TilesThemeColorEnum.CUSTOM ? _this.props.data.customOptions.tileProperties[i].tilesRandomColor : "#ffffff"),
            border: "2px solid #D5D5D5"
          }
        }, /*#__PURE__*/_react.default.createElement(_core.CardContent, null, /*#__PURE__*/_react.default.createElement(_core.Grid, {
          container: true,
          direction: "column",
          alignItems: "center",
          style: {
            borderRadius: '5px'
          }
        }, /*#__PURE__*/_react.default.createElement(_core.Grid, {
          item: true,
          className: "pt-3"
        }, /*#__PURE__*/_react.default.createElement("h6", {
          style: {
            color: "".concat(_this.props.data && (_this.props.data.customOptions.tileProperties[i].tilesColor === TilesThemeColorEnum.RED || _this.props.data.customOptions.tileProperties[i].tilesColor === TilesThemeColorEnum.BLUE || _this.props.data.customOptions.tileProperties[i].tilesColor === TilesThemeColorEnum.CUSTOM) ? "#ffffff" : "#9f9f9f")
          }
        }, "".concat(_this.props.data.customOptions.tileProperties[i].title ? _this.props.data.customOptions.tileProperties[i].title : "Title Text"))), /*#__PURE__*/_react.default.createElement(_core.Grid, {
          item: true
        }, /*#__PURE__*/_react.default.createElement("h3", {
          style: {
            color: "".concat(_this.props.data && (_this.props.data.customOptions.tileProperties[i].tilesColor === TilesThemeColorEnum.RED || _this.props.data.customOptions.tileProperties[i].tilesColor === TilesThemeColorEnum.BLUE || _this.props.data.customOptions.tileProperties[i].tilesColor === TilesThemeColorEnum.CUSTOM) ? "#ffffff" : "#212121")
          }
        }, _this.props.data.customOptions.tileProperties[i].text ? _this.props.data.customOptions.tileProperties[i].text : "Text"))))));
      }))));
    }
  }]);
  return Tiles;
}(_react.default.Component);
var _default = Tiles;
exports.default = _default;
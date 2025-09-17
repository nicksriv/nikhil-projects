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

var _componentHeader = _interopRequireDefault(require("../form-elements/component-header"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var TilesThemeColorEnum = {
  CUSTOM: "custom",
  WHITE: "white",
  RED: "red",
  BLUE: "blue"
};

var Tiles = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(Tiles, _React$Component);

  var _super = _createSuper(Tiles);

  function Tiles(props) {
    (0, _classCallCheck2["default"])(this, Tiles);
    return _super.call(this, props);
  }

  (0, _createClass2["default"])(Tiles, [{
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

      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "SortableItem rfb-item"
      }, /*#__PURE__*/_react["default"].createElement(_componentHeader["default"], this.props), /*#__PURE__*/_react["default"].createElement("div", {
        className: "form-group"
      }, /*#__PURE__*/_react["default"].createElement(_core.Grid, {
        container: true,
        spacing: propsData.customOptions.spacing || 2
      }, arrCards.map(function (c, i) {
        return /*#__PURE__*/_react["default"].createElement(_core.Grid, {
          item: true,
          xs: c.xs || 12,
          sm: c.sm || 12,
          md: c.md || 12
        }, /*#__PURE__*/_react["default"].createElement(_core.Card, {
          elevation: 0,
          style: {
            backgroundColor: "".concat(_this.props.data && _this.props.data.customOptions.tileProperties[i].tilesColor === TilesThemeColorEnum.RED ? "rgb(216, 67, 21)" : _this.props.data.customOptions.tileProperties[i].tilesColor === TilesThemeColorEnum.BLUE ? "rgb(30, 136, 229)" : _this.props.data.customOptions.tileProperties[i].tilesColor === TilesThemeColorEnum.CUSTOM ? _this.props.data.customOptions.tileProperties[i].tilesRandomColor : "#ffffff"),
            border: "2px solid #D5D5D5"
          }
        }, /*#__PURE__*/_react["default"].createElement(_core.CardContent, null, /*#__PURE__*/_react["default"].createElement(_core.Grid, {
          container: true,
          direction: "column",
          alignItems: "center",
          style: {
            borderRadius: '5px'
          }
        }, /*#__PURE__*/_react["default"].createElement(_core.Grid, {
          item: true,
          className: "pt-3"
        }, /*#__PURE__*/_react["default"].createElement("h6", {
          style: {
            color: "".concat(_this.props.data && (_this.props.data.customOptions.tileProperties[i].tilesColor === TilesThemeColorEnum.RED || _this.props.data.customOptions.tileProperties[i].tilesColor === TilesThemeColorEnum.BLUE || _this.props.data.customOptions.tileProperties[i].tilesColor === TilesThemeColorEnum.CUSTOM) ? "#ffffff" : "#9f9f9f")
          }
        }, "".concat(_this.props.data.customOptions.tileProperties[i].title ? _this.props.data.customOptions.tileProperties[i].title : "Title Text"))), /*#__PURE__*/_react["default"].createElement(_core.Grid, {
          item: true
        }, /*#__PURE__*/_react["default"].createElement("h3", {
          style: {
            color: "".concat(_this.props.data && (_this.props.data.customOptions.tileProperties[i].tilesColor === TilesThemeColorEnum.RED || _this.props.data.customOptions.tileProperties[i].tilesColor === TilesThemeColorEnum.BLUE || _this.props.data.customOptions.tileProperties[i].tilesColor === TilesThemeColorEnum.CUSTOM) ? "#ffffff" : "#212121")
          }
        }, _this.props.data.customOptions.tileProperties[i].text ? _this.props.data.customOptions.tileProperties[i].text : "Text"))))));
      }))));
    }
  }]);
  return Tiles;
}(_react["default"].Component);

var _default = Tiles;
exports["default"] = _default;
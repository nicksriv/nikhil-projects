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
var _Paper = _interopRequireDefault(require("@material-ui/core/Paper"));
var _Tabs = _interopRequireDefault(require("@material-ui/core/Tabs"));
var _Tab = _interopRequireDefault(require("@material-ui/core/Tab"));
var _dropElements = _interopRequireDefault(require("./dropElements"));
var _ItemTypes = _interopRequireDefault(require("../ItemTypes"));
var _AppBar = _interopRequireDefault(require("@material-ui/core/AppBar"));
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
var accepts = [_ItemTypes.default.BOX, _ItemTypes.default.CARD];
var TabsComponent = /*#__PURE__*/function (_React$Component) {
  _inherits(TabsComponent, _React$Component);
  var _super = _createSuper(TabsComponent);
  function TabsComponent(props) {
    var _this;
    _classCallCheck(this, TabsComponent);
    _this = _super.call(this, props);
    _defineProperty(_assertThisInitialized(_this), "handleChange", function (event, data) {
      _this.setState({
        value: data
      });
    });
    _this.state = {
      value: 0
    };
    return _this;
  }
  _createClass(TabsComponent, [{
    key: "render",
    value: function render() {
      var _this2 = this;
      var propsData = this.props.data;
      var _this$props = this.props,
        controls = _this$props.controls,
        data = _this$props.data,
        editModeOn = _this$props.editModeOn,
        getDataByArrayId = _this$props.getDataByArrayId,
        setArrayAsChild = _this$props.setArrayAsChild,
        removeChildFromArray = _this$props.removeChildFromArray,
        seq = _this$props.seq,
        index = _this$props.index;
      if (!data.childItems) {
        // eslint-disable-next-line no-param-reassign
        data.childItems = [];
        propsData.tabsOptions.map(function (opt) {
          data.childItems.push([]);
        });
        data.isContainer = true;
      } else {
        if (propsData.tabsOptions.length > data.childItems.length) {
          propsData.tabsOptions.map(function (opt, ind) {
            if (data.childItems[ind] != undefined) {
              data.childItems.push([]);
            }
          });
        }
        data.isContainer = true;
      }
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "SortableItem rfb-item"
      }, /*#__PURE__*/_react.default.createElement(_componentHeader.default, this.props), /*#__PURE__*/_react.default.createElement("div", {
        className: "row",
        style: {
          marginLeft: '0px',
          marginRight: '0px'
        }
      }, /*#__PURE__*/_react.default.createElement("div", {
        style: {
          width: '100%'
        }
      }, /*#__PURE__*/_react.default.createElement(_materialElementLabel.default, this.props), /*#__PURE__*/_react.default.createElement(_Paper.default, {
        square: true
      }, /*#__PURE__*/_react.default.createElement(_Tabs.default, {
        variant: "scrollable",
        scrollButtons: "on",
        value: this.state.value,
        onChange: this.handleChange,
        indicatorColor: "primary",
        textColor: "primary",
        "aria-label": "disabled tabs example"
      }, propsData.tabsOptions.map(function (option) {
        return /*#__PURE__*/_react.default.createElement(_Tab.default, {
          label: option.label
        });
      }))), propsData.tabsOptions.map(function (option, i) {
        return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, _this2.state.value === i && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
          style: {
            backgroundColor: 'rgba(0, 0, 0, .03)'
          },
          key: "".concat(i, "_").concat(option.key || '_')
        }, controls ? controls[i] : /*#__PURE__*/_react.default.createElement(_dropElements.default, {
          style: {
            width: '100%'
          },
          data: data,
          accepts: accepts,
          items: data.childItems,
          col: i,
          parentIndex: index,
          editModeOn: editModeOn,
          _onDestroy: function _onDestroy(itemData) {
            return removeChildFromArray(itemData, data, i);
          },
          getDataByArrayId: getDataByArrayId,
          setArrayAsChild: setArrayAsChild,
          seq: seq
        }))));
      }))));
    }
  }]);
  return TabsComponent;
}(_react.default.Component);
var _default = TabsComponent;
exports.default = _default;
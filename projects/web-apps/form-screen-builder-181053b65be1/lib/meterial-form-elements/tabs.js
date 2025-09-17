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

var _Paper = _interopRequireDefault(require("@material-ui/core/Paper"));

var _Tabs = _interopRequireDefault(require("@material-ui/core/Tabs"));

var _Tab = _interopRequireDefault(require("@material-ui/core/Tab"));

var _dropElements = _interopRequireDefault(require("./dropElements"));

var _ItemTypes = _interopRequireDefault(require("../ItemTypes"));

var _AppBar = _interopRequireDefault(require("@material-ui/core/AppBar"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var accepts = [_ItemTypes["default"].BOX, _ItemTypes["default"].CARD];

var TabsComponent = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(TabsComponent, _React$Component);

  var _super = _createSuper(TabsComponent);

  function TabsComponent(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, TabsComponent);
    _this = _super.call(this, props);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "handleChange", function (event, data) {
      _this.setState({
        value: data
      });
    });
    _this.state = {
      value: 0
    };
    return _this;
  }

  (0, _createClass2["default"])(TabsComponent, [{
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

      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "SortableItem rfb-item"
      }, /*#__PURE__*/_react["default"].createElement(_componentHeader["default"], this.props), /*#__PURE__*/_react["default"].createElement("div", {
        className: "row",
        style: {
          marginLeft: '0px',
          marginRight: '0px'
        }
      }, /*#__PURE__*/_react["default"].createElement("div", {
        style: {
          width: '100%'
        }
      }, /*#__PURE__*/_react["default"].createElement(_materialElementLabel["default"], this.props), /*#__PURE__*/_react["default"].createElement(_Paper["default"], {
        square: true
      }, /*#__PURE__*/_react["default"].createElement(_Tabs["default"], {
        variant: "scrollable",
        scrollButtons: "on",
        value: this.state.value,
        onChange: this.handleChange,
        indicatorColor: "primary",
        textColor: "primary",
        "aria-label": "disabled tabs example"
      }, propsData.tabsOptions.map(function (option) {
        return /*#__PURE__*/_react["default"].createElement(_Tab["default"], {
          label: option.label
        });
      }))), propsData.tabsOptions.map(function (option, i) {
        return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, _this2.state.value === i && /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("div", {
          style: {
            backgroundColor: 'rgba(0, 0, 0, .03)'
          },
          key: "".concat(i, "_").concat(option.key || '_')
        }, controls ? controls[i] : /*#__PURE__*/_react["default"].createElement(_dropElements["default"], {
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
}(_react["default"].Component);

var _default = TabsComponent;
exports["default"] = _default;
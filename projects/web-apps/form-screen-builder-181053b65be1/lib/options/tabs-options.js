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

var _UUID = _interopRequireDefault(require("../UUID"));

var _core = require("@material-ui/core");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var TabsOptions = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(TabsOptions, _React$Component);

  var _super = _createSuper(TabsOptions);

  function TabsOptions(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, TabsOptions);
    _this = _super.call(this, props);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "tabsTextAreaHandleChange", function (e) {
      var text = e.target.value;
      var optionsData = text.split('\n');
      var this_element = _this.state.element;
      this_element.customOptions.optionsText = text;
      this_element.tabsOptions = [];

      for (var i = 0; i < optionsData.length; i++) {
        this_element.tabsOptions.push({
          value: optionsData[i],
          label: optionsData[i],
          key: _UUID["default"].uuid()
        });
      }

      _this.setState({
        element: this_element,
        dirty: true
      }); // this.props.updateElement.call(this.props.preview, this_element);

    });
    _this.state = {
      element: _this.props.element,
      data: _this.props.data,
      dirty: false
    };
    return _this;
  }

  (0, _createClass2["default"])(TabsOptions, [{
    key: "updateOption",
    value: function updateOption() {
      var this_element = this.state.element; // to prevent ajax calls with no change

      if (this.state.dirty) {
        this.props.updateElement.call(this.props.preview, this_element);
        this.setState({
          dirty: false
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      if (this.state.dirty) {
        this.state.element.dirty = true;
      }

      return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_core.Grid, {
        item: true,
        xs: 12,
        spacing: 2,
        className: "element-options-border-grid padding-top-10 padding-bottom-10"
      }, /*#__PURE__*/_react["default"].createElement(_core.Grid, {
        item: true,
        xs: 12,
        className: " padding-top-10 padding-bottom-10"
      }, /*#__PURE__*/_react["default"].createElement(_core.FormLabel, {
        component: "legend"
      }, "Options"), /*#__PURE__*/_react["default"].createElement(_core.TextField, {
        size: "small",
        multiline: true,
        fullWidth: true,
        rows: 3,
        variant: "outlined",
        onBlur: this.updateOption.bind(this),
        helperText: "Enter the list of the tab titles. Separate each options by new line",
        value: this.props.element.customOptions.optionsText,
        onChange: this.tabsTextAreaHandleChange
      }))));
    }
  }]);
  return TabsOptions;
}(_react["default"].Component);

exports["default"] = TabsOptions;
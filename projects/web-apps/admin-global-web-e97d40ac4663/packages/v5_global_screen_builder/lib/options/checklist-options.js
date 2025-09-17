"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _UUID = _interopRequireDefault(require("../UUID"));
var _core = require("@material-ui/core");
var _reactTextareaAutosize = _interopRequireDefault(require("react-textarea-autosize"));
var _Info = _interopRequireDefault(require("@material-ui/icons/Info"));
var _styles = require("@material-ui/core/styles");
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
var styles = function styles(theme) {
  return {
    icon: {
      "&:hover": {
        color: "#2C3E93"
      }
    },
    tooltip: {
      fontFamily: "SF Pro",
      fontSize: "12px"
    }
  };
};
var CheckListOptions = /*#__PURE__*/function (_React$Component) {
  _inherits(CheckListOptions, _React$Component);
  var _super = _createSuper(CheckListOptions);
  function CheckListOptions(props) {
    var _this;
    _classCallCheck(this, CheckListOptions);
    _this = _super.call(this, props);
    _defineProperty(_assertThisInitialized(_this), "checkListTextAreaHandleChange", function (e) {
      var text = e.target.value;
      var optionsData = text.split('\n');
      var this_element = _this.state.element;
      this_element.customOptions.optionsText = text;
      var otherOptionText = '';
      if (this_element.customOptions.isOtherOption) {
        otherOptionText = this_element.checkListOptions[this_element.checkListOptions.length - 1];
      }
      this_element.checkListOptions = [];
      for (var i = 0; i < optionsData.length; i++) {
        this_element.checkListOptions.push({
          value: optionsData[i],
          label: optionsData[i],
          key: _UUID.default.uuid()
        });
      }
      if (this_element.customOptions.isOtherOption) {
        this_element.checkListOptions.push({
          value: otherOptionText.value,
          label: otherOptionText.label,
          key: _UUID.default.uuid()
        });
      }
      _this.setState({
        element: this_element,
        dirty: true
      });
      // this.props.updateElement.call(this.props.preview, this_element);
    });
    _defineProperty(_assertThisInitialized(_this), "buttonColumnChange", function (e) {
      var this_element = _this.state.element;
      var value = e.target.value;
      this_element.customOptions.columns = parseInt(value);
      _this.setState({
        element: this_element,
        dirty: true
      });
    });
    _this.state = {
      element: _this.props.element,
      data: _this.props.data,
      dirty: false
    };
    return _this;
  }
  _createClass(CheckListOptions, [{
    key: "updateOption",
    value: function updateOption() {
      var this_element = this.state.element;
      // to prevent ajax calls with no change
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
      var helpertext = "This changes the orientation of your buttons from a single row (setting '0') to columns. A setting of '1' arranges the buttons vertically into one column while a setting of '2' divides the buttons equally into two columns.";
      var classes = this.props.classes;
      return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_core.Grid, {
        container: true,
        className: "mt-3"
      }, /*#__PURE__*/_react.default.createElement(_core.Grid, {
        item: true,
        xs: 12,
        className: "my-2"
      }, /*#__PURE__*/_react.default.createElement(_core.TextField, {
        variant: "outlined",
        label: "Options",
        fullWidth: true
        // id="questionDescription1" 
        ,
        multiline: true
        //rows={2}
        ,
        onBlur: this.updateOption.bind(this),
        value: this.props.element.customOptions.optionsText,
        onChange: this.checkListTextAreaHandleChange
      }), /*#__PURE__*/_react.default.createElement("ul", {
        className: "ml-4 p-1",
        style: {
          opacity: "0.8"
        }
      }, /*#__PURE__*/_react.default.createElement("li", null, "Enter the list of the dropdown options"), /*#__PURE__*/_react.default.createElement("li", null, "Seperate each options by new line"))), /*#__PURE__*/_react.default.createElement(_core.Grid, {
        item: true,
        xs: 12,
        className: "mt-2"
      }, /*#__PURE__*/_react.default.createElement(_core.TextField, {
        fullWidth: true,
        type: "number",
        label: "Field Layout",
        value: this.props.element.customOptions.columns,
        onChange: this.buttonColumnChange,
        variant: "outlined",
        inputProps: {
          min: 0
        },
        InputProps: {
          endAdornment: /*#__PURE__*/_react.default.createElement(_core.Tooltip, {
            placement: "top-start",
            title: /*#__PURE__*/_react.default.createElement("p", {
              className: classes.tooltip
            }, helpertext)
          }, /*#__PURE__*/_react.default.createElement(_core.InputAdornment, null, /*#__PURE__*/_react.default.createElement(_core.IconButton, {
            style: {
              padding: "0"
            }
          }, /*#__PURE__*/_react.default.createElement(_Info.default, {
            className: classes.icon
          }))))
        }
      }))));
    }
  }]);
  return CheckListOptions;
}(_react.default.Component);
var _default = (0, _styles.withStyles)(styles, {
  withTheme: true
})(CheckListOptions);
exports.default = _default;
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

var _reactTextareaAutosize = _interopRequireDefault(require("react-textarea-autosize"));

var _Info = _interopRequireDefault(require("@material-ui/icons/Info"));

var _styles = require("@material-ui/core/styles");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var styles = function styles(theme) {
  return {
    icon: {
      "&:hover": {
        color: "#50BFB7"
      }
    },
    tooltip: {
      fontFamily: "SF Pro",
      fontSize: "12px"
    }
  };
};

var CheckListOptions = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(CheckListOptions, _React$Component);

  var _super = _createSuper(CheckListOptions);

  function CheckListOptions(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, CheckListOptions);
    _this = _super.call(this, props);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "checkListTextAreaHandleChange", function (e) {
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
          key: _UUID["default"].uuid()
        });
      }

      if (this_element.customOptions.isOtherOption) {
        this_element.checkListOptions.push({
          value: otherOptionText.value,
          label: otherOptionText.label,
          key: _UUID["default"].uuid()
        });
      }

      _this.setState({
        element: this_element,
        dirty: true
      }); // this.props.updateElement.call(this.props.preview, this_element);

    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "buttonColumnChange", function (e) {
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

  (0, _createClass2["default"])(CheckListOptions, [{
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

      var helpertext = "This changes the orientation of your buttons from a single row (setting '0') to columns. A setting of '1' arranges the buttons vertically into one column while a setting of '2' divides the buttons equally into two columns.";
      var classes = this.props.classes;
      return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_core.Grid, {
        container: true,
        className: "mt-3"
      }, /*#__PURE__*/_react["default"].createElement(_core.Grid, {
        item: true,
        xs: 12,
        className: "my-2"
      }, /*#__PURE__*/_react["default"].createElement(_core.TextField, {
        variant: "outlined",
        label: "Options",
        fullWidth: true // id="questionDescription1" 
        ,
        multiline: true //rows={2}
        ,
        onBlur: this.updateOption.bind(this),
        value: this.props.element.customOptions.optionsText,
        onChange: this.checkListTextAreaHandleChange
      }), /*#__PURE__*/_react["default"].createElement("ul", {
        className: "ml-4 p-1",
        style: {
          opacity: "0.8"
        }
      }, /*#__PURE__*/_react["default"].createElement("li", null, "Enter the list of the dropdown options"), /*#__PURE__*/_react["default"].createElement("li", null, "Seperate each options by new line"))), /*#__PURE__*/_react["default"].createElement(_core.Grid, {
        item: true,
        xs: 12,
        className: "mt-2"
      }, /*#__PURE__*/_react["default"].createElement(_core.TextField, {
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
          endAdornment: /*#__PURE__*/_react["default"].createElement(_core.Tooltip, {
            placement: "top-start",
            title: /*#__PURE__*/_react["default"].createElement("p", {
              className: classes.tooltip
            }, helpertext)
          }, /*#__PURE__*/_react["default"].createElement(_core.InputAdornment, null, /*#__PURE__*/_react["default"].createElement(_core.IconButton, {
            style: {
              padding: "0"
            }
          }, /*#__PURE__*/_react["default"].createElement(_Info["default"], {
            className: classes.icon
          }))))
        }
      }))));
    }
  }]);
  return CheckListOptions;
}(_react["default"].Component);

var _default = (0, _styles.withStyles)(styles, {
  withTheme: true
})(CheckListOptions);

exports["default"] = _default;
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

var ButtonRadiosOptions = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(ButtonRadiosOptions, _React$Component);

  var _super = _createSuper(ButtonRadiosOptions);

  function ButtonRadiosOptions(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, ButtonRadiosOptions);
    _this = _super.call(this, props);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "checkListTextAreaHandleChange", function (e) {
      var text = e.target.value;
      var optionsData = text.split('\n');
      var this_element = _this.state.element;
      this_element.customOptions.optionsText = text;
      this_element.buttonRadioOptions = [];

      for (var i = 0; i < optionsData.length; i++) {
        var splitOptions = optionsData[i].split('[');
        var hoverTextStr = '';

        if (splitOptions.length > 1) {
          hoverTextStr = splitOptions[1].slice(0, -1);
        }

        this_element.buttonRadioOptions.push({
          value: splitOptions[0],
          label: splitOptions[0],
          key: _UUID["default"].uuid(),
          hoverText: hoverTextStr
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
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "buttonSpacingChange", function (e) {
      var this_element = _this.state.element;
      var value = e.target.value;
      this_element.customOptions.spacing = parseInt(value);

      _this.setState({
        element: this_element,
        dirty: true
      });
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "setButtonThemeColor", function (e) {
      var this_element = _this.state.element;
      this_element.customOptions.buttonThemeColor = e.target.value;

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

  (0, _createClass2["default"])(ButtonRadiosOptions, [{
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
      var _this2 = this;

      if (this.state.dirty) {
        this.state.element.dirty = true;
      }

      var helpertext1 = "This changes the orientation of your buttons from a single row (setting '0') to columns. A setting of '1' arranges the buttons vertically into one column while a setting of '2' divides the buttons equally into two columns.";
      var helpertext2 = "This is the space between two rows of buttons in pixels";
      var classes = this.props.classes;
      return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_core.Grid, {
        item: true,
        xs: 12
      }, /*#__PURE__*/_react["default"].createElement(_core.Grid, {
        item: true,
        xs: 12,
        className: "my-4"
      }, /*#__PURE__*/_react["default"].createElement(_core.TextField, {
        size: "small",
        multiline: true,
        fullWidth: true,
        label: "Options",
        rows: 3,
        variant: "outlined",
        onBlur: this.updateOption.bind(this),
        helperText: "Enter the list of the radio buttons.   You can optionally include on hover text inside square brackets [on hover text] Separate each options by new line.",
        value: this.props.element.customOptions.optionsText,
        onChange: this.checkListTextAreaHandleChange
      })), /*#__PURE__*/_react["default"].createElement(_core.Grid, {
        item: true,
        xs: 12,
        className: "my-4 padding-top-5"
      }, /*#__PURE__*/_react["default"].createElement(_core.TextField //size="small"
      , {
        fullWidth: true,
        type: "number",
        label: "Columns",
        value: this.props.element.customOptions.columns,
        onChange: this.buttonColumnChange,
        variant: "outlined",
        InputProps: {
          endAdornment: /*#__PURE__*/_react["default"].createElement(_core.Tooltip, {
            placement: "top-start",
            title: /*#__PURE__*/_react["default"].createElement("p", {
              className: classes.tooltip
            }, helpertext1)
          }, /*#__PURE__*/_react["default"].createElement(_core.InputAdornment, null, /*#__PURE__*/_react["default"].createElement(_core.IconButton, {
            style: {
              padding: "0"
            }
          }, /*#__PURE__*/_react["default"].createElement(_Info["default"], {
            className: classes.icon
          }))))
        }
      })), /*#__PURE__*/_react["default"].createElement(_core.Grid, {
        item: true,
        xs: 12,
        className: "my-4 padding-top-5"
      }, /*#__PURE__*/_react["default"].createElement(_core.TextField //size="small"
      , {
        fullWidth: true,
        type: "number",
        label: "Spacing",
        value: this.props.element.customOptions.spacing,
        onChange: this.buttonSpacingChange,
        variant: "outlined",
        InputProps: {
          endAdornment: /*#__PURE__*/_react["default"].createElement(_core.Tooltip, {
            placement: "top-start",
            title: /*#__PURE__*/_react["default"].createElement("p", {
              className: classes.tooltip
            }, helpertext2)
          }, /*#__PURE__*/_react["default"].createElement(_core.InputAdornment, null, /*#__PURE__*/_react["default"].createElement(_core.IconButton, {
            style: {
              padding: "0"
            }
          }, /*#__PURE__*/_react["default"].createElement(_Info["default"], {
            className: classes.icon
          }))))
        }
      })), /*#__PURE__*/_react["default"].createElement(_core.Grid, {
        item: true,
        xs: 12,
        sm: 12,
        className: "mt-4 padding-top-5"
      }, /*#__PURE__*/_react["default"].createElement(_core.FormControl, {
        fullWidth: true,
        variant: "outlined"
      }, /*#__PURE__*/_react["default"].createElement(_core.InputLabel, {
        id: "defaultSelect"
      }, "Theme Color"), /*#__PURE__*/_react["default"].createElement(_core.Select, {
        labelId: "defaultSelect",
        id: "defaultSelect",
        value: this.props.element.customOptions.buttonThemeColor,
        label: "Theme Color",
        onBlur: this.updateOption.bind(this),
        onChange: function onChange(event) {
          return _this2.setButtonThemeColor(event);
        },
        MenuProps: {
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "left"
          },
          getContentAnchorEl: null
        }
      }, /*#__PURE__*/_react["default"].createElement(_core.MenuItem, {
        value: "red"
      }, "Red"), /*#__PURE__*/_react["default"].createElement(_core.MenuItem, {
        value: "blue"
      }, "Blue"), /*#__PURE__*/_react["default"].createElement(_core.MenuItem, {
        value: "black"
      }, "Black")), /*#__PURE__*/_react["default"].createElement(_core.FormHelperText, null, "The theme color of your selected buton. You can select from given options.")))));
    }
  }]);
  return ButtonRadiosOptions;
}(_react["default"].Component);

var _default = (0, _styles.withStyles)(styles, {
  withTheme: true
})(ButtonRadiosOptions);

exports["default"] = _default;
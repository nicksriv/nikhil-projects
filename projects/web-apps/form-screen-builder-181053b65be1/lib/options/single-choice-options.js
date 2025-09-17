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

var _Info = _interopRequireDefault(require("@material-ui/icons/Info"));

var _Add = _interopRequireDefault(require("@material-ui/icons/Add"));

var _Remove = _interopRequireDefault(require("@material-ui/icons/Remove"));

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

var SingleChoiceOptions = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(SingleChoiceOptions, _React$Component);

  var _super = _createSuper(SingleChoiceOptions);

  function SingleChoiceOptions(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, SingleChoiceOptions);
    _this = _super.call(this, props);
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

  (0, _createClass2["default"])(SingleChoiceOptions, [{
    key: "_setValue",
    value: function _setValue(label) {
      return label.replace(/[^A-Z0-9]+/ig, ' ').toLowerCase();
    }
  }, {
    key: "editOption",
    value: function editOption(option_index, e) {
      var this_element = this.state.element;
      var val = this_element.singleChoiceOptions[option_index].value !== this._setValue(this_element.singleChoiceOptions[option_index].label) ? this_element.singleChoiceOptions[option_index].value : this._setValue(e.target.value);
      this_element.singleChoiceOptions[option_index].label = e.target.value;
      this_element.singleChoiceOptions[option_index].value = val;
      this.setState({
        element: this_element,
        dirty: true
      });
    }
  }, {
    key: "editValue",
    value: function editValue(option_index, e) {
      var this_element = this.state.element;
      var val = e.target.value === '' ? this._setValue(this_element.singleChoiceOptions[option_index].label) : e.target.value;
      this_element.singleChoiceOptions[option_index].value = val;
      this.setState({
        element: this_element,
        dirty: true
      });
    } // eslint-disable-next-line no-unused-vars

  }, {
    key: "editOptionCorrect",
    value: function editOptionCorrect(option_index, e) {
      var this_element = this.state.element;

      if (this_element.singleChoiceOptions[option_index].hasOwnProperty('correct')) {
        delete this_element.singleChoiceOptions[option_index].correct;
      } else {
        this_element.singleChoiceOptions[option_index].correct = true;
      }

      this.setState({
        element: this_element
      });
      this.props.updateElement.call(this.props.preview, this_element);
    }
  }, {
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
    key: "addOption",
    value: function addOption(index) {
      var this_element = this.state.element;
      this_element.singleChoiceOptions.splice(index + 1, 0, {
        value: 'New Option',
        label: 'New Option',
        key: _UUID["default"].uuid()
      });
      this.props.updateElement.call(this.props.preview, this_element);
    }
  }, {
    key: "removeOption",
    value: function removeOption(index) {
      var this_element = this.state.element;
      this_element.singleChoiceOptions.splice(index, 1);
      this.props.updateElement.call(this.props.preview, this_element);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      if (this.state.dirty) {
        this.state.element.dirty = true;
      }

      var helperText = "This changes the orientation of your buttons from a single row (setting '0') to columns. A setting of '1' arranges the buttons vertically into one column while a setting of '2' divides the buttons equally into two columns.";
      var classes = this.props.classes;
      return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_core.Grid, {
        container: true
      }, /*#__PURE__*/_react["default"].createElement(_core.Grid, {
        item: true,
        xs: 12,
        className: "my-4"
      }, /*#__PURE__*/_react["default"].createElement(_core.TextField //size="small"
      , {
        fullWidth: true,
        type: "number",
        label: "Field Layout",
        value: this.props.element.customOptions.columns,
        onChange: this.buttonColumnChange,
        InputProps: {
          inputProps: {
            min: 0,
            max: 2
          },
          endAdornment: /*#__PURE__*/_react["default"].createElement(_core.Tooltip, {
            placement: "top-start",
            title: /*#__PURE__*/_react["default"].createElement("p", {
              className: classes.tooltip
            }, helperText)
          }, /*#__PURE__*/_react["default"].createElement(_core.InputAdornment, null, /*#__PURE__*/_react["default"].createElement(_core.IconButton, {
            style: {
              padding: "0"
            }
          }, /*#__PURE__*/_react["default"].createElement(_Info["default"], {
            className: classes.icon
          }))))
        } //helperText="This changes the orientation of your buttons from a single row (setting '0') to columns. A setting of '1' arranges the buttons vertically into one column while a setting of '2' divides the buttons equally into two columns."
        ,
        variant: "outlined"
      })), /*#__PURE__*/_react["default"].createElement(_core.Grid, {
        item: true,
        xs: 12
      }, /*#__PURE__*/_react["default"].createElement("h6", {
        style: {
          opacity: '0.6',
          fontWeight: 'normal'
        }
      }, "Options:")), this.props.element.singleChoiceOptions.map(function (option, index) {
        var this_key = "edit_".concat(option.key);
        var val = option.value !== _this2._setValue(option.label) ? option.value : '';
        return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, {
          key: this_key
        }, /*#__PURE__*/_react["default"].createElement(_core.Grid, {
          item: true,
          xs: 12,
          sm: 9,
          className: "my-2"
        }, /*#__PURE__*/_react["default"].createElement(_core.TextField, {
          fullWidth: true //size="small"
          ,
          variant: "outlined",
          value: option.label,
          InputProps: {
            type: 'text'
          },
          placeholder: "Option text",
          onBlur: _this2.updateOption.bind(_this2),
          onChange: _this2.editOption.bind(_this2, index)
        })), false && /*#__PURE__*/_react["default"].createElement(_core.Grid, {
          item: true,
          xs: 12,
          sm: 1,
          className: "my-2"
        }, /*#__PURE__*/_react["default"].createElement("input", {
          className: "form-control",
          type: "text",
          name: "value_".concat(index),
          value: val,
          onChange: _this2.editValue.bind(_this2, index)
        })), option.value != "other" && /*#__PURE__*/_react["default"].createElement(_core.Grid, {
          item: true,
          xs: 12,
          sm: 1,
          className: "my-2"
        }, /*#__PURE__*/_react["default"].createElement(_core.IconButton, {
          "aria-label": "add"
        }, /*#__PURE__*/_react["default"].createElement(_Add["default"], {
          onClick: _this2.addOption.bind(_this2, index)
        }))), option.value != "other" && index > 0 && /*#__PURE__*/_react["default"].createElement(_core.Grid, {
          item: true,
          xs: 6,
          sm: 1,
          className: "my-2"
        }, /*#__PURE__*/_react["default"].createElement(_core.IconButton, {
          "aria-label": "remove"
        }, /*#__PURE__*/_react["default"].createElement(_Remove["default"], {
          onClick: _this2.removeOption.bind(_this2, index)
        }))));
      })));
    }
  }]);
  return SingleChoiceOptions;
}(_react["default"].Component);

var _default = (0, _styles.withStyles)(styles, {
  withTheme: true
})(SingleChoiceOptions);

exports["default"] = _default;
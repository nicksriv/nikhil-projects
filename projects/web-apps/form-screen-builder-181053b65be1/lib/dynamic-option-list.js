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

var _UUID = _interopRequireDefault(require("./UUID"));

var _core = require("@material-ui/core");

var _Add = _interopRequireDefault(require("@material-ui/icons/Add"));

var _Remove = _interopRequireDefault(require("@material-ui/icons/Remove"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var DynamicOptionList = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(DynamicOptionList, _React$Component);

  var _super = _createSuper(DynamicOptionList);

  function DynamicOptionList(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, DynamicOptionList);
    _this = _super.call(this, props);
    _this.state = {
      element: _this.props.element,
      data: _this.props.data,
      dirty: false
    };
    return _this;
  }

  (0, _createClass2["default"])(DynamicOptionList, [{
    key: "_setValue",
    value: function _setValue(text) {
      return text.replace(/[^A-Z0-9]+/ig, '_').toLowerCase();
    }
  }, {
    key: "editOption",
    value: function editOption(option_index, e) {
      var this_element = this.state.element;
      var val = this_element.options[option_index].value !== this._setValue(this_element.options[option_index].text) ? this_element.options[option_index].value : this._setValue(e.target.value);
      this_element.options[option_index].text = e.target.value;
      this_element.options[option_index].value = val;
      this.setState({
        element: this_element,
        dirty: true
      });
    }
  }, {
    key: "editValue",
    value: function editValue(option_index, e) {
      var this_element = this.state.element;
      var val = e.target.value === '' ? this._setValue(this_element.options[option_index].text) : e.target.value;
      this_element.options[option_index].value = val;
      this.setState({
        element: this_element,
        dirty: true
      });
    } // eslint-disable-next-line no-unused-vars

  }, {
    key: "editOptionCorrect",
    value: function editOptionCorrect(option_index, e) {
      var this_element = this.state.element;

      if (this_element.options[option_index].hasOwnProperty('correct')) {
        delete this_element.options[option_index].correct;
      } else {
        this_element.options[option_index].correct = true;
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
      this_element.options.splice(index + 1, 0, {
        value: '',
        text: '',
        key: _UUID["default"].uuid()
      });
      this.props.updateElement.call(this.props.preview, this_element);
    }
  }, {
    key: "removeOption",
    value: function removeOption(index) {
      var this_element = this.state.element;
      this_element.options.splice(index, 1);
      this.props.updateElement.call(this.props.preview, this_element);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      if (this.state.dirty) {
        this.state.element.dirty = true;
      }

      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "dynamic-option-list"
      }, /*#__PURE__*/_react["default"].createElement("ul", null, /*#__PURE__*/_react["default"].createElement("li", null, /*#__PURE__*/_react["default"].createElement("div", {
        className: "row"
      }, /*#__PURE__*/_react["default"].createElement(_core.Typography, {
        variant: "h6",
        component: "h6"
      }, "Options"), this.props.canHaveOptionValue && /*#__PURE__*/_react["default"].createElement("div", {
        className: "col-sm-2"
      }, /*#__PURE__*/_react["default"].createElement("b", null, "Value")))), this.props.element.options.map(function (option, index) {
        var this_key = "edit_".concat(option.key);
        var val = option.value !== _this2._setValue(option.text) ? option.value : '';
        return /*#__PURE__*/_react["default"].createElement("li", {
          className: "clearfix",
          key: this_key
        }, /*#__PURE__*/_react["default"].createElement("div", {
          className: "row"
        }, /*#__PURE__*/_react["default"].createElement("div", {
          className: "col-sm-6"
        }, /*#__PURE__*/_react["default"].createElement("input", {
          tabIndex: index + 1,
          className: "form-control",
          style: {
            width: '100%'
          },
          type: "text",
          name: "text_".concat(index),
          placeholder: "Option text",
          value: option.text,
          onBlur: _this2.updateOption.bind(_this2),
          onChange: _this2.editOption.bind(_this2, index)
        })), _this2.props.canHaveOptionValue && /*#__PURE__*/_react["default"].createElement("div", {
          className: "col-sm-2"
        }, /*#__PURE__*/_react["default"].createElement("input", {
          className: "form-control",
          type: "text",
          name: "value_".concat(index),
          value: val,
          onChange: _this2.editValue.bind(_this2, index)
        })), option.value != "other" && /*#__PURE__*/_react["default"].createElement("div", {
          className: "col-sm-3"
        }, /*#__PURE__*/_react["default"].createElement("div", {
          className: "dynamic-options-actions-buttons"
        }, /*#__PURE__*/_react["default"].createElement(_core.IconButton, {
          "aria-label": "add"
        }, /*#__PURE__*/_react["default"].createElement(_Add["default"], {
          onClick: _this2.addOption.bind(_this2, index)
        })), index > 0 && /*#__PURE__*/_react["default"].createElement(_core.IconButton, {
          "aria-label": "remove"
        }, /*#__PURE__*/_react["default"].createElement(_Remove["default"], {
          onClick: _this2.removeOption.bind(_this2, index)
        }))))));
      })));
    }
  }]);
  return DynamicOptionList;
}(_react["default"].Component);

exports["default"] = DynamicOptionList;
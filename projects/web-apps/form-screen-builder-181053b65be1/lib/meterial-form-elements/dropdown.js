"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

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

var _react = _interopRequireWildcard(require("react"));

var _materialElementLabel = _interopRequireDefault(require("./material-element-label"));

var _componentHeader = _interopRequireDefault(require("../form-elements/component-header"));

var _Select = _interopRequireDefault(require("@material-ui/core/Select"));

var _MenuItem = _interopRequireDefault(require("@material-ui/core/MenuItem"));

var _InputLabel = _interopRequireDefault(require("@material-ui/core/InputLabel"));

var _FormControl = _interopRequireDefault(require("@material-ui/core/FormControl"));

var _core = require("@material-ui/core");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var Dropdown = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(Dropdown, _React$Component);

  var _super = _createSuper(Dropdown);

  function Dropdown(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, Dropdown);
    _this = _super.call(this, props);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "onChangeEvent", function (e) {
      var status = {
        dropDownValue: e.target.value,
        error: false
      };
      var fieldResult = _this.state.fieldResult;
      fieldResult.value = status.dropDownValue;
      fieldResult.error = false;

      _this.setState(status);

      _this.props.collectFieldResults(fieldResult);
    });
    _this.state = {
      dropDownValue: props.result ? props.result.value : props.data.customOptions.defaultOptions,
      data: props.data || [],
      fieldResult: {
        questionId: props.data.id,
        value: '',
        error: false
      }
    };
    return _this;
  }

  (0, _createClass2["default"])(Dropdown, [{
    key: "render",
    value: function render() {
      var _this2 = this,
          _React$createElement;

      var fieldVariant = "";

      if (this.props.globalStyles) {
        fieldVariant = !this.props.globalStyles.formDefault && this.props.data.hasOwnProperty("fieldVariant") ? this.props.data.fieldVariant : this.props.globalStyles.globalFieldVariant;
      } else {
        if (this.props.data.fieldVariant) fieldVariant = this.props.data.fieldVariant;
      }

      var formPreview = this.props.hasOwnProperty('isFormPreview') ? this.props.isFormPreview : false;
      var fieldName = this.props.data.field_name;
      var inputWidth = "100%";

      if (this.props.data.inputFieldSize == 'large') {
        inputWidth = "100%";
      } else if (this.props.data.inputFieldSize == 'medium') {
        inputWidth = "50%";
      } else if (this.props.data.inputFieldSize == 'small') {
        inputWidth = "25%";
      }

      var disabled = this.props.read_only || false;
      var notRequired = {
        display: 'none'
      };
      var required = {
        display: 'inline'
      };
      console.log(this.props.data.dropDownOptions);
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "SortableItem rfb-item"
      }, /*#__PURE__*/_react["default"].createElement(_componentHeader["default"], this.props), /*#__PURE__*/_react["default"].createElement("div", {
        className: "form-group"
      }, /*#__PURE__*/_react["default"].createElement(_FormControl["default"], {
        variant: "outlined",
        style: {
          minWidth: '100%'
        }
      }, /*#__PURE__*/_react["default"].createElement(_InputLabel["default"], {
        id: "demo-simple-select-outlined-label"
      }, /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("span", null, this.props.data.label), /*#__PURE__*/_react["default"].createElement("span", {
        className: "text-error",
        style: this.props.data.customOptions.required ? required : notRequired
      }, "* "))), /*#__PURE__*/_react["default"].createElement(_Select["default"], (_React$createElement = {
        labelId: "demo-simple-select-outlined-label",
        id: "demo-simple-select-outlined",
        style: {
          width: inputWidth
        },
        size: "small"
      }, (0, _defineProperty2["default"])(_React$createElement, "id", this.props.id), (0, _defineProperty2["default"])(_React$createElement, "name", fieldName), (0, _defineProperty2["default"])(_React$createElement, "variant", fieldVariant), (0, _defineProperty2["default"])(_React$createElement, "label", this.props.data.label), (0, _defineProperty2["default"])(_React$createElement, "required", this.props.data.required), (0, _defineProperty2["default"])(_React$createElement, "onChange", function onChange(e) {
        return _this2.onChangeEvent(e);
      }), (0, _defineProperty2["default"])(_React$createElement, "value", this.state.dropDownValue), (0, _defineProperty2["default"])(_React$createElement, "disabled", disabled), (0, _defineProperty2["default"])(_React$createElement, "InputLabelProps", {
        shrink: true,
        classes: {
          asterisk: 'text-error'
        }
      }), (0, _defineProperty2["default"])(_React$createElement, "MenuProps", {
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "left"
        },
        getContentAnchorEl: null
      }), _React$createElement), this.props.data.customOptions.showEmptyTextOption && /*#__PURE__*/_react["default"].createElement(_MenuItem["default"], {
        value: "data"
      }, this.props.data.customOptions.emptyOptionText), this.props.data != undefined && this.props.data.dropDownOptions != undefined && this.props.data.dropDownOptions.map(function (option) {
        var this_key = "preview_".concat(option.label);
        return /*#__PURE__*/_react["default"].createElement(_MenuItem["default"], {
          value: option.label,
          key: this_key
        }, option.label);
      })))));
    }
  }]);
  return Dropdown;
}(_react["default"].Component);

var _default = Dropdown;
exports["default"] = _default;
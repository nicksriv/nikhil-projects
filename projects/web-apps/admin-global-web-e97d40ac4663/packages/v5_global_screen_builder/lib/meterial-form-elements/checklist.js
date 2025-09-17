"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _formik = require("formik");
var _materialElementLabel = _interopRequireDefault(require("./material-element-label"));
var _componentHeader = _interopRequireDefault(require("../form-elements/component-header"));
var _core = require("@material-ui/core");
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
var CheckList = /*#__PURE__*/function (_React$Component) {
  _inherits(CheckList, _React$Component);
  var _super = _createSuper(CheckList);
  function CheckList(props) {
    var _this;
    _classCallCheck(this, CheckList);
    _this = _super.call(this, props);
    _defineProperty(_assertThisInitialized(_this), "handleChange", function (data, event) {
      var fieldResult = _this.state.fieldResult;
      fieldResult.error = false;
      fieldResult.checkListOptions.map(function (option) {
        if (option.key == data.key) {
          option.isChecked = event.target.checked;
        }
      });
      // this.setState(status);
      _this.props.collectFieldResults(fieldResult);
    });
    _this.state = {
      checkListOptions: props.result ? props.result.checkListOptions : props.data.checkListOptions,
      fieldResult: {
        questionId: props.data.id,
        value: '',
        error: false,
        checkListOptions: props.data.checkListOptions
      }
    };
    return _this;
  }
  _createClass(CheckList, [{
    key: "render",
    value: function render() {
      var _this2 = this;
      var combinedList = [];
      var splittedIndex = [];
      /** Get Field Result */
      var optionList = this.props.data.checkListOptions;
      if (this.state.checkListOptions.length > 0) {
        optionList.map(function (data) {
          _this2.state.checkListOptions.map(function (resultOption) {
            if (data.key == resultOption.key) {
              data.isChecked = resultOption.isChecked;
            }
          });
        });
      }
      for (var i = 0; i < optionList.length; i++) {
        splittedIndex.push(optionList[i]);
        if (splittedIndex.length == this.props.data.customOptions.columns || i == optionList.length - 1) {
          combinedList.push(splittedIndex);
          splittedIndex = [];
        }
      }
      var isRequired = this.props.data.customOptions.required;
      var disabled = this.props.read_only || false;
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "SortableItem rfb-item"
      }, /*#__PURE__*/_react.default.createElement(_componentHeader.default, this.props), /*#__PURE__*/_react.default.createElement("div", {
        className: "form-group"
      }, /*#__PURE__*/_react.default.createElement(_core.FormControl, {
        required: isRequired,
        component: "fieldset"
      }, /*#__PURE__*/_react.default.createElement(_materialElementLabel.default, this.props), combinedList.map(function (data) {
        return /*#__PURE__*/_react.default.createElement(_core.Grid, {
          item: true,
          xs: 12
        }, data.map(function (option) {
          return /*#__PURE__*/_react.default.createElement(_core.FormControlLabel, {
            className: "pr-4",
            control: /*#__PURE__*/_react.default.createElement(_core.Checkbox, {
              disabled: disabled,
              onChange: function onChange(event) {
                return _this2.handleChange(option, event);
              },
              name: option.value,
              color: "primary"
            }),
            label: option.label
          });
        }));
      }))));
    }
  }]);
  return CheckList;
}(_react.default.Component);
var _default = CheckList;
exports.default = _default;
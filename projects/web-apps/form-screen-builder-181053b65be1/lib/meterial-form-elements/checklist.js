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

var _formik = require("formik");

var _materialElementLabel = _interopRequireDefault(require("./material-element-label"));

var _componentHeader = _interopRequireDefault(require("../form-elements/component-header"));

var _core = require("@material-ui/core");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var CheckList = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(CheckList, _React$Component);

  var _super = _createSuper(CheckList);

  function CheckList(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, CheckList);
    _this = _super.call(this, props);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "handleChange", function (data, event) {
      var fieldResult = _this.state.fieldResult;
      fieldResult.error = false;
      fieldResult.checkListOptions.map(function (option) {
        if (option.key == data.key) {
          option.isChecked = event.target.checked;
        }
      }); // this.setState(status);

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

  (0, _createClass2["default"])(CheckList, [{
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
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "SortableItem rfb-item"
      }, /*#__PURE__*/_react["default"].createElement(_componentHeader["default"], this.props), /*#__PURE__*/_react["default"].createElement("div", {
        className: "form-group"
      }, /*#__PURE__*/_react["default"].createElement(_core.FormControl, {
        required: isRequired,
        component: "fieldset"
      }, /*#__PURE__*/_react["default"].createElement(_materialElementLabel["default"], this.props), combinedList.map(function (data) {
        return /*#__PURE__*/_react["default"].createElement(_core.Grid, {
          item: true,
          xs: 12
        }, data.map(function (option) {
          return /*#__PURE__*/_react["default"].createElement(_core.FormControlLabel, {
            className: "pr-4",
            control: /*#__PURE__*/_react["default"].createElement(_core.Checkbox, {
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
}(_react["default"].Component);

var _default = CheckList;
exports["default"] = _default;
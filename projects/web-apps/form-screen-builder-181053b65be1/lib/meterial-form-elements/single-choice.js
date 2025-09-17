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

var _materialElementLabel = _interopRequireDefault(require("./material-element-label"));

var _componentHeader = _interopRequireDefault(require("../form-elements/component-header"));

var _core = require("@material-ui/core");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var Single_Choice = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(Single_Choice, _React$Component);

  var _super = _createSuper(Single_Choice);

  function Single_Choice(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, Single_Choice);
    _this = _super.call(this, props);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "handleChange", function (event, data) {
      var status = {
        value: data.key,
        error: false
      };
      var fieldResult = _this.state.fieldResult;
      fieldResult.value = status.value;
      fieldResult.error = false;

      _this.setState(status);

      _this.props.collectFieldResults(fieldResult);
    });
    _this.state = {
      value: props.result ? props.result.value : '',
      fieldResult: {
        questionId: props.data.id,
        value: '',
        error: false
      }
    };
    return _this;
  }

  (0, _createClass2["default"])(Single_Choice, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var options = this.props.data.singleChoiceOptions;
      var isRequired = this.props.data.customOptions.required;
      var combinedList = [];
      var splittedIndex = [];

      for (var i = 0; i < this.props.data.singleChoiceOptions.length; i++) {
        splittedIndex.push(this.props.data.singleChoiceOptions[i]);

        if (splittedIndex.length == this.props.data.customOptions.columns || i == this.props.data.singleChoiceOptions.length - 1) {
          combinedList.push(splittedIndex);
          splittedIndex = [];
        }
      }

      var formPreview = this.props.hasOwnProperty('isFormPreview') ? this.props.isFormPreview : false;
      var disabled = this.props.read_only || false;
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "SortableItem rfb-item"
      }, /*#__PURE__*/_react["default"].createElement(_componentHeader["default"], this.props), /*#__PURE__*/_react["default"].createElement("div", {
        className: "form-group"
      }, /*#__PURE__*/_react["default"].createElement(_core.FormControl, {
        component: "fieldset"
      }, /*#__PURE__*/_react["default"].createElement(_materialElementLabel["default"], this.props), combinedList.map(function (data) {
        return /*#__PURE__*/_react["default"].createElement(_core.RadioGroup, {
          name: "single-choice",
          required: isRequired,
          "aria-label": "Single Choice",
          row: true
        }, data.map(function (option) {
          return /*#__PURE__*/_react["default"].createElement(_core.FormControlLabel, {
            style: {
              paddingRight: "3rem"
            },
            key: option.key,
            label: option.label,
            value: option.value,
            control: /*#__PURE__*/_react["default"].createElement(_core.Radio, {
              size: "medium",
              disabled: disabled,
              onChange: function onChange(e) {
                return _this2.handleChange(e, option);
              },
              checked: _this2.state.value == option.key,
              color: "primary",
              required: isRequired
            })
          });
        }));
      }))));
    }
  }]);
  return Single_Choice;
}(_react["default"].Component);

exports["default"] = Single_Choice;
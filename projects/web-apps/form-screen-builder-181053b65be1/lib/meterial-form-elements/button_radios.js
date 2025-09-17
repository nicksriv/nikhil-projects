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

var _componentHeader = _interopRequireDefault(require("../form-elements/component-header"));

var _core = require("@material-ui/core");

var _materialElementLabel = _interopRequireDefault(require("./material-element-label"));

var _Button = _interopRequireDefault(require("@material-ui/core/Button"));

var _ButtonGroup = _interopRequireDefault(require("@material-ui/core/ButtonGroup"));

var _Tooltip = _interopRequireDefault(require("@material-ui/core/Tooltip"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var ButtonRadios = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(ButtonRadios, _React$Component);

  var _super = _createSuper(ButtonRadios);

  function ButtonRadios(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, ButtonRadios);
    _this = _super.call(this, props);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "handleOnChangeValue", function (data) {
      var status = {
        selectedValue: data.currentTarget.value,
        error: false
      };
      var fieldResult = _this.state.fieldResult;
      fieldResult.value = status.selectedValue;
      fieldResult.error = false;

      _this.setState(status);

      _this.props.collectFieldResults(fieldResult);
    });
    _this.state = {
      selectedValue: props.result ? props.result.value : '',
      fieldResult: {
        questionId: props.data.id,
        value: '',
        error: false
      }
    };
    _this.handleOnChangeValue = _this.handleOnChangeValue.bind((0, _assertThisInitialized2["default"])(_this));
    return _this;
  }

  (0, _createClass2["default"])(ButtonRadios, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var combinedList = [];
      var splittedIndex = [];

      for (var i = 0; i < this.props.data.buttonRadioOptions.length; i++) {
        splittedIndex.push(this.props.data.buttonRadioOptions[i]);

        if (splittedIndex.length == this.props.data.customOptions.columns || i == this.props.data.buttonRadioOptions.length - 1) {
          combinedList.push(splittedIndex);
          splittedIndex = [];
        }
      }

      var themeColor = 'inherit';

      if (this.props.data.customOptions.buttonThemeColor == "blue") {
        themeColor = 'blue';
      } else if (this.props.data.customOptions.buttonThemeColor == "red") {
        themeColor = 'red';
      } else if (this.props.data.customOptions.buttonThemeColor == "black") {
        themeColor = 'black';
      }

      var spacing = this.props.data.customOptions.spacing * 10;
      var inputProps = {};
      var propsData = this.props.data;
      var fieldVariant = "";

      if (this.props.globalStyles) {
        fieldVariant = !this.props.globalStyles.formDefault && propsData.hasOwnProperty("fieldVariant") ? propsData.fieldVariant : this.props.globalStyles.globalFieldVariant;
      } else {
        if (propsData.fieldVariant) fieldVariant = propsData.fieldVariant;
      }

      var formPreview = this.props.hasOwnProperty('isFormPreview') ? this.props.isFormPreview : false;
      var disabled = this.props.read_only || false;
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "SortableItem rfb-item"
      }, /*#__PURE__*/_react["default"].createElement(_componentHeader["default"], this.props), /*#__PURE__*/_react["default"].createElement("div", {
        className: "form-group"
      }, /*#__PURE__*/_react["default"].createElement(_materialElementLabel["default"], this.props), combinedList.map(function (data) {
        return /*#__PURE__*/_react["default"].createElement(_core.Grid, {
          item: true,
          spacing: 4,
          style: {
            paddingTop: spacing + 'px'
          }
        }, /*#__PURE__*/_react["default"].createElement(_ButtonGroup["default"], {
          size: "large",
          "aria-label": "outlined button group",
          disabled: disabled
        }, data.map(function (option) {
          var this_key = "preview_".concat(option.key);
          return /*#__PURE__*/_react["default"].createElement(_Tooltip["default"], {
            title: option.hoverText
          }, /*#__PURE__*/_react["default"].createElement(_Button["default"], {
            style: {
              color: _this2.state.selectedValue == option.key ? themeColor : 'grey',
              width: '150px',
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              display: 'inline-block',
              height: '38px',
              border: '1px solid #d5d5d5',
              boxShadow: '0 2px 2px rgb(0 0 0 / 10%)',
              boxSizing: 'border-box',
              textAlign: "center"
            },
            onClick: _this2.handleOnChangeValue,
            selectedValue: _this2.state.selectedValue == option.key,
            value: option.key,
            key: this_key
          }, /*#__PURE__*/_react["default"].createElement("span", {
            style: {
              display: 'block',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              padding: '0 3px',
              textTransform: "capitalize"
            }
          }, option.label)));
        })));
      })));
    }
  }]);
  return ButtonRadios;
}(_react["default"].Component);

var _default = ButtonRadios;
exports["default"] = _default;
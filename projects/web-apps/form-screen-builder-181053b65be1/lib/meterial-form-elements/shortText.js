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

var _reactInputMask = _interopRequireDefault(require("react-input-mask"));

var _materialElementLabel = _interopRequireDefault(require("./material-element-label"));

var _styles = require("@material-ui/core/styles");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var characterLimitHelperTheme = {
  marginRight: 11,
  textAlign: 'right'
};

var Short_Text = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(Short_Text, _React$Component);

  var _super = _createSuper(Short_Text);

  function Short_Text(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, Short_Text);
    _this = _super.call(this, props);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "onBlurEvent", function (e) {
      if (!e.target.value && _this.props.data.customOptions.required) {
        _this.setState({
          requiredMessage: "Please fill out mandatory field"
        });

        _this.setState({
          shortTextError: true
        });

        return;
      }

      var status = _this.validate(e);

      var fieldResult = _this.state.fieldResult;
      fieldResult.value = status.shortText;
      fieldResult.error = status.shortTextError;

      _this.setState(status);

      _this.props.collectFieldResults(fieldResult);
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "onChangeEvent", function (e) {
      console.log(e.target.value, e.target.value.length, _this.props.data.customOptions.charLimit); // if (e.target.value.length > this.props.data.customOptions.charLimit) {
      //     return
      // }

      var status = _this.validate(e);

      _this.setState({
        requiredMessage: ""
      });

      var fieldResult = _this.state.fieldResult;
      fieldResult.value = status.shortText;
      fieldResult.error = status.shortTextError;

      _this.setState(status);

      _this.props.collectFieldResults(fieldResult);
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "validate", function (e) {
      var value = e.target.value;
      var customOptions = _this.props.data.customOptions;

      if (_this.props.data.isCharLimit && !customOptions.isMasked) {
        var valueArray = value.split('');

        if (valueArray.length > _this.props.data.charLimit) {
          return {
            inputText: value,
            shortTextError: true
          };
        }
      }

      if (value !== '' && !customOptions.isMasked) {
        switch (customOptions.validation) {
          case 'Alphabetic':
            var alphabeticRegex = /^[A-Za-z ]+$/;

            if (!value.match(alphabeticRegex)) {
              return {
                shortText: value,
                shortTextError: true
              };
            }

            break;

          case 'AlphaNumeric':
            var alphaNumericRegex = /^[0-9a-zA-Z]+$/;

            if (!value.match(alphaNumericRegex)) {
              return {
                shortText: value,
                shortTextError: true
              };
            }

            break;

          case 'Currency':
            var currencyRegex = /^\$?[0-9][0-9,]*[0-9]\.?[0-9]{0,2}$/i;

            if (!value.match(currencyRegex)) {
              return {
                shortText: value,
                shortTextError: true
              };
            }

            break;
          // case 'Cyrillic':
          //     const cyrillicRegex = /[\wа-я]+/ig;
          //     if (!value.match(cyrillicRegex)) {
          //         return { shortText: value, shortTextError: true };
          //     }
          //     break;

          case 'Email':
            var emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

            if (!emailRegex.test(value)) {
              return {
                shortText: value,
                shortTextError: true
              };
            }

            break;

          case 'Numeric':
            var numericRegex = /^\d+$/;

            if (!value.match(numericRegex)) {
              return {
                shortText: value,
                shortTextError: true
              };
            }

            break;

          case 'URL':
            var urlRegex = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;

            if (!value.match(urlRegex)) {
              return {
                shortText: value,
                shortTextError: true
              };
            }

            break;

          default:
            break;
        }
      }

      return {
        shortText: value,
        shortTextError: false
      };
    });
    _this.state = {
      shortText: props.result ? props.result.value : '',
      shortTextError: false,
      helperText: '',
      data: props.data || [],
      fieldResult: {
        questionId: props.data.id,
        value: '',
        error: false
      },
      requiredMessage: ''
    };
    return _this;
  }

  (0, _createClass2["default"])(Short_Text, [{
    key: "validationMessage",
    value: function validationMessage(type) {
      switch (type) {
        case 'Alphabetic':
          return "Please enter alphabets only";
          break;

        case 'AlphaNumeric':
          return "Please enter alphanumeric characters only";
          break;

        case 'Currency':
          return "Please enter valid currency";
          break;
        // case 'Cyrillic': 
        //     break;

        case 'Email':
          return "Please enter a valid Email";
          break;

        case 'Numeric':
          return "Please enter only numeric values";
          break;

        case 'URL':
          return "Invalid URL. Please enter a Valid URL";
          break;

        default:
          break;
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var propsData = this.props.data;
      var inputProps = {};
      var shortText = this.state.shortText;
      var CHARACTER_LIMIT = propsData.isCharLimit && propsData.charLimit > 0 ? propsData.charLimit : 0;
      var inputWidth = "100%";

      if (this.props.data.inputFieldSize == 'large') {
        inputWidth = "100%";
      } else if (this.props.data.inputFieldSize == 'medium') {
        inputWidth = "50%";
      } else if (this.props.data.inputFieldSize == 'small') {
        inputWidth = "25%";
      }

      var fieldVariant = "";

      if (this.props.globalStyles) {
        fieldVariant = !this.props.globalStyles.formDefault && propsData.hasOwnProperty("fieldVariant") ? propsData.fieldVariant : this.props.globalStyles.globalFieldVariant;
      } else {
        if (propsData.fieldVariant) fieldVariant = propsData.fieldVariant;
      }

      var formatChars = {
        '#': '[0-9]',
        '@': '[A-Za-z]',
        '*': '[A-Za-z0-9]'
      };
      var validation = " (Validation: " + propsData.customOptions.validation + ")";
      var disabled = this.props.read_only;
      var selectedIcon = propsData.customOptions.selectedIcons;
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "SortableItem rfb-item"
      }, /*#__PURE__*/_react["default"].createElement(_componentHeader["default"], this.props), /*#__PURE__*/_react["default"].createElement("div", {
        className: "form-group"
      }, /*#__PURE__*/_react["default"].createElement(_reactInputMask["default"], {
        mask: propsData.customOptions.maskedValue,
        value: shortText,
        onChange: this.onChangeEvent,
        onBlur: this.onBlurEvent,
        formatChars: formatChars,
        disabled: disabled
      }, function () {
        return /*#__PURE__*/_react["default"].createElement(_core.TextField, {
          size: "small",
          style: {
            width: inputWidth
          },
          id: _this2.props.id,
          variant: fieldVariant,
          label: propsData.label,
          required: propsData.customOptions.required,
          name: "phone",
          value: shortText,
          disabled: disabled,
          onBlur: _this2.onBlurEvent,
          error: _this2.state.shortTextError || propsData.customOptions.charLimit !== "" && shortText.length > propsData.customOptions.charLimit && true,
          onChange: _this2.onChangeEvent // helperText={validation}
          ,
          inputProps: {
            type: 'text' // maxlength: 250

          },
          InputLabelProps: {
            shrink: true,
            classes: {
              asterisk: 'text-error'
            }
          },
          placeholder: propsData.label // helperText={`${shortText.length} / 250`}
          ,
          helperText: /*#__PURE__*/_react["default"].createElement("div", {
            style: {
              display: "flex",
              justifyContent: "space-between"
            }
          }, /*#__PURE__*/_react["default"].createElement("p", {
            style: {
              margin: "0",
              textAlign: 'left'
            }
          }, _this2.state.requiredMessage && _this2.state.shortTextError && propsData.customOptions.required ? _this2.state.requiredMessage : _this2.state.shortTextError ? _this2.validationMessage(propsData.customOptions.validation) : validation), propsData.customOptions.charLimit > 0 && shortText.length > propsData.customOptions.charLimit && (propsData.customOptions.validation === "Alphabetic" || propsData.customOptions.validation === "AlphaNumeric" || propsData.customOptions.validation === "Numeric") ? /*#__PURE__*/_react["default"].createElement("p", {
            style: {
              margin: "0",
              textAlign: 'left'
            }
          }, "Max character limit is ".concat(propsData.customOptions.charLimit)) : propsData.customOptions.validation === "Alphabetic" || propsData.customOptions.validation === "AlphaNumeric" || propsData.customOptions.validation === "Numeric" ? /*#__PURE__*/_react["default"].createElement("p", {
            style: {
              margin: "0"
            }
          }, "".concat(shortText.length, " / ").concat(propsData.customOptions.charLimit !== "" && propsData.customOptions.charLimit)) : null),
          FormHelperTextProps: {
            style: characterLimitHelperTheme
          },
          InputProps: {
            endAdornment: /*#__PURE__*/_react["default"].createElement(_core.InputAdornment, null, /*#__PURE__*/_react["default"].createElement(_core.IconButton, {
              style: {
                padding: "0"
              }
            }, /*#__PURE__*/_react["default"].createElement(_core.Icon, null, selectedIcon)))
          }
        });
      })));
    }
  }]);
  return Short_Text;
}(_react["default"].Component);

var _default = Short_Text;
exports["default"] = _default;
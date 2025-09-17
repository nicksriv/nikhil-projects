"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CustomModal = CustomModal;
exports.EditorConvertToHTML = void 0;
exports.MUIEditor = MUIEditor;
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _muiRte = _interopRequireDefault(require("mui-rte"));
var _componentHeader = _interopRequireDefault(require("../form-elements/component-header"));
var _Modal = _interopRequireDefault(require("@material-ui/core/Modal"));
var _core = require("@material-ui/core");
var _styles = require("@material-ui/core/styles");
var _Done = _interopRequireDefault(require("@material-ui/icons/Done"));
var _reactDraftWysiwyg = require("react-draft-wysiwyg");
var _draftjsToHtml = _interopRequireDefault(require("draftjs-to-html"));
var _AspectRatioRounded = _interopRequireDefault(require("@material-ui/icons/AspectRatioRounded"));
var _materialElementLabel = _interopRequireDefault(require("./material-element-label"));
var _draftJs = require("draft-js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
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
// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
var Long_Text = /*#__PURE__*/function (_React$Component) {
  _inherits(Long_Text, _React$Component);
  var _super = _createSuper(Long_Text);
  function Long_Text(props) {
    var _this;
    _classCallCheck(this, Long_Text);
    _this = _super.call(this, props);
    _defineProperty(_assertThisInitialized(_this), "textChange", function (event) {
      var value = event.target.value;
      if (!value && _this.props.data.customOptions.required) {
        _this.setState({
          inputText: "",
          error: true,
          requiredMessage: "Please fill out mandatory field"
        });
        return;
      }
      if (_this.props.data.isCharLimit) if (value.length > _this.props.data.charLimit) return;
      _this.setState({
        requiredMessage: ""
      });
      var status = _this.validate(event);
      var fieldResult = _this.state.fieldResult;
      fieldResult.value = status.inputText;
      fieldResult.error = status.error;
      _this.setState(status);
      _this.props.collectFieldResults(fieldResult);
    });
    _defineProperty(_assertThisInitialized(_this), "fullScreen", function () {
      var isFullScreen = _this.state.isFullScreen;
      _this.setState({
        isFullScreen: !isFullScreen
      });
    });
    _defineProperty(_assertThisInitialized(_this), "validate", function (e) {
      var value = e.target.value;
      var customOptions = _this.props.data.customOptions;
      if (customOptions.required && value === '') {
        return {
          inputText: value,
          error: true
        };
      }
      if (customOptions.limitType.toLowerCase() === 'characters' && customOptions.isLimitEntry) {
        if (value.length < customOptions.min || value.length > customOptions.max) {
          return {
            inputText: value,
            error: true
          };
        }
      }
      if (customOptions.isLimitEntry && customOptions.limitType.toLowerCase() === 'words') {
        if (value.split(' ').length - 1 < customOptions.min || value.split(' ').length - 1 >= customOptions.max) {
          return {
            inputText: value,
            error: true
          };
        }
      }

      // if ( customOptions.isLimitEntry && customOptions.limitType.toLowerCase() === 'words' && value.split(' ').length  < customOptions.min || value.split(' ').length  > customOptions.max) {
      //         return { inputText: value, error: true };
      //     }
      // if ( customOptions.isLimitEntry && customOptions.limitType.toLowerCase() === 'characters' && value.length < customOptions.min || value.length > customOptions.max ){
      //         return { inputText: value, error:true};
      // } 

      if (value !== '') {
        switch (customOptions.validationType) {
          case 'Alphabetic':
            var alphabeticRegex = /^[A-Za-z ]+$/;
            if (!value.match(alphabeticRegex)) {
              return {
                inputText: value,
                error: true
              };
            }
            break;
          case 'AlphaNumeric':
            var alphaNumericRegex = /^[0-9a-zA-Z ]+$/;
            if (!value.match(alphaNumericRegex)) {
              return {
                inputText: value,
                error: true
              };
            }
            break;
          // case 'Currency':
          //     const currencyRegex = /^\$?[0-9][0-9,]*[0-9]\.?[0-9]{0,2}$/i;
          //     if (!value.match(currencyRegex)) {
          //         return { inputText: value, error: true };
          //     }
          //     break;
          // case 'Cyrillic':
          //     const cyrillicRegex = /[\wа-я]+/ig;
          //     if (!value.match(cyrillicRegex)) {
          //         return { inputText: value, error: true };
          //     }
          //     break;
          // case 'Email':
          //     const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
          //     if (!emailRegex.test(value)) {
          //         return { inputText: value, error: true };
          //     }
          //     break;
          // case 'Numeric':
          //     const numericRegex = /^\d+$/;
          //     if (!value.match(numericRegex)) {
          //         return { inputText: value, error: true };
          //     }
          //     break;
          // case 'URL':
          //     const urlRegex = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
          //     if (!value.match(urlRegex)) {
          //         return { inputText: value, error: true };
          //     }
          //     break;
          default:
            break;
        }
      }
      return {
        inputText: value,
        error: false
      };
    });
    _this.state = {
      inputText: props.result ? props.result.value : '',
      isFullScreen: false,
      error: false,
      fieldResult: {
        questionId: props.data.id,
        value: '',
        error: false
      },
      requiredMessage: ''
    };
    return _this;
  }
  _createClass(Long_Text, [{
    key: "validationMessage",
    value: function validationMessage(type) {
      switch (type) {
        case 'Alphabetic':
          return "Please enter alphabets only";
          break;
        case 'AlphaNumeric':
          return "Please enter alphanumeric characters only";
          break;
        // case 'Currency': return "Enter value in the currency format xx.xx";

        //     break;
        // case 'Cyrillic':

        //     break;
        // case 'Email': return "Please enter a valid Email";

        //     break;
        // case 'Numeric': return "Please enter only numeric values";

        //     break;
        // case 'URL': return "Invalid URL. Please enter a Valid URL"

        //     break;
        default:
          break;
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _React$createElement,
        _React$createElement2,
        _this2 = this;
      var fieldVariant = "";
      var propsData = this.props.data;
      var customOptions = this.props.data.customOptions;
      console.log(customOptions);
      var inputProps = {};
      if (this.props.globalStyles) {
        fieldVariant = !this.props.globalStyles.formDefault && propsData.hasOwnProperty("fieldVariant") ? propsData.fieldVariant : this.props.globalStyles.globalFieldVariant;
      } else {
        if (propsData.fieldVariant) fieldVariant = propsData.fieldVariant;
      }
      var validation = " (Validation: " + customOptions.validationType + ")";
      var inputWidth = "100%";
      // if (this.props.data.inputFieldSize == 'large') {
      //     inputWidth = "100%";
      // } else if (this.props.data.inputFieldSize == 'medium') {
      //     inputWidth = "50%";
      // } else if (this.props.data.inputFieldSize == 'small') {
      //     inputWidth = "25%";
      // }
      var disabled = this.props.read_only || false;
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "SortableItem rfb-item"
      }, /*#__PURE__*/_react.default.createElement(_componentHeader.default, this.props), /*#__PURE__*/_react.default.createElement("div", {
        className: "form-group"
      }, customOptions.editorMode.toLowerCase() === 'plain_text' && /*#__PURE__*/_react.default.createElement(_core.TextField, (_React$createElement = {
        size: "small",
        style: {
          width: inputWidth
        },
        rows: 1,
        multiline: true,
        variant: "outlined",
        id: this.props.id,
        onBlur: this.textChange
      }, _defineProperty(_React$createElement, "variant", fieldVariant), _defineProperty(_React$createElement, "label", propsData.label), _defineProperty(_React$createElement, "inputProps", inputProps), _defineProperty(_React$createElement, "placeholder", propsData.label), _defineProperty(_React$createElement, "error", this.state.error), _defineProperty(_React$createElement, "value", this.state.inputText), _defineProperty(_React$createElement, "name", this.props.data.fieldName), _defineProperty(_React$createElement, "onChange", this.textChange), _defineProperty(_React$createElement, "required", propsData.customOptions.required), _defineProperty(_React$createElement, "disabled", disabled), _defineProperty(_React$createElement, "InputLabelProps", {
        shrink: true,
        classes: {
          asterisk: 'text-error'
        }
      }), _defineProperty(_React$createElement, "helperText", this.state.error && this.state.requiredMessage && propsData.customOptions.required ? this.state.requiredMessage : this.state.error && customOptions.isLimitEntry && customOptions.limitType.toLowerCase() === 'characters' && this.state.inputText.length < customOptions.min ? "Minimun ".concat(customOptions.limitType, " limit is ").concat(customOptions.min) : this.state.error && customOptions.isLimitEntry && customOptions.limitType.toLowerCase() === 'characters' && this.state.inputText.length > customOptions.max ? "Maximum ".concat(customOptions.limitType, " limit is ").concat(customOptions.max) : this.state.error && customOptions.isLimitEntry && customOptions.limitType.toLowerCase() === 'words' && this.state.inputText.split(' ').length - 1 < customOptions.min ? "Minimun ".concat(customOptions.limitType, " limit is ").concat(customOptions.min) : this.state.error && customOptions.isLimitEntry && customOptions.limitType.toLowerCase() === 'words' && this.state.inputText.split(' ').length - 1 >= customOptions.max ? "Maximum ".concat(customOptions.limitType, " limit is ").concat(customOptions.max) : this.state.error ? this.validationMessage(customOptions.validationType) : validation), _React$createElement)), customOptions.editorMode.toLowerCase() === 'rich_text' && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(EditorConvertToHTML, {
        required: propsData.customOptions.required
      })), customOptions.editorMode.toLowerCase() === 'full_screen' && (!this.state.isFullScreen ? /*#__PURE__*/_react.default.createElement("div", {
        style: {
          position: 'relative'
        }
      }, /*#__PURE__*/_react.default.createElement(_core.IconButton, {
        style: {
          position: 'absolute',
          right: '0',
          zIndex: '10'
        },
        onClick: this.fullScreen
      }, /*#__PURE__*/_react.default.createElement(_AspectRatioRounded.default, null)), /*#__PURE__*/_react.default.createElement(_core.TextField, (_React$createElement2 = {
        fullWidth: true,
        rows: 4,
        multiline: true,
        variant: "outlined",
        id: this.props.id
      }, _defineProperty(_React$createElement2, "variant", fieldVariant), _defineProperty(_React$createElement2, "onBlur", this.textChange), _defineProperty(_React$createElement2, "label", propsData.label), _defineProperty(_React$createElement2, "inputProps", inputProps), _defineProperty(_React$createElement2, "value", this.state.inputText), _defineProperty(_React$createElement2, "error", this.state.error), _defineProperty(_React$createElement2, "name", this.props.data.fieldName), _defineProperty(_React$createElement2, "onChange", this.textChange), _defineProperty(_React$createElement2, "placeholder", "(Full Screen) Type here.."), _defineProperty(_React$createElement2, "required", propsData.customOptions.required), _defineProperty(_React$createElement2, "helperText", this.state.error ? this.validationMessage(customOptions.validationType) : validation), _React$createElement2))) : /*#__PURE__*/_react.default.createElement(CustomModal, _extends({}, this.props, {
        fieldVariant: fieldVariant,
        propsData: propsData,
        customOptions: customOptions,
        value: this.state.inputText,
        error: this.state.error,
        onBlur: this.textChange.bind(this),
        onChange: this.textChange.bind(this),
        fullScreen: function fullScreen() {
          return _this2.fullScreen.bind(_this2);
        }
      })))));
    }
  }]);
  return Long_Text;
}(_react.default.Component);
exports.default = Long_Text;
function getModalStyle() {
  var top = 50;
  var left = 50;
  return {
    top: "".concat(top, "%"),
    left: "".concat(left, "%"),
    display: 'flex',
    flexDirection: 'column',
    transform: "translate(-".concat(top, "%, -").concat(left, "%)")
  };
}
var useStyles = (0, _styles.makeStyles)(function (theme) {
  return {
    paper: {
      position: "absolute",
      width: '90%',
      height: 'fit-content',
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(4),
      outline: "none"
    },
    closeButton: {
      padding: '5px',
      width: 'fit-content',
      marginTop: '20px',
      alignSelf: 'center'
    }
  };
});
function CustomModal(props) {
  var _React$createElement3;
  var classes = useStyles();
  var _useState = (0, _react.useState)(getModalStyle),
    _useState2 = _slicedToArray(_useState, 1),
    modalStyle = _useState2[0];
  var validation = " (Validation: " + props.customOptions.validationType + ")";
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_Modal.default, {
    "aria-labelledby": "simple-modal-title",
    "aria-describedby": "simple-modal-description",
    open: true,
    disableBackdropClick: true,
    disableEscapeKeyDown: true
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: modalStyle,
    className: classes.paper
  }, /*#__PURE__*/_react.default.createElement(_core.TextField, (_React$createElement3 = {
    fullWidth: true,
    rows: 15,
    multiline: true,
    id: props.id,
    variant: "outlined",
    value: props.value,
    error: props.error,
    name: props.data.fieldName
  }, _defineProperty(_React$createElement3, "variant", props.fieldVariant), _defineProperty(_React$createElement3, "label", props.propsData.label), _defineProperty(_React$createElement3, "inputProps", props.inputProps), _defineProperty(_React$createElement3, "onBlur", function onBlur(e) {
    return props.onBlur(e);
  }), _defineProperty(_React$createElement3, "placeholder", "(Full Screen) Type here.."), _defineProperty(_React$createElement3, "onChange", function onChange(e) {
    return props.onChange(e);
  }), _defineProperty(_React$createElement3, "required", props.propsData.customOptions.required), _defineProperty(_React$createElement3, "helperText", props.customOptions.isLimitEntry ? "Enter " + props.customOptions.limitType + " between " + props.customOptions.min + " and " + props.customOptions.max + validation : "" + validation), _defineProperty(_React$createElement3, "rowsMax", 22), _React$createElement3)), /*#__PURE__*/_react.default.createElement(_core.Button, {
    variant: "contained",
    color: "primary",
    onClick: props.fullScreen(),
    className: classes.closeButton
  }, "Close"))));
}
var toolbar = {
  options: ['inline', 'list', 'textAlign', 'fontSize', 'link', 'history'],
  inline: {
    inDropdown: false,
    className: undefined,
    options: ['bold', 'italic', 'underline', 'superscript', 'subscript']
  }
};
var EditorConvertToHTML = /*#__PURE__*/function (_React$Component2) {
  _inherits(EditorConvertToHTML, _React$Component2);
  var _super2 = _createSuper(EditorConvertToHTML);
  function EditorConvertToHTML(props) {
    var _this3;
    _classCallCheck(this, EditorConvertToHTML);
    _this3 = _super2.call(this, props);
    _this3.state = {
      content: ''
    };
    return _this3;
  }
  _createClass(EditorConvertToHTML, [{
    key: "convertFromHTML",
    value: function convertFromHTML(content) {
      var newContent = (0, _draftJs.convertFromHTML)(content);
      if (!newContent.contentBlocks || !newContent.contentBlocks.length) {
        // to prevent crash when no contents in editor
        return _draftJs.EditorState.createEmpty();
      }
      var contentState = _draftJs.ContentState.createFromBlockArray(newContent);
      return _draftJs.EditorState.createWithContent(contentState);
    }
  }, {
    key: "onEditorStateChange",
    value: function onEditorStateChange(index, property, editorContent) {
      var html = (0, _draftjsToHtml.default)((0, _draftJs.convertToRaw)(editorContent.getCurrentContent())).replace(/<p>/g, '').replace(/<\/p>/g, '').replace(/&nbsp;/g, ' ').replace(/(?:\r\n|\r|\n)/g, ' ');
      this.setState({
        content: html
      });
    }
  }, {
    key: "render",
    value: function render() {
      var editorState = this.convertFromHTML(this.state.content);
      return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_reactDraftWysiwyg.Editor, {
        toolbar: toolbar,
        placeholder: "Type here..",
        toolbarClassName: "toolbarClassName",
        wrapperClassName: "wrapperClassName",
        editorClassName: "editorClassName",
        defaultEditorState: editorState,
        onEditorStateChange: this.onEditorStateChange.bind(this, 0, 'content'),
        stripPastedStyles: true
      }));
    }
  }]);
  return EditorConvertToHTML;
}(_react.default.Component); // NOT USING THE MUI EDITOR
exports.EditorConvertToHTML = EditorConvertToHTML;
var defaultTheme = (0, _styles.createMuiTheme)();
Object.assign(defaultTheme, {
  overrides: {
    MUIRichTextEditor: {
      root: {
        marginTop: 20,
        width: "80%"
      },
      editor: {
        borderBottom: "1px solid gray"
      }
    }
  }
});
var MyBlock = function MyBlock(props) {
  return /*#__PURE__*/_react.default.createElement("div", {
    style: {
      padding: 10,
      backgroundColor: "#ebebeb"
    }
  }, "My Block content is:", props.children);
};
function MUIEditor() {
  return /*#__PURE__*/_react.default.createElement("div", {
    style: {
      paddingTop: '0px',
      paddingBottom: '50px',
      paddingLeft: '10px',
      border: '1px solid #cecece',
      borderRadius: '5px'
    }
  }, /*#__PURE__*/_react.default.createElement(_styles.MuiThemeProvider, {
    theme: defaultTheme
  }, /*#__PURE__*/_react.default.createElement(_muiRte.default, {
    controls: ["my-callback"],
    customControls: [{
      name: "my-callback",
      icon: /*#__PURE__*/_react.default.createElement(_Done.default, null),
      type: "callback",
      onClick: function onClick(editorState, name, anchor) {
        // console.log(`Clicked ${name} control`)
        return _draftJs.EditorState.createEmpty();
      }
    }]
  })));
}
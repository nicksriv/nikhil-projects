"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CustomModal = CustomModal;
exports.MUIEditor = MUIEditor;
exports.EditorConvertToHTML = exports["default"] = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

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

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
var Long_Text = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(Long_Text, _React$Component);

  var _super = _createSuper(Long_Text);

  function Long_Text(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, Long_Text);
    _this = _super.call(this, props);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "textChange", function (event) {
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
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "fullScreen", function () {
      var isFullScreen = _this.state.isFullScreen;

      _this.setState({
        isFullScreen: !isFullScreen
      });
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "validate", function (e) {
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
      } // if ( customOptions.isLimitEntry && customOptions.limitType.toLowerCase() === 'words' && value.split(' ').length  < customOptions.min || value.split(' ').length  > customOptions.max) {
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

  (0, _createClass2["default"])(Long_Text, [{
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
      var inputWidth = "100%"; // if (this.props.data.inputFieldSize == 'large') {
      //     inputWidth = "100%";
      // } else if (this.props.data.inputFieldSize == 'medium') {
      //     inputWidth = "50%";
      // } else if (this.props.data.inputFieldSize == 'small') {
      //     inputWidth = "25%";
      // }

      var disabled = this.props.read_only || false;
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "SortableItem rfb-item"
      }, /*#__PURE__*/_react["default"].createElement(_componentHeader["default"], this.props), /*#__PURE__*/_react["default"].createElement("div", {
        className: "form-group"
      }, customOptions.editorMode.toLowerCase() === 'plain_text' && /*#__PURE__*/_react["default"].createElement(_core.TextField, (_React$createElement = {
        size: "small",
        style: {
          width: inputWidth
        },
        rows: 1,
        multiline: true,
        variant: "outlined",
        id: this.props.id,
        onBlur: this.textChange
      }, (0, _defineProperty2["default"])(_React$createElement, "variant", fieldVariant), (0, _defineProperty2["default"])(_React$createElement, "label", propsData.label), (0, _defineProperty2["default"])(_React$createElement, "inputProps", inputProps), (0, _defineProperty2["default"])(_React$createElement, "placeholder", propsData.label), (0, _defineProperty2["default"])(_React$createElement, "error", this.state.error), (0, _defineProperty2["default"])(_React$createElement, "value", this.state.inputText), (0, _defineProperty2["default"])(_React$createElement, "name", this.props.data.fieldName), (0, _defineProperty2["default"])(_React$createElement, "onChange", this.textChange), (0, _defineProperty2["default"])(_React$createElement, "required", propsData.customOptions.required), (0, _defineProperty2["default"])(_React$createElement, "disabled", disabled), (0, _defineProperty2["default"])(_React$createElement, "InputLabelProps", {
        shrink: true,
        classes: {
          asterisk: 'text-error'
        }
      }), (0, _defineProperty2["default"])(_React$createElement, "helperText", this.state.error && this.state.requiredMessage && propsData.customOptions.required ? this.state.requiredMessage : this.state.error && customOptions.isLimitEntry && customOptions.limitType.toLowerCase() === 'characters' && this.state.inputText.length < customOptions.min ? "Minimun ".concat(customOptions.limitType, " limit is ").concat(customOptions.min) : this.state.error && customOptions.isLimitEntry && customOptions.limitType.toLowerCase() === 'characters' && this.state.inputText.length > customOptions.max ? "Maximum ".concat(customOptions.limitType, " limit is ").concat(customOptions.max) : this.state.error && customOptions.isLimitEntry && customOptions.limitType.toLowerCase() === 'words' && this.state.inputText.split(' ').length - 1 < customOptions.min ? "Minimun ".concat(customOptions.limitType, " limit is ").concat(customOptions.min) : this.state.error && customOptions.isLimitEntry && customOptions.limitType.toLowerCase() === 'words' && this.state.inputText.split(' ').length - 1 >= customOptions.max ? "Maximum ".concat(customOptions.limitType, " limit is ").concat(customOptions.max) : this.state.error ? this.validationMessage(customOptions.validationType) : validation), _React$createElement)), customOptions.editorMode.toLowerCase() === 'rich_text' && /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(EditorConvertToHTML, {
        required: propsData.customOptions.required
      })), customOptions.editorMode.toLowerCase() === 'full_screen' && (!this.state.isFullScreen ? /*#__PURE__*/_react["default"].createElement("div", {
        style: {
          position: 'relative'
        }
      }, /*#__PURE__*/_react["default"].createElement(_core.IconButton, {
        style: {
          position: 'absolute',
          right: '0',
          zIndex: '10'
        },
        onClick: this.fullScreen
      }, /*#__PURE__*/_react["default"].createElement(_AspectRatioRounded["default"], null)), /*#__PURE__*/_react["default"].createElement(_core.TextField, (_React$createElement2 = {
        fullWidth: true,
        rows: 4,
        multiline: true,
        variant: "outlined",
        id: this.props.id
      }, (0, _defineProperty2["default"])(_React$createElement2, "variant", fieldVariant), (0, _defineProperty2["default"])(_React$createElement2, "onBlur", this.textChange), (0, _defineProperty2["default"])(_React$createElement2, "label", propsData.label), (0, _defineProperty2["default"])(_React$createElement2, "inputProps", inputProps), (0, _defineProperty2["default"])(_React$createElement2, "value", this.state.inputText), (0, _defineProperty2["default"])(_React$createElement2, "error", this.state.error), (0, _defineProperty2["default"])(_React$createElement2, "name", this.props.data.fieldName), (0, _defineProperty2["default"])(_React$createElement2, "onChange", this.textChange), (0, _defineProperty2["default"])(_React$createElement2, "placeholder", "(Full Screen) Type here.."), (0, _defineProperty2["default"])(_React$createElement2, "required", propsData.customOptions.required), (0, _defineProperty2["default"])(_React$createElement2, "helperText", this.state.error ? this.validationMessage(customOptions.validationType) : validation), _React$createElement2))) : /*#__PURE__*/_react["default"].createElement(CustomModal, (0, _extends2["default"])({}, this.props, {
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
}(_react["default"].Component);

exports["default"] = Long_Text;

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
      _useState2 = (0, _slicedToArray2["default"])(_useState, 1),
      modalStyle = _useState2[0];

  var validation = " (Validation: " + props.customOptions.validationType + ")";
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_Modal["default"], {
    "aria-labelledby": "simple-modal-title",
    "aria-describedby": "simple-modal-description",
    open: true,
    disableBackdropClick: true,
    disableEscapeKeyDown: true
  }, /*#__PURE__*/_react["default"].createElement("div", {
    style: modalStyle,
    className: classes.paper
  }, /*#__PURE__*/_react["default"].createElement(_core.TextField, (_React$createElement3 = {
    fullWidth: true,
    rows: 15,
    multiline: true,
    id: props.id,
    variant: "outlined",
    value: props.value,
    error: props.error,
    name: props.data.fieldName
  }, (0, _defineProperty2["default"])(_React$createElement3, "variant", props.fieldVariant), (0, _defineProperty2["default"])(_React$createElement3, "label", props.propsData.label), (0, _defineProperty2["default"])(_React$createElement3, "inputProps", props.inputProps), (0, _defineProperty2["default"])(_React$createElement3, "onBlur", function onBlur(e) {
    return props.onBlur(e);
  }), (0, _defineProperty2["default"])(_React$createElement3, "placeholder", "(Full Screen) Type here.."), (0, _defineProperty2["default"])(_React$createElement3, "onChange", function onChange(e) {
    return props.onChange(e);
  }), (0, _defineProperty2["default"])(_React$createElement3, "required", props.propsData.customOptions.required), (0, _defineProperty2["default"])(_React$createElement3, "helperText", props.customOptions.isLimitEntry ? "Enter " + props.customOptions.limitType + " between " + props.customOptions.min + " and " + props.customOptions.max + validation : "" + validation), (0, _defineProperty2["default"])(_React$createElement3, "rowsMax", 22), _React$createElement3)), /*#__PURE__*/_react["default"].createElement(_core.Button, {
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
  (0, _inherits2["default"])(EditorConvertToHTML, _React$Component2);

  var _super2 = _createSuper(EditorConvertToHTML);

  function EditorConvertToHTML(props) {
    var _this3;

    (0, _classCallCheck2["default"])(this, EditorConvertToHTML);
    _this3 = _super2.call(this, props);
    _this3.state = {
      content: ''
    };
    return _this3;
  }

  (0, _createClass2["default"])(EditorConvertToHTML, [{
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
      var html = (0, _draftjsToHtml["default"])((0, _draftJs.convertToRaw)(editorContent.getCurrentContent())).replace(/<p>/g, '').replace(/<\/p>/g, '').replace(/&nbsp;/g, ' ').replace(/(?:\r\n|\r|\n)/g, ' ');
      this.setState({
        content: html
      });
    }
  }, {
    key: "render",
    value: function render() {
      var editorState = this.convertFromHTML(this.state.content);
      return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(_reactDraftWysiwyg.Editor, {
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
}(_react["default"].Component); // NOT USING THE MUI EDITOR


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
  return /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      padding: 10,
      backgroundColor: "#ebebeb"
    }
  }, "My Block content is:", props.children);
};

function MUIEditor() {
  return /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      paddingTop: '0px',
      paddingBottom: '50px',
      paddingLeft: '10px',
      border: '1px solid #cecece',
      borderRadius: '5px'
    }
  }, /*#__PURE__*/_react["default"].createElement(_styles.MuiThemeProvider, {
    theme: defaultTheme
  }, /*#__PURE__*/_react["default"].createElement(_muiRte["default"], {
    controls: ["my-callback"],
    customControls: [{
      name: "my-callback",
      icon: /*#__PURE__*/_react["default"].createElement(_Done["default"], null),
      type: "callback",
      onClick: function onClick(editorState, name, anchor) {
        // console.log(`Clicked ${name} control`)
        return _draftJs.EditorState.createEmpty();
      }
    }]
  })));
}
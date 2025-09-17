"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommentsModal = CommentsModal;
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _componentHeader = _interopRequireDefault(require("../form-elements/component-header"));
var _core = require("@material-ui/core");
var _ImageRounded = _interopRequireDefault(require("@material-ui/icons/ImageRounded"));
var _modal = _interopRequireDefault(require("./modal"));
var _materialElementLabel = _interopRequireDefault(require("./material-element-label"));
var _CreateRounded = _interopRequireDefault(require("@material-ui/icons/CreateRounded"));
var _CheckRounded = _interopRequireDefault(require("@material-ui/icons/CheckRounded"));
var _Modal = _interopRequireDefault(require("@material-ui/core/Modal"));
var _styles = require("@material-ui/core/styles");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
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
var IS_PREAVAIL = "isPreAvail";
var IS_POSTAVAIL = "isPostAvail";
var IS_PHOTOAVAIL = "isPhotoAvail";
var IS_360AVAIL = "is360Avail";
var IS_BARCODEAVAIL = "isBarcodeAvail";
var IS_PREPHOTOUPLOAD = "isPrePhotoUpload";
var IS_POSTPHOTOUPLOAD = "isPostPhotoUpload";
var IS_PHOTOUPLOAD = "isPhotoUpload";
var IS_360PHOTOUPLOAD = "is360PhotoUpload";
var Photo_PrePost = /*#__PURE__*/function (_React$Component) {
  _inherits(Photo_PrePost, _React$Component);
  var _super = _createSuper(Photo_PrePost);
  function Photo_PrePost(props) {
    var _this;
    _classCallCheck(this, Photo_PrePost);
    _this = _super.call(this, props);
    _defineProperty(_assertThisInitialized(_this), "textChange", function (event) {
      var value = event.target.value;
      var state = _this.state;
      if (_this.props.data.customOptions.isCommentsAvail) {
        state.isCommentsEditMode = true;
      }
      state.commentText = value;
      _this.setState(state);
    });
    _defineProperty(_assertThisInitialized(_this), "handleImageUpload", function (clickSource, e) {
      var self = _assertThisInitialized(_this);
      var target = e.target;
      var file;
      var reader;
      if (target.files && target.files.length) {
        file = target.files[0];
        reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function () {
          _this.saveUploadImageSrc(clickSource, reader.result);
        };
      }
    });
    _defineProperty(_assertThisInitialized(_this), "saveUploadImageSrc", function (clickSource, imageSrc) {
      console.log(clickSource);
      switch (clickSource) {
        case IS_PREPHOTOUPLOAD:
          var isPrePhotoUpload = _this.state.isPrePhotoUpload;
          isPrePhotoUpload = imageSrc;
          _this.setState({
            isPrePhotoUpload: isPrePhotoUpload
          });
          return;
        case IS_POSTPHOTOUPLOAD:
          var isPostPhotoUpload = _this.state.isPostPhotoUpload;
          isPostPhotoUpload = imageSrc;
          _this.setState({
            isPostPhotoUpload: isPostPhotoUpload
          });
          return;
        case IS_PHOTOUPLOAD:
          var isPhotoUpload = _this.state.isPhotoUpload;
          isPhotoUpload = imageSrc;
          _this.setState({
            isPhotoUpload: isPhotoUpload
          });
          return;
        case IS_360PHOTOUPLOAD:
          var is360PhotoUpload = _this.state.is360PhotoUpload;
          is360PhotoUpload = imageSrc;
          _this.setState({
            is360PhotoUpload: is360PhotoUpload
          });
          return;
      }
    });
    _defineProperty(_assertThisInitialized(_this), "saveCaptureImageSrc", function (modalSource, imageSrc) {
      console.log(modalSource);
      switch (modalSource) {
        case IS_PREAVAIL:
          var isPreAvail = _this.state.isPreAvail;
          isPreAvail = imageSrc;
          _this.setState({
            isPreAvail: isPreAvail
          });
          return;
        case IS_POSTAVAIL:
          var isPostAvail = _this.state.isPostAvail;
          isPostAvail = imageSrc;
          _this.setState({
            isPostAvail: isPostAvail
          });
          return;
        case IS_PHOTOAVAIL:
          var isPhotoAvail = _this.state.isPhotoAvail;
          isPhotoAvail = imageSrc;
          _this.setState({
            isPhotoAvail: isPhotoAvail
          });
          return;
        case IS_360AVAIL:
          var is360Avail = _this.state.is360Avail;
          is360Avail = imageSrc;
          _this.setState({
            is360Avail: is360Avail
          });
          return;
        case IS_BARCODEAVAIL:
          var isBarcodeAvail = _this.state.isBarcodeAvail;
          isBarcodeAvail = imageSrc;
          _this.setState({
            isBarcodeAvail: isBarcodeAvail
          });
          return;
      }
    });
    _this.state = {
      commentText: '',
      isPreAvail: '',
      isPostAvail: '',
      isPhotoAvail: '',
      is360Avail: '',
      isBarcodeAvail: '',
      isPrePhotoUpload: '',
      isPostPhotoUpload: '',
      isPhotoUpload: '',
      is360PhotoUpload: '',
      isCommentsEditMode: false
    };
    return _this;
  }
  _createClass(Photo_PrePost, [{
    key: "enableCamera",
    value: function enableCamera(optionName) {
      console.log(optionName);
    }
  }, {
    key: "setCommentsModalFalse",
    value: function setCommentsModalFalse() {
      this.setState({
        isCommentsEditMode: false
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;
      var customOptions = this.props.data.customOptions;
      var formPreview = this.props.hasOwnProperty('isFormPreview') ? this.props.isFormPreview : false;
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "SortableItem rfb-item"
      }, /*#__PURE__*/_react.default.createElement(_componentHeader.default, this.props), /*#__PURE__*/_react.default.createElement("div", {
        className: "form-group "
      }, /*#__PURE__*/_react.default.createElement(_materialElementLabel.default, this.props), /*#__PURE__*/_react.default.createElement(_core.Grid, {
        container: true,
        spacing: 1,
        className: "material-element-container"
      }, /*#__PURE__*/_react.default.createElement(_core.Grid, {
        item: true,
        xs: 12,
        sm: 4,
        className: "vertical-middle"
      }, /*#__PURE__*/_react.default.createElement(_core.Typography, {
        component: "span"
      }, "Pre Photo")), /*#__PURE__*/_react.default.createElement(_core.Grid, {
        item: true,
        xs: 12,
        sm: 8
      }, /*#__PURE__*/_react.default.createElement(_modal.default, {
        modalSource: IS_PREAVAIL,
        isDisable: !customOptions.isPreAvail,
        customOptions: customOptions,
        saveImageSrc: function saveImageSrc(modalSource, src) {
          return _this2.saveCaptureImageSrc(modalSource, src);
        }
      }), /*#__PURE__*/_react.default.createElement("input", {
        accept: "image/*",
        style: {
          display: 'none'
        },
        id: "is-pre-photo-upload",
        multiple: true,
        type: "file",
        onChange: this.handleImageUpload.bind(this, IS_PREPHOTOUPLOAD)
      }), /*#__PURE__*/_react.default.createElement("label", {
        style: {
          pointerEvents: !customOptions.isPrePhotoUpload ? 'none' : 'visible'
        },
        htmlFor: "is-pre-photo-upload"
      }, /*#__PURE__*/_react.default.createElement(_core.IconButton, {
        "aria-label": "Desktop View",
        component: "span",
        disabled: !customOptions.isPrePhotoUpload
      }, /*#__PURE__*/_react.default.createElement(_ImageRounded.default, null)))), (this.state.isPreAvail !== '' || this.state.isPrePhotoUpload !== '') && /*#__PURE__*/_react.default.createElement(_core.Grid, {
        item: true,
        xs: 12
      }, this.state.isPreAvail !== '' && /*#__PURE__*/_react.default.createElement("img", {
        src: this.state.isPreAvail,
        height: "100",
        style: {
          marginRight: '20px'
        },
        className: "image-upload-preview"
      }), this.state.isPrePhotoUpload !== '' && /*#__PURE__*/_react.default.createElement("img", {
        src: this.state.isPrePhotoUpload,
        height: "100",
        className: "image-upload-preview"
      })), /*#__PURE__*/_react.default.createElement(_core.Grid, {
        item: true,
        xs: 12,
        sm: 4,
        className: "vertical-middle"
      }, /*#__PURE__*/_react.default.createElement(_core.Typography, {
        component: "span"
      }, "Post Photo")), /*#__PURE__*/_react.default.createElement(_core.Grid, {
        item: true,
        xs: 12,
        sm: 8
      }, /*#__PURE__*/_react.default.createElement(_modal.default, {
        modalSource: IS_POSTAVAIL,
        isDisable: !customOptions.isPostAvail,
        customOptions: customOptions,
        saveImageSrc: function saveImageSrc(modalSource, src) {
          return _this2.saveCaptureImageSrc(modalSource, src);
        }
      }), /*#__PURE__*/_react.default.createElement("input", {
        accept: "image/*",
        style: {
          display: 'none'
        },
        id: "is-post-photo-upload",
        multiple: true,
        type: "file",
        onChange: this.handleImageUpload.bind(this, IS_POSTPHOTOUPLOAD)
      }), /*#__PURE__*/_react.default.createElement("label", {
        style: {
          pointerEvents: !customOptions.isPostPhotoUpload ? 'none' : 'visible'
        },
        htmlFor: "is-post-photo-upload"
      }, /*#__PURE__*/_react.default.createElement(_core.IconButton, {
        "aria-label": "Desktop View",
        component: "span",
        disabled: !customOptions.isPostPhotoUpload
      }, /*#__PURE__*/_react.default.createElement(_ImageRounded.default, null)))), (this.state.isPostAvail !== '' || this.state.isPostPhotoUpload !== '') && /*#__PURE__*/_react.default.createElement(_core.Grid, {
        item: true,
        xs: 12
      }, this.state.isPostAvail !== '' && /*#__PURE__*/_react.default.createElement("img", {
        src: this.state.isPostAvail,
        height: "100",
        style: {
          marginRight: '20px'
        },
        className: "image-upload-preview"
      }), this.state.isPostPhotoUpload !== '' && /*#__PURE__*/_react.default.createElement("img", {
        src: this.state.isPostPhotoUpload,
        height: "100",
        className: "image-upload-preview"
      })), /*#__PURE__*/_react.default.createElement(_core.Grid, {
        item: true,
        xs: 12,
        sm: 4,
        className: "vertical-middle"
      }, /*#__PURE__*/_react.default.createElement(_core.Typography, {
        component: "span"
      }, "Photo")), /*#__PURE__*/_react.default.createElement(_core.Grid, {
        item: true,
        xs: 12,
        sm: 8
      }, /*#__PURE__*/_react.default.createElement(_modal.default, {
        modalSource: IS_PHOTOAVAIL,
        isDisable: !customOptions.isPhotoAvail,
        customOptions: customOptions,
        saveImageSrc: function saveImageSrc(modalSource, src) {
          return _this2.saveCaptureImageSrc(modalSource, src);
        }
      }), /*#__PURE__*/_react.default.createElement("input", {
        accept: "image/*",
        style: {
          display: 'none'
        },
        id: "is-photo-upload",
        multiple: true,
        type: "file",
        onChange: this.handleImageUpload.bind(this, IS_PHOTOUPLOAD)
      }), /*#__PURE__*/_react.default.createElement("label", {
        style: {
          pointerEvents: !customOptions.isPhotoUpload ? 'none' : 'visible'
        },
        htmlFor: "is-photo-upload"
      }, /*#__PURE__*/_react.default.createElement(_core.IconButton, {
        "aria-label": "Desktop View",
        component: "span",
        disabled: !customOptions.isPhotoUpload
      }, /*#__PURE__*/_react.default.createElement(_ImageRounded.default, null)))), (this.state.isPhotoAvail !== '' || this.state.isPhotoUpload !== '') && /*#__PURE__*/_react.default.createElement(_core.Grid, {
        item: true,
        xs: 12
      }, this.state.isPhotoAvail !== '' && /*#__PURE__*/_react.default.createElement("img", {
        src: this.state.isPhotoAvail,
        height: "100",
        style: {
          marginRight: '20px'
        },
        className: "image-upload-preview"
      }), this.state.isPhotoUpload !== '' && /*#__PURE__*/_react.default.createElement("img", {
        src: this.state.isPhotoUpload,
        height: "100",
        className: "image-upload-preview"
      })), /*#__PURE__*/_react.default.createElement(_core.Grid, {
        item: true,
        xs: 12,
        sm: 4,
        className: "vertical-middle"
      }, /*#__PURE__*/_react.default.createElement(_core.Typography, {
        component: "span"
      }, "360 Photo")), /*#__PURE__*/_react.default.createElement(_core.Grid, {
        item: true,
        xs: 12,
        sm: 8
      }, /*#__PURE__*/_react.default.createElement(_modal.default, {
        modalSource: IS_360AVAIL,
        isDisable: !customOptions.is360Avail,
        customOptions: customOptions,
        saveImageSrc: function saveImageSrc(modalSource, src) {
          return _this2.saveCaptureImageSrc(modalSource, src);
        }
      }), /*#__PURE__*/_react.default.createElement("input", {
        accept: "image/*",
        style: {
          display: 'none'
        },
        id: "is-360-photo-upload",
        multiple: true,
        type: "file",
        onChange: this.handleImageUpload.bind(this, IS_360PHOTOUPLOAD)
      }), /*#__PURE__*/_react.default.createElement("label", {
        style: {
          pointerEvents: !customOptions.is360PhotoUpload ? 'none' : 'visible'
        },
        htmlFor: "is-360-photo-upload"
      }, /*#__PURE__*/_react.default.createElement(_core.IconButton, {
        "aria-label": "Desktop View",
        component: "span",
        disabled: !customOptions.is360PhotoUpload
      }, /*#__PURE__*/_react.default.createElement(_ImageRounded.default, null)))), (this.state.is360Avail !== '' || this.state.is360PhotoUpload !== '') && /*#__PURE__*/_react.default.createElement(_core.Grid, {
        item: true,
        xs: 12
      }, this.state.is360Avail !== '' && /*#__PURE__*/_react.default.createElement("img", {
        src: this.state.is360Avail,
        height: "100",
        style: {
          marginRight: '20px'
        },
        className: "image-upload-preview"
      }), this.state.is360PhotoUpload !== '' && /*#__PURE__*/_react.default.createElement("img", {
        src: this.state.is360PhotoUpload,
        height: "100",
        className: "image-upload-preview"
      })), /*#__PURE__*/_react.default.createElement(_core.Grid, {
        item: true,
        xs: 12,
        sm: 4,
        className: "vertical-middle"
      }, /*#__PURE__*/_react.default.createElement(_core.Typography, {
        component: "span"
      }, "Barcode")), /*#__PURE__*/_react.default.createElement(_core.Grid, {
        item: true,
        xs: 12,
        sm: 8
      }, /*#__PURE__*/_react.default.createElement(_modal.default, {
        modalSource: IS_BARCODEAVAIL,
        isDisable: !customOptions.isBarcodeAvail,
        customOptions: customOptions,
        saveImageSrc: function saveImageSrc(modalSource, src) {
          return _this2.saveCaptureImageSrc(modalSource, src);
        }
      })), this.state.isBarcodeAvail !== '' && /*#__PURE__*/_react.default.createElement(_core.Grid, {
        item: true,
        xs: 12
      }, this.state.isBarcodeAvail !== '' && /*#__PURE__*/_react.default.createElement(_core.Typography, {
        component: "h6"
      }, "Barcode Data: ", this.state.isBarcodeAvail)), /*#__PURE__*/_react.default.createElement(_core.Grid, {
        item: true,
        xs: 12,
        sm: 12
      }), /*#__PURE__*/_react.default.createElement(_core.Grid, {
        item: true,
        xs: 12
      }, /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_core.Typography, {
        variant: "subtitle2",
        component: "span"
      }, "Comments: "), !this.state.isCommentsEditMode && customOptions.isCommentPopAvail && /*#__PURE__*/_react.default.createElement(_core.IconButton, {
        onClick: function onClick() {
          return _this2.setState({
            isCommentsEditMode: true
          });
        }
      }, /*#__PURE__*/_react.default.createElement(_CreateRounded.default, {
        fontSize: "small"
      })))), customOptions.isCommentsAvail ? /*#__PURE__*/_react.default.createElement(_core.Grid, {
        item: true,
        xs: 12,
        sm: 8
      }, /*#__PURE__*/_react.default.createElement(_core.TextField, {
        size: "small",
        variant: "outlined",
        name: "isCommentsAvail",
        value: this.state.commentText
        // onEnter={()=>this.setState({isCommentsEditMode: false})}
        ,
        onChange: this.textChange.bind(this)
      }), this.state.isCommentsEditMode && /*#__PURE__*/_react.default.createElement(_core.IconButton, {
        onClick: function onClick() {
          return _this2.setState({
            isCommentsEditMode: false
          });
        }
      }, /*#__PURE__*/_react.default.createElement(_CheckRounded.default, {
        style: {
          color: '#2b9500'
        }
      }))) : /*#__PURE__*/_react.default.createElement(_core.Grid, {
        item: true,
        xs: 12,
        sm: 8
      }, this.state.isCommentsEditMode ? /*#__PURE__*/_react.default.createElement(CommentsModal, {
        value: this.state.commentText,
        textChange: this.textChange.bind(this),
        setCommentsEdit: this.setCommentsModalFalse.bind(this)
      }) : /*#__PURE__*/_react.default.createElement(_core.Typography, {
        component: "span",
        style: {
          fontStyle: 'italic'
        },
        onClick: function onClick() {
          return _this2.setState({
            isCommentsEditMode: true
          });
        }
      }, this.state.commentText === '' ? '-' : this.state.commentText)))));
    }
  }]);
  return Photo_PrePost;
}(_react.default.Component);
exports.default = Photo_PrePost;
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
      width: 300,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(4),
      outline: "none"
    },
    SaveCommentsBtn: {
      marginTop: '10px',
      width: 'fit-content',
      alignSelf: 'center'
    }
  };
});
function CommentsModal(props) {
  var classes = useStyles();
  var _useState = (0, _react.useState)(getModalStyle),
    _useState2 = _slicedToArray(_useState, 1),
    modalStyle = _useState2[0];
  return /*#__PURE__*/_react.default.createElement(_Modal.default, {
    "aria-labelledby": "simple-modal-title",
    "aria-describedby": "simple-modal-description",
    open: true
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: modalStyle,
    className: classes.paper
  }, /*#__PURE__*/_react.default.createElement(_core.TextField, {
    size: "small",
    variant: "outlined",
    label: "Comments",
    name: "isCommentsAvail",
    value: props.value,
    onChange: function onChange(e) {
      return props.textChange(e);
    }
  }), /*#__PURE__*/_react.default.createElement(_core.Button, {
    color: "primary",
    variant: "contained",
    className: classes.SaveCommentsBtn,
    onClick: function onClick() {
      return props.setCommentsEdit();
    }
  }, "Save")));
}
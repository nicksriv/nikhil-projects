"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommentsModal = CommentsModal;
exports["default"] = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

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

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

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
  (0, _inherits2["default"])(Photo_PrePost, _React$Component);

  var _super = _createSuper(Photo_PrePost);

  function Photo_PrePost(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, Photo_PrePost);
    _this = _super.call(this, props);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "textChange", function (event) {
      var value = event.target.value;
      var state = _this.state;

      if (_this.props.data.customOptions.isCommentsAvail) {
        state.isCommentsEditMode = true;
      }

      state.commentText = value;

      _this.setState(state);
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "handleImageUpload", function (clickSource, e) {
      var self = (0, _assertThisInitialized2["default"])(_this);
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
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "saveUploadImageSrc", function (clickSource, imageSrc) {
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
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "saveCaptureImageSrc", function (modalSource, imageSrc) {
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

  (0, _createClass2["default"])(Photo_PrePost, [{
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
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "SortableItem rfb-item"
      }, /*#__PURE__*/_react["default"].createElement(_componentHeader["default"], this.props), /*#__PURE__*/_react["default"].createElement("div", {
        className: "form-group "
      }, /*#__PURE__*/_react["default"].createElement(_materialElementLabel["default"], this.props), /*#__PURE__*/_react["default"].createElement(_core.Grid, {
        container: true,
        spacing: 1,
        className: "material-element-container"
      }, /*#__PURE__*/_react["default"].createElement(_core.Grid, {
        item: true,
        xs: 12,
        sm: 4,
        className: "vertical-middle"
      }, /*#__PURE__*/_react["default"].createElement(_core.Typography, {
        component: "span"
      }, "Pre Photo")), /*#__PURE__*/_react["default"].createElement(_core.Grid, {
        item: true,
        xs: 12,
        sm: 8
      }, /*#__PURE__*/_react["default"].createElement(_modal["default"], {
        modalSource: IS_PREAVAIL,
        isDisable: !customOptions.isPreAvail,
        customOptions: customOptions,
        saveImageSrc: function saveImageSrc(modalSource, src) {
          return _this2.saveCaptureImageSrc(modalSource, src);
        }
      }), /*#__PURE__*/_react["default"].createElement("input", {
        accept: "image/*",
        style: {
          display: 'none'
        },
        id: "is-pre-photo-upload",
        multiple: true,
        type: "file",
        onChange: this.handleImageUpload.bind(this, IS_PREPHOTOUPLOAD)
      }), /*#__PURE__*/_react["default"].createElement("label", {
        style: {
          pointerEvents: !customOptions.isPrePhotoUpload ? 'none' : 'visible'
        },
        htmlFor: "is-pre-photo-upload"
      }, /*#__PURE__*/_react["default"].createElement(_core.IconButton, {
        "aria-label": "Desktop View",
        component: "span",
        disabled: !customOptions.isPrePhotoUpload
      }, /*#__PURE__*/_react["default"].createElement(_ImageRounded["default"], null)))), (this.state.isPreAvail !== '' || this.state.isPrePhotoUpload !== '') && /*#__PURE__*/_react["default"].createElement(_core.Grid, {
        item: true,
        xs: 12
      }, this.state.isPreAvail !== '' && /*#__PURE__*/_react["default"].createElement("img", {
        src: this.state.isPreAvail,
        height: "100",
        style: {
          marginRight: '20px'
        },
        className: "image-upload-preview"
      }), this.state.isPrePhotoUpload !== '' && /*#__PURE__*/_react["default"].createElement("img", {
        src: this.state.isPrePhotoUpload,
        height: "100",
        className: "image-upload-preview"
      })), /*#__PURE__*/_react["default"].createElement(_core.Grid, {
        item: true,
        xs: 12,
        sm: 4,
        className: "vertical-middle"
      }, /*#__PURE__*/_react["default"].createElement(_core.Typography, {
        component: "span"
      }, "Post Photo")), /*#__PURE__*/_react["default"].createElement(_core.Grid, {
        item: true,
        xs: 12,
        sm: 8
      }, /*#__PURE__*/_react["default"].createElement(_modal["default"], {
        modalSource: IS_POSTAVAIL,
        isDisable: !customOptions.isPostAvail,
        customOptions: customOptions,
        saveImageSrc: function saveImageSrc(modalSource, src) {
          return _this2.saveCaptureImageSrc(modalSource, src);
        }
      }), /*#__PURE__*/_react["default"].createElement("input", {
        accept: "image/*",
        style: {
          display: 'none'
        },
        id: "is-post-photo-upload",
        multiple: true,
        type: "file",
        onChange: this.handleImageUpload.bind(this, IS_POSTPHOTOUPLOAD)
      }), /*#__PURE__*/_react["default"].createElement("label", {
        style: {
          pointerEvents: !customOptions.isPostPhotoUpload ? 'none' : 'visible'
        },
        htmlFor: "is-post-photo-upload"
      }, /*#__PURE__*/_react["default"].createElement(_core.IconButton, {
        "aria-label": "Desktop View",
        component: "span",
        disabled: !customOptions.isPostPhotoUpload
      }, /*#__PURE__*/_react["default"].createElement(_ImageRounded["default"], null)))), (this.state.isPostAvail !== '' || this.state.isPostPhotoUpload !== '') && /*#__PURE__*/_react["default"].createElement(_core.Grid, {
        item: true,
        xs: 12
      }, this.state.isPostAvail !== '' && /*#__PURE__*/_react["default"].createElement("img", {
        src: this.state.isPostAvail,
        height: "100",
        style: {
          marginRight: '20px'
        },
        className: "image-upload-preview"
      }), this.state.isPostPhotoUpload !== '' && /*#__PURE__*/_react["default"].createElement("img", {
        src: this.state.isPostPhotoUpload,
        height: "100",
        className: "image-upload-preview"
      })), /*#__PURE__*/_react["default"].createElement(_core.Grid, {
        item: true,
        xs: 12,
        sm: 4,
        className: "vertical-middle"
      }, /*#__PURE__*/_react["default"].createElement(_core.Typography, {
        component: "span"
      }, "Photo")), /*#__PURE__*/_react["default"].createElement(_core.Grid, {
        item: true,
        xs: 12,
        sm: 8
      }, /*#__PURE__*/_react["default"].createElement(_modal["default"], {
        modalSource: IS_PHOTOAVAIL,
        isDisable: !customOptions.isPhotoAvail,
        customOptions: customOptions,
        saveImageSrc: function saveImageSrc(modalSource, src) {
          return _this2.saveCaptureImageSrc(modalSource, src);
        }
      }), /*#__PURE__*/_react["default"].createElement("input", {
        accept: "image/*",
        style: {
          display: 'none'
        },
        id: "is-photo-upload",
        multiple: true,
        type: "file",
        onChange: this.handleImageUpload.bind(this, IS_PHOTOUPLOAD)
      }), /*#__PURE__*/_react["default"].createElement("label", {
        style: {
          pointerEvents: !customOptions.isPhotoUpload ? 'none' : 'visible'
        },
        htmlFor: "is-photo-upload"
      }, /*#__PURE__*/_react["default"].createElement(_core.IconButton, {
        "aria-label": "Desktop View",
        component: "span",
        disabled: !customOptions.isPhotoUpload
      }, /*#__PURE__*/_react["default"].createElement(_ImageRounded["default"], null)))), (this.state.isPhotoAvail !== '' || this.state.isPhotoUpload !== '') && /*#__PURE__*/_react["default"].createElement(_core.Grid, {
        item: true,
        xs: 12
      }, this.state.isPhotoAvail !== '' && /*#__PURE__*/_react["default"].createElement("img", {
        src: this.state.isPhotoAvail,
        height: "100",
        style: {
          marginRight: '20px'
        },
        className: "image-upload-preview"
      }), this.state.isPhotoUpload !== '' && /*#__PURE__*/_react["default"].createElement("img", {
        src: this.state.isPhotoUpload,
        height: "100",
        className: "image-upload-preview"
      })), /*#__PURE__*/_react["default"].createElement(_core.Grid, {
        item: true,
        xs: 12,
        sm: 4,
        className: "vertical-middle"
      }, /*#__PURE__*/_react["default"].createElement(_core.Typography, {
        component: "span"
      }, "360 Photo")), /*#__PURE__*/_react["default"].createElement(_core.Grid, {
        item: true,
        xs: 12,
        sm: 8
      }, /*#__PURE__*/_react["default"].createElement(_modal["default"], {
        modalSource: IS_360AVAIL,
        isDisable: !customOptions.is360Avail,
        customOptions: customOptions,
        saveImageSrc: function saveImageSrc(modalSource, src) {
          return _this2.saveCaptureImageSrc(modalSource, src);
        }
      }), /*#__PURE__*/_react["default"].createElement("input", {
        accept: "image/*",
        style: {
          display: 'none'
        },
        id: "is-360-photo-upload",
        multiple: true,
        type: "file",
        onChange: this.handleImageUpload.bind(this, IS_360PHOTOUPLOAD)
      }), /*#__PURE__*/_react["default"].createElement("label", {
        style: {
          pointerEvents: !customOptions.is360PhotoUpload ? 'none' : 'visible'
        },
        htmlFor: "is-360-photo-upload"
      }, /*#__PURE__*/_react["default"].createElement(_core.IconButton, {
        "aria-label": "Desktop View",
        component: "span",
        disabled: !customOptions.is360PhotoUpload
      }, /*#__PURE__*/_react["default"].createElement(_ImageRounded["default"], null)))), (this.state.is360Avail !== '' || this.state.is360PhotoUpload !== '') && /*#__PURE__*/_react["default"].createElement(_core.Grid, {
        item: true,
        xs: 12
      }, this.state.is360Avail !== '' && /*#__PURE__*/_react["default"].createElement("img", {
        src: this.state.is360Avail,
        height: "100",
        style: {
          marginRight: '20px'
        },
        className: "image-upload-preview"
      }), this.state.is360PhotoUpload !== '' && /*#__PURE__*/_react["default"].createElement("img", {
        src: this.state.is360PhotoUpload,
        height: "100",
        className: "image-upload-preview"
      })), /*#__PURE__*/_react["default"].createElement(_core.Grid, {
        item: true,
        xs: 12,
        sm: 4,
        className: "vertical-middle"
      }, /*#__PURE__*/_react["default"].createElement(_core.Typography, {
        component: "span"
      }, "Barcode")), /*#__PURE__*/_react["default"].createElement(_core.Grid, {
        item: true,
        xs: 12,
        sm: 8
      }, /*#__PURE__*/_react["default"].createElement(_modal["default"], {
        modalSource: IS_BARCODEAVAIL,
        isDisable: !customOptions.isBarcodeAvail,
        customOptions: customOptions,
        saveImageSrc: function saveImageSrc(modalSource, src) {
          return _this2.saveCaptureImageSrc(modalSource, src);
        }
      })), this.state.isBarcodeAvail !== '' && /*#__PURE__*/_react["default"].createElement(_core.Grid, {
        item: true,
        xs: 12
      }, this.state.isBarcodeAvail !== '' && /*#__PURE__*/_react["default"].createElement(_core.Typography, {
        component: "h6"
      }, "Barcode Data: ", this.state.isBarcodeAvail)), /*#__PURE__*/_react["default"].createElement(_core.Grid, {
        item: true,
        xs: 12,
        sm: 12
      }), /*#__PURE__*/_react["default"].createElement(_core.Grid, {
        item: true,
        xs: 12
      }, /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_core.Typography, {
        variant: "subtitle2",
        component: "span"
      }, "Comments: "), !this.state.isCommentsEditMode && customOptions.isCommentPopAvail && /*#__PURE__*/_react["default"].createElement(_core.IconButton, {
        onClick: function onClick() {
          return _this2.setState({
            isCommentsEditMode: true
          });
        }
      }, /*#__PURE__*/_react["default"].createElement(_CreateRounded["default"], {
        fontSize: "small"
      })))), customOptions.isCommentsAvail ? /*#__PURE__*/_react["default"].createElement(_core.Grid, {
        item: true,
        xs: 12,
        sm: 8
      }, /*#__PURE__*/_react["default"].createElement(_core.TextField, {
        size: "small",
        variant: "outlined",
        name: "isCommentsAvail",
        value: this.state.commentText // onEnter={()=>this.setState({isCommentsEditMode: false})}
        ,
        onChange: this.textChange.bind(this)
      }), this.state.isCommentsEditMode && /*#__PURE__*/_react["default"].createElement(_core.IconButton, {
        onClick: function onClick() {
          return _this2.setState({
            isCommentsEditMode: false
          });
        }
      }, /*#__PURE__*/_react["default"].createElement(_CheckRounded["default"], {
        style: {
          color: '#2b9500'
        }
      }))) : /*#__PURE__*/_react["default"].createElement(_core.Grid, {
        item: true,
        xs: 12,
        sm: 8
      }, this.state.isCommentsEditMode ? /*#__PURE__*/_react["default"].createElement(CommentsModal, {
        value: this.state.commentText,
        textChange: this.textChange.bind(this),
        setCommentsEdit: this.setCommentsModalFalse.bind(this)
      }) : /*#__PURE__*/_react["default"].createElement(_core.Typography, {
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
}(_react["default"].Component);

exports["default"] = Photo_PrePost;

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
      _useState2 = (0, _slicedToArray2["default"])(_useState, 1),
      modalStyle = _useState2[0];

  return /*#__PURE__*/_react["default"].createElement(_Modal["default"], {
    "aria-labelledby": "simple-modal-title",
    "aria-describedby": "simple-modal-description",
    open: true
  }, /*#__PURE__*/_react["default"].createElement("div", {
    style: modalStyle,
    className: classes.paper
  }, /*#__PURE__*/_react["default"].createElement(_core.TextField, {
    size: "small",
    variant: "outlined",
    label: "Comments",
    name: "isCommentsAvail",
    value: props.value,
    onChange: function onChange(e) {
      return props.textChange(e);
    }
  }), /*#__PURE__*/_react["default"].createElement(_core.Button, {
    color: "primary",
    variant: "contained",
    className: classes.SaveCommentsBtn,
    onClick: function onClick() {
      return props.setCommentsEdit();
    }
  }, "Save")));
}
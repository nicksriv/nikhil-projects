"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _styles = require("@material-ui/core/styles");
var _core = require("@material-ui/core");
var _Modal = _interopRequireDefault(require("@material-ui/core/Modal"));
var _Button = _interopRequireDefault(require("@material-ui/core/Button"));
var _reactWebcam = _interopRequireDefault(require("react-webcam"));
var _PhotoCamera = _interopRequireDefault(require("@material-ui/icons/PhotoCamera"));
var _PhotoAlbum = _interopRequireDefault(require("@material-ui/icons/PhotoAlbum"));
var _ImageRounded = _interopRequireDefault(require("@material-ui/icons/ImageRounded"));
var _HelpRounded = _interopRequireDefault(require("@material-ui/icons/HelpRounded"));
var _this = void 0;
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
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
      // width: 400,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(4),
      outline: "none"
    },
    box: {
      display: "flex",
      flexDirection: "row"
    }
  };
});
function PhotoCaptureUploadModal(props) {
  var _useState = (0, _react.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    open = _useState2[0],
    setOpen = _useState2[1];
  var _useState3 = (0, _react.useState)(false),
    _useState4 = _slicedToArray(_useState3, 2),
    helpTextOpen = _useState4[0],
    setHelPTextOpen = _useState4[1];
  var _useState5 = (0, _react.useState)(false),
    _useState6 = _slicedToArray(_useState5, 2),
    imageUpload = _useState6[0],
    setImageUpload = _useState6[1];
  var _useState7 = (0, _react.useState)(getModalStyle),
    _useState8 = _slicedToArray(_useState7, 1),
    modalStyle = _useState8[0];
  var modalSource = props.modalSource;
  var customOptions = props.customOptions;
  var CustomModal = function CustomModal() {
    return /*#__PURE__*/_react.default.createElement(_Modal.default, {
      "aria-labelledby": "simple-modal-title",
      "aria-describedby": "simple-modal-description",
      open: open,
      onClose: handleClose
    }, /*#__PURE__*/_react.default.createElement("div", {
      style: modalStyle,
      className: classes.paper
    }, /*#__PURE__*/_react.default.createElement(ImageCaptureUpload, {
      saveAdditionalOptions: function saveAdditionalOptions(property, e) {
        return props.saveAdditionalOptions(property, e);
      },
      isPhotoUpload: imageUpload,
      customOptions: customOptions,
      saveUploadImageSrc: function saveUploadImageSrc(src) {
        handleClose();
        props.saveUploadImageSrc(modalSource, src);
      },
      saveImageSrc: function saveImageSrc(src) {
        handleClose();
        props.saveImageSrc(modalSource, src);
      }
    })));
  };
  var HeplTextModal = function HeplTextModal() {
    return /*#__PURE__*/_react.default.createElement(_Modal.default, {
      "aria-labelledby": "simple-modal-title",
      "aria-describedby": "simple-modal-description",
      open: helpTextOpen,
      onClose: handleHelpTextClose
    }, /*#__PURE__*/_react.default.createElement("div", {
      style: modalStyle,
      className: classes.paper
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "material-element-label",
      style: {
        textAlign: 'center',
        padding: '20px'
      }
    }, /*#__PURE__*/_react.default.createElement(_core.Typography, {
      component: "span"
    }, "Help Text")), /*#__PURE__*/_react.default.createElement(_core.Grid, {
      item: true,
      xs: 12,
      sm: 12
    }, /*#__PURE__*/_react.default.createElement(_core.FormLabel, null, customOptions.helpText))));
  };
  var handleOpen = function handleOpen(imageUpload) {
    setOpen(true);
    if (imageUpload) {
      setImageUpload(true);
    } else {
      setImageUpload(false);
    }
  };
  var handleClose = function handleClose() {
    setOpen(false);
  };
  var handleHelpTextOpen = function handleHelpTextOpen() {
    setHelPTextOpen(true);
  };
  var handleHelpTextClose = function handleHelpTextClose() {
    setHelPTextOpen(false);
  };
  var classes = useStyles();
  return /*#__PURE__*/_react.default.createElement("div", {
    className: classes.box
  }, customOptions.isPhotoAvail && /*#__PURE__*/_react.default.createElement(_core.IconButton, {
    "aria-label": "Desktop View",
    onClick: function onClick() {
      handleOpen(false);
    },
    disabled: props.isDisable || props.read_only
  }, /*#__PURE__*/_react.default.createElement(_PhotoCamera.default, null)), customOptions.isPhotoUpload && /*#__PURE__*/_react.default.createElement(_core.IconButton, {
    "aria-label": "Desktop View",
    onClick: function onClick() {
      handleOpen(true);
    },
    disabled: props.isDisable || props.read_only
  }, /*#__PURE__*/_react.default.createElement(_ImageRounded.default, null)), customOptions.isShowHelp && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_core.IconButton, {
    "aria-label": "Desktop View",
    onClick: function onClick() {
      handleHelpTextOpen();
    },
    disabled: props.isDisable || props.read_only
  }, /*#__PURE__*/_react.default.createElement(_HelpRounded.default, null)), /*#__PURE__*/_react.default.createElement(HeplTextModal, null)), customOptions.sampleS3Uri != '' && /*#__PURE__*/_react.default.createElement("img", {
    src: customOptions.sampleS3Uri,
    width: "30",
    height: "30",
    className: "image-upload-preview"
  }), /*#__PURE__*/_react.default.createElement(CustomModal, null));
}
var _default = PhotoCaptureUploadModal;
exports.default = _default;
var ImageCaptureUpload = function ImageCaptureUpload(props) {
  var webcamRef = _react.default.useRef(null);
  var _React$useState = _react.default.useState(null),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    imgFileObj = _React$useState2[0],
    setImgObj = _React$useState2[1];
  var _React$useState3 = _react.default.useState(true),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    sizeError = _React$useState4[0],
    setSizeError = _React$useState4[1];
  var customOptions = props.customOptions;
  var isPhotoUpload = props.isPhotoUpload;
  var feetVal = '';
  var inchesVal = '';
  var azimuthAngleVal = '';
  var _useState9 = (0, _react.useState)(false),
    _useState10 = _slicedToArray(_useState9, 2),
    error = _useState10[0],
    SetError = _useState10[1];
  var capture = _react.default.useCallback(function () {
    var imageSrc = webcamRef.current.getScreenshot();
    var file = {};
    file.name = 'photo_capture_' + Math.floor(Math.random() * 1000000);
    file.type = imageSrc.substring(imageSrc.indexOf('data:') + 5, imageSrc.indexOf(';'));
    file.size = imageSrc.length - imageSrc.substr(0, imageSrc.indexOf('base64,') + 7).length;
    file.imageSrc = imageSrc;
    if (file.size > 10000000) {
      setSizeError(false);
    } else {
      setImgObj(file);
    }
  }, [webcamRef, setImgObj]);
  var deleteImage = function deleteImage() {
    setImgObj(null);
  };
  var saveImage = function saveImage() {
    if (customOptions.tapedrop && feetVal == '' && inchesVal == '') {
      SetError(true);
      return;
    }
    if (customOptions.isDistToBuilding && feetVal == '' && inchesVal == '') {
      SetError(true);
      return;
    }
    if (customOptions.isTargetAzimuthAngle && azimuthAngleVal == '') {
      SetError(true);
      return;
    }
    if (isPhotoUpload) {
      props.saveUploadImageSrc(imgFileObj);
    } else {
      props.saveImageSrc(imgFileObj);
    }
  };
  var handleAdditionalOptions = function handleAdditionalOptions(property, e) {
    if (property == 'feet') {
      feetVal = e.target.value;
    } else if (property == 'inches') {
      inchesVal = e.target.value;
    } else if (property == 'azimuthAngle') {
      azimuthAngleVal = e.target.value;
    }
    props.saveAdditionalOptions(property, e);
  };
  var handleImageUpload = function handleImageUpload(clickSource, e) {
    var self = _this;
    var target = e.target;
    var file;
    var reader;
    if (target != undefined && target.files && target.files.length) {
      file = target.files[0];
      reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = function () {
        var imageSrc = reader.result;
        file.imageSrc = imageSrc;
        if (file.size > 10000000) {
          setSizeError(false);
        } else {
          setImgObj(file);
        }
      };
    }
  };
  var errorStyle = {
    color: "#f44336",
    fontSize: "0.75rem",
    fontWeight: "400",
    lineHeight: "1.66",
    letterSpacing: "0.03333em",
    fontFamily: "Roboto"
  };
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, imgFileObj ? /*#__PURE__*/_react.default.createElement("img", {
    height: "350",
    width: "400",
    style: {
      alignSelf: 'center'
    },
    src: imgFileObj.imageSrc
  }) : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, isPhotoUpload ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_Button.default, {
    color: "primary",
    variant: "contained",
    component: "label",
    disableElevation: true,
    style: {
      color: '#FFFFFF'
    }
    // className={classname}
  }, "Choose Image to Upload", /*#__PURE__*/_react.default.createElement("input", {
    type: "file",
    accept: 'image/*',
    hidden: true,
    onChange: function onChange(e) {
      return handleImageUpload("isPhotoUpload", e);
    }
  })), /*#__PURE__*/_react.default.createElement("span", {
    style: errorStyle,
    hidden: sizeError
  }, "Max size should be less than 10mb.")) : /*#__PURE__*/_react.default.createElement(_reactWebcam.default, {
    audio: false,
    ref: webcamRef,
    screenshotFormat: "image/jpeg",
    style: {
      width: '400px'
    }
  })), imgFileObj ? /*#__PURE__*/_react.default.createElement(_core.Grid, {
    container: true,
    spacing: 2
  }, /*#__PURE__*/_react.default.createElement(_core.Grid, {
    item: true,
    xs: 12,
    sm: 12
  }, customOptions.tapedrop && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement(_core.FormLabel, null, "Tape Drop"), /*#__PURE__*/_react.default.createElement(_core.Grid, null, /*#__PURE__*/_react.default.createElement(_core.TextField, {
    size: "small",
    variant: "outlined",
    id: "outlined-basic",
    label: "Feet",
    style: {
      paddingRight: '10px'
    },
    error: error,
    onChange: function onChange(e) {
      return handleAdditionalOptions('feet', e);
    },
    inputProps: {
      type: 'number',
      padding: 10
    }
  }), /*#__PURE__*/_react.default.createElement(_core.TextField, {
    size: "small",
    variant: "outlined",
    id: "outlined-basic",
    label: "Inches",
    error: error,
    onChange: function onChange(e) {
      return handleAdditionalOptions('inches', e);
    },
    inputProps: {
      type: 'number',
      padding: 10
    }
  }))), customOptions["isDistToBuilding"] && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement(_core.FormLabel, null, "Distance to Building"), /*#__PURE__*/_react.default.createElement(_core.Grid, null, /*#__PURE__*/_react.default.createElement(_core.TextField, {
    size: "small",
    variant: "outlined",
    id: "outlined-basic",
    label: "Feet",
    error: error,
    style: {
      paddingRight: '10px'
    },
    onChange: function onChange(e) {
      return handleAdditionalOptions('feet', e);
    },
    inputProps: {
      type: 'number',
      padding: 10
    }
  }), /*#__PURE__*/_react.default.createElement(_core.TextField, {
    size: "small",
    variant: "outlined",
    id: "outlined-basic",
    label: "Inches",
    error: error,
    onChange: function onChange(e) {
      return handleAdditionalOptions('inches', e);
    },
    inputProps: {
      type: 'number',
      padding: 10
    }
  }))), customOptions["isTargetAzimuthAngle"] && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement(_core.FormLabel, null, "Target Azimuth Angle"), /*#__PURE__*/_react.default.createElement(_core.Grid, null, /*#__PURE__*/_react.default.createElement(_core.TextField, {
    size: "small",
    variant: "outlined",
    id: "outlined-basic",
    label: "Target Azimuth Angle",
    type: "number",
    error: error,
    onChange: function onChange(e) {
      return handleAdditionalOptions('azimuthAngle', e);
    },
    inputProps: {
      type: 'text',
      padding: 10
    }
  })))), /*#__PURE__*/_react.default.createElement(_core.Grid, {
    item: true,
    xs: 12,
    sm: 6
  }, /*#__PURE__*/_react.default.createElement(_Button.default, {
    fullWidth: true,
    variant: "contained",
    color: "primary",
    onClick: deleteImage,
    style: {
      marginTop: '10px'
    }
  }, !isPhotoUpload ? "Recapture" : "CANCEL/REUPLOAD")), /*#__PURE__*/_react.default.createElement(_core.Grid, {
    item: true,
    xs: 12,
    sm: 6
  }, /*#__PURE__*/_react.default.createElement(_Button.default, {
    fullWidth: true,
    variant: "contained",
    color: "primary",
    onClick: saveImage,
    style: {
      marginTop: '10px'
    }
  }, "Save"))) : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, !isPhotoUpload && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_Button.default, {
    variant: "contained",
    color: "primary",
    onClick: capture,
    style: {
      marginTop: '10px'
    }
  }, "Capture photo"), /*#__PURE__*/_react.default.createElement("span", {
    style: errorStyle,
    hidden: sizeError
  }, "Max size should be less than 10mb."))));
};
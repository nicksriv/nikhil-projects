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
var _Videocam = _interopRequireDefault(require("@material-ui/icons/Videocam"));
var _VideoLibrary = _interopRequireDefault(require("@material-ui/icons/VideoLibrary"));
var _HighlightOff = _interopRequireDefault(require("@material-ui/icons/HighlightOff"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
// import CameraAltRoundedIcon from '@material-ui/icons/CameraAltRounded';

// import WebcamStreamCapture from "./WebcamStreamCapture";

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
    container: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-evenly"
    },
    box: {
      display: "flex",
      flexDirection: "row"
    },
    linkStyle: {
      alignSelf: 'center',
      textAlign: 'center',
      color: '#2C3E93',
      textDecorationLine: 'underline'
    },
    cancelIcon: {
      opacity: 0,
      '&:hover': {
        opacity: 1
      }
    }
  };
});
function VideoCaptureUploadModal(props) {
  var _useState = (0, _react.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    open = _useState2[0],
    setOpen = _useState2[1];
  // const [helpTextOpen, setHelPTextOpen] = useState(false);
  var _useState3 = (0, _react.useState)(false),
    _useState4 = _slicedToArray(_useState3, 2),
    videoUpload = _useState4[0],
    setVideoUpload = _useState4[1];
  var _useState5 = (0, _react.useState)(""),
    _useState6 = _slicedToArray(_useState5, 2),
    videoCaptured = _useState6[0],
    setVideoCaptured = _useState6[1];
  var _useState7 = (0, _react.useState)(false),
    _useState8 = _slicedToArray(_useState7, 2),
    displayVideo = _useState8[0],
    setDisplayVideo = _useState8[1];
  var _useState9 = (0, _react.useState)(true),
    _useState10 = _slicedToArray(_useState9, 2),
    recod = _useState10[0],
    setRecod = _useState10[1];
  var _useState11 = (0, _react.useState)(getModalStyle),
    _useState12 = _slicedToArray(_useState11, 1),
    modalStyle = _useState12[0];
  var modalSource = props.modalSource;
  var customOptions = props.customOptions;
  var isModalOpen = function isModalOpen(isOpen) {
    setOpen(isOpen);
  };
  var handleDeleteVidio = function handleDeleteVidio() {
    console.log(customOptions);
    setRecod(false);
    customOptions.recordedVideo = "";
  };
  var CustomModal = function CustomModal() {
    return /*#__PURE__*/_react.default.createElement(_Modal.default, {
      "aria-labelledby": "simple-modal-title",
      "aria-describedby": "simple-modal-description",
      open: open,
      onClose: handleClose
    }, /*#__PURE__*/_react.default.createElement("div", {
      style: modalStyle,
      className: classes.paper
    }));
  };
  var handleOpen = function handleOpen(videoUpload) {
    setOpen(true);
    if (videoUpload) {
      setVideoUpload(true);
    } else {
      setVideoUpload(false);
    }
  };
  var handleClose = function handleClose() {
    setOpen(false);
  };
  var classes = useStyles();
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
    className: classes.box,
    style: {
      justifyContent: "flex-start"
    }
  }, customOptions.isVideoAvail && /*#__PURE__*/_react.default.createElement(_core.IconButton, {
    "aria-label": "Desktop View",
    onClick: function onClick() {
      handleOpen(false);
      setRecod(true);
    },
    disabled: props.isDisable || props.read_only
  }, /*#__PURE__*/_react.default.createElement(_Videocam.default, {
    fontSize: "large"
  })), customOptions.isVideoUpload && /*#__PURE__*/_react.default.createElement(_core.IconButton, {
    "aria-label": "Desktop View",
    onClick: function onClick() {
      handleOpen(true);
      setRecod(true);
    },
    disabled: props.isDisable || props.read_only
  }, /*#__PURE__*/_react.default.createElement(_VideoLibrary.default, null)), /*#__PURE__*/_react.default.createElement(CustomModal, null), !props.isFromMastersScreen && customOptions.isVideoLink && /*#__PURE__*/_react.default.createElement("a", {
    href: customOptions.videoLink,
    target: "_blank",
    className: classes.linkStyle
  }, "Video Link")), props.isFromMastersScreen && /*#__PURE__*/_react.default.createElement("div", null, customOptions.isVideoLink && /*#__PURE__*/_react.default.createElement("a", {
    style: {
      alignSelf: 'center',
      textAlign: "centre",
      paddingLeft: '1rem'
    }
  }, "Video Link")), customOptions.recordedVideo && recod && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_HighlightOff.default, {
    fontSize: "small",
    style: {
      marginLeft: '90%'
    },
    onClick: handleDeleteVidio
  }), /*#__PURE__*/_react.default.createElement("video", {
    style: {
      width: "100%",
      justifyContent: 'stretch',
      height: 85,
      padding: 5,
      border: '1px solid black'
    },
    src: customOptions.recordedVideo,
    controls: true
  })));
}
var _default = VideoCaptureUploadModal;
exports.default = _default;
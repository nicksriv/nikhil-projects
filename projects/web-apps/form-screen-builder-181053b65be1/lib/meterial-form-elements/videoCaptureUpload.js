"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _styles = require("@material-ui/core/styles");

var _core = require("@material-ui/core");

var _Modal = _interopRequireDefault(require("@material-ui/core/Modal"));

var _Videocam = _interopRequireDefault(require("@material-ui/icons/Videocam"));

var _VideoLibrary = _interopRequireDefault(require("@material-ui/icons/VideoLibrary"));

var _HighlightOff = _interopRequireDefault(require("@material-ui/icons/HighlightOff"));

var _WebcamStreamCapture = _interopRequireDefault(require("./WebcamStreamCapture"));

// import CameraAltRoundedIcon from '@material-ui/icons/CameraAltRounded';
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
      color: '#50BFB7',
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
      _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
      open = _useState2[0],
      setOpen = _useState2[1]; // const [helpTextOpen, setHelPTextOpen] = useState(false);


  var _useState3 = (0, _react.useState)(false),
      _useState4 = (0, _slicedToArray2["default"])(_useState3, 2),
      videoUpload = _useState4[0],
      setVideoUpload = _useState4[1];

  var _useState5 = (0, _react.useState)(""),
      _useState6 = (0, _slicedToArray2["default"])(_useState5, 2),
      videoCaptured = _useState6[0],
      setVideoCaptured = _useState6[1];

  var _useState7 = (0, _react.useState)(false),
      _useState8 = (0, _slicedToArray2["default"])(_useState7, 2),
      displayVideo = _useState8[0],
      setDisplayVideo = _useState8[1];

  var _useState9 = (0, _react.useState)(true),
      _useState10 = (0, _slicedToArray2["default"])(_useState9, 2),
      recod = _useState10[0],
      setRecod = _useState10[1];

  var _useState11 = (0, _react.useState)(getModalStyle),
      _useState12 = (0, _slicedToArray2["default"])(_useState11, 1),
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
    return /*#__PURE__*/_react["default"].createElement(_Modal["default"], {
      "aria-labelledby": "simple-modal-title",
      "aria-describedby": "simple-modal-description",
      open: open,
      onClose: handleClose
    }, /*#__PURE__*/_react["default"].createElement("div", {
      style: modalStyle,
      className: classes.paper
    }, /*#__PURE__*/_react["default"].createElement(_WebcamStreamCapture["default"], {
      isModalOpen: isModalOpen,
      isVideoUpload: videoUpload,
      customOptions: customOptions,
      saveUploadVideoSrc: function saveUploadVideoSrc(src) {
        handleClose();
        props.saveUploadVideoSrc(modalSource, src);
      },
      saveVideoSrc: function saveVideoSrc(src) {
        handleClose();
        props.saveVideoSrc(modalSource, src);
      }
    })));
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
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("div", {
    className: classes.box,
    style: {
      justifyContent: "flex-start"
    }
  }, customOptions.isVideoAvail && /*#__PURE__*/_react["default"].createElement(_core.IconButton, {
    "aria-label": "Desktop View",
    onClick: function onClick() {
      handleOpen(false);
      setRecod(true);
    },
    disabled: props.isDisable || props.read_only
  }, /*#__PURE__*/_react["default"].createElement(_Videocam["default"], {
    fontSize: "large"
  })), customOptions.isVideoUpload && /*#__PURE__*/_react["default"].createElement(_core.IconButton, {
    "aria-label": "Desktop View",
    onClick: function onClick() {
      handleOpen(true);
      setRecod(true);
    },
    disabled: props.isDisable || props.read_only
  }, /*#__PURE__*/_react["default"].createElement(_VideoLibrary["default"], null)), /*#__PURE__*/_react["default"].createElement(CustomModal, null), !props.isFromMastersScreen && customOptions.isVideoLink && /*#__PURE__*/_react["default"].createElement("a", {
    href: customOptions.videoLink,
    target: "_blank",
    className: classes.linkStyle
  }, "Video Link")), props.isFromMastersScreen && /*#__PURE__*/_react["default"].createElement("div", null, customOptions.isVideoLink && /*#__PURE__*/_react["default"].createElement("a", {
    style: {
      alignSelf: 'center',
      textAlign: "centre",
      paddingLeft: '1rem'
    }
  }, "Video Link")), customOptions.recordedVideo && recod && /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_HighlightOff["default"], {
    fontSize: "small",
    style: {
      marginLeft: '90%'
    },
    onClick: handleDeleteVidio
  }), /*#__PURE__*/_react["default"].createElement("video", {
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
exports["default"] = _default;
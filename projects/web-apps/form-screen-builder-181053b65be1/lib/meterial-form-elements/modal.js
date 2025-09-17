"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BarcodeScanner = BarcodeScanner;
exports["default"] = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _styles = require("@material-ui/core/styles");

var _core = require("@material-ui/core");

var _Modal = _interopRequireDefault(require("@material-ui/core/Modal"));

var _Button = _interopRequireDefault(require("@material-ui/core/Button"));

var _reactWebcam = _interopRequireDefault(require("react-webcam"));

var _CameraAltRounded = _interopRequireDefault(require("@material-ui/icons/CameraAltRounded"));

var _reactWebcamBarcodeScanner = _interopRequireDefault(require("react-webcam-barcode-scanner"));

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
    }
  };
});

function SimpleModal(props) {
  var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
      open = _useState2[0],
      setOpen = _useState2[1];

  var _useState3 = (0, _react.useState)(getModalStyle),
      _useState4 = (0, _slicedToArray2["default"])(_useState3, 1),
      modalStyle = _useState4[0];

  var modalSource = props.modalSource;
  console.log('bar', props.read_only);

  var CustomModal = function CustomModal() {
    return /*#__PURE__*/_react["default"].createElement(_Modal["default"], {
      "aria-labelledby": "simple-modal-title",
      "aria-describedby": "simple-modal-description",
      open: open,
      onClose: handleClose
    }, /*#__PURE__*/_react["default"].createElement("div", {
      style: modalStyle,
      className: classes.paper
    }, modalSource === 'isBarcodeAvail' ? /*#__PURE__*/_react["default"].createElement(BarcodeScanner, {
      saveImageSrc: function saveImageSrc(src) {
        handleClose();
        props.saveImageSrc(modalSource, src);
      }
    }) : /*#__PURE__*/_react["default"].createElement(WebcamCapture, {
      saveImageSrc: function saveImageSrc(src) {
        handleClose();
        props.saveImageSrc(modalSource, src);
      }
    })));
  };

  var handleOpen = function handleOpen() {
    setOpen(true);
  };

  var handleClose = function handleClose() {
    setOpen(false);
  };

  var classes = useStyles();
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_core.IconButton, {
    "aria-label": "Desktop View",
    onClick: function onClick() {
      handleOpen();
    },
    disabled: props.read_only
  }, /*#__PURE__*/_react["default"].createElement(_CameraAltRounded["default"], null)), /*#__PURE__*/_react["default"].createElement(CustomModal, null));
}

var _default = SimpleModal;
exports["default"] = _default;

function BarcodeScanner(props) {
  var _useState5 = (0, _react.useState)(''),
      _useState6 = (0, _slicedToArray2["default"])(_useState5, 2),
      barcode = _useState6[0],
      setBarcode = _useState6[1];

  var deleteImage = function deleteImage() {
    setBarcode('');
  };

  var saveImage = function saveImage() {
    props.saveImageSrc(barcode);
  };

  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, barcode === '' ? /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_reactWebcamBarcodeScanner["default"], {
    width: 400,
    height: 300,
    onUpdate: function onUpdate(err, result) {
      if (result) setBarcode(result.text);
    }
  }), /*#__PURE__*/_react["default"].createElement(_core.FormHelperText, null, "Note: Scan the barcode with the camera")) : /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_core.Grid, {
    container: true,
    spacing: 2
  }, /*#__PURE__*/_react["default"].createElement(_core.Grid, {
    item: true,
    xs: 12,
    style: {
      width: '400px',
      height: '300px',
      alignItems: 'center',
      justifyContent: 'center',
      display: 'flex'
    }
  }, /*#__PURE__*/_react["default"].createElement(_core.Typography, {
    variant: "h5",
    component: "h5"
  }, barcode)), /*#__PURE__*/_react["default"].createElement(_core.Grid, {
    item: true,
    xs: 12,
    sm: 6
  }, /*#__PURE__*/_react["default"].createElement(_Button["default"], {
    fullWidth: true,
    variant: "contained",
    color: "primary",
    onClick: deleteImage,
    style: {
      marginTop: '10px'
    }
  }, "Retake")), /*#__PURE__*/_react["default"].createElement(_core.Grid, {
    item: true,
    xs: 12,
    sm: 6
  }, /*#__PURE__*/_react["default"].createElement(_Button["default"], {
    fullWidth: true,
    variant: "contained",
    color: "primary",
    onClick: saveImage,
    style: {
      marginTop: '10px'
    }
  }, "Save")))));
}

var WebcamCapture = function WebcamCapture(props) {
  var webcamRef = _react["default"].useRef(null);

  var _React$useState = _react["default"].useState(null),
      _React$useState2 = (0, _slicedToArray2["default"])(_React$useState, 2),
      imgSrc = _React$useState2[0],
      setImgSrc = _React$useState2[1];

  var capture = _react["default"].useCallback(function () {
    var imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
  }, [webcamRef, setImgSrc]);

  var deleteImage = function deleteImage() {
    setImgSrc(null);
  };

  var saveImage = function saveImage() {
    props.saveImageSrc(imgSrc);
  };

  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, imgSrc ? /*#__PURE__*/_react["default"].createElement("img", {
    src: imgSrc
  }) : /*#__PURE__*/_react["default"].createElement(_reactWebcam["default"], {
    audio: false,
    ref: webcamRef,
    screenshotFormat: "image/jpeg",
    style: {
      width: '400px'
    }
  }), imgSrc ? /*#__PURE__*/_react["default"].createElement(_core.Grid, {
    container: true,
    spacing: 2
  }, /*#__PURE__*/_react["default"].createElement(_core.Grid, {
    item: true,
    xs: 12,
    sm: 6
  }, /*#__PURE__*/_react["default"].createElement(_Button["default"], {
    fullWidth: true,
    variant: "contained",
    color: "primary",
    onClick: deleteImage,
    style: {
      marginTop: '10px'
    }
  }, "Retake")), /*#__PURE__*/_react["default"].createElement(_core.Grid, {
    item: true,
    xs: 12,
    sm: 6
  }, /*#__PURE__*/_react["default"].createElement(_Button["default"], {
    fullWidth: true,
    variant: "contained",
    color: "primary",
    onClick: saveImage,
    style: {
      marginTop: '10px'
    }
  }, "Save"))) : /*#__PURE__*/_react["default"].createElement(_Button["default"], {
    variant: "contained",
    color: "primary",
    onClick: capture,
    style: {
      marginTop: '10px'
    }
  }, "Capture photo"));
};
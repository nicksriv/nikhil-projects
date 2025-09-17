"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireWildcard(require("react"));

var _core = require("@material-ui/core");

var _styles = require("@material-ui/core/styles");

var _RadioButtonUnchecked = _interopRequireDefault(require("@material-ui/icons/RadioButtonUnchecked"));

var _CheckCircle = _interopRequireDefault(require("@material-ui/icons/CheckCircle"));

var _PanToolOutlined = _interopRequireDefault(require("@material-ui/icons/PanToolOutlined"));

var _PanToolTwoTone = _interopRequireDefault(require("@material-ui/icons/PanToolTwoTone"));

var _Slider = _interopRequireDefault(require("@material-ui/core/Slider"));

var _ZoomIn = _interopRequireDefault(require("@material-ui/icons/ZoomIn"));

var _ZoomOut = _interopRequireDefault(require("@material-ui/icons/ZoomOut"));

var _ZoomInOutlined = _interopRequireDefault(require("@material-ui/icons/ZoomInOutlined"));

var _ZoomOutOutlined = _interopRequireDefault(require("@material-ui/icons/ZoomOutOutlined"));

;
var useStyles = (0, _styles.makeStyles)(function (_ref) {
  var palette = _ref.palette,
      theme = (0, _objectWithoutProperties2["default"])(_ref, ["palette"]);
  return {
    customBorder: {
      //borderBottom: "3px solid rgba(0, 0, 0, 0.1)",
      //boxShadow: "10px 4px 6px -6px #222"
      // "-webkit-box-shadow": "0 4px 6px -6px #222",
      // "-moz-box-shadow": "0 4px 6px -6px #222",
      // boxShadow: "0 4px 6px -6px #222"
      // "-webkit-box-shadow": "-2px -1px 15px 7px rgba(0,0,0,0.5)",
      // "-moz-box-shadow": "-3px -2px 30px 14px rgba(0,0,0,0.425)",
      // boxShadow: "-4px -3px 45px 21px rgba(0,0,0,0.35)"
      background: "#FFFFFF 0% 0% no-repeat padding-box",
      boxShadow: "0px 2px 4px #00000029",
      borderRadius: "3px 3px 0px 0px",
      opacity: 1
    },
    slider: {
      width: 70,
      '& .MuiSlider-thumb': {
        width: "2px"
      },
      '& .MuiSlider-thumb.Mui-disabled': {
        width: "2px",
        height: "10px",
        marginTop: "-4px",
        opacity: 0.38
      }
    },
    sliderEnable: {
      '& .MuiSlider-root': {
        color: "#9e9e9e !important"
      }
    },
    sliderDisable: {
      '& .MuiSlider-root.Mui-disabled .MuiSlider-track': {
        opacity: 0.2
      }
    },
    actvBtn: {
      backgroundColor: "#E5F2F0",
      color: "#46C796",
      border: "1px solid #46C796",
      padding: "0 0 0 1rem",
      margin: "0 0.5rem",
      height: "2rem"
    },
    inctvBtn: {
      backgroundColor: "#EBD9DC",
      border: "1px solid #B10021",
      padding: "0 0 0 1rem",
      height: "2rem",
      margin: "0 0.5rem",
      color: "#B10021"
    },
    button: {
      padding: "0 0 0 1rem",
      margin: "0 0.5rem",
      height: "2rem",
      backgroundColor: "white"
    },
    statusControl: {
      //marginLeft: "12rem",
      color: "light-gray",
      '& .MuiTypography-body1': {
        fontSize: '1.10rem',
        opacity: '0.2',
        marginLeft: "-9px"
      }
    },
    icon: {
      '& .MuiSvgIcon-root': {
        fontSize: "1.35rem",
        marginTop: "5px"
      }
    },
    opacityPoint4: {
      opacity: 0.4
    },
    opacityPoint3: {
      opacity: 0.3
    },
    opacityPoint1: {
      opacity: 0.1
    },
    opacityPoint2: {
      opacity: 0.2
    },
    rightBorder: {
      borderRight: "1px solid gray"
    }
  };
});

function V5FormBuilderMasterScreensHeader(props) {
  var panning = props.panning,
      handlePan = props.handlePan,
      zoomIn = props.zoomIn,
      zoomOut = props.zoomOut,
      resetTransform = props.resetTransform,
      status = props.status,
      handleStatusChange = props.handleStatusChange,
      showPrivilegePreviewPlaceholder = props.showPrivilegePreviewPlaceholder;
  var classes = useStyles();

  var _React$useState = _react["default"].useState(50),
      _React$useState2 = (0, _slicedToArray2["default"])(_React$useState, 2),
      value = _React$useState2[0],
      setValue = _React$useState2[1];

  var handleSliderChange = function handleSliderChange(event, newValue) {
    if (value < 50) {
      setValue(50);

      if (newValue > 50) {
        zoomOut(1);
      } else if (newValue < 50) {
        zoomIn(1);
      }
    } else if (value > 100) {
      setValue(100);
    } else {
      setValue(newValue);

      if (newValue > value) {
        zoomOut(1);
      } else if (newValue < value) {
        zoomIn(1);
      }
    }
  };

  var handleZoomInZoomOut = function handleZoomInZoomOut(e, source) {
    var newValue;

    if (source === "zoomin") {
      newValue = value - 20;

      if (newValue < 5) {
        newValue = 5;
      } else if (newValue > 100) {
        newValue = 100;
      }

      zoomIn();
      setValue(newValue);
    } else if (source === "zoomout") {
      newValue = value + 20;

      if (newValue < 50) {
        newValue = 50;
      } else if (newValue > 100) {
        newValue = 100;
      }

      zoomOut();
      setValue(newValue);
    }
  };

  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_core.Grid, {
    container: true,
    justifyContent: "space-between",
    className: "p-2 ".concat(classes.customBorder)
  }, /*#__PURE__*/_react["default"].createElement(_core.Grid, {
    item: true
  }, /*#__PURE__*/_react["default"].createElement(_core.FormControlLabel, {
    value: "status",
    name: "status",
    label: "Status:",
    labelPlacement: "start",
    size: "small",
    className: classes.statusControl,
    style: {
      cursor: "default"
    },
    control: /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, !showPrivilegePreviewPlaceholder && /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_core.Button, {
      variant: "outlined",
      size: "small",
      onClick: function onClick(e) {
        return handleStatusChange("INACTIVE");
      },
      name: "status",
      className: status === "INACTIVE" ? classes.inctvBtn : classes.button
    }, "INACTIVE", /*#__PURE__*/_react["default"].createElement(_core.Checkbox, {
      name: "INACTIVE",
      icon: /*#__PURE__*/_react["default"].createElement(_RadioButtonUnchecked["default"], null),
      checked: status === "INACTIVE" ? true : false,
      checkedIcon: /*#__PURE__*/_react["default"].createElement(_CheckCircle["default"], {
        style: {
          color: "#B10021"
        }
      })
    })), /*#__PURE__*/_react["default"].createElement(_core.Button, {
      variant: "outlined",
      size: "small",
      onClick: function onClick(e) {
        return handleStatusChange("ACTIVE");
      },
      name: "status",
      className: status === "ACTIVE" ? classes.actvBtn : classes.button
    }, "ACTIVE", /*#__PURE__*/_react["default"].createElement(_core.Checkbox, {
      color: "primary",
      name: "ACTIVE",
      icon: /*#__PURE__*/_react["default"].createElement(_RadioButtonUnchecked["default"], null),
      checked: status === "ACTIVE" ? true : false,
      checkedIcon: /*#__PURE__*/_react["default"].createElement(_CheckCircle["default"], null)
    }))))
  })), /*#__PURE__*/_react["default"].createElement(_core.Grid, {
    item: true
  }, /*#__PURE__*/_react["default"].createElement(_core.Grid, {
    container: true,
    spacing: 1,
    className: "".concat(classes.icon)
  }, /*#__PURE__*/_react["default"].createElement(_core.Grid, {
    item: true
  }, !showPrivilegePreviewPlaceholder ? panning ? /*#__PURE__*/_react["default"].createElement(_core.Tooltip, {
    placement: "bottom",
    title: "Enable Panning"
  }, /*#__PURE__*/_react["default"].createElement(_PanToolOutlined["default"], {
    onClick: handlePan,
    className: "float-right ".concat(showPrivilegePreviewPlaceholder ? classes.opacityPoint2 : classes.opacityPoint4),
    style: {
      fontSize: "1.20rem"
    }
  })) : /*#__PURE__*/_react["default"].createElement(_core.Tooltip, {
    placement: "bottom",
    title: "Disable Panning"
  }, /*#__PURE__*/_react["default"].createElement(_PanToolTwoTone["default"], {
    onClick: handlePan,
    className: "float-right ".concat(showPrivilegePreviewPlaceholder ? classes.opacityPoint2 : classes.opacityPoint4),
    style: {
      fontSize: "1.20rem"
    }
  })) : /*#__PURE__*/_react["default"].createElement(_PanToolOutlined["default"], {
    className: "float-right ".concat(classes.opacityPoint2),
    style: {
      fontSize: "1.20rem"
    }
  })), /*#__PURE__*/_react["default"].createElement(_core.Grid, {
    item: true,
    className: "".concat(classes.rightBorder, " ").concat(showPrivilegePreviewPlaceholder ? classes.opacityPoint1 : classes.opacityPoint2)
  }), /*#__PURE__*/_react["default"].createElement(_core.Grid, {
    item: true
  }, !showPrivilegePreviewPlaceholder ? /*#__PURE__*/_react["default"].createElement(_ZoomIn["default"], {
    onClick: function onClick(e) {
      return handleZoomInZoomOut(e, "zoomin");
    } //onClick={() => zoomIn()}
    ,
    className: "float-right ".concat(showPrivilegePreviewPlaceholder ? classes.opacityPoint2 : classes.opacityPoint4),
    style: {
      fontSize: "1.35rem"
    }
  }) : /*#__PURE__*/_react["default"].createElement(_ZoomIn["default"], {
    className: "float-right ".concat(showPrivilegePreviewPlaceholder ? classes.opacityPoint2 : classes.opacityPoint4),
    style: {
      fontSize: "1.35rem"
    }
  })), /*#__PURE__*/_react["default"].createElement(_core.Grid, {
    item: true
  }, !showPrivilegePreviewPlaceholder ? /*#__PURE__*/_react["default"].createElement(_Slider["default"], {
    className: "".concat(classes.slider),
    style: {
      color: "#9e9e9e"
    },
    value: typeof value === 'number' ? value : 0,
    defaultValue: 5,
    onChange: function onChange(e, newValue) {
      return handleSliderChange(e, newValue);
    },
    "aria-labelledby": "continuous-slider"
  }) : /*#__PURE__*/_react["default"].createElement(_Slider["default"], {
    className: "".concat(classes.slider),
    track: false,
    disabled: true,
    defaultValue: 50,
    "aria-labelledby": "continuous-slider"
  })), /*#__PURE__*/_react["default"].createElement(_core.Grid, {
    item: true
  }, !showPrivilegePreviewPlaceholder ? /*#__PURE__*/_react["default"].createElement(_ZoomOut["default"], {
    onClick: function onClick(e) {
      return handleZoomInZoomOut(e, "zoomout");
    } //onClick={() => zoomOut()}
    ,
    className: "float-right ".concat(showPrivilegePreviewPlaceholder ? classes.opacityPoint2 : classes.opacityPoint4),
    style: {
      fontSize: "1.35rem"
    }
  }) : /*#__PURE__*/_react["default"].createElement(_ZoomOut["default"], {
    className: "float-right ".concat(showPrivilegePreviewPlaceholder ? classes.opacityPoint2 : classes.opacityPoint4),
    style: {
      fontSize: "1.35rem"
    }
  }))))));
}

var _default = V5FormBuilderMasterScreensHeader;
exports["default"] = _default;
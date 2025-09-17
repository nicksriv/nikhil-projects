"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = LongTextOptions;
var _react = _interopRequireWildcard(require("react"));
var _styles = require("@material-ui/core/styles");
var _core = require("@material-ui/core");
var _FormControl = _interopRequireDefault(require("@material-ui/core/FormControl"));
var _NativeSelect = _interopRequireDefault(require("@material-ui/core/NativeSelect"));
var _InputBase = _interopRequireDefault(require("@material-ui/core/InputBase"));
var _CheckCircle = _interopRequireDefault(require("@material-ui/icons/CheckCircle"));
var _RadioButtonUnchecked = _interopRequireDefault(require("@material-ui/icons/RadioButtonUnchecked"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var BootstrapInput = (0, _styles.withStyles)(function (theme) {
  return {
    root: {
      'label + &': {
        marginTop: theme.spacing(3)
      }
    },
    input: {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: theme.palette.background.paper,
      border: '1px solid #ced4da',
      fontSize: 16,
      padding: '10px 26px 10px 12px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      // Use the system font instead of the default Roboto font.
      fontFamily: ['-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif', '"Apple Color Emoji"', '"Segoe UI Emoji"', '"Segoe UI Symbol"'].join(','),
      '&:focus': {
        borderRadius: 4,
        borderColor: '#80bdff',
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)'
      }
    }
  };
})(_InputBase.default);
var useStyles = (0, _styles.makeStyles)(function (theme) {
  return {
    formControl: {
      //margin: theme.spacing(1),
      minWidth: '100%'
    },
    validationSelect: {
      //margin: theme.spacing(1),
      minWidth: '50%'
    },
    selectEmpty: {
      marginTop: theme.spacing(2)
    },
    checked: {
      border: "1px solid #2C3E93",
      color: "#2C3E93",
      height: "30px",
      padding: " 0 0 0 0.5rem",
      marginLeft: "0.1rem",
      marginRight: "0.35rem",
      borderRadius: "4px"
    },
    unchecked: {
      border: "1px solid #00000099",
      height: "30px",
      padding: " 0 0 0 0.5rem",
      marginLeft: "0.1rem",
      marginRight: "0.35rem",
      borderRadius: "4px"
    },
    subHeading: {
      opacity: "0.6",
      fontSize: "16px",
      fontWeight: "normal",
      display: "inline"
    },
    button: {
      height: "28px"
      // outline: "none !important",
      // textTransform: "capitalize",
    }
  };
});

function LongTextOptions(props) {
  var _customOptions$limitT, _customOptions$editor, _customOptions$valida, _customOptions$editor2, _customOptions$editor3;
  var classes = useStyles();
  var _useState = (0, _react.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    minValError = _useState2[0],
    setMinValueError = _useState2[1];
  var _useState3 = (0, _react.useState)(false),
    _useState4 = _slicedToArray(_useState3, 2),
    maxValError = _useState4[0],
    setMaxValueError = _useState4[1];
  var customOptions = props.element.customOptions;
  var limitTypeOptions = (_customOptions$limitT = customOptions.limitTypeOptions) === null || _customOptions$limitT === void 0 ? void 0 : _customOptions$limitT.split(',');
  var editorModeOptions = (_customOptions$editor = customOptions.editorModeOptions) === null || _customOptions$editor === void 0 ? void 0 : _customOptions$editor.split(',');
  var validationOptions = (_customOptions$valida = customOptions.validationOptions) === null || _customOptions$valida === void 0 ? void 0 : _customOptions$valida.split(',');
  var isDisabled = props.element.customOptions.isFieldDisabled;
  if (customOptions.isLimitEntry) {
    customOptions.min = customOptions.min;
    customOptions.max = customOptions.max;
  } else {
    customOptions.min = "";
    customOptions.max = "";
  }
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_core.Grid, {
    item: true,
    xs: 12,
    className: "my-3"
  }, !isDisabled && /*#__PURE__*/_react.default.createElement(_FormControl.default, {
    component: "fieldset"
  }, /*#__PURE__*/_react.default.createElement("h5", {
    className: classes.subHeading
  }, "Editor Mode"), /*#__PURE__*/_react.default.createElement(_core.RadioGroup, {
    row: true,
    "aria-label": "material",
    name: "material",
    value: customOptions.editorMode,
    onChange: function onChange(e) {
      return props.editElementCustomOptionsProp('editorMode', 'value', e);
    }
  }, editorModeOptions === null || editorModeOptions === void 0 ? void 0 : editorModeOptions.map(function (option, index) {
    return /*#__PURE__*/_react.default.createElement(_core.FormControlLabel, {
      style: {
        marginRight: '8px',
        marginBottom: '0.8rem'
      },
      justifyContent: "space-between",
      key: option + index,
      className: customOptions.editorMode === option ? classes.checked : classes.unchecked,
      value: option,
      control:
      /*#__PURE__*/
      // <Grid container >
      //   <Grid item>
      _react.default.createElement(_core.Radio, {
        size: "small",
        color: "primary",
        icon: /*#__PURE__*/_react.default.createElement(_RadioButtonUnchecked.default, {
          className: "checkboxSize"
        }),
        checkedIcon: /*#__PURE__*/_react.default.createElement(_CheckCircle.default, {
          className: "checkboxSize"
        })
      })
      //   </Grid>
      // </Grid>
      ,
      label: option.split("_").join(" "),
      labelPlacement: "start"
    });
  })))), ((_customOptions$editor2 = customOptions.editorMode) === null || _customOptions$editor2 === void 0 ? void 0 : _customOptions$editor2.toLowerCase()) === 'plain_text' && /*#__PURE__*/_react.default.createElement(_core.Grid, {
    item: true,
    xs: 12
  }, !isDisabled && /*#__PURE__*/_react.default.createElement(_FormControl.default, {
    fullWidth: true,
    variant: "outlined",
    className: "".concat(classes.validationSelect, " mt-2")
  }, /*#__PURE__*/_react.default.createElement(_core.InputLabel, {
    id: "defaultSelect"
  }, "Validation"), /*#__PURE__*/_react.default.createElement(_core.Select, {
    id: "demo-customized-select-outlined",
    fullWidth: true,
    label: "Validation"
    // input={<BootstrapInput />}
    ,
    MenuProps: {
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "left"
      },
      getContentAnchorEl: null
    },
    value: customOptions.validationType,
    onChange: function onChange(e) {
      return props.setValidationType(e.target.value);
    }
  }, validationOptions.map(function (type, index) {
    return /*#__PURE__*/_react.default.createElement(_core.MenuItem, {
      value: type,
      key: type + "_option_" + index
    }, type);
  })))), ((_customOptions$editor3 = customOptions.editorMode) === null || _customOptions$editor3 === void 0 ? void 0 : _customOptions$editor3.toLowerCase()) !== 'rich_text' && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_core.Grid, {
    item: true,
    className: "my-3"
  }, !isDisabled && /*#__PURE__*/_react.default.createElement(_FormControl.default, {
    component: "fieldset",
    className: "mt-2"
  }, /*#__PURE__*/_react.default.createElement(_core.Grid, {
    container: true,
    justifyContent: "flex-start",
    alignItems: "center"
  }, /*#__PURE__*/_react.default.createElement(_core.Grid, {
    item: true,
    className: "mr-2"
  }, /*#__PURE__*/_react.default.createElement("h6", {
    className: classes.subHeading
  }, "Entry Limit:")), /*#__PURE__*/_react.default.createElement(_core.FormControlLabel, {
    className: "p-0 m-0",
    size: "small",
    control: /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_core.Button, _defineProperty({
      variant: "outlined",
      className: classes.button,
      style: {
        outline: "none",
        textTransform: "capitalize"
      },
      color: customOptions.isLimitEntry ? "default" : "primary",
      size: "small",
      onClick: function onClick(e) {
        return props.editElementCustomOptionsProp('isLimitEntry', false, e);
      },
      name: "no"
    }, "className", "ml-2 mr-2"), /*#__PURE__*/_react.default.createElement("span", null, "No"), /*#__PURE__*/_react.default.createElement(_core.Checkbox, {
      size: "small",
      className: "p-0 ml-1",
      color: "primary",
      name: "no",
      icon: /*#__PURE__*/_react.default.createElement(_RadioButtonUnchecked.default, {
        className: "checkboxSize"
      }),
      checked: customOptions.isLimitEntry ? false : true,
      checkedIcon: /*#__PURE__*/_react.default.createElement(_CheckCircle.default, {
        className: "checkboxSize"
      })
    })), /*#__PURE__*/_react.default.createElement(_core.Button, _defineProperty({
      variant: "outlined",
      size: "small",
      className: classes.button,
      style: {
        outline: "none",
        textTransform: "capitalize"
      },
      color: customOptions.isLimitEntry ? "primary" : "default",
      onClick: function onClick(e) {
        return props.editElementCustomOptionsProp('isLimitEntry', true, e);
      },
      name: "yes"
    }, "className", "ml-2 mr-2"), /*#__PURE__*/_react.default.createElement("span", null, "Yes"), /*#__PURE__*/_react.default.createElement(_core.Checkbox, {
      size: "small",
      className: "p-0 ml-1",
      color: "primary",
      name: "yes",
      icon: /*#__PURE__*/_react.default.createElement(_RadioButtonUnchecked.default, {
        className: "checkboxSize"
      }),
      checked: customOptions.isLimitEntry ? true : false,
      checkedIcon: /*#__PURE__*/_react.default.createElement(_CheckCircle.default, {
        className: "checkboxSize"
      })
    })))
  })))), customOptions.isLimitEntry ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, !isDisabled && /*#__PURE__*/_react.default.createElement(_core.Grid, {
    container: true,
    justifyContent: "space-between",
    className: "my-2"
  }, /*#__PURE__*/_react.default.createElement(_core.Grid, {
    item: true,
    xs: 12,
    sm: 6
  }, /*#__PURE__*/_react.default.createElement(_core.TextField, {
    className: "pr-3",
    type: "number",
    variant: "outlined",
    fullWidth: true,
    label: "Min Limit",
    error: minValError,
    inputProps: {
      min: 0,
      max: customOptions.max
    },
    onKeyPress: function onKeyPress(data) {
      if (data.charCode === 45) {
        data.preventDefault();
      }
    },
    defaultValue: customOptions.min,
    onChange: function onChange(e) {
      if (e.target.value > customOptions.max) {
        setMinValueError(true);
        setMaxValueError(false);
      } else {
        setMinValueError(false);
        setMaxValueError(false);
      }
      props.setNumberLimit('min', e.target.value);
    }
    // helperText="Minimum"
  })), /*#__PURE__*/_react.default.createElement(_core.Grid, {
    item: true,
    xs: 12,
    sm: 6
  }, /*#__PURE__*/_react.default.createElement(_core.TextField, {
    className: "pl-1",
    type: "number",
    variant: "outlined",
    label: "Max Limit",
    fullWidth: true
    // style={{marginLeft:"10px"}}
    ,
    inputProps: {
      min: 1
    },
    error: maxValError,
    onKeyPress: function onKeyPress(data) {
      if (data.charCode === 45) {
        data.preventDefault();
      }
    },
    defaultValue: customOptions.max,
    onChange: function onChange(e) {
      if (e.target.value < customOptions.min) {
        setMaxValueError(true);
      } else {
        setMaxValueError(false);
        setMinValueError(false);
      }
      props.setNumberLimit('max', e.target.value);
    }
    // helperText="Maximum"
  }))), !isDisabled && /*#__PURE__*/_react.default.createElement(_core.Grid, {
    item: true,
    xs: 12,
    sm: 12,
    className: "my-2"
  }, /*#__PURE__*/_react.default.createElement(_FormControl.default, {
    fullWidth: true,
    variant: "outlined",
    className: classes.formControl
  }, /*#__PURE__*/_react.default.createElement(_core.InputLabel, {
    id: "defaultSelect"
  }, "Type"), /*#__PURE__*/_react.default.createElement(_core.Select, {
    id: "demo-customized-select-outlined",
    fullWidth: true,
    value: customOptions.limitType
    //input={<BootstrapInput />}
    ,
    MenuProps: {
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "left"
      },
      getContentAnchorEl: null
    },
    label: "Type",
    onChange: function onChange(e) {
      return props.editElementCustomOptionsProp('limitType', 'value', e);
    }
  }, limitTypeOptions && limitTypeOptions.map(function (limitOption, index) {
    return /*#__PURE__*/_react.default.createElement(_core.MenuItem, {
      key: limitOption + index,
      value: limitOption
    }, limitOption);
  }))))) : /*#__PURE__*/_react.default.createElement(_core.Grid, {
    item: true,
    xs: 12,
    sm: 9
  })));
}
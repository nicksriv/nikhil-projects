"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ShortTextOptions;
var _react = _interopRequireWildcard(require("react"));
var _core = require("@material-ui/core");
var _MenuItem = _interopRequireDefault(require("@material-ui/core/MenuItem"));
var _InputLabel = _interopRequireDefault(require("@material-ui/core/InputLabel"));
var _FormControl = _interopRequireDefault(require("@material-ui/core/FormControl"));
var _Select = _interopRequireDefault(require("@material-ui/core/Select"));
var _Info = _interopRequireDefault(require("@material-ui/icons/Info"));
var _CheckCircle = _interopRequireDefault(require("@material-ui/icons/CheckCircle"));
var _RadioButtonUnchecked = _interopRequireDefault(require("@material-ui/icons/RadioButtonUnchecked"));
var _DialogTitle = _interopRequireDefault(require("@material-ui/core/DialogTitle"));
var _styles = require("@material-ui/core/styles");
var _Search = _interopRequireDefault(require("@material-ui/icons/Search"));
var _Close = _interopRequireDefault(require("@material-ui/icons/Close"));
var _Add = _interopRequireDefault(require("@material-ui/icons/Add"));
var _DialogContent = _interopRequireDefault(require("@material-ui/core/DialogContent"));
var _excluded = ["children", "classes", "onClose"];
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
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var useStyles = (0, _styles.makeStyles)(function (theme) {
  return {
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120
    },
    selectEmpty: {
      marginTop: theme.spacing(2)
    },
    subHeading: {
      opacity: "0.6",
      fontSize: "16px",
      fontWeight: "normal",
      display: "inline"
    },
    button: {
      height: "28px"
      // outline: "none",
      // textTransform: 'capatalize'
    },

    tooltip: {
      fontFamily: "SF Pro",
      fontSize: "12px"
    },
    icon: {
      "&:hover": {
        color: "#2C3E93"
      }
    },
    broweseIcon: {
      backgroundColor: 'white',
      width: '66%',
      height: '70px',
      marginLeft: '-20px',
      display: 'block',
      // WebGLTransformFeedback: "keep-all",
      textAlign: 'center',
      // borderStyle: 'dotted',
      position: 'relative',
      color: 'grey',
      top: '-10px',
      left: '0',
      borderStyle: 'dotted',
      borderWidth: '2px',
      '&:hover': {
        color: ' black',
        backgroundColor: '#F7F8FC',
        border: '1px solid black'
      },
      '&:active': {
        color: ' #2C3E93',
        backgroundColor: '#F7F8FC',
        border: '1px solid #2C3E93'
      },
      '&:visited': {
        color: ' #2C3E93',
        backgroundColor: '#F7F8FC',
        border: '1px solid #2C3E93'
      }
    },
    broweseIcon1: {
      width: '66%',
      height: '70px',
      marginLeft: '-20px',
      display: 'block',
      textAlign: 'center',
      position: 'relative',
      top: '-10px',
      left: '0',
      color: ' #2C3E93',
      backgroundColor: '#F7F8FC',
      border: '1px solid #2C3E93'
    },
    dialogTitle: {
      backgroundColor: '#2C3E93',
      color: '#000000DE',
      height: '49px',
      padding: '3px'
    },
    dialogPaper: {
      height: '400px',
      width: '350px',
      position: 'relative',
      top: '16px',
      left: '140px'
    },
    selectIcon: {
      marginLeft: '300px',
      marginTop: '-59px',
      color: '#00000099',
      padding: '5px'
    },
    lastButton: {
      position: 'sticky',
      bottom: 0,
      backgroundColor: 'white'
    },
    text1: {
      display: 'inline',
      opacity: 0.6,
      fontSize: '16px',
      fontWeight: "normal"
    },
    browseIcon: {
      display: 'block',
      padding: '0 3rem',
      border: '1px dashed rgb(128,128,128,.5)',
      opacity: "0.7"
    },
    iconGrid: {
      marginTop: '5px',
      padding: '3px',
      maxHeight: '65%',
      overflowY: 'scroll',
      '&::-webkit-scrollbar': {
        width: '0em'
      }
    },
    list1: {
      marginTop: '-15px',
      opacity: '0.6',
      fontSize: '1rem'
    },
    iconContainer: {
      position: 'relative',
      border: '1px solid rgba(0,0,0,0.1)',
      padding: '0.6rem',
      margin: '0.8rem'
    },
    iconhover: {
      position: 'relative',
      padding: '0.6rem',
      margin: '0.8rem',
      cursor: 'pointer',
      '&:hover': {
        border: '1px solid rgba(0,0,0,0.3)',
        padding: '0.6rem',
        cursor: 'pointer',
        margin: '0.8rem'
      }
    },
    selectedIconBox: {
      border: '1px solid #2C3E93',
      position: 'relative',
      padding: '0.6rem',
      cursor: 'pointer',
      margin: '0.8rem'
    },
    checkboxShow: {
      display: 'block',
      position: 'absolute',
      bottom: '0.8rem',
      right: '-0.5rem',
      paddingBottom: '1.1rem'
    },
    checkboxHide: {
      display: 'none'
    },
    symbol1: {
      color: 'black'
    },
    titleBrowsePopup: {
      display: 'inline',
      paddingLeft: '10px'
    },
    titletext: {
      fontWeight: 500
    }
  };
});
function ShortTextOptions(props) {
  var _this = this;
  var inputProps = {
    type: "dropdown"
  };
  var validationOptions = [{
    value: "Alphabetic",
    key: "alphabetic"
  }, {
    value: "AlphaNumeric",
    key: "alphaNumeric"
  }, {
    value: "Currency",
    key: "currency"
  },
  // {
  //     value: "Cyrillic",
  //     key: "cyrillic"
  // },
  {
    value: "Email",
    key: "email"
  }, {
    value: "Numeric",
    key: "numeric"
  }, {
    value: "URL",
    key: "url"
  }];
  var icons = [{
    id: 0,
    icon: 'event_seat',
    iconName: "Event seat"
  }, {
    id: 1,
    icon: 'date_range',
    iconName: "Date range"
  }, {
    id: 2,
    icon: 'calendar_today',
    iconName: "Calender today"
  }, {
    id: 3,
    icon: 'event_busy',
    iconName: "Event busy"
  },
  // {
  //     id: 4,
  //     icon: 'no_accounts',
  //     iconName: "No account"
  // },
  {
    id: 5,
    icon: 'pending_actions',
    iconName: "Pendding actions"
  }, {
    id: 6,
    icon: 'analytics',
    iconName: "analytics"
  }, {
    id: 7,
    icon: 'stars',
    iconName: "stars"
  }, {
    id: 8,
    icon: 'person',
    iconName: "person"
  }, {
    id: 9,
    icon: 'settings',
    iconName: "settings"
  }, {
    id: 10,
    icon: 'home_work',
    iconName: "home work"
  }, {
    id: 11,
    icon: 'find_in_page',
    iconName: "find in page"
  }, {
    id: 12,
    icon: 'event_available',
    iconName: "event available"
  }, {
    id: 13,
    icon: 'face',
    iconName: "face"
  }, {
    id: 14,
    icon: 'group_add',
    iconName: "group add"
  }, {
    id: 15,
    icon: 'group_work',
    iconName: "group work"
  }];
  var reportSelected = function reportSelected(event) {
    _this.setState(function () {
      return {
        report: event.target.value
      };
    });
  };
  var styles = function styles(theme) {
    return {
      root: {
        margin: 0,
        padding: theme.spacing(2)
      }
    };
  };
  var DialogTitle = (0, _styles.withStyles)(styles)(function (props) {
    var children = props.children,
      classes = props.classes,
      onClose = props.onClose,
      other = _objectWithoutProperties(props, _excluded);
    return /*#__PURE__*/_react.default.createElement(_DialogTitle.default, _extends({
      disableTypography: true,
      className: classes.root
    }, other), /*#__PURE__*/_react.default.createElement(_core.Typography, null, children), onClose ? /*#__PURE__*/_react.default.createElement(_core.IconButton, {
      "aria-label": "close",
      className: classes.close,
      onClick: onClose
    }, /*#__PURE__*/_react.default.createElement(_Close.default, null)) : null);
  });
  var DialogContent = (0, _styles.withStyles)(function (theme) {
    return {
      root: {
        padding: theme.spacing(2)
      }
    };
  })(_DialogContent.default);
  var classes = useStyles();
  var _React$useState = _react.default.useState(false),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    open = _React$useState2[0],
    setOpen = _React$useState2[1];
  var _React$useState3 = _react.default.useState(false),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    clickedIcon = _React$useState4[0],
    setClickedIcon = _React$useState4[1];
  var _React$useState5 = _react.default.useState(''),
    _React$useState6 = _slicedToArray(_React$useState5, 2),
    selectIcon = _React$useState6[0],
    setSelectIcon = _React$useState6[1];
  var _React$useState7 = _react.default.useState(null),
    _React$useState8 = _slicedToArray(_React$useState7, 2),
    selectIconIndex = _React$useState8[0],
    setSelectIconIndex = _React$useState8[1];
  var _React$useState9 = _react.default.useState(false),
    _React$useState10 = _slicedToArray(_React$useState9, 2),
    hover = _React$useState10[0],
    setHover = _React$useState10[1];
  var _React$useState11 = _react.default.useState(null),
    _React$useState12 = _slicedToArray(_React$useState11, 2),
    hoverIcon = _React$useState12[0],
    setHoverIcon = _React$useState12[1];
  var helpertext = "Restrict users to match the format you specify.\n    Use @ symbol to mask letters, # for numbers and * for both.\n    Example: #@-#**#-#@";
  var _React$useState13 = _react.default.useState([]),
    _React$useState14 = _slicedToArray(_React$useState13, 2),
    searchedIcons = _React$useState14[0],
    setsearchedIcons = _React$useState14[1];
  var _React$useState15 = _react.default.useState(''),
    _React$useState16 = _slicedToArray(_React$useState15, 2),
    searchedText = _React$useState16[0],
    setsearchedText = _React$useState16[1];

  //const [searchTerm, setsearchTerm] = React.useState("")

  (0, _react.useEffect)(function () {
    setsearchedIcons(icons);
  }, []);
  var isMasked = props.element.customOptions.hasOwnProperty("isMasked") ? props.element.customOptions.isMasked : false;
  var checkedIcon = props.element.customOptions.selectedIcons;
  var isDisabled = props.element.customOptions.isFieldDisabled;
  var handleIconOpen = function handleIconOpen() {
    setOpen(true);
  };
  var handlePopup = function handlePopup() {
    setOpen(false);
  };
  var iconSelect = function iconSelect(e, x, index) {
    props.element.customOptions.selectedIcons = x.icon;
    props.element.customOptions.selectedIconsMobile = x.icon.split("_").join("-");
    setSelectIcon(x.icon);
    setClickedIcon(true);
    setSelectIconIndex(index);
    handleInputChange({
      target: {
        name: 'icon',
        value: x.icon
      }
    });
  };
  // const selectedIcon = () => {
  //     setOpen(false);
  // }
  var handleHover = function handleHover(index) {
    setHover(true);
    setHoverIcon(index);
  };
  // const handleInputChange = (e) => {
  //     console.log(e.target.value)
  // }

  var searchIcons = function searchIcons(event) {
    var iconSearched = icons.filter(function (item) {
      return item.iconName.toLowerCase().includes(event.target.value);
    });
    // console.log(iconSearched);
    // console.log(event.target);
    setsearchedIcons(iconSearched);
    setsearchedText(event.target.value);
  };
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, !isDisabled && /*#__PURE__*/_react.default.createElement(_core.FormGroup, null, /*#__PURE__*/_react.default.createElement(_FormControl.default, {
    fullWidth: true,
    variant: "outlined",
    className: "my-3"
  }, /*#__PURE__*/_react.default.createElement(_InputLabel.default, {
    id: "defaultSelect"
  }, "Validations"), /*#__PURE__*/_react.default.createElement(_Select.default, {
    labelId: "defaultSelect",
    id: "defaultSelect",
    label: "Validations",
    defaultValue: "none",
    value: props.element.customOptions.validation,
    onChange: function onChange(event) {
      return props.setValidationOptions(event);
    },
    MenuProps: {
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "left"
      },
      getContentAnchorEl: null
    }
  }, /*#__PURE__*/_react.default.createElement(_MenuItem.default, {
    value: "none"
  }, " None "), validationOptions.map(function (file) {
    return /*#__PURE__*/_react.default.createElement(_MenuItem.default, {
      key: file.key,
      value: file.value
    }, " ", file.value, " ");
  })))), /*#__PURE__*/_react.default.createElement(_core.List, {
    dense: true
  }, /*#__PURE__*/_react.default.createElement(_core.ListItem, {
    style: {
      padding: '0'
    }
  }, /*#__PURE__*/_react.default.createElement(_core.ListItemText, {
    className: classes.list1
  }, "Icon as Suffix:"), /*#__PURE__*/_react.default.createElement(_core.Button, {
    className: checkedIcon === '' ? classes.broweseIcon : classes.broweseIcon1,
    variant: "outlined",
    onClick: handleIconOpen
  }, /*#__PURE__*/_react.default.createElement(_core.Icon, {
    className: classes.symbol1
  }, checkedIcon && !open ? checkedIcon : /*#__PURE__*/_react.default.createElement(_Add.default, null)), /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement("span", null, checkedIcon && !open ? '' : 'BROWSE ICON')), /*#__PURE__*/_react.default.createElement(_core.Dialog, {
    style: {
      background: 'rgba(0,0,0,0.5)'
    },
    "aria-labelledby": "customized-dialog-title",
    open: open,
    onClose: handlePopup,
    classes: {
      paper: classes.dialogPaper
    }
  }, /*#__PURE__*/_react.default.createElement(DialogTitle, {
    id: "customized-dialog-title",
    className: classes.dialogTitle
  }, /*#__PURE__*/_react.default.createElement("h6", {
    className: "".concat(classes.titletext, " mx-4 my-3 ")
  }, "Browse Icon"), /*#__PURE__*/_react.default.createElement(_core.IconButton, {
    onClick: handlePopup,
    className: classes.selectIcon
  }, /*#__PURE__*/_react.default.createElement(_Close.default, {
    style: {
      fontSize: '1.3rem'
    }
  }))), /*#__PURE__*/_react.default.createElement(DialogContent, null, /*#__PURE__*/_react.default.createElement(_core.Typography, {
    gutterBottom: true
  }, /*#__PURE__*/_react.default.createElement(_core.TextField, {
    fullWidth: true,
    type: "text",
    value: searchedText,
    label: "Search Icons",
    variant: "outlined",
    placeholder: "Search Icons",
    autoFocus: searchedText
    // onChange={handleInputChange}
    ,
    onChange: function onChange(event) {
      return searchIcons(event);
    }
    //InputLabelProps={{ shrink: true }}
    // onChange={e => { setsearchTerm(e.target.value) }}
    ,
    InputProps: {
      endAdornment: /*#__PURE__*/_react.default.createElement(_core.InputAdornment, null, /*#__PURE__*/_react.default.createElement(_core.IconButton, null, /*#__PURE__*/_react.default.createElement(_Search.default, null)))
    }
  })), /*#__PURE__*/_react.default.createElement(_core.Grid, {
    container: true,
    justify: "space-between ",
    alignItems: "center",
    className: classes.iconGrid
  }, searchedIcons.map(function (x, index) {
    return /*#__PURE__*/_react.default.createElement(_core.Grid, {
      item: true,
      md: 2,
      key: index,
      onMouseOver: function onMouseOver() {
        return handleHover(index);
      },
      onMouseLeave: function onMouseLeave() {
        return setHover(false);
      },
      onClick: function onClick(e) {
        return iconSelect(e, x, index);
      },
      className: "".concat(hover && hoverIcon === index ? classes.iconhover : clickedIcon && selectIconIndex === index ? classes.selectedIconBox : classes.iconContainer, " flex items-center justify-center h-50 p-4")
    }, /*#__PURE__*/_react.default.createElement(_core.Checkbox, {
      icon: /*#__PURE__*/_react.default.createElement(_RadioButtonUnchecked.default, {
        className: "h5"
      }),
      checkedIcon: /*#__PURE__*/_react.default.createElement(_CheckCircle.default, {
        className: "h5"
      }),
      size: "small",
      color: "primary",
      checked: clickedIcon && selectIconIndex === index ? true : false,
      className: hover && hoverIcon === index || clickedIcon && selectIconIndex === index ? classes.checkboxShow : classes.checkboxHide
    }), /*#__PURE__*/_react.default.createElement(_core.Icon, {
      className: "material-icons-two-tone",
      value: x.icon
    }, " ", x.icon, " "));
  }))), /*#__PURE__*/_react.default.createElement(_core.DialogActions, null, /*#__PURE__*/_react.default.createElement(_core.Button, {
    onClick: function onClick() {
      props.handleSelectedIcon(selectIcon);
      setOpen(false);
    },
    color: "primary",
    variant: "contained"
  }, "Submit"))))));
}
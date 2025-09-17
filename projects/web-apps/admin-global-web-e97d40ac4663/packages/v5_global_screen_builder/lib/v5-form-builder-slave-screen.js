"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _core = require("@material-ui/core");
var _Menu = _interopRequireDefault(require("@material-ui/icons/Menu"));
var _NotificationsNone = _interopRequireDefault(require("@material-ui/icons/NotificationsNone"));
var _ArrowBack = _interopRequireDefault(require("@material-ui/icons/ArrowBack"));
var _DesktopMac = _interopRequireDefault(require("@material-ui/icons/DesktopMac"));
var _TabletMac = _interopRequireDefault(require("@material-ui/icons/TabletMac"));
var _PhoneAndroid = _interopRequireDefault(require("@material-ui/icons/PhoneAndroid"));
var _styles = require("@material-ui/core/styles");
var _react = _interopRequireWildcard(require("react"));
var _materialForm = _interopRequireDefault(require("./materialForm"));
var _excluded = ["palette"];
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var useStyles = (0, _styles.makeStyles)(function (_ref) {
  var palette = _ref.palette,
    theme = _objectWithoutProperties(_ref, _excluded);
  return {
    logoClient: {
      //objectFit: 'contain',
      width: 'auto',
      height: '24px'
    },
    arrowIcon: {
      color: '#bbb',
      fontSize: '1.3rem'
    },
    editIcon: {
      color: '#9F9F9E',
      cursor: 'pointer'
    }
  };
});
var deviceViewsEnum = {
  MOBILE: 'mobile',
  TABLET: 'tablet',
  DESKTOP: 'desktop'
};
function V5FormBuilderSlaveScreen(props) {
  var _style;
  var open = props.open,
    handlePopUpClose = props.handlePopUpClose,
    handleTitleText = props.handleTitleText,
    downloadPath = props.downloadPath,
    answerData = props.answerData,
    actionName = props.actionName,
    formAction = props.formAction,
    formMethod = props.formMethod,
    hideActions = props.hideActions,
    skipValidations = props.skipValidations,
    onSubmit = props.onSubmit,
    isFormReadOnly = props.isFormReadOnly,
    isBootstrapItems = props.isBootstrapItems,
    imageUploadCallback = props.imageUploadCallback,
    data = props.data,
    workFlowData = props.workFlowData,
    fieldResult = props.fieldResult,
    fieldMedia = props.fieldMedia,
    generateBtnLabel = props.generateBtnLabel,
    collectFormData = props.collectFormData,
    getGeneratedJSON = props.getGeneratedJSON,
    photoPreview = props.photoPreview,
    closePreview = props.closePreview,
    clientLogo = props.clientLogo,
    ScreenSkeletonComponent = props.ScreenSkeletonComponent,
    internalScreensChecked = props.internalScreensChecked,
    masterScreensWorkflowData = props.masterScreensWorkflowData,
    screenTitle = props.screenTitle;
  var classes = useStyles();
  var _useState = (0, _react.useState)(''),
    _useState2 = _slicedToArray(_useState, 2),
    pageTitle = _useState2[0],
    setPageTitle = _useState2[1];
  var _useState3 = (0, _react.useState)(deviceViewsEnum.MOBILE),
    _useState4 = _slicedToArray(_useState3, 2),
    currentSelectedView = _useState4[0],
    setCurrentSelectedView = _useState4[1];
  var style = (_style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    //width: 300,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24
  }, _defineProperty(_style, "border", 'none !important'), _defineProperty(_style, "borderRadius", '2px'), _defineProperty(_style, "width", "".concat(currentSelectedView === deviceViewsEnum.MOBILE ? '360px' : currentSelectedView === deviceViewsEnum.TABLET ? '768px' : '992px')), _style);
  var closePopUp = function closePopUp() {
    if (open) {
      handlePopUpClose(true);
    }
  };
  var changePageTitle = function changePageTitle(e) {
    setPageTitle(e.target.value);
  };
  var handlePageTitle = function handlePageTitle(e) {
    handleTitleText(pageTitle);
    if (open) {
      handlePopUpClose(true);
    }
  };
  var handleDeviceView = function handleDeviceView(e, deviceView) {
    setCurrentSelectedView(deviceView);
  };
  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("div", {
    className: "v5-form-builder-preview",
    style: {
      maxHeight: '345px',
      height: '327px'
    }
  }, /*#__PURE__*/_react.default.createElement(_core.Grid, {
    container: true,
    justifyContent: "space-between",
    style: {
      color: '#bbb',
      padding: '0 9px',
      marginTop: '10px'
    }
  }, /*#__PURE__*/_react.default.createElement(_core.Grid, {
    item: true
  }, /*#__PURE__*/_react.default.createElement(_Menu.default, {
    color: "#fff",
    style: {
      marginRight: '5px'
    }
  }), /*#__PURE__*/_react.default.createElement("img", {
    className: "".concat(classes.logoClient),
    src: clientLogo,
    alt: "Logo"
    //style={{ marginRight: '10px' }}
  })), /*#__PURE__*/_react.default.createElement(_core.Grid, {
    item: true
  }, /*#__PURE__*/_react.default.createElement(_core.Avatar, {
    className: "cursor-pointer float-right",
    src: '/assets/images/face-6.jpg',
    style: {
      width: '30px',
      height: '30px'
    }
  }))), /*#__PURE__*/_react.default.createElement("div", {
    class: "hrcover "
  }, /*#__PURE__*/_react.default.createElement("hr", {
    class: "mt-1 mb-0"
  })), /*#__PURE__*/_react.default.createElement("div", {
    style: {
      padding: '0 9px',
      backgroundColor: '#F7F6FC'
    }
  }, /*#__PURE__*/_react.default.createElement(_core.Grid, {
    className: "flex items-center"
  }, /*#__PURE__*/_react.default.createElement(_ArrowBack.default, {
    className: "mr-3 ".concat(classes.arrowIcon),
    style: {
      marginLeft: '-4px'
    },
    onClick: closePopUp
  }), /*#__PURE__*/_react.default.createElement("h5", {
    className: "mt-3 mr-3"
  }, screenTitle)), data && data.length > 0 ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_materialForm.default, {
    download_path: downloadPath,
    disabled: true
    // back_action="/"
    // back_name="Back"
    ,
    answer_data: answerData,
    action_name: actionName,
    form_action: formAction,
    form_method: formMethod,
    hide_actions: hideActions,
    skip_validations: skipValidations,
    onSubmit: onSubmit,
    isFormReadOnly: isFormReadOnly,
    isBootstrapItems: isBootstrapItems,
    imageUploadCallback: imageUploadCallback
    // variables={this.props.variables}
    ,
    data: data,
    workFlowData: workFlowData,
    fieldResult: fieldResult,
    fieldMedia: fieldMedia,
    generateBtnLabel: generateBtnLabel,
    collectFormData: collectFormData,
    getGeneratedJSON: getGeneratedJSON,
    photoPreview: photoPreview,
    closePreview: closePreview,
    isFromMastersScreen: true,
    internalScreensChecked: internalScreensChecked,
    masterScreensWorkflowData: masterScreensWorkflowData
  })) : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(ScreenSkeletonComponent, null)))));
}
var _default = V5FormBuilderSlaveScreen;
exports.default = _default;
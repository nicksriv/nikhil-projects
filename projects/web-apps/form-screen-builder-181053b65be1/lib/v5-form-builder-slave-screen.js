"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

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

var useStyles = (0, _styles.makeStyles)(function (_ref) {
  var palette = _ref.palette,
      theme = (0, _objectWithoutProperties2["default"])(_ref, ["palette"]);
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
      _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
      pageTitle = _useState2[0],
      setPageTitle = _useState2[1];

  var _useState3 = (0, _react.useState)(deviceViewsEnum.MOBILE),
      _useState4 = (0, _slicedToArray2["default"])(_useState3, 2),
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
  }, (0, _defineProperty2["default"])(_style, "border", 'none !important'), (0, _defineProperty2["default"])(_style, "borderRadius", '2px'), (0, _defineProperty2["default"])(_style, "width", "".concat(currentSelectedView === deviceViewsEnum.MOBILE ? '360px' : currentSelectedView === deviceViewsEnum.TABLET ? '768px' : '992px')), _style);

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

  return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("div", {
    className: "v5-form-builder-preview",
    style: {
      maxHeight: '345px',
      height: '327px'
    }
  }, /*#__PURE__*/_react["default"].createElement(_core.Grid, {
    container: true,
    justifyContent: "space-between",
    style: {
      color: '#bbb',
      padding: '0 9px',
      marginTop: '10px'
    }
  }, /*#__PURE__*/_react["default"].createElement(_core.Grid, {
    item: true
  }, /*#__PURE__*/_react["default"].createElement(_Menu["default"], {
    color: "#fff",
    style: {
      marginRight: '5px'
    }
  }), /*#__PURE__*/_react["default"].createElement("img", {
    className: "".concat(classes.logoClient),
    src: clientLogo,
    alt: "Logo" //style={{ marginRight: '10px' }}

  })), /*#__PURE__*/_react["default"].createElement(_core.Grid, {
    item: true
  }, /*#__PURE__*/_react["default"].createElement(_core.Avatar, {
    className: "cursor-pointer float-right",
    src: '/assets/images/face-6.jpg',
    style: {
      width: '30px',
      height: '30px'
    }
  }))), /*#__PURE__*/_react["default"].createElement("div", {
    "class": "hrcover "
  }, /*#__PURE__*/_react["default"].createElement("hr", {
    "class": "mt-1 mb-0"
  })), /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      padding: '0 9px',
      backgroundColor: '#F7F6FC'
    }
  }, /*#__PURE__*/_react["default"].createElement(_core.Grid, {
    className: "flex items-center"
  }, /*#__PURE__*/_react["default"].createElement(_ArrowBack["default"], {
    className: "mr-3 ".concat(classes.arrowIcon),
    style: {
      marginLeft: '-4px'
    },
    onClick: closePopUp
  }), /*#__PURE__*/_react["default"].createElement("h5", {
    className: "mt-3 mr-3"
  }, screenTitle)), data && data.length > 0 ? /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_materialForm["default"], {
    download_path: downloadPath,
    disabled: true // back_action="/"
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
    imageUploadCallback: imageUploadCallback // variables={this.props.variables}
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
  })) : /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(ScreenSkeletonComponent, null)))));
}

var _default = V5FormBuilderSlaveScreen;
exports["default"] = _default;
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

var _ArrowBack = _interopRequireDefault(require("@material-ui/icons/ArrowBack"));

var _DesktopMac = _interopRequireDefault(require("@material-ui/icons/DesktopMac"));

var _TabletMac = _interopRequireDefault(require("@material-ui/icons/TabletMac"));

var _PhoneAndroid = _interopRequireDefault(require("@material-ui/icons/PhoneAndroid"));

var _styles = require("@material-ui/core/styles");

var _react = _interopRequireWildcard(require("react"));

var _materialForm = _interopRequireDefault(require("./materialForm"));

var _NotificationsNone = _interopRequireDefault(require("@material-ui/icons/NotificationsNone"));

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
      color: '#626364',
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

function V5FormBuilderPreviewPopup(props) {
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
      fieldResult = props.fieldResult,
      fieldMedia = props.fieldMedia,
      generateBtnLabel = props.generateBtnLabel,
      collectFormData = props.collectFormData,
      getGeneratedJSON = props.getGeneratedJSON,
      photoPreview = props.photoPreview,
      closePreview = props.closePreview,
      clientLogo = props.clientLogo,
      screenName = props.screenName;
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
  }, (0, _defineProperty2["default"])(_style, "border", 'none !important'), (0, _defineProperty2["default"])(_style, "borderRadius", '4px'), (0, _defineProperty2["default"])(_style, "width", "".concat(currentSelectedView === deviceViewsEnum.MOBILE ? '360px' : currentSelectedView === deviceViewsEnum.TABLET ? '768px' : '992px')), _style);

  var closePopUp = function closePopUp() {
    if (open) {
      handlePopUpClose(true);
    }

    props.data.map(function (x, index) {
      if (x.customOptions.recordedVideo !== undefined) {
        x.customOptions.recordedVideo = "";
      }
    });
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

  return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(_core.Modal, {
    open: open,
    onClose: closePopUp,
    "aria-labelledby": "modal-modal-title",
    "aria-describedby": "modal-modal-description",
    style: {
      backgroundColor: 'rgba(0,0,0,0.6)'
    }
  }, /*#__PURE__*/_react["default"].createElement(_core.Box, {
    sx: style
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "v5-form-builder-preview"
  }, /*#__PURE__*/_react["default"].createElement(_core.Grid, {
    container: true,
    justifyContent: "space-between",
    className: "py-2 px-3"
  }, /*#__PURE__*/_react["default"].createElement(_core.Grid, {
    item: true,
    style: {
      alignSelf: 'center',
      display: 'inline'
    }
  }, /*#__PURE__*/_react["default"].createElement(_Menu["default"], {
    color: "#00000099",
    style: {
      marginRight: '20px',
      fontSize: '28px'
    }
  }), clientLogo ? /*#__PURE__*/_react["default"].createElement("img", {
    className: "".concat(classes.logoClient),
    src: clientLogo,
    alt: "Logo" //style={{ marginRight: '10px' }}

  }) : null, /*#__PURE__*/_react["default"].createElement(_NotificationsNone["default"], {
    style: {
      marginLeft: '10rem',
      opacity: '20%'
    },
    className: "cursor-pointer p-0",
    fontSize: "small"
  })), /*#__PURE__*/_react["default"].createElement(_core.Grid, {
    item: true
  }, /*#__PURE__*/_react["default"].createElement(_core.Avatar, {
    className: "cursor-pointer float-right",
    src: '/assets/images/face-6.jpg'
  }))), /*#__PURE__*/_react["default"].createElement("div", {
    "class": "hrcover "
  }, /*#__PURE__*/_react["default"].createElement("hr", {
    style: {
      margin: '0'
    }
  })), /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      padding: '0 14px',
      backgroundColor: '#F6F6FD'
    }
  }, /*#__PURE__*/_react["default"].createElement(_core.Grid, {
    className: "flex items-center"
  }, /*#__PURE__*/_react["default"].createElement(_ArrowBack["default"], {
    className: "".concat(classes.arrowIcon),
    onClick: closePopUp
  }), /*#__PURE__*/_react["default"].createElement("h4", {
    className: "mt-3 mr-3 pl-4",
    style: {
      fontWeight: 'normal'
    }
  }, screenName === "" ? "Check-In" : screenName)), /*#__PURE__*/_react["default"].createElement(_materialForm["default"], {
    download_path: downloadPath // back_action="/"
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
    fieldResult: fieldResult,
    fieldMedia: fieldMedia,
    generateBtnLabel: generateBtnLabel,
    collectFormData: collectFormData,
    getGeneratedJSON: getGeneratedJSON,
    photoPreview: photoPreview,
    closePreview: closePreview
  }))), /*#__PURE__*/_react["default"].createElement("hr", {
    style: {
      marginLeft: '-23px',
      marginRight: '-23px'
    },
    className: "my-0"
  }), /*#__PURE__*/_react["default"].createElement(_core.Grid, {
    container: true,
    justifyContent: "space-between",
    className: "py-3 px-1"
  }, /*#__PURE__*/_react["default"].createElement(_core.Grid, {
    item: true,
    className: "ml-3",
    style: {
      alignSelf: 'center'
    }
  }, /*#__PURE__*/_react["default"].createElement(_DesktopMac["default"] //onClick={(e) => handleDeviceView(e, deviceViewsEnum.DESKTOP)}
  , {
    className: "cursor-pointer",
    style: {
      marginRight: '10px',
      color: "".concat(currentSelectedView === deviceViewsEnum.DESKTOP ? '#50BFB7' : '#bbb')
    }
  }), /*#__PURE__*/_react["default"].createElement(_TabletMac["default"] //onClick={(e) => handleDeviceView(e, deviceViewsEnum.TABLET)}
  , {
    className: "cursor-pointer",
    style: {
      marginRight: '10px',
      color: "".concat(currentSelectedView === deviceViewsEnum.TABLET ? '#50BFB7' : '#bbb')
    }
  }), /*#__PURE__*/_react["default"].createElement(_PhoneAndroid["default"], {
    onClick: function onClick(e) {
      return handleDeviceView(e, deviceViewsEnum.MOBILE);
    },
    className: "cursor-pointer",
    style: {
      marginRight: '10px',
      color: "".concat(currentSelectedView === deviceViewsEnum.MOBILE ? '#50BFB7' : '#bbb')
    }
  })), /*#__PURE__*/_react["default"].createElement(_core.Grid, {
    item: true,
    className: "mr-2"
  }, /*#__PURE__*/_react["default"].createElement(_core.Button, {
    variant: "contained",
    color: "primary",
    onClick: closePopUp
  }, "CLOSE"))))));
}

var _default = V5FormBuilderPreviewPopup;
exports["default"] = _default;
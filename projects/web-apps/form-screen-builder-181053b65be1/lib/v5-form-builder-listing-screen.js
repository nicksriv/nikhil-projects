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

var _CheckCircle = _interopRequireDefault(require("@material-ui/icons/CheckCircle"));

var _Cancel = _interopRequireDefault(require("@material-ui/icons/Cancel"));

var _styles = require("@material-ui/core/styles");

var _react = _interopRequireWildcard(require("react"));

var _styles2 = require("@material-ui/styles");

var _materialForm = _interopRequireDefault(require("./materialForm"));

var _MoreVert = _interopRequireDefault(require("@material-ui/icons/MoreVert"));

var useStyles = (0, _styles.makeStyles)(function (_ref) {
  var palette = _ref.palette,
      theme = (0, _objectWithoutProperties2["default"])(_ref, ["palette"]);
  return {
    root: {
      '& .MuiTable-root': {// width: "auto",
      },
      '& .MuiTableCell-root': {
        wordBreak: 'normal'
      },
      '& .MuiIconButton-root': {
        padding: '0px 3px'
      },
      '& .makeStyles-Paper-10': {
        padding: 0
      },
      '& .MuiTableCell-sizeSmall': {
        padding: '6px 3px',
        fontSize: '9px',
        fontWeight: 600,
        textAlign: 'center'
      },
      '& .MuiTableHead-root': {
        backgroundColor: '#dce2f4'
      }
    },
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
    },
    Paper: {
      border: 'none',
      width: '100%',
      // padding: "1rem",
      visibility: 'none',
      '&::-webkit-scrollbar': {
        width: 0
      },
      textAlign: 'left'
    },
    // tableRow: {
    //     padding: "8px 20px !important",
    // },
    dataTableStyle: {
      backgroundColor: '#efefef'
    }
  };
});
var StyledTableRow = (0, _styles2.styled)(_core.TableRow)(function (_ref2) {
  var theme = _ref2.theme;
  return {
    '&:nth-of-type(even)': {
      backgroundColor: 'lightgray',
      borderLeft: '15px solid white',
      borderRight: '15px solid white'
    },
    '&:nth-of-type(odd)': {
      backgroundColor: '#F8FDFD',
      borderLeft: '15px solid white',
      borderRight: '15px solid white'
    }
  };
});
var deviceViewsEnum = {
  MOBILE: 'mobile',
  TABLET: 'tablet',
  DESKTOP: 'desktop'
};

function V5FormBuilderListingScreen(props) {
  var _style;

  var header = props.header,
      tableHeaders = props.tableHeaders,
      data = props.data,
      workFlowData = props.workFlowData,
      clientLogo = props.clientLogo;
  var classes = useStyles();

  var _useState = (0, _react.useState)(deviceViewsEnum.MOBILE),
      _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
      currentSelectedView = _useState2[0],
      setCurrentSelectedView = _useState2[1];

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
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: classes.root
  }, /*#__PURE__*/_react["default"].createElement("div", {
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
      display: 'flex',
      alignItem: 'center',
      justifyContent: 'space-between',
      backgroundColor: 'ghostwhite',
      padding: '5px 9px'
    }
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex align-middle"
  }, /*#__PURE__*/_react["default"].createElement("h6", null, header)), /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'row',
      marginTop: '-4px'
    }
  }, /*#__PURE__*/_react["default"].createElement(_core.Tooltip, {
    title: "Add Data"
  }, /*#__PURE__*/_react["default"].createElement(_core.IconButton, {
    "aria-label": "Upload Data",
    component: "span" // onClick={iconClickHandler}

  }, /*#__PURE__*/_react["default"].createElement("img", {
    src: "/assets/images/icons/add_Component.svg",
    width: "15px"
  }))), /*#__PURE__*/_react["default"].createElement(_core.Tooltip, {
    title: "Filter"
  }, /*#__PURE__*/_react["default"].createElement(_core.IconButton, {
    "aria-label": "Upload Data",
    component: "span" // onClick={iconClickHandler}

  }, /*#__PURE__*/_react["default"].createElement("img", {
    src: "/assets/images/icons/filter_alt.svg",
    width: "15px"
  }))))), /*#__PURE__*/_react["default"].createElement(_core.TableContainer, {
    className: "".concat(classes.Paper),
    component: _core.Paper
  }, /*#__PURE__*/_react["default"].createElement(_core.Table, {
    size: "small",
    "aria-label": "simple table"
  }, /*#__PURE__*/_react["default"].createElement(_core.TableHead, null, /*#__PURE__*/_react["default"].createElement(_core.TableRow, {
    style: {
      backgroundColor: 'white'
    }
  }, tableHeaders.map(function (heading) {
    return heading.key === 'actionHeader' ? /*#__PURE__*/_react["default"].createElement(_core.TableCell, {
      component: "th",
      key: heading.key
    }, /*#__PURE__*/_react["default"].createElement(_MoreVert["default"], {
      fontSize: "small"
    })) : /*#__PURE__*/_react["default"].createElement(_core.TableCell, {
      component: "th",
      key: heading.key
    }, heading.name);
  }))), /*#__PURE__*/_react["default"].createElement(_core.TableBody, null, data.map(function (data, index) {
    return /*#__PURE__*/_react["default"].createElement(StyledTableRow, {
      key: index
    }, /*#__PURE__*/_react["default"].createElement(_core.TableCell, {
      className: classes.tableRow
    }), /*#__PURE__*/_react["default"].createElement(_core.TableCell, {
      className: classes.tableRow
    }), /*#__PURE__*/_react["default"].createElement(_core.TableCell, {
      className: classes.tableRow
    }), /*#__PURE__*/_react["default"].createElement(_core.TableCell, {
      className: classes.tableRow
    }), /*#__PURE__*/_react["default"].createElement(_core.TableCell, {
      className: "".concat(classes.tableRow, " ").concat(index % 2 == 1 && workFlowData.isDatatableChecked ? classes.dataTableStyle : null)
    }, index % 2 == 1 && workFlowData.isDatatableChecked && /*#__PURE__*/_react["default"].createElement("div", {
      style: {
        display: 'flex'
      }
    }, /*#__PURE__*/_react["default"].createElement(_Cancel["default"], {
      style: {
        fontSize: '0.75rem',
        color: '#B00020'
      },
      className: "mr-1"
    }), /*#__PURE__*/_react["default"].createElement(_CheckCircle["default"], {
      className: "color-primary",
      style: {
        fontSize: '0.75rem'
      }
    }))));
  }))))));
}

var _default = V5FormBuilderListingScreen;
exports["default"] = _default;
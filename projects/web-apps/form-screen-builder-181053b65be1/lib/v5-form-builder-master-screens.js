"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _core = require("@material-ui/core");

var _ZoomIn = _interopRequireDefault(require("@material-ui/icons/ZoomIn"));

var _ZoomOut = _interopRequireDefault(require("@material-ui/icons/ZoomOut"));

var _styles = require("@material-ui/core/styles");

var _Edit = _interopRequireDefault(require("@material-ui/icons/Edit"));

var _v5FormBuilderSlaveScreen = _interopRequireDefault(require("./v5-form-builder-slave-screen"));

var _v5FormBuilderListingScreen = _interopRequireDefault(require("./v5-form-builder-listing-screen"));

var _reactZoomPanPinch = require("react-zoom-pan-pinch");

var _simpleContextMenu = _interopRequireDefault(require("simple-context-menu"));

var _PanTool = _interopRequireDefault(require("@material-ui/icons/PanTool"));

var _PanToolTwoTone = _interopRequireDefault(require("@material-ui/icons/PanToolTwoTone"));

var _formPlaceHolder = _interopRequireDefault(require("./form-place-holder"));

var _store = _interopRequireDefault(require("./stores/store"));

var _v5FormBuilderMasterScreensHeader = _interopRequireDefault(require("./v5-form-builder-master-screens-header"));

var useStyles = (0, _styles.makeStyles)(function (theme) {
  return {
    child: {
      backgroundColor: '#FFFFFF',
      width: '15vw',
      height: '50vh',
      "&:hover": {
        border: '1px solid #50BFB7'
      }
    },
    container: {
      width: '100%',
      //height: '80%',
      //padding: '2%',
      position: 'relative'
    },
    parent: {
      backgroundColor: '#DDDDE3',
      //width: '60%',
      // height:'70vh',
      position: 'relative',
      padding: '1rem',
      paddingLeft: '50px',
      flexWrap: 'wrap' //margin:'auto'

    },
    icon: {
      margin: 0,
      position: 'relative',
      // left:'10rem',
      // bottom:'53vh',
      // paddingTop:'0.5rem',
      right: '1.4rem',
      bottom: '1.4rem'
    },
    button: {
      display: 'inline-block',
      position: 'relative',
      left: '612px',
      overflow: 'auto',
      zIndex: 1
    },
    customButton: {
      paddingRight: '5px',
      paddingLeft: '5px',
      minWidth: '20px'
    }
  };
});
var ContextMenuDataSource = [{
  title: "Zoom In",
  key: "zoomIn"
}, {
  title: "Zoom Out",
  key: "zoomOut"
}, {
  title: "Reset Zoom",
  key: "resetZoom"
}];

function V5FormBuilderMasterScreens(props) {
  var masterScreensWorkflowData = props.masterScreensWorkflowData,
      handleAdd = props.handleAdd,
      internalScreensChecked = props.internalScreensChecked,
      handleEdit = props.handleEdit,
      clientLogo = props.clientLogo,
      handleWorkflowDataDnD = props.handleWorkflowDataDnD,
      ScreenSkeletonComponent = props.ScreenSkeletonComponent,
      showPrivilegePreviewPlaceholder = props.showPrivilegePreviewPlaceholder,
      status = props.status,
      handleStatusChange = props.handleStatusChange;
  var classes = useStyles();
  var contextMenu = new _simpleContextMenu["default"]();
  var transformRef = (0, _react.useRef)(null);

  var _React$useState = _react["default"].useState(false),
      _React$useState2 = (0, _slicedToArray2["default"])(_React$useState, 2),
      hover = _React$useState2[0],
      setHover = _React$useState2[1];

  var _React$useState3 = _react["default"].useState(false),
      _React$useState4 = (0, _slicedToArray2["default"])(_React$useState3, 2),
      icon = _React$useState4[0],
      setIcon = _React$useState4[1];

  var _React$useState5 = _react["default"].useState(null),
      _React$useState6 = (0, _slicedToArray2["default"])(_React$useState5, 2),
      number = _React$useState6[0],
      setNumber = _React$useState6[1];

  var _React$useState7 = _react["default"].useState(null),
      _React$useState8 = (0, _slicedToArray2["default"])(_React$useState7, 2),
      indexNumber = _React$useState8[0],
      setIndexNumber = _React$useState8[1];

  var _React$useState9 = _react["default"].useState(),
      _React$useState10 = (0, _slicedToArray2["default"])(_React$useState9, 2),
      dragId = _React$useState10[0],
      setDragId = _React$useState10[1];

  var _React$useState11 = _react["default"].useState(true),
      _React$useState12 = (0, _slicedToArray2["default"])(_React$useState11, 2),
      panning = _React$useState12[0],
      setPanning = _React$useState12[1]; // const panning = {
  //     disabled : true
  // }


  var handlePan = function handlePan() {
    setPanning(!panning);
  };

  var handleClick = function handleClick(e) {
    //e.preventDefault();
    // const md = masterScreensWorkflowData.slice(0);
    // const sd = md[number].screenData;
    // store.dispatch('updateOrder', sd);
    //handleEdit(indexNumber);
    e.preventDefault(); // e.stopPropagation();
    //const tempData = [...featureTemplates];

    var tempData = masterScreensWorkflowData.slice(0);
    var formData = tempData[number].screenData;
    var screenTitle = tempData[number].screenTitle; //store.dispatch('load', { data: formData || [] });

    _store["default"].dispatch('updateOrder', formData);

    handleEdit(indexNumber, screenTitle);
  };

  var handleIndex = function handleIndex(e) {
    //e.preventDefault();
    _store["default"].dispatch('updateOrder', []);

    handleAdd(number);
  };

  var handleCardMouseOver = function handleCardMouseOver(e, index) {
    setIcon(true);
    setIndexNumber(index);
    setNumber(index);
  };

  var handleCardMouseLeave = function handleCardMouseLeave(e) {
    setIcon(false);
    setIndexNumber(null);
  };

  var handleArrowMouseOver = function handleArrowMouseOver(e, index) {
    setHover(true);
    setNumber(index);
  };

  var handleArrowMouseLeave = function handleArrowMouseLeave(e) {
    setHover(false);
    setNumber(null);
  };

  var callBack = function callBack(key) {
    if (key === "resetZoom") {
      var _transformRef$current;

      //setDrag(false);
      (_transformRef$current = transformRef.current) === null || _transformRef$current === void 0 ? void 0 : _transformRef$current.resetTransform();
    } else if (key === "zoomOut") {
      var _transformRef$current2;

      (_transformRef$current2 = transformRef.current) === null || _transformRef$current2 === void 0 ? void 0 : _transformRef$current2.zoomOut();
    } else {
      var _transformRef$current3;

      //setDrag(true);
      (_transformRef$current3 = transformRef.current) === null || _transformRef$current3 === void 0 ? void 0 : _transformRef$current3.zoomIn();
    }
  };

  var options = {
    delay: 500 //delay submenu

  };
  (0, _react.useEffect)(function () {
    contextMenu.register("#target", callBack, ContextMenuDataSource, options);
  });

  var dragStart = function dragStart(e, x) {
    e.stopPropagation(); //console.log(e.currentTarget.id)

    setDragId(x.screenTitle);
  };

  var drop = function drop(e, x) {
    e.stopPropagation();
    e.preventDefault();
    var dragBox = masterScreensWorkflowData.find(function (box) {
      return box.screenTitle === dragId;
    });
    var dropBox = masterScreensWorkflowData.find(function (box) {
      return box.screenTitle === x.screenTitle;
    });
    var dragBoxOrder = dragBox.displayIndex;
    var dropBoxOrder = dropBox.displayIndex;

    if (!x.isListingPage) {
      var newBoxState = masterScreensWorkflowData.map(function (box) {
        if (box.screenTitle === dragId) {
          box.displayIndex = dropBoxOrder;
        }

        if (box.screenTitle === x.screenTitle) {
          box.displayIndex = dragBoxOrder;
        }

        return box;
      });
      handleWorkflowDataDnD(newBoxState);
    }
  };

  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("div", {
    className: "App react-form-builder clearfix",
    style: {
      backgroundColor: '#DDDDE3',
      border: "1px solid #0000001F",
      borderRadius: "4px",
      opacity: 1
    }
  }, /*#__PURE__*/_react["default"].createElement(_reactZoomPanPinch.TransformWrapper, {
    initialScale: 1,
    ref: transformRef,
    disabled: panning
  }, function (_ref) {
    var zoomIn = _ref.zoomIn,
        zoomOut = _ref.zoomOut,
        resetTransform = _ref.resetTransform,
        rest = (0, _objectWithoutProperties2["default"])(_ref, ["zoomIn", "zoomOut", "resetTransform"]);
    return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_v5FormBuilderMasterScreensHeader["default"], {
      panning: panning,
      handlePan: handlePan,
      zoomIn: zoomIn,
      zoomOut: zoomOut,
      resetTransform: resetTransform,
      status: status,
      handleStatusChange: handleStatusChange,
      showPrivilegePreviewPlaceholder: showPrivilegePreviewPlaceholder
    }), showPrivilegePreviewPlaceholder && /*#__PURE__*/_react["default"].createElement("div", {
      className: "form-place-holder-workflow"
    }, "Workflow Preview"), /*#__PURE__*/_react["default"].createElement(_core.TableRow, null, /*#__PURE__*/_react["default"].createElement(_reactZoomPanPinch.TransformComponent, null, /*#__PURE__*/_react["default"].createElement("div", {
      className: "img-container",
      style: {
        backgroundColor: "#DDDDE3"
      },
      id: "target" //draggable="true"

    }, /*#__PURE__*/_react["default"].createElement(_core.Grid, {
      container: true,
      direction: "row",
      className: "".concat(classes.parent, " ParentDiv target") //justifyContent="center"
      ,
      alignItems: "center",
      zIndex: "-1"
    }, !showPrivilegePreviewPlaceholder && masterScreensWorkflowData.sort(function (a, b) {
      return a.displayIndex - b.displayIndex;
    }).map(function (x, index) {
      return /*#__PURE__*/_react["default"].createElement(_core.Grid, {
        item: true,
        key: index,
        style: {
          marginTop: '2rem'
        }
      }, /*#__PURE__*/_react["default"].createElement("h6", {
        style: {
          textAlign: "left",
          fontWeight: "normal"
        }
      }, x.screenTitle), /*#__PURE__*/_react["default"].createElement(_core.Grid, {
        container: true,
        justifyContent: "flex-end",
        alignItems: "center",
        onMouseOver: function onMouseOver(e) {
          return handleCardMouseOver(e, index);
        },
        onMouseLeave: function onMouseLeave(e) {
          return handleCardMouseLeave(e);
        }
      }, /*#__PURE__*/_react["default"].createElement(_core.Grid, {
        item: true
      }, /*#__PURE__*/_react["default"].createElement(_core.Grid, {
        container: true,
        id: x.displayIndex,
        onDrop: function onDrop(e) {
          return drop(e, x);
        },
        onDragOver: function onDragOver(e) {
          e.preventDefault();
          e.stopPropagation();
        }
      }, /*#__PURE__*/_react["default"].createElement(_core.Grid, {
        item: true,
        draggable: !x.isListingPage ? "true" : "false",
        id: x.displayIndex,
        onDragStart: function onDragStart(e) {
          return dragStart(e, x);
        }
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: classes.child
      }, x.isListingPage && /*#__PURE__*/_react["default"].createElement(_v5FormBuilderListingScreen["default"] //draggable="false"
      , {
        header: "My Attendance",
        tableHeaders: x.tableHeaders,
        data: x.tableData,
        workFlowData: x,
        clientLogo: clientLogo
      }), !x.isListingPage && /*#__PURE__*/_react["default"].createElement(_v5FormBuilderSlaveScreen["default"], {
        open: true //handlePopUpClose={}
        ,
        download_path: "" // back_action="/"
        // back_name="Back"
        ,
        answer_data: {},
        action_name: "Save",
        form_action: "/api/form",
        form_method: "POST",
        hide_actions: false,
        skip_validations: false //onSubmit={this._onSubmit}
        ,
        isFormReadOnly: true,
        isBootstrapItems: false //imageUploadCallback={""}
        // variables={this.props.variables}
        ,
        internalScreensChecked: internalScreensChecked,
        data: x.screenData,
        workFlowData: x,
        screenTitle: x.screenTitle,
        masterScreensWorkflowData: masterScreensWorkflowData,
        clientLogo: clientLogo,
        ScreenSkeletonComponent: ScreenSkeletonComponent // fieldResult={JSON.parse(fieldResult)}
        // fieldMedia={JSON.parse(fieldMedia)}
        // generateBtnLabel="Generate JSON and Save Form"
        // collectFormData={this.collectFormData}
        // getGeneratedJSON={this.getGeneratedJSON.bind(this)}
        // photoPreview={this.getAllPhotosToPreview.bind(this)}
        // closePreview={this.closePreview.bind(this)}

      }))), /*#__PURE__*/_react["default"].createElement(_core.Grid, {
        item: true
      }, icon && index === indexNumber && !x.isListingPage && !x.isConsolidatedScreen ? /*#__PURE__*/_react["default"].createElement("span", {
        className: "cursor-pointer ".concat(classes.icon),
        onClick: function onClick(e) {
          return handleClick(e);
        }
      }, /*#__PURE__*/_react["default"].createElement(_Edit["default"], {
        style: {
          color: '#50BFB7'
        }
      })) : /*#__PURE__*/_react["default"].createElement("span", {
        className: classes.icon,
        style: {
          visibility: 'hidden'
        }
      }, /*#__PURE__*/_react["default"].createElement(_Edit["default"], null))))), /*#__PURE__*/_react["default"].createElement(_core.Grid, {
        item: true,
        onMouseOver: function onMouseOver(e) {
          return handleArrowMouseOver(e, index);
        },
        onMouseLeave: function onMouseLeave(e) {
          return handleArrowMouseLeave(e);
        }
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "".concat(x.isConsolidatedScreen ? '' : 'cursor-pointer'),
        style: {
          marginLeft: "-1.4rem"
        },
        onClick: function onClick(e) {
          return handleIndex(e);
        }
      }, x.isConsolidatedScreen ? /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, index !== masterScreensWorkflowData.length - 1 ? /*#__PURE__*/_react["default"].createElement("img", {
        src: "/assets/images/icons/Icon_Arrow with long tail.svg"
      }) : null) : index < masterScreensWorkflowData.length - 1 && !hover ? /*#__PURE__*/_react["default"].createElement("img", {
        src: "/assets/images/icons/Icon_Arrow with long tail.svg"
      }) : hover && index < masterScreensWorkflowData.length - 1 && index === number ? /*#__PURE__*/_react["default"].createElement("img", {
        src: "/assets/images/icons/Icon_Arrow with Plus.svg"
      }) : index < masterScreensWorkflowData.length - 1 ? /*#__PURE__*/_react["default"].createElement("img", {
        src: "/assets/images/icons/Icon_Arrow with long tail.svg"
      }) : index < masterScreensWorkflowData.length && icon && index === indexNumber ? /*#__PURE__*/_react["default"].createElement("img", {
        src: "/assets/images/icons/Icon_Plus with tail.svg"
      }) : null))));
    }))))), /*#__PURE__*/_react["default"].createElement(_core.Grid, {
      container: true,
      direction: "row",
      justifyContent: "flex-end",
      className: "p-2 mr-5"
    }, /*#__PURE__*/_react["default"].createElement(_core.Grid, {
      item: true,
      style: {
        textAlign: 'right',
        color: "#707070"
      }
    }, "Note: Zoom in & out by mouse scroll or pinch on mobile and tablet")));
  })));
}

var _default = V5FormBuilderMasterScreens;
exports["default"] = _default;
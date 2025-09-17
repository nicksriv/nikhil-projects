"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _core = require("@material-ui/core");

var _styles = require("@material-ui/core/styles");

var _DescriptionOutlined = _interopRequireDefault(require("@material-ui/icons/DescriptionOutlined"));

var _Delete = _interopRequireDefault(require("@material-ui/icons/Delete"));

var _reactDropzone = _interopRequireDefault(require("react-dropzone"));

var XLSX = _interopRequireWildcard(require("xlsx"));

var useStyles = (0, _styles.makeStyles)(function (theme) {
  return {
    root: {
      h1: {
        fontWeight: 'normal'
      },
      '&.MuiLinearProgress-bar': {
        height: '6px',
        borderRadius: '56px 0px 0px 56px'
      }
    },
    paper: {
      backgroundColor: 'white',
      width: '100%',
      height: 'auto',
      border: '1px dashed #CDCCCD;',
      opacity: 1,
      borderRadius: '8px',
      position: 'relative',
      marginBottom: '1.5rem',
      flex: 1 //marginTop: '2rem',

    },
    dropZoneHover: {
      '&:hover': {
        border: '1px dashed #51BFB6',
        color: '#51BFB6'
      }
    },
    dropZoneLblHover: {
      '&:hover': {
        border: 'none'
      }
    },
    dropZoneActive: {
      border: '1px solid #51BFB6',
      color: '#51BFB6',
      borderRadius: "10px",
      boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px"
    },
    dropZoneLblActive: {
      border: 'none'
    },
    fileDownloadIcon: {
      width: '19px',
      height: '20px',
      color: '#9f9f9e'
    },
    uploadedFileLink: {
      fontSize: "1rem",
      marginTop: "0.5rem",
      cursor: "pointer",
      color: "#51BFB6 !important"
    }
  };
});

var V5GlobalDnDFileControl = function V5GlobalDnDFileControl(props) {
  var file = props.file,
      setFile = props.setFile,
      isFileSelected = props.isFileSelected,
      setIsFileSelected = props.setIsFileSelected,
      isProgressComplete = props.isProgressComplete,
      setIsProgressComplete = props.setIsProgressComplete,
      setDropDown = props.setDropDown,
      dropDownOptions = props.dropDownOptions,
      fileUploaded = props.fileUploaded,
      uploaded = props.uploaded,
      setDropDownOptions = props.setDropDownOptions,
      deleteUploadedOptions = props.deleteUploadedOptions;
  var classes = useStyles();

  var _React$useState = _react["default"].useState(0),
      _React$useState2 = (0, _slicedToArray2["default"])(_React$useState, 2),
      progress = _React$useState2[0],
      setProgress = _React$useState2[1];

  var _React$useState3 = _react["default"].useState(null),
      _React$useState4 = (0, _slicedToArray2["default"])(_React$useState3, 2),
      intervalId = _React$useState4[0],
      setIntervalId = _React$useState4[1];

  var _React$useState5 = _react["default"].useState([]),
      _React$useState6 = (0, _slicedToArray2["default"])(_React$useState5, 2),
      items = _React$useState6[0],
      setItems = _React$useState6[1];

  var _React$useState7 = _react["default"].useState(false),
      _React$useState8 = (0, _slicedToArray2["default"])(_React$useState7, 2),
      startUpload = _React$useState8[0],
      setStartUpload = _React$useState8[1];

  (0, _react.useEffect)(function () {
    setDropDown(items);
  }, [items]);
  (0, _react.useEffect)(function () {
    if (file && file.name) {
      setDropDownOptions(file === null || file === void 0 ? void 0 : file.name, true);
    }
  }, [file]);

  var handleDrop = function handleDrop(acceptedFiles) {
    var promise = new Promise(function (resolve, reject) {
      var fileReader = new FileReader();
      fileReader.readAsArrayBuffer(acceptedFiles[0]);
      setIsFileSelected(true);
      setFile(acceptedFiles[0]);
      setStartUpload(true);

      fileReader.onload = function (e) {
        var bufferArray = e.target.result;
        var wb = XLSX.read(bufferArray, {
          type: "buffer"
        });
        var wsname = wb.SheetNames[0];
        var ws = wb.Sheets[wsname];
        var data = XLSX.utils.sheet_to_json(ws);
        resolve(data);
      };

      fileReader.onerror = function (error) {
        reject(error);
      };
    });
    promise.then(function (d) {
      setItems(d);
    });
    var timer = setInterval(function () {
      setProgress(function (oldProgress) {
        if (oldProgress === 100) {
          setIsProgressComplete(true);
          clearInterval(timer);
          setProgress(0);
        }

        var diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);
    setIntervalId(timer);
  };

  var handleDropAccepted = function handleDropAccepted() {
    setIsProgressComplete(false);
  };

  var handleDelete = function handleDelete(e) {
    e.stopPropagation();
    setFile(null);
    setDropDownOptions("", false);
    setStartUpload(false);
    setIsProgressComplete(true);
    setIsFileSelected(false);
    clearInterval(intervalId);
    setProgress(0);
    deleteUploadedOptions(true);
  };

  var downloadExcel = function downloadExcel() {
    var jsonToConvert = [];
    dropDownOptions.map(function (el) {
      jsonToConvert.push({
        label: el.value
      });
    });
    var excelSheet = XLSX.utils.json_to_sheet(jsonToConvert);
    var workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, excelSheet, 'Uploaded_Sheet');
    XLSX.writeFile(workBook, 'Uploaded_Sheet.xls');
  };

  return /*#__PURE__*/_react["default"].createElement(_reactDropzone["default"], {
    onDrop: function onDrop(files) {
      return fileUploaded ? null : handleDrop(files);
    },
    onDropAccepted: fileUploaded ? null : handleDropAccepted,
    accept: ".xls, .ods",
    disabled: file !== null && file !== void 0 && file.name ? file === null || file === void 0 ? void 0 : file.name : fileUploaded //minSize={1024}
    //maxSize={3072000}

  }, function (_ref) {
    var getRootProps = _ref.getRootProps,
        getInputProps = _ref.getInputProps;
    return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("div", getRootProps({
      className: "".concat(classes.paper, " ").concat(isFileSelected ? classes.dropZoneActive : classes.dropZoneHover, " cursor-pointer")
    }), /*#__PURE__*/_react["default"].createElement("input", getInputProps()), /*#__PURE__*/_react["default"].createElement(_core.Grid, {
      container: true,
      direction: "column",
      justifyContent: "center",
      alignItems: "center" //className={`${classes.downloadContainer} cursor-pointer`}              

    }, /*#__PURE__*/_react["default"].createElement(_core.Grid, {
      item: true,
      className: "pt-5"
    }, /*#__PURE__*/_react["default"].createElement("img", {
      className: classes.fileDownloadIcon,
      src: "/assets/images/icons/Drag & Drop icons.svg",
      alt: "dnd"
    })), /*#__PURE__*/_react["default"].createElement(_core.Grid, {
      item: true
    }, /*#__PURE__*/_react["default"].createElement("h5", {
      className: "font-normal",
      style: {
        color: "#000000BC"
      }
    }, uploaded || startUpload ? /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_core.Grid, {
      container: true,
      direction: "row",
      justifyContent: "space-between",
      spacing: 1
    }, /*#__PURE__*/_react["default"].createElement(_core.Grid, {
      item: true,
      className: "text-light-gray"
    }, /*#__PURE__*/_react["default"].createElement(_DescriptionOutlined["default"], {
      style: {
        fontSize: "1.2rem",
        color: "#51BFB6"
      }
    })), /*#__PURE__*/_react["default"].createElement("a", {
      className: classes.uploadedFileLink,
      onClick: downloadExcel
    }, file !== null && file !== void 0 && file.name ? file === null || file === void 0 ? void 0 : file.name : fileUploaded),
    /*#__PURE__*/
    //!isProgressComplete &&
    _react["default"].createElement(_core.Grid, {
      item: true,
      className: "text-light-gray"
    }, /*#__PURE__*/_react["default"].createElement(_Delete["default"], {
      onClick: function onClick(e) {
        return handleDelete(e);
      },
      style: {
        fontSize: "1.2rem",
        color: "#51BFB6",
        cursor: "pointer"
      }
    })))) : "Browse sheet")), /*#__PURE__*/_react["default"].createElement(_core.Grid, {
      item: true,
      className: "pb-4 w-260",
      justifyContent: "center"
    }, isFileSelected && !isProgressComplete && /*#__PURE__*/_react["default"].createElement(_core.LinearProgress, {
      variant: "determinate",
      value: progress
    })))));
  });
};

V5GlobalDnDFileControl.propTypes = {};
V5GlobalDnDFileControl.defaultProps = {};
var _default = V5GlobalDnDFileControl;
exports["default"] = _default;
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _core = require("@material-ui/core");
var _styles = require("@material-ui/core/styles");
var _DescriptionOutlined = _interopRequireDefault(require("@material-ui/icons/DescriptionOutlined"));
var _Delete = _interopRequireDefault(require("@material-ui/icons/Delete"));
var _reactDropzone = _interopRequireDefault(require("react-dropzone"));
var XLSX = _interopRequireWildcard(require("xlsx"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
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
      flex: 1
      //marginTop: '2rem',
    },

    dropZoneHover: {
      '&:hover': {
        border: '1px dashed #2C3E93',
        color: '#2C3E93'
      }
    },
    dropZoneLblHover: {
      '&:hover': {
        border: 'none'
      }
    },
    dropZoneActive: {
      border: '1px solid #2C3E93',
      color: '#2C3E93',
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
      color: "#2C3E93 !important"
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
  var _React$useState = _react.default.useState(0),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    progress = _React$useState2[0],
    setProgress = _React$useState2[1];
  var _React$useState3 = _react.default.useState(null),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    intervalId = _React$useState4[0],
    setIntervalId = _React$useState4[1];
  var _React$useState5 = _react.default.useState([]),
    _React$useState6 = _slicedToArray(_React$useState5, 2),
    items = _React$useState6[0],
    setItems = _React$useState6[1];
  var _React$useState7 = _react.default.useState(false),
    _React$useState8 = _slicedToArray(_React$useState7, 2),
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
  return /*#__PURE__*/_react.default.createElement(_reactDropzone.default, {
    onDrop: function onDrop(files) {
      return fileUploaded ? null : handleDrop(files);
    },
    onDropAccepted: fileUploaded ? null : handleDropAccepted,
    accept: ".xls, .ods",
    disabled: file !== null && file !== void 0 && file.name ? file === null || file === void 0 ? void 0 : file.name : fileUploaded
    //minSize={1024}
    //maxSize={3072000}
  }, function (_ref) {
    var getRootProps = _ref.getRootProps,
      getInputProps = _ref.getInputProps;
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", getRootProps({
      className: "".concat(classes.paper, " ").concat(isFileSelected ? classes.dropZoneActive : classes.dropZoneHover, " cursor-pointer")
    }), /*#__PURE__*/_react.default.createElement("input", getInputProps()), /*#__PURE__*/_react.default.createElement(_core.Grid, {
      container: true,
      direction: "column",
      justifyContent: "center",
      alignItems: "center"
      //className={`${classes.downloadContainer} cursor-pointer`}              
    }, /*#__PURE__*/_react.default.createElement(_core.Grid, {
      item: true,
      className: "pt-5"
    }, /*#__PURE__*/_react.default.createElement("img", {
      className: classes.fileDownloadIcon,
      src: "/assets/images/icons/Drag & Drop icons.svg",
      alt: "dnd"
    })), /*#__PURE__*/_react.default.createElement(_core.Grid, {
      item: true
    }, /*#__PURE__*/_react.default.createElement("h5", {
      className: "font-normal",
      style: {
        color: "#000000BC"
      }
    }, uploaded || startUpload ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_core.Grid, {
      container: true,
      direction: "row",
      justifyContent: "space-between",
      spacing: 1
    }, /*#__PURE__*/_react.default.createElement(_core.Grid, {
      item: true,
      className: "text-light-gray"
    }, /*#__PURE__*/_react.default.createElement(_DescriptionOutlined.default, {
      style: {
        fontSize: "1.2rem",
        color: "#2C3E93"
      }
    })), /*#__PURE__*/_react.default.createElement("a", {
      className: classes.uploadedFileLink,
      onClick: downloadExcel
    }, file !== null && file !== void 0 && file.name ? file === null || file === void 0 ? void 0 : file.name : fileUploaded),
    /*#__PURE__*/
    //!isProgressComplete &&
    _react.default.createElement(_core.Grid, {
      item: true,
      className: "text-light-gray"
    }, /*#__PURE__*/_react.default.createElement(_Delete.default, {
      onClick: function onClick(e) {
        return handleDelete(e);
      },
      style: {
        fontSize: "1.2rem",
        color: "#2C3E93",
        cursor: "pointer"
      }
    })))) : "Browse sheet")), /*#__PURE__*/_react.default.createElement(_core.Grid, {
      item: true,
      className: "pb-4 w-260",
      justifyContent: "center"
    }, isFileSelected && !isProgressComplete && /*#__PURE__*/_react.default.createElement(_core.LinearProgress, {
      variant: "determinate",
      value: progress
    })))));
  });
};
V5GlobalDnDFileControl.propTypes = {};
V5GlobalDnDFileControl.defaultProps = {};
var _default = V5GlobalDnDFileControl;
exports.default = _default;
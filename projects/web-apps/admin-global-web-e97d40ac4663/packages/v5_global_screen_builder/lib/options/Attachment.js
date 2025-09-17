"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Attachment;
var _react = _interopRequireWildcard(require("react"));
var _styles = require("@material-ui/core/styles");
var _core = require("@material-ui/core");
var _Delete = _interopRequireDefault(require("@material-ui/icons/Delete"));
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
  return {};
});
function Attachment(props) {
  var classes = useStyles();
  var _useState = (0, _react.useState)(""),
    _useState2 = _slicedToArray(_useState, 2),
    fileName = _useState2[0],
    setFileName = _useState2[1];
  (0, _react.useEffect)(function () {
    setFileName(props.fileName);
  }, []);
  var handleChange = function handleChange(e) {
    setFileName(e.target.files[0].name);
    props.handleFile(e);
  };
  var handleDelete = function handleDelete() {
    setFileName("");
    props.element.customOptions.isFieldDisabled = false;
    props.handleDelete();
  };
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_core.Grid, {
    container: true,
    justifyContent: "space-between",
    className: "mt-4 p-3",
    style: {
      marginBottom: '1rem',
      border: '1px solid grey',
      borderRadius: '5px',
      backgroundColor: 'gray'
    }
  }, /*#__PURE__*/_react.default.createElement(_core.Grid, {
    container: true,
    justifyContent: "space-between"
  }, /*#__PURE__*/_react.default.createElement(_core.Grid, {
    item: true
  }, /*#__PURE__*/_react.default.createElement("h6", {
    className: classes.attachmentText,
    style: {
      color: 'black'
    }
  }, "Default file ")), /*#__PURE__*/_react.default.createElement(_core.Grid, {
    item: true
  }, /*#__PURE__*/_react.default.createElement(_core.Button, {
    component: "label"
  }, /*#__PURE__*/_react.default.createElement("img", {
    src: "/assets/images/icons/attachment_black_24dp.svg",
    alt: "attachment"
  }), /*#__PURE__*/_react.default.createElement("input", {
    type: "file",
    hidden: true,
    name: "selectedFile",
    onChange: handleChange,
    id: "imageUpload",
    accept: ".pdf,.xls,.doc"
  })))), fileName && /*#__PURE__*/_react.default.createElement(_core.Grid, {
    container: true,
    justifyContent: "space-between"
  }, /*#__PURE__*/_react.default.createElement(_core.Grid, {
    item: true
  }, /*#__PURE__*/_react.default.createElement("h6", {
    style: {
      textAlign: 'center'
    }
  }, fileName)), /*#__PURE__*/_react.default.createElement(_core.Grid, {
    item: true
  }, /*#__PURE__*/_react.default.createElement(_core.Button, {
    style: {
      textAlign: 'center'
    },
    onClick: handleDelete
  }, /*#__PURE__*/_react.default.createElement(_Delete.default, null))))));
}
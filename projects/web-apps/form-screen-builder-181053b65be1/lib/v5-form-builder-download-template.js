"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _core = require("@material-ui/core");

var _styles = require("@material-ui/core/styles");

//import FileDownloadOutlinedIcon from '@material-ui/icons/CloudDownloadOutlined';
var useStyles = (0, _styles.makeStyles)(function (theme) {
  return {
    root: {},
    paper: {
      backgroundColor: 'white',
      width: '100%',
      height: 'auto',
      border: '1px dashed #CDCCCD;',
      opacity: 1,
      borderRadius: '8px',
      position: 'relative',
      marginBottom: '1.5rem',
      flex: 1,
      marginTop: '2rem',
      cursor: "pointer"
    },
    fileDownloadIcon: {
      width: '19px',
      height: '20px',
      color: '#9f9f9e'
    }
  };
});

function V5FormBuilderDownloadTemplate(_ref) {
  var headerText = _ref.headerText,
      handleDownloadTemplate = _ref.handleDownloadTemplate,
      headerDescription = _ref.headerDescription;
  var classes = useStyles();
  console.log(handleDownloadTemplate);
  return /*#__PURE__*/_react["default"].createElement(_core.Grid, {
    container: true,
    direction: "column",
    justifyContent: "center",
    alignItems: "center",
    className: "".concat(classes.paper, " cursor-pointer"),
    onClick: handleDownloadTemplate
  }, /*#__PURE__*/_react["default"].createElement(_core.Grid, {
    item: true,
    className: "pt-4"
  }, /*#__PURE__*/_react["default"].createElement("h5", {
    className: "font-normal text-light-gray",
    style: {
      fontSize: "0.85rem"
    }
  }, headerText)), /*#__PURE__*/_react["default"].createElement(_core.Grid, {
    item: true
  }, /*#__PURE__*/_react["default"].createElement("h5", {
    className: "font-medium pb-2 color-primary",
    style: {
      fontSize: "0.85rem",
      textDecoration: "underline",
      textUnderlinePosition: "from-font"
    }
  }, headerDescription)));
}

var _default = V5FormBuilderDownloadTemplate;
exports["default"] = _default;
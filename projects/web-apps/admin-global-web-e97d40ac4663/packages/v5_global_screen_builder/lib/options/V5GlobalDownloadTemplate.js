"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _core = require("@material-ui/core");
var _styles = require("@material-ui/core/styles");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
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
      marginTop: '2rem'
    },
    fileDownloadIcon: {
      width: '19px',
      height: '20px',
      color: '#9f9f9e'
    }
  };
});
var V5GlobalDownloadTemplate = function V5GlobalDownloadTemplate(props) {
  var headerText = props.headerText,
    headerDescription = props.headerDescription,
    handleDownloadTemplate = props.handleDownloadTemplate;
  var classes = useStyles();
  return /*#__PURE__*/_react.default.createElement(_core.Grid, {
    container: true,
    direction: "column",
    justifyContent: "center",
    alignItems: "center",
    className: "".concat(classes.paper, " cursor-pointer"),
    onClick: handleDownloadTemplate
  }, /*#__PURE__*/_react.default.createElement(_core.Grid, {
    item: true,
    className: "pt-4"
  }, /*#__PURE__*/_react.default.createElement("h5", {
    className: "font-normal text-light-gray",
    style: {
      fontSize: "0.85rem"
    }
  }, headerText)), /*#__PURE__*/_react.default.createElement(_core.Grid, {
    item: true
  }, /*#__PURE__*/_react.default.createElement("h5", {
    className: "font-medium pb-2 color-primary",
    style: {
      fontSize: "0.85rem",
      textDecoration: "underline",
      textUnderlinePosition: "from-font"
    }
  }, headerDescription)));
};
V5GlobalDownloadTemplate.propTypes = {
  headerText: _propTypes.default.string.isRequired,
  headerDescription: _propTypes.default.string.isRequired,
  handleDownloadTemplate: _propTypes.default.func.isRequired
};
V5GlobalDownloadTemplate.defaultProps = {
  headerText: "Click Here To Download Template"
};
var _default = V5GlobalDownloadTemplate;
exports.default = _default;
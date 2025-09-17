"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Attachment;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _styles = require("@material-ui/core/styles");

var _core = require("@material-ui/core");

var _Delete = _interopRequireDefault(require("@material-ui/icons/Delete"));

var useStyles = (0, _styles.makeStyles)(function (theme) {
  return {};
});

function Attachment(props) {
  var classes = useStyles();

  var _useState = (0, _react.useState)(""),
      _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
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

  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_core.Grid, {
    container: true,
    justifyContent: "space-between",
    className: "mt-4 p-3",
    style: {
      marginBottom: '1rem',
      border: '1px solid grey',
      borderRadius: '5px',
      backgroundColor: 'gray'
    }
  }, /*#__PURE__*/_react["default"].createElement(_core.Grid, {
    container: true,
    justifyContent: "space-between"
  }, /*#__PURE__*/_react["default"].createElement(_core.Grid, {
    item: true
  }, /*#__PURE__*/_react["default"].createElement("h6", {
    className: classes.attachmentText,
    style: {
      color: 'black'
    }
  }, "Default file ")), /*#__PURE__*/_react["default"].createElement(_core.Grid, {
    item: true
  }, /*#__PURE__*/_react["default"].createElement(_core.Button, {
    component: "label"
  }, /*#__PURE__*/_react["default"].createElement("img", {
    src: "/assets/images/icons/attachment_black_24dp.svg",
    alt: "attachment"
  }), /*#__PURE__*/_react["default"].createElement("input", {
    type: "file",
    hidden: true,
    name: "selectedFile",
    onChange: handleChange,
    id: "imageUpload",
    accept: ".pdf,.xls,.doc"
  })))), fileName && /*#__PURE__*/_react["default"].createElement(_core.Grid, {
    container: true,
    justifyContent: "space-between"
  }, /*#__PURE__*/_react["default"].createElement(_core.Grid, {
    item: true
  }, /*#__PURE__*/_react["default"].createElement("h6", {
    style: {
      textAlign: 'center'
    }
  }, fileName)), /*#__PURE__*/_react["default"].createElement(_core.Grid, {
    item: true
  }, /*#__PURE__*/_react["default"].createElement(_core.Button, {
    style: {
      textAlign: 'center'
    },
    onClick: handleDelete
  }, /*#__PURE__*/_react["default"].createElement(_Delete["default"], null))))));
}
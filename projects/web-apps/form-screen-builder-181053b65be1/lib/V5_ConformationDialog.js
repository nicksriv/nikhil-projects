"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _core = require("@material-ui/core");

var _styles = require("@material-ui/core/styles");

var useStyles = (0, _styles.makeStyles)(function (theme) {
  return {
    root: {
      "& .MuiBackdrop-root": {
        backgroundColor: " rgba(0, 0, 0, 0.8);"
      }
    },
    yesButton: {
      color: "black",
      opacity: "0.6",
      fontWeight: "bold",
      '& :hover': {
        color: "#50BFB7",
        opacity: "1"
      }
    },
    box: {
      maxWidth: "20rem"
    },
    dialogueDesc: {
      fontSize: '15px',
      color: 'gray'
    }
  };
});

var ConfirmationDialog = function ConfirmationDialog(_ref) {
  var open = _ref.open,
      onConfirmDialogClose = _ref.onConfirmDialogClose,
      text = _ref.text,
      _ref$title = _ref.title,
      title = _ref$title === void 0 ? '' : _ref$title,
      onYesClick = _ref.onYesClick,
      hasOnlyCloseAction = _ref.hasOnlyCloseAction;
  var classes = useStyles();
  return /*#__PURE__*/_react["default"].createElement(_core.Dialog, {
    maxWidth: "xs",
    open: open,
    onClose: onConfirmDialogClose
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "px-6 pt-3 mx-auto ".concat(classes.box)
  }, /*#__PURE__*/_react["default"].createElement("h4", {
    className: "capitalize m-0 mb-2"
  }, title), /*#__PURE__*/_react["default"].createElement("p", {
    className: "text-left ".concat(classes.dialogueDesc)
  }, text), /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      display: "flex",
      justifyContent: "flex-end"
    }
  }, hasOnlyCloseAction ? /*#__PURE__*/_react["default"].createElement(_core.Button, {
    className: "m-2 px-4",
    variant: "text",
    color: "primary",
    onClick: onConfirmDialogClose
  }, "Close") : /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_core.Button, {
    className: " ".concat(classes.yesButton),
    variant: "text",
    onClick: onYesClick
  }, "Yes"), /*#__PURE__*/_react["default"].createElement(_core.Button, {
    className: " color-primary",
    variant: "text",
    onClick: onConfirmDialogClose
  }, "No")))));
};

var _default = ConfirmationDialog;
exports["default"] = _default;
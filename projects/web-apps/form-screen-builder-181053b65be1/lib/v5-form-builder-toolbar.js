"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _reactDnd = require("react-dnd");

var _reactDndHtml5Backend = require("react-dnd-html5-backend");

var _toolbar = _interopRequireDefault(require("./toolbar"));

var V5FormBuilderToolbar = function V5FormBuilderToolbar(props) {
  var customToolbarItems = props.customToolbarItems,
      toolbarProps = props.toolbarProps,
      setFormData = props.setFormData,
      handleDownloadTemplate = props.handleDownloadTemplate;
  return (
    /*#__PURE__*/
    // <DndProvider backend={HTML5Backend}>
    _react["default"].createElement("div", {
      className: "react-form-builder clearfix"
    }, /*#__PURE__*/_react["default"].createElement(_toolbar["default"], (0, _extends2["default"])({}, toolbarProps, {
      isAligned: true,
      customItems: customToolbarItems,
      setFormData: setFormData,
      handleDownloadTemplate: handleDownloadTemplate
    }))) // </DndProvider>

  );
};

var _default = V5FormBuilderToolbar;
exports["default"] = _default;
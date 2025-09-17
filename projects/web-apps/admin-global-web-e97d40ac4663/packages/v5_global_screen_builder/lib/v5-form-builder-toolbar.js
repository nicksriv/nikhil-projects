"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactDnd = require("react-dnd");
var _reactDndHtml5Backend = require("react-dnd-html5-backend");
var _toolbar = _interopRequireDefault(require("./toolbar"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
var V5FormBuilderToolbar = function V5FormBuilderToolbar(props) {
  var customToolbarItems = props.customToolbarItems,
    toolbarProps = props.toolbarProps,
    setFormData = props.setFormData,
    handleDownloadTemplate = props.handleDownloadTemplate;
  return (
    /*#__PURE__*/
    // <DndProvider backend={HTML5Backend}>
    _react.default.createElement("div", {
      className: "react-form-builder clearfix"
    }, /*#__PURE__*/_react.default.createElement(_toolbar.default, _extends({}, toolbarProps, {
      isAligned: true,
      customItems: customToolbarItems,
      setFormData: setFormData,
      handleDownloadTemplate: handleDownloadTemplate
    })))
    // </DndProvider>
  );
};
var _default = V5FormBuilderToolbar;
exports.default = _default;
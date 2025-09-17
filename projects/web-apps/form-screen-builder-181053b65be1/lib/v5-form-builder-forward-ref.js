"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _store = _interopRequireDefault(require("./stores/store"));

var V5FormBuilderRefHandlers = /*#__PURE__*/(0, _react.forwardRef)(function (props, ref) {
  (0, _react.useImperativeHandle)(ref, function () {
    return {
      clearFormBuilderZone: function clearFormBuilderZone() {
        _store["default"].dispatch('deleteAll');
      }
    };
  });
  return /*#__PURE__*/_react["default"].createElement("div", null);
});
var _default = V5FormBuilderRefHandlers;
exports["default"] = _default;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _core = require("@material-ui/core");
var _Add = _interopRequireDefault(require("@material-ui/icons/Add"));
var _Remove = _interopRequireDefault(require("@material-ui/icons/Remove"));
var _styles = require("@material-ui/core/styles");
var _this = void 0;
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var _default = InputTableOptions = function InputTableOptions(props) {
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
    className: "custom-control"
  }, /*#__PURE__*/_react.default.createElement(_core.Grid, {
    container: true,
    direction: "row",
    spacing: 5
  }, /*#__PURE__*/_react.default.createElement(_core.Grid, null, /*#__PURE__*/_react.default.createElement("label", {
    htmlFor: "is-row-count"
  }, "Rows Count:")), /*#__PURE__*/_react.default.createElement(_core.Grid, null, /*#__PURE__*/_react.default.createElement(_core.TextField, {
    type: "number",
    label: "Size",
    defaultValue: props.rowCount,
    onChange: props.setRows(_this, "rows"),
    InputProps: {
      inputProps: {
        min: 1
      }
    }
  })))), /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement(_core.FormLabel, {
    component: "legend"
  }, "Table Header Lables:"), props.headerList.map(function (header, index) {
    return /*#__PURE__*/_react.default.createElement(_core.Grid, {
      container: true,
      direction: "row",
      spacing: 4,
      key: header.headerId
    }, /*#__PURE__*/_react.default.createElement(_core.Grid, null, /*#__PURE__*/_react.default.createElement("div", {
      className: "custom-control custom-checkbox"
    }, /*#__PURE__*/_react.default.createElement("input", {
      id: "is-column-required" + index,
      className: "custom-control-input",
      type: "checkbox",
      checked: header.required,
      value: true,
      onChange: props.columnRequired(_this, 'required', index)
    }), /*#__PURE__*/_react.default.createElement("label", {
      className: "custom-control-label",
      htmlFor: "is-column-required" + index
    }, "Required"))), /*#__PURE__*/_react.default.createElement(_core.Grid, null, /*#__PURE__*/_react.default.createElement(_core.TextField, {
      size: "small",
      variant: "outlined",
      value: header.label,
      placeholder: "Add Header",
      onChange: props.addHeaderLabel(_this, index)
    })), /*#__PURE__*/_react.default.createElement(_core.Grid, null, /*#__PURE__*/_react.default.createElement(_core.IconButton, {
      "aria-label": "add"
    }, /*#__PURE__*/_react.default.createElement(_Add.default, {
      onClick: props.addHeader(_this, index)
    })), index > 0 && /*#__PURE__*/_react.default.createElement(_core.IconButton, {
      "aria-label": "add"
    }, /*#__PURE__*/_react.default.createElement(_Remove.default, {
      onClick: props.removeHeader(_this, index)
    }))));
  }));
};
exports.default = _default;
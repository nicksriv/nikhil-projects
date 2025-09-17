"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _core = require("@material-ui/core");

function _default(props) {
  var _React$createElement;

  var comments = props.element.customOptions.isCommentsAvail ? props.element.customOptions.isCommentsAvail : props.element.customOptions.isCommentPopAvail;
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_core.Grid, {
    item: true,
    xs: 12
  }, /*#__PURE__*/_react["default"].createElement(_core.Typography, {
    variant: "h6",
    component: "h6"
  }, "Camera Options")), /*#__PURE__*/_react["default"].createElement(_core.Grid, {
    item: true,
    xs: 12,
    sm: 6
  }, /*#__PURE__*/_react["default"].createElement(_core.FormControlLabel, {
    control: /*#__PURE__*/_react["default"].createElement(_core.Checkbox, {
      checked: props.element.customOptions.isPreAvail,
      onChange: props.editElementCustomOptionsProp.bind(this, 'isPreAvail', 'checked'),
      name: "is_preavail",
      color: "primary"
    }),
    label: "Pre Photo"
  })), /*#__PURE__*/_react["default"].createElement(_core.Grid, {
    item: true,
    xs: 12,
    sm: 6
  }, /*#__PURE__*/_react["default"].createElement(_core.FormControlLabel, {
    control: /*#__PURE__*/_react["default"].createElement(_core.Checkbox, {
      checked: props.element.customOptions.isPostAvail,
      onChange: props.editElementCustomOptionsProp.bind(this, 'isPostAvail', 'checked'),
      name: "isPostAvail",
      color: "primary"
    }),
    label: "Post Photo"
  })), /*#__PURE__*/_react["default"].createElement(_core.Grid, {
    item: true,
    xs: 12,
    sm: 6
  }, /*#__PURE__*/_react["default"].createElement(_core.FormControlLabel, {
    control: /*#__PURE__*/_react["default"].createElement(_core.Checkbox, {
      checked: props.element.customOptions.isPhotoAvail,
      onChange: props.editElementCustomOptionsProp.bind(this, 'isPhotoAvail', 'checked'),
      name: "is_photo_avail",
      color: "primary"
    }),
    label: "Photo"
  })), /*#__PURE__*/_react["default"].createElement(_core.Grid, {
    item: true,
    xs: 12,
    sm: 6
  }, /*#__PURE__*/_react["default"].createElement(_core.FormControlLabel, {
    control: /*#__PURE__*/_react["default"].createElement(_core.Checkbox, {
      checked: props.element.customOptions.is360Avail,
      onChange: props.editElementCustomOptionsProp.bind(this, 'is360Avail', 'checked'),
      name: "is_360_avail",
      color: "primary"
    }),
    label: "360 Photo"
  })), /*#__PURE__*/_react["default"].createElement(_core.Grid, {
    item: true,
    xs: 12,
    className: "element-options-border-grid"
  }, /*#__PURE__*/_react["default"].createElement(_core.FormControlLabel, {
    control: /*#__PURE__*/_react["default"].createElement(_core.Checkbox, {
      checked: props.element.customOptions.isBarcodeAvail,
      onChange: props.editElementCustomOptionsProp.bind(this, 'isBarcodeAvail', 'checked'),
      name: "is_barcode_avail",
      color: "primary"
    }),
    label: "Barcode Scanner"
  })), /*#__PURE__*/_react["default"].createElement(_core.Grid, {
    item: true,
    xs: 12
  }, /*#__PURE__*/_react["default"].createElement(_core.Typography, {
    variant: "h6",
    component: "h6"
  }, "Photo Upload Options")), /*#__PURE__*/_react["default"].createElement(_core.Grid, {
    item: true,
    xs: 12,
    sm: 6
  }, /*#__PURE__*/_react["default"].createElement(_core.FormControlLabel, {
    control: /*#__PURE__*/_react["default"].createElement(_core.Checkbox, {
      checked: props.element.customOptions.isPrePhotoUpload,
      onChange: props.editElementCustomOptionsProp.bind(this, 'isPrePhotoUpload', 'checked'),
      name: "is_pre_photo_upload",
      color: "primary"
    }),
    label: "Pre Photo"
  })), /*#__PURE__*/_react["default"].createElement(_core.Grid, {
    item: true,
    xs: 12,
    sm: 6
  }, /*#__PURE__*/_react["default"].createElement(_core.FormControlLabel, {
    control: /*#__PURE__*/_react["default"].createElement(_core.Checkbox, {
      checked: props.element.customOptions.isPostPhotoUpload,
      onChange: props.editElementCustomOptionsProp.bind(this, 'isPostPhotoUpload', 'checked'),
      name: "is_post_photo_upload",
      color: "primary"
    }),
    label: "Post Photo"
  })), /*#__PURE__*/_react["default"].createElement(_core.Grid, {
    item: true,
    xs: 12,
    sm: 6,
    className: "element-options-border-grid"
  }, /*#__PURE__*/_react["default"].createElement(_core.FormControlLabel, {
    control: /*#__PURE__*/_react["default"].createElement(_core.Checkbox, {
      checked: props.element.customOptions.isPhotoUpload,
      onChange: props.editElementCustomOptionsProp.bind(this, 'isPhotoUpload', 'checked'),
      name: "is_photo_upload",
      color: "primary"
    }),
    label: "Photo"
  })), /*#__PURE__*/_react["default"].createElement(_core.Grid, {
    item: true,
    xs: 12,
    sm: 6,
    className: "element-options-border-grid"
  }, /*#__PURE__*/_react["default"].createElement(_core.FormControlLabel, {
    control: /*#__PURE__*/_react["default"].createElement(_core.Checkbox, {
      checked: props.element.customOptions.is360PhotoUpload,
      onChange: props.editElementCustomOptionsProp.bind(this, 'is360PhotoUpload', 'checked'),
      name: "is_360_photo_upload",
      color: "primary"
    }),
    label: "360 Photo"
  })), /*#__PURE__*/_react["default"].createElement(_core.Grid, {
    item: true,
    xs: 12
  }, /*#__PURE__*/_react["default"].createElement(_core.Typography, {
    variant: "h6",
    component: "h6"
  }, "Comments")), /*#__PURE__*/_react["default"].createElement(_core.Grid, {
    item: true,
    xs: 12,
    className: "element-options-border-grid"
  }, /*#__PURE__*/_react["default"].createElement(_core.RadioGroup, (_React$createElement = {
    row: true,
    "aria-label": "material",
    name: "material",
    value: comments
  }, (0, _defineProperty2["default"])(_React$createElement, "row", false), (0, _defineProperty2["default"])(_React$createElement, "onChange", function onChange(e) {
    return props.editElementCustomOptionsProp(e.target.name, 'checked', e);
  }), _React$createElement), /*#__PURE__*/_react["default"].createElement(_core.FormControlLabel, {
    value: props.element.customOptions.isCommentsAvail,
    control: /*#__PURE__*/_react["default"].createElement(_core.Radio, {
      color: "primary"
    }),
    name: "isCommentsAvail",
    label: "Text Box"
  }), /*#__PURE__*/_react["default"].createElement(_core.FormControlLabel, {
    value: props.element.customOptions.isCommentPopAvail,
    control: /*#__PURE__*/_react["default"].createElement(_core.Radio, {
      color: "primary"
    }),
    name: "isCommentPopAvail",
    label: "Pop up"
  }))));
}
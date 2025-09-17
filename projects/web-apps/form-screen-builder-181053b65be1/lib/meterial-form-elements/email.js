"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _formik = require("formik");

var _materialElementLabel = _interopRequireDefault(require("./material-element-label"));

var _componentHeader = _interopRequireDefault(require("../form-elements/component-header"));

var _core = require("@material-ui/core");

var Yup = _interopRequireWildcard(require("yup"));

var initialValues = {};
var validationSchema = null;

function Email(props) {
  initialValues[props.data.fieldName] = props.result ? props.result.value : '';
  var schema = {};
  schema[props.data.fieldName] = Yup.string().email('Invalid email format');
  if (props.data.customOptions.required) schema[props.data.fieldName] = schema[props.data.fieldName].required('Please fill out mandatory field');
  validationSchema = Yup.object(schema);
  var formik = (0, _formik.useFormik)({
    initialValues: initialValues,
    validationSchema: validationSchema
  });
  var inputProps = {
    type: "email"
  };
  var fieldVariant = "";

  if (props.globalStyles) {
    fieldVariant = !props.globalStyles.formDefault && props.data.hasOwnProperty("fieldVariant") ? props.data.fieldVariant : props.globalStyles.globalFieldVariant;
  } else {
    if (props.data.fieldVariant) fieldVariant = props.data.fieldVariant;
  }

  var inputWidth = "100%";

  if (props.data.inputFieldSize == 'large') {
    inputWidth = "100%";
  } else if (props.data.inputFieldSize == 'medium') {
    inputWidth = "50%";
  } else if (props.data.inputFieldSize == 'small') {
    inputWidth = "25%";
  }

  var formPreview = props.hasOwnProperty('isFormPreview') ? props.isFormPreview : false;
  var fieldName = props.data.fieldName;
  var disabled = props.read_only || false;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "SortableItem rfb-item"
  }, /*#__PURE__*/_react["default"].createElement(_componentHeader["default"], props), /*#__PURE__*/_react["default"].createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/_react["default"].createElement(_core.TextField, {
    style: {
      width: inputWidth
    },
    size: "small",
    id: props.id,
    variant: fieldVariant,
    label: props.data.label,
    required: props.data.customOptions.required,
    inputProps: inputProps,
    name: fieldName,
    error: formik.touched[fieldName] && formik.errors[fieldName],
    helperText: formik.touched[fieldName] && formik.errors[fieldName] ? formik.errors[fieldName] : '',
    onChange: formik.handleChange,
    onBlur: formik.handleBlur,
    value: formik.values[fieldName],
    disabled: disabled,
    InputLabelProps: {
      shrink: true,
      classes: {
        asterisk: 'text-error'
      }
    },
    placeholder: props.data.label
  })));
}

var _default = Email;
exports["default"] = _default;
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _core = require("@material-ui/core");
var _styles = require("@material-ui/core/styles");
var _v5FormBuilderFeatureTemplate = _interopRequireDefault(require("./v5-form-builder-feature-template"));
var _Delete = _interopRequireDefault(require("@material-ui/icons/Delete"));
var _store = _interopRequireDefault(require("./stores/store"));
var _V5_ConformationDialog = _interopRequireDefault(require("./V5_ConformationDialog"));
var _excluded = ["palette"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var useStyles = (0, _styles.makeStyles)(function (_ref) {
  var palette = _ref.palette,
    theme = _objectWithoutProperties(_ref, _excluded);
  return {
    root: {
      maxWidth: 300,
      marginTop: 14,
      backgroundColor: "#f5f5f5",
      //maxHeight: 300,
      //width: 300
      "& .MuiFormLabel-root": {
        fontSize: "0.75rem",
        color: "#c3c0c0",
        marginTop: "6px"
      },
      "& .MuiTextField-root": {
        fontSize: "0.75rem",
        background: "#f7f7f7"
        //marginBottom: "6px"
      },

      "& .MuiOutlinedInput-inputMarginDense": {
        padding: "6px",
        fontSize: "0.75rem"
      },
      "& .MuiSelect-outlined.MuiSelect-outlined": {
        padding: "5px",
        width: "134px"
      },
      "& .PrivateRadioButtonIcon-root-15.PrivateRadioButtonIcon-checked-17 .MuiSvgIcon-fontSizeSmall": {
        fontSize: "0.75rem"
      },
      "& .MuiFormGroup-root.MuiFormGroup-row .MuiFormControlLabel-root .MuiTypography-body1": {
        fontSize: "0.5rem"
      },
      "& .MuiFormGroup-root.MuiFormGroup-row .MuiFormControlLabel-root .PrivateSwitchBase-root-7": {
        padding: "7px"
      },
      "& .MuiFormGroup-root.MuiFormGroup-row .MuiFormControlLabel-root": {
        marginRight: "7px"
      },
      "& .MuiFormGroup-root.MuiFormGroup-row": {
        //flexWrap: "inherit"
      },
      "& .MuiFormControlLabel-root .MuiCheckbox-root .MuiIconButton-label .MuiSvgIcon-root": {
        fontSize: "0.75rem"
      },
      "& .MuiFormControlLabel-root .MuiTypography-body1": {
        fontSize: "0.5rem"
      },
      "& .MuiCardContent-root": {
        padding: "5px"
      }
    },
    boxHeading: {
      marginBottom: "2px",
      color: "#919191",
      fontSize: "0.75rem"
    },
    boxForm: {
      padding: "10px",
      border: "1px solid #bbbbbb",
      borderRadius: "2px",
      maxWidth: 300,
      maxHeight: 300,
      backgroundColor: "#ffffff",
      height: "223px",
      overflow: "hidden"
    },
    deleteInfoText: {
      fontSize: "15px",
      whiteSpace: "pre-line",
      textAlign: "left",
      color: 'grey'
    }
  };
});
var V5FormBuilderFeatureTemplate = function V5FormBuilderFeatureTemplate(props) {
  var featureTemplates = props.featureTemplates,
    handleFeatureTemplateDelete = props.handleFeatureTemplateDelete;
  var classes = useStyles();
  var _useState = (0, _react.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    showDeletePopup = _useState2[0],
    setShowDeletePopup = _useState2[1];
  var _useState3 = (0, _react.useState)(null),
    _useState4 = _slicedToArray(_useState3, 2),
    selectedFeatureTemplateId = _useState4[0],
    setselectedFeatureTemplateId = _useState4[1];
  var handleTemplate = function handleTemplate(e, id) {
    e.preventDefault();
    // e.stopPropagation();
    //const tempData = [...featureTemplates];
    var tempData = featureTemplates.slice(0);
    var template = tempData.find(function (x) {
      return x.id === id;
    });
    var formData = template.form;
    //store.dispatch('load', { data: formData || [] });
    _store.default.dispatch('updateOrder', formData);
  };
  var handleFeatureTemplatesDelete = function handleFeatureTemplatesDelete(id) {
    setselectedFeatureTemplateId(id);
    setShowDeletePopup(true);
  };
  var confirmDelete = function confirmDelete() {
    try {
      handleFeatureTemplateDelete(selectedFeatureTemplateId);
      setShowDeletePopup(false);
    } catch (error) {
      console.error(error);
    }
  };
  var text = "Are you sure want to delete?";
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "form-builder-feature-template"
  }, /*#__PURE__*/_react.default.createElement(_core.Grid, {
    container: true,
    spacing: 2
  }, featureTemplates && featureTemplates.map(function (ft, i) {
    return /*#__PURE__*/_react.default.createElement(_core.Grid, {
      md: 6
    }, /*#__PURE__*/_react.default.createElement(_core.Card, {
      className: classes.root,
      style: {
        boxShadow: "none"
      },
      onClick: function onClick(e) {
        return handleTemplate(e, ft.id);
      }
    }, /*#__PURE__*/_react.default.createElement(_core.CardActionArea, null, /*#__PURE__*/_react.default.createElement(_core.CardContent, {
      className: "box"
    }, /*#__PURE__*/_react.default.createElement(_core.Typography, {
      component: "h7",
      className: classes.boxHeading
    }, ft.name), /*#__PURE__*/_react.default.createElement(_Delete.default, {
      className: "deleteIcon",
      onClick: function onClick(e) {
        return handleFeatureTemplatesDelete(ft.id);
      }
    }), /*#__PURE__*/_react.default.createElement(_core.Typography, {
      variant: "body2",
      color: "textSecondary",
      component: "div",
      className: "".concat(classes.boxForm, " boxForm ")
    }, ft.form && ft.form.map(function (d, i) {
      return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_core.FormLabel, null, d.label), /*#__PURE__*/_react.default.createElement(_v5FormBuilderFeatureTemplate.default, {
        elementType: d.element
      }));
    }))))));
  })), /*#__PURE__*/_react.default.createElement(_V5_ConformationDialog.default, {
    open: showDeletePopup,
    onConfirmDialogClose: function onConfirmDialogClose() {
      return setShowDeletePopup(false);
    },
    text: /*#__PURE__*/_react.default.createElement("div", {
      className: classes.deleteInfoText
    }, text),
    onYesClick: confirmDelete
  }));
};
var _default = V5FormBuilderFeatureTemplate;
exports.default = _default;
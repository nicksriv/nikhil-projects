"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireWildcard(require("react"));

var _core = require("@material-ui/core");

var _styles = require("@material-ui/core/styles");

var _v5FormBuilderFeatureTemplate = _interopRequireDefault(require("./v5-form-builder-feature-template"));

var _Delete = _interopRequireDefault(require("@material-ui/icons/Delete"));

var _store = _interopRequireDefault(require("./stores/store"));

var _V5_ConformationDialog = _interopRequireDefault(require("./V5_ConformationDialog"));

var useStyles = (0, _styles.makeStyles)(function (_ref) {
  var palette = _ref.palette,
      theme = (0, _objectWithoutProperties2["default"])(_ref, ["palette"]);
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
        background: "#f7f7f7" //marginBottom: "6px"

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
      "& .MuiFormGroup-root.MuiFormGroup-row": {//flexWrap: "inherit"
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
      _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
      showDeletePopup = _useState2[0],
      setShowDeletePopup = _useState2[1];

  var _useState3 = (0, _react.useState)(null),
      _useState4 = (0, _slicedToArray2["default"])(_useState3, 2),
      selectedFeatureTemplateId = _useState4[0],
      setselectedFeatureTemplateId = _useState4[1];

  var handleTemplate = function handleTemplate(e, id) {
    e.preventDefault(); // e.stopPropagation();
    //const tempData = [...featureTemplates];

    var tempData = featureTemplates.slice(0);
    var template = tempData.find(function (x) {
      return x.id === id;
    });
    var formData = template.form; //store.dispatch('load', { data: formData || [] });

    _store["default"].dispatch('updateOrder', formData);
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
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "form-builder-feature-template"
  }, /*#__PURE__*/_react["default"].createElement(_core.Grid, {
    container: true,
    spacing: 2
  }, featureTemplates && featureTemplates.map(function (ft, i) {
    return /*#__PURE__*/_react["default"].createElement(_core.Grid, {
      md: 6
    }, /*#__PURE__*/_react["default"].createElement(_core.Card, {
      className: classes.root,
      style: {
        boxShadow: "none"
      },
      onClick: function onClick(e) {
        return handleTemplate(e, ft.id);
      }
    }, /*#__PURE__*/_react["default"].createElement(_core.CardActionArea, null, /*#__PURE__*/_react["default"].createElement(_core.CardContent, {
      className: "box"
    }, /*#__PURE__*/_react["default"].createElement(_core.Typography, {
      component: "h7",
      className: classes.boxHeading
    }, ft.name), /*#__PURE__*/_react["default"].createElement(_Delete["default"], {
      className: "deleteIcon",
      onClick: function onClick(e) {
        return handleFeatureTemplatesDelete(ft.id);
      }
    }), /*#__PURE__*/_react["default"].createElement(_core.Typography, {
      variant: "body2",
      color: "textSecondary",
      component: "div",
      className: "".concat(classes.boxForm, " boxForm ")
    }, ft.form && ft.form.map(function (d, i) {
      return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_core.FormLabel, null, d.label), /*#__PURE__*/_react["default"].createElement(_v5FormBuilderFeatureTemplate["default"], {
        elementType: d.element
      }));
    }))))));
  })), /*#__PURE__*/_react["default"].createElement(_V5_ConformationDialog["default"], {
    open: showDeletePopup,
    onConfirmDialogClose: function onConfirmDialogClose() {
      return setShowDeletePopup(false);
    },
    text: /*#__PURE__*/_react["default"].createElement("div", {
      className: classes.deleteInfoText
    }, text),
    onYesClick: confirmDelete
  }));
};

var _default = V5FormBuilderFeatureTemplate;
exports["default"] = _default;
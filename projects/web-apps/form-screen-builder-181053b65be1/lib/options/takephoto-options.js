"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _react = _interopRequireDefault(require("react"));

var _core = require("@material-ui/core");

var _Add = _interopRequireDefault(require("@material-ui/icons/Add"));

var _Remove = _interopRequireDefault(require("@material-ui/icons/Remove"));

var _UUID = _interopRequireDefault(require("../UUID"));

var _CheckCircle = _interopRequireDefault(require("@material-ui/icons/CheckCircle"));

var _RadioButtonUnchecked = _interopRequireDefault(require("@material-ui/icons/RadioButtonUnchecked"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var TakePhotoOptions = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(TakePhotoOptions, _React$Component);

  var _super = _createSuper(TakePhotoOptions);

  function TakePhotoOptions(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, TakePhotoOptions);
    _this = _super.call(this, props);
    _this.state = {
      element: _this.props.element,
      data: _this.props.data,
      dirty: false
    };
    return _this;
  }

  (0, _createClass2["default"])(TakePhotoOptions, [{
    key: "_setValue",
    value: function _setValue(label) {
      return label.replace(/[^A-Z0-9]+/ig, '_').toLowerCase();
    }
  }, {
    key: "editOption",
    value: function editOption(option_index, e) {
      var this_element = this.state.element;
      var val = this_element.singleChoiceOptions[option_index].value !== this._setValue(this_element.singleChoiceOptions[option_index].label) ? this_element.singleChoiceOptions[option_index].value : this._setValue(e.target.value);
      this_element.singleChoiceOptions[option_index].label = e.target.value;
      this_element.singleChoiceOptions[option_index].value = val;
      this.setState({
        element: this_element,
        dirty: true
      });
    }
  }, {
    key: "editValue",
    value: function editValue(option_index, e) {
      var this_element = this.state.element;
      var val = e.target.value === '' ? this._setValue(this_element.singleChoiceOptions[option_index].label) : e.target.value;
      this_element.singleChoiceOptions[option_index].value = val;
      this.setState({
        element: this_element,
        dirty: true
      });
    } // eslint-disable-next-line no-unused-vars

  }, {
    key: "editOptionCorrect",
    value: function editOptionCorrect(option_index, e) {
      var this_element = this.state.element;

      if (this_element.singleChoiceOptions[option_index].hasOwnProperty('correct')) {
        delete this_element.singleChoiceOptions[option_index].correct;
      } else {
        this_element.singleChoiceOptions[option_index].correct = true;
      }

      this.setState({
        element: this_element
      });
      this.props.updateElement.call(this.props.preview, this_element);
    }
  }, {
    key: "updateOption",
    value: function updateOption() {
      var this_element = this.state.element; // to prevent ajax calls with no change

      if (this.state.dirty) {
        this.props.updateElement.call(this.props.preview, this_element);
        this.setState({
          dirty: false
        });
      }
    }
  }, {
    key: "addOption",
    value: function addOption(index) {
      var this_element = this.state.element;
      this_element.singleChoiceOptions.splice(index + 1, 0, {
        value: 'new_option' + (index + 1),
        label: 'New Option',
        key: _UUID["default"].uuid()
      });
      this.props.updateElement.call(this.props.preview, this_element);
    }
  }, {
    key: "removeOption",
    value: function removeOption(index) {
      var this_element = this.state.element;
      this_element.singleChoiceOptions.splice(index, 1);
      this.props.updateElement.call(this.props.preview, this_element);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var options = [{
        name: "isPhotoAvail",
        label: "Capture Photo"
      }, {
        name: "isPhotoUpload",
        label: "Photo Upload"
      } // {
      //   name: "isEditPhoto",
      //   label: "Edit Photo"
      // },
      // {
      //   name: "isNotApplicable",
      //   label: "Not Applicable"
      // },
      // {
      //   name: "isShowHelp",
      //   label: "Show Help"
      // },
      // {
      //   name: "isCommentsAvail",
      //   label: "Comments"
      // },
      // {
      //   name: "isRadioGroup",
      //   label: "Radio Group"
      // }
      ];
      var photoOptions = true;

      if (this.props.element.customOptions.tapedrop) {
        photoOptions = this.props.element.customOptions.tapedrop;
      }

      if (this.props.element.customOptions.isDistToBuilding) {
        photoOptions = this.props.element.customOptions.isDistToBuilding;
      }

      if (this.props.element.customOptions.isTargetAzimuthAngle) {
        photoOptions = this.props.element.customOptions.isTargetAzimuthAngle;
      }

      var checked = {
        border: "1px solid #50BFB7",
        padding: " 0 0 0 0.5rem",
        borderRadius: "4px",
        color: "#50BFB7",
        height: '30px',
        marginLeft: "9px"
      };
      var checked1 = {
        border: "1px solid #50BFB7",
        // padding:" 0 0 0 0.5rem",
        width: "9rem",
        borderRadius: "4px",
        color: "#50BFB7",
        height: '30px',
        marginLeft: ".1rem"
      };
      var unchecked = {
        border: "1px solid #00000099",
        padding: " 0 0 0 0.5rem",
        borderRadius: "4px",
        height: '30px',
        marginLeft: "9px"
      };
      var unchecked1 = {
        border: "1px solid #00000099",
        // padding:" 0 0 0 0.5rem",
        width: "9rem",
        borderRadius: "4px",
        height: '30px',
        marginLeft: ".1rem"
      };
      var text = {
        marginButtom: '1rem',
        opacity: 0.6,
        fontSize: '16px',
        fontWeight: "normal"
      };
      return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_core.Grid, {
        container: true,
        spacing: 2,
        className: "padding-top-10"
      }, /*#__PURE__*/_react["default"].createElement(_core.Grid, null, /*#__PURE__*/_react["default"].createElement(_core.Grid, {
        item: true
      }, /*#__PURE__*/_react["default"].createElement("h6", {
        style: text,
        className: "pl-2"
      }, "Camera Facing: ")), /*#__PURE__*/_react["default"].createElement(_core.Grid, {
        item: true
      }, /*#__PURE__*/_react["default"].createElement(_core.FormControl, {
        component: "fieldset"
      }, /*#__PURE__*/_react["default"].createElement(_core.RadioGroup, {
        row: true,
        "aria-label": "material",
        name: "material",
        value: this.props.element.customOptions.cameraFacingOptions,
        onChange: function onChange(event) {
          return _this2.props.changeCameraOptions('cameraFacingOptions', event);
        }
      }, /*#__PURE__*/_react["default"].createElement(_core.FormControlLabel, {
        value: "front",
        style: this.props.element.customOptions.cameraFacingOptions === 'front' ? checked : unchecked,
        control: /*#__PURE__*/_react["default"].createElement(_core.Radio, {
          color: "primary",
          icon: /*#__PURE__*/_react["default"].createElement(_RadioButtonUnchecked["default"], {
            className: "checkboxSize"
          }),
          checkedIcon: /*#__PURE__*/_react["default"].createElement(_CheckCircle["default"], {
            className: "checkboxSize"
          })
        }),
        label: "Front",
        labelPlacement: "start"
      }), /*#__PURE__*/_react["default"].createElement(_core.FormControlLabel, {
        value: "rear",
        style: this.props.element.customOptions.cameraFacingOptions === 'rear' ? checked : unchecked,
        control: /*#__PURE__*/_react["default"].createElement(_core.Radio, {
          color: "primary",
          icon: /*#__PURE__*/_react["default"].createElement(_RadioButtonUnchecked["default"], {
            className: "checkboxSize"
          }),
          checkedIcon: /*#__PURE__*/_react["default"].createElement(_CheckCircle["default"], {
            className: "checkboxSize"
          })
        }),
        label: "Rear",
        labelPlacement: "start"
      }), /*#__PURE__*/_react["default"].createElement(_core.FormControlLabel, {
        value: "both",
        style: this.props.element.customOptions.cameraFacingOptions === 'both' ? checked : unchecked,
        control: /*#__PURE__*/_react["default"].createElement(_core.Radio, {
          color: "primary",
          icon: /*#__PURE__*/_react["default"].createElement(_RadioButtonUnchecked["default"], {
            className: "checkboxSize"
          }),
          checkedIcon: /*#__PURE__*/_react["default"].createElement(_CheckCircle["default"], {
            className: "checkboxSize"
          })
        }),
        label: "Both",
        labelPlacement: "start"
      }))))), /*#__PURE__*/_react["default"].createElement(_core.Grid, {
        item: true,
        xs: 12,
        className: "mt-3"
      }, /*#__PURE__*/_react["default"].createElement("h6", {
        style: text
      }, "Photo Options: ")), options.map(function (option) {
        return /*#__PURE__*/_react["default"].createElement(_core.Grid, {
          item: true,
          xs: 12,
          sm: 6
        }, /*#__PURE__*/_react["default"].createElement(_core.FormControlLabel, {
          style: _this2.props.element.customOptions[option.name] ? checked1 : unchecked1,
          label: option.label,
          control: /*#__PURE__*/_react["default"].createElement(_core.Checkbox, {
            style: {
              opacity: 0,
              width: "5px"
            },
            className: "mr-1 ml-2",
            checked: _this2.props.element.customOptions[option.name],
            onChange: function onChange(event) {
              return _this2.props.setPhotoCustomOptions(option.name, event);
            },
            name: option.name,
            color: "primary"
          })
        }));
      }), this.props.element.customOptions["isShowHelp"] && /*#__PURE__*/_react["default"].createElement(_core.Grid, {
        item: true,
        xs: 12,
        className: "element-options-border-grid"
      }, /*#__PURE__*/_react["default"].createElement(_core.TextField, {
        size: "small",
        variant: "outlined",
        id: "outlined-basic",
        label: "Help Text",
        style: {
          width: '50%'
        },
        value: this.props.element.customOptions.helpText,
        onChange: function onChange(event) {
          return _this2.props.setDefaultOptions("helpText", event);
        },
        inputProps: {
          type: 'text'
        }
      })), this.props.element.customOptions["isDistToBuilding"] && /*#__PURE__*/_react["default"].createElement(_core.Grid, {
        item: true,
        xs: 12,
        className: "element-options-border-grid"
      }, /*#__PURE__*/_react["default"].createElement(_core.TextField, {
        size: "small",
        variant: "outlined",
        id: "outlined-basic",
        style: {
          width: '50%'
        },
        label: "Distance to Building Radius",
        value: this.props.element.customOptions.distanceToBuildingRadius,
        onChange: function onChange(event) {
          return _this2.props.setDefaultOptions("distanceToBuildingRadius", event);
        },
        inputProps: {
          type: 'text'
        }
      }))), /*#__PURE__*/_react["default"].createElement(_core.Grid, {
        container: true,
        spacing: 2,
        className: "padding-top-10"
      }, this.props.element.customOptions["isRadioGroup"] && /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_core.Grid, {
        item: true,
        xs: 12
      }, /*#__PURE__*/_react["default"].createElement(_core.Typography, {
        variant: "h6",
        component: "h6"
      }, "Options")), this.props.element.singleChoiceOptions != undefined && this.props.element.singleChoiceOptions.map(function (option, index) {
        var this_key = "edit_".concat(option.key);
        var val = option.value !== _this2._setValue(option.label) ? option.value : '';
        return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, {
          key: this_key
        }, /*#__PURE__*/_react["default"].createElement(_core.Grid, {
          item: true,
          xs: 12,
          sm: 6
        }, /*#__PURE__*/_react["default"].createElement(_core.TextField, {
          fullWidth: true,
          size: "small",
          variant: "outlined",
          value: option.label,
          InputProps: {
            type: 'text'
          },
          placeholder: "Option text",
          onBlur: _this2.updateOption.bind(_this2),
          onChange: _this2.editOption.bind(_this2, index)
        })), false && /*#__PURE__*/_react["default"].createElement(_core.Grid, {
          item: true,
          xs: 12,
          sm: 2
        }, /*#__PURE__*/_react["default"].createElement("input", {
          className: "form-control",
          type: "text",
          name: "value_".concat(index),
          value: val,
          onChange: _this2.editValue.bind(_this2, index)
        })), option.value != "other" && /*#__PURE__*/_react["default"].createElement(_core.Grid, {
          item: true,
          xs: 12,
          sm: 1
        }, /*#__PURE__*/_react["default"].createElement(_core.IconButton, {
          "aria-label": "add"
        }, /*#__PURE__*/_react["default"].createElement(_Add["default"], {
          onClick: _this2.addOption.bind(_this2, index)
        }))), option.value != "other" && index > 0 && /*#__PURE__*/_react["default"].createElement(_core.Grid, {
          item: true,
          xs: 6,
          sm: 1
        }, /*#__PURE__*/_react["default"].createElement(_core.IconButton, {
          "aria-label": "remove"
        }, /*#__PURE__*/_react["default"].createElement(_Remove["default"], {
          onClick: _this2.removeOption.bind(_this2, index)
        }))));
      }))));
    }
  }]);
  return TakePhotoOptions;
}(_react["default"].Component);

exports["default"] = TakePhotoOptions;
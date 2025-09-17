"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _core = require("@material-ui/core");
var _Add = _interopRequireDefault(require("@material-ui/icons/Add"));
var _Remove = _interopRequireDefault(require("@material-ui/icons/Remove"));
var _UUID = _interopRequireDefault(require("../UUID"));
var _CheckCircle = _interopRequireDefault(require("@material-ui/icons/CheckCircle"));
var _RadioButtonUnchecked = _interopRequireDefault(require("@material-ui/icons/RadioButtonUnchecked"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
var TakePhotoOptions = /*#__PURE__*/function (_React$Component) {
  _inherits(TakePhotoOptions, _React$Component);
  var _super = _createSuper(TakePhotoOptions);
  function TakePhotoOptions(props) {
    var _this;
    _classCallCheck(this, TakePhotoOptions);
    _this = _super.call(this, props);
    _this.state = {
      element: _this.props.element,
      data: _this.props.data,
      dirty: false
    };
    return _this;
  }
  _createClass(TakePhotoOptions, [{
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
    }

    // eslint-disable-next-line no-unused-vars
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
      var this_element = this.state.element;
      // to prevent ajax calls with no change
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
        key: _UUID.default.uuid()
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
      }
      // {
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
        border: "1px solid #2C3E93",
        padding: " 0 0 0 0.5rem",
        borderRadius: "4px",
        color: "#2C3E93",
        height: '30px',
        marginLeft: "9px"
      };
      var checked1 = {
        border: "1px solid #2C3E93",
        // padding:" 0 0 0 0.5rem",
        width: "9rem",
        borderRadius: "4px",
        color: "#2C3E93",
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
      return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_core.Grid, {
        container: true,
        spacing: 2,
        className: "padding-top-10"
      }, /*#__PURE__*/_react.default.createElement(_core.Grid, null, /*#__PURE__*/_react.default.createElement(_core.Grid, {
        item: true
      }, /*#__PURE__*/_react.default.createElement("h6", {
        style: text,
        className: "pl-2"
      }, "Camera Facing: ")), /*#__PURE__*/_react.default.createElement(_core.Grid, {
        item: true
      }, /*#__PURE__*/_react.default.createElement(_core.FormControl, {
        component: "fieldset"
      }, /*#__PURE__*/_react.default.createElement(_core.RadioGroup, {
        row: true,
        "aria-label": "material",
        name: "material",
        value: this.props.element.customOptions.cameraFacingOptions,
        onChange: function onChange(event) {
          return _this2.props.changeCameraOptions('cameraFacingOptions', event);
        }
      }, /*#__PURE__*/_react.default.createElement(_core.FormControlLabel, {
        value: "front",
        style: this.props.element.customOptions.cameraFacingOptions === 'front' ? checked : unchecked,
        control: /*#__PURE__*/_react.default.createElement(_core.Radio, {
          color: "primary",
          icon: /*#__PURE__*/_react.default.createElement(_RadioButtonUnchecked.default, {
            className: "checkboxSize"
          }),
          checkedIcon: /*#__PURE__*/_react.default.createElement(_CheckCircle.default, {
            className: "checkboxSize"
          })
        }),
        label: "Front",
        labelPlacement: "start"
      }), /*#__PURE__*/_react.default.createElement(_core.FormControlLabel, {
        value: "rear",
        style: this.props.element.customOptions.cameraFacingOptions === 'rear' ? checked : unchecked,
        control: /*#__PURE__*/_react.default.createElement(_core.Radio, {
          color: "primary",
          icon: /*#__PURE__*/_react.default.createElement(_RadioButtonUnchecked.default, {
            className: "checkboxSize"
          }),
          checkedIcon: /*#__PURE__*/_react.default.createElement(_CheckCircle.default, {
            className: "checkboxSize"
          })
        }),
        label: "Rear",
        labelPlacement: "start"
      }), /*#__PURE__*/_react.default.createElement(_core.FormControlLabel, {
        value: "both",
        style: this.props.element.customOptions.cameraFacingOptions === 'both' ? checked : unchecked,
        control: /*#__PURE__*/_react.default.createElement(_core.Radio, {
          color: "primary",
          icon: /*#__PURE__*/_react.default.createElement(_RadioButtonUnchecked.default, {
            className: "checkboxSize"
          }),
          checkedIcon: /*#__PURE__*/_react.default.createElement(_CheckCircle.default, {
            className: "checkboxSize"
          })
        }),
        label: "Both",
        labelPlacement: "start"
      }))))), /*#__PURE__*/_react.default.createElement(_core.Grid, {
        item: true,
        xs: 12,
        className: "mt-3"
      }, /*#__PURE__*/_react.default.createElement("h6", {
        style: text
      }, "Photo Options: ")), options.map(function (option) {
        return /*#__PURE__*/_react.default.createElement(_core.Grid, {
          item: true,
          xs: 12,
          sm: 6
        }, /*#__PURE__*/_react.default.createElement(_core.FormControlLabel, {
          style: _this2.props.element.customOptions[option.name] ? checked1 : unchecked1,
          label: option.label,
          control: /*#__PURE__*/_react.default.createElement(_core.Checkbox, {
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
      }), this.props.element.customOptions["isShowHelp"] && /*#__PURE__*/_react.default.createElement(_core.Grid, {
        item: true,
        xs: 12,
        className: "element-options-border-grid"
      }, /*#__PURE__*/_react.default.createElement(_core.TextField, {
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
      })), this.props.element.customOptions["isDistToBuilding"] && /*#__PURE__*/_react.default.createElement(_core.Grid, {
        item: true,
        xs: 12,
        className: "element-options-border-grid"
      }, /*#__PURE__*/_react.default.createElement(_core.TextField, {
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
      }))), /*#__PURE__*/_react.default.createElement(_core.Grid, {
        container: true,
        spacing: 2,
        className: "padding-top-10"
      }, this.props.element.customOptions["isRadioGroup"] && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_core.Grid, {
        item: true,
        xs: 12
      }, /*#__PURE__*/_react.default.createElement(_core.Typography, {
        variant: "h6",
        component: "h6"
      }, "Options")), this.props.element.singleChoiceOptions != undefined && this.props.element.singleChoiceOptions.map(function (option, index) {
        var this_key = "edit_".concat(option.key);
        var val = option.value !== _this2._setValue(option.label) ? option.value : '';
        return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, {
          key: this_key
        }, /*#__PURE__*/_react.default.createElement(_core.Grid, {
          item: true,
          xs: 12,
          sm: 6
        }, /*#__PURE__*/_react.default.createElement(_core.TextField, {
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
        })), false && /*#__PURE__*/_react.default.createElement(_core.Grid, {
          item: true,
          xs: 12,
          sm: 2
        }, /*#__PURE__*/_react.default.createElement("input", {
          className: "form-control",
          type: "text",
          name: "value_".concat(index),
          value: val,
          onChange: _this2.editValue.bind(_this2, index)
        })), option.value != "other" && /*#__PURE__*/_react.default.createElement(_core.Grid, {
          item: true,
          xs: 12,
          sm: 1
        }, /*#__PURE__*/_react.default.createElement(_core.IconButton, {
          "aria-label": "add"
        }, /*#__PURE__*/_react.default.createElement(_Add.default, {
          onClick: _this2.addOption.bind(_this2, index)
        }))), option.value != "other" && index > 0 && /*#__PURE__*/_react.default.createElement(_core.Grid, {
          item: true,
          xs: 6,
          sm: 1
        }, /*#__PURE__*/_react.default.createElement(_core.IconButton, {
          "aria-label": "remove"
        }, /*#__PURE__*/_react.default.createElement(_Remove.default, {
          onClick: _this2.removeOption.bind(_this2, index)
        }))));
      }))));
    }
  }]);
  return TakePhotoOptions;
}(_react.default.Component);
exports.default = TakePhotoOptions;
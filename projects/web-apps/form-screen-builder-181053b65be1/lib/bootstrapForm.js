"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _fbemitter = require("fbemitter");

var _formValidator = _interopRequireDefault(require("./form-validator"));

var _formElements = _interopRequireDefault(require("./form-elements"));

var _multiColumn = require("./multi-column");

var _customElement = _interopRequireDefault(require("./form-elements/custom-element"));

var _registry = _interopRequireDefault(require("./stores/registry"));

var _meterialFormElements = _interopRequireDefault(require("./meterial-form-elements"));

var _generateJson = _interopRequireDefault(require("./generateJson"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var Image = _formElements["default"].Image,
    Checkboxes = _formElements["default"].Checkboxes,
    Download = _formElements["default"].Download,
    Camera = _formElements["default"].Camera;
var Dropdown = _meterialFormElements["default"].Dropdown,
    Email = _meterialFormElements["default"].Email,
    Header = _meterialFormElements["default"].Header,
    Number = _meterialFormElements["default"].Number,
    Phone = _meterialFormElements["default"].Phone,
    Photo_PrePost = _meterialFormElements["default"].Photo_PrePost,
    PhotoCaptureUploadModal = _meterialFormElements["default"].PhotoCaptureUploadModal,
    Short_Text = _meterialFormElements["default"].Short_Text,
    Signature = _meterialFormElements["default"].Signature,
    Single_Choice = _meterialFormElements["default"].Single_Choice,
    Input_Table = _meterialFormElements["default"].Input_Table,
    Photo = _meterialFormElements["default"].Photo;

var ReactForm = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(ReactForm, _React$Component);

  var _super = _createSuper(ReactForm);

  function ReactForm(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, ReactForm);
    _this = _super.call(this, props);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "form", void 0);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "inputs", {});
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "answerData", void 0);
    _this.answerData = _this._convert(props.answer_data);
    _this.emitter = new _fbemitter.EventEmitter();
    _this.getDataById = _this.getDataById.bind((0, _assertThisInitialized2["default"])(_this));
    _this.FormElements = props.isBootstrapItems ? _formElements["default"] : _meterialFormElements["default"];
    return _this;
  }

  (0, _createClass2["default"])(ReactForm, [{
    key: "_convert",
    value: function _convert(answers) {
      if (Array.isArray(answers)) {
        var result = {};
        answers.forEach(function (x) {
          if (x.name.indexOf('tags_') > -1) {
            result[x.name] = x.value.map(function (y) {
              return y.value;
            });
          } else {
            result[x.name] = x.value;
          }
        });
        return result;
      }

      return answers || {};
    }
  }, {
    key: "_getDefaultValue",
    value: function _getDefaultValue(item) {
      return this.answerData[item.fieldName];
    }
  }, {
    key: "_optionsDefaultValue",
    value: function _optionsDefaultValue(item) {
      var _this2 = this;

      var defaultValue = this._getDefaultValue(item);

      if (defaultValue) {
        return defaultValue;
      }

      var defaultChecked = [];
      item.options.forEach(function (option) {
        if (_this2.answerData["option_".concat(option.key)]) {
          defaultChecked.push(option.key);
        }
      });
      return defaultChecked;
    }
  }, {
    key: "_getItemValue",
    value: function _getItemValue(item, ref) {
      var $item = {
        element: item.element,
        value: ''
      };

      if (item.element === 'Rating') {
        $item.value = ref.inputField.current.state.rating;
      } else if (item.element === 'Tags') {
        $item.value = ref.inputField.current.state.value;
      } else if (item.element === 'DatePicker') {
        $item.value = ref.state.value;
      } else if (item.element === 'Camera') {
        $item.value = ref.state.img ? ref.state.img.replace('data:image/png;base64,', '') : '';
      } else if (ref && ref.inputField && ref.inputField.current) {
        $item = _reactDom["default"].findDOMNode(ref.inputField.current);

        if ($item && typeof $item.value === 'string') {
          $item.value = $item.value.trim();
        }
      }

      return $item;
    }
  }, {
    key: "_isIncorrect",
    value: function _isIncorrect(item) {
      var incorrect = false;

      if (item.canHaveAnswer) {
        var ref = this.inputs[item.fieldName];

        if (item.element === 'Checkboxes' || item.element === 'RadioButtons') {
          item.options.forEach(function (option) {
            var $option = _reactDom["default"].findDOMNode(ref.options["child_ref_".concat(option.key)]);

            if (option.hasOwnProperty('correct') && !$option.checked || !option.hasOwnProperty('correct') && $option.checked) {
              incorrect = true;
            }
          });
        } else {
          var $item = this._getItemValue(item, ref);

          if (item.element === 'Rating') {
            if ($item.value.toString() !== item.correct) {
              incorrect = true;
            }
          } else if ($item.value.toLowerCase() !== item.correct.trim().toLowerCase()) {
            incorrect = true;
          }
        }
      }

      return incorrect;
    }
  }, {
    key: "_isInvalid",
    value: function _isInvalid(item) {
      var invalid = false;

      if (item.required === true) {
        var ref = this.inputs[item.fieldName];

        if (item.element === 'Checkboxes' || item.element === 'RadioButtons') {
          var checked_options = 0;
          item.options.forEach(function (option) {
            var $option = _reactDom["default"].findDOMNode(ref.options["child_ref_".concat(option.key)]);

            if ($option.checked) {
              checked_options += 1;
            }
          });

          if (checked_options < 1) {
            // errors.push(item.label + ' is required!');
            invalid = true;
          }
        } else {
          var $item = this._getItemValue(item, ref);

          if (item.element === 'Rating') {
            if ($item.value === 0) {
              invalid = true;
            }
          } else if ($item.value === undefined || $item.value.length < 1) {
            invalid = true;
          }
        }
      }

      return invalid;
    }
  }, {
    key: "_collect",
    value: function _collect(item) {
      var itemData = {
        name: item.fieldName
      };
      var ref = this.inputs[item.fieldName];

      if (item.element === 'Checkboxes' || item.element === 'RadioButtons') {
        var checked_options = [];
        item.options.forEach(function (option) {
          var $option = _reactDom["default"].findDOMNode(ref.options["child_ref_".concat(option.key)]);

          if ($option.checked) {
            checked_options.push(option.key);
          }
        });
        itemData.value = checked_options;
      } else {
        if (!ref) return null;
        itemData.value = this._getItemValue(item, ref).value;
      }

      return itemData;
    }
  }, {
    key: "_collectFormData",
    value: function _collectFormData(data) {
      var _this3 = this;

      var formData = [];
      data.forEach(function (item) {
        var item_data = _this3._collect(item);

        if (item_data) {
          formData.push(item_data);
        }
      });
      return formData;
    }
  }, {
    key: "_getSignatureImg",
    value: function _getSignatureImg(item) {
      var ref = this.inputs[item.fieldName];
      var $canvas_sig = ref.canvas.current;

      if ($canvas_sig) {
        var base64 = $canvas_sig.toDataURL().replace('data:image/png;base64,', '');
        var isEmpty = $canvas_sig.isEmpty();

        var $input_sig = _reactDom["default"].findDOMNode(ref.inputField.current);

        if (isEmpty) {
          $input_sig.value = '';
        } else {
          $input_sig.value = base64;
        }
      }
    }
  }, {
    key: "handleSubmit",
    value: function handleSubmit(e) {
      e.preventDefault();
      var errors = [];

      if (!this.props.skip_validations) {
        errors = this.validateForm(); // Publish errors, if any.

        this.emitter.emit('formValidation', errors);
      } // Only submit if there are no errors.


      if (errors.length < 1) {
        var onSubmit = this.props.onSubmit;

        if (onSubmit) {// const data = this._collectFormData(this.props.data);
          // onSubmit(data);
        } else {
          var $form = _reactDom["default"].findDOMNode(this.form); // $form.submit();

        }
      }
    }
  }, {
    key: "validateForm",
    value: function validateForm() {
      var _this4 = this;

      var errors = [];
      var data_items = this.props.data;

      if (this.props.display_short) {
        data_items = this.props.data.filter(function (i) {
          return i.alternateForm === true;
        });
      }

      data_items.forEach(function (item) {
        if (item.element === 'Signature') {
          _this4._getSignatureImg(item);
        }

        if (_this4._isInvalid(item)) {
          errors.push("".concat(item.label, " is required!"));
        }

        if (_this4.props.validateForCorrectness && _this4._isIncorrect(item)) {
          errors.push("".concat(item.label, " was answered incorrectly!"));
        }
      });
      return errors;
    }
  }, {
    key: "getDataById",
    value: function getDataById(id) {
      var data = this.props.data;
      return data.find(function (x) {
        return x.id === id;
      });
    }
  }, {
    key: "getMaterialInputElement",
    value: function getMaterialInputElement(item, items) {
      var _this5 = this;

      console.log(item.element);
      var Input = this.FormElements[item.element];
      return /*#__PURE__*/_react["default"].createElement(Input, {
        handleChange: this.handleChange,
        ref: function ref(c) {
          return _this5.inputs[item.fieldName] = c;
        },
        mutable: true,
        key: "form_".concat(item.id),
        data: item,
        isFormPreview: true,
        totalItems: items,
        globalStyles: item.globalStyles,
        read_only: this.props.read_only,
        defaultValue: this._getDefaultValue(item)
      });
    }
  }, {
    key: "getMaterialDropdownElement",
    value: function getMaterialDropdownElement(item) {
      var _this6 = this;

      var Dropdown = this.FormElements[item.element];
      return /*#__PURE__*/_react["default"].createElement(Dropdown, {
        handleChange: this.handleChange,
        ref: function ref(c) {
          return _this6.inputs[item.fieldName] = c;
        },
        mutable: true,
        key: "form_".concat(item.elementId),
        data: item,
        isFormPreview: true,
        globalStyles: item.globalStyles,
        read_only: this.props.read_only,
        defaultValue: this._getDefaultValue(item)
      });
    }
  }, {
    key: "getInputElement",
    value: function getInputElement(item) {
      var _this7 = this;

      if (item.element.toLowerCase().includes("material")) {
        return this.getMaterialInputElement(item);
      }

      if (item.custom) {
        return this.getCustomElement(item);
      }

      var Input = this.FormElements[item.element];
      return /*#__PURE__*/_react["default"].createElement(Input, {
        handleChange: this.handleChange,
        ref: function ref(c) {
          return _this7.inputs[item.fieldName] = c;
        },
        mutable: true,
        key: "form_".concat(item.id),
        data: item,
        read_only: this.props.read_only,
        defaultValue: this._getDefaultValue(item)
      });
    }
  }, {
    key: "getContainerElement",
    value: function getContainerElement(item, Element) {
      var _this8 = this;

      var controls = item.childItems.map(function (x) {
        return x ? _this8.getInputElement(_this8.getDataById(x)) : /*#__PURE__*/_react["default"].createElement("div", null, "\xA0");
      });
      return /*#__PURE__*/_react["default"].createElement(Element, {
        mutable: true,
        key: "form_".concat(item.id),
        data: item,
        controls: controls
      });
    }
  }, {
    key: "getSimpleElement",
    value: function getSimpleElement(item) {
      var Element = this.FormElements[item.element];
      return /*#__PURE__*/_react["default"].createElement(Element, {
        mutable: true,
        key: "form_".concat(item.id),
        data: item
      });
    }
  }, {
    key: "getCustomElement",
    value: function getCustomElement(item) {
      var _this9 = this;

      if (!item.component || typeof item.component !== 'function') {
        item.component = _registry["default"].get(item.key);

        if (!item.component) {
          console.error("".concat(item.element, " was not registered"));
        }
      }

      var inputProps = item.forwardRef && {
        handleChange: this.handleChange,
        defaultValue: this._getDefaultValue(item),
        ref: function ref(c) {
          return _this9.inputs[item.fieldName] = c;
        }
      };
      return /*#__PURE__*/_react["default"].createElement(_customElement["default"], (0, _extends2["default"])({
        mutable: true,
        read_only: this.props.read_only,
        key: "form_".concat(item.id),
        data: item
      }, inputProps));
    }
  }, {
    key: "render",
    value: function render() {
      var _this10 = this;

      var data_items = this.props.data;

      if (this.props.display_short) {
        data_items = this.props.data.filter(function (i) {
          return i.alternateForm === true;
        });
      }

      data_items.forEach(function (item) {
        if (item && item.readOnly && item.variableKey && _this10.props.variables[item.variableKey]) {
          _this10.answerData[item.fieldName] = _this10.props.variables[item.variableKey];
        }
      });
      var items = data_items.filter(function (x) {
        return !x.parentId;
      }).map(function (item) {
        if (!item) return null;

        switch (item.element) {
          case 'Email':
          case 'Text':
          case 'Phone':
          case 'Number':
          case 'Section_Header':
          case 'Input_Table':
          case 'Single_Choice':
          case 'Header':
          case 'Short_Text':
          case 'Page_Break':
          case 'Photo':
          case 'Dropdown':
          case 'CheckList':
          case 'Photo_PrePost':
          case 'Long_Text':
          case 'Configurable_List':
          case 'Button_Radios':
          case 'Location_Coordinates':
            return _this10.getMaterialInputElement(item, data_items);

          case 'TextInput':
          case 'NumberInput':
          case 'TextArea':
          case 'DatePicker':
          case 'RadioButtons':
          case 'Rating':
          case 'Tags':
          case 'Range':
            // case 'Dropdown':
            return _this10.getInputElement(item);

          case 'CustomElement':
            return _this10.getCustomElement(item);

          case 'Four_Column_Row':
            return _this10.getContainerElement(item, _multiColumn.Four_Column_Row);

          case 'Three_Column_Row':
            return _this10.getContainerElement(item, _multiColumn.Three_Column_Row);

          case 'Two_Column_Row':
            return _this10.getContainerElement(item, _multiColumn.Two_Column_Row);

          case 'Signature':
            return /*#__PURE__*/_react["default"].createElement(Signature, {
              ref: function ref(c) {
                return _this10.inputs[item.fieldName] = c;
              },
              read_only: _this10.props.read_only || item.readOnly,
              mutable: true,
              key: "form_".concat(item.id),
              data: item,
              defaultValue: _this10._getDefaultValue(item)
            });

          case 'Checkboxes':
            return /*#__PURE__*/_react["default"].createElement(Checkboxes, {
              ref: function ref(c) {
                return _this10.inputs[item.fieldName] = c;
              },
              read_only: _this10.props.read_only,
              handleChange: _this10.handleChange,
              mutable: true,
              key: "form_".concat(item.id),
              data: item,
              defaultValue: _this10._optionsDefaultValue(item)
            });

          case 'Image':
            return /*#__PURE__*/_react["default"].createElement(Image, {
              ref: function ref(c) {
                return _this10.inputs[item.fieldName] = c;
              },
              handleChange: _this10.handleChange,
              mutable: true,
              key: "form_".concat(item.id),
              data: item,
              defaultValue: _this10._getDefaultValue(item)
            });

          case 'Download':
            return /*#__PURE__*/_react["default"].createElement(Download, {
              download_path: _this10.props.download_path,
              mutable: true,
              key: "form_".concat(item.id),
              data: item
            });

          case 'Camera':
            return /*#__PURE__*/_react["default"].createElement(Camera, {
              ref: function ref(c) {
                return _this10.inputs[item.fieldName] = c;
              },
              read_only: _this10.props.read_only || item.readOnly,
              mutable: true,
              key: "form_".concat(item.id),
              data: item,
              defaultValue: _this10._getDefaultValue(item)
            });

          default:
            return _this10.getSimpleElement(item);
        }
      });
      var formTokenStyle = {
        display: 'none'
      };
      var actionName = this.props.action_name ? this.props.action_name : 'Submit';
      var backName = this.props.back_name ? this.props.back_name : 'Cancel';
      var classes = 'react-form-builder-form';
      if (this.props.isReadable) classes += ' readable-form-preview';
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "scrollable-preview"
      }, /*#__PURE__*/_react["default"].createElement(_formValidator["default"], {
        emitter: this.emitter
      }), /*#__PURE__*/_react["default"].createElement("div", {
        className: classes
      }, /*#__PURE__*/_react["default"].createElement("form", {
        encType: "multipart/form-data",
        ref: function ref(c) {
          return _this10.form = c;
        },
        action: this.props.form_action,
        onSubmit: this.handleSubmit.bind(this),
        method: this.props.form_method
      }, this.props.authenticity_token && /*#__PURE__*/_react["default"].createElement("div", {
        style: formTokenStyle
      }, /*#__PURE__*/_react["default"].createElement("input", {
        name: "utf8",
        type: "hidden",
        value: "\u2713"
      }), /*#__PURE__*/_react["default"].createElement("input", {
        name: "authenticity_token",
        type: "hidden",
        value: this.props.authenticity_token
      }), /*#__PURE__*/_react["default"].createElement("input", {
        name: "task_id",
        type: "hidden",
        value: this.props.task_id
      })), items, /*#__PURE__*/_react["default"].createElement("div", {
        className: "btn-toolbar"
      }, !this.props.hide_actions && /*#__PURE__*/_react["default"].createElement("input", {
        type: "submit",
        className: "btn btn-big",
        value: actionName
      }), !this.props.hide_actions && this.props.back_action && /*#__PURE__*/_react["default"].createElement("a", {
        href: this.props.back_action,
        className: "btn btn-default btn-cancel btn-big"
      }, backName), this.props.getGeneratedJSON && !this.props.isReadable && /*#__PURE__*/_react["default"].createElement(_generateJson["default"], {
        data: this.props,
        getJSON: this.props.getGeneratedJSON,
        closePreview: this.props.closePreview
      })))));
    }
  }]);
  return ReactForm;
}(_react["default"].Component);

exports["default"] = ReactForm;
ReactForm.defaultProps = {
  validateForCorrectness: false
};
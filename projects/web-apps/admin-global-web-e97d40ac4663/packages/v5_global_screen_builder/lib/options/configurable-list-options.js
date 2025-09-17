"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _UUID = _interopRequireDefault(require("../UUID"));
var _core = require("@material-ui/core");
var _reactTextareaAutosize = _interopRequireDefault(require("react-textarea-autosize"));
var _CheckCircle = _interopRequireDefault(require("@material-ui/icons/CheckCircle"));
var _RadioButtonUnchecked = _interopRequireDefault(require("@material-ui/icons/RadioButtonUnchecked"));
var _icons = require("@material-ui/icons");
var _materialElementsConfig = require("../material-elements-config");
var _store = _interopRequireDefault(require("../stores/store"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
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
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function isDefaultItem(item) {
  var keys = Object.keys(item);
  return keys.filter(function (x) {
    return x !== 'element' && x !== 'key';
  }).length === 0;
}
function buildItems(items, defaultItems) {
  if (!items) {
    return defaultItems;
  }
  return items.map(function (x) {
    var found;
    if (isDefaultItem(x)) {
      found = defaultItems.find(function (y) {
        return (x.element || x.key) === (y.element || y.key);
      });
    }
    return found || x;
  });
}
var ConfigurableOptions = /*#__PURE__*/function (_React$Component) {
  _inherits(ConfigurableOptions, _React$Component);
  var _super = _createSuper(ConfigurableOptions);
  function ConfigurableOptions(props) {
    var _this;
    _classCallCheck(this, ConfigurableOptions);
    _this = _super.call(this, props);
    _defineProperty(_assertThisInitialized(_this), "checkListTextAreaHandleChange", function (e) {
      var this_element = _this.state.element;
      var text = e.target.value;
      var optionsData = text.split('\n');
      this_element.customOptions.optionsText = text;
      this_element.checkListOptions = [];
      var headerList = [];
      for (var i = 0; i < optionsData.length; i++) {
        var data = optionsData[i];
        var splittedData = data.split(':');
        var headerValue = {
          label: splittedData[0],
          headerId: i.toString(),
          required: false
        };
        if (splittedData[1] != undefined && splittedData[1].trim() == "text") {
          headerValue.type = splittedData[1].trim();
          if (splittedData[2] != undefined) {
            headerValue.placeholder = splittedData[2];
          }
        } else if (splittedData[1] != undefined && splittedData[1].trim() == "number") {
          headerValue.type = splittedData[1].trim();
          if (splittedData[2] != undefined) {
            headerValue.placeholder = splittedData[2];
          }
        } else if (splittedData[1] != undefined && splittedData[1].trim() == "textarea") {
          headerValue.type = splittedData[1].trim();
          if (splittedData[2] != undefined) {
            headerValue.placeholder = splittedData[2];
          }
        } else if (splittedData[1] != undefined && splittedData[1].trim() == "dropdown") {
          headerValue.type = splittedData[1].trim();
          if (splittedData[2] != undefined) {
            var options = splittedData[2].split(',');
            headerValue.options = [];
            for (var j = 0; j < options.length; j++) {
              headerValue.options.push({
                value: options[j],
                label: options[j],
                key: _UUID.default.uuid()
              });
            }
          }
          if (splittedData[3] != undefined) {
            headerValue.placeholder = splittedData[2];
          }
        } else if (splittedData[1] != undefined && splittedData[1].trim() == "radio") {
          headerValue.type = splittedData[1].trim();
          if (splittedData[2] != undefined) {
            var _options = splittedData[2].split(',');
            headerValue.options = [];
            for (var _j = 0; _j < _options.length; _j++) {
              headerValue.options.push({
                value: _options[_j],
                label: _options[_j],
                key: _UUID.default.uuid()
              });
            }
          }
        } else if (splittedData[1] != undefined && splittedData[1].trim() == "checkbox") {
          headerValue.type = splittedData[1].trim();
          if (splittedData[2] != undefined) {
            var _options2 = splittedData[2].split(',');
            headerValue.options = [];
            for (var _j2 = 0; _j2 < _options2.length; _j2++) {
              headerValue.options.push({
                value: _options2[_j2],
                label: _options2[_j2],
                key: _UUID.default.uuid()
              });
            }
          }
        } else if (splittedData[1] != undefined && splittedData[1].trim() == "date") {
          headerValue.type = splittedData[1].trim();
          if (splittedData[2] != undefined) {
            headerValue.dateFormat = splittedData[2].trim();
          }
        } else if (splittedData[1] != undefined && splittedData[1].trim() == "time") {
          headerValue.type = splittedData[1].trim();
          if (splittedData[2] != undefined) {
            headerValue.placeholder = splittedData[2];
          }
        } else if (splittedData[1] != undefined && splittedData[1].trim() == "static") {
          headerValue.type = splittedData[1].trim();
          if (splittedData[2] != undefined) {
            headerValue.staticText = splittedData[2];
          }
        }
        headerList.push(headerValue);
      }
      this_element.headerList = headerList;
      _this.setState({
        element: this_element,
        dirty: true
      });
      // this.props.updateElement.call(this.props.preview, this_element);
    });
    _defineProperty(_assertThisInitialized(_this), "maximalRows", function (e) {
      var this_element = _this.state.element;
      var value = e.target.value;
      this_element.customOptions.maximalRows = value;
      _this.setState({
        element: this_element,
        dirty: true
      });
    });
    _defineProperty(_assertThisInitialized(_this), "minimalRows", function (e) {
      var this_element = _this.state.element;
      var value = e.target.value;
      this_element.customOptions.minimalRows = value;
      if (this_element.customOptions.minimalRows > 1) {
        var previousData = this_element.rows;
        this_element.rows = [];
        for (var i = 0; i < this_element.customOptions.minimalRows; i++) {
          previousData.rowId = i;
          this_element.rows.push(previousData);
        }
      }
      _this.setState({
        element: this_element,
        dirty: true
      });
    });
    _defineProperty(_assertThisInitialized(_this), "addLabelChange", function (e) {
      var this_element = _this.state.element;
      var value = e.target.value;
      this_element.customOptions.labelAdd = value;
      _this.setState({
        element: this_element,
        dirty: true
      });
    });
    _defineProperty(_assertThisInitialized(_this), "removeLabelChange", function (e) {
      var this_element = _this.state.element;
      var value = e.target.value;
      this_element.customOptions.labelRemove = value;
      _this.setState({
        element: this_element,
        dirty: true
      });
    });
    _defineProperty(_assertThisInitialized(_this), "tableRowActions", function (elemProp) {
      var this_element = _this.state.element;
      if (!this_element.customOptions[elemProp]) {
        this_element.customOptions[elemProp] = true;
      } else {
        this_element.customOptions[elemProp] = false;
        // this_element.customOptions.headerList.map((h, i) => {
        //     this_element.customOptions.headerList[i]["required"] = false;
        // });
      }

      _this.setState({
        element: this_element,
        dirty: true
      });
    });
    var items = buildItems(_this.getItemsConfig(props.items), _this._defaultItems());
    _this.state = {
      element: _this.props.element,
      data: _this.props.data,
      dirty: false,
      items: items,
      count: [0],
      headerList: {}
    };
    return _this;
  }
  _createClass(ConfigurableOptions, [{
    key: "_defaultItems",
    value: function _defaultItems() {
      return [{
        key: 'Header',
        name: 'Header Text',
        icon: 'fas fa-heading',
        static: true,
        content: 'Placeholder Text...'
      }, {
        key: 'Label',
        name: 'Label',
        static: true,
        icon: 'fas fa-font',
        content: 'Placeholder Text...'
      }, {
        key: 'Paragraph',
        name: 'Paragraph',
        static: true,
        icon: 'fas fa-paragraph',
        content: 'Placeholder Text...'
      }, {
        key: 'LineBreak',
        name: 'Line Break',
        static: true,
        icon: 'fas fa-arrows-alt-h'
      }, {
        key: 'Dropdown',
        canHaveAnswer: true,
        name: 'Dropdown',
        icon: 'far fa-caret-square-down',
        label: 'Placeholder Label',
        fieldName: 'dropdown_',
        options: []
      }, {
        key: 'Tags',
        canHaveAnswer: true,
        name: 'Tags',
        icon: 'fas fa-tags',
        label: 'Placeholder Label',
        fieldName: 'tags_',
        options: []
      }, {
        key: 'Checkboxes',
        canHaveAnswer: true,
        name: 'Checkboxes',
        icon: 'far fa-check-square',
        label: 'Placeholder Label',
        fieldName: 'checkboxes_',
        options: []
      }, {
        key: 'RadioButtons',
        canHaveAnswer: true,
        name: 'Multiple Choice',
        icon: 'far fa-dot-circle',
        label: 'Placeholder Label',
        fieldName: 'radiobuttons_',
        options: []
      }, {
        key: 'TextInput',
        canHaveAnswer: true,
        name: 'Text Input',
        label: 'Placeholder Label',
        icon: 'fas fa-font',
        fieldName: 'text_input_'
      }, {
        key: 'NumberInput',
        canHaveAnswer: true,
        name: 'Number Input',
        label: 'Placeholder Label',
        icon: 'fas fa-plus',
        fieldName: 'number_input_'
      }, {
        key: 'TextArea',
        canHaveAnswer: true,
        name: 'Multi-line Input',
        label: 'Placeholder Label',
        icon: 'fas fa-text-height',
        fieldName: 'text_area_'
      }, {
        key: 'Image',
        name: 'Image',
        label: '',
        icon: 'far fa-image',
        fieldName: 'image_',
        src: ''
      }, {
        key: 'Rating',
        canHaveAnswer: true,
        name: 'Rating',
        label: 'Placeholder Label',
        icon: 'fas fa-star',
        fieldName: 'rating_'
      }, {
        key: 'DatePicker',
        canDefaultToday: true,
        canReadOnly: true,
        dateFormat: 'MM/dd/yyyy',
        timeFormat: 'hh:mm aa',
        showTimeSelect: false,
        showTimeSelectOnly: false,
        name: 'Date',
        icon: 'far fa-calendar-alt',
        label: 'Placeholder Label',
        fieldName: 'date_picker_'
      }, {
        key: 'Signature',
        canReadOnly: true,
        name: 'Signature',
        icon: 'fas fa-pen-square',
        label: 'Signature',
        fieldName: 'signature_'
      }, {
        key: 'HyperLink',
        name: 'Web site',
        icon: 'fas fa-link',
        static: true,
        content: 'Placeholder Web site link ...',
        href: 'http://www.example.com'
      }, {
        key: 'Download',
        name: 'File Attachment',
        icon: 'fas fa-file',
        static: true,
        content: 'Placeholder file name ...',
        fieldName: 'download_',
        file_path: '',
        _href: ''
      }, {
        key: 'Range',
        name: 'Range',
        icon: 'fas fa-sliders-h',
        label: 'Placeholder Label',
        fieldName: 'range_',
        step: 1,
        default_value: 3,
        min_value: 1,
        max_value: 5,
        min_label: 'Easy',
        max_label: 'Difficult'
      }, {
        key: 'Camera',
        name: 'Camera',
        icon: 'fas fa-camera',
        label: 'Placeholder Label',
        fieldName: 'camera_'
      }, {
        key: "Button",
        canHaveAnswer: true,
        name: "Button",
        icon: "fas fa-digital-tachograph",
        label: "Placeholder Label",
        fieldName: "button",
        options: []
      }];
    }
  }, {
    key: "getItemsConfig",
    value: function getItemsConfig(items) {
      if (!items) return null;
      var items_list = [];
      items.map(function (item) {
        if (_materialElementsConfig.ITEMS_LIST[item]) items_list.push(_materialElementsConfig.ITEMS_LIST[item]);
      });
      return items_list;
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
    key: "removeTableHeader",
    value: function removeTableHeader(el) {
      var count = _toConsumableArray(this.state.count); // make a separate copy of the array
      var index = count.indexOf(el);
      if (index !== -1) {
        count.splice(index, 1);
        this.setState({
          count: count
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;
      if (this.state.dirty) {
        this.state.element.dirty = true;
      }
      var btnStyle = {
        color: "#50BEB6",
        border: "1px solid #50BEB6",
        backgroundColor: "#F0FBF9"
      };
      var gridContainer = {};
      return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_core.Grid, {
        container: true,
        spacing: 2,
        className: "padding-top-10"
      }, /*#__PURE__*/_react.default.createElement(_core.Grid, {
        item: true,
        xs: 12
      }, /*#__PURE__*/_react.default.createElement(_core.FormLabel, {
        component: "legend"
      }, "Rows Count:")), /*#__PURE__*/_react.default.createElement(_core.Grid, {
        item: true,
        xs: 12
      }, /*#__PURE__*/_react.default.createElement(_core.TextField, {
        type: "number",
        variant: "outlined",
        style: {
          width: "100%"
        },
        placeholder: "Size",
        value: this.props.element.customOptions.maximalRows,
        onChange: this.maximalRows
      })), /*#__PURE__*/_react.default.createElement(_core.Grid, {
        item: true,
        xs: 12,
        className: "mt-3"
      }, /*#__PURE__*/_react.default.createElement(_core.FormLabel, {
        component: "legend"
      }, "Table Row Actions:")), /*#__PURE__*/_react.default.createElement(_core.Grid, {
        container: true,
        className: "ml-2"
      }, /*#__PURE__*/_react.default.createElement(_core.Grid, {
        xs: 4
      }, /*#__PURE__*/_react.default.createElement(_core.Tooltip, {
        title: "If Edit is deselected, user will not be allowed to enter any data"
      }, /*#__PURE__*/_react.default.createElement(_core.Button, {
        variant: "contained",
        onClick: function onClick() {
          return _this2.tableRowActions("editRow");
        },
        className: "".concat(this.props.element.customOptions.editRow ? "tableButtonEnabled" : "tableButtonDisabled")
      }, "Edit"))), /*#__PURE__*/_react.default.createElement(_core.Grid, {
        xs: 4
      }, /*#__PURE__*/_react.default.createElement(_core.Button, {
        variant: "contained",
        onClick: function onClick() {
          return _this2.tableRowActions("viewRow");
        },
        className: "".concat(this.props.element.customOptions.viewRow ? "tableButtonEnabled" : "tableButtonDisabled")
      }, "View")), /*#__PURE__*/_react.default.createElement(_core.Grid, {
        xs: 4
      }, /*#__PURE__*/_react.default.createElement(_core.Button, {
        variant: "contained",
        onClick: function onClick() {
          return _this2.tableRowActions("deleteRow");
        },
        className: "".concat(this.props.element.customOptions.deleteRow ? "tableButtonEnabled" : "tableButtonDisabled")
      }, "Delete"))), /*#__PURE__*/_react.default.createElement(_core.Grid, {
        item: true,
        xs: 12,
        sm: 12,
        className: " padding-top-10 padding-bottom-10 mt-4"
      }, /*#__PURE__*/_react.default.createElement(_core.FormLabel, {
        component: "legend"
      }, "Table Header Labels:"), /*#__PURE__*/_react.default.createElement(_core.Grid, {
        style: {
          border: '1px solid lightgrey',
          padding: "1rem",
          backgroundColor: "rgba(0, 0, 0, 0.020)"
        }
      }, this.props.element.customOptions.headerList.map(function (el, index) {
        var _React$createElement;
        return /*#__PURE__*/_react.default.createElement(_core.Grid, {
          item: true,
          xs: 12,
          className: "mt-3"
        }, /*#__PURE__*/_react.default.createElement("div", {
          justifyContent: "space-around",
          alignItems: "center",
          style: {
            marginBottom: "2rem"
          }
        }, /*#__PURE__*/_react.default.createElement("span", {
          className: "mr-3",
          style: {
            fontWeight: 500,
            opacity: "0.7"
          }
        }, "Mandatory Field: "), /*#__PURE__*/_react.default.createElement(_core.FormControlLabel
        // this_required={this_required}
        , {
          name: "is_required",
          style: {
            position: "relative",
            top: "3px"
          },
          control: /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_core.Button, {
            variant: "outlined",
            size: "small",
            name: "No",
            className: "mr-3",
            onClick: function onClick(e) {
              return _this2.props.handleTableOptions("required", index, false);
            }
            // color={this_required ? "default" : "primary"}
            //style={{ outline: "none", textTransform: "capitalize" }}
            // className={`ml-4 mr-2 ${classes.btnStyle}`}
          }, /*#__PURE__*/_react.default.createElement("span", null, "No"), /*#__PURE__*/_react.default.createElement(_core.Checkbox, {
            className: "p-0 ml-1",
            color: "primary",
            name: "No",
            icon: /*#__PURE__*/_react.default.createElement(_RadioButtonUnchecked.default, {
              className: "checkboxSize"
            }),
            checked: !el.required,
            checkedIcon: /*#__PURE__*/_react.default.createElement(_CheckCircle.default, {
              className: "checkboxSize"
            })
          })), /*#__PURE__*/_react.default.createElement(_core.Button, (_React$createElement = {
            variant: "outlined",
            size: "small"
            //style={{ outline: "none" }}
            ,
            name: "Yes"
            // color={this_required ? "primary" : "default"}
          }, _defineProperty(_React$createElement, "name", "is_required"), _defineProperty(_React$createElement, "onClick", function onClick(e) {
            return _this2.props.handleTableOptions("required", index, true);
          }), _React$createElement), /*#__PURE__*/_react.default.createElement("span", null, "Yes"), /*#__PURE__*/_react.default.createElement(_core.Checkbox, {
            className: "p-0 ml-1",
            color: "primary"
            // name="YES"
            ,
            name: "is_required",
            icon: /*#__PURE__*/_react.default.createElement(_RadioButtonUnchecked.default, {
              className: "checkboxSize"
            }),
            checked: el.required,
            checkedIcon: /*#__PURE__*/_react.default.createElement(_CheckCircle.default, {
              className: "checkboxSize"
            })
          })))
        })), /*#__PURE__*/_react.default.createElement(_core.TextField, {
          variant: "outlined",
          select: true,
          style: {
            width: "100%"
          },
          value: el.type,
          onChange: function onChange(e) {
            return _this2.props.handleTableOptions("type", index, e);
          }
        }, _this2.state.items.map(function (item) {
          return /*#__PURE__*/_react.default.createElement(_core.MenuItem, {
            value: item.label,
            key: item.key
          }, item.label);
        })), /*#__PURE__*/_react.default.createElement(_core.Grid, {
          style: {
            display: "flex",
            alignItems: "center"
          }
        }, /*#__PURE__*/_react.default.createElement(_core.TextField, {
          type: "text",
          variant: "outlined",
          value: el.label,
          className: "mt-3",
          style: {
            width: "90%"
          },
          onChange: function onChange(e) {
            return _this2.props.handleTableOptions("label", index, e);
          }
        }), /*#__PURE__*/_react.default.createElement(_icons.Add, {
          className: "ml-4",
          style: {
            cursor: "pointer"
          },
          onClick: function onClick(e) {
            return _this2.props.addTableOptions(index, e);
          }
        }), index !== 0 ? /*#__PURE__*/_react.default.createElement(_icons.Remove, {
          className: "ml-4",
          style: {
            cursor: "pointer"
          },
          onClick: function onClick() {
            return _this2.props.removeTableOptions(index);
          }
        }) : null));
      })))));
    }
  }]);
  return ConfigurableOptions;
}(_react.default.Component);
exports.default = ConfigurableOptions;
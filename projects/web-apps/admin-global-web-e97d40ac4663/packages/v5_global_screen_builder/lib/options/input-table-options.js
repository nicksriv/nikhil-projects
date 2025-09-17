"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _UUID = _interopRequireDefault(require("../UUID"));
var _core = require("@material-ui/core");
var _Add = _interopRequireDefault(require("@material-ui/icons/Add"));
var _Remove = _interopRequireDefault(require("@material-ui/icons/Remove"));
var _styles = require("@material-ui/core/styles");
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
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
var theme = (0, _styles.createMuiTheme)({
  overrides: {
    MuiFormControlLabel: {
      label: {
        fontSize: '0.875rem'
      }
    }
  }
});
var InputTableOptions = /*#__PURE__*/function (_React$Component) {
  _inherits(InputTableOptions, _React$Component);
  var _super = _createSuper(InputTableOptions);
  function InputTableOptions(props) {
    var _this;
    _classCallCheck(this, InputTableOptions);
    _this = _super.call(this, props);
    _defineProperty(_assertThisInitialized(_this), "checkListTextAreaHandleChange", function (position, e) {
      var text = e.target.value;
      var optionsData = text.split('\n');
      var this_element = _this.state.element;
      var headerList = this_element.headerList;
      headerList[position].options = [];
      headerList[position].optionsText = text;
      for (var i = 0; i < optionsData.length; i++) {
        headerList[position].options.push({
          value: optionsData[i],
          label: optionsData[i],
          key: _UUID.default.uuid()
        });
      }
      this_element.headerList = headerList;
      _this.setState({
        element: this_element,
        dirty: true
      });
      // this.props.updateElement.call(this.props.preview, this_element);
    });
    _this.state = {
      element: _this.props.element,
      data: _this.props.data,
      dirty: false
    };
    return _this;
  }
  _createClass(InputTableOptions, [{
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
    key: "addHeaderLabel",
    value: function addHeaderLabel(position, e) {
      var this_element = this.state.element;
      var headerList = this_element.headerList;
      headerList[position].label = e.target.value;
      this_element.headerList = headerList;
      this.setState({
        element: this_element,
        dirty: true
      });
    }
  }, {
    key: "addHeaderFieldType",
    value: function addHeaderFieldType(position, e) {
      var this_element = this.state.element;
      var headerList = this_element.headerList;
      headerList[position].type = e.target.value;
      this_element.headerList = headerList;
      this.setState({
        element: this_element,
        dirty: true
      });
    }
  }, {
    key: "addHeader",
    value: function addHeader(position, e) {
      var this_element = this.state.element;
      var headerList = this_element.headerList;
      headerList.splice(position + 1, 0, {
        headerId: headerList.length.toString(),
        label: "Header Item",
        required: false,
        type: 'text',
        options: []
      });
      this_element.headerList = headerList;
      this.setState({
        element: this_element,
        dirty: true
      });
    }
  }, {
    key: "columnRequired",
    value: function columnRequired(elemProperty, position, e) {
      var this_element = this.state.element;
      var headerList = this_element.headerList;
      headerList[position].required = !headerList[position].required;
      this_element.headerList = headerList;
      this.setState({
        element: this_element,
        disty: true
      });
    }
  }, {
    key: "removeHeader",
    value: function removeHeader(position, e) {
      if (position == 0) return;
      var this_element = this.state.element;
      var headerList = this_element.headerList;
      headerList.splice(position, 1);
      this_element.headerList = headerList;
      this.setState({
        element: this_element,
        dirty: true
      });
    }
  }, {
    key: "setRows",
    value: function setRows(elemProperty, e) {
      var this_element = this.state.element;
      var rows = this_element.rows;
      if (e.target.value > rows.length) {
        var count = e.target.value - rows.length;
        rows.splice(rows.length, count, {
          rowId: rows.length
        });
      } else if (e.target.value < rows.length) {
        var _count = rows.length - e.target.value;
        rows.splice(e.target.value, _count);
      }
      this_element[elemProperty] = rows;
      this.setState({
        element: this_element,
        dirty: true
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;
      if (this.state.dirty) {
        this.state.element.dirty = true;
      }
      var headerList = this.state.element.hasOwnProperty('headerList') ? this.state.element.headerList : [{
        headerId: 0,
        label: "Header Item",
        type: "text",
        options: []
      }];
      var rowCount = this.state.element.hasOwnProperty('rows') ? this.state.element.rows.length : 1;
      var rows = [{
        rowId: 0
      }];
      if (this.props.element.hasOwnProperty('headerList')) {
        headerList = this.props.element.headerList;
        rows = this.props.element.rows;
      }
      return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_core.Grid, {
        container: true,
        spacing: 2,
        className: "padding-top-10"
      }, /*#__PURE__*/_react.default.createElement(_core.Grid, {
        container: true,
        spacing: 2
      }, /*#__PURE__*/_react.default.createElement(_core.Grid, {
        item: true,
        xs: 12
      }), /*#__PURE__*/_react.default.createElement(_core.Grid, {
        item: true,
        xs: 12,
        sm: 2,
        className: "element-options-border-grid"
      }, /*#__PURE__*/_react.default.createElement("label", {
        htmlFor: "is-row-count"
      }, "Rows Count:")), /*#__PURE__*/_react.default.createElement(_core.Grid, {
        item: true,
        xs: 12,
        sm: 10,
        className: "element-options-border-grid padding-bottom-10"
      }, /*#__PURE__*/_react.default.createElement(_core.TextField, {
        type: "number",
        label: "Size",
        defaultValue: rowCount,
        onChange: this.setRows.bind(this, "rows"),
        InputProps: {
          inputProps: {
            min: 1
          }
        }
      })), /*#__PURE__*/_react.default.createElement(_core.Grid, {
        item: true,
        xs: 12,
        className: "padding-top-10"
      }, /*#__PURE__*/_react.default.createElement(_core.FormLabel, {
        component: "legend"
      }, "Table Header Lables:")), headerList.map(function (header, index) {
        return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, {
          key: header.headerId
        }, /*#__PURE__*/_react.default.createElement(_core.Grid, null), /*#__PURE__*/_react.default.createElement(_core.Grid, {
          item: true,
          xs: 12,
          sm: 2
        }, /*#__PURE__*/_react.default.createElement(_core.FormControlLabel, {
          control: /*#__PURE__*/_react.default.createElement(_core.Checkbox, {
            checked: header.required,
            onChange: _this2.columnRequired.bind(_this2, 'required', index),
            name: "is-column-required" + index,
            color: "primary"
          }),
          label: "Required"
        })), /*#__PURE__*/_react.default.createElement(_core.Grid, {
          item: true,
          xs: 12,
          sm: 4,
          className: " padding-top-10 padding-bottom-10"
        }, /*#__PURE__*/_react.default.createElement(_core.FormGroup, null, /*#__PURE__*/_react.default.createElement("select", {
          value: header.type,
          id: "defaultSelect",
          onChange: function onChange(event) {
            return _this2.addHeaderFieldType(index, event);
          },
          className: "form-control"
        }, /*#__PURE__*/_react.default.createElement("option", {
          value: "text",
          key: "red"
        }, "Text"), /*#__PURE__*/_react.default.createElement("option", {
          value: "number",
          key: "blue"
        }, "Number"), /*#__PURE__*/_react.default.createElement("option", {
          value: "dropdown",
          key: "black"
        }, "Dropdown")))), /*#__PURE__*/_react.default.createElement(_core.Grid, {
          item: true,
          xs: 12,
          sm: 4
        }, /*#__PURE__*/_react.default.createElement(_core.TextField, {
          fullWidth: true,
          size: "small",
          variant: "outlined",
          value: header.label,
          defaultValue: header.label,
          placeholder: "Add Header",
          onChange: _this2.addHeaderLabel.bind(_this2, index)
        })), /*#__PURE__*/_react.default.createElement(_core.Grid, {
          item: true,
          xs: 12,
          sm: 1
        }, /*#__PURE__*/_react.default.createElement(_core.IconButton, {
          "aria-label": "add"
        }, /*#__PURE__*/_react.default.createElement(_Add.default, {
          onClick: _this2.addHeader.bind(_this2, index)
        }))), /*#__PURE__*/_react.default.createElement(_core.Grid, {
          item: true,
          xs: 12,
          sm: 1
        }, index > 0 && /*#__PURE__*/_react.default.createElement(_core.IconButton, {
          "aria-label": "remove"
        }, /*#__PURE__*/_react.default.createElement(_Remove.default, {
          onClick: _this2.removeHeader.bind(_this2, index)
        }))), header.type == "dropdown" && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_core.Grid, {
          item: true,
          xs: 12,
          sm: 10
        }, /*#__PURE__*/_react.default.createElement(_core.Grid, {
          item: true,
          xs: 12
        }, /*#__PURE__*/_react.default.createElement(_core.FormLabel, {
          component: "legend"
        }, "Dropdown Options for ", header.label)), /*#__PURE__*/_react.default.createElement(_core.TextField, {
          size: "small",
          multiline: true,
          fullWidth: true,
          rows: 3,
          variant: "outlined",
          value: header.optionsText != undefined ? header.optionsText : '',
          onChange: function onChange(event) {
            return _this2.checkListTextAreaHandleChange(index, event);
          }
        })), /*#__PURE__*/_react.default.createElement(_core.Grid, {
          item: true,
          xs: 12,
          sm: 2
        })));
      }))));
    }
  }]);
  return InputTableOptions;
}(_react.default.Component);
exports.default = InputTableOptions;
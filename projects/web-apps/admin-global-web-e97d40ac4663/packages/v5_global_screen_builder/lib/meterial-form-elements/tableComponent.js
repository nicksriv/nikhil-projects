"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _styles = require("@material-ui/core/styles");
var _core = require("@material-ui/core");
var _componentHeader = _interopRequireDefault(require("../form-elements/component-header"));
var _materialElementLabel = _interopRequireDefault(require("./material-element-label"));
var _colors = require("@material-ui/core/colors");
var _store = _interopRequireDefault(require("../stores/store"));
var _MenuItem = _interopRequireDefault(require("@material-ui/core/MenuItem"));
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
var useStyles = (0, _styles.makeStyles)(function (theme) {
  return {
    table: {
      minWidth: 450
    },
    input: {
      minWidth: 10,
      width: '25ch'
    },
    margin: {
      margin: theme.spacing(1)
    },
    tableHeaderRow: {
      background: '#dee2e6'
    }
  };
});
var theme = (0, _styles.createMuiTheme)({
  palette: {
    primary: _colors.green
  }
});
function createData(name, calories, fat, carbs, protein) {
  return {
    name: name,
    calories: calories,
    fat: fat,
    carbs: carbs,
    protein: protein
  };
}
var rows = [createData('Frozen yoghurt', 159, 6.0, 24, 4.0), createData('Ice cream sandwich', 237, 9.0, 37, 4.3), createData('Eclair', 262, 16.0, 24, 6.0), createData('Cupcake', 305, 3.7, 67, 4.3), createData('Gingerbread', 356, 16.0, 49, 3.9)];
var TextInputCells = function TextInputCells(props) {
  var classes = useStyles();
  var result = props.rowResult != undefined ? props.rowResult.filter(function (data) {
    return data.headerId == props.columnIndex;
  }) : '';
  var resultVal = result != undefined && result.length > 0 ? result[0].value : '';
  var data = '';
  if (props.type == "text") {
    data = /*#__PURE__*/_react.default.createElement(_core.TextField, {
      size: "small",
      value: resultVal,
      required: props.required,
      onChange: function onChange(event) {
        return props.handleChangeVal(props.rowResult, props.columnIndex, props.rowIndex, event);
      },
      variant: props.fieldVariant
    });
  } else if (props.type == "number") {
    data = /*#__PURE__*/_react.default.createElement(_core.TextField, {
      size: "small",
      type: "number",
      required: props.required,
      value: resultVal,
      onChange: function onChange(event) {
        return props.handleChangeVal(props.rowResult, props.columnIndex, props.rowIndex, event);
      },
      variant: props.fieldVariant
    });
  } else if (props.type == "dropdown") {
    data = /*#__PURE__*/_react.default.createElement(_core.TextField, {
      size: "small",
      label: "Please select",
      variant: props.fieldVariant,
      style: {
        width: 200
      },
      select: true,
      value: resultVal,
      required: props.required,
      onChange: function onChange(event) {
        return props.handleChangeVal(props.rowResult, props.columnIndex, props.rowIndex, event);
      }
    }, props.options != undefined && props.options.map(function (option) {
      var this_key = "preview_".concat(option.key);
      return /*#__PURE__*/_react.default.createElement(_MenuItem.default, {
        value: option.value,
        key: this_key
      }, option.label);
    }));
  }
  return data;
};
rows.map(function (row, index) {
  return /*#__PURE__*/_react.default.createElement(_core.TableRow, {
    key: row
  }, /*#__PURE__*/_react.default.createElement(_core.TableCell, {
    component: "th",
    scope: "row",
    align: "left"
  }, /*#__PURE__*/_react.default.createElement(TextInputCells, {
    id: row + '' + index
  })));
});
var MyTable = function MyTable(props) {
  var classes = useStyles();
  return /*#__PURE__*/_react.default.createElement(_core.TableContainer, {
    component: _core.Paper
  }, /*#__PURE__*/_react.default.createElement(_core.Table, {
    className: classes.table,
    "aria-label": "simple table"
  }, /*#__PURE__*/_react.default.createElement(_core.TableHead, null, /*#__PURE__*/_react.default.createElement(_core.TableRow, {
    className: classes.tableHeaderRow
  }, props.tableHeaders.map(function (header, index) {
    return /*#__PURE__*/_react.default.createElement(_core.TableCell, {
      align: "left",
      key: index
    }, /*#__PURE__*/_react.default.createElement("b", null, header.label + (header.required ? " *" : "")));
  }))), /*#__PURE__*/_react.default.createElement(_core.TableBody, null, props.rows.map(function (row, rowIndex) {
    var rows = props.tableRowResult != undefined ? props.tableRowResult.filter(function (data) {
      return data.rowId == row.rowId;
    }) : "";
    var rowVal = rows != undefined && rows.length > 0 ? rows[0].result : '';
    return /*#__PURE__*/_react.default.createElement(_core.TableRow, {
      key: row.rowId
    }, props.tableHeaders.map(function (header, cellIndex) {
      return /*#__PURE__*/_react.default.createElement(_core.TableCell, {
        key: row + cellIndex,
        component: "th",
        scope: "row",
        align: "left"
      }, /*#__PURE__*/_react.default.createElement(_core.Grid, {
        style: {
          width: '250px'
        }
      }, /*#__PURE__*/_react.default.createElement(TextInputCells, {
        handleChangeVal: props.handleChangeVal,
        columnIndex: cellIndex,
        rowIndex: rowIndex,
        rowResult: rowVal,
        options: header.options,
        type: header.type,
        required: header.required,
        fieldVariant: props.fieldVariant,
        id: row + '' + rowIndex
      })));
    }));
  }))));
};
var Input_Table = /*#__PURE__*/function (_React$Component) {
  _inherits(Input_Table, _React$Component);
  var _super = _createSuper(Input_Table);
  function Input_Table(props) {
    var _this;
    _classCallCheck(this, Input_Table);
    _this = _super.call(this, props);
    _defineProperty(_assertThisInitialized(_this), "handleChangeVal", function (rowVal, columnIndex, rowIndex, event) {
      var status = _this.state.status;
      _this.state.tableRowResult.map(function (data) {
        if (data.rowId == rowIndex) {
          if (data.result != undefined) {
            var rowData = data.result.filter(function (rowResult) {
              return rowResult.headerId == columnIndex;
            });
            if (rowData != undefined && rowData.length > 0) {
              rowData[0].value = event.target.value;
            } else {
              var val = {
                headerId: columnIndex,
                value: event.target.value
              };
              data.result.push(val);
            }
          } else {
            var _val = {
              headerId: columnIndex,
              value: event.target.value
            };
            data.result = [];
            data.result.push(_val);
          }
        }
      });
      var fieldResult = _this.state.fieldResult;
      fieldResult.tableRowResult = _this.state.tableRowResult;
      fieldResult.error = false;
      _this.setState(status);
      _this.props.collectFieldResults(fieldResult);
    });
    var onLoad = props.onLoad,
      onPost = props.onPost;
    _store.default.setExternalHandler(onLoad, onPost);
    _this.state = {
      data: [props.data],
      headerList: [_defineProperty({
        label: 'Header Item 1',
        headerId: "header1",
        required: false,
        type: 'text'
      }, "headerId", "0")],
      rows: [{
        rowId: 0
      }],
      tableRowResult: props.result ? props.result.tableRowResult : [],
      fieldResult: {
        questionId: props.data.id,
        value: '',
        error: false,
        tableRowResult: []
      }
    };
    return _this;
  }
  _createClass(Input_Table, [{
    key: "addRow",
    value: function addRow() {
      console.log("Add Row");
      var data = this.state.data;
      var rows = data[0].hasOwnProperty('rows') ? data[0].rows : this.state.rows;
      rows.push({
        rowId: rows.length
      });
      data[0].rows = rows;
      var totalList = this.props.totalItems;
      _store.default.dispatch('updateOrder', totalList);
    }
  }, {
    key: "deleteRow",
    value: function deleteRow() {
      console.log("Delete Row");
      var data = this.state.data;
      var rows = data[0].hasOwnProperty('rows') ? data[0].rows : this.state.rows;
      rows.pop();
      data[0].rows = rows;
      var totalList = this.props.totalItems;
      _store.default.dispatch('updateOrder', totalList);
    }
  }, {
    key: "render",
    value: function render() {
      var propsData = this.props.data;
      var headerList = propsData.hasOwnProperty('headerList') ? propsData.headerList : this.state.headerList;
      var rows = propsData.hasOwnProperty('rows') ? propsData.rows : this.state.rows;

      /** Result Data */
      this.state.tableRowResult = propsData.result ? propsData.result.tableRowResult : rows;
      var fieldVariant = "";
      if (this.props.globalStyles) {
        fieldVariant = !this.props.globalStyles.formDefault && this.props.data.hasOwnProperty("fieldVariant") ? this.props.data.fieldVariant : this.props.globalStyles.globalFieldVariant;
      } else {
        if (this.props.data.fieldVariant) fieldVariant = this.props.data.fieldVariant;
      }
      var CHARACTER_LIMIT = propsData.isCharLimit && propsData.charLimit > 0 ? propsData.charLimit : 0;
      var formPreview = this.props.hasOwnProperty('isFormPreview') ? this.props.isFormPreview : false;
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "SortableItem rfb-item"
      }, /*#__PURE__*/_react.default.createElement(_componentHeader.default, this.props), /*#__PURE__*/_react.default.createElement("div", {
        className: "form-group"
      }, /*#__PURE__*/_react.default.createElement(_materialElementLabel.default, this.props), /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(MyTable, {
        handleChangeVal: this.handleChangeVal,
        tableHeaders: headerList,
        rows: rows,
        tableRowResult: this.state.tableRowResult,
        fieldVariant: fieldVariant
      }), /*#__PURE__*/_react.default.createElement(_core.Button, {
        onClick: this.addRow.bind(this),
        color: "primary"
      }, "Add Row"), /*#__PURE__*/_react.default.createElement(_core.Button, {
        onClick: this.deleteRow.bind(this),
        color: "secondary"
      }, "Delete Row"))));
    }
  }]);
  return Input_Table;
}(_react.default.Component);
var _default = Input_Table;
exports.default = _default;
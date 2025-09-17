"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _styles = require("@material-ui/core/styles");

var _core = require("@material-ui/core");

var _componentHeader = _interopRequireDefault(require("../form-elements/component-header"));

var _materialElementLabel = _interopRequireDefault(require("./material-element-label"));

var _colors = require("@material-ui/core/colors");

var _store = _interopRequireDefault(require("../stores/store"));

var _MenuItem = _interopRequireDefault(require("@material-ui/core/MenuItem"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

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
    data = /*#__PURE__*/_react["default"].createElement(_core.TextField, {
      size: "small",
      value: resultVal,
      required: props.required,
      onChange: function onChange(event) {
        return props.handleChangeVal(props.rowResult, props.columnIndex, props.rowIndex, event);
      },
      variant: props.fieldVariant
    });
  } else if (props.type == "number") {
    data = /*#__PURE__*/_react["default"].createElement(_core.TextField, {
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
    data = /*#__PURE__*/_react["default"].createElement(_core.TextField, {
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
      return /*#__PURE__*/_react["default"].createElement(_MenuItem["default"], {
        value: option.value,
        key: this_key
      }, option.label);
    }));
  }

  return data;
};

rows.map(function (row, index) {
  return /*#__PURE__*/_react["default"].createElement(_core.TableRow, {
    key: row
  }, /*#__PURE__*/_react["default"].createElement(_core.TableCell, {
    component: "th",
    scope: "row",
    align: "left"
  }, /*#__PURE__*/_react["default"].createElement(TextInputCells, {
    id: row + '' + index
  })));
});

var MyTable = function MyTable(props) {
  var classes = useStyles();
  return /*#__PURE__*/_react["default"].createElement(_core.TableContainer, {
    component: _core.Paper
  }, /*#__PURE__*/_react["default"].createElement(_core.Table, {
    className: classes.table,
    "aria-label": "simple table"
  }, /*#__PURE__*/_react["default"].createElement(_core.TableHead, null, /*#__PURE__*/_react["default"].createElement(_core.TableRow, {
    className: classes.tableHeaderRow
  }, props.tableHeaders.map(function (header, index) {
    return /*#__PURE__*/_react["default"].createElement(_core.TableCell, {
      align: "left",
      key: index
    }, /*#__PURE__*/_react["default"].createElement("b", null, header.label + (header.required ? " *" : "")));
  }))), /*#__PURE__*/_react["default"].createElement(_core.TableBody, null, props.rows.map(function (row, rowIndex) {
    var rows = props.tableRowResult != undefined ? props.tableRowResult.filter(function (data) {
      return data.rowId == row.rowId;
    }) : "";
    var rowVal = rows != undefined && rows.length > 0 ? rows[0].result : '';
    return /*#__PURE__*/_react["default"].createElement(_core.TableRow, {
      key: row.rowId
    }, props.tableHeaders.map(function (header, cellIndex) {
      return /*#__PURE__*/_react["default"].createElement(_core.TableCell, {
        key: row + cellIndex,
        component: "th",
        scope: "row",
        align: "left"
      }, /*#__PURE__*/_react["default"].createElement(_core.Grid, {
        style: {
          width: '250px'
        }
      }, /*#__PURE__*/_react["default"].createElement(TextInputCells, {
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
  (0, _inherits2["default"])(Input_Table, _React$Component);

  var _super = _createSuper(Input_Table);

  function Input_Table(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, Input_Table);
    _this = _super.call(this, props);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "handleChangeVal", function (rowVal, columnIndex, rowIndex, event) {
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

    _store["default"].setExternalHandler(onLoad, onPost);

    _this.state = {
      data: [props.data],
      headerList: [(0, _defineProperty2["default"])({
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

  (0, _createClass2["default"])(Input_Table, [{
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

      _store["default"].dispatch('updateOrder', totalList);
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

      _store["default"].dispatch('updateOrder', totalList);
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
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "SortableItem rfb-item"
      }, /*#__PURE__*/_react["default"].createElement(_componentHeader["default"], this.props), /*#__PURE__*/_react["default"].createElement("div", {
        className: "form-group"
      }, /*#__PURE__*/_react["default"].createElement(_materialElementLabel["default"], this.props), /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(MyTable, {
        handleChangeVal: this.handleChangeVal,
        tableHeaders: headerList,
        rows: rows,
        tableRowResult: this.state.tableRowResult,
        fieldVariant: fieldVariant
      }), /*#__PURE__*/_react["default"].createElement(_core.Button, {
        onClick: this.addRow.bind(this),
        color: "primary"
      }, "Add Row"), /*#__PURE__*/_react["default"].createElement(_core.Button, {
        onClick: this.deleteRow.bind(this),
        color: "secondary"
      }, "Delete Row"))));
    }
  }]);
  return Input_Table;
}(_react["default"].Component);

var _default = Input_Table;
exports["default"] = _default;
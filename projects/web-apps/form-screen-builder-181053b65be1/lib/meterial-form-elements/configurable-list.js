"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

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

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _styles = require("@material-ui/core/styles");

var _core = require("@material-ui/core");

var _componentHeader = _interopRequireDefault(require("../form-elements/component-header"));

var _materialElementLabel = _interopRequireDefault(require("./material-element-label"));

var _colors = require("@material-ui/core/colors");

var _store = _interopRequireDefault(require("../stores/store"));

var _MenuItem = _interopRequireDefault(require("@material-ui/core/MenuItem"));

var _dateFns = _interopRequireDefault(require("@date-io/date-fns"));

var _pickers = require("@material-ui/pickers");

var _icons = require("@material-ui/icons");

var _email = _interopRequireDefault(require("./email"));

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
      background: '#0000001F'
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

  var _useState = (0, _react.useState)(null),
      _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
      selectedDate = _useState2[0],
      setDate = _useState2[1];

  var _useState3 = (0, _react.useState)(null),
      _useState4 = (0, _slicedToArray2["default"])(_useState3, 2),
      selectedTime = _useState4[0],
      setTime = _useState4[1];

  var setSelectedDate = function setSelectedDate(date) {
    setDate(date);
  };

  var setSelectedTime = function setSelectedTime(time) {
    setTime(time);
  };

  var data = '';
  console.log(props.data.required);

  if (props.data.type == "Short Text Field") {
    data = /*#__PURE__*/_react["default"].createElement(_core.TextField, {
      size: "small",
      disabled: props.customOptions.editRow ? false : true,
      required: props.data.required,
      variant: props.fieldVariant,
      helperText: props.data.required ? "This Field Is Required" : "",
      placeholder: props.data.placeholder
    });
  } else if (props.data.type == "Long Text Field") {
    data = /*#__PURE__*/_react["default"].createElement(_core.TextField, {
      size: "small",
      multiline: true,
      disabled: props.customOptions.editRow ? false : true,
      rows: 3,
      required: props.data.required,
      variant: props.fieldVariant,
      placeholder: props.data.placeholder
    });
  } else if (props.data.type == "Numbers") {
    data = /*#__PURE__*/_react["default"].createElement(_core.TextField, {
      size: "small",
      type: "number",
      disabled: props.customOptions.editRow ? false : true,
      required: props.data.required,
      variant: props.fieldVariant,
      placeholder: props.data.placeholder
    });
  } else if (props.data.type == "Dropdown") {
    data = /*#__PURE__*/_react["default"].createElement(_core.TextField, {
      size: "small",
      disabled: props.customOptions.editRow ? false : true,
      variant: props.fieldVariant,
      style: {
        width: 200
      },
      select: true,
      label: props.data.label,
      required: props.data.required,
      placeholder: props.data.placeholder
    }, props.data != undefined && props.data.options != undefined && props.data.options.map(function (option) {
      var this_key = "preview_".concat(option.key);
      return /*#__PURE__*/_react["default"].createElement(_MenuItem["default"], {
        value: option.value,
        key: this_key
      }, option.label);
    }));
  } else if (props.data.type == "checkbox") {
    data = props.data.options != undefined && props.data.options.map(function (option) {
      return /*#__PURE__*/_react["default"].createElement(_core.FormControlLabel, {
        disabled: props.customOptions.editRow ? false : true,
        control: /*#__PURE__*/_react["default"].createElement(_core.Checkbox, {
          checked: props.data.options[option.value],
          name: option.value,
          color: "primary"
        }),
        label: option.label
      });
    });
  } else if (props.data.type == "Button Radio") {
    data = /*#__PURE__*/_react["default"].createElement(_core.RadioGroup, {
      row: true,
      "aria-label": "material",
      name: "single-choice",
      required: props.data.required
    }, props.data.options != undefined && props.data.options.map(function (option) {
      return /*#__PURE__*/_react["default"].createElement(_core.FormControlLabel, {
        key: option.key,
        label: option.label,
        value: option.value,
        control: /*#__PURE__*/_react["default"].createElement(_core.Radio, {
          color: "primary"
        })
      });
    }));
  } else if (props.data.type == "Date Picker") {
    var dateFormat = "MM/dd/yyyy";

    if (props.data.dateFormat != undefined) {
      var dateFormat1 = 'MM/dd/yyyy';
      var dateFormat2 = 'dd/MM/yyyy';
      var dateFormat3 = 'yyyy/MM/dd';
      var dateFormat4 = 'yyyy/dd/MM';

      if (props.data.dateFormat.toLowerCase() == "mm/dd/yyyy") {
        dateFormat = dateFormat1;
      } else if (props.data.dateFormat.toLowerCase() == "dd/mm/yyyy") {
        dateFormat = dateFormat2;
      } else if (props.data.dateFormat.toLowerCase() == "yyyy/mm/dd") {
        dateFormat = dateFormat3;
      } else if (props.data.dateFormat.toLowerCase() == "yyyy/dd/mm") {
        dateFormat = dateFormat4;
      }
    }

    data = /*#__PURE__*/_react["default"].createElement(_pickers.MuiPickersUtilsProvider, {
      utils: _dateFns["default"]
    }, /*#__PURE__*/_react["default"].createElement(_core.Grid, {
      container: true,
      justifyContent: "space-around"
    }, /*#__PURE__*/_react["default"].createElement(_pickers.KeyboardDatePicker, {
      disableToolbar: true,
      variant: "inline",
      inputVariant: props.fieldVariant,
      format: dateFormat,
      value: selectedDate,
      onChange: setSelectedDate,
      margin: "normal",
      id: "date-picker-inline",
      autoOk: true,
      size: "medium",
      placeholder: dateFormat.toUpperCase(),
      KeyboardButtonProps: {
        'aria-label': 'change date'
      }
    })));
  } else if (props.data.type == "Time") {
    data = /*#__PURE__*/_react["default"].createElement(_pickers.MuiPickersUtilsProvider, {
      utils: _dateFns["default"]
    }, /*#__PURE__*/_react["default"].createElement(_core.Grid, {
      container: true,
      justifyContent: "space-around"
    }, /*#__PURE__*/_react["default"].createElement(_pickers.KeyboardTimePicker, {
      disabled: props.customOptions.editRow ? false : true,
      margin: "normal",
      id: "time-picker",
      variant: "inline",
      value: selectedTime,
      onChange: setSelectedTime,
      inputVariant: props.fieldVariant,
      label: "Time picker",
      KeyboardButtonProps: {
        'aria-label': 'change time'
      }
    })));
  } else if (props.data.type == "static") {
    data = /*#__PURE__*/_react["default"].createElement(_core.FormLabel, null, props.data.staticText);
  } else if (props.data.type = "Email") {
    data = /*#__PURE__*/_react["default"].createElement(_core.TextField, {
      size: "small",
      variant: props.fieldVariant,
      required: props.data.required,
      disabled: props.customOptions.editRow ? false : true,
      type: "email"
    });
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
      style: {
        padding: "12px"
      },
      key: index
    }, /*#__PURE__*/_react["default"].createElement("b", null, header.label + (header.required ? " *" : "")));
  }), /*#__PURE__*/_react["default"].createElement(_core.TableCell, {
    align: "right",
    style: {
      padding: "12px"
    }
  }, /*#__PURE__*/_react["default"].createElement("b", null, props.customOptions.headerActionLabel)))), /*#__PURE__*/_react["default"].createElement(_core.TableBody, null, props.rows.map(function (row, rowIndex) {
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
        customOptions: props.customOptions,
        data: header,
        options: header.options,
        type: header.type,
        required: header.required,
        fieldVariant: props.fieldVariant,
        id: row + '' + rowIndex
      })));
    }), /*#__PURE__*/_react["default"].createElement(_core.TableCell, {
      key: row + props.tableHeaders.length + 1,
      component: "th",
      scope: "row",
      align: "right"
    }, props.customOptions.deleteRow ? /*#__PURE__*/_react["default"].createElement(_icons.Delete, {
      value: rowIndex,
      onClick: props.deleteRow,
      style: {
        cursor: "pointer"
      }
    }) : null));
  }))));
};

var ConfigurableList = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(ConfigurableList, _React$Component);

  var _super = _createSuper(ConfigurableList);

  function ConfigurableList(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, ConfigurableList);
    _this = _super.call(this, props);
    var onLoad = props.onLoad,
        onPost = props.onPost;

    _store["default"].setExternalHandler(onLoad, onPost);

    _this.state = {
      data: [props.data],
      headerList: [],
      rows: [//{ rowId: 0 }
      ]
    };
    _this.deleteRow = _this.deleteRow.bind((0, _assertThisInitialized2["default"])(_this));
    return _this;
  }

  (0, _createClass2["default"])(ConfigurableList, [{
    key: "addRow",
    value: function addRow() {
      console.log("Add Row");
      var data = this.state.data;
      var rows = data[0].hasOwnProperty('rows') ? data[0].rows : this.state.rows; // if (data[0].customOptions.maximalRows == rows.length) {
      //     return;
      // }

      rows.push({
        rowId: rows.length
      });
      data[0].rows = rows;
      var totalList = this.props.totalItems;

      _store["default"].dispatch('updateOrder', totalList);
    }
  }, {
    key: "deleteRow",
    value: function deleteRow(rowIndex) {
      var index = rowIndex.currentTarget.value;
      console.log("Delete Row");
      var data = this.state.data;
      var rows = data[0].hasOwnProperty('rows') ? data[0].rows : this.state.rows;
      rows.splice(index, 1); // rows.pop();

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
      var fieldVariant = "";

      if (this.props.globalStyles) {
        fieldVariant = !this.props.globalStyles.formDefault && this.props.data.hasOwnProperty("fieldVariant") ? this.props.data.fieldVariant : this.props.globalStyles.globalFieldVariant;
      } else {
        if (this.props.data.fieldVariant) fieldVariant = this.props.data.fieldVariant;
      }

      var CHARACTER_LIMIT = propsData.isCharLimit && propsData.charLimit > 0 ? propsData.charLimit : 0;
      var formPreview = this.props.hasOwnProperty('isFormPreview') ? this.props.isFormPreview : false;
      var maximalRows = this.props.data.customOptions.maximalRows;
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "SortableItem rfb-item"
      }, /*#__PURE__*/_react["default"].createElement(_componentHeader["default"], this.props), /*#__PURE__*/_react["default"].createElement("div", {
        className: "form-group"
      }, /*#__PURE__*/_react["default"].createElement(_materialElementLabel["default"], this.props), /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(MyTable, {
        deleteRow: this.deleteRow,
        customOptions: propsData.customOptions,
        tableHeaders: propsData.customOptions.headerList,
        rows: rows,
        fieldVariant: fieldVariant
      }), (rows.length < parseInt(maximalRows) || maximalRows == "0") && /*#__PURE__*/_react["default"].createElement(_core.Button, {
        onClick: this.addRow.bind(this),
        style: {
          color: "#51BFB6"
        }
      }, propsData.customOptions.labelAdd))));
    }
  }]);
  return ConfigurableList;
}(_react["default"].Component);

var _default = ConfigurableList;
exports["default"] = _default;
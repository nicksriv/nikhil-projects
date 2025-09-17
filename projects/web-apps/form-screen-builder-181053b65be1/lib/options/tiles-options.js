"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireWildcard(require("react"));

var _core = require("@material-ui/core");

var _styles = require("@material-ui/core/styles");

var _styles2 = require("@material-ui/styles");

var _Add = _interopRequireDefault(require("@material-ui/icons/Add"));

var _Remove = _interopRequireDefault(require("@material-ui/icons/Remove"));

var _Info = _interopRequireDefault(require("@material-ui/icons/Info"));

var _Close = _interopRequireDefault(require("@material-ui/icons/Close"));

// const theme = createMuiTheme({
//     overrides: {
//         MuiFormControlLabel: {
//             label: {
//                 fontSize: '0.875rem',
//             }
//         }
//     }
// });
var characterLimitHelperTheme = (0, _styles.createMuiTheme)({
  overrides: {
    MuiFormHelperText: {
      root: {
        marginRight: 0,
        textAlign: 'right'
      }
    }
  }
});
var useStyles = (0, _styles2.makeStyles)(function (theme) {
  return {
    tooltip: {
      fontFamily: "SF Pro",
      fontSize: "12px"
    },
    icon: {
      color: "#666666",
      "&:hover": {
        color: "#50BFB7"
      }
    },
    disabledMode: {
      backgroundColor: "#d4d4d4 !important"
    }
  };
});
var RulesEnum = {
  STATIC: "static",
  DYNAMIC: "dynamic",
  INTERLINKED: "interlinked"
};

function TilesOptions(props) {
  var inputFieldSize = props.inputFieldSize,
      customOptions = props.customOptions,
      handleTilesOptions = props.handleTilesOptions,
      addTilesOptions = props.addTilesOptions,
      removeTilesOptions = props.removeTilesOptions;
  var InfoIconTooltip = (0, _styles2.styled)(function (_ref) {
    var className = _ref.className,
        props = (0, _objectWithoutProperties2["default"])(_ref, ["className"]);
    return /*#__PURE__*/_react["default"].createElement(_core.Tooltip, (0, _extends2["default"])({}, props, {
      classes: {
        popper: className
      }
    }));
  })(function (_ref2) {
    var theme = _ref2.theme;
    return (0, _defineProperty2["default"])({}, "& .MuiTooltip-tooltip", {
      maxWidth: 200,
      fontSize: '0.75rem',
      textAlign: 'left'
    });
  });

  var _React$useState = _react["default"].useState(30),
      _React$useState2 = (0, _slicedToArray2["default"])(_React$useState, 2),
      value = _React$useState2[0],
      setValue = _React$useState2[1];

  var handleSliderChange = function handleSliderChange(event, newValue, elemProperty, index) {
    //setValue(newValue);
    handleTilesOptions(elemProperty, index, {
      target: {
        value: newValue
      }
    });
  }; // const handleInputChange = (elemProperty, index, event) => {
  //     setValue(event.target.value === '' ? '' : Number(event.target.value));
  // };


  var handleBlur = function handleBlur(elemProperty, index) {
    var value = customOptions.tileProperties[index].text;

    if (value < 0) {
      //setValue(0);
      handleTilesOptions(elemProperty, index, {
        target: {
          value: 0
        }
      });
    } else if (value > 100) {
      //setValue(100);
      handleTilesOptions(elemProperty, index, {
        target: {
          value: 100
        }
      });
    }
  };

  var handleOnKeyDown = function handleOnKeyDown(event) {
    if (event.keyCode === 8 || event.keyCode === 46) {} else if (isNaN(Number(event.key))) {
      event.preventDefault();
    }
  };

  var classes = useStyles();
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, customOptions.tileProperties.map(function (option, index) {
    var this_key = "tiles_".concat(option.key);
    return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, {
      key: this_key
    }, /*#__PURE__*/_react["default"].createElement(_core.Grid, {
      item: true,
      xs: 12,
      className: "pt-2 pb-3",
      style: {
        borderBottom: "1px solid #bebebe"
      }
    }, /*#__PURE__*/_react["default"].createElement("div", {
      style: {
        backgroundColor: "#f0f0f0",
        padding: "15px"
      }
    }, /*#__PURE__*/_react["default"].createElement(_core.Grid, {
      item: true,
      xs: 12,
      className: "pb-4 flex"
    }, /*#__PURE__*/_react["default"].createElement(_core.TextField, {
      disabled: true,
      size: "small",
      variant: "outlined",
      id: "tilesId",
      label: "Tile's ID",
      value: customOptions.tileProperties[index].ID,
      onChange: function onChange(e) {
        return handleTilesOptions('title', index, e);
      }
    }), /*#__PURE__*/_react["default"].createElement(_core.IconButton, {
      style: {
        padding: '6px'
      },
      "aria-label": "add"
    }, /*#__PURE__*/_react["default"].createElement(_Add["default"] //style={{ marginLeft: "10px" }}
    , {
      onClick: function onClick(e) {
        return addTilesOptions(index, e);
      }
    }), index > 0 && /*#__PURE__*/_react["default"].createElement(_Remove["default"] //style={{ marginLeft: "10px" }}
    , {
      onClick: function onClick(e) {
        return removeTilesOptions(index, e);
      }
    }))), /*#__PURE__*/_react["default"].createElement(_core.Grid, {
      item: true,
      xs: 12,
      className: "pb-4"
    }, /*#__PURE__*/_react["default"].createElement(_styles.ThemeProvider, {
      theme: characterLimitHelperTheme
    }, /*#__PURE__*/_react["default"].createElement(_core.TextField, {
      required: true,
      fullWidth: true,
      size: "small",
      variant: "outlined",
      id: "outlined-basic",
      label: "Title",
      value: customOptions.tileProperties[index].title,
      FormHelperTextProps: {
        className: {
          marginLeft: "75%"
        }
      },
      inputProps: {
        maxlength: customOptions.charecterLimit
      },
      onChange: function onChange(e) {
        return handleTilesOptions('title', index, e);
      },
      InputLabelProps: {
        classes: {
          asterisk: "text-error"
        }
      },
      helperText: "".concat(customOptions.tileProperties[index].title.length, " / ").concat(customOptions.charecterLimit)
    }))), /*#__PURE__*/_react["default"].createElement(_core.Grid, {
      item: true,
      xs: 12,
      className: "pb-4"
    }, /*#__PURE__*/_react["default"].createElement(_core.TextField, {
      fullWidth: true,
      id: "rule",
      select: true,
      name: "rule",
      label: "Select Rule",
      type: "text",
      variant: "outlined",
      value: customOptions.tileProperties[index].rule,
      onChange: function onChange(e) {
        return handleTilesOptions('rule', index, e);
      }
    }, /*#__PURE__*/_react["default"].createElement(_core.MenuItem, {
      value: RulesEnum.STATIC
    }, "Make it Static"), index > 0 && customOptions.tileProperties.filter(function (e) {
      return e.textRule === "number";
    }).length > 0 && /*#__PURE__*/_react["default"].createElement(_core.MenuItem, {
      value: RulesEnum.INTERLINKED
    }, "Interlinked tiles component"))), customOptions.tileProperties[index].rule === RulesEnum.STATIC && /*#__PURE__*/_react["default"].createElement(_core.Grid, {
      item: true,
      xs: 12,
      className: "pb-4"
    }, /*#__PURE__*/_react["default"].createElement(_core.TextField, {
      fullWidth: true,
      id: "textRule",
      select: true,
      name: "textRule",
      label: "Text Attribute",
      type: "text",
      variant: "outlined",
      value: customOptions.tileProperties[index].textRule,
      onChange: function onChange(e) {
        return handleTilesOptions('textRule', index, e);
      }
    }, /*#__PURE__*/_react["default"].createElement(_core.MenuItem, {
      value: "text"
    }, "Short Text"), /*#__PURE__*/_react["default"].createElement(_core.MenuItem, {
      value: "number"
    }, "Number"))), customOptions.tileProperties[index].rule === RulesEnum.STATIC && customOptions.tileProperties[index].textRule === "text" && /*#__PURE__*/_react["default"].createElement(_core.Grid, {
      item: true,
      xs: 12,
      className: "pb-4"
    }, /*#__PURE__*/_react["default"].createElement(_core.TextField, {
      size: "small",
      variant: "outlined",
      id: "shortTextValue",
      name: "shortTextValue",
      label: "Text",
      value: customOptions.tileProperties[index].text,
      type: "text",
      fullWidth: true,
      onChange: function onChange(e) {
        return handleTilesOptions('text', index, e);
      }
    })), customOptions.tileProperties[index].rule === RulesEnum.STATIC && customOptions.tileProperties[index].textRule === "number" && /*#__PURE__*/_react["default"].createElement(_core.Grid, {
      item: true,
      xs: 12,
      className: "pb-4"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-evenly"
      }
    }, /*#__PURE__*/_react["default"].createElement("h6", {
      style: {
        marginRight: "10px",
        color: "#bababa"
      }
    }, "Number Value:"), /*#__PURE__*/_react["default"].createElement(_core.Slider, {
      id: "numberTextValue",
      name: "numberTextValue",
      value: customOptions.tileProperties[index].text,
      onChange: function onChange(e, newValue) {
        return handleSliderChange(e, newValue, 'text', index);
      },
      style: {
        marginRight: "10px",
        width: "132px"
      },
      "aria-labelledby": "input-slider"
    }), /*#__PURE__*/_react["default"].createElement(_core.TextField, {
      value: customOptions.tileProperties[index].text,
      size: "small",
      variant: "outlined",
      type: "number",
      onKeyDown: function onKeyDown(e) {
        return handleOnKeyDown(e);
      },
      onChange: function onChange(e) {
        return handleTilesOptions('text', index, e);
      },
      onBlur: function onBlur(e) {
        return handleBlur('text', index);
      },
      InputProps: {
        inputProps: {
          step: 10,
          min: 0,
          max: 100,
          type: 'number',
          'aria-labelledby': 'input-slider'
        }
      },
      style: {
        width: "70px"
      }
    }))), customOptions.tileProperties[index].rule === RulesEnum.INTERLINKED && /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_core.Grid, {
      item: true,
      xs: 12,
      className: "pb-4"
    }, /*#__PURE__*/_react["default"].createElement(_core.TextField, {
      fullWidth: true,
      id: "componentOnScreenSource",
      select: true,
      name: "componentOnScreenSource",
      label: "Select Component On Screen",
      type: "text",
      variant: "outlined",
      value: customOptions.tileProperties[index].componentOnScreenSource,
      onChange: function onChange(e) {
        return handleTilesOptions('componentOnScreenSource', index, e);
      }
    }, customOptions.tileProperties.map(function (p, i) {
      return p.textRule === "number" && /*#__PURE__*/_react["default"].createElement(_core.MenuItem, {
        value: p.ID
      }, p.ID);
    }))), /*#__PURE__*/_react["default"].createElement(_core.Grid, {
      item: true,
      xs: 12,
      style: {
        display: "flex",
        justifyContent: "space-around"
      },
      className: "pb-4"
    }, /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(_core.Button, {
      className: !customOptions.tileProperties[index].componentOnScreenTarget && classes.disabledMode,
      disabled: !customOptions.tileProperties[index].componentOnScreenTarget ? true : false,
      variant: "".concat(customOptions.tileProperties[index].componentOnScreenMethod == "add" ? "contained" : "outlined"),
      size: "small",
      color: "".concat(customOptions.tileProperties[index].componentOnScreenMethod == "add" ? "primary" : "default"),
      onClick: function onClick(e) {
        return handleTilesOptions('componentOnScreenMethod', index, 'add');
      },
      style: {
        minWidth: "30px",
        marginRight: "10px"
      }
    }, /*#__PURE__*/_react["default"].createElement(_Add["default"], {
      style: {
        color: "".concat(customOptions.tileProperties[index].componentOnScreenMethod == "add" ? "#fff" : "#9e9e9e"),
        fontSize: "1.3rem"
      }
    })), /*#__PURE__*/_react["default"].createElement(_core.Button, {
      className: !customOptions.tileProperties[index].componentOnScreenTarget && classes.disabledMode,
      disabled: !customOptions.tileProperties[index].componentOnScreenTarget ? true : false,
      variant: "".concat(customOptions.tileProperties[index].componentOnScreenMethod == "sub" ? "contained" : "outlined"),
      size: "small",
      color: "".concat(customOptions.tileProperties[index].componentOnScreenMethod === "sub" ? "primary" : "default"),
      onClick: function onClick(e) {
        return handleTilesOptions('componentOnScreenMethod', index, 'sub');
      },
      style: {
        minWidth: "30px",
        marginRight: "10px"
      }
    }, /*#__PURE__*/_react["default"].createElement(_Remove["default"], {
      style: {
        color: "".concat(customOptions.tileProperties[index].componentOnScreenMethod == "sub" ? "#fff" : "#9e9e9e"),
        fontSize: "1.3rem"
      }
    })), /*#__PURE__*/_react["default"].createElement(_core.Button, {
      className: !customOptions.tileProperties[index].componentOnScreenTarget && classes.disabledMode,
      disabled: !customOptions.tileProperties[index].componentOnScreenTarget ? true : false,
      variant: "".concat(customOptions.tileProperties[index].componentOnScreenMethod == "mult" ? "contained" : "outlined"),
      size: "small",
      color: "".concat(customOptions.tileProperties[index].componentOnScreenMethod === "mult" ? "primary" : "default"),
      onClick: function onClick(e) {
        return handleTilesOptions('componentOnScreenMethod', index, 'mult');
      },
      style: {
        minWidth: "30px",
        marginRight: "10px"
      }
    }, /*#__PURE__*/_react["default"].createElement(_Close["default"], {
      style: {
        color: "".concat(customOptions.tileProperties[index].componentOnScreenMethod == "mult" ? "#fff" : "#9e9e9e"),
        fontSize: "1.3rem"
      }
    })), /*#__PURE__*/_react["default"].createElement(_core.Button, {
      className: !customOptions.tileProperties[index].componentOnScreenTarget && classes.disabledMode,
      disabled: !customOptions.tileProperties[index].componentOnScreenTarget ? true : false,
      variant: "".concat(customOptions.tileProperties[index].componentOnScreenMethod == "div" ? "contained" : "outlined"),
      size: "small",
      color: "".concat(customOptions.tileProperties[index].componentOnScreenMethod === "div" ? "primary" : "default"),
      onClick: function onClick(e) {
        return handleTilesOptions('componentOnScreenMethod', index, 'div');
      },
      style: {
        minWidth: "30px"
      }
    }, /*#__PURE__*/_react["default"].createElement("span", {
      style: {
        fontSize: "0.8rem"
      }
    }, "/")))), /*#__PURE__*/_react["default"].createElement(_core.Grid, {
      item: true,
      xs: 12,
      className: "pb-4"
    }, /*#__PURE__*/_react["default"].createElement(_core.TextField, {
      fullWidth: true,
      id: "componentOnScreenTarget",
      select: true,
      name: "componentOnScreenTarget",
      label: "Select Component On Screen",
      type: "text",
      variant: "outlined",
      value: customOptions.tileProperties[index].componentOnScreenTarget,
      onChange: function onChange(e) {
        return handleTilesOptions('componentOnScreenTarget', index, e);
      }
    }, customOptions.tileProperties.map(function (p, i) {
      return p.textRule === "number" && /*#__PURE__*/_react["default"].createElement(_core.MenuItem, {
        value: p.ID
      }, p.ID);
    })))), /*#__PURE__*/_react["default"].createElement(_core.Grid, {
      item: true,
      xs: 12,
      className: "pb-4"
    }, /*#__PURE__*/_react["default"].createElement(_core.TextField, {
      fullWidth: true,
      id: "tilesColor",
      select: true,
      name: "tilesColor",
      label: "Tile's Color",
      type: "text",
      variant: "outlined",
      value: customOptions.tileProperties[index].tilesColor,
      onChange: function onChange(e) {
        return handleTilesOptions('tilesColor', index, e);
      },
      helperText: "The theme color of your selected button. You can select from given options."
    }, /*#__PURE__*/_react["default"].createElement(_core.MenuItem, {
      value: "custom"
    }, "Custom"), /*#__PURE__*/_react["default"].createElement(_core.MenuItem, {
      value: "white"
    }, "White"), /*#__PURE__*/_react["default"].createElement(_core.MenuItem, {
      value: "red"
    }, "Red"), /*#__PURE__*/_react["default"].createElement(_core.MenuItem, {
      value: "blue"
    }, "Blue"))), customOptions.tileProperties[index].tilesColor === "custom" && /*#__PURE__*/_react["default"].createElement(_core.Grid, {
      item: true,
      xs: 12
    }, /*#__PURE__*/_react["default"].createElement("label", {
      "for": "favcolor"
    }, "Select your favorite color:"), /*#__PURE__*/_react["default"].createElement("input", {
      type: "color",
      id: "favcolor",
      name: "favcolor",
      value: customOptions.tileProperties[index].tilesRandomColor,
      onChange: function onChange(e) {
        return handleTilesOptions('tilesRandomColor', index, e);
      }
    })))));
  }), /*#__PURE__*/_react["default"].createElement(_core.Grid, {
    item: true,
    xs: 12,
    className: "pt-7 pb-4"
  }, /*#__PURE__*/_react["default"].createElement(_core.TextField, {
    size: "small",
    variant: "outlined",
    id: "outlined-basic",
    label: "Columns",
    value: customOptions.columns,
    type: "number",
    disabled: true,
    InputProps: {
      endAdornment: /*#__PURE__*/_react["default"].createElement(_core.InputAdornment, {
        position: "end"
      }, /*#__PURE__*/_react["default"].createElement(InfoIconTooltip, {
        title: "This changes the orientation of your tiles from a single row (setting `0`) to columns. A setting of `1` arranges the tiles vertically into one column while a setting of `2` divides the tiles equally into two columns.",
        placement: "top-start" //fontSize="small"
        ,
        className: classes.tooltip
      }, /*#__PURE__*/_react["default"].createElement(_Info["default"], {
        className: classes.icon
      })))
    },
    fullWidth: true,
    onChange: function onChange(e) {
      return handleTilesOptions('columns', 0, e);
    }
  })), /*#__PURE__*/_react["default"].createElement(_core.Grid, {
    item: true,
    xs: 12
  }, /*#__PURE__*/_react["default"].createElement(_core.TextField, {
    size: "small",
    variant: "outlined",
    id: "outlined-basic",
    label: "Spacing",
    value: customOptions.spacing,
    type: "number",
    InputProps: {
      endAdornment: /*#__PURE__*/_react["default"].createElement(_core.InputAdornment, {
        position: "end"
      }, /*#__PURE__*/_react["default"].createElement(InfoIconTooltip, {
        title: "The theme color of your selected button. You can select from given options.",
        placement: "top-start" //fontSize="small"
        ,
        className: classes.tooltip
      }, /*#__PURE__*/_react["default"].createElement(_Info["default"], {
        className: classes.icon
      })))
    },
    fullWidth: true,
    onChange: function onChange(e) {
      return handleTilesOptions('spacing', 0, e);
    }
  })));
}

var _default = TilesOptions;
exports["default"] = _default;
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _react = _interopRequireDefault(require("react"));

var _reactSelect = _interopRequireDefault(require("react-select"));

var _reactBootstrapSlider = _interopRequireDefault(require("react-bootstrap-slider"));

var _starRating = _interopRequireDefault(require("./star-rating"));

var _headerBar = _interopRequireDefault(require("./header-bar"));

var _datePicker = _interopRequireDefault(require("./date-picker"));

var _componentHeader = _interopRequireDefault(require("./component-header"));

var _componentLabel = _interopRequireDefault(require("./component-label"));

var _myxss = _interopRequireDefault(require("./myxss"));

var _signature = _interopRequireDefault(require("./signature"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var FormElements = {};

var Header = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(Header, _React$Component);

  var _super = _createSuper(Header);

  function Header() {
    (0, _classCallCheck2["default"])(this, Header);
    return _super.apply(this, arguments);
  }

  (0, _createClass2["default"])(Header, [{
    key: "render",
    value: function render() {
      // const headerClasses = `dynamic-input ${this.props.data.element}-input`;
      var classNames = 'static';

      if (this.props.data.bold) {
        classNames += ' bold';
      }

      if (this.props.data.italic) {
        classNames += ' italic';
      }

      var baseClasses = 'SortableItem rfb-item';

      if (this.props.data.pageBreakBefore) {
        baseClasses += ' alwaysbreak';
      }

      return /*#__PURE__*/_react["default"].createElement("div", {
        className: baseClasses
      }, /*#__PURE__*/_react["default"].createElement(_componentHeader["default"], this.props), /*#__PURE__*/_react["default"].createElement("h3", {
        className: classNames,
        dangerouslySetInnerHTML: {
          __html: _myxss["default"].process(this.props.data.content)
        }
      }));
    }
  }]);
  return Header;
}(_react["default"].Component);

var Paragraph = /*#__PURE__*/function (_React$Component2) {
  (0, _inherits2["default"])(Paragraph, _React$Component2);

  var _super2 = _createSuper(Paragraph);

  function Paragraph() {
    (0, _classCallCheck2["default"])(this, Paragraph);
    return _super2.apply(this, arguments);
  }

  (0, _createClass2["default"])(Paragraph, [{
    key: "render",
    value: function render() {
      var classNames = 'static';

      if (this.props.data.bold) {
        classNames += ' bold';
      }

      if (this.props.data.italic) {
        classNames += ' italic';
      }

      var baseClasses = 'SortableItem rfb-item';

      if (this.props.data.pageBreakBefore) {
        baseClasses += ' alwaysbreak';
      }

      return /*#__PURE__*/_react["default"].createElement("div", {
        className: baseClasses
      }, /*#__PURE__*/_react["default"].createElement(_componentHeader["default"], this.props), /*#__PURE__*/_react["default"].createElement("p", {
        className: classNames,
        dangerouslySetInnerHTML: {
          __html: _myxss["default"].process(this.props.data.content)
        }
      }));
    }
  }]);
  return Paragraph;
}(_react["default"].Component);

var Label = /*#__PURE__*/function (_React$Component3) {
  (0, _inherits2["default"])(Label, _React$Component3);

  var _super3 = _createSuper(Label);

  function Label() {
    (0, _classCallCheck2["default"])(this, Label);
    return _super3.apply(this, arguments);
  }

  (0, _createClass2["default"])(Label, [{
    key: "render",
    value: function render() {
      var classNames = 'static';

      if (this.props.data.bold) {
        classNames += ' bold';
      }

      if (this.props.data.italic) {
        classNames += ' italic';
      }

      var baseClasses = 'SortableItem rfb-item';

      if (this.props.data.pageBreakBefore) {
        baseClasses += ' alwaysbreak';
      }

      return /*#__PURE__*/_react["default"].createElement("div", {
        className: baseClasses
      }, /*#__PURE__*/_react["default"].createElement(_componentHeader["default"], this.props), /*#__PURE__*/_react["default"].createElement("label", {
        className: classNames,
        dangerouslySetInnerHTML: {
          __html: _myxss["default"].process(this.props.data.content)
        }
      }));
    }
  }]);
  return Label;
}(_react["default"].Component);

var LineBreak = /*#__PURE__*/function (_React$Component4) {
  (0, _inherits2["default"])(LineBreak, _React$Component4);

  var _super4 = _createSuper(LineBreak);

  function LineBreak() {
    (0, _classCallCheck2["default"])(this, LineBreak);
    return _super4.apply(this, arguments);
  }

  (0, _createClass2["default"])(LineBreak, [{
    key: "render",
    value: function render() {
      var baseClasses = 'SortableItem rfb-item';

      if (this.props.data.pageBreakBefore) {
        baseClasses += ' alwaysbreak';
      }

      return /*#__PURE__*/_react["default"].createElement("div", {
        className: baseClasses
      }, /*#__PURE__*/_react["default"].createElement(_componentHeader["default"], this.props), /*#__PURE__*/_react["default"].createElement("hr", null));
    }
  }]);
  return LineBreak;
}(_react["default"].Component);

var TextInput = /*#__PURE__*/function (_React$Component5) {
  (0, _inherits2["default"])(TextInput, _React$Component5);

  var _super5 = _createSuper(TextInput);

  function TextInput(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, TextInput);
    _this = _super5.call(this, props);
    _this.inputField = /*#__PURE__*/_react["default"].createRef();
    return _this;
  }

  (0, _createClass2["default"])(TextInput, [{
    key: "render",
    value: function render() {
      var props = {};
      props.type = 'text';
      props.className = 'form-control';
      props.name = this.props.data.fieldName;

      if (this.props.mutable) {
        props.defaultValue = this.props.defaultValue;
        props.ref = this.inputField;
      }

      var baseClasses = 'SortableItem rfb-item';

      if (this.props.data.pageBreakBefore) {
        baseClasses += ' alwaysbreak';
      }

      if (this.props.read_only) {
        props.disabled = 'disabled';
      }

      return /*#__PURE__*/_react["default"].createElement("div", {
        className: baseClasses
      }, /*#__PURE__*/_react["default"].createElement(_componentHeader["default"], this.props), /*#__PURE__*/_react["default"].createElement("div", {
        className: "form-group"
      }, /*#__PURE__*/_react["default"].createElement(_componentLabel["default"], this.props), /*#__PURE__*/_react["default"].createElement("input", props)));
    }
  }]);
  return TextInput;
}(_react["default"].Component);

var NumberInput = /*#__PURE__*/function (_React$Component6) {
  (0, _inherits2["default"])(NumberInput, _React$Component6);

  var _super6 = _createSuper(NumberInput);

  function NumberInput(props) {
    var _this2;

    (0, _classCallCheck2["default"])(this, NumberInput);
    _this2 = _super6.call(this, props);
    _this2.inputField = /*#__PURE__*/_react["default"].createRef();
    return _this2;
  }

  (0, _createClass2["default"])(NumberInput, [{
    key: "render",
    value: function render() {
      var props = {};
      props.type = 'number';
      props.className = 'form-control';
      props.name = this.props.data.fieldName;

      if (this.props.mutable) {
        props.defaultValue = this.props.defaultValue;
        props.ref = this.inputField;
      }

      if (this.props.read_only) {
        props.disabled = 'disabled';
      }

      var baseClasses = 'SortableItem rfb-item';

      if (this.props.data.pageBreakBefore) {
        baseClasses += ' alwaysbreak';
      }

      return /*#__PURE__*/_react["default"].createElement("div", {
        className: baseClasses
      }, /*#__PURE__*/_react["default"].createElement(_componentHeader["default"], this.props), /*#__PURE__*/_react["default"].createElement("div", {
        className: "form-group"
      }, /*#__PURE__*/_react["default"].createElement(_componentLabel["default"], this.props), /*#__PURE__*/_react["default"].createElement("input", props)));
    }
  }]);
  return NumberInput;
}(_react["default"].Component);

var TextArea = /*#__PURE__*/function (_React$Component7) {
  (0, _inherits2["default"])(TextArea, _React$Component7);

  var _super7 = _createSuper(TextArea);

  function TextArea(props) {
    var _this3;

    (0, _classCallCheck2["default"])(this, TextArea);
    _this3 = _super7.call(this, props);
    _this3.inputField = /*#__PURE__*/_react["default"].createRef();
    return _this3;
  }

  (0, _createClass2["default"])(TextArea, [{
    key: "render",
    value: function render() {
      var props = {};
      props.className = 'form-control';
      props.name = this.props.data.fieldName;

      if (this.props.read_only) {
        props.disabled = 'disabled';
      }

      if (this.props.mutable) {
        props.defaultValue = this.props.defaultValue;
        props.ref = this.inputField;
      }

      var baseClasses = 'SortableItem rfb-item';

      if (this.props.data.pageBreakBefore) {
        baseClasses += ' alwaysbreak';
      }

      return /*#__PURE__*/_react["default"].createElement("div", {
        className: baseClasses
      }, /*#__PURE__*/_react["default"].createElement(_componentHeader["default"], this.props), /*#__PURE__*/_react["default"].createElement("div", {
        className: "form-group"
      }, /*#__PURE__*/_react["default"].createElement(_componentLabel["default"], this.props), /*#__PURE__*/_react["default"].createElement("textarea", props)));
    }
  }]);
  return TextArea;
}(_react["default"].Component);

var Dropdown = /*#__PURE__*/function (_React$Component8) {
  (0, _inherits2["default"])(Dropdown, _React$Component8);

  var _super8 = _createSuper(Dropdown);

  function Dropdown(props) {
    var _this4;

    (0, _classCallCheck2["default"])(this, Dropdown);
    _this4 = _super8.call(this, props);
    _this4.inputField = /*#__PURE__*/_react["default"].createRef();
    return _this4;
  }

  (0, _createClass2["default"])(Dropdown, [{
    key: "render",
    value: function render() {
      var props = {};
      props.className = 'form-control';
      props.name = this.props.data.fieldName;

      if (this.props.mutable) {
        props.defaultValue = this.props.defaultValue;
        props.ref = this.inputField;
      }

      if (this.props.read_only) {
        props.disabled = 'disabled';
      }

      var baseClasses = 'SortableItem rfb-item';

      if (this.props.data.pageBreakBefore) {
        baseClasses += ' alwaysbreak';
      }

      return /*#__PURE__*/_react["default"].createElement("div", {
        className: baseClasses
      }, /*#__PURE__*/_react["default"].createElement(_componentHeader["default"], this.props), /*#__PURE__*/_react["default"].createElement("div", {
        className: "form-group"
      }, /*#__PURE__*/_react["default"].createElement(_componentLabel["default"], this.props), /*#__PURE__*/_react["default"].createElement("select", props, this.props.data.options.map(function (option) {
        var this_key = "preview_".concat(option.key);
        return /*#__PURE__*/_react["default"].createElement("option", {
          value: option.value,
          key: this_key
        }, option.text);
      }))));
    }
  }]);
  return Dropdown;
}(_react["default"].Component);

var Tags = /*#__PURE__*/function (_React$Component9) {
  (0, _inherits2["default"])(Tags, _React$Component9);

  var _super9 = _createSuper(Tags);

  function Tags(props) {
    var _this5;

    (0, _classCallCheck2["default"])(this, Tags);
    _this5 = _super9.call(this, props);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this5), "handleChange", function (e) {
      _this5.setState({
        value: e || []
      });
    });
    _this5.inputField = /*#__PURE__*/_react["default"].createRef();
    var defaultValue = props.defaultValue,
        data = props.data;
    _this5.state = {
      value: _this5.getDefaultValue(defaultValue, data.options)
    };
    return _this5;
  }

  (0, _createClass2["default"])(Tags, [{
    key: "getDefaultValue",
    value: function getDefaultValue(defaultValue, options) {
      if (defaultValue) {
        if (typeof defaultValue === 'string') {
          var vals = defaultValue.split(',').map(function (x) {
            return x.trim();
          });
          return options.filter(function (x) {
            return vals.indexOf(x.value) > -1;
          });
        }

        return options.filter(function (x) {
          return defaultValue.indexOf(x.value) > -1;
        });
      }

      return [];
    } // state = { value: this.props.defaultValue !== undefined ? this.props.defaultValue.split(',') : [] };

  }, {
    key: "render",
    value: function render() {
      var options = this.props.data.options.map(function (option) {
        option.label = option.text;
        return option;
      });
      var props = {};
      props.isMulti = true;
      props.name = this.props.data.fieldName;
      props.onChange = this.handleChange;
      props.options = options;

      if (!this.props.mutable) {
        props.value = options[0].text;
      } // to show a sample of what tags looks like


      if (this.props.mutable) {
        props.isDisabled = this.props.read_only;
        props.value = this.state.value;
        props.ref = this.inputField;
      }

      var baseClasses = 'SortableItem rfb-item';

      if (this.props.data.pageBreakBefore) {
        baseClasses += ' alwaysbreak';
      }

      return /*#__PURE__*/_react["default"].createElement("div", {
        className: baseClasses
      }, /*#__PURE__*/_react["default"].createElement(_componentHeader["default"], this.props), /*#__PURE__*/_react["default"].createElement("div", {
        className: "form-group"
      }, /*#__PURE__*/_react["default"].createElement(_componentLabel["default"], this.props), /*#__PURE__*/_react["default"].createElement(_reactSelect["default"], props)));
    }
  }]);
  return Tags;
}(_react["default"].Component);

var Checkboxes = /*#__PURE__*/function (_React$Component10) {
  (0, _inherits2["default"])(Checkboxes, _React$Component10);

  var _super10 = _createSuper(Checkboxes);

  function Checkboxes(props) {
    var _this6;

    (0, _classCallCheck2["default"])(this, Checkboxes);
    _this6 = _super10.call(this, props);
    _this6.options = {};
    return _this6;
  }

  (0, _createClass2["default"])(Checkboxes, [{
    key: "render",
    value: function render() {
      var _this7 = this;

      var self = this;
      var classNames = 'custom-control custom-checkbox';

      if (this.props.data.inline) {
        classNames += ' option-inline';
      }

      var baseClasses = 'SortableItem rfb-item';

      if (this.props.data.pageBreakBefore) {
        baseClasses += ' alwaysbreak';
      }

      return /*#__PURE__*/_react["default"].createElement("div", {
        className: baseClasses
      }, /*#__PURE__*/_react["default"].createElement(_componentHeader["default"], this.props), /*#__PURE__*/_react["default"].createElement("div", {
        className: "form-group"
      }, /*#__PURE__*/_react["default"].createElement(_componentLabel["default"], (0, _extends2["default"])({
        className: "form-label"
      }, this.props)), this.props.data.options.map(function (option) {
        var this_key = "preview_".concat(option.key);
        var props = {};
        props.name = "option_".concat(option.key);
        props.type = 'checkbox';
        props.value = option.value;

        if (self.props.mutable) {
          props.defaultChecked = self.props.defaultValue !== undefined && self.props.defaultValue.indexOf(option.key) > -1;
        }

        if (_this7.props.read_only) {
          props.disabled = 'disabled';
        }

        return /*#__PURE__*/_react["default"].createElement("div", {
          className: classNames,
          key: this_key
        }, /*#__PURE__*/_react["default"].createElement("input", (0, _extends2["default"])({
          id: "fid_" + this_key,
          className: "custom-control-input",
          ref: function ref(c) {
            if (c && self.props.mutable) {
              self.options["child_ref_".concat(option.key)] = c;
            }
          }
        }, props)), /*#__PURE__*/_react["default"].createElement("label", {
          className: "custom-control-label",
          htmlFor: "fid_" + this_key
        }, option.text));
      })));
    }
  }]);
  return Checkboxes;
}(_react["default"].Component);

var RadioButtons = /*#__PURE__*/function (_React$Component11) {
  (0, _inherits2["default"])(RadioButtons, _React$Component11);

  var _super11 = _createSuper(RadioButtons);

  function RadioButtons(props) {
    var _this8;

    (0, _classCallCheck2["default"])(this, RadioButtons);
    _this8 = _super11.call(this, props);
    _this8.options = {};
    return _this8;
  }

  (0, _createClass2["default"])(RadioButtons, [{
    key: "render",
    value: function render() {
      var _this9 = this;

      var self = this;
      var classNames = 'custom-control custom-radio';

      if (this.props.data.inline) {
        classNames += ' option-inline';
      }

      var baseClasses = 'SortableItem rfb-item';

      if (this.props.data.pageBreakBefore) {
        baseClasses += ' alwaysbreak';
      }

      return /*#__PURE__*/_react["default"].createElement("div", {
        className: baseClasses
      }, /*#__PURE__*/_react["default"].createElement(_componentHeader["default"], this.props), /*#__PURE__*/_react["default"].createElement("div", {
        className: "form-group"
      }, /*#__PURE__*/_react["default"].createElement(_componentLabel["default"], (0, _extends2["default"])({
        className: "form-label"
      }, this.props)), this.props.data.options.map(function (option) {
        var this_key = "preview_".concat(option.key);
        var props = {};
        props.name = self.props.data.fieldName;
        props.type = 'radio';
        props.value = option.value;

        if (self.props.mutable) {
          props.defaultChecked = self.props.defaultValue !== undefined && (self.props.defaultValue.indexOf(option.key) > -1 || self.props.defaultValue.indexOf(option.value) > -1);
        }

        if (_this9.props.read_only) {
          props.disabled = 'disabled';
        }

        return /*#__PURE__*/_react["default"].createElement("div", {
          className: classNames,
          key: this_key
        }, /*#__PURE__*/_react["default"].createElement("input", (0, _extends2["default"])({
          id: "fid_" + this_key,
          className: "custom-control-input",
          ref: function ref(c) {
            if (c && self.props.mutable) {
              self.options["child_ref_".concat(option.key)] = c;
            }
          }
        }, props)), /*#__PURE__*/_react["default"].createElement("label", {
          className: "custom-control-label",
          htmlFor: "fid_" + this_key
        }, option.text));
      })));
    }
  }]);
  return RadioButtons;
}(_react["default"].Component);

var Image = /*#__PURE__*/function (_React$Component12) {
  (0, _inherits2["default"])(Image, _React$Component12);

  var _super12 = _createSuper(Image);

  function Image() {
    (0, _classCallCheck2["default"])(this, Image);
    return _super12.apply(this, arguments);
  }

  (0, _createClass2["default"])(Image, [{
    key: "render",
    value: function render() {
      var style = this.props.data.center ? {
        textAlign: 'center'
      } : null;
      var baseClasses = 'SortableItem rfb-item';

      if (this.props.data.pageBreakBefore) {
        baseClasses += ' alwaysbreak';
      }

      return /*#__PURE__*/_react["default"].createElement("div", {
        className: baseClasses,
        style: style
      }, /*#__PURE__*/_react["default"].createElement(_componentHeader["default"], this.props), this.props.data.src && /*#__PURE__*/_react["default"].createElement("img", {
        src: this.props.data.src,
        width: this.props.data.width,
        height: this.props.data.height
      }), !this.props.data.src && /*#__PURE__*/_react["default"].createElement("div", {
        className: "no-image"
      }, "No Image"));
    }
  }]);
  return Image;
}(_react["default"].Component);

var Rating = /*#__PURE__*/function (_React$Component13) {
  (0, _inherits2["default"])(Rating, _React$Component13);

  var _super13 = _createSuper(Rating);

  function Rating(props) {
    var _this10;

    (0, _classCallCheck2["default"])(this, Rating);
    _this10 = _super13.call(this, props);
    _this10.inputField = /*#__PURE__*/_react["default"].createRef();
    return _this10;
  }

  (0, _createClass2["default"])(Rating, [{
    key: "render",
    value: function render() {
      var props = {};
      props.name = this.props.data.fieldName;
      props.ratingAmount = 5;

      if (this.props.mutable) {
        props.rating = this.props.defaultValue !== undefined ? parseFloat(this.props.defaultValue, 10) : 0;
        props.editing = true;
        props.disabled = this.props.read_only;
        props.ref = this.inputField;
      }

      var baseClasses = 'SortableItem rfb-item';

      if (this.props.data.pageBreakBefore) {
        baseClasses += ' alwaysbreak';
      }

      return /*#__PURE__*/_react["default"].createElement("div", {
        className: baseClasses
      }, /*#__PURE__*/_react["default"].createElement(_componentHeader["default"], this.props), /*#__PURE__*/_react["default"].createElement("div", {
        className: "form-group"
      }, /*#__PURE__*/_react["default"].createElement(_componentLabel["default"], this.props), /*#__PURE__*/_react["default"].createElement(_starRating["default"], props)));
    }
  }]);
  return Rating;
}(_react["default"].Component);

var HyperLink = /*#__PURE__*/function (_React$Component14) {
  (0, _inherits2["default"])(HyperLink, _React$Component14);

  var _super14 = _createSuper(HyperLink);

  function HyperLink() {
    (0, _classCallCheck2["default"])(this, HyperLink);
    return _super14.apply(this, arguments);
  }

  (0, _createClass2["default"])(HyperLink, [{
    key: "render",
    value: function render() {
      var baseClasses = 'SortableItem rfb-item';

      if (this.props.data.pageBreakBefore) {
        baseClasses += ' alwaysbreak';
      }

      return /*#__PURE__*/_react["default"].createElement("div", {
        className: baseClasses
      }, /*#__PURE__*/_react["default"].createElement(_componentHeader["default"], this.props), /*#__PURE__*/_react["default"].createElement("div", {
        className: "form-group"
      }, /*#__PURE__*/_react["default"].createElement("a", {
        target: "_blank",
        href: this.props.data.href
      }, this.props.data.content)));
    }
  }]);
  return HyperLink;
}(_react["default"].Component);

var Download = /*#__PURE__*/function (_React$Component15) {
  (0, _inherits2["default"])(Download, _React$Component15);

  var _super15 = _createSuper(Download);

  function Download() {
    (0, _classCallCheck2["default"])(this, Download);
    return _super15.apply(this, arguments);
  }

  (0, _createClass2["default"])(Download, [{
    key: "render",
    value: function render() {
      var baseClasses = 'SortableItem rfb-item';

      if (this.props.data.pageBreakBefore) {
        baseClasses += ' alwaysbreak';
      }

      return /*#__PURE__*/_react["default"].createElement("div", {
        className: baseClasses
      }, /*#__PURE__*/_react["default"].createElement(_componentHeader["default"], this.props), /*#__PURE__*/_react["default"].createElement("div", {
        className: "form-group"
      }, /*#__PURE__*/_react["default"].createElement("a", {
        href: "".concat(this.props.download_path, "?id=").concat(this.props.data.file_path)
      }, this.props.data.content)));
    }
  }]);
  return Download;
}(_react["default"].Component);

var Camera = /*#__PURE__*/function (_React$Component16) {
  (0, _inherits2["default"])(Camera, _React$Component16);

  var _super16 = _createSuper(Camera);

  function Camera(props) {
    var _this11;

    (0, _classCallCheck2["default"])(this, Camera);
    _this11 = _super16.call(this, props);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this11), "displayImage", function (e) {
      var self = (0, _assertThisInitialized2["default"])(_this11);
      var target = e.target;
      var file;
      var reader;

      if (target.files && target.files.length) {
        file = target.files[0]; // eslint-disable-next-line no-undef

        reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onloadend = function () {
          self.setState({
            img: reader.result
          });
        };
      }
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this11), "clearImage", function () {
      _this11.setState({
        img: null
      });
    });
    _this11.state = {
      img: null
    };
    return _this11;
  }

  (0, _createClass2["default"])(Camera, [{
    key: "render",
    value: function render() {
      var baseClasses = 'SortableItem rfb-item';
      var name = this.props.data.fieldName;
      var fileInputStyle = this.state.img ? {
        display: 'none'
      } : null;

      if (this.props.data.pageBreakBefore) {
        baseClasses += ' alwaysbreak';
      }

      var sourceDataURL;

      if (this.props.read_only === true && this.props.defaultValue && this.props.defaultValue.length > 0) {
        if (this.props.defaultValue.indexOf(name > -1)) {
          sourceDataURL = this.props.defaultValue;
        } else {
          sourceDataURL = "data:image/png;base64,".concat(this.props.defaultValue);
        }
      }

      console.log('sourceDataURL', sourceDataURL);
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: baseClasses
      }, /*#__PURE__*/_react["default"].createElement(_componentHeader["default"], this.props), /*#__PURE__*/_react["default"].createElement("div", {
        className: "form-group"
      }, /*#__PURE__*/_react["default"].createElement(_componentLabel["default"], this.props), this.props.read_only === true && this.props.defaultValue && this.props.defaultValue.length > 0 ? /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("img", {
        src: sourceDataURL
      })) : /*#__PURE__*/_react["default"].createElement("div", {
        className: "image-upload-container"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        style: fileInputStyle
      }, /*#__PURE__*/_react["default"].createElement("input", {
        name: name,
        type: "file",
        accept: "image/*",
        capture: "camera",
        className: "image-upload",
        onChange: this.displayImage
      }), /*#__PURE__*/_react["default"].createElement("div", {
        className: "image-upload-control"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "btn btn-default"
      }, /*#__PURE__*/_react["default"].createElement("i", {
        className: "fas fa-camera"
      }), " Upload Photo"), /*#__PURE__*/_react["default"].createElement("p", null, "Select an image from your computer or device."))), this.state.img && /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("img", {
        src: this.state.img,
        height: "100",
        className: "image-upload-preview"
      }), /*#__PURE__*/_react["default"].createElement("br", null), /*#__PURE__*/_react["default"].createElement("div", {
        className: "btn btn-image-clear",
        onClick: this.clearImage
      }, /*#__PURE__*/_react["default"].createElement("i", {
        className: "fas fa-times"
      }), " Clear Photo")))));
    }
  }]);
  return Camera;
}(_react["default"].Component);

var Range = /*#__PURE__*/function (_React$Component17) {
  (0, _inherits2["default"])(Range, _React$Component17);

  var _super17 = _createSuper(Range);

  function Range(props) {
    var _this12;

    (0, _classCallCheck2["default"])(this, Range);
    _this12 = _super17.call(this, props);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this12), "changeValue", function (e) {
      var target = e.target;

      _this12.setState({
        value: target.value
      });
    });
    _this12.inputField = /*#__PURE__*/_react["default"].createRef();
    _this12.state = {
      value: props.defaultValue !== undefined ? parseInt(props.defaultValue, 10) : parseInt(props.data.default_value, 10)
    };
    return _this12;
  }

  (0, _createClass2["default"])(Range, [{
    key: "render",
    value: function render() {
      var props = {};
      var name = this.props.data.fieldName;
      props.type = 'range';
      props.list = "tickmarks_".concat(name);
      props.min = this.props.data.min_value;
      props.max = this.props.data.max_value;
      props.step = this.props.data.step;
      props.value = this.state.value;
      props.change = this.changeValue;

      if (this.props.mutable) {
        props.ref = this.inputField;
      }

      var datalist = [];

      for (var i = parseInt(props.min_value, 10); i <= parseInt(props.max_value, 10); i += parseInt(props.step, 10)) {
        datalist.push(i);
      }

      var oneBig = 100 / (datalist.length - 1);

      var _datalist = datalist.map(function (d, idx) {
        return /*#__PURE__*/_react["default"].createElement("option", {
          key: "".concat(props.list, "_").concat(idx)
        }, d);
      });

      var visible_marks = datalist.map(function (d, idx) {
        var option_props = {};
        var w = oneBig;

        if (idx === 0 || idx === datalist.length - 1) {
          w = oneBig / 2;
        }

        option_props.key = "".concat(props.list, "_label_").concat(idx);
        option_props.style = {
          width: "".concat(w, "%")
        };

        if (idx === datalist.length - 1) {
          option_props.style = {
            width: "".concat(w, "%"),
            textAlign: 'right'
          };
        }

        return /*#__PURE__*/_react["default"].createElement("label", option_props, d);
      });
      var baseClasses = 'SortableItem rfb-item';

      if (this.props.data.pageBreakBefore) {
        baseClasses += ' alwaysbreak';
      }

      return /*#__PURE__*/_react["default"].createElement("div", {
        className: baseClasses
      }, /*#__PURE__*/_react["default"].createElement(_componentHeader["default"], this.props), /*#__PURE__*/_react["default"].createElement("div", {
        className: "form-group"
      }, /*#__PURE__*/_react["default"].createElement(_componentLabel["default"], this.props), /*#__PURE__*/_react["default"].createElement("div", {
        className: "range"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "clearfix"
      }, /*#__PURE__*/_react["default"].createElement("span", {
        className: "float-left"
      }, this.props.data.min_label), /*#__PURE__*/_react["default"].createElement("span", {
        className: "float-right"
      }, this.props.data.max_label)), /*#__PURE__*/_react["default"].createElement(_reactBootstrapSlider["default"], props)), /*#__PURE__*/_react["default"].createElement("div", {
        className: "visible_marks"
      }, visible_marks), /*#__PURE__*/_react["default"].createElement("input", {
        name: name,
        value: this.state.value,
        type: "hidden"
      }), /*#__PURE__*/_react["default"].createElement("datalist", {
        id: props.list
      }, _datalist)));
    }
  }]);
  return Range;
}(_react["default"].Component);

FormElements.Header = Header;
FormElements.Paragraph = Paragraph;
FormElements.Label = Label;
FormElements.LineBreak = LineBreak;
FormElements.TextInput = TextInput;
FormElements.NumberInput = NumberInput;
FormElements.TextArea = TextArea;
FormElements.Dropdown = Dropdown;
FormElements.Signature = _signature["default"];
FormElements.Checkboxes = Checkboxes;
FormElements.DatePicker = _datePicker["default"];
FormElements.RadioButtons = RadioButtons;
FormElements.Image = Image;
FormElements.Rating = Rating;
FormElements.Tags = Tags;
FormElements.HyperLink = HyperLink;
FormElements.Download = Download;
FormElements.Camera = Camera;
FormElements.Range = Range;
var _default = FormElements;
exports["default"] = _default;
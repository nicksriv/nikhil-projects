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
var TakeVideoOptions = /*#__PURE__*/function (_React$Component) {
  _inherits(TakeVideoOptions, _React$Component);
  var _super = _createSuper(TakeVideoOptions);
  function TakeVideoOptions(props) {
    var _this;
    _classCallCheck(this, TakeVideoOptions);
    _this = _super.call(this, props);
    _this.state = {
      element: _this.props.element,
      data: _this.props.data,
      dirty: false
    };
    return _this;
  }
  _createClass(TakeVideoOptions, [{
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
        name: "isVideoAvail",
        label: "Record & Upload"
      }, {
        name: "isVideoUpload",
        label: "Browse & Upload"
      }, {
        name: "isVideoLink",
        label: "Specific Link"
      }];
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
        padding: " 0 0 0 0rem",
        borderRadius: "4px",
        color: "#2C3E93",
        height: '30px',
        display: "flex",
        justifyContent: "center"
      };
      var checked1 = {
        border: "1px solid #2C3E93",
        padding: " 0 0 0 0rem",
        width: "10rem",
        borderRadius: "4px",
        color: "#2C3E93",
        height: '30px',
        display: "flex",
        justifyContent: "center"
      };
      var unchecked = {
        border: "1px solid #00000099",
        padding: " 0 0 0 0rem",
        borderRadius: "4px",
        height: '30px',
        display: "flex",
        justifyContent: "center"
      };
      var unchecked1 = {
        border: "1px solid #00000099",
        padding: " 0 0 0 0rem",
        width: "10rem",
        borderRadius: "4px",
        height: '30px',
        display: "flex",
        justifyContent: "center"
      };
      var text = {
        marginButtom: '1rem',
        opacity: 0.6,
        fontSize: '16px'
      };
      return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_core.Grid, {
        container: true,
        spacing: 2,
        className: "padding-top-10 ml-1"
      }, /*#__PURE__*/_react.default.createElement(_core.Grid, {
        item: true,
        xs: 12,
        className: "mt-3"
      }, /*#__PURE__*/_react.default.createElement("h6", {
        style: text
      }, "Video Option: ")), options.map(function (option) {
        return /*#__PURE__*/_react.default.createElement(_core.Grid, {
          item: true,
          xs: 12,
          sm: 6
        }, /*#__PURE__*/_react.default.createElement(_core.FormControlLabel, {
          style: _this2.props.element.customOptions[option.name] ? checked1 : unchecked1,
          label: option.label,
          control: /*#__PURE__*/_react.default.createElement(_core.Checkbox, {
            style: {
              display: "none"
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
      })), /*#__PURE__*/_react.default.createElement(_core.Grid, {
        className: "mt-3"
      }, this.props.element.customOptions.isVideoLink ? /*#__PURE__*/_react.default.createElement(_core.TextField, {
        type: "text",
        variant: "outlined",
        onChange: function onChange(event) {
          return _this2.props.changeCameraOptions("videoLink", event);
        },
        placeholder: "Paste URL Link",
        helperText: this.props.element.customOptions.error ? "Please enter valid URL" : "",
        error: this.props.element.customOptions.error,
        defaultValue: this.props.element.customOptions.videoLink,
        fullWidth: true
      }) : null));
    }
  }]);
  return TakeVideoOptions;
}(_react.default.Component);
exports.default = TakeVideoOptions;
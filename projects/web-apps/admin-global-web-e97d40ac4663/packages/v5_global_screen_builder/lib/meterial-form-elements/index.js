"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _email = _interopRequireDefault(require("./email"));
var _phone = _interopRequireDefault(require("./phone"));
var _number = _interopRequireDefault(require("./number"));
var _header = _interopRequireDefault(require("./header"));
var _takePhoto = _interopRequireDefault(require("./take-photo"));
var _takeVideo = _interopRequireDefault(require("./take-video"));
var _dropdown = _interopRequireDefault(require("./dropdown"));
var _mapping_dropdown = _interopRequireDefault(require("./mapping_dropdown"));
var _signature = _interopRequireDefault(require("./signature"));
var _longText = _interopRequireDefault(require("./long-text"));
var _shortText = _interopRequireDefault(require("./shortText"));
var _tableComponent = _interopRequireDefault(require("./tableComponent"));
var _singleChoice = _interopRequireDefault(require("./single-choice"));
var _photoPrepost = _interopRequireDefault(require("./photo-prepost"));
var _checklist = _interopRequireDefault(require("./checklist"));
var _datepicker = _interopRequireDefault(require("./datepicker"));
var _attachment = _interopRequireDefault(require("./attachment"));
var _styles = require("@material-ui/core/styles");
var _componentHeader = _interopRequireDefault(require("../form-elements/component-header"));
var _core = require("@material-ui/core");
var _configurableList = _interopRequireDefault(require("./configurable-list"));
var _button_radios = _interopRequireDefault(require("./button_radios"));
var _location_coordinates = _interopRequireDefault(require("./location_coordinates"));
var _tabs = _interopRequireDefault(require("./tabs"));
var _Button = _interopRequireDefault(require("./Button"));
var _tiles = _interopRequireDefault(require("./tiles"));
var _barcodeScanner = _interopRequireDefault(require("./barcode-scanner"));
var _time = _interopRequireDefault(require("./time"));
var _materialElementLabel = _interopRequireDefault(require("./material-element-label"));
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
var useStyles = function useStyles(bg) {
  return (0, _styles.makeStyles)(function (theme) {
    return {
      root: {
        flexGrow: 1,
        backgroundColor: bg,
        height: 50,
        padding: '0px'
      },
      cardcontent: {
        padding: '11px',
        align: "center"
      },
      typography: {
        flexGrow: 1,
        textAlign: "center",
        color: "#F6F6F6",
        fontSize: 18,
        fontWeight: 100
      }
    };
  });
};
var Text = /*#__PURE__*/function (_React$Component) {
  _inherits(Text, _React$Component);
  var _super = _createSuper(Text);
  function Text(props) {
    var _this;
    _classCallCheck(this, Text);
    _this = _super.call(this, props);
    _defineProperty(_assertThisInitialized(_this), "textChange", function (event) {
      var value = event.target.value;
      if (_this.props.data.isCharLimit) if (value.length > _this.props.data.charLimit) return;
      _this.setState({
        inputText: value
      });
    });
    _this.state = {
      inputText: ""
    };
    return _this;
  }
  _createClass(Text, [{
    key: "render",
    value: function render() {
      var propsData = this.props.data;
      var fieldVariant = "";
      if (this.props.globalStyles) {
        fieldVariant = !this.props.globalStyles.formDefault && propsData.hasOwnProperty("fieldVariant") ? propsData.fieldVariant : this.props.globalStyles.globalFieldVariant;
      } else {
        if (propsData.fieldVariant) fieldVariant = propsData.fieldVariant;
      }
      var CHARACTER_LIMIT = propsData.isCharLimit && propsData.charLimit > 0 ? propsData.charLimit : 0;
      var inputProps = {};
      if (CHARACTER_LIMIT) {
        inputProps = {
          maxlength: CHARACTER_LIMIT
        };
      }
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "SortableItem rfb-item"
      }, /*#__PURE__*/_react.default.createElement(_componentHeader.default, this.props), /*#__PURE__*/_react.default.createElement("div", {
        className: "form-group"
      }, /*#__PURE__*/_react.default.createElement(_core.TextField, {
        fullWidth: true,
        size: "small",
        id: this.props.id,
        variant: fieldVariant,
        label: propsData.mask ? "#######" : propsData.label,
        required: propsData.required,
        name: this.props.data.fieldName,
        inputProps: inputProps,
        value: this.state.inputText,
        helperText: CHARACTER_LIMIT > 0 ? "Character limit is " + CHARACTER_LIMIT : "",
        onChange: this.textChange.bind(this)
      })));
    }
  }]);
  return Text;
}(_react.default.Component);
var Section_Header = function Section_Header(props) {
  var sectionBg = props.data.customOptions.sectionHeaderBGColor;
  var classes = useStyles(sectionBg)();

  // if (props.read_only) {
  //     props.disabled = 'disabled';
  // }
  var inputWidth = "100%";
  if (props.data.inputFieldSize == 'large') {
    inputWidth = "100%";
  } else if (props.data.inputFieldSize == 'medium') {
    inputWidth = "50%";
  } else if (props.data.inputFieldSize == 'small') {
    inputWidth = "25%";
  }
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "SortableItem rfb-item"
  }, /*#__PURE__*/_react.default.createElement(_componentHeader.default, props), /*#__PURE__*/_react.default.createElement("div", {
    className: "form-group",
    style: {
      width: inputWidth
    }
  }, /*#__PURE__*/_react.default.createElement(_materialElementLabel.default, props), /*#__PURE__*/_react.default.createElement(_core.Card, {
    className: classes.root
  }, /*#__PURE__*/_react.default.createElement(_core.CardContent, {
    className: classes.cardcontent
  }, /*#__PURE__*/_react.default.createElement(_core.Typography, {
    className: classes.typography,
    variant: "h5",
    component: "h2"
  }, /*#__PURE__*/_react.default.createElement("b", null, props.data.label))))));
};
var Page_Break = function Page_Break(props) {
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "SortableItem rfb-item"
  }, /*#__PURE__*/_react.default.createElement(_componentHeader.default, props), /*#__PURE__*/_react.default.createElement("div", {
    className: "preview-page-break"
  }, "Page Break"));
};
var FormElements = {};
FormElements.Text = Text;
FormElements.Email = _email.default;
FormElements.Phone = _phone.default;
FormElements.Photo = _takePhoto.default;
FormElements.Video = _takeVideo.default;
FormElements.Header = _header.default;
FormElements.Number = _number.default;
FormElements.Dropdown = _dropdown.default;
FormElements.Mapping_Dropdown = _dropdown.default;
// FormElements.Mapping_Dropdown = Mapping_Dropdown;
FormElements.Signature = _signature.default;
FormElements.Long_Text = _longText.default;
FormElements.Check_List = _checklist.default;
FormElements.Short_Text = _shortText.default;
FormElements.Page_Break = Page_Break;
FormElements.Input_Table = _tableComponent.default;
FormElements.Single_Choice = _singleChoice.default;
FormElements.Photo_PrePost = _photoPrepost.default;
FormElements.Section_Header = Section_Header;
FormElements.Date_Picker = _datepicker.default;
FormElements.Configurable_List = _configurableList.default;
FormElements.Button_Radios = _button_radios.default;
FormElements.Location_Coordinates = _location_coordinates.default;
FormElements.Tab_Break = _tabs.default;
FormElements.Button = _Button.default;
FormElements.Tiles = _tiles.default;
FormElements.Barcode_Scanner = _barcodeScanner.default;
FormElements.Time = _time.default;
FormElements.Attachment = _attachment.default;
var _default = FormElements;
exports.default = _default;
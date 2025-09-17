"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _Button = _interopRequireDefault(require("@material-ui/core/Button"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var ButtonRadiosOptions = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(ButtonRadiosOptions, _React$Component);

  var _super = _createSuper(ButtonRadiosOptions);

  function ButtonRadiosOptions(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, ButtonRadiosOptions);
    _this = _super.call(this, props);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "displayImage", function (e) {
      var this_element = _this.state.element;
      var self = (0, _assertThisInitialized2["default"])(_this);
      var target = e.target;
      var file;
      var reader;

      if (target.files && target.files.length) {
        file = target.files[0]; // eslint-disable-next-line no-undef

        reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
          var imageSrc, uri, awsS3uri;
          return _regenerator["default"].wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  imageSrc = reader.result;
                  file.imageSrc = imageSrc;
                  uri = imageSrc;

                  if (!(_this.props.imageUploadCallback != null)) {
                    _context.next = 8;
                    break;
                  }

                  _context.next = 6;
                  return _this.props.imageUploadCallback(imageSrc);

                case 6:
                  awsS3uri = _context.sent;
                  uri = awsS3uri;

                case 8:
                  this_element.customOptions.imageFile = uri;
                  self.setState({
                    element: this_element,
                    dirty: true
                  });

                case 10:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));
      }
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "clearImage", function () {
      var this_element = _this.state.element;
      this_element.customOptions.imageFile = null;

      _this.setState({
        element: this_element,
        dirty: true
      });
    });
    _this.state = {
      element: _this.props.element,
      data: _this.props.data,
      dirty: false
    };
    return _this;
  }

  (0, _createClass2["default"])(ButtonRadiosOptions, [{
    key: "updateOption",
    value: function updateOption() {
      var this_element = this.state.element; // to prevent ajax calls with no change

      if (this.state.dirty) {
        this.props.updateElement.call(this.props.preview, this_element);
        this.setState({
          dirty: false
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var fileInputStyle = this.props.element.customOptions.imageFile ? {
        display: 'none'
      } : null;

      if (this.state.dirty) {
        this.state.element.dirty = true;
      }

      return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("label", {
        htmlFor: "limitRange"
      }, "Heading Image"), " ", /*#__PURE__*/_react["default"].createElement("br", null), /*#__PURE__*/_react["default"].createElement("div", {
        style: fileInputStyle
      }, /*#__PURE__*/_react["default"].createElement("br", null), /*#__PURE__*/_react["default"].createElement(_Button["default"], {
        color: "primary",
        variant: "contained",
        component: "label",
        disableElevation: true,
        style: {
          color: '#FFFFFF'
        } // className={classname}

      }, "Choose Image to Upload", /*#__PURE__*/_react["default"].createElement("input", {
        type: "file",
        accept: 'image/*',
        hidden: true,
        onChange: this.displayImage,
        onBlur: this.updateOption
      }))), this.props.element.customOptions != undefined && this.props.element.customOptions.imageFile && /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("img", {
        src: this.props.element.customOptions.imageFile,
        height: "100",
        className: "image-upload-preview"
      }), /*#__PURE__*/_react["default"].createElement("br", null), /*#__PURE__*/_react["default"].createElement("div", {
        className: "btn btn-image-clear",
        onClick: this.clearImage
      }, /*#__PURE__*/_react["default"].createElement("i", {
        className: "fas fa-times"
      }), " Clear Photo")));
    }
  }]);
  return ButtonRadiosOptions;
}(_react["default"].Component);

exports["default"] = ButtonRadiosOptions;
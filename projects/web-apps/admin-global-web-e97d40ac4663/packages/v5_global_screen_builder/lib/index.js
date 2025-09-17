"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "BootstrapFormGenerator", {
  enumerable: true,
  get: function get() {
    return _bootstrapForm.default;
  }
});
Object.defineProperty(exports, "EditForm", {
  enumerable: true,
  get: function get() {
    return _editForm.default;
  }
});
Object.defineProperty(exports, "ElementStore", {
  enumerable: true,
  get: function get() {
    return _store.default;
  }
});
Object.defineProperty(exports, "GenerateJson", {
  enumerable: true,
  get: function get() {
    return _generateJson.default;
  }
});
Object.defineProperty(exports, "MaterialFormGenerator", {
  enumerable: true,
  get: function get() {
    return _materialForm.default;
  }
});
exports.ReactFormBuilder = void 0;
Object.defineProperty(exports, "Registry", {
  enumerable: true,
  get: function get() {
    return _registry.default;
  }
});
Object.defineProperty(exports, "V5FormBuilder", {
  enumerable: true,
  get: function get() {
    return _v5FormBuilderWrapper.default;
  }
});
Object.defineProperty(exports, "V5FormBuilderDemoBar", {
  enumerable: true,
  get: function get() {
    return _v5FormBuilderDemobar.default;
  }
});
Object.defineProperty(exports, "V5FormBuilderDownloadTemplate", {
  enumerable: true,
  get: function get() {
    return _v5FormBuilderDownloadTemplate.default;
  }
});
Object.defineProperty(exports, "V5FormBuilderFeatureTemplate", {
  enumerable: true,
  get: function get() {
    return _v5FormBuilderFeatureTemplates.default;
  }
});
Object.defineProperty(exports, "V5FormBuilderMasterScreens", {
  enumerable: true,
  get: function get() {
    return _v5FormBuilderMasterScreens.default;
  }
});
Object.defineProperty(exports, "V5FormBuilderRefHandlers", {
  enumerable: true,
  get: function get() {
    return _v5FormBuilderForwardRef.default;
  }
});
Object.defineProperty(exports, "V5FormBuilderToolbar", {
  enumerable: true,
  get: function get() {
    return _v5FormBuilderToolbar.default;
  }
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactDnd = require("react-dnd");
var _reactDndHtml5Backend = require("react-dnd-html5-backend");
var _preview = _interopRequireDefault(require("./preview"));
var _toolbar = _interopRequireDefault(require("./toolbar"));
var _materialForm = _interopRequireDefault(require("./materialForm"));
var _bootstrapForm = _interopRequireDefault(require("./bootstrapForm"));
var _store = _interopRequireDefault(require("./stores/store"));
var _registry = _interopRequireDefault(require("./stores/registry"));
var _editForm = _interopRequireDefault(require("./edit-form"));
var _generateJson = _interopRequireDefault(require("./generateJson"));
var _v5FormBuilderWrapper = _interopRequireDefault(require("./v5-form-builder-wrapper"));
var _v5FormBuilderDemobar = _interopRequireDefault(require("./v5-form-builder-demobar"));
var _v5FormBuilderToolbar = _interopRequireDefault(require("./v5-form-builder-toolbar"));
var _v5FormBuilderForwardRef = _interopRequireDefault(require("./v5-form-builder-forward-ref"));
var _v5FormBuilderFeatureTemplates = _interopRequireDefault(require("./v5-form-builder-feature-templates"));
var _v5FormBuilderMasterScreens = _interopRequireDefault(require("./v5-form-builder-master-screens"));
var _v5FormBuilderDownloadTemplate = _interopRequireDefault(require("./v5-form-builder-download-template"));
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
var ReactFormBuilder = /*#__PURE__*/function (_React$Component) {
  _inherits(ReactFormBuilder, _React$Component);
  var _super = _createSuper(ReactFormBuilder);
  function ReactFormBuilder(props) {
    var _this;
    _classCallCheck(this, ReactFormBuilder);
    _this = _super.call(this, props);
    _this.state = {
      editMode: false,
      editElement: null,
      toolbarItemCheck: []
    };
    _this.editModeOn = _this.editModeOn.bind(_assertThisInitialized(_this));
    _this.handleTemplateElemChange = _this.handleTemplateElemChange.bind(_assertThisInitialized(_this));
    return _this;
  }
  _createClass(ReactFormBuilder, [{
    key: "editModeOn",
    value: function editModeOn(data, e) {
      e.preventDefault();
      e.stopPropagation();
      if (this.state.editMode) {
        this.setState({
          editMode: !this.state.editMode,
          editElement: null
        });
      } else {
        this.setState({
          editMode: !this.state.editMode,
          editElement: data
        });
      }
    }
  }, {
    key: "handleTemplateElemChange",
    value: function handleTemplateElemChange(e, data) {
      var highestDisplayOrder = 1;
      if (this.state.toolbarItemCheck && Array.isArray(this.state.toolbarItemCheck) && this.state.toolbarItemCheck.length > 0) {
        var displayOrder = this.state.toolbarItemCheck.map(function (a) {
          return a.displayOrder;
        });
        highestDisplayOrder = Math.max.apply(Math, _toConsumableArray(displayOrder)) + 1;
      }
      if (e.target.checked) {
        this.setState({
          toolbarItemCheck: [].concat(_toConsumableArray(this.state.toolbarItemCheck), [{
            id: data.id,
            displayOrder: highestDisplayOrder
          }])
        });
        this.props.handleFormElementCheck(e, [].concat(_toConsumableArray(this.state.toolbarItemCheck), [{
          id: data.id,
          displayOrder: highestDisplayOrder
        }]));
      } else {
        this.setState({
          toolbarItemCheck: this.state.toolbarItemCheck.filter(function (x) {
            return x.id !== data.id;
          })
        });
        this.props.handleFormElementCheck(e, this.state.toolbarItemCheck.filter(function (x) {
          return x.id !== data.id;
        }));
      }
    }
  }, {
    key: "manualEditModeOff",
    value: function manualEditModeOff() {
      if (this.state.editMode) {
        this.setState({
          editMode: false,
          editElement: null
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var previewAlignClass = "";
      var editFormClasses = "edit-form ";
      var isDefaultItems = true;
      var toolbarProps = {
        showDescription: this.props.show_description
      };
      if (this.props.toolbarItems) {
        toolbarProps.items = this.props.toolbarItems;
        isDefaultItems = false;
      }
      if (this.props.toolboxOrigin == "left") {
        previewAlignClass = "float-left";
        editFormClasses += "left-slider";
      } else {
        previewAlignClass = "float-right";
        editFormClasses += "right-slider";
      }
      toolbarProps.toolbarAlignClass = this.props.toolboxOrigin == "left" ? "float-left" : "float-right";
      return (
        /*#__PURE__*/
        // <DndProvider backend={HTML5Backend}>
        _react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("div", {
          className: "react-form-builder clearfix"
        }, /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_preview.default, {
          files: this.props.files,
          isAligned: this.props.isAligned,
          formBuilderHeaderComponent: this.props.formBuilderHeaderComponent,
          pageMode: this.props.pageMode,
          screenTitle: this.props.screenTitle,
          previewAlignClass: previewAlignClass,
          editFormClasses: editFormClasses,
          manualEditModeOff: this.manualEditModeOff.bind(this),
          showCorrectColumn: this.props.showCorrectColumn,
          parent: this,
          data: this.props.data,
          url: this.props.url,
          saveUrl: this.props.saveUrl,
          onLoad: this.props.onLoad,
          onPost: this.props.onPost,
          editModeOn: this.editModeOn,
          editMode: this.state.editMode,
          variables: this.props.variables,
          registry: _registry.default,
          isDefaultItems: isDefaultItems,
          editElement: this.state.editElement,
          toolbarItemCheck: this.state.toolbarItemCheck,
          handleTemplateElemChange: this.handleTemplateElemChange,
          uploadFile: this.props.uploadFile,
          fileId: this.props.fileId
        }))))
        // </DndProvider>
      );
    }
  }]);
  return ReactFormBuilder;
}(_react.default.Component);
exports.ReactFormBuilder = ReactFormBuilder;
var FormBuilders = {};
FormBuilders.EditForm = _editForm.default;
FormBuilders.ReactFormBuilder = ReactFormBuilder;
FormBuilders.MaterialFormGenerator = _materialForm.default;
FormBuilders.BootstrapFormGenerator = _bootstrapForm.default;
FormBuilders.ElementStore = _store.default;
FormBuilders.Registry = _registry.default;
FormBuilders.GenerateJSON = _generateJson.default;
FormBuilders.V5FormBuilder = _v5FormBuilderWrapper.default;
FormBuilders.V5FormBuilderDemoBar = _v5FormBuilderDemobar.default;
FormBuilders.V5FormBuilderToolbar = _v5FormBuilderToolbar.default;
FormBuilders.V5FormBuilderRefHandlers = _v5FormBuilderForwardRef.default;
FormBuilders.V5FormBuilderFeatureTemplate = _v5FormBuilderFeatureTemplates.default;
FormBuilders.V5FormBuilderMasterScreens = _v5FormBuilderMasterScreens.default;
FormBuilders.V5FormBuilderDownloadTemplate = _v5FormBuilderDownloadTemplate.default;
var _default = FormBuilders;
exports.default = _default;
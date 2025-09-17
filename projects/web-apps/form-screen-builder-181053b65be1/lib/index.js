"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "MaterialFormGenerator", {
  enumerable: true,
  get: function get() {
    return _materialForm["default"];
  }
});
Object.defineProperty(exports, "BootstrapFormGenerator", {
  enumerable: true,
  get: function get() {
    return _bootstrapForm["default"];
  }
});
Object.defineProperty(exports, "ElementStore", {
  enumerable: true,
  get: function get() {
    return _store["default"];
  }
});
Object.defineProperty(exports, "Registry", {
  enumerable: true,
  get: function get() {
    return _registry["default"];
  }
});
Object.defineProperty(exports, "EditForm", {
  enumerable: true,
  get: function get() {
    return _editForm["default"];
  }
});
Object.defineProperty(exports, "GenerateJson", {
  enumerable: true,
  get: function get() {
    return _generateJson["default"];
  }
});
Object.defineProperty(exports, "V5FormBuilder", {
  enumerable: true,
  get: function get() {
    return _v5FormBuilderWrapper["default"];
  }
});
Object.defineProperty(exports, "V5FormBuilderDemoBar", {
  enumerable: true,
  get: function get() {
    return _v5FormBuilderDemobar["default"];
  }
});
Object.defineProperty(exports, "V5FormBuilderToolbar", {
  enumerable: true,
  get: function get() {
    return _v5FormBuilderToolbar["default"];
  }
});
Object.defineProperty(exports, "V5FormBuilderRefHandlers", {
  enumerable: true,
  get: function get() {
    return _v5FormBuilderForwardRef["default"];
  }
});
Object.defineProperty(exports, "V5FormBuilderFeatureTemplate", {
  enumerable: true,
  get: function get() {
    return _v5FormBuilderFeatureTemplates["default"];
  }
});
Object.defineProperty(exports, "V5FormBuilderMasterScreens", {
  enumerable: true,
  get: function get() {
    return _v5FormBuilderMasterScreens["default"];
  }
});
Object.defineProperty(exports, "V5FormBuilderDownloadTemplate", {
  enumerable: true,
  get: function get() {
    return _v5FormBuilderDownloadTemplate["default"];
  }
});
exports.ReactFormBuilder = exports["default"] = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

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

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var ReactFormBuilder = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(ReactFormBuilder, _React$Component);

  var _super = _createSuper(ReactFormBuilder);

  function ReactFormBuilder(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, ReactFormBuilder);
    _this = _super.call(this, props);
    _this.state = {
      editMode: false,
      editElement: null,
      toolbarItemCheck: []
    };
    _this.editModeOn = _this.editModeOn.bind((0, _assertThisInitialized2["default"])(_this));
    _this.handleTemplateElemChange = _this.handleTemplateElemChange.bind((0, _assertThisInitialized2["default"])(_this));
    return _this;
  }

  (0, _createClass2["default"])(ReactFormBuilder, [{
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
        highestDisplayOrder = Math.max.apply(Math, (0, _toConsumableArray2["default"])(displayOrder)) + 1;
      }

      if (e.target.checked) {
        this.setState({
          toolbarItemCheck: [].concat((0, _toConsumableArray2["default"])(this.state.toolbarItemCheck), [{
            id: data.id,
            displayOrder: highestDisplayOrder
          }])
        });
        this.props.handleFormElementCheck(e, [].concat((0, _toConsumableArray2["default"])(this.state.toolbarItemCheck), [{
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
        _react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("div", {
          className: "react-form-builder clearfix"
        }, /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(_preview["default"], {
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
          registry: _registry["default"],
          isDefaultItems: isDefaultItems,
          editElement: this.state.editElement,
          toolbarItemCheck: this.state.toolbarItemCheck,
          handleTemplateElemChange: this.handleTemplateElemChange,
          uploadFile: this.props.uploadFile,
          fileId: this.props.fileId
        })))) // </DndProvider>

      );
    }
  }]);
  return ReactFormBuilder;
}(_react["default"].Component);

exports.ReactFormBuilder = ReactFormBuilder;
var FormBuilders = {};
FormBuilders.EditForm = _editForm["default"];
FormBuilders.ReactFormBuilder = ReactFormBuilder;
FormBuilders.MaterialFormGenerator = _materialForm["default"];
FormBuilders.BootstrapFormGenerator = _bootstrapForm["default"];
FormBuilders.ElementStore = _store["default"];
FormBuilders.Registry = _registry["default"];
FormBuilders.GenerateJSON = _generateJson["default"];
FormBuilders.V5FormBuilder = _v5FormBuilderWrapper["default"];
FormBuilders.V5FormBuilderDemoBar = _v5FormBuilderDemobar["default"];
FormBuilders.V5FormBuilderToolbar = _v5FormBuilderToolbar["default"];
FormBuilders.V5FormBuilderRefHandlers = _v5FormBuilderForwardRef["default"];
FormBuilders.V5FormBuilderFeatureTemplate = _v5FormBuilderFeatureTemplates["default"];
FormBuilders.V5FormBuilderMasterScreens = _v5FormBuilderMasterScreens["default"];
FormBuilders.V5FormBuilderDownloadTemplate = _v5FormBuilderDownloadTemplate["default"];
var _default = FormBuilders;
exports["default"] = _default;
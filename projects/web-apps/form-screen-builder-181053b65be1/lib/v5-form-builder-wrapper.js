"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _react = _interopRequireDefault(require("react"));

var _index = _interopRequireWildcard(require("./index"));

var variables = _interopRequireWildcard(require("./variables"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

// Add our stylesheets for the demo.
//require('../scss/application.scss');
//const url = 'http://localhost:1337/api/v1/screen/formdata';
var saveUrl = '/api/formdata';
var items = ['Photo', 'Short_Text', 'Email', 'Number', 'Phone', 'Single_Choice', 'Dropdown', 'Check_List', 'Date_Picker', 'Header', 'Long_Text', 'Signature', 'Section_Header', 'Location_Coordinates', 'Tab_Break', 'Configurable_List', 'Button_Radios', 'Input_Table', 'Photo_PREPOST', 'Page_Break', 'Two_Column_Row', 'Three_Column_Row', 'Four_Column_Row', 'Attachment'];
var toolboxOrigin = "right"; // left | right

var V5FormBuilder = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(V5FormBuilder, _React$Component);

  var _super = _createSuper(V5FormBuilder);

  function V5FormBuilder(props) {
    (0, _classCallCheck2["default"])(this, V5FormBuilder);
    return _super.call(this, props);
  }

  (0, _createClass2["default"])(V5FormBuilder, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/_react["default"].createElement(_index["default"].ReactFormBuilder, {
        data: this.props.data,
        variables: variables,
        url: this.props.url,
        toolboxOrigin: toolboxOrigin,
        saveUrl: saveUrl,
        toolbarItems: items,
        isAligned: true,
        formBuilderHeaderComponent: this.props.formBuilderHeaderComponent,
        pageMode: this.props.pageMode,
        screenTitle: this.props.screenTitle,
        handleFormElementCheck: this.props.handleFormElementCheck,
        uploadFile: this.props.uploadFile,
        fileId: this.props.fileId
      });
    }
  }]);
  return V5FormBuilder;
}(_react["default"].Component); // const V5FormBuilder = (props) => {
//     const {
//     } = props;
//     const url = '/api/formdata';
//     const saveUrl = '/api/formdata';
//     var items = [
//         'Photo', 'Short_Text', 'Email', 'Number', 'Phone', 'Single_Choice', 'Dropdown', 'Check_List', 'Date_Picker', 'Header', 'Long_Text', 'Signature', 'Section_Header', 'Location_Coordinates', 'Tab_Break', 'Configurable_List', 'Button_Radios', 'Input_Table', 'Photo_PREPOST', 'Page_Break', 'Two_Column_Row', 'Three_Column_Row', 'Four_Column_Row'
//     ];
//     const toolboxOrigin = "right"; // left | right
//     return (
//         <FormBuilder.ReactFormBuilder
//             variables={variables}
//             url={url}
//             toolboxOrigin={toolboxOrigin}
//             saveUrl={saveUrl}
//             toolbarItems={items}
//         />
//     )
// }
// export default V5FormBuilder;


exports["default"] = V5FormBuilder;
"use strict";

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

var _reactDnd = require("react-dnd");

var _ItemTypes = _interopRequireDefault(require("./ItemTypes"));

var _UUID = _interopRequireDefault(require("./UUID"));

var _Inbox = _interopRequireDefault(require("@material-ui/icons/Inbox"));

var _ListItem = _interopRequireDefault(require("@material-ui/core/ListItem"));

var _ListItemIcon = _interopRequireDefault(require("@material-ui/core/ListItemIcon"));

var _ListItemText = _interopRequireDefault(require("@material-ui/core/ListItemText"));

var _icons = require("@material-ui/icons");

var _LooksTwo = _interopRequireDefault(require("@material-ui/icons/LooksTwo"));

var _ShortText = _interopRequireDefault(require("@material-ui/icons/ShortText"));

var _TextFields = _interopRequireDefault(require("@material-ui/icons/TextFields"));

var _ArrowDropDownCircle = _interopRequireDefault(require("@material-ui/icons/ArrowDropDownCircle"));

var _Phone = _interopRequireDefault(require("@material-ui/icons/Phone"));

var _Event = _interopRequireDefault(require("@material-ui/icons/Event"));

var _Title = _interopRequireDefault(require("@material-ui/icons/Title"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var cardSource = {
  beginDrag: function beginDrag(props) {
    return {
      id: _UUID["default"].uuid(),
      index: -1,
      data: props.data,
      onCreate: props.onCreate
    };
  }
};

var ToolbarItem = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(ToolbarItem, _React$Component);

  var _super = _createSuper(ToolbarItem);

  function ToolbarItem() {
    (0, _classCallCheck2["default"])(this, ToolbarItem);
    return _super.apply(this, arguments);
  }

  (0, _createClass2["default"])(ToolbarItem, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          connectDragSource = _this$props.connectDragSource,
          data = _this$props.data,
          onClick = _this$props.onClick,
          isBootstrapElements = _this$props.isBootstrapElements;
      var iconStyle = {
        fontSize: '15px',
        margin: '0 15px 0 10px'
      };
      if (!connectDragSource) return null;
      return connectDragSource( /*#__PURE__*/_react["default"].createElement("li", {
        onClick: onClick
      }, function () {
        switch (data.key) {
          case "Short_Text":
            return /*#__PURE__*/_react["default"].createElement(_ShortText["default"], {
              style: iconStyle
            });

          case "Long_Text":
            return /*#__PURE__*/_react["default"].createElement(_TextFields["default"], {
              style: iconStyle
            });
          // case "Number":
          //   return <LooksTwoIcon
          //     style={iconStyle}></LooksTwoIcon>

          case "Dropdown":
            return /*#__PURE__*/_react["default"].createElement(_ArrowDropDownCircle["default"], {
              style: iconStyle
            });

          case "Phone":
            return /*#__PURE__*/_react["default"].createElement(_Phone["default"], {
              style: iconStyle
            });

          case "Date_Picker":
            return /*#__PURE__*/_react["default"].createElement(_Event["default"], {
              style: iconStyle
            });

          case "Time":
            return /*#__PURE__*/_react["default"].createElement(_Event["default"], {
              style: iconStyle
            });

          case "Section_Header":
            return /*#__PURE__*/_react["default"].createElement(_Title["default"], {
              style: iconStyle
            });

          case "Button_Radios":
            return /*#__PURE__*/_react["default"].createElement("img", {
              style: iconStyle,
              src: "/assets/images/icons/Icon_ButtonRadio.svg",
              alt: "Button_Radios"
            });

          case "Button":
            return /*#__PURE__*/_react["default"].createElement("img", {
              style: iconStyle,
              src: "/assets/images/icons/Icon_Button.svg",
              alt: "Button"
            });

          case "Check_List":
            return /*#__PURE__*/_react["default"].createElement("img", {
              style: iconStyle,
              src: "/assets/images/icons/Icon_Checklist.svg",
              alt: "Check_List"
            });

          case "Configurable_List":
            return /*#__PURE__*/_react["default"].createElement("img", {
              style: iconStyle,
              src: "/assets/images/icons/Icon_InputTable.svg",
              alt: "Input_Table"
            });

          case "Number":
            return /*#__PURE__*/_react["default"].createElement("img", {
              style: iconStyle,
              src: "/assets/images/icons/Icon_Numbers.svg",
              alt: "Number"
            });

          case "Tiles":
            return /*#__PURE__*/_react["default"].createElement("img", {
              style: iconStyle,
              src: "/assets/images/icons/Icon_Tiles.svg",
              alt: "Tiles"
            });

          case "Attachment":
            return /*#__PURE__*/_react["default"].createElement("img", {
              style: iconStyle,
              src: "/assets/images/icons/attachment_black_24dp.svg",
              alt: "attachment"
            });

          default:
            return /*#__PURE__*/_react["default"].createElement("i", {
              className: data.icon
            });
        }
      }(), data.type));
    }
  }]);
  return ToolbarItem;
}(_react["default"].Component);

var _default = (0, _reactDnd.DragSource)(_ItemTypes["default"].CARD, cardSource, function (connect) {
  return {
    connectDragSource: connect.dragSource()
  };
})(ToolbarItem);

exports["default"] = _default;
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _formPlaceHolder = _interopRequireDefault(require("./form-place-holder"));

var _sortableElement = _interopRequireDefault(require("./sortable-element"));

var _meterialFormElements = _interopRequireDefault(require("./meterial-form-elements"));

var _multiColumn = require("./multi-column");

var Email = _meterialFormElements["default"].Email,
    Single_Choice = _meterialFormElements["default"].Single_Choice,
    Page_Break = _meterialFormElements["default"].Page_Break,
    Text = _meterialFormElements["default"].Text,
    Number = _meterialFormElements["default"].Number,
    Phone = _meterialFormElements["default"].Phone,
    Input_Table = _meterialFormElements["default"].Input_Table,
    Section_Header = _meterialFormElements["default"].Section_Header,
    Attachment = _meterialFormElements["default"].Attachment,
    Signature = _meterialFormElements["default"].Signature,
    Dropdown = _meterialFormElements["default"].Dropdown,
    Header = _meterialFormElements["default"].Header,
    Short_Text = _meterialFormElements["default"].Short_Text,
    Photo = _meterialFormElements["default"].Photo,
    Video = _meterialFormElements["default"].Video,
    Photo_PrePost = _meterialFormElements["default"].Photo_PrePost,
    Long_Text = _meterialFormElements["default"].Long_Text,
    Check_List = _meterialFormElements["default"].Check_List,
    Date_Picker = _meterialFormElements["default"].Date_Picker,
    Configurable_List = _meterialFormElements["default"].Configurable_List,
    Button_Radios = _meterialFormElements["default"].Button_Radios,
    Location_Coordinates = _meterialFormElements["default"].Location_Coordinates,
    Tab_Break = _meterialFormElements["default"].Tab_Break,
    Button = _meterialFormElements["default"].Button,
    Tiles = _meterialFormElements["default"].Tiles,
    Barcode_Scanner = _meterialFormElements["default"].Barcode_Scanner,
    Time = _meterialFormElements["default"].Time;
var FormElements = {};
FormElements.Text = (0, _sortableElement["default"])(Text);
FormElements.Phone = (0, _sortableElement["default"])(Phone);
FormElements.Email = (0, _sortableElement["default"])(Email);
FormElements.Photo = (0, _sortableElement["default"])(Photo);
FormElements.Video = (0, _sortableElement["default"])(Video);
FormElements.Number = (0, _sortableElement["default"])(Number);
FormElements.Header = (0, _sortableElement["default"])(Header);
FormElements.Dropdown = (0, _sortableElement["default"])(Dropdown);
FormElements.Check_List = (0, _sortableElement["default"])(Check_List);
FormElements.Long_Text = (0, _sortableElement["default"])(Long_Text);
FormElements.Signature = (0, _sortableElement["default"])(Signature);
FormElements.Short_Text = (0, _sortableElement["default"])(Short_Text);
FormElements.Page_Break = (0, _sortableElement["default"])(Page_Break);
FormElements.Input_Table = (0, _sortableElement["default"])(Input_Table);
FormElements.Photo_PrePost = (0, _sortableElement["default"])(Photo_PrePost);
FormElements.Single_Choice = (0, _sortableElement["default"])(Single_Choice);
FormElements.Section_Header = (0, _sortableElement["default"])(Section_Header);
FormElements.Two_Column_Row = (0, _sortableElement["default"])(_multiColumn.Two_Column_Row);
FormElements.Four_Column_Row = (0, _sortableElement["default"])(_multiColumn.Four_Column_Row);
FormElements.Three_Column_Row = (0, _sortableElement["default"])(_multiColumn.Three_Column_Row);
FormElements.Date_Picker = (0, _sortableElement["default"])(Date_Picker);
FormElements.Configurable_List = (0, _sortableElement["default"])(Configurable_List);
FormElements.Button_Radios = (0, _sortableElement["default"])(Button_Radios);
FormElements.Location_Coordinates = (0, _sortableElement["default"])(Location_Coordinates);
FormElements.Tab_Break = (0, _sortableElement["default"])(Tab_Break);
FormElements.Button = (0, _sortableElement["default"])(Button);
FormElements.Tiles = (0, _sortableElement["default"])(Tiles);
FormElements.Barcode_Scanner = (0, _sortableElement["default"])(Barcode_Scanner);
FormElements.Time = (0, _sortableElement["default"])(Time);
FormElements.Attachment = (0, _sortableElement["default"])(Attachment);
var _default = FormElements;
exports["default"] = _default;
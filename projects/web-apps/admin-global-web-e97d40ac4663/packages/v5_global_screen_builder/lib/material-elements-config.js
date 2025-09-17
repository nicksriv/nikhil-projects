"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SECTION_COMPONENTS_LIST = exports.Long_Text = exports.ITEMS_LIST = void 0;
var Long_Text = {
  key: 'Long_Text',
  canHaveAnswer: true,
  label: 'Long Text Field',
  type: 'Long Text Field',
  icon: 'fas fa-paragraph',
  fieldName: 'long_text_'
};
exports.Long_Text = Long_Text;
var Photo_PREPOST = {
  key: 'Photo_PrePost',
  canHaveAnswer: true,
  label: 'Photo PrePost',
  type: 'Photo PrePost',
  icon: 'fas fa-camera',
  fieldName: 'photo_pre_post_'
};
var Barcode_Scanner = {
  key: 'Barcode_Scanner',
  canHaveAnswer: true,
  label: 'Barcode Scanner',
  type: 'Barcode Scanner',
  icon: 'fas fa-list-ul',
  fieldName: 'barcode_scanner_'
};
var Email = {
  key: 'Email',
  canHaveAnswer: true,
  label: 'Email',
  type: 'Email',
  icon: 'fas fa-envelope',
  fieldName: 'email_input_'
};
var Number = {
  key: 'Number',
  canHaveAnswer: true,
  label: 'Numbers',
  type: 'Numbers',
  icon: 'fas fa-plus',
  fieldName: 'number_input_'
};
var Phone = {
  key: 'Phone',
  canHaveAnswer: true,
  label: 'Phone',
  type: 'Phone',
  icon: 'fas fa-phone',
  fieldName: 'phone_input_'
};
var Single_Choice = {
  key: 'Single_Choice',
  canHaveAnswer: true,
  icon: 'far fa-dot-circle',
  label: 'Single Choice',
  type: 'Single Choice',
  fieldName: 'singlechoice_',
  singleChoiceOptions: []
};
var Dropdown = {
  key: 'Dropdown',
  canHaveAnswer: false,
  label: 'Dropdown',
  type: 'Dropdown',
  icon: 'far fa-caret-square-down',
  fieldName: 'dropdown_input_',
  dropDownOptions: []
};
var Mapping_Dropdown = {
  key: 'Mapping_Dropdown',
  canHaveAnswer: false,
  label: 'Mapping Dropdown',
  type: 'Mapping Dropdown',
  icon: 'far fa-caret-square-down',
  fieldName: 'dropdown_input_',
  dropDownOptions: []
};
var Check_List = {
  key: 'Check_List',
  canHaveAnswer: false,
  label: 'Check List',
  type: 'Check List',
  icon: 'far fa-check-square',
  fieldName: 'checklist_input_',
  checkListOptions: []
};
var Signature = {
  key: 'Signature',
  icon: 'fas fa-signature',
  label: 'Signature',
  type: 'Signature',
  fieldName: 'signature_'
};
var Section_Header = {
  key: 'Section_Header',
  label: 'Section Header',
  type: 'Section Header',
  icon: 'fas fa-heading',
  fieldName: 'section_header_'
};
var Text = {
  key: 'Text',
  canHaveAnswer: true,
  label: 'Text Input',
  type: 'Text Input',
  icon: 'fas fa-font',
  fieldName: 'text_input_'
};
var Input_Table = {
  key: 'Input_Table',
  canHaveAnswer: true,
  label: 'Input Table',
  type: 'Input Table',
  icon: 'fas fa-table',
  fieldName: 'table_input_'
};
var Page_Break = {
  key: 'Page_Break',
  label: 'Page Break',
  icon: 'fas fa-window-minimize',
  type: 'Page Break',
  fieldName: 'page_break_'
};
var Two_Column_Row = {
  key: 'Two_Column_Row',
  canHaveAnswer: false,
  label: 'Two Column Row',
  type: 'Two Column Row',
  icon: 'fas fa-columns',
  fieldName: 'two_col_row_'
};
var Three_Column_Row = {
  key: 'Three_Column_Row',
  canHaveAnswer: false,
  label: 'Three Column Row',
  type: 'Three Column Row',
  icon: 'fas fa-columns',
  fieldName: 'three_col_row_'
};
var Four_Column_Row = {
  key: 'Four_Column_Row',
  canHaveAnswer: false,
  label: 'Four Column Row',
  type: 'Four Column Row',
  icon: 'fas fa-columns',
  fieldName: 'four_col_row_'
};
var Header = {
  key: 'Header',
  canHaveAnswer: false,
  label: 'Header',
  type: 'Header',
  icon: 'fas fa-heading',
  fieldName: 'header_'
};
var Short_Text = {
  key: 'Short_Text',
  canHaveAnswer: false,
  label: 'Short Text Field',
  type: 'Short Text Field',
  icon: 'fas fa-font',
  fieldName: 'shortText_'
};
var Photo = {
  key: 'Photo',
  canHaveAnswer: false,
  name: 'Photo',
  label: 'Photo',
  type: 'Photo',
  icon: 'fas fa-camera',
  fieldName: 'photo'
};
var Video = {
  key: 'Video',
  canHaveAnswer: false,
  name: 'Video',
  label: 'Video',
  type: 'Video',
  icon: 'fas fa-video',
  fieldName: 'video'
};
var Date_Picker = {
  key: 'Date_Picker',
  canHaveAnswer: false,
  name: 'Date Picker',
  label: 'Date Picker',
  type: 'Date Picker',
  icon: 'fas fa-calendar',
  fieldName: 'datepicker'
};
var Configurable_List = {
  key: 'Configurable_List',
  canHaveAnswer: false,
  name: 'Configurable List',
  label: 'Input Table',
  type: 'Input Table',
  icon: 'fas fa-table',
  fieldName: 'configurable_list'
};
var Button_Radios = {
  key: 'Button_Radios',
  canHaveAnswer: false,
  name: 'Button Radio',
  label: 'Button Radio',
  type: 'Button Radio',
  icon: 'far fa-clone',
  fieldName: 'buttonradio'
};
var Location_Coordinates = {
  key: 'Location_Coordinates',
  canHaveAnswer: false,
  name: 'Location Coordinates',
  label: 'Location Map',
  type: 'Location Map',
  icon: 'fas fa-map-marker-alt',
  fieldName: 'location_coordinates'
};
var Tab_Break = {
  key: 'Tab_Break',
  canHaveAnswer: false,
  name: 'Tab Break',
  label: 'Tab Break',
  type: 'Tab Break',
  icon: 'fa fa-columns',
  fieldName: 'tab_breaker'
};
var Tiles = {
  key: 'Tiles',
  canHaveAnswer: false,
  name: 'Tiles',
  label: 'Tiles',
  type: 'Tiles',
  icon: 'fas fa-film',
  fieldName: 'tiles_'
};
var Button = {
  key: 'Button',
  canHaveAnswer: false,
  name: 'Button',
  icon: 'fas fa-digital-tachograph',
  label: 'Button',
  type: 'Button',
  fieldName: 'button'
};
var Time = {
  key: 'Time',
  canHaveAnswer: false,
  name: 'Time',
  label: 'Time',
  type: 'Time',
  icon: 'fas fa-calendar',
  filedName: 'time'
};
var Attachment = {
  key: 'Attachment',
  canHaveAnswer: false,
  name: 'Attachment',
  label: 'Attachment',
  type: 'Attachment',
  icon: 'fas fa-paperclip',
  filedName: 'Attachment'
};
var ITEMS_LIST = {
  Text: Text,
  Phone: Phone,
  Email: Email,
  Photo: Photo,
  Video: Video,
  Number: Number,
  Header: Header,
  Dropdown: Dropdown,
  Mapping_Dropdown: Mapping_Dropdown,
  Check_List: Check_List,
  Signature: Signature,
  Long_Text: Long_Text,
  Short_Text: Short_Text,
  Page_Break: Page_Break,
  Input_Table: Input_Table,
  Single_Choice: Single_Choice,
  Photo_PREPOST: Photo_PREPOST,
  Barcode_Scanner: Barcode_Scanner,
  Two_Column_Row: Two_Column_Row,
  Section_Header: Section_Header,
  Four_Column_Row: Four_Column_Row,
  Three_Column_Row: Three_Column_Row,
  Date_Picker: Date_Picker,
  Configurable_List: Configurable_List,
  Button_Radios: Button_Radios,
  Location_Coordinates: Location_Coordinates,
  Tab_Break: Tab_Break,
  Tiles: Tiles,
  Button: Button,
  Time: Time,
  Attachment: Attachment
};
exports.ITEMS_LIST = ITEMS_LIST;
var SECTION_COMPONENTS_LIST = [Short_Text, Long_Text, Number, Dropdown, Mapping_Dropdown, Single_Choice, Button_Radios, Location_Coordinates, Photo, Video, Check_List, Email, Phone, Date_Picker, Time, Barcode_Scanner, Signature, Attachment];
exports.SECTION_COMPONENTS_LIST = SECTION_COMPONENTS_LIST;
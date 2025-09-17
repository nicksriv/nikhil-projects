/**
  * <Toolbar />
  */

import React from 'react';
import ToolbarItem from './toolbar-draggable-item';
import ID from './UUID';
import store from './stores/store';
import Box from '@material-ui/core/Box';
import PropTypes, { element } from 'prop-types';
import { ITEMS_LIST } from './material-elements-config';
import { Typography } from '@material-ui/core';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function isDefaultItem(item) {
  const keys = Object.keys(item);
  return keys.filter(x => x !== 'element' && x !== 'key').length === 0;
}

function buildItems(items, defaultItems) {
  if (!items) {
    return defaultItems;
  }
  return items.map(x => {
    let found;
    if (isDefaultItem(x)) {
      found = defaultItems.find(y => (x.element || x.key) === (y.element || y.key));
    }
    return found || x;
  });
}

export default class Toolbar extends React.Component {
  constructor(props) {
    super(props);
    const items = buildItems(this.getItemsConfig(props.items), this._defaultItems());
    const isMaterialList = props.items ? true : false;
    this.state = {
      items,
      isBootstrapElements: !isMaterialList,
    };
    store.subscribe(state => this.setState({ store: state }));
    this.create = this.create.bind(this);
  }
  handleChange(event) {
    let itemsList = null;
    if (this.state.checkedA) {
      // swith to default items
      itemsList = null;
    } else {
      // switch props items
      itemsList = this.getItemsConfig(this.props.items);
    }

    const items = buildItems(itemsList, this._defaultItems());
    this.setState({ items: items, checkedA: event.target.checked });
  }

  static _defaultItemOptions(element) {
    switch (element) {
      case 'Dropdown':
        return [
          { value: 'place_holder_option_1', label: 'Place holder option 1', key: `dropdown_option_${ID.uuid()}` },
          { value: 'place_holder_option_2', label: 'Place holder option 2', key: `dropdown_option_${ID.uuid()}` },
          { value: 'place_holder_option_3', label: 'Place holder option 3', key: `dropdown_option_${ID.uuid()}` },
        ];
        case 'Mapping_Dropdown':
          return [
            { value: 'place_holder_option_1', label: 'Place holder option 1', key: `dropdown_option_${ID.uuid()}` },
            { value: 'place_holder_option_2', label: 'Place holder option 2', key: `dropdown_option_${ID.uuid()}` },
            { value: 'place_holder_option_3', label: 'Place holder option 3', key: `dropdown_option_${ID.uuid()}` },
          ];
      case 'Tags':
        return [
          { value: 'place_holder_tag_1', text: 'Place holder tag 1', key: `tags_option_${ID.uuid()}` },
          { value: 'place_holder_tag_2', text: 'Place holder tag 2', key: `tags_option_${ID.uuid()}` },
          { value: 'place_holder_tag_3', text: 'Place holder tag 3', key: `tags_option_${ID.uuid()}` },
        ];
      case 'Checkboxes':
        return [
          { value: 'place_holder_option_1', text: 'Place holder option 1', key: `checkboxes_option_${ID.uuid()}` },
          { value: 'place_holder_option_2', text: 'Place holder option 2', key: `checkboxes_option_${ID.uuid()}` },
          { value: 'place_holder_option_3', text: 'Place holder option 3', key: `checkboxes_option_${ID.uuid()}` },
        ];
      case 'RadioButtons':
        return [
          { value: 'place_holder_option_1', text: 'Place holder option 1', key: `radiobuttons_option_${ID.uuid()}` },
          { value: 'place_holder_option_2', text: 'Place holder option 2', key: `radiobuttons_option_${ID.uuid()}` },
          { value: 'place_holder_option_3', text: 'Place holder option 3', key: `radiobuttons_option_${ID.uuid()}` },
        ];
      case 'Single_Choice':
        return [
          { value: 'option 1', label: 'Option 1', key: `radiobuttons_option_${ID.uuid()}` },
          { value: 'option 2', label: 'Option 2', key: `radiobuttons_option_${ID.uuid()}` },
          { value: 'other', label: 'Other', key: `radiobuttons_option_${ID.uuid()}` },
        ];
      case 'Photo':
        return [
          { value: 'option_1', label: 'Option 1', key: `radiobuttons_option_${ID.uuid()}` },
          { value: 'option_2', label: 'Option 2', key: `radiobuttons_option_${ID.uuid()}` },
        ];
      case 'Check_List':
        return [
          { value: 'option_1', label: 'Option 1', key: `checkboxes_option_${ID.uuid()}` },
          { value: 'option_2', label: 'Option 2', key: `checkboxes_option_${ID.uuid()}` },
        ];
      case 'Button_Radios':
        return [
          { value: 'option_1', label: 'Option 1', key: `button_radios_option_${ID.uuid()}`, hoverText: 'OnHover Option 1' },
          { value: 'option_2', label: 'Option 2', key: `button_radios_option_${ID.uuid()}`, hoverText: '' },
          { value: 'option_3', label: 'Option 3', key: `button_radios_option_${ID.uuid()}`, hoverText: '' },
        ];
      case 'Tab_Break':
        return [
          { value: 'tab_1', label: 'Tab 1', key: `tab_break_option_${ID.uuid()}` },
          { value: 'tab_2', label: 'Tab 2', key: `tab_break_option_${ID.uuid()}` },
        ];
      default:
        return [];
    }
  }

  getItemsConfig(items) {
    if (!items)
      return null;

    let items_list = [];
    items.map(item => {
      if (ITEMS_LIST[item])
        items_list.push(ITEMS_LIST[item])
    })

    return items_list;
  }

  _defaultItems() {
    return [
      {
        key: 'Header',
        name: 'Header Text',
        icon: 'fas fa-heading',
        static: true,
        content: 'Placeholder Text...',
      },
      {
        key: 'Label',
        name: 'Label',
        static: true,
        icon: 'fas fa-font',
        content: 'Placeholder Text...',
      },
      {
        key: 'Paragraph',
        name: 'Paragraph',
        static: true,
        icon: 'fas fa-paragraph',
        content: 'Placeholder Text...',
      },
      {
        key: 'LineBreak',
        name: 'Line Break',
        static: true,
        icon: 'fas fa-arrows-alt-h',
      },
      {
        key: 'Dropdown',
        canHaveAnswer: true,
        name: 'Dropdown',
        icon: 'far fa-caret-square-down',
        label: 'Placeholder Label',
        fieldName: 'dropdown_',
        options: [],
      },
      {
        key: 'MappingDropdown',
        canHaveAnswer: true,
        name: 'Mapping Dropdown',
        icon: 'far fa-caret-square-down',
        label: 'Placeholder Label',
        fieldName: 'dropdown_',
        options: [],
      },
      
      {
        key: 'Tags',
        canHaveAnswer: true,
        name: 'Tags',
        icon: 'fas fa-tags',
        label: 'Placeholder Label',
        fieldName: 'tags_',
        options: [],
      },
      {
        key: 'Checkboxes',
        canHaveAnswer: true,
        name: 'Checkboxes',
        icon: 'far fa-check-square',
        label: 'Placeholder Label',
        fieldName: 'checkboxes_',
        options: [],
      },
      {
        key: 'RadioButtons',
        canHaveAnswer: true,
        name: 'Multiple Choice',
        icon: 'far fa-dot-circle',
        label: 'Placeholder Label',
        fieldName: 'radiobuttons_',
        options: [],
      },
      {
        key: 'TextInput',
        canHaveAnswer: true,
        name: 'Text Input',
        label: 'Placeholder Label',
        icon: 'fas fa-font',
        fieldName: 'text_input_',
      },
      {
        key: 'NumberInput',
        canHaveAnswer: true,
        name: 'Number Input',
        label: 'Placeholder Label',
        icon: 'fas fa-plus',
        fieldName: 'number_input_',
      },
      {
        key: 'TextArea',
        canHaveAnswer: true,
        name: 'Multi-line Input',
        label: 'Placeholder Label',
        icon: 'fas fa-text-height',
        fieldName: 'text_area_',
      },
      {
        key: 'Image',
        name: 'Image',
        label: '',
        icon: 'far fa-image',
        fieldName: 'image_',
        src: '',
      },
      {
        key: 'Rating',
        canHaveAnswer: true,
        name: 'Rating',
        label: 'Placeholder Label',
        icon: 'fas fa-star',
        fieldName: 'rating_',
      },
      {
        key: 'DatePicker',
        canDefaultToday: true,
        canReadOnly: true,
        dateFormat: 'MM/dd/yyyy',
        timeFormat: 'hh:mm aa',
        showTimeSelect: false,
        showTimeSelectOnly: false,
        name: 'Date',
        icon: 'far fa-calendar-alt',
        label: 'Placeholder Label',
        fieldName: 'date_picker_',
      },
      {
        key: 'Signature',
        canReadOnly: true,
        name: 'Signature',
        icon: 'fas fa-pen-square',
        label: 'Signature',
        fieldName: 'signature_',
      },
      {
        key: 'HyperLink',
        name: 'Web site',
        icon: 'fas fa-link',
        static: true,
        content: 'Placeholder Web site link ...',
        href: 'http://www.example.com',
      },
      {
        key: 'Download',
        name: 'File Attachment',
        icon: 'fas fa-file',
        static: true,
        content: 'Placeholder file name ...',
        fieldName: 'download_',
        file_path: '',
        _href: '',
      },
      {
        key: 'Range',
        name: 'Range',
        icon: 'fas fa-sliders-h',
        label: 'Placeholder Label',
        fieldName: 'range_',
        step: 1,
        default_value: 3,
        min_value: 1,
        max_value: 5,
        min_label: 'Easy',
        max_label: 'Difficult',
      },
      {
        key: 'Camera',
        name: 'Camera',
        icon: 'fas fa-camera',
        label: 'Placeholder Label',
        fieldName: 'camera_',
      },
      {
        key: "Button",
        canHaveAnswer: true,
        name: "Button",
        icon: "fas fa-digital-tachograph",
        label: "Placeholder Label",
        fieldName: "button",
        options: [],
      },
      {
        key: "Attachment",
        name: "Attachment",
        canHaveAnswer: true,
        icon: "fas fa-digital-tachograph",
        label: "Attachment",
        options: [],
      },
    ];
  }

  create(item) {
    const elementOptions = {
      id: ID.uuid(),
      element: item.element || item.key,
      // text: item.name,
      type: item.type,
      static: item.static,
      fieldVariant: "outlined", // outlined | filled | standard,
      inputFieldSize: 'large',
      textAlignment: 'left',
      showDescription: item.showDescription,
      buttonType: 'primary',
      customOptions: {
        required: true,
        checked: true,
        dataTable: false,
        filtered: false
      }
    };

    if (this.props.showDescription === true && !item.static) {
      elementOptions.showDescription = true;
    }

    if (item.type === 'custom') {
      elementOptions.key = item.key;
      elementOptions.custom = true;
      elementOptions.forwardRef = item.forwardRef;
      elementOptions.props = item.props;
      elementOptions.component = item.component || null;
      elementOptions.custom_options = item.custom_options || [];
    }

    if (item.static) {
      elementOptions.bold = false;
      elementOptions.italic = false;
    }

    // if (item.canHaveAnswer) { elementOptions.canHaveAnswer = item.canHaveAnswer; }

    if (item.canReadOnly) { elementOptions.readOnly = false; }

    if (item.canDefaultToday) { elementOptions.defaultToday = false; }

    if (item.content) { elementOptions.content = item.content; }

    if (item.href) { elementOptions.href = item.href; }

    // elementOptions.canHaveAlternateForm = item.canHaveAlternateForm !== false;
    // elementOptions.canHaveDisplayHorizontal = item.canHaveDisplayHorizontal !== false;
    // if (elementOptions.canHaveDisplayHorizontal) {
    //   elementOptions.inline = item.inline;
    // }
    // elementOptions.canHaveOptionCorrect = item.canHaveOptionCorrect !== false;
    // elementOptions.canHaveOptionValue = item.canHaveOptionValue !== false;
    // elementOptions.canPopulateFromApi = item.canPopulateFromApi !== false;

    if (item.class_name) {
      elementOptions.class_name = item.class_name;
    }

    if (item.key === 'Image') {
      elementOptions.src = item.src;
    }

    // if (item.key === 'DatePicker') {
    //   elementOptions.dateFormat = item.dateFormat;
    //   elementOptions.timeFormat = item.timeFormat;
    //   elementOptions.showTimeSelect = item.showTimeSelect;
    //   elementOptions.showTimeSelectOnly = item.showTimeSelectOnly;
    // }

    if (item.key === 'Download') {
      elementOptions._href = item._href;
      elementOptions.file_path = item.file_path;
    }

    if (item.key === 'Range') {
      elementOptions.step = item.step;
      elementOptions.default_value = item.default_value;
      elementOptions.min_value = item.min_value;
      elementOptions.max_value = item.max_value;
      elementOptions.min_label = item.min_label;
      elementOptions.max_label = item.max_label;
    }

    if (item.defaultValue) { elementOptions.defaultValue = item.defaultValue; }

    if (item.fieldName) { elementOptions.fieldName = item.fieldName + ID.uuid(); }

    if (item.label) { elementOptions.label = item.label; }

    if (item.options) {
      if (item.options.length > 0) {
        elementOptions.options = item.options;
      } else {
        elementOptions.options = Toolbar._defaultItemOptions(elementOptions.element);
      }
    }

    if (!this.props.isBootstrapElements) {
      if (item.key === 'Number') {
        elementOptions.customOptions.componentType=item.type;
        elementOptions.customOptions.defaultValue=null;
        elementOptions.customOptions.isFieldDisabled=false;
        elementOptions.customOptions.isNumberLimit=true;
        elementOptions.customOptions.min = 0;
        elementOptions.customOptions.max = 1;
      }

      if (item.key === 'Long_Text') {
        elementOptions.customOptions.componentType=item.type;
        elementOptions.customOptions.defaultValue="";
        elementOptions.customOptions.isFieldDisabled=false;
        elementOptions.customOptions.limitType = 'Characters';
        elementOptions.customOptions.limitTypeOptions = 'Words,Characters';
        elementOptions.customOptions.isLimitEntry = false;
        elementOptions.customOptions.editorMode = "Plain_Text",
          elementOptions.customOptions.editorModeOptions = "Plain_Text,Rich_Text";
        elementOptions.customOptions.validationType = 'None';
        elementOptions.customOptions.validationOptions = 'None,Alphabetic,AlphaNumeric';
        // elementOptions.customOptions.min = 0;
        // elementOptions.customOptions.max = 1;
      }

      if (item.key === 'Phone') {
        elementOptions.customOptions.componentType=item.type;
        elementOptions.customOptions.isMasked = false;
        elementOptions.customOptions.countryCode = true;
      }
      if (item.key === 'Attachment') {
        elementOptions.customOptions.required = false;
        elementOptions.customOptions.componentType = item.type;
        elementOptions.customOptions.Attachment = ['.pdf','.doc','.xls'];
        elementOptions.customOptions.defaultValue="";
        elementOptions.customOptions.isFieldDisabled=false;
        elementOptions.customOptions.fileName = "";
        elementOptions.customOptions.uploadFile = this.props.uploadFileOnSave;
        elementOptions.customOptions.attachmentId = this.props.attachmentId;
      }

      if(item.key === 'Button'){
        elementOptions.customOptions.componentType = item.type;
        elementOptions.customOptions.required = false;
        elementOptions.customOptions.actionClick = "Save"
        elementOptions.customOptions.Hyperlink = '';
        elementOptions.customOptions.hasRequiredProp = false;
        elementOptions.customOptions.buttonAction = "";
      }
      
      if (item.key == 'Section_Header')
      {
        elementOptions.customOptions.componentType=item.type;
        elementOptions.customOptions.required = false;
        elementOptions.customOptions.sectionHeaderBGColor = "#202020";
      }
      if (item.key === 'Single_Choice') {
        elementOptions.customOptions.componentType=item.type;
        elementOptions.customOptions.required = false;
        elementOptions.customOptions.isSingleChoiseOption = true;
        elementOptions.customOptions.isSpreadToColumn = false;
        elementOptions.customOptions.columns = 0;
        elementOptions.singleChoiceOptions = Toolbar._defaultItemOptions(elementOptions.element);
      }

      if (item.key == "Dropdown") {
        // console.log(this.props.handleDownloadTemplate)
        elementOptions.customOptions.componentType=item.type;
        elementOptions.customOptions.required = false;
        elementOptions.customOptions.showEmptyTextOption = false;
        elementOptions.customOptions.emptyOptionText = item.emptyOptionText;
        elementOptions.customOptions.defaultOptions = item.defaultOptions;
        elementOptions.customOptions.dataOptions = "mastersheet";
        elementOptions.customOptions.download = this.props.handleDownloadTemplate;
        elementOptions.customOptions.fileUploaded = "";
        elementOptions.customOptions.uploaded = false;
        elementOptions.customOptions.uploadedOptions = [];
        elementOptions.hasDependentComponents = false;
        elementOptions.customOptions.isDependentSectionExpanded = false;
        elementOptions.dependentComponents = [
          {
            parentId: [], 
            form: [
              {
                label: "",
                key: ""
              }
            //   {
            //     "buttonType":"primary",
            //     "customOptions":{
            //        "charLimit":120,
            //        "checked":true,
            //        "componentType":"Short Text Field",
            //        "dataTable":false,
            //        "filtered":false,
            //        "isMasked":false,
            //        "maskedValue":"",
            //        "required":true,
            //        "selectedIcons":"",
            //        "validation":"None",
            //        "element":"Short_Text",
            //        "fieldName":"shortText_A195AEC8-A1FF-424F-BD2D-2053F95C4E78",
            //        "fieldVariant":"outlined"
            //     },
            //     "globalStyles":{
            //        "formDefault":false
            //     },
            //     "id":"5A7DFF13-A03C-476B-A91F-C68A303C45D4",
            //     "inputFieldSize":"large",
            //     "label":"Short Text Field",
            //     "showDescription":"undefined",
            //     "static":"undefined",
            //     "textAlignment":"left",
            //     "type":"Short Text Field",
            //     "element":"Short_Text"
            //  }
            ]}];
        if (item.dropDownOptions != undefined && item.dropDownOptions.length > 0) {
          elementOptions.dropDownOptions = item.optionsText;
          elementOptions.dropDownOptions = item.dropDownOptions;
        } else {
          elementOptions.dropDownOptions = [];
        }
      }

      if (item.key == "Mapping_Dropdown") {
        // console.log(this.props.handleDownloadTemplate)
        elementOptions.customOptions.componentType=item.type;
        elementOptions.customOptions.defaultValue="SITE";
        elementOptions.customOptions.required = false;
        elementOptions.customOptions.showEmptyTextOption = false;
        elementOptions.customOptions.emptyOptionText = item.emptyOptionText;
        elementOptions.customOptions.defaultOptions = item.defaultOptions;
        elementOptions.customOptions.dataOptions = "mastersheet";
        elementOptions.customOptions.download = this.props.handleDownloadTemplate;
        elementOptions.customOptions.fileUploaded = "";
        elementOptions.customOptions.uploaded = false;
        elementOptions.customOptions.uploadedOptions = [];
        elementOptions.hasDependentComponents = false;
        elementOptions.customOptions.isDependentSectionExpanded = false;
        elementOptions.dependentComponents = [
          {
            parentId: [], 
            form: [
              {
                label: "",
                key: ""
              }
            //   {
            //     "buttonType":"primary",
            //     "customOptions":{
            //        "charLimit":120,
            //        "checked":true,
            //        "componentType":"Short Text Field",
            //        "dataTable":false,
            //        "filtered":false,
            //        "isMasked":false,
            //        "maskedValue":"",
            //        "required":true,
            //        "selectedIcons":"",
            //        "validation":"None",
            //        "element":"Short_Text",
            //        "fieldName":"shortText_A195AEC8-A1FF-424F-BD2D-2053F95C4E78",
            //        "fieldVariant":"outlined"
            //     },
            //     "globalStyles":{
            //        "formDefault":false
            //     },
            //     "id":"5A7DFF13-A03C-476B-A91F-C68A303C45D4",
            //     "inputFieldSize":"large",
            //     "label":"Short Text Field",
            //     "showDescription":"undefined",
            //     "static":"undefined",
            //     "textAlignment":"left",
            //     "type":"Short Text Field",
            //     "element":"Short_Text"
            //  }
            ]}];
        if (item.dropDownOptions != undefined && item.dropDownOptions.length > 0) {
          elementOptions.dropDownOptions = item.optionsText;
          elementOptions.dropDownOptions = item.dropDownOptions;
        } else {
          elementOptions.dropDownOptions = [
            {label:'Site',value:'SITE'},
          ];
        }
      }

      if (item.key === 'Short_Text') {
        elementOptions.customOptions.componentType=item.type;
        elementOptions.customOptions.defaultValue="";
        elementOptions.customOptions.isFieldDisabled=false;
        if (item.customOptions != undefined && item.customOptions.isMasked != undefined) {
          elementOptions.customOptions.isMasked = item.customOptions.isMasked;
        } else {
          elementOptions.customOptions.isMasked = false
        }

        if (item.customOptions != undefined && item.customOptions.maskedValue != undefined) {
          elementOptions.customOptions.maskedValue = item.customOptions.maskedValue;
        } else {
          elementOptions.customOptions.maskedValue = ""
        }
        if (item.customOptions != undefined && item.customOptions.validation != undefined) {
          elementOptions.customOptions.validation = item.customOptions.validation;
        } else {
          elementOptions.customOptions.validation = "None"
        }
        elementOptions.customOptions.charLimit = 120;
        elementOptions.customOptions.selectedIcons = "";
        elementOptions.customOptions.selectedIconsMobile = "";
      }

      if (item.key === 'Photo') {
        elementOptions.customOptions.maxSize = 5;
        elementOptions.customOptions.max = 5;
        elementOptions.customOptions.componentType=item.type;
        if (item.customOptions != undefined && item.customOptions.cameraFacingOptions != undefined) {
          elementOptions.customOptions.cameraFacingOptions = item.customOptions.cameraFacingOptions;
        } else {
          elementOptions.customOptions.cameraFacingOptions = "front"
        }
        elementOptions.customOptions.isPhotoAvail = true
        elementOptions.customOptions.isPhotoUpload = true
        elementOptions.customOptions.tapedrop = false
        elementOptions.customOptions.isDistToBuilding = false
        elementOptions.customOptions.distanceToBuildingRadius = ''
        elementOptions.customOptions.isTargetAzimuthAngle = false
        elementOptions.customOptions.isEditPhoto = false
        elementOptions.customOptions.isShowHelp = false
        elementOptions.customOptions.isCommentsAvail = false
        elementOptions.customOptions.isRadioGroup = false
        elementOptions.customOptions.helpText = ''
        elementOptions.customOptions.sampleS3Uri = ''
        elementOptions.singleChoiceOptions = Toolbar._defaultItemOptions(elementOptions.element);

      }

      if (item.key === 'Video') {
        elementOptions.customOptions.componentType=item.type;
        elementOptions.customOptions.defaultValue="";
        elementOptions.customOptions.isFieldDisabled=false;
        elementOptions.customOptions.isVideoAvail = true;
        elementOptions.customOptions.isVideoUpload = true;
        elementOptions.customOptions.isVideoLink = false;
        elementOptions.customOptions.videoLink = "";
        elementOptions.customOptions.recordedVideo = "";
        elementOptions.customOptions.uploadedVideo = "";
        elementOptions.customOptions.maxSize = 10;
        elementOptions.customOptions.max = 10;
        elementOptions.customOptions.error = false;
        elementOptions.customOptions.fileName = "";
        elementOptions.customOptions.url = "";
      }
      if (item.key === 'Check_List') {
        elementOptions.customOptions.componentType=item.type;
        elementOptions.customOptions.optionsText = "Option 1\nOption 2";
        elementOptions.customOptions.columns = 0;
        elementOptions.checkListOptions = Toolbar._defaultItemOptions(elementOptions.element);
      }
    }
    if ( item.key === 'Location_Coordinates' || item.key === 'Email' || item.key === 'Signature' || item.key === 'Time'){
      elementOptions.customOptions.componentType=item.type;
    }
    if (item.key === 'Location_Coordinates'){
      elementOptions.customOptions.addressLabel="Address";
      elementOptions.customOptions.displayMapOption = "Map+Text";
      elementOptions.customOptions.editable = false;
      elementOptions.customOptions.defaultValue="";
      elementOptions.customOptions.isFieldDisabled=false;
      elementOptions.customOptions.required = false;

    }
    if (item.key === 'Header') {
      elementOptions.customOptions.componentType=item.type;
      if (item.customOptions != undefined && item.customOptions.imageFile != undefined) {
        elementOptions.customOptions.imageFile = item.customOptions.imageFile;
      } else {
        elementOptions.customOptions.imageFile = "";
      }
    }
    if (item.key === "Time") {
      elementOptions.customOptions.defaultTime = "none";
      elementOptions.customOptions.required = true;
      elementOptions.customOptions.cutomTime = null;
    }

    if (item.key === 'Date_Picker') {
      elementOptions.customOptions.componentType=item.type;
      elementOptions.customOptions.dateFormat = "MM-dd-yyyy";
      elementOptions.customOptions.defaultDate = null;
      elementOptions.customOptions.defaultDateOptions = "none";
      elementOptions.customOptions.formatSeparator = "hyphen";
      elementOptions.customOptions.disablePastDates = false;
      elementOptions.customOptions.required = true;
      elementOptions.customOptions.readOnly = false;
    }
    if (item.key === 'Configurable_List') {
      elementOptions.customOptions.componentType=item.type;
      elementOptions.customOptions.optionsText = "Header Item 1 : text: Enter text";
      elementOptions.customOptions.minimalRows = "1";
      elementOptions.customOptions.maximalRows = "0";
      elementOptions.customOptions.labelAdd = "Add Row";
      elementOptions.customOptions.labelRemove = "Remove";
      elementOptions.customOptions.headerActionLabel = "Actions";
      elementOptions.customOptions.headerList = [];
      elementOptions.customOptions.headerList.push({
        label: '',
        headerId: 'headerId001',
        required: false,
        type: ''
      });
      elementOptions.customOptions.deleteRow = false;
      elementOptions.customOptions.viewRow = false;
      elementOptions.customOptions.editRow = false;
      // elementOptions.headerList = [{
      //   label: 'Header Item 1',
      //   headerId: "0",
      //   required: false,
      //   type: 'text',
      //   placeholder: "Enter text"
      // }
      // ];
      //elementOptions.rows = [{ rowId: 0 }]
    }

    if (item.key === 'Button_Radios') {
      elementOptions.customOptions.componentType=item.type;
      elementOptions.customOptions.optionsText = "Option 1[OnHover Option 1]\nOption 2\nOption 3"
      elementOptions.buttonRadioOptions = Toolbar._defaultItemOptions(elementOptions.element);
      elementOptions.customOptions.columns = 0;
      elementOptions.customOptions.spacing = 1;
      elementOptions.customOptions.buttonThemeColor = 'red';
    }

    if (item.key === 'Tab_Break') {
      elementOptions.customOptions.componentType=item.type;
      elementOptions.customOptions.optionsText = 'Tab 1\nTab 2';
      elementOptions.tabsOptions = Toolbar._defaultItemOptions(elementOptions.element);
    }

    if (item.key.toLowerCase() === 'photo_prepost') {
      elementOptions.customOptions.componentType=item.type;
      let customOptions = elementOptions.customOptions;
      customOptions.isPreAvail = false;
      customOptions.is360Avail = false;
      customOptions.isBarcodeAvail = true;
      customOptions.isPhotoAvail = false;
      customOptions.is360PhotoUpload = false;
      customOptions.isPrePhotoUpload = false;
      customOptions.isPostPhotoUpload = false;

      customOptions.isCommentsAvail = false;
      customOptions.isCommentPopAvail = true;

      customOptions.isPostAvail = false;
      customOptions.isPhotoUpload = false;
      customOptions.showLine = false;

      elementOptions.customOptions = customOptions;
    }

    if (item.key === 'Barcode_Scanner') {
      elementOptions.customOptions.componentType=item.type;
      elementOptions.customOptions.required = false;
      let customOptions = elementOptions.customOptions;
      customOptions.isPreAvail = false;
      customOptions.is360Avail = false;
      customOptions.isBarcodeAvail = true;
      customOptions.isPhotoAvail = false;

      customOptions.is360PhotoUpload = false;
      customOptions.isPrePhotoUpload = false;
      customOptions.isPostPhotoUpload = false;

      customOptions.isCommentsAvail = false;
      customOptions.isCommentPopAvail = true;

      customOptions.isPostAvail = false;
      customOptions.isPhotoUpload = false;
      customOptions.showLine = false;

      elementOptions.customOptions = customOptions;
    }

    if (item.key === 'Tiles') {
      elementOptions.customOptions.componentType=item.type;
      elementOptions.customOptions.required = false;
      elementOptions.customOptions.tileProperties = [];
      elementOptions.customOptions.tileProperties.push({
        ID: "Tile ID- COMPONENT001",
        key: "Tile ID- COMPONENT001",
        title: "",
        textRule: "",
        shortTextValue: "",
        numberTextValue: 0,
        text: "",
        rule: "",
        tilesType: "",
        component: "",
        componentOnScreenSource: "",
        componentOnScreenMethod: "",
        componentOnScreenTarget: "",
        tilesColor: "",
        tilesRandomColor: "",
        action: []
      });
      elementOptions.customOptions.columns = 1;
      elementOptions.customOptions.spacing = 1;
      elementOptions.customOptions.charecterLimit = 20;
    }

    return elementOptions;
  }

  _onClick(item) {
    console.log('onClick', {item})
    store.dispatch('create', this.create(item));
    this.props.setFormData(this.create(item));
  }

  render() {
    let classes = `${this.props.isAligned ? "react-form-builder-toolbar" : "col-md-3 react-form-builder-toolbar "} ${this.props.toolbarAlignClass}`;
    let styleRight = {
      height: 'calc(100vh - 230px)', overflowY: 'auto', right: '0px'
    }
    let styleleft = {
      height: 'calc(100vh - 230px)', overflowY: 'auto', left: '0px'
    }

    return (
      <div className={classes} style={this.props.toolbarAlignClass == 'float-left' ? styleleft : styleRight}>
        {/* <h4>{false ? 'Bootstrap Elements' : 'Form Elements'}</h4> */}
        <ul>
          {
            this.state.items.map((item) => (<ToolbarItem isBootstrapElements={this.state.isBootstrapElements} data={item} key={item.key} onClick={this._onClick.bind(this, item)} onCreate={this.create} />))
          }
        </ul>
      </div>
    );
  }
}
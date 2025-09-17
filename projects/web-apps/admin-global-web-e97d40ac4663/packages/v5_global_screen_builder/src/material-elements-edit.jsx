import React from 'react';

import ID from './UUID';
import { get } from './stores/requests';
import {
  ContentState, EditorState, convertFromHTML,
} from 'draft-js';
import {
  TimePicker,
  MuiPickersUtilsProvider
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { AccessTimeSharp } from '@material-ui/icons';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from "@material-ui/icons/Remove";
import DeleteIcon from '@material-ui/icons/Delete';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import TextAreaAutosize from 'react-textarea-autosize';
import NumberInputOptions from './options/number-options';
import PhoneElementOptions from './options/phone-options';
import ShortTextOptions from './options/shorttext-options';
import TakePhotoOptions from './options/takephoto-options';
import Divider from '@material-ui/core/Divider';
import HeaderElementOptions from './options/header-options';
import CancelRoundedIcon from '@material-ui/icons/CancelRounded';
import SingleChoiceOptions from './options/single-choice-options';
import PhotoPrePostOptions from './options/photo-pre-post-options';
import CheckListOptions from './options/checklist-options';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import { createMuiTheme, ThemeProvider, withStyles } from '@material-ui/core/styles';
import {
  TextField, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Checkbox, Grid, IconButton, Switch, Typography, Button, List, ListItem, Paper, Icon, Tooltip, Box,
  MenuItem, Select, Input, InputLabel, FormGroup, InputAdornment, Dialog, DialogTitle, DialogContent, Card, Collapse, CardContent
} from '@material-ui/core';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import LongTextOptions from './options/long-text-options';
import DatePickerOptions from './options/datepicker-options';
import ConfigurableOptions from './options/configurable-list-options';
import ButtonRadiosOptions from './options/button-radios-options';
import InputTableOptions from './options/input-table-options';
import TabsOptions from './options/tabs-options';
import TilesOptions from './options/tiles-options';
import InfoIcon from "@material-ui/icons/Info";
import { isNumber } from 'lodash';
import CircleCheckedFilled from "@material-ui/icons/CheckCircle";
import CircleUnchecked from "@material-ui/icons/RadioButtonUnchecked";
import LocationMapOption from './options/location-map-options';
import TakeVideoOptions from './options/takevideo-options';
import DropdownOptions from './options/dropdown-options';
import { SECTION_COMPONENTS_LIST } from './material-elements-config';
import Toolbar from './toolbar';
import Attachment from './options/Attachment';
import Video from './options/Video';
import LocationCoordinates from './meterial-form-elements/location_coordinates';

const styles = theme => ({
  // overrides: {
  //     MuiDialogPaper : {
  //     position:"relative",
  //     top:"25%",
  //     left:"150%",
  // },
  //  },
  checked: {
    border: "1px solid #2C3E93",
    padding: " 0 0 0 0.5rem",
    borderRadius: "4px",
    color: "#2C3E93",
    height: '30px',
    marginLeft: "0.1rem",
    marginRight: "0.6rem",
  },
  unchecked: {
    border: "1px solid #00000099",
    padding: " 0 0 0 0.5rem",
    borderRadius: "4px",
    height: '30px',
    marginLeft: "0.1rem",
    marginRight: "0.6rem",
  },
  text: {
    marginButtom: '1rem',
    // marginLeft:'1rem',
    opacity: 0.6,
    fontSize: '16px',
    fontWeight: "normal"
  },
  text1: {
    display: 'inline',
    opacity: 0.6,
    fontSize: '16px',
    fontWeight: "normal"
  },
  attachmentText: {
    display: 'inline',
    fontSize: '16px',
    fontWeight: "normal"
  },
  btnStyle: {
    outline: "none",
    textTransform: "capitalize"
  },
  label: {
    fontSize: '0.875rem',
    opacity: 0.5
  },
  label1: {
    fontSize: '0.875rem',
    opacity: 1
  },
  browseIcon: {
    display: 'block',
    padding: '0 3rem',
    border: '1px dashed rgb(128,128,128,.5)',
    opacity: "0.7"
  },

  attachment: {
    border: '1px solid black',
    borderRadius: '5px',
    width: '9rem',
    marginLeft: '0.2rem',
    padding: '5px 0 5px 50px',
    color: 'black',
  },
  attachmentEnabled : {
    border:'1px solid #2C3E93',
    borderRadius:'5px',
    width:'9rem',
    marginLeft:'0.2rem',
    padding:'5px 0 5px 50px',
    color:'#2C3E93',
  },
  paper: {
    width: "97%",
    margin: "0 auto",
    boxShadow: "none"
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: "72%",
    maxWidth: "72%",
  },
  attachmentEnabled: {
    border: '1px solid #2C3E93',
    borderRadius: '5px',
    width: '9rem',
    marginLeft: '0.2rem',
    padding: '5px 0 5px 50px',
    color: '#2C3E93',
  }
})
const theme = createMuiTheme({
  overrides: {
    MuiFormControlLabel: {
      label: {
        fontSize: '0.875rem',
      }
    },
  },

  palette: {
    primary: {
      main: "#2C3E93"
    }
  },
});
const characterLimitHelperTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#2C3E93"
    }
  },
  overrides: {
    MuiFormHelperText: {
      contained: {
        marginRight: 0,
        textAlign: 'right'
      }
    },
    MuiFormLabel: {
      asterisk: {
        color: "#db3131",
        "&$error": {
          color: "#db3131"
        }
      }
    },
    // MuiDialogPaper : {
    //   position:"relative",
    //   top:"25%",
    //   left:"150%",
    // },
  },
});
class FormElementsEdit extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      element: this.props.element,
      data: this.props.data,
      dirty: false,
      characterLimit: this.props.element.customOptions.charLimit,
      elementValues: JSON.parse(JSON.stringify(this.props.element)),
      require: false,
      selectedTime: null,
      open: false,
      videoLinkDisable: false,
      disableNumber: false,
      Attachments: [
        {
          id: 0,
          name: 'All Type'

        },
        {
          id: 1,
          name: '.pdf'

        },
        {
          id: 2,
          name: '.xls'

        },
        {
          id: 3,
          name: '.doc'

        },
      ]
    };

    this.setNumberLimit = this.setNumberLimit.bind(this);
    this.editElementProp = this.editElementProp.bind(this);
    this.setValidationType = this.setValidationType.bind(this);
    this.setValidationOptions = this.setValidationOptions.bind(this);
    this.setInputMaskedValue = this.setInputMaskedValue.bind(this);
    this.setDefaultOptions = this.setDefaultOptions.bind(this);
    this.setDisplayOptions = this.setDisplayOptions.bind(this);
    this.setActionClick = this.setActionClick.bind(this);
    this.setScreenSelect = this.setScreenSelect.bind(this);
    this.handleTilesOptions = this.handleTilesOptions.bind(this);
    this.handleTableOptions = this.handleTableOptions.bind(this);
    this.addTilesOptions = this.addTilesOptions.bind(this);
    this.addTableOptions = this.addTableOptions.bind(this);
    this.removeTilesOptions = this.removeTilesOptions.bind(this);
    this.removeTableOptions = this.removeTableOptions.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
    // this.handlePopup = this.handlePopup.bind(this);
    // this.handleIconOpen = this.handleIconOpen.bind(this);
    this.handleAttachments = this.handleAttachments.bind(this);
    this.handleHyperlink = this.handleHyperlink.bind(this);
    this.handleSelectedIcon = this.handleSelectedIcon.bind(this);
    this.handleDropdownDataOptions = this.handleDropdownDataOptions.bind(this);
    this.handledropDownOptions = this.handledropDownOptions.bind(this);
    this.handleMaxSize = this.handleMaxSize.bind(this);
    this.handleFile = this.handleFile.bind(this);
    this.handleDeleteFile = this.handleDeleteFile.bind(this);
    this.handleVideoChange = this.handleVideoChange.bind(this);
    this.handleDeleteVideo = this.handleDeleteVideo.bind(this);
  }
  editElementProp(elemProperty, targProperty, e) {
    // elemProperty could be content or label
    // targProperty could be value or checked
    const this_element = this.state.element;
    this_element[elemProperty] = e.target[targProperty];

    this.setState({
      element: this_element,
      dirty: true,
    }, () => {
      if (targProperty === 'checked') { this.updateElement(); }
    });
  }

  editElementCustomOptionsProp(elemProperty, targProperty, e) {
    // elemProperty could be content or label
    // targProperty could be value or checked
    const this_element = this.state.element;
    if (elemProperty.includes("isCommentsAvail")) {
      this_element.customOptions["isCommentPopAvail"] = !e.target[targProperty];
    } else if (elemProperty.includes("isCommentPopAvail")) {
      this_element.customOptions["isCommentsAvail"] = !e.target[targProperty];
    }

    if (elemProperty.includes("tapedrop") && e.target[targProperty]) {
      this_element.customOptions["isDistToBuilding"] = !e.target[targProperty];
      this_element.customOptions["isTargetAzimuthAngle"] = !e.target[targProperty];
    } else if (elemProperty.includes("isDistToBuilding") && e.target[targProperty]) {
      this_element.customOptions["tapedrop"] = !e.target[targProperty];
      this_element.customOptions["isTargetAzimuthAngle"] = !e.target[targProperty];
    } else if (elemProperty.includes("isTargetAzimuthAngle") && e.target[targProperty]) {
      this_element.customOptions["tapedrop"] = !e.target[targProperty];
      this_element.customOptions["isDistToBuilding"] = !e.target[targProperty];
    }
    // if (elemProperty === "isFieldDisabled" && targProperty ) {
    //   this_element.customOptions.charLimit = "";
    // }
    if (elemProperty === 'editorMode' && this_element.customOptions[elemProperty].toLowerCase().includes("rich")) {
      this_element.customOptions.isLimitEntry = false;
    }
    this_element.customOptions[elemProperty] = e.target[targProperty];

    if (elemProperty === 'required' || elemProperty === 'isLimitEntry' || elemProperty === "showEmptyTextOption" || elemProperty === 'isMasked' || elemProperty === 'countryCode' || elemProperty === 'isOtherOption'
      || elemProperty === 'checked'
      || elemProperty === 'readOnly'
      || elemProperty === 'disablePastDates'
      || elemProperty === 'disableTime'
      || elemProperty === 'isDependentSectionExpanded'
      || elemProperty === 'isFieldDisabled'
      || elemProperty === 'defaultValue'
      ) {
      this_element.customOptions[elemProperty] = targProperty;
      if (elemProperty === 'isFieldDisabled') {
        if (this_element.element === 'Number') {
          this_element.customOptions.isNumberLimit=false;
          this_element.customOptions.min = "";
          this_element.customOptions.max = "";
        }
  
        if (this_element.element === 'Long_Text') {
          this_element.customOptions.isLimitEntry = false;
          this_element.customOptions.editorMode = "Plain_Text",
          this_element.customOptions.validationType = 'None';
        }
        
        if (this_element.element === 'Short_Text') {
          this_element.customOptions.validation = "None"
          this_element.customOptions.charLimit = 120;
        }
      }
    }
    if (elemProperty === 'hasDependentComponents') {
      this_element[elemProperty] = targProperty;
    }
    this.setState({
      element: this_element,
      dirty: true,
    }, () => {
      if (targProperty === 'checked') { this.updateElement(); }
    });
  }

  componentDidMount() {
    if (this.props.element.element.toLowerCase().includes("table")) {
      let headerList = [{ headerId: "0", label: "Header Item", type: 'text', required: false, options: [] }];
      let rows = [{ rowId: 0 }];
      if (this.props.element.hasOwnProperty('headerList')) {
        headerList = this.props.element.headerList;
        rows = this.props.element.rows;
      }

      const element = this.state.element;
      element.headerList = headerList;
      element.rows = rows;

      this.setState({
        element: element
      });
    }
  }

  setChatLimit(elemProperty, e) {
    const this_element = this.state.element;
    this_element.customOptions[elemProperty] = e.target.value;
    this.setState({
      element: this_element,
      dirty: true,
      characterLimit: e.target.value
    });
  }
  setDefaultValue(elemProperty, e) {
    const this_element = this.state.element;
    if (isNaN(parseFloat(e.target.value))) {
      this_element.customOptions[elemProperty] = e.target.value;
    } else {
      this_element.customOptions[elemProperty] = Number(e.target.value);
    }
    if(e.target.value?.length < 1 ) {
      this_element.customOptions.isFieldDisabled = false;
    }
    this.setState({
      element: this_element,
      dirty: true,
    });
  }

  handleTimeChange(time) {
    const this_element = this.state.element;
    this_element.customOptions.cutomTime = time;
    this.setState({ selectedTime: time })
  }

  handleSelectedIcon(selectedIcon) {
    const this_element = this.state.element;
    this_element.customOptions.selectedIcons = selectedIcon;
    this_element.customOptions.selectedIconsMobile = selectedIcon.split("_").join("-");
    this.setState({
      element: this_element,
      dirty: true,
    });
  }

  handleAttachments = (e) => {
    const this_element = this.state.element;
    const arry = this.state.element.customOptions.Attachment;
    if (e.target.value === "All Type" && arry.length < 3) {
      this.state.element.customOptions.Attachment = ['.pdf', '.doc', '.xls'];
    } else if (e.target.value === "All Type" && arry.length === 3) {
      this.state.element.customOptions.Attachment = []
    }
    else if (arry.includes(`${e.target.value}`)) {
      const index = arry.indexOf(`${e.target.value}`);
      if (index > -1) {
        arry.splice(index, 1)
      }
    } else {
      arry.push(e.target.value);
    }

    this.setState({
      element: this_element,
      dirty: true,
    });
  }

  async handleFile(e) {
    const { files } = e.target;
    const this_element = this.state.element;
    this_element.customOptions.fileName = files[0].name;
    this_element.customOptions.file = files[0];
    this_element.customOptions.defaultValue = await this.props.uploadFile(files[0], "file");
    this.setState({
      element: this_element,
      dirty: true,
    });
  }

  // handleVideo =(e)=> {
  //   const this_element = this.state.element;
  //   this.state.element.customOptions.fileName = e.target.files[0].name;
  //   this.state.element.customOptions.uploadVideoFile(e.target.files[0]);
  //   this.state.element.customOptions.url = URL.createObjectURL(e.target.files[0]);
  //   this.state.element.customOptions.defaultValue = this.state.element.customOptions.uploadVideoId;
  //   this.setState({
  //     element: this_element,
  //     dirty: true,
  //   });
  // }

  async handleVideoChange(e) {
    const { files } = e.target;
    const this_element = this.state.element;
    this_element.customOptions.fileName = files[0].name;
    this_element.customOptions.defaultValue = await this.props.uploadFile(files[0], "video");
    this_element.customOptions.url = URL.createObjectURL(files[0]);

    this.setState({
      element: this_element,
      dirty: true
    });
  }

  handleDeleteVideo =()=> {
    const this_element = this.state.element;
    this_element.customOptions.isFieldDisabled = false;
    this_element.customOptions.fileName = "";
    this_element.customOptions.url = "";
    this_element.customOptions.defaultValue= "";
    this.setState({
      element: this_element,
      dirty: true,
    });
  }

  handleDeleteFile = (e)=> {
    const this_element = this.state.element;
    this.state.element.customOptions.fileName = "";
    this.state.element.customOptions.defaultValue = "";
    this.setState({
      element: this_element,
      dirty: true,
    });
  }

  handleMaxSize = (e) => {
    const this_element = this.state.element;
    this_element.customOptions.maxSize = e.target.value;

    this.setState({
      element: this_element,
      dirty: true,
    });
  }

  handleHyperlink = (e) => {
    const this_element = this.state.element;
    const { value } = e.target;
    this_element.customOptions.Hyperlink = value;
    this.setState({
      element: this_element,
      dirty: true,
    });
  }
  toggleOtherOption(elemProperty, targProperty, e) {
    const this_element = this.state.element;
    // if (e.target[targProperty]) {
    if (targProperty) {
      if (!this_element.customOptions[elemProperty]) {
        const text = 'Other';
        const val = text.toLowerCase().split(' ').join('_');
        this_element.singleChoiceOptions.push({ value: val, label: text, key: ID.uuid() });
      }
    } else if (this_element.customOptions[elemProperty]) {

      this_element.singleChoiceOptions.pop();
    }
    //this_element.customOptions[elemProperty] = e.target[targProperty];
    this_element.customOptions[elemProperty] = targProperty;

    // setTimeout(()=>{
    //   this_element.customOptions[elemProperty] = targProperty;
    // }, 1000)


    // if (elemProperty === 'isOption') {
    //   this_element.customOptions[elemProperty] = targProperty;
    // }

    this.setState({
      element: this_element,
      dirty: true,
    });
  }

  toggleCheckListOtherOption(elemProperty, targProperty, e) {
    const this_element = this.state.element;
    if (targProperty) {
      if (!this_element.customOptions[elemProperty]) {
        const text = 'Other';
        const val = text.toLowerCase().split(' ').join('_');
        this_element.checkListOptions.push({ value: val, label: text });
      }
    } else if (this_element.customOptions[elemProperty]) {
      this_element.checkListOptions.pop();
    }
    // this_element.customOptions[elemProperty] = e.target[targProperty];
    // if (elemProperty === 'isOtherOption') {
    //   this_element.customOptions[elemProperty] = targProperty;
    // }

    this_element.customOptions[elemProperty] = targProperty;
    this.setState({
      element: this_element,
      dirty: true,
    });
  }

  pickColor(event, elemProperty) {
    const this_element = this.state.element;
    this_element.customOptions[elemProperty] = event.target.value;

    this.setState({
      element: this_element,
      dirty: true,
    })
  }


  setRows(elemProperty, e) {
    const this_element = this.state.element;
    let rows = this_element.rows;
    if (e.target.value > rows.length) {
      const count = e.target.value - rows.length;
      rows.splice(rows.length, count, { rowId: rows.length });
    } else if (e.target.value < rows.length) {
      let count = rows.length - e.target.value;
      rows.splice(e.target.value, count);
    }

    this_element[elemProperty] = rows;

    this.setState({
      element: this_element,
      dirty: true,
    });
  }

  setNumberLimit(elemProperty, value) {
    const this_element = this.state.element;
    if (elemProperty == 'min' || elemProperty == 'max') {
      this_element.customOptions[elemProperty] = Number(value);
    } else {
      this_element.customOptions[elemProperty] = value;
    }
    if(this_element.customOptions.min >= this_element.customOptions.max || value === "" ) {
      this.state.disableNumber = true;
    } else if ( this_element.customOptions.min < this_element.customOptions.max 
      ) {
      this.state.disableNumber = false;
    }
    this.setState({
      element: this_element,
      dirty: true,
    });
  }
  setValidationType(value) {
    const this_element = this.state.element;
    this_element.customOptions.validationType = value;
    this.setState({
      element: this_element,
      dirty: true,
    });
  }

  onEditorStateChange(index, property, editorContent) {
    const this_element = this.state.element;
    this_element[property] = html;

    this.setState({
      element: this_element,
      dirty: true,
    });
  }

  onLabelChange(elemProperty, e) {
    const this_element = this.state.element;
    this_element[elemProperty] = e.target.value;

    this.setState({
      element: this_element,
      dirty: true
    })
  }
  handleTableOptions(elemProperty, index, e) {
    const this_element = this.state.element;

    if (elemProperty === "required") {
      this_element.customOptions.headerList[index][elemProperty] = e;
      // let anyFieldIsMandatory = false;
      // this_element.customOptions.headerList.map((h, i) => {
      //   if (h.required) {
      //     anyFieldIsMandatory = true;
      //   }
      // });
      // if (anyFieldIsMandatory) {
      //   this_element.customOptions.editRow = true;
      // } else {
      //   if (e && !this_element.customOptions.editRow) {
      //     this_element.customOptions.editRow = true;
      //   } //else if (!e && this_element.customOptions.editRow) {
      //     //this_element.customOptions.editRow = false;
      //   //}
      // }
    } else {
      this_element.customOptions.headerList[index][elemProperty] = e.target.value;
    }

    this.setState({
      element: this_element,
      dirty: true,
    }, () => {
      this.updateElement();
    })
  }
  handleTilesOptions(elemProperty, index, e) {
    // if (elemProperty === "columns" && e.target.value > 4) {
    //   return;
    // }
    const this_element = this.state.element;
    if (elemProperty == "spacing") {
      this_element.customOptions[elemProperty] = e.target.value;
    } else if (elemProperty == "componentOnScreenMethod") {
      this_element.customOptions.tileProperties[index][elemProperty] = e;
      //..Component Source
      const cs = this_element.customOptions.tileProperties[index].componentOnScreenSource;
      //..Component Target
      const ct = this_element.customOptions.tileProperties[index].componentOnScreenTarget;
      let sv, tv;

      if (cs && ct) {
        //..Source Index
        const si = this_element.customOptions.tileProperties.findIndex(x => x.ID === cs);
        //..Target Index
        const ti = this_element.customOptions.tileProperties.findIndex(x => x.ID === ct);
        //..Source Value
        sv = this_element.customOptions.tileProperties[si].text;
        //..Target Value
        tv = this_element.customOptions.tileProperties[ti].text;
      }
      if (!isNaN(sv) && !isNaN(tv)) {
        sv = parseInt(sv);
        tv = parseInt(tv);
        switch (e) {
          case 'add':
            if (sv && tv) {
              //alert(sv + tv);           
              this_element.customOptions.tileProperties[index].text = sv + tv;
            }
            break;
          case 'sub':
            if (sv && tv) {
              this_element.customOptions.tileProperties[index].text = sv - tv;
            }
            break;
          case 'mult':
            if (sv && tv) {
              this_element.customOptions.tileProperties[index].text = sv * tv;
            }
            break;
          case 'div':
            if (sv && tv) {
              let n = sv / tv;
              var result = (n - Math.floor(n)) !== 0;
              if (result) {
                this_element.customOptions.tileProperties[index].text = n.toFixed(2);
              }
              else {
                this_element.customOptions.tileProperties[index].text = n;
              }
            }
            break;
          default:
            this_element.customOptions.tileProperties[index].text = 0;
            break;
        }
      }
    }
    else if (elemProperty == "action") {
      if (e.target.checked) {
        const count = this_element.customOptions.tileProperties[index][elemProperty].length;
        this_element.customOptions.tileProperties[index][elemProperty].splice(count, 0, e.target.value)
      } else {
        const actionIndex = this_element.customOptions.tileProperties[index][elemProperty].findIndex(x => x === e.target.value)
        if (actionIndex != -1) {
          this_element.customOptions.tileProperties[index][elemProperty].splice(actionIndex, 1)
        }
      }
    } else {
      this_element.customOptions.tileProperties[index][elemProperty] = e.target.value;
    }

    this.setState({
      element: this_element,
      dirty: true,
    }, () => {
      this.updateElement();
    })
  }
  handleDropdownDataOptions(e) {
    const this_element = this.state.element;
    this_element.customOptions.dataOptions = e.target.value;

    this.setState({
      element: this_element,
      dirty: true,
    }, () => {
      this.updateElement();
    });
  }
  handledropDownOptions(dropdown, optionText, fileName, uploaded, download) {
    const this_element = this.state.element;
    this_element.dropDownOptions = [];
    this_element.customOptions.optionsText = optionText;
    this_element.customOptions.fileUploaded = fileName;
    this_element.customOptions.uploaded = uploaded;
    this_element.customOptions.download = download;
    for (let i = 0; i < dropdown.length; i++) {
      this_element.dropDownOptions.push({ value: dropdown[i].value, label: dropdown[i].label, key: ID.uuid() });
    }
    this.setState({
      element: this_element,
      dirty: true,
    });
  }
  addTilesOptions(index) {
    const this_element = this.state.element;
    if (this_element.customOptions
      && this_element.customOptions.tileProperties.length >= 4) {
      return;
    }
    const compId = this_element.customOptions.tileProperties.length + 1;
    this_element.customOptions.tileProperties.splice(compId, 0, {
      ID: `Tile ID- COMPONENT00${compId}`,
      key: `Tile ID- COMPONENT00${compId}`,
      title: "",
      text: "",
      rule: "",
      tilesType: "",
      component: "",
      tilesColor: "",
      action: ""
    });

    this_element.customOptions.columns = this_element.customOptions.columns + 1;
    this.props.updateElement.call(this.props.preview, this_element);
  }

  removeTilesOptions(index) {
    const this_element = this.state.element;
    this_element.customOptions.tileProperties.splice(index, 1);
    this_element.customOptions.columns = this_element.customOptions.columns - 1;
    this.props.updateElement.call(this.props.preview, this_element);
  }
  addTableOptions() {
    const this_element = this.state.element;
    const compId = this_element.customOptions.headerList.length + 1;
    this_element.customOptions.headerList.splice(compId, 0, {
      label: '',
      headerId: `headerId00${compId}`,
      required: false,
      type: ''
    });

    this_element.customOptions.columns = this_element.customOptions.columns + 1;
    this.props.updateElement.call(this.props.preview, this_element);
  }

  removeTableOptions(index) {
    const this_element = this.state.element;
    this_element.customOptions.headerList.splice(index, 1);
    this_element.customOptions.columns = this_element.customOptions.columns - 1;
    this.props.updateElement.call(this.props.preview, this_element);
  }
  updateElement() {
    const this_element = this.state.element;
    // to prevent ajax calls with no change
    if (this.state.dirty) {
      this.props.updateElement.call(this.props.preview, this_element);
      this.setState({ dirty: false });
    }
  }

  convertFromHTML(content) {
    const newContent = convertFromHTML(content);
    if (!newContent.contentBlocks || !newContent.contentBlocks.length) {
      // to prevent crash when no contents in editor
      return EditorState.createEmpty();
    }
    const contentState = ContentState.createFromBlockArray(newContent);
    return EditorState.createWithContent(contentState);
  }

  addOptions() {
    const optionsApiUrl = document.getElementById('optionsApiUrl').value;
    if (optionsApiUrl) {
      get(optionsApiUrl).then(data => {
        this.props.element.options = [];
        let options = null;

        if (this.props.element.element.toLowerCase('singlechoice')) {
          options = this.props.element.singleChoiceOptions;
          data.forEach(x => {
            options.push(x);
          });
          this_element.singleChoiceOptions = options;
        } else if (this.props.element.element.toLowerCase('dropdown')) {
          options = this.props.element.dropDownOptions;
          data.forEach(x => {
            options.push(x);
          });
          this_element.singleChoiceOptions = options;
        }

        this.setState({
          element: this_element,
          dirty: true,
        });
      });
    }
  }

  changeFieldVarient = (e) => {
    const this_element = this.state.element;
    if (this.props.globalStyles.formDefault) {
      this.props.updateGlobalStyleOptions("globalFieldVariant", e.target.value);
      this.setState({
        element: this_element,
        dirty: true,
      }, () => {
        this.updateElement();
      });
    } else {
      const this_element = this.state.element;
      this_element.fieldVariant = e.target.value;

      this.setState({
        element: this_element,
        dirty: true,
      }, () => {
        this.updateElement();
      });
    }
  }

  changeFieldVarient = (e) => {
    const this_element = this.state.element;
    if (this.props.globalStyles.formDefault) {
      this.props.updateGlobalStyleOptions("globalFieldVariant", e.target.value);
      this.setState({
        element: this_element,
        dirty: true,
      }, () => {
        this.updateElement();
      });
    } else {
      const this_element = this.state.element;
      this_element.fieldVariant = e.target.value;

      this.setState({
        element: this_element,
        dirty: true,
      }, () => {
        this.updateElement();
      });
    }
  }

  changeInputFieldSize = (e) => {
    const this_element = this.state.element;
    this_element.inputFieldSize = e.target.value;

    this.setState({
      element: this_element,
      dirty: true,
    }, () => {
      this.updateElement();
    });
  }

  changeButtonType = (e) => {
    const this_element = this.state.element;
    this_element.buttonType = e.target.value;

    this.setState({
      element: this_element,
      dirty: true,
    }, () => {
      this.updateElement();
    })
  }

  changeTextAlginment = (e) => {
    const this_element = this.state.element;
    this_element.textAlignment = e.target.value;

    this.setState({
      element: this_element,
      dirty: true,
    }, () => {
      this.updateElement();
    });
  }


  updateFormDefault = (value) => {
    this.props.updateFormDefault(this.state.element);
  }

  textAreaHandleChange = e => {
    const text = e.target.value.trim();
    const optionsData = text.split('\n');
    const this_element = this.state.element;
    this_element.dropDownOptions = [];
    this_element.customOptions.optionsText = text;
    for (let i = 0; i < optionsData.length; i++) {
      this_element.dropDownOptions.push({ value: optionsData[i], label: optionsData[i], key: ID.uuid() });
    }
    if (text === "" || text === undefined || text === null) {
      //on empty dropdown list emtying the dependent components
      this_element.hasDependentComponents = false;
      this_element.dependentComponents = [];
    }
    this.setState({
      element: this_element,
      dirty: true,
    });
  };

  showTextEmptyOption = e => {
    const this_element = this.state.element;
    this_element.customOptions.showEmptyTextOption = e.target.checked;
    this.setState({
      element: this_element,
      dirty: true,
    });
  }

  setEmptyText(elemProperty, e) {
    const this_element = this.state.element;
    this_element.customOptions[elemProperty] = e.target.value;

    this.setState({
      element: this_element,
      dirty: true,
    });
  }

  setDefaultOptions(elemProperty, e) {
    const this_element = this.state.element;
    this_element.customOptions[elemProperty] = e.target.value;
    this.setState({
      element: this_element,
      dirty: true,
    });
  }

  setDisplayOptions(elemProperty, e) {
    const this_element = this.state.element;
    this_element.customOptions[elemProperty] = e.target.value;
    this.setState({
      element: this_element,
      dirty: true,
    })
  }

  setActionClick(elemProperty, e) {
    const this_element = this.state.element;
    this_element.customOptions[elemProperty] = e.target.value;
    this.setState({
      element: this_element,
      dirty: true,
    })
  }

  setScreenSelect(elemProperty, e) {
    const this_element = this.state.element;
    this_element.customOptions[elemProperty] = e.target.value;
    this.setState({
      element: this_element,
      dirty: true,
    })
  }

  setInputMaskedValue = (e) => {
    const this_element = this.state.element;
    this_element.customOptions.maskedValue = e.target.value;
    this.setState({
      element: this_element,
      dirty: true,
    });
  };

  setValidationOptions(e) {
    const this_element = this.state.element;
    this_element.customOptions.validation = e.target.value;
    if (this_element.customOptions.validation === 'Email' || this_element.customOptions.validation === 'Currency' || this_element.customOptions.validation === 'URL' ) {
      this.state.element.customOptions.charLimit = "";
      // this.state.characterLimit = ""; 
    }
    // else {
    //   this.state.element.customOptions.charLimit = this.state.characterLimit;
    // }
    this.setState({
      element: this_element,
      dirty: true,
    });
  }

  changeCameraOptions = (elementProperty, e) => {
    const this_element = this.state.element;
    if (elementProperty === "videoLink") {
      const urlRegex = /(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;amp;:\/~+#-]*[\w@?^=%&amp;amp;\/~+#-])?/
      if (e.target.value.match(urlRegex)) {
        this_element.customOptions[elementProperty] = e.target.value;
        this.state.videoLinkDisable = false;
        this_element.customOptions.required = false;
        this_element.customOptions.error = false;
      } else {
        this.state.videoLinkDisable = true;
        this_element.customOptions.required = true;
        this_element.customOptions.error = true;
      }
    } else {
      this_element.customOptions[elementProperty] = e.target.value;
    }
    this.setState({
      element: this_element,
      dirty: true,
    });
  }

  setPhotoCustomOptions = (elementProperty, e) => {
    const this_element = this.state.element;
    this_element.customOptions[elementProperty] = e.target.checked;
    this.setState({
      element: this_element,
      dirty: true,
    });
  }

  setCutomeTime = (timeValue, elemProp, e) => {
    const this_element = this.state.element;
    this_element.customOptions[elemProp] = timeValue;
    this_element.customOptions.cutomTime = null;
    this.setState({
      element: this_element,
      dirty: true,
    });
  }

  setOtherOptionText(elemProperty, e) {
    const this_element = this.state.element;
    this_element.customOptions[elemProperty] = e.target.value;
    const text = e.target.value;
    const val = e.target.value.toLowerCase().split(' ').join('_');
    this_element.checkListOptions[this_element.checkListOptions.length - 1].value = val;
    this_element.checkListOptions[this_element.checkListOptions.length - 1].label = text;
    this_element.checkListOptions[this_element.checkListOptions.length - 1].key = ID.uuid();

    this.setState({
      element: this_element,
      dirty: true,
    });
  }

  setPreviousValues() {
    const this_element = this.state.elementValues;
    this_element.dirty = false;
    // to prevent ajax calls with no change
    this.props.updateElement.call(this.props.preview, this_element);
    this.props.closeEdit();
  }

  handleDropdownOptionChange(index, ids) {
    const this_element = this.state.element;
    this_element.dependentComponents[index].parentId = ids;
    this.setState({
      element: this_element,
      dirty: true,
    });
  }

  handleAddSectionComponent(index, iIndex, element) {
    const this_element = this.state.element;
    this_element.dependentComponents[index].form[iIndex] = element;
    this.setState({
      element: this_element,
      dirty: true,
    });
  }

  addMoreOption(index) {
    const this_element = this.state.element;
    this_element.dependentComponents.push({parentId: [], form: [{label: "",key: ""}]});
    this.setState({
      element: this_element,
      dirty: true
    });
  }

  removeOption(index) {
    const this_element = this.state.element;
    this_element.dependentComponents.splice(index, 1);
    this.setState({
      element: this_element,
      dirty: true
    });
  }

  addSectionComponentItem(index, iIndex) {
    const this_element = this.state.element;
    this_element.dependentComponents[index].form.push({label: "",key: ""});
    this.setState({
      element: this_element,
      dirty: true
    });
  }

  removeSectionComponentItem (index, iIndex) {
    const this_element = this.state.element;
    this_element.dependentComponents[index].form.splice(iIndex, 1);
    this.setState({
      element: this_element,
      dirty: true
    });
  }

  handleDefaultLocationChange (index, iIndex) {
    const this_element = this.state.element;
    this_element.dependentComponents[index].form.splice(iIndex, 1);
    this.setState({
      element: this_element,
      dirty: true
    });
  }

  componentDidUpdate(prevProps) {
    if(prevProps.element !== this.props.element) {
      this.setState({element: this.props.element});
    }
  }
  render() {
    if (this.state.dirty) {
      this.props.element.dirty = true;
    }
    const elementKey = this.props.element.element;
    const isformDefault = this.props.globalStyles.formDefault;
    const this_show_empty_text = this.props.element.customOptions.hasOwnProperty('showEmptyTextOption') ? this.props.element.customOptions.showEmptyTextOption : false;
    const this_char_limit = this.props.element.hasOwnProperty('isCharLimit') ? this.props.element.isCharLimit : false;
    const charLimit = this.props.element.customOptions.charLimit;
    const validation = this.props.element.customOptions.validation;
    const sectionHeaderBGColor = this.props.element.customOptions.sectionHeaderBGColor;
    // const this_mask = this.props.element.customOptions.hasOwnProperty('isMasked') ? this.props.element.customOptions.isMasked : false;
    const c_code = this.props.element.customOptions.hasOwnProperty('countryCode') ? this.props.element.customOptions.countryCode : false;
    const this_required = this.props.element.customOptions.hasOwnProperty('required') ? this.props.element.customOptions.required : false;
    const disable_time = this.props.element.customOptions.hasOwnProperty('disableTime') ? this.props.element.customOptions.disableTime : false;
    const this_checked = this.props.element.customOptions.hasOwnProperty('checked') ? this.props.element.customOptions.checked : false;
    const checkList = this.props.element.customOptions.hasOwnProperty('isOtherOption') ? this.props.element.customOptions.isOtherOption : false;
    const readOnly = this.props.element.customOptions.hasOwnProperty('readOnly') ? this.props.element.customOptions.readOnly : false;
    const disablePastDates = this.props.element.customOptions.hasOwnProperty('disablePastDates') ? this.props.element.customOptions.disablePastDates : false;
    const data_table = this.props.element.customOptions.hasOwnProperty('dataTable') ? this.props.element.customOptions.dataTable : false;
    const this_filtered = this.props.element.customOptions.hasOwnProperty('filtered') ? this.props.element.customOptions.filtered : false;
    const this_editable = this.props.element.customOptions.hasOwnProperty('editable') ? this.props.element.customOptions.editable : false;
    const setupApproval = this.props.element.customOptions.hasOwnProperty("setupApproval") ? this.props.element.customOptions.setupApproval : false;
    const approvalMechanism = this.props.element.customOptions.hasOwnProperty("approvalMechanism") ? this.props.element.customOptions.approvalMechanism : false;
    const approvalInternalScreen = this.props.element.customOptions.hasOwnProperty("approvalInternalScreen") ? this.props.element.customOptions.approvalInternalScreen : false;
    const this_checked_center = this.props.element.hasOwnProperty('center') ? this.props.element.center : false;
    const check_List = this.props.element.customOptions.hasOwnProperty('isSingleChoiseOption') ? this.props.element.customOptions.isSingleChoiseOption : false;
    const is_field_disabled = this.props.element.customOptions.hasOwnProperty('isFieldDisabled') ? this.props.element.customOptions.isFieldDisabled : false;
    const default_value = this.props.element.customOptions.hasOwnProperty('defaultValue') ? this.props.element.customOptions.defaultValue : "";
    const dropdown_options = this.props.element.customOptions.hasOwnProperty('dropDownOptions') ? this.props.element.customOptions.dropDownOptions : [];
    const {
      canHaveOptionCorrect, canHaveOptionValue, hasDependentComponents
    } = this.props.element;
    const this_files = this.props.files.length ? this.props.files : [];
    if (this_files.length < 1 || (this_files.length > 0 && this_files[0].id !== '')) {
      this_files.unshift({ id: '', file_name: '' });
    }
    let editorState;
    if (this.props.element.hasOwnProperty('content')) {
      editorState = this.convertFromHTML(this.props.element.content);
    }
    if (this.props.element.hasOwnProperty('label')) {
      editorState = this.convertFromHTML(this.props.element.label);
    }
    let headerList = (this.state.element.hasOwnProperty('headerList')) ? this.state.element.headerList : [{ headerId: 0, label: "Header Item" }];
    let rowCount = (this.state.element.hasOwnProperty('rows')) ? this.state.element.rows.length : 1;
    const isMaterialTable = elementKey.toLowerCase().includes("table");
    const isMaterialNumber = elementKey.toLowerCase().includes("number");
    const fieldVariant = !this.props.element.hasOwnProperty("fieldVariant") ? this.props.globalStyles.globalFieldVariant : this.props.element.fieldVariant;
    const inputFieldSize = this.props.element.inputFieldSize;
    const buttonType = this.props.element.buttonType;
    const textAlignment = this.props.element.textAlignment;
    const commonStyleOptions = (elementKey.toLowerCase() == "text" || elementKey.toLowerCase() == "email" || elementKey.toLowerCase() == "number" || elementKey.toLowerCase() == "phone" || elementKey.toLowerCase() == "input_table" || elementKey.toLowerCase() == 'date_picker' || elementKey.toLowerCase() == 'configurable_list') ? true : false;
    const commonStyleFieldOptions = (elementKey.toLowerCase() == "email" || elementKey.toLowerCase() == "number" || elementKey.toLowerCase() == 'dropdown' || elementKey.toLowerCase() == 'short_text' || elementKey.toLowerCase() == 'long_text' || elementKey.toLowerCase() == 'date_picker' || elementKey.toLowerCase() == 'section_header' || elementKey.toLowerCase() == 'Location_Coordinates') ? true : false;
    const { classes } = this.props;
    const toolbarProps = {
      items: [
        'Short_Text',
        'Long_Text',
        'Button',
        'Number',
        'Dropdown',
      'Mapping_Dropdown',
        'Email',
        'Date_Picker',
        'Time'
      ]
    };
    const isDisabled = this.state.element.customOptions.isFieldDisabled;
    const isdefaultValue = this.state.element.customOptions.defaultValue;
    
    return (
      <ThemeProvider theme={theme}>
        <div>
          <Grid container>

            {/* ELEMENT NAME */}
            { this.props.fromMainView ?
            <Grid item xs={12} sm={8}>
              <ArrowBackIcon onClick={() => { this.setPreviousValues() }} style={{ cursor: "pointer", color: "#bbb" }} />
              {/* <Typography variant='h5' component='h5'>{elementKey.split("_").join(" ")}</Typography> */}
            </Grid>: null }

            {/* COMPONENT TYPE OPTION */}
            { this.props.fromMainView ?
            <Grid item xs={12} className='my-3'>
              <TextField
                disabled
                fullWidth
                //size="small"
                variant="outlined"
                id="outlined-basic"
                label="Component Type"
                value={this.state.element.customOptions.componentType}
                inputProps={{ type: "text" }}
              />
            </Grid>: null }
            {/* VIDEO MANDATORY FIELD */}
            {/* {this.props.element.element == "Video" && this.props.element.customOptions.isVideoLink? 
            this.props.element.customOptions.required = false : this.props.element.customOptions.required = true
            } */}

            {/* ELEMENT NAME EDIT OPTION */}
            {
              elementKey !== "Tiles" &&
              (
                <Grid item xs={12} className='mt-3'>
                  <ThemeProvider theme={characterLimitHelperTheme}>
                    <TextField
                      required
                      //size="small"
                      variant="outlined"
                      id="outlined-basic"
                      label="Display Label"
                      value={this.state.element.label.split("_").join(" ")}
                      inputProps={{
                        type: 'text',
                        //maxlength: 24
                      }}
                      fullWidth
                      onChange={this.onLabelChange.bind(this, 'label')}
                    // helperText={this.state.element.label.length > 24 ? <><Grid container justifyContent="space-between"><Grid item><p>Label name must not exceed 24 characters</p></Grid><Grid item><p>{this.state.element.label.length}/24</p></Grid></Grid></> : <p>{this.state.element.label.length}/24</p>}
                    // error={this.state.element.label.length > 24 ? true : false}
                    />
                  </ThemeProvider>
                </Grid>
              )
            }

            {/*TILES*/}
            {
              elementKey === "Tiles" &&
              <TilesOptions
                updateElement={this.props.updateElement}
                preview={this.props.preview}
                element={this.props.element}
                addTilesOptions={this.addTilesOptions}
                removeTilesOptions={this.removeTilesOptions}
                key={this.props.element.customOptions.tileProperties.length}
                inputFieldSize={this.props.element.inputFieldSize}
                customOptions={this.state.element.customOptions}
                handleTilesOptions={this.handleTilesOptions} />
            }
            {
              elementKey !== "Tiles" &&
              <Grid item xs={12} > </Grid>
            }
            {/* COMMENTED BELOW CODE FOR NOW. IF REQURIED WE CAN ENABLE IT LATER. */}
            {/* {
              (commonStyleFieldOptions) &&
              <Grid item xs={12} >
                <FormControl component="fieldset">
                  <Grid container justifyContent="flex-start" >
                    <Grid item className="mr-2">
                      <h6 className={classes.text}>Input Field Size:</h6>
                    </Grid>
                    <Grid item>
                      <RadioGroup row aria-label="material" name="material" value={inputFieldSize} onChange={this.changeInputFieldSize.bind(this)}>
                        <FormControlLabel value="small" className={inputFieldSize === "small" ? classes.checked : classes.unchecked} control={<Radio color="primary" icon={<CircleUnchecked />} checkedIcon={<CircleCheckedFilled />} />} label="Small" labelPlacement='start' />
                        <FormControlLabel value="medium" className={inputFieldSize === "medium" ? classes.checked : classes.unchecked} control={<Radio color="primary" icon={<CircleUnchecked />} checkedIcon={<CircleCheckedFilled />} />} label="Medium" labelPlacement='start' />
                        <FormControlLabel value="large" className={inputFieldSize === "large" ? classes.checked : classes.unchecked} control={<Radio color="primary" icon={<CircleUnchecked />} checkedIcon={<CircleCheckedFilled />} />} label="Large" labelPlacement='start' />
                      </RadioGroup>
                    </Grid>
                  </Grid>
                </FormControl>
              </Grid>
            } */}
            {
              (elementKey.toLowerCase() == "header") &&
              <Grid item xs={12} sm={12} >
                <FormControl component="fieldset">
                  <FormLabel component="legend">Input Field Alignment:</FormLabel>
                  <RadioGroup row aria-label="material" name="material" value={textAlignment} onChange={this.changeTextAlginment.bind(this)}>
                    <FormControlLabel value="left" control={<Radio color="primary" />} label="Left" />
                    <FormControlLabel value="center" control={<Radio color="primary" />} label="Center" />
                    <FormControlLabel value="right" control={<Radio color="primary" />} label="Right" />
                  </RadioGroup>
                </FormControl>
              </Grid>
            }
            {/* DEFAULT STYLE OPTIONS */}
            {/* {
            commonStyleOptions &&
            <>
              <Grid item sm={4}>
                <FormControlLabel
                  control={<Checkbox checked={isformDefault} onChange={this.updateFormDefault.bind(this)} name="form_default_style" color="primary" />}
                  label="Set as form default"
                />
              </Grid>
              <Grid item sm={8} >
                <ThemeProvider theme={theme}>
                  <FormControl component="fieldset">
                    <FormLabel component="legend">Input field style:</FormLabel>
                    <RadioGroup row aria-label="material" name="material" value={fieldVariant} onChange={this.changeFieldVarient.bind(this)}>
                      <FormControlLabel value="outlined" control={<Radio color="primary" />} label="Outlined" />
                      <FormControlLabel value="filled" control={<Radio color="primary" />} label="Filled" />
                      <FormControlLabel value="standard" control={<Radio color="primary" />} label="Standard" />
                    </RadioGroup>
                  </FormControl>
                </ThemeProvider>
              </Grid>
              <Grid style={{ paddingTop: '0px' }} item xs={12} sm={12} className="element-options-border-grid">
                <FormLabel style={{ color: 'rgba(0, 0, 0, 0.54);', fontSize: '0.75rem' }}>Input Field Style changes Text input box variant</FormLabel>
                <FormLabel style={{ color: 'rgba(0, 0, 0, 0.54);', fontSize: '0.75rem' }}>If Form Default is Checked, Selected Input Field Style is applied to the textfield elements which is in the Dropzone</FormLabel>
              </Grid>
            </>
          } */}

            {// NUMBER OPTIONS
              isMaterialNumber &&
              <NumberInputOptions element={this.props.element} setNumberLimit={this.setNumberLimit} />
            }

            { // MANDATORY FIELD PROPERTY 
              elementKey != "Section_Header" && elementKey != "Page_Break" && elementKey != "Input_Table" && elementKey != "Button" && elementKey != "Attachment" &&
              elementKey !== "Tiles" && elementKey !== "Configurable_List" &&
              <Grid item xs={12} className='mt-3' >
                <div justifyContent="space-around" alignItems="center">
                  <h6 className={classes.text1} >Mandatory Field: </h6>
                  {/* {elementKey == "Video" && this.props.element.customOptions.isVideoLink && this.props.element.customOptions.isVideoLink != ""? 
            this.props.element.customOptions.required = false : this.props.element.customOptions.required = true
            } */}
                  <FormControlLabel
                    name="is_required"
                    // style={{ position: "relative", top: "3px" }}
                    control={
                      <>
                        <Button
                          variant="outlined"
                          size="small"
                          name="No"
                          //className={this_required ? "checkedboxFill" : "primary"}
                          color={this_required ? "default" : "primary"}
                          //style={{ outline: "none", textTransform: "capitalize" }}
                          className={`ml-4 mr-2 ${classes.btnStyle}`}
                          onClick={this.editElementCustomOptionsProp.bind(this, "required", false)}
                        >
                          <span>No</span>
                          <Checkbox
                            className="p-0 ml-1"
                            color="primary"
                            name="No"
                            icon={<CircleUnchecked className="checkboxSize" />}
                            checked={!this_required}
                            checkedIcon={<CircleCheckedFilled className="checkboxSize" />}
                          />
                        </Button>
                        <Button
                          variant="outlined"
                          size="small"
                          //style={{ outline: "none" }}
                          name="Yes"
                          //className={this_required ? "checkedboxFill" : "primary"}
                          color={this_required ? "primary" : "default"}
                          //name="is_required"
                          //className='ml-2 mr-2'
                          className={`ml-2 mr-2 ${classes.btnStyle}`}
                          onClick={this.editElementCustomOptionsProp.bind(this, "required", true)}
                        >
                          <span>Yes</span>
                          <Checkbox
                            className="p-0 ml-1"
                            color="primary"
                            // name="YES"
                            name="is_required"
                            icon={<CircleUnchecked className="checkboxSize" />}
                            checked={this_required}
                            checkedIcon={<CircleCheckedFilled className="checkboxSize" />}
                          />
                        </Button>
                      </>
                    }
                  />
                </div>
              </Grid>
            }

            { // MANDATORY FIELD PROPERTY 
              (elementKey === "Short_Text" || elementKey === "Long_Text") &&
              <Grid item xs={12} className='mt-3' >
                <div justifyContent="space-around" alignItems="center">
                    <TextField
                      //size="small"
                      type="text"
                      label="Default value"
                      variant="outlined"
                      fullWidth
                      defaultValue={default_value}
                      onChange={this.setDefaultValue.bind(this, "defaultValue")}
                    />
                </div>
                </Grid>}
                {
              (elementKey === "Number" && <Grid item xs={12} className='mt-3' >
                <div justifyContent="space-around" alignItems="center">
                  <TextField
                    //size="small"
                    type="number"
                    label="Default value"
                    variant="outlined"
                    fullWidth
                    defaultValue={default_value}
                    onChange={this.setDefaultValue.bind(this, "defaultValue")}
                  />
                </div>
              </Grid>)
            }
            {
                (elementKey === "Short_Text" || elementKey === "Long_Text" || elementKey === "Number" || elementKey === "Attachment" || elementKey === "Video" || elementKey === "Location_Coordinates") &&
                  <div className="mt-3" justifyContent="space-around" alignItems="center">
                  {isdefaultValue && <h6 className={classes.text1} >Disable Field: </h6>}
                  {isdefaultValue && <FormControlLabel
                    name="is_field_disabled"
                    control={
                      <>
                        <Button
                          variant="outlined"
                          disabled={this.props.element.customOptions.defaultValue === ""}
                          size="small"
                          name="No"
                          color={is_field_disabled ? "default" : "primary"}
                          className={`ml-4 mr-2 ${classes.btnStyle}`}
                          onClick={this.editElementCustomOptionsProp.bind(this, "isFieldDisabled", false)}
                        >
                          <span>No</span>
                          <Checkbox
                            className="p-0 ml-1"
                            color="primary"
                            name="No"
                            icon={<CircleUnchecked className="checkboxSize" />}
                            checked={!is_field_disabled}
                            checkedIcon={<CircleCheckedFilled className="checkboxSize" />}
                          />
                        </Button>
                        <Button
                          variant="outlined"
                          size="small"
                          disabled={this.props.element.customOptions.defaultValue === ""}
                          name="Yes"
                          color={is_field_disabled ? "primary" : "default"}
                          className={`ml-2 mr-2 ${classes.btnStyle}`}
                          onClick={this.editElementCustomOptionsProp.bind(this, "isFieldDisabled", true)}
                        >
                          <span>Yes</span>
                          <Checkbox
                            className="p-0 ml-1"
                            color="primary"
                            name="Yes"
                            icon={<CircleUnchecked className="checkboxSize" />}
                            checked={is_field_disabled}
                            checkedIcon={<CircleCheckedFilled className="checkboxSize" />}
                          />
                        </Button>
                      </>
                    }
                  />}
                </div>
            }
            {/* {
              (elementKey === "Attachment") && 
              <Grid container justifyContent="space-between" className="mt-2 p-3" style={{ marginBottom: '2rem', border:'1px solid grey', borderRadius:'5px', backgroundColor:'gray' }} >
              <Grid container justifyContent="space-between">
              <Grid item>
              <h6 className={classes.attachmentText} style={{color:'black'}} >Default file </h6>
              </Grid>
              <Grid item>
              <Button  component="label">
              <img src="/assets/images/icons/attachment_black_24dp.svg" alt="attachment"/>
              <input 
      type="file" hidden
      name="selectedFile"
      onChange={this.handleFile}
       id="imageUpload" 
       accept={".pdf,.xls,.doc"}
       >
       </input>
    </Button>
              </Grid>
              </Grid>
              
              { (elementKey === "Attachment" &&  this.state.fileName) && 
              <Grid container justifyContent="space-between">
                <Grid item>
                <h6 style={{textAlign:'center'}}>{this.state.fileName}</h6>
                </Grid>
                <Grid item>
                  <Button style={{textAlign:'center'}} onClick={this.handleDeleteFile}><DeleteIcon/></Button>
                  </Grid>
              </Grid>}
              </Grid>
            } */}
            { elementKey === "Attachment" &&
            <Attachment
            element={this.state.element}
            fileName={this.state.element.customOptions.fileName}
            handleFile={this.handleFile}
            handleDelete = {this.handleDeleteFile}
            />
            }
            {
            (elementKey === 'Video') && 
            <Video 
              element={this.state.element}
              fileName={this.state.element.customOptions.fileName}
              handleVideoChange={this.handleVideoChange}
              handleDeleteVideo={this.handleDeleteVideo}
            />
            }

            {(elementKey === "Video" || elementKey === "Photo") &&
              <Grid container >
                <Grid item xs={12} className='mt-3' >
                  <h6 className={classes.text1} >Max Size:</h6>
                </Grid>
                <Grid item xs={12} className='mt-3'>
                  <TextField label="Size"
                    defaultValue={this.state.element.customOptions.maxSize}
                    type="number"
                    variant="outlined"
                    fullWidth
                    onChange={this.handleMaxSize}
                    inputProps={{
                      min: 1, max: this.state.element.customOptions.max
                    }}
                    InputProps={{
                      endAdornment: <InputAdornment position="end">MB</InputAdornment>,
                    }}

                  />
                </Grid>
              </Grid>
            }
            {
              elementKey === "Time" &&
              <>
                <Grid item xs={12}>
                  <ThemeProvider theme={theme}>
                    <FormControl component="fieldset">
                      <Grid item xs={12} className='mt-3' >
                        <div justifyContent="space-around" alignItems="center">
                          <h6 className={classes.text1} >Time Format: </h6>
                          <FormControlLabel
                            this_required={this_required}
                            name="is_required"
                            style={{ position: "relative", top: "3px", marginLeft: "1px" }}
                            control={
                              <>
                                <Button
                                  variant="outlined"
                                  size="small"
                                  name="NO"
                                  color={this_checked ? "default" : "primary"}
                                  style={{ outline: "none" }}
                                  className='mr-2'
                                  onChange={this.editElementCustomOptionsProp.bind(this, "checked", false)}

                                >
                                  <span>24 Hours</span>
                                  <Checkbox
                                    className="p-0 ml-1"
                                    color="primary"
                                    name="NO"
                                    icon={<CircleUnchecked className="checkboxSize" />}
                                    checked={!this_checked}
                                    checkedIcon={<CircleCheckedFilled className="checkboxSize" />}
                                  />
                                </Button>
                                <Button
                                  variant="outlined"
                                  size="small"
                                  style={{ outline: "none" }}
                                  name="YES"
                                  color={this_checked ? "primary" : "default"}
                                  //name="is_required"
                                  className='ml-2'
                                  onChange={this.editElementCustomOptionsProp.bind(this, "checked", true)}
                                >
                                  <span>AM/PM</span>
                                  <Checkbox
                                    className="p-0 ml-1"
                                    color="primary"
                                    // name="YES"
                                    name="is_required"
                                    icon={<CircleUnchecked className="checkboxSize" />}
                                    checked={this_checked}
                                    checkedIcon={<CircleCheckedFilled className="checkboxSize" />}
                                  />
                                </Button>
                              </>
                            }
                          />
                        </div>
                      </Grid>
                      {/* <RadioGroup row aria-label="material" name="material" value={textAlignment} onChange={this.changeTextAlginment.bind(this)}>
                        <FormControlLabel value="24 Hours" control={<Radio color="primary" />} label="24 Hours" />
                        <FormControlLabel value="AM/PM" control={<Radio color="primary" />} label="AM/PM" />
                      </RadioGroup> */}
                    </FormControl>
                  </ThemeProvider>
                  <ThemeProvider theme={theme}>
                    <FormControl component="fieldset" className='mt-3'>
                      <h6 className={classes.text1}>Default Time:</h6>
                      <FormControlLabel
                        this_required={this_required}
                        name="is_required"
                        style={{ position: "relative", top: "3px" }}
                        control={
                          <>
                            <Button
                              variant="outlined"
                              size="small"
                              color={this.props.element.customOptions.defaultTime === "none" ? "primary" : "default"}
                              style={{ outline: "none" }}
                              className='ml-2 mr-2'
                              onClick={this.setCutomeTime.bind(this, "none", "defaultTime")}
                            >
                              <span>None</span>
                              <Checkbox
                                className="p-0 ml-1"
                                color="primary"
                                name="NO"
                                icon={<CircleUnchecked className="checkboxSize" />}
                                checked={this.props.element.customOptions.defaultTime === "none"}
                                checkedIcon={<CircleCheckedFilled className="checkboxSize" />}
                              />
                            </Button>
                            <Button
                              variant="outlined"
                              size="small"
                              style={{ outline: "none" }}

                              color={this.props.element.customOptions.defaultTime === "current" ? "primary" : "default"}
                              name="is_required"
                              className='ml-2 mr-2'
                              onClick={this.setCutomeTime.bind(this, "current", "defaultTime")}
                            >
                              <span>Current</span>
                              <Checkbox
                                className="p-0 ml-1"
                                color="primary"
                                // name="YES"
                                name="is_required"
                                icon={<CircleUnchecked className="checkboxSize" />}
                                checked={this.props.element.customOptions.defaultTime === "current"}
                                checkedIcon={<CircleCheckedFilled className="checkboxSize" />}
                              />
                            </Button>
                            <Button
                              variant="outlined"
                              size="small"
                              style={{ outline: "none" }}

                              color={this.props.element.customOptions.defaultTime === "custom" ? "primary" : "default"}

                              className='ml-2 mr-2'
                              onClick={this.setCutomeTime.bind(this, "custom", "defaultTime")}
                            >
                              <span>Custom</span>
                              <Checkbox
                                className="p-0 ml-1"
                                color="primary"
                                // name="YES"
                                name="is_required"
                                icon={<CircleUnchecked className="checkboxSize" />}
                                checked={this.props.element.customOptions.defaultTime === "custom"}
                                checkedIcon={<CircleCheckedFilled className="checkboxSize" />}
                              />
                            </Button>
                          </>
                        }
                      />
                      {/* <RadioGroup row aria-label="material" name="material" value={textAlignment} onChange={this.changeTextAlginment.bind(this)}>
                        <FormControlLabel value="None" control={<Radio color="primary" />} label="None" />
                        <FormControlLabel value="Current" control={<Radio color="primary" />} label="Current" />
                        <FormControlLabel value="Custome" control={<Radio color="primary" />} label="Custome" />

                      </RadioGroup> */}
                    </FormControl>
                    {this.props.element.customOptions.defaultTime === "custom" && <Grid container className="mt-3" >
                      < MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <TimePicker
                          label="Time"
                          views={["hours", "minutes"]}
                          value={this.state.selectedTime}
                          onChange={this.handleTimeChange}
                          // error={this.state.selectedTime === null ? true : false }
                          // value={propsData.customOptions.defaultTime === "none" ? "" : selectedDate}
                          ampm={this.props.element.customOptions.checked ? true : false}
                          inputVariant="outlined"
                          fullWidth
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton>
                                  <AccessTimeSharp />
                                </IconButton>
                              </InputAdornment>
                            )
                          }}
                        />
                      </MuiPickersUtilsProvider>
                    </Grid>}

                  </ThemeProvider>
                  <Grid item xs={12} className='mt-4' >
                    <div justifyContent="space-around" alignItems="center">
                      <h6 className={classes.text1} >Disable Past Time: </h6>
                      <FormControlLabel
                        name="disablePastTime"
                        style={{ position: "relative", top: "3px" }}
                        control={
                          <>
                            <Button
                              variant="outlined"
                              size="small"
                              name="NO"
                              color={disable_time ? "default" : "primary"}
                              style={{ outline: "none" }}
                              className='ml-4 mr-2'
                              onClick={this.editElementCustomOptionsProp.bind(this, "disableTime", false)}
                            >
                              <span>No</span>
                              <Checkbox
                                className="p-0 ml-1"
                                color="primary"
                                name="NO"
                                icon={<CircleUnchecked className="checkboxSize" />}
                                checked={!disable_time}
                                checkedIcon={<CircleCheckedFilled className="checkboxSize" />}
                              />
                            </Button>
                            <Button
                              variant="outlined"
                              size="small"
                              style={{ outline: "none" }}
                              name="YES"
                              color={disable_time ? "primary" : "default"}
                              //name="is_required"
                              className='ml-2 mr-2'
                              onClick={this.editElementCustomOptionsProp.bind(this, "disableTime", true)}
                            >
                              <span>Yes</span>
                              <Checkbox
                                className="p-0 ml-1"
                                color="primary"
                                // name="YES"
                                name="is_required"
                                icon={<CircleUnchecked className="checkboxSize" />}
                                checked={disable_time}
                                checkedIcon={<CircleCheckedFilled className="checkboxSize" />}
                              />
                            </Button>
                          </>
                        }
                      />
                    </div>
                  </Grid>
                </Grid>
              </>
            }
            {//LOCATION MAP
              elementKey == "Location_Coordinates" &&
              <>
                <Grid item xs={12} className="mt-3">
                  <LocationMapOption
                    element={this.props.element}
                    setDisplayMapOptions={this.setDefaultOptions}
                    editElementCustomOptionsProp={this.editElementCustomOptionsProp.bind(this)}
                  />
                  <h6 className={classes.text1} >Default location: </h6>
                  <Grid className="mt-3" style={{position: "relative"}}>
                    <LocationCoordinates isMapEditable={true} fromDisablePointView={true} data={this.props.element} handleLocationChange={this.setDefaultValue.bind(this, "defaultValue")} />
                  </Grid>
                </Grid>

                <Grid item xs={12} className="mt-3">
                  <TextField
                    required
                    //size="small"
                    variant="outlined"
                    id="outlined-basic"
                    label="Display text address Label"
                    value={this.state.element.customOptions.addressLabel}
                    onChange={(event) => this.setDisplayOptions("addressLabel", event)}
                    inputProps={{ type: 'text' }}
                    fullWidth
                    helperText={!this.state.element.customOptions.addressLabel && "Required"}
                  />
                </Grid>

                <Grid item xs={12} className="mt-3">
                  {/* <div> */}
                  {/* <h6 style={{ display: "inline" }}  >Editable: </h6> */}
                  {/* <h6 className={classes.text1} >Editable: </h6> */}
                  {/* <FormControlLabel
                    control={
                      <Switch checked={this_editable}
                        color="primary"
                        onChange={this.editElementCustomOptionsProp.bind(this, "editable", "checked")}
                        name="editable"
                      />
                    }
                  /> */}
                  {/* <FormControlLabel
                      this_checked={this_checked}
                      name="is_required"
                      style={{ position: "relative", top: "3px" }}
                      control={
                        <>
                          <Button
                            variant="outlined"
                            size="small"
                            name="NO"
                            color={this_checked ? "default" : "primary"}
                            style={{ outline: "none" }}
                            className={`ml-4 mr-2 ${classes.btnStyle}`}
                            onClick={this.editElementCustomOptionsProp.bind(this, "checked", false)}
                          >
                            <span>No</span>
                            <Checkbox
                              className="p-0 ml-1"
                              color="primary"
                              name="NO"
                              icon={<CircleUnchecked className="checkboxSize" />}
                              checked={!this_checked}
                              checkedIcon={<CircleCheckedFilled className="checkboxSize" />}
                            />
                          </Button>
                          <Button
                            variant="outlined"
                            size="small"
                            style={{ outline: "none" }}
                            name="YES"
                            color={this_checked ? "primary" : "default"}
                            //name="is_required"
                            className={`ml-2 mr-2 ${classes.btnStyle}`}
                            onClick={this.editElementCustomOptionsProp.bind(this, "checked", true)}
                          >
                            <span>Yes</span>
                            <Checkbox
                              className="p-0 ml-1"
                              color="primary"
                              // name="YES"
                              name="is_required"
                              icon={<CircleUnchecked className="checkboxSize" />}
                              checked={this_checked}
                              checkedIcon={<CircleCheckedFilled className="checkboxSize" />}
                            />
                          </Button> */}
                  {/* </> */}
                  {/* }
                    />
                  </div> */}
                </Grid>

              </>
            }

            {
              elementKey.toLowerCase() === 'long_text' &&
              <LongTextOptions
                element={this.state.element}
                setNumberLimit={this.setNumberLimit}
                setValidationType={this.setValidationType}
                editElementCustomOptionsProp={this.editElementCustomOptionsProp.bind(this)} />
            }

            {
              elementKey.toLowerCase() === 'photo_prepost' &&
              <PhotoPrePostOptions
                element={this.state.element}
                editElementCustomOptionsProp={this.editElementCustomOptionsProp.bind(this)} />
            }

            { // ATTACHMENTS
              elementKey == "Attachment" &&
              <Grid item xs={12} className='mt-3 mb-2' >
                  <h6 className={classes.attachmentText} >Attachment Type </h6>
                  <Grid container justifyContent="space-between">
                    {this.state.Attachments.map((x) => {
                      return (
                        <Grid item xs={12} sm={6} className='mt-3'>
                          <FormControlLabel
                          label={x.name}
                            className={this.state.element.customOptions.Attachment && this.state.element.customOptions.Attachment?.length > 2 ? classes.attachmentEnabled : this.state.element.customOptions.Attachment?.includes(`${x.name}`) ? classes.attachmentEnabled : classes.attachment}
                          control={
                            <Checkbox
                              onChange={this.handleAttachments}
                              // checked={ this.state.element.customOptions.Attachment.includes(`${x.name}`) }
                              style={{ display: "none" }}
                              value={x.name} name={x.name} color="primary" />
                          }
                        />
                      </Grid>
                    )
                  })}
                </Grid>
                
                  
              </Grid>
            }

            {// PHONE OPTIONS
              (elementKey == "Phone") &&
              <Grid item xs={12} >
                <PhoneElementOptions
                  // this_mask={this_mask} 
                  c_code={c_code} editElementCustomOptionsProp={this.editElementCustomOptionsProp.bind(this)} />
              </Grid>
            }

            { // SINGLE CHOICE OPTIONS
              this.props.element.hasOwnProperty('singleChoiceOptions') && this.props.element.singleChoiceOptions.length > 0 && elementKey === "Single_Choice" &&
              <>
                {/* <Grid item xs={12} className="element-options-border-grid">
                <FormControlLabel
                  control={<Checkbox checked={this.state.element.customOptions.isSpreadToColumn} onChange={this.editElementCustomOptionsProp.bind(this, 'isSpreadToColumn', 'checked')}name="spread_options" color="primary" />}
                  label="Spread options to columns"
                />
              </Grid> */}

                <SingleChoiceOptions showCorrectColumn={this.props.showCorrectColumn}
                  canHaveOptionCorrect={canHaveOptionCorrect}
                  canHaveOptionValue={canHaveOptionValue}
                  data={this.props.preview.state.data}
                  updateElement={this.props.updateElement}
                  preview={this.props.preview}
                  element={this.props.element}
                  key={this.props.element.singleChoiceOptions.length} />

                {/* <Grid item xs={12} >
                <FormControlLabel
                  control={<Checkbox checked={this.props.element.customOptions.isOtherOption} onChange={this.toggleOtherOption.bind(this, 'isOtherOption', 'checked')} name="other-option" color="primary" />}
                  label="Display Other option"
                />
              </Grid> */}
                <Grid item xs={12} className='mt-3' >
                  <div justifyContent="space-around" alignItems="center">
                    <h6 className={classes.text1} >Display Other option </h6>
                    <FormControlLabel
                      style={{ marginTop: "3px" }}
                      control={
                        <>
                          <Button
                            variant="outlined"
                            size="small"
                            name="NO"
                            color={check_List ? "default" : "primary"}

                            className={`${classes.btnStyle} ml-4 mr-2`}
                            onClick={this.toggleOtherOption.bind(this, "isSingleChoiseOption", false)}
                          >
                            <span>No</span>
                            <Checkbox
                              className="p-0 ml-1"
                              color="primary"
                              name="NO"
                              icon={<CircleUnchecked className="checkboxSize" />}
                              checked={!check_List}
                              checkedIcon={<CircleCheckedFilled className="checkboxSize" />}
                            />
                          </Button>
                          <Button
                            variant="outlined"
                            size="small"
                            //style={{ position: "relative", top: "3px" }}
                            name="YES"
                            color={check_List ? "primary" : "default"}
                            className={`${classes.btnStyle} ml-2 mr-2`}
                            onClick={this.toggleOtherOption.bind(this, "isSingleChoiseOption", true)}
                          >
                            <span>Yes</span>
                            <Checkbox
                              className="p-0 ml-1"
                              color="primary"
                              // name="YES"

                              icon={<CircleUnchecked className="checkboxSize" />}
                              checked={check_List}
                              checkedIcon={<CircleCheckedFilled className="checkboxSize" />}
                            />
                          </Button>
                        </>
                      }
                    />
                  </div>
                </Grid>

              </>
            }

            {
              elementKey === "Date_Picker" &&
              <>
                <Grid item xs={12} className='mt-3' >
                  <div justifyContent="space-around" alignItems="center">
                    <h6 className={classes.text1} >Read-Only Type: </h6>
                    <FormControlLabel
                      name="readOnly"
                      style={{ position: "relative", top: "3px" }}
                      control={
                        <>
                          <Button
                            variant="outlined"
                            size="small"
                            name="No"
                            color={readOnly ? "default" : "primary"}
                            //style={{ outline: "none" }}
                            //className='ml-4 mr-2'
                            className={`ml-4 mr-2 ${classes.btnStyle}`}
                            onClick={this.editElementCustomOptionsProp.bind(this, "readOnly", false)}
                          >
                            <span>No</span>
                            <Checkbox
                              className="p-0 ml-1"
                              color="primary"
                              name="No"
                              icon={<CircleUnchecked className="checkboxSize" />}
                              checked={!readOnly}
                              checkedIcon={<CircleCheckedFilled className="checkboxSize" />}
                            />
                          </Button>
                          <Button
                            variant="outlined"
                            size="small"
                            //style={{ outline: "none" }}
                            name="Yes"
                            color={readOnly ? "primary" : "default"}
                            //className='ml-2 mr-2'
                            className={`ml-2 mr-2 ${classes.btnStyle}`}
                            onClick={this.editElementCustomOptionsProp.bind(this, "readOnly", true)}
                          >
                            <span>Yes</span>
                            <Checkbox
                              className="p-0 ml-1"
                              color="primary"
                              // name="YES"
                              name="readOnly"
                              icon={<CircleUnchecked className="checkboxSize" />}
                              checked={readOnly}
                              checkedIcon={<CircleCheckedFilled className="checkboxSize" />}
                            />
                          </Button>
                        </>
                      }
                    />
                  </div>
                </Grid>
                {/* <div>
                  <h6 style={{ display: "inline" }}>Read-Only Type: </h6>
                  <FormControlLabel
                    control={
                      <Switch checked={readOnly}
                        color="primary"
                        onChange={this.editElementCustomOptionsProp.bind(this, "readOnly", "checked")}
                        name="readOnly"
                      />
                    }
                  />
                </div> */}
                <DatePickerOptions data={this.props.preview.state.data}
                  preview={this.props.preview}
                  updateElement={this.props.updateElement}
                  classes={this.props.classes}
                  element={this.props.element}></DatePickerOptions>
                <Grid item xs={12}>
                  <div justifyContent="space-around" alignItems="center">
                    <h6 className={classes.text1} >Disable Past Dates: </h6>
                    <FormControlLabel
                      name="disablePastDates"
                      style={{ position: "relative", top: "3px" }}
                      control={
                        <>
                          <Button
                            variant="outlined"
                            size="small"
                            name="No"
                            color={disablePastDates ? "default" : "primary"}
                            //style={{ outline: "none" }}
                            //className='ml-4 mr-2'
                            className={`ml-4 mr-2 ${classes.btnStyle}`}
                            onClick={this.editElementCustomOptionsProp.bind(this, "disablePastDates", false)}
                          >
                            <span>No</span>
                            <Checkbox
                              className="p-0 ml-1"
                              color="primary"
                              name="No"
                              icon={<CircleUnchecked className="checkboxSize" />}
                              checked={!disablePastDates}
                              checkedIcon={<CircleCheckedFilled className="checkboxSize" />}
                            />
                          </Button>
                          <Button
                            variant="outlined"
                            size="small"
                            //style={{ outline: "none" }}
                            name="Yes"
                            color={disablePastDates ? "primary" : "default"}
                            //className='ml-2 mr-2'
                            className={`ml-2 mr-2 ${classes.btnStyle}`}
                            onClick={this.editElementCustomOptionsProp.bind(this, "disablePastDates", true)}
                          >
                            <span>Yes</span>
                            <Checkbox
                              className="p-0 ml-1"
                              color="primary"
                              // name="Yes"
                              name="disablePastDates"
                              icon={<CircleUnchecked className="checkboxSize" />}
                              checked={disablePastDates}
                              checkedIcon={<CircleCheckedFilled className="checkboxSize" />}
                            />
                          </Button>
                        </>
                      }
                    />
                  </div>
                </Grid>
                {/* <div>
                  <h6 style={{ display: "inline" }}>Disable Past Dates: </h6>
                  <FormControlLabel
                    control={
                      <Switch checked={pastDate}
                        color="primary"
                        onChange={this.editElementCustomOptionsProp.bind(this, "pastDate", "checked")}
                        name="pastDate"
                      />
                    }
                  />
                </div> */}

              </>
            }
            {
              elementKey === "Configurable_List" &&
              <Grid item xs={12} >
                <ConfigurableOptions showCorrectColumn={this.props.showCorrectColumn}
                  canHaveOptionCorrect={canHaveOptionCorrect}
                  canHaveOptionValue={canHaveOptionValue}
                  data={this.props.preview.state.data}
                  preview={this.props.preview}
                  element={this.props.element}
                  {...toolbarProps}
                  customOptions={this.state.element.customOptions}
                  handleTableOptions={this.handleTableOptions}
                  addTableOptions={this.addTableOptions}
                  removeTableOptions={this.removeTableOptions}
                />
              </Grid>
            }
            {
              elementKey === "Button_Radios" &&
              <ButtonRadiosOptions showCorrectColumn={this.props.showCorrectColumn}
                updateElement={this.props.updateElement}
                canHaveOptionCorrect={canHaveOptionCorrect}
                canHaveOptionValue={canHaveOptionValue}
                data={this.props.preview.state.data}
                preview={this.props.preview}
                element={this.props.element} />
            }

            {
              elementKey === "Button" &&
              <>
                <FormControl component="fieldset">
                  <Grid container justifyContent="flex-start" >
                    <Grid item className="mr-2 mt-4">
                      <h5 className={classes.text}>Button Type: </h5>
                    </Grid>
                    <Grid item>
                      <RadioGroup row aria-label="material" name="material" value={buttonType} onChange={this.changeButtonType.bind(this)}>
                        <FormControlLabel style={{ marginRight: "10px", marginBottom: '0.5rem' }} label="Primary" labelPlacement='start' value="primary" className={buttonType === "primary" ? classes.checked : classes.unchecked} control={<Radio color="primary" icon={<CircleUnchecked className="checkboxSize" />} checkedIcon={<CircleCheckedFilled className="checkboxSize" />} />} />
                        <FormControlLabel style={{ marginRight: "10px", marginBottom: '0.5rem' }} value="secondary" labelPlacement='start' className={buttonType === "secondary" ? classes.checked : classes.unchecked} label="Secondary" control={<Radio color="primary" icon={<CircleUnchecked className="checkboxSize" />} checkedIcon={<CircleCheckedFilled className="checkboxSize" />} />} />
                        <FormControlLabel style={{ marginRight: "10px", marginBottom: '0.5rem' }} value="hyperlink" labelPlacement='start' className={buttonType === "hyperlink" ? classes.checked : classes.unchecked} label="Hyperlink" control={<Radio color="primary" icon={<CircleUnchecked className="checkboxSize" />} checkedIcon={<CircleCheckedFilled className="checkboxSize" />} />} />
                      </RadioGroup>
                    </Grid>
                  </Grid>
                  {
                    this.state.element.buttonType === 'hyperlink' &&
                    <TextField
                      className="mt-2"
                      variant="outlined"
                      fullWidth
                      // label="Add Hyperlink"
                      placeholder='Add Hyperlink'
                      value={this.state.element.customOptions.Hyperlink}
                      onChange={(e) => { this.handleHyperlink(e) }}
                      type='text' />
                  }
                </FormControl>

                <Grid item xs={12} className='my-3' >
                  {/* <FormControl fullWidth variant="outlined" className="mt-2" style={{ marginBottom: "13rem" }}>
                    <InputLabel id="actionList">Action (On Click)</InputLabel>
                    <Select
                      labelId="actionList"
                      id="actionList"
                      value={this.state.element.customOptions.actionClick}
                      defaultValue="Save"
                      label="Action (On Click)"
                      onChange={(e) => this.setActionClick("actionClick", e)}
                      MenuProps={{
                        anchorOrigin: {
                          vertical: "bottom",
                          horizontal: "left"
                        },
                        getContentAnchorEl: null
                      }}
                    >
                      <MenuItem value={"Save"}>Save</MenuItem>
                      <MenuItem value={"Cancel or Abort"}>Cancel or Abort</MenuItem>
                    </Select>
                  </FormControl> */}
                  <TextField
                    className="mt-2"
                    variant="outlined"
                    fullWidth
                    label="Button Action"
                    value={this.state.element.customOptions.buttonAction}
                    onChange={this.setDefaultValue.bind(this, "buttonAction")}
                    type='text'
                  />
                </Grid>

                {/* <Grid item xs={12} className="element-options-border-grid" style={{ border: '1px solid grey', zIndex: '1' }}>
                <FormControlLabel control={<Checkbox checked={setupApproval} onChange={this.editElementCustomOptionsProp.bind(this, "setupApproval", "checked")} name="setupApproval" color="primary" />}
                  label="Setup Approval Mechanism" />

                {
                  setupApproval &&
                  <>
                    <ul type="none">
                      <li>
                        <FormControlLabel control={<Checkbox checked={approvalMechanism} onChange={this.editElementCustomOptionsProp.bind(this, "approvalMechanism", "checked")} name="approvalMechanism" color="primary" />}
                          label="Approval mechanism on data table." />
                      </li>
                      <li>
                        <FormControlLabel control={<Checkbox checked={approvalInternalScreen} onChange={this.editElementCustomOptionsProp.bind(this, "approvalInternalScreen", "checked")} name="approvalInternalScreen" color="primary" />}
                          label="Approval mechanism in internal screen." />
                        {
                          approvalInternalScreen &&
                          <>
                            <FormControl fullWidth variant="outlined">
                              <InputLabel id="screenSelect">Select Screens</InputLabel>
                              <Select
                                labelId="screenSelect"
                                id="screenSelect"
                                value={this.state.element.customOptions.screenSelect}
                                label="Select Screens"
                                onChange={(e) => this.setScreenSelect("screenSelect", e)}
                              >
                                <MenuItem value={"2 Screen"}>2 Screen Selected</MenuItem>
                              </Select>
                            </FormControl>
                          </>
                        }
                      </li>
                    </ul>
                    <Grid container spacing={4} style={{ marginLeft: "50%" }} >
                      <Grid item xs={2} sm={2} style={{ marginRight: "2rem" }}>
                        <Button variant="outlined" color="primary"> RESET </Button>
                      </Grid>
                      <Grid item xs={2} sm={2} >
                        <Button variant="contained"> SAVE </Button>
                      </Grid>
                    </Grid>
                  </>
                }
              </Grid> */}
              </>
            }

            {
              elementKey === "Tab_Break" &&
              <TabsOptions showCorrectColumn={this.props.showCorrectColumn}
                canHaveOptionCorrect={canHaveOptionCorrect}
                canHaveOptionValue={canHaveOptionValue}
                data={this.props.preview.state.data}
                preview={this.props.preview}
                element={this.props.element} />
            }

            { // Check List Options
              elementKey === "Check_List" &&
              <>
                <Grid item xs={12} >
                  <CheckListOptions showCorrectColumn={this.props.showCorrectColumn}
                    canHaveOptionCorrect={canHaveOptionCorrect}
                    canHaveOptionValue={canHaveOptionValue}
                    data={this.props.preview.state.data}
                    preview={this.props.preview}
                    element={this.props.element}
                    key={this.props.element.checkListOptions.length} />
                  <Grid style={{ marginTop: "20px" }} justifyContent="space-around" alignItems='center' className="mb-2">
                    <h6 className={classes.text1}>Display Other option:</h6>
                    <FormControlLabel
                      control={
                        <>
                          <Button
                            variant="outlined"
                            size="small"
                            name="NO"
                            color={checkList ? "default" : "primary"}
                            style={{ outline: "none" }}
                            className={`${classes.btnStyle} ml-4 mr-2`}
                            onClick={this.toggleCheckListOtherOption.bind(this, 'isOtherOption', false)}
                          >
                            <span>No</span>
                            <Checkbox
                              className="p-0 ml-1"
                              color="primary"
                              name="NO"
                              icon={<CircleUnchecked className="checkboxSize" />}
                              checked={!checkList}
                              checkedIcon={<CircleCheckedFilled className="checkboxSize" />}
                            />
                          </Button>
                          <Button
                            variant="outlined"
                            size="small"
                            style={{ outline: "none" }}
                            name="YES"
                            color={checkList ? "primary" : "default"}
                            className={`${classes.btnStyle} ml-2 mr-2`}
                            onClick={this.toggleCheckListOtherOption.bind(this, 'isOtherOption', true)}
                          >
                            <span>Yes</span>
                            <Checkbox
                              className="p-0 ml-1"
                              color="primary"
                              // name="YES"
                              name="is_required"
                              icon={<CircleUnchecked className="checkboxSize" />}
                              checked={checkList}
                              checkedIcon={<CircleCheckedFilled className="checkboxSize" />}
                            />
                          </Button>
                        </>
                      }
                    />
                  </Grid>


                  {
                    this.props.element.customOptions.isOtherOption &&
                    <Grid>
                      <TextField
                        className="mt-2"
                        //size="small"
                        variant="outlined"
                        fullWidth
                        id="outlined-basic"
                        label="Other"
                        value={this.props.element.customOptions.otherOptionText}
                        onChange={this.setOtherOptionText.bind(this, "otherOptionText")}
                        inputProps={{ type: 'text' }} />
                    </Grid>
                  }
                </Grid>

              </>
            }


            {// SECTION HEADER OPTIONS
              elementKey == "Section_Header" &&
              <>
                <h6 className={`${classes.text1} mt-2 mb-2`}>Section Header Options: </h6>
                <TextField
                  fullWidth
                  variant="outlined"
                  type="color"
                  id="favcolor"
                  name="favcolor"
                  value={sectionHeaderBGColor}
                  onChange={(e) => this.pickColor(e, "sectionHeaderBGColor")}
                  inputProps={{
                    style: {
                      paddingTop: 1,
                      paddingRight: 5,
                      paddingBottom: 1,
                      paddingLeft: 5,
                      height: 48
                    }
                  }}
                />
                <p style={{ marginLeft: '4rem', marginBottom: '14rem', opacity: "0.6" }}>Pick a color for Section Header Background</p>

              </>
            }

            { // INPUT TABLE OPTIONS
              isMaterialTable &&
              <Grid item xs={12} >
                <InputTableOptions showCorrectColumn={this.props.showCorrectColumn}
                  canHaveOptionCorrect={canHaveOptionCorrect}
                  canHaveOptionValue={canHaveOptionValue}
                  data={this.props.preview.state.data}
                  preview={this.props.preview}
                  element={this.props.element} />
              </Grid>
            }
          </Grid>

          {this.props.element.hasOwnProperty('file_path') &&
            <div className="form-group">
              <label className="control-label" htmlFor="fileSelect">Choose file:</label>
              <select id="fileSelect" className="form-control" defaultValue={this.props.element.file_path} onBlur={this.updateElement.bind(this)} onChange={this.editElementProp.bind(this, 'file_path', 'value')}>
                {[{ label: "Site", value: "SITE"}].map()}
                {this_files.map((file) => {
                  const this_key = `file_${file.id}`;
                  return <option value={file.id} key={this_key}>{file.file_name}</option>;
                })}
              </select>
            </div>
          }

          {this.props.element.hasOwnProperty('src') &&
            <div>
              <div className="form-group">
                <label className="control-label" htmlFor="srcInput">Link to:</label>
                <input id="srcInput" type="text" className="form-control" defaultValue={this.props.element.src} onBlur={this.updateElement.bind(this)} onChange={this.editElementProp.bind(this, 'src', 'value')} />
              </div>
              <div className="form-group">
                <div className="custom-control custom-checkbox">
                  <input id="do-center" className="custom-control-input" type="checkbox" checked={this_checked_center} value={true} onChange={this.editElementProp.bind(this, 'center', 'checked')} />
                  <label className="custom-control-label" htmlFor="do-center">
                    Center?
                  </label>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-3">
                  <label className="control-label" htmlFor="elementWidth">Width:</label>
                  <input id="elementWidth" type="text" className="form-control" defaultValue={this.props.element.width} onBlur={this.updateElement.bind(this)} onChange={this.editElementProp.bind(this, 'width', 'value')} />
                </div>
                <div className="col-sm-3">
                  <label className="control-label" htmlFor="elementHeight">Height:</label>
                  <input id="elementHeight" type="text" className="form-control" defaultValue={this.props.element.height} onBlur={this.updateElement.bind(this)} onChange={this.editElementProp.bind(this, 'height', 'value')} />
                </div>
              </div>
            </div>
          }
          {this.props.element.hasOwnProperty('label') &&
            <div className="form-group" style={{ marginTop: "2em" }}>

              {/* {
              (elementKey == "Text") || (elementKey == "Short_Text") && 
                 <FormControlLabel
                control={<Switch checked={this_char_limit} onChange={(this.editElementProp.bind(this, 'isCharLimit', 'checked'))} color="primary" name="characterLimit" />}
                label="Character Limit"
                />
            } */}

              {/* {
              (elementKey == "Text" && this_char_limit) || (elementKey == "Short_Text" && this_char_limit) && 
                <Grid container direction={"row"} >
                    <Grid item xs={12} item>
                    <TextField
                      size="small"
                      type="number"
                      label="Set Text Size" 
                      variant="outlined"
                      fullWidth
                      defaultValue={charLimit}
                      onChange={this.setChatLimit.bind(this, "charLimit")}
                      InputProps={{ inputProps: { min: 1 } }} />
                  </Grid>
                </Grid>
            } */}
               
              {
                (elementKey == "Text") ||
                (elementKey == "Short_Text") 
                &&
                <Grid container direction={"row"} >
                  {/* <Grid item xs={12} sm={4} >
                    <FormLabel>Set text size</FormLabel>
                  </Grid> */}
                    
                    { validation === "Alphabetic" || validation === "AlphaNumeric" || validation === "Numeric" || validation === "None" ?
                      <Grid item xs={12} className='mb-3'>
                        {!isDisabled && <TextField
                          //size="small"
                          // disabled={this.state.element.customOptions.isFieldDisabled}
                          type="number"
                          label="Set Text Size"
                          variant="outlined"
                          fullWidth
                          defaultValue={charLimit}
                          onChange={this.setChatLimit.bind(this, "charLimit")}
                          inputProps={{ maxLength: charLimit, min: 0, pattern: "[0-9]*" }}
                          error={charLimit > 250 || charLimit < 0 || charLimit == "" ? true : false}
                          helperText={charLimit > 250 ? `Text size should be less than 250 characters` : charLimit < 0 || charLimit == "" ? `Text size should be greater than 0` : null}
                        />}

                      </Grid>
                      : null}
                </Grid>
              }
              
              {
                (this.props.element.element == "Mapping_Dropdown") &&
                <>
                  <div className="form-group pb-4" style={{ borderBottom: "1px solid #bebebe" }}>
                    {/* <label className="control-label" htmlFor="questionDescription">Options</label> */}
                    <TextField
                      disabled={true}
                      label="Map To"
                      variant="outlined"
                      type="text"
                      multiline
                      //className="form-control"
                      id="questionDescription"
                      fullWidth
                      defaultValue={this.props.element.dropDownOptions.filter(x => !this.props.element.customOptions.uploadedOptions.filter(y => y.value === x.value).length).map((el) => el.value).join("\n")}
                      onBlur={this.updateElement.bind(this)}
                      onChange={this.textAreaHandleChange} className="mb-1" />
                    <Typography className='ml-4'>
                      <ul style={{ fontSize: "small", opacity: "0.6" }}>
                        <li>It will get list dynamically from site mapped to User.</li>
                        <li>For mapping site against User, go to "User Management" page and upload site data.</li>
                      </ul>
                    </Typography>
                  </div>
                </>
              }

              {
                (this.props.element.element == "Dropdown") &&
                <>
                  <div className="form-group pb-4" style={{ borderBottom: "1px solid #bebebe" }}>
                    {/* <label className="control-label" htmlFor="questionDescription">Options</label> */}
                    <TextField
                      label="Options"
                      variant="outlined"
                      type="text"
                      multiline
                      //className="form-control"
                      id="questionDescription"
                      fullWidth
                      defaultValue={this.props.element.dropDownOptions.filter(x => !this.props.element.customOptions.uploadedOptions.filter(y => y.value === x.value).length).map((el) => el.value).join("\n")}
                      onBlur={this.updateElement.bind(this)}
                      onChange={this.textAreaHandleChange} className="mb-1" />
                    <Typography className='ml-4'>
                      <ul style={{ fontSize: "small", opacity: "0.6" }}>
                        <li>Enter the list of the dropdown options.</li>
                        <li>Separate each options by new line.</li>
                      </ul>
                    </Typography>
                  </div>
                  <Grid item xs={12} className="pt-4">
                    <FormControl component="fieldset">
                      <Grid container justifyContent="flex-start" >
                        <Grid item className="mr-2">
                          <h6 className={classes.text}>Dropdown Data:</h6>
                        </Grid>
                        <Grid item>
                          <RadioGroup row aria-label="material" name="material" value={this.props.element.customOptions.dataOptions} onChange={this.handleDropdownDataOptions}>
                            <FormControlLabel value="mastersheet"
                              style={{ marginRight: "12px" }}
                              className={this.props.element.customOptions.dataOptions === "mastersheet" ? classes.checked : classes.unchecked} control={<Radio color="primary" icon={<CircleUnchecked />} checkedIcon={<CircleCheckedFilled />} />} label="Use Master Sheet" labelPlacement='start' />
                            <FormControlLabel value="options" className={this.props.element.customOptions.dataOptions === "options" ? classes.checked : classes.unchecked} control={<Radio color="primary" icon={<CircleUnchecked />} checkedIcon={<CircleCheckedFilled />} />} label="Enter Options" labelPlacement='start' />
                          </RadioGroup>
                        </Grid>
                      </Grid>
                    </FormControl>
                  </Grid>
                  {
                    this.props.element.customOptions.dataOptions === "mastersheet" ?
                      (
                        <DropdownOptions
                          dropDownOptions={this.props.element.dropDownOptions}
                          classes={classes}
                          handleDropdownDataOptions={this.handleDropdownDataOptions}
                          element={this.props.element}
                          handledropDownOptions={this.handledropDownOptions}
                          handleDownload={this.props.element.customOptions.download}
                        />
                      )
                      :
                      (
                        <>
                          <FormGroup className='pt-4'>
                            <FormControl fullWidth variant="outlined" style={{ marginTop: "10px" }}>
                              <InputLabel id="defaultSelect">Select By Default</InputLabel>
                              <Select
                                labelId="defaultSelect"
                                id="defaultSelect"
                                defaultValue="none"
                                label="Select By Default"
                                value={this.state.element.customOptions.defaultOptions}
                                onChange={(event) => this.setDefaultOptions("defaultOptions", event)}
                              >
                                <MenuItem value={"none"} >None</MenuItem>
                                {this.state.element.dropDownOptions.map((file) => (
                                  <MenuItem key={file.key} value={file.value} > {file.value} </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </FormGroup>
                          <Grid item xs={12} className='mt-4' >
                            <div style={{ display: 'flex' }} justifyContent="space-around" alignItems="center">
                              <h6 className={classes.text1} style={{ marginRight: '7px' }} >Show Text in Empty Option: </h6>
                              <FormControlLabel
                                style={{ position: "relative", bottom: "3px" }}
                                control={
                                  <>
                                    <Button
                                      variant="outlined"
                                      size="small"
                                      name="NO"
                                      color={this_show_empty_text ? "default" : "primary"}
                                      style={{ outline: "none" }}
                                      className={`${classes.btnStyle} ml-2 mr-2`}
                                      onClick={this.editElementCustomOptionsProp.bind(this, "showEmptyTextOption", false)}
                                    >
                                      <span>No</span>
                                      <Checkbox
                                        className="p-0 ml-1"
                                        color="primary"
                                        name="NO"
                                        icon={<CircleUnchecked className="checkboxSize" />}
                                        checked={!this_show_empty_text}
                                        checkedIcon={<CircleCheckedFilled className="checkboxSize" />}
                                      />
                                    </Button>
                                    <Button
                                      variant="outlined"
                                      size="small"
                                      style={{ outline: "none" }}
                                      name="YES"
                                      color={this_show_empty_text ? "primary" : "default"}
                                      //name="this_show_empty_text"
                                      className={`${classes.btnStyle} ml-2 mr-2`}
                                      onClick={this.editElementCustomOptionsProp.bind(this, "showEmptyTextOption", true)}
                                    >
                                      <span>Yes</span>
                                      <Checkbox
                                        className="p-0 ml-1"
                                        color="primary"
                                        // name="YES"
                                        name="this_show_empty_text"
                                        icon={<CircleUnchecked className="checkboxSize" />}
                                        checked={this_show_empty_text}
                                        checkedIcon={<CircleCheckedFilled className="checkboxSize" />}
                                      />
                                    </Button>
                                  </>
                                }
                              />
                            </div>
                          </Grid>
                          {this_show_empty_text &&
                            <TextField
                              variant="outlined"
                              type="text"
                              label="Empty Option Text"
                              fullWidth
                              className="mt-2"
                              value={this.state.element.emptyOptionText}
                              onChange={this.setEmptyText.bind(this, "emptyOptionText")}
                            />
                          }
                        </>
                      )
                  }
                  { this.state.element.dropDownOptions && this.state.element.dropDownOptions.length && this.state.element.dropDownOptions.some(v=>v.label)?
                  <Grid item xs={12} className='mt-4' >
                    <div style={{ display: 'flex' }} justifyContent="space-around" alignItems="center">
                      <h6 className={classes.text1} style={{ marginRight: '7px' }} >Create Dependent Components</h6>
                      <FormControlLabel
                        style={{ position: "relative", bottom: "3px" }}
                        control={
                          <>
                            <Button
                              variant="outlined"
                              size="small"
                              name="NO"
                              color={hasDependentComponents ? "default" : "primary"}
                              style={{ outline: "none" }}
                              className={`${classes.btnStyle} ml-2 mr-2`}
                              onClick={this.editElementCustomOptionsProp.bind(this, "hasDependentComponents", false)}
                            >
                              <span>No</span>
                              <Checkbox
                                className="p-0 ml-1"
                                color="primary"
                                name="NO"
                                icon={<CircleUnchecked className="checkboxSize" />}
                                checked={!hasDependentComponents}
                                checkedIcon={<CircleCheckedFilled className="checkboxSize" />}
                              />
                            </Button>
                            <Button
                              variant="outlined"
                              size="small"
                              style={{ outline: "none" }}
                              name="YES"
                              color={hasDependentComponents ? "primary" : "default"}
                              //name="this_show_empty_text"
                              className={`${classes.btnStyle} ml-2 mr-2`}
                              onClick={this.editElementCustomOptionsProp.bind(this, "hasDependentComponents", true)}
                            >
                              <span>Yes</span>
                              <Checkbox
                                className="p-0 ml-1"
                                color="primary"
                                // name="YES"
                                name="this_show_empty_text"
                                icon={<CircleUnchecked className="checkboxSize" />}
                                checked={hasDependentComponents}
                                checkedIcon={<CircleCheckedFilled className="checkboxSize" />}
                              />
                            </Button>
                          </>
                        }
                      />
                    </div>


                    {/* Dependent components */}
                    {
                      hasDependentComponents ?
                      renderDropdownDependentSection(this, classes, this.props.element.customOptions.isDependentSectionExpanded)
                      : null
                    }
                  </Grid> : null }
                  {/* <hr /> */}
                </>
              }

              {
                (this.props.element.element == "Header") &&
                <>
                  <HeaderElementOptions
                    data={this.props.preview.state.data}
                    preview={this.props.preview}
                    element={this.props.element}
                    fileInputStyle={fileInputStyle} />
                </>
              }
              {
                (this.props.element.element == "Short_Text") &&
                <>
                  <ShortTextOptions
                    element={this.props.element}
                    setValidationOptions={this.setValidationOptions}
                    setInputMaskedValue={this.setInputMaskedValue}
                    handleSelectedIcon={this.handleSelectedIcon}
                    editElementCustomOptionsProp={this.editElementCustomOptionsProp.bind(this)} />
                </>
              }

              {
                (this.props.element.element == "Photo") &&
                <>
                  <TakePhotoOptions
                    canHaveOptionCorrect={canHaveOptionCorrect}
                    canHaveOptionValue={canHaveOptionValue}
                    data={this.props.preview.state.data}
                    updateElement={this.props.updateElement}
                    setDefaultOptions={this.setDefaultOptions}
                    preview={this.props.preview}
                    setPhotoCustomOptions={this.setPhotoCustomOptions}
                    element={this.props.element}
                    changeCameraOptions={this.changeCameraOptions}
                    editElementCustomOptionsProp={this.editElementCustomOptionsProp.bind(this)}
                  />
                </>
              }
              {
                (this.props.element.element == "Video") &&
                <>
                  <TakeVideoOptions
                    canHaveOptionCorrect={canHaveOptionCorrect}
                    canHaveOptionValue={canHaveOptionValue}
                    data={this.props.preview.state.data}
                    updateElement={this.props.updateElement}
                    setDefaultOptions={this.setDefaultOptions}
                    preview={this.props.preview}
                    setPhotoCustomOptions={this.setPhotoCustomOptions}
                    element={this.props.element}
                    changeCameraOptions={this.changeCameraOptions}
                    editElementCustomOptionsProp={this.editElementCustomOptionsProp.bind(this)}
                  />
                </>
              }
            </div>
          }

          {this.props.element.canPopulateFromApi && this.props.element.hasOwnProperty('options') && elementKey != "Single_Choice" && this.props.element.element != "Dropdown" &&
            <div className="form-group">
              <label className="control-label" htmlFor="optionsApiUrl">Populate Options from API</label>
              <div className="row">
                <div className="col-sm-6">
                  <input className="form-control" style={{ width: '100%' }} type="text" id="optionsApiUrl" placeholder="http://localhost:8080/api/optionsdata" />
                </div>
                <div className="col-sm-6">
                  <button onClick={this.addOptions.bind(this)} className="btn btn-success">Populate</button>
                </div>
              </div>
            </div>
          }

          { // SHOW OUTPUT 
            elementKey != "Section_Header" && elementKey != "Page_Break" && elementKey != "Input_Table" && elementKey != "Button" && elementKey != "Attachment" &&
            elementKey !== "Tiles" && elementKey != "Photo" && elementKey != "Configurable_List" && elementKey != "Location_Coordinates" && elementKey != 'Video' &&
            elementKey != "Barcode_Scanner" && elementKey != "Signature" && elementKey != "Button" &&
            <Grid item xs={12} className="p-2 mt-4" style={{ border: '1.5px solid rgb(128,128,128,.2)', opacity: "0.8", zIndex: '1' }}>
              <FormControl component="fieldset" className='p-2'>
                <h6 className='text'>Show Output</h6>
                <div className='ml-4 p-2' style={{ display: "flex", flexDirection: "column" }} >
                  <FormControlLabel
                    className={data_table ? classes.label1 : classes.label}
                    label="In data table in first screen."
                    control={
                      <Checkbox checked={data_table} onChange={this.editElementCustomOptionsProp.bind(this, 'dataTable', 'checked')} name="is_dataTable" color="primary" />
                    }
                  />
                    {elementKey == "Time" || elementKey == "Number" || elementKey == "Date_Picker" ? null :
                      <FormControlLabel
                        className={this_filtered ? classes.label1 : classes.label}
                        label="In filter section."
                        style={{ marginTop: "-15px" }}
                        control={
                          <Checkbox checked={this_filtered} onChange={this.editElementCustomOptionsProp.bind(this, 'filtered', 'checked')} name="is_filtered" color="primary" />
                        }
                      />
                  }
                </div>
              </FormControl>
            </Grid>
          }
          {
            (elementKey == "Barcode_Scanner") &&
            <div style={{ marginBottom: "11rem" }}></div>
          }
          {
            (elementKey == "Button") &&
            <div style={{ marginBottom: "8rem" }}></div>
          }

          {
            (elementKey == 'Signature') &&
            <>
              <div style={{ marginTop: '11rem' }}>
              </div>
            </>
          }
          {
            (elementKey == "Email") &&
            <>
              <div style={{ marginTop: '11rem' }}>
              </div>
            </>
          }
           { this.props.fromMainView ?
          <Grid container spacing={4} style={{ position: "sticky", bottom: "-16px", backgroundColor: "white", paddingLeft: "45%", marginTop: "1rem", zIndex: '2' }} >
            <Grid item xs={2} sm={2} style={{ marginRight: "2rem" }}>
              <Button
                className="border-primary color-primary"
                variant="outlined"
                onClick={() => { this.setPreviousValues() }}>
                CANCEL
              </Button>
            </Grid>
            <Grid item xs={2} sm={2} style={{ marginLeft: "2.5rem" }}>
              {/* customOptions.isLimitEntry */}
              <Button
                disabled={this.state.element.label.split("_").join(" ") === ""
                  // || this.state.element.label.length > 24 
                  || charLimit > 120
                  || charLimit < 0
                  ? true :
                  this.props.element.customOptions.charLimit == "" && this.props.element.element == "Short_Text" && (this.props.element.customOptions.validation === 'Alphabetic' || this.props.element.customOptions.validation === 'AlphaNumeric' || this.props.element.customOptions.validation === 'Numeric') ? true :
                    this.props.element.customOptions.isVideoLink && this.state.videoLinkDisable ? true :
                      this.props.element.customOptions.isVideoLink && this.props.element.customOptions.videoLink === "" ? true :
                        this.props.element.customOptions.defaultTime === "custom" && this.state.selectedTime === null ? true :
                          elementKey === "Photo" && this.state.element.customOptions.maxSize > 5 || this.state.element.customOptions.maxSize < 1 ? true :
                            elementKey === "video" && this.state.element.customOptions.maxSize > 10 || this.state.element.customOptions.maxSize < 1 ? true :
                              // this.props.element.customOptions.isNumberLimit && this.state.element.customOptions.min > this.state.element.customOptions.max ? true :
                              this.props.element.customOptions.isNumberLimit && this.state.disableNumber ? true :
                                this.props.element.customOptions.isLimitEntry && this.state.element.customOptions.min > this.state.element.customOptions.max ? true :
                                  false
                }
                className="bg-primary text-black"
                variant="contained"
                onClick={this.props.manualEditModeOff}>
                SAVE
              </Button>
            </Grid>
          </Grid>: null }
        </div>
      </ThemeProvider>
    );
  }
}
FormElementsEdit.defaultProps = { className: 'edit-element-fields' };

const renderDropdownDependentSection = (parent, classes, isDependentSectionExpanded, handleDropdownOptionChange) => {
  const handleOptionChange = (index, event) => {
    parent.handleDropdownOptionChange(index, event.target.value);
  }

  const addSectionComponent = (index, iIndex, event) => {
    parent.handleAddSectionComponent(index, iIndex, create(SECTION_COMPONENTS_LIST.filter(v=>v.key===event.target.value)[0]));
  }

  const addMoreOption = (index) => {
    parent.addMoreOption();
  }

  const removeOption = (index) => {
    parent.removeOption(index);
  }

  const addSectionComponentItem = (index, iIndex) => {
    parent.addSectionComponentItem(index, iIndex);
  }

  const removeSectionComponentItem = (index, iIndex) => {
    parent.removeSectionComponentItem(index, iIndex);
  }

  const create = (item) => {
    debugger
    console.log("inside function");
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

    if (parent.props.showDescription === true && !item.static) {
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

    if (!parent.props.isBootstrapElements) {
      if (item.key === 'Number') {
        elementOptions.customOptions.componentType=item.type;
        elementOptions.customOptions.isNumberLimit=true;
        elementOptions.customOptions.min = 0;
        elementOptions.customOptions.max = 1;
        elementOptions.customOptions.defaultValue = null;
        elementOptions.customOptions.isFieldDisabled = false;
      }

      if (item.key === 'Long_Text') {
        elementOptions.customOptions.componentType=item.type;
        elementOptions.customOptions.limitType = 'Characters';
        elementOptions.customOptions.limitTypeOptions = 'Words,Characters';
        elementOptions.customOptions.isLimitEntry = false;
        elementOptions.customOptions.editorMode = "Plain_Text",
        elementOptions.customOptions.editorModeOptions = "Plain_Text,Rich_Text";
        elementOptions.customOptions.validationType = 'None';
        elementOptions.customOptions.validationOptions = 'None,Alphabetic,AlphaNumeric';
        elementOptions.customOptions.defaultValue = "";
        elementOptions.customOptions.isFieldDisabled = false;
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
        elementOptions.customOptions.defaultValue = "";
        elementOptions.customOptions.isFieldDisabled = false;
      }

      if(item.key === 'Button'){
        elementOptions.customOptions.componentType = item.type;
        elementOptions.customOptions.required = false;
        elementOptions.customOptions.actionClick = "Save"
        elementOptions.customOptions.Hyperlink = '';
        elementOptions.customOptions.hasRequiredProp = false;
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
        elementOptions.customOptions.componentType=item.type;
        elementOptions.customOptions.required = false;
        elementOptions.customOptions.showEmptyTextOption = false;
        elementOptions.customOptions.emptyOptionText = item.emptyOptionText;
        elementOptions.customOptions.defaultOptions = item.defaultOptions;
        elementOptions.customOptions.dataOptions = "mastersheet";
        elementOptions.customOptions.download = parent.props.handleDownloadTemplate;
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
                label: ""
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
        elementOptions.customOptions.componentType=item.type;
        elementOptions.customOptions.required = false;
        elementOptions.customOptions.showEmptyTextOption = false;
        elementOptions.customOptions.emptyOptionText = item.emptyOptionText;
        elementOptions.customOptions.defaultOptions = item.defaultOptions;
        elementOptions.customOptions.dataOptions = "mastersheet";
        elementOptions.customOptions.download = parent.props.handleDownloadTemplate;
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
                label: ""
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

      if (item.key === 'Short_Text') {
        elementOptions.customOptions.componentType=item.type;
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
        elementOptions.customOptions.defaultValue = "";
        elementOptions.customOptions.isFieldDisabled = false;
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
        elementOptions.customOptions.isVideoAvail = true;
        elementOptions.customOptions.isVideoUpload = true;
        elementOptions.customOptions.isVideoLink = false;
        elementOptions.customOptions.videoLink = "";
        elementOptions.customOptions.recordedVideo = "";
        elementOptions.customOptions.uploadedVideo = "";
        elementOptions.customOptions.maxSize = 10;
        elementOptions.customOptions.max = 10;
        elementOptions.customOptions.error = false;
        elementOptions.customOptions.defaultValue = "";
        elementOptions.customOptions.isFieldDisabled = false;
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
      elementOptions.customOptions.required = false;
      elementOptions.customOptions.defaultValue = "";
      elementOptions.customOptions.isFieldDisabled = false;
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
      elementOptions.customOptions.disablePastDates = true;
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

  return (
        <Grid container className='mt-5' style={{ border: '1px solid #ccc'}}>
          <Grid item lg={12} md={12} sm={12}>
            <Card className={classes.paper} style={ isDependentSectionExpanded? {backgroundColor: "transparent"}: {}}>
              {/* Details card header */}
              <Grid container
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center" className={`mx-1 mt-2`}>
                <h6 className='text'>Section Details</h6>
                <IconButton
                  expand={isDependentSectionExpanded}
                  onClick={parent.editElementCustomOptionsProp.bind(parent, "isDependentSectionExpanded", !isDependentSectionExpanded)}
                  aria-expanded={isDependentSectionExpanded}
                  aria-label="show more"
                  className="float-right"
                >
                  {isDependentSectionExpanded ? <KeyboardArrowUpIcon className="color-primary" /> : <KeyboardArrowDownIcon />}
                </IconButton>
              </Grid>

              {/* Details card body */}
              <Collapse in={isDependentSectionExpanded} timeout="auto" unmountOnExit>
                <CardContent style={{ padding: '2px'}}>
                  <Grid container>
                  {
                    parent.props.element.dependentComponents?.map((section, index)=>
                      (<Grid containerdisplay="flex" item xs={12} className='pb-4 flex' style={{ display: 'flex'}}>
                        <Grid container display="flex" xs={12} style={{ backgroundColor: "#f0f0f0", padding: "5px", display: 'flex', width: '100%' }}>
                          <FormControl className={classes.formControl}>
                            <TextField
                              select
                              label="Select Option"
                              id="demo-mutiple-name"
                              multiple
                              // fullWidth
                              variant="outlined"
                              value={parent.props.element.dependentComponents[index]?.parentId}
                              onChange={(e)=>handleOptionChange(index, e)}
                              SelectProps={{
                                multiple: true,
                                value: parent.props.element.dependentComponents[index]?.parentId,
                              }}
                              >
                              {parent.props.element.dropDownOptions.map((option) => (
                                <MenuItem key={option.key} value={option.key}>
                                  {option.label}
                                </MenuItem>
                              ))}
                            </TextField>
                          </FormControl>
                          <Grid display="flex" direction="row" style={{width: '20%'}}>
                            <IconButton style={{padding:'6px'}} aria-label="add">
                                <AddIcon
                                    onClick={(e) => addMoreOption(index)} />
                            </IconButton>                     
                            {index > 0 &&
                            <IconButton style={{padding:'6px'}} aria-label="add">
                              <RemoveIcon onClick={(e) => removeOption(index)} />
                            </IconButton>}
                          </Grid>
                          <Grid item xs={12}>
                          {
                            section.form.map((v, iIndex) =>
                            (<Grid container style={{ display: 'flex', marginBottom: '10px', marginTop: '10px', borderBottom: '1px dashed #ccc'}}>
                              <FormControl className={classes.formControl}>
                                <TextField
                                  fullWidth
                                  id="cType"
                                  select
                                  name="cType"
                                  label="Select Component"
                                  type="text"
                                  variant="outlined"
                                  value={parent.props.element.dependentComponents[index]?.form[iIndex].element}
                                  onChange={(e) => {addSectionComponent(index, iIndex, e)}}
                                >
                                <MenuItem value="">-Select One-</MenuItem>
                                {
                                  SECTION_COMPONENTS_LIST.map((item)=>
                                    (<MenuItem value={item.key}>{item.label}</MenuItem>)
                                )}
                                </TextField>
                              </FormControl>
                              <Grid display="flex" direction="row" style={{width: '20%'}}>
                                <IconButton style={{padding:'6px'}} aria-label="add">
                                    <AddIcon
                                        onClick={(e) => addSectionComponentItem(index, iIndex)} />
                                </IconButton>
                                {iIndex > 0 || (iIndex === 0 && section.form?.length > 1) ?
                                <IconButton style={{padding:'6px'}} aria-label="add">
                                    <RemoveIcon
                                        onClick={(e) => removeSectionComponentItem(index, iIndex)} />
                                </IconButton>: null}
                              </Grid>

                              { v.label ?
                              <Grid item xs={12} className='pb-1'>
                                <FormElementsEdit isDefaultItems={parent.props.isDefaultItems} showCorrectColumn={parent.props.showCorrectColumn} files={parent.props.files} 
                                  closeEdit={parent.props.manualEditModeOff} manualEditModeOff={parent.manualEditModeOff} 
                                  preview={parent} element={v} updateElement={parent.updateElement} globalStyles={parent.props.globalStyles} 
                                  updateGlobalStyleOptions={parent.updateGlobalStyleOptions} updateFormDefault={parent.updateFormDefault} uploadFile={parent.props.uploadFile} classes={classes}/>
                              </Grid>
                              : null }
                                </Grid>
                              ))
                          }
                          </Grid>
                        </Grid>
                      </Grid>))
                  }
                  </Grid>
                </CardContent>
              </Collapse>
            </Card>
          </Grid>
        </Grid>)
}

export default withStyles(styles, { withTheme: true })(FormElementsEdit);

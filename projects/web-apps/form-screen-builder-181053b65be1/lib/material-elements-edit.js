"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _UUID = _interopRequireDefault(require("./UUID"));

var _requests = require("./stores/requests");

var _draftJs = require("draft-js");

var _pickers = require("@material-ui/pickers");

var _dateFns = _interopRequireDefault(require("@date-io/date-fns"));

var _icons = require("@material-ui/icons");

var _Add = _interopRequireDefault(require("@material-ui/icons/Add"));

var _Remove = _interopRequireDefault(require("@material-ui/icons/Remove"));

var _Delete = _interopRequireDefault(require("@material-ui/icons/Delete"));

var _ArrowBack = _interopRequireDefault(require("@material-ui/icons/ArrowBack"));

var _reactTextareaAutosize = _interopRequireDefault(require("react-textarea-autosize"));

var _numberOptions = _interopRequireDefault(require("./options/number-options"));

var _phoneOptions = _interopRequireDefault(require("./options/phone-options"));

var _shorttextOptions = _interopRequireDefault(require("./options/shorttext-options"));

var _takephotoOptions = _interopRequireDefault(require("./options/takephoto-options"));

var _Divider = _interopRequireDefault(require("@material-ui/core/Divider"));

var _headerOptions = _interopRequireDefault(require("./options/header-options"));

var _CancelRounded = _interopRequireDefault(require("@material-ui/icons/CancelRounded"));

var _singleChoiceOptions = _interopRequireDefault(require("./options/single-choice-options"));

var _photoPrePostOptions = _interopRequireDefault(require("./options/photo-pre-post-options"));

var _checklistOptions = _interopRequireDefault(require("./options/checklist-options"));

var _VideoLibrary = _interopRequireDefault(require("@material-ui/icons/VideoLibrary"));

var _styles = require("@material-ui/core/styles");

var _core = require("@material-ui/core");

var _KeyboardArrowUp = _interopRequireDefault(require("@material-ui/icons/KeyboardArrowUp"));

var _KeyboardArrowDown = _interopRequireDefault(require("@material-ui/icons/KeyboardArrowDown"));

var _longTextOptions = _interopRequireDefault(require("./options/long-text-options"));

var _datepickerOptions = _interopRequireDefault(require("./options/datepicker-options"));

var _configurableListOptions = _interopRequireDefault(require("./options/configurable-list-options"));

var _buttonRadiosOptions = _interopRequireDefault(require("./options/button-radios-options"));

var _inputTableOptions = _interopRequireDefault(require("./options/input-table-options"));

var _tabsOptions = _interopRequireDefault(require("./options/tabs-options"));

var _tilesOptions = _interopRequireDefault(require("./options/tiles-options"));

var _Info = _interopRequireDefault(require("@material-ui/icons/Info"));

var _lodash = require("lodash");

var _CheckCircle = _interopRequireDefault(require("@material-ui/icons/CheckCircle"));

var _RadioButtonUnchecked = _interopRequireDefault(require("@material-ui/icons/RadioButtonUnchecked"));

var _locationMapOptions = _interopRequireDefault(require("./options/location-map-options"));

var _takevideoOptions = _interopRequireDefault(require("./options/takevideo-options"));

var _dropdownOptions = _interopRequireDefault(require("./options/dropdown-options"));

var _materialElementsConfig = require("./material-elements-config");

var _toolbar = _interopRequireDefault(require("./toolbar"));

var _Attachment = _interopRequireDefault(require("./options/Attachment"));

var _Video = _interopRequireDefault(require("./options/Video"));

var _location_coordinates = _interopRequireDefault(require("./meterial-form-elements/location_coordinates"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var styles = function styles(theme) {
  return (0, _defineProperty2["default"])({
    // overrides: {
    //     MuiDialogPaper : {
    //     position:"relative",
    //     top:"25%",
    //     left:"150%",
    // },
    //  },
    checked: {
      border: "1px solid #50BFB7",
      padding: " 0 0 0 0.5rem",
      borderRadius: "4px",
      color: "#50BFB7",
      height: '30px',
      marginLeft: "0.1rem",
      marginRight: "0.6rem"
    },
    unchecked: {
      border: "1px solid #00000099",
      padding: " 0 0 0 0.5rem",
      borderRadius: "4px",
      height: '30px',
      marginLeft: "0.1rem",
      marginRight: "0.6rem"
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
      color: 'black'
    },
    attachmentEnabled: {
      border: '1px solid #50BFB7',
      borderRadius: '5px',
      width: '9rem',
      marginLeft: '0.2rem',
      padding: '5px 0 5px 50px',
      color: '#50BFB7'
    },
    paper: {
      width: "97%",
      margin: "0 auto",
      boxShadow: "none"
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: "72%",
      maxWidth: "72%"
    }
  }, "attachmentEnabled", {
    border: '1px solid #50BFB7',
    borderRadius: '5px',
    width: '9rem',
    marginLeft: '0.2rem',
    padding: '5px 0 5px 50px',
    color: '#50BFB7'
  });
};

var theme = (0, _styles.createMuiTheme)({
  overrides: {
    MuiFormControlLabel: {
      label: {
        fontSize: '0.875rem'
      }
    }
  },
  palette: {
    primary: {
      main: "#51BFB6"
    }
  }
});
var characterLimitHelperTheme = (0, _styles.createMuiTheme)({
  palette: {
    primary: {
      main: "#51BFB6"
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
    } // MuiDialogPaper : {
    //   position:"relative",
    //   top:"25%",
    //   left:"150%",
    // },

  }
});

var FormElementsEdit = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(FormElementsEdit, _React$Component);

  var _super = _createSuper(FormElementsEdit);

  function FormElementsEdit(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, FormElementsEdit);
    _this = _super.call(this, props);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "handleAttachments", function (e) {
      var this_element = _this.state.element;
      var arry = _this.state.element.customOptions.Attachment;

      if (e.target.value === "All Type" && arry.length < 3) {
        _this.state.element.customOptions.Attachment = ['.pdf', '.doc', '.xls'];
      } else if (e.target.value === "All Type" && arry.length === 3) {
        _this.state.element.customOptions.Attachment = [];
      } else if (arry.includes("".concat(e.target.value))) {
        var index = arry.indexOf("".concat(e.target.value));

        if (index > -1) {
          arry.splice(index, 1);
        }
      } else {
        arry.push(e.target.value);
      }

      _this.setState({
        element: this_element,
        dirty: true
      });
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "handleDeleteVideo", function () {
      var this_element = _this.state.element;
      this_element.customOptions.isFieldDisabled = false;
      this_element.customOptions.fileName = "";
      this_element.customOptions.url = "";
      this_element.customOptions.defaultValue = "";

      _this.setState({
        element: this_element,
        dirty: true
      });
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "handleDeleteFile", function (e) {
      var this_element = _this.state.element;
      _this.state.element.customOptions.fileName = "";
      _this.state.element.customOptions.defaultValue = "";

      _this.setState({
        element: this_element,
        dirty: true
      });
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "handleMaxSize", function (e) {
      var this_element = _this.state.element;
      this_element.customOptions.maxSize = e.target.value;

      _this.setState({
        element: this_element,
        dirty: true
      });
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "handleHyperlink", function (e) {
      var this_element = _this.state.element;
      var value = e.target.value;
      this_element.customOptions.Hyperlink = value;

      _this.setState({
        element: this_element,
        dirty: true
      });
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "changeFieldVarient", function (e) {
      var this_element = _this.state.element;

      if (_this.props.globalStyles.formDefault) {
        _this.props.updateGlobalStyleOptions("globalFieldVariant", e.target.value);

        _this.setState({
          element: this_element,
          dirty: true
        }, function () {
          _this.updateElement();
        });
      } else {
        var _this_element = _this.state.element;
        _this_element.fieldVariant = e.target.value;

        _this.setState({
          element: _this_element,
          dirty: true
        }, function () {
          _this.updateElement();
        });
      }
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "changeFieldVarient", function (e) {
      var this_element = _this.state.element;

      if (_this.props.globalStyles.formDefault) {
        _this.props.updateGlobalStyleOptions("globalFieldVariant", e.target.value);

        _this.setState({
          element: this_element,
          dirty: true
        }, function () {
          _this.updateElement();
        });
      } else {
        var _this_element2 = _this.state.element;
        _this_element2.fieldVariant = e.target.value;

        _this.setState({
          element: _this_element2,
          dirty: true
        }, function () {
          _this.updateElement();
        });
      }
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "changeInputFieldSize", function (e) {
      var this_element = _this.state.element;
      this_element.inputFieldSize = e.target.value;

      _this.setState({
        element: this_element,
        dirty: true
      }, function () {
        _this.updateElement();
      });
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "changeButtonType", function (e) {
      var this_element = _this.state.element;
      this_element.buttonType = e.target.value;

      _this.setState({
        element: this_element,
        dirty: true
      }, function () {
        _this.updateElement();
      });
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "changeTextAlginment", function (e) {
      var this_element = _this.state.element;
      this_element.textAlignment = e.target.value;

      _this.setState({
        element: this_element,
        dirty: true
      }, function () {
        _this.updateElement();
      });
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "updateFormDefault", function (value) {
      _this.props.updateFormDefault(_this.state.element);
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "textAreaHandleChange", function (e) {
      var text = e.target.value.trim();
      var optionsData = text.split('\n');
      var this_element = _this.state.element;
      this_element.dropDownOptions = [];
      this_element.customOptions.optionsText = text;

      for (var i = 0; i < optionsData.length; i++) {
        this_element.dropDownOptions.push({
          value: optionsData[i],
          label: optionsData[i],
          key: _UUID["default"].uuid()
        });
      }

      if (text === "" || text === undefined || text === null) {
        //on empty dropdown list emtying the dependent components
        this_element.hasDependentComponents = false;
        this_element.dependentComponents = [];
      }

      _this.setState({
        element: this_element,
        dirty: true
      });
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "showTextEmptyOption", function (e) {
      var this_element = _this.state.element;
      this_element.customOptions.showEmptyTextOption = e.target.checked;

      _this.setState({
        element: this_element,
        dirty: true
      });
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "setInputMaskedValue", function (e) {
      var this_element = _this.state.element;
      this_element.customOptions.maskedValue = e.target.value;

      _this.setState({
        element: this_element,
        dirty: true
      });
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "changeCameraOptions", function (elementProperty, e) {
      var this_element = _this.state.element;

      if (elementProperty === "videoLink") {
        var urlRegex = /(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;amp;:\/~+#-]*[\w@?^=%&amp;amp;\/~+#-])?/;

        if (e.target.value.match(urlRegex)) {
          this_element.customOptions[elementProperty] = e.target.value;
          _this.state.videoLinkDisable = false;
          this_element.customOptions.required = false;
          this_element.customOptions.error = false;
        } else {
          _this.state.videoLinkDisable = true;
          this_element.customOptions.required = true;
          this_element.customOptions.error = true;
        }
      } else {
        this_element.customOptions[elementProperty] = e.target.value;
      }

      _this.setState({
        element: this_element,
        dirty: true
      });
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "setPhotoCustomOptions", function (elementProperty, e) {
      var this_element = _this.state.element;
      this_element.customOptions[elementProperty] = e.target.checked;

      _this.setState({
        element: this_element,
        dirty: true
      });
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "setCutomeTime", function (timeValue, elemProp, e) {
      var this_element = _this.state.element;
      this_element.customOptions[elemProp] = timeValue;
      this_element.customOptions.cutomTime = null;

      _this.setState({
        element: this_element,
        dirty: true
      });
    });
    _this.state = {
      element: _this.props.element,
      data: _this.props.data,
      dirty: false,
      characterLimit: _this.props.element.customOptions.charLimit,
      elementValues: JSON.parse(JSON.stringify(_this.props.element)),
      require: false,
      selectedTime: null,
      open: false,
      videoLinkDisable: false,
      disableNumber: false,
      Attachments: [{
        id: 0,
        name: 'All Type'
      }, {
        id: 1,
        name: '.pdf'
      }, {
        id: 2,
        name: '.xls'
      }, {
        id: 3,
        name: '.doc'
      }]
    };
    _this.setNumberLimit = _this.setNumberLimit.bind((0, _assertThisInitialized2["default"])(_this));
    _this.editElementProp = _this.editElementProp.bind((0, _assertThisInitialized2["default"])(_this));
    _this.setValidationType = _this.setValidationType.bind((0, _assertThisInitialized2["default"])(_this));
    _this.setValidationOptions = _this.setValidationOptions.bind((0, _assertThisInitialized2["default"])(_this));
    _this.setInputMaskedValue = _this.setInputMaskedValue.bind((0, _assertThisInitialized2["default"])(_this));
    _this.setDefaultOptions = _this.setDefaultOptions.bind((0, _assertThisInitialized2["default"])(_this));
    _this.setDisplayOptions = _this.setDisplayOptions.bind((0, _assertThisInitialized2["default"])(_this));
    _this.setActionClick = _this.setActionClick.bind((0, _assertThisInitialized2["default"])(_this));
    _this.setScreenSelect = _this.setScreenSelect.bind((0, _assertThisInitialized2["default"])(_this));
    _this.handleTilesOptions = _this.handleTilesOptions.bind((0, _assertThisInitialized2["default"])(_this));
    _this.handleTableOptions = _this.handleTableOptions.bind((0, _assertThisInitialized2["default"])(_this));
    _this.addTilesOptions = _this.addTilesOptions.bind((0, _assertThisInitialized2["default"])(_this));
    _this.addTableOptions = _this.addTableOptions.bind((0, _assertThisInitialized2["default"])(_this));
    _this.removeTilesOptions = _this.removeTilesOptions.bind((0, _assertThisInitialized2["default"])(_this));
    _this.removeTableOptions = _this.removeTableOptions.bind((0, _assertThisInitialized2["default"])(_this));
    _this.handleTimeChange = _this.handleTimeChange.bind((0, _assertThisInitialized2["default"])(_this)); // this.handlePopup = this.handlePopup.bind(this);
    // this.handleIconOpen = this.handleIconOpen.bind(this);

    _this.handleAttachments = _this.handleAttachments.bind((0, _assertThisInitialized2["default"])(_this));
    _this.handleHyperlink = _this.handleHyperlink.bind((0, _assertThisInitialized2["default"])(_this));
    _this.handleSelectedIcon = _this.handleSelectedIcon.bind((0, _assertThisInitialized2["default"])(_this));
    _this.handleDropdownDataOptions = _this.handleDropdownDataOptions.bind((0, _assertThisInitialized2["default"])(_this));
    _this.handledropDownOptions = _this.handledropDownOptions.bind((0, _assertThisInitialized2["default"])(_this));
    _this.handleMaxSize = _this.handleMaxSize.bind((0, _assertThisInitialized2["default"])(_this));
    _this.handleFile = _this.handleFile.bind((0, _assertThisInitialized2["default"])(_this));
    _this.handleDeleteFile = _this.handleDeleteFile.bind((0, _assertThisInitialized2["default"])(_this));
    _this.handleVideoChange = _this.handleVideoChange.bind((0, _assertThisInitialized2["default"])(_this));
    _this.handleDeleteVideo = _this.handleDeleteVideo.bind((0, _assertThisInitialized2["default"])(_this));
    return _this;
  }

  (0, _createClass2["default"])(FormElementsEdit, [{
    key: "editElementProp",
    value: function editElementProp(elemProperty, targProperty, e) {
      var _this2 = this;

      // elemProperty could be content or label
      // targProperty could be value or checked
      var this_element = this.state.element;
      this_element[elemProperty] = e.target[targProperty];
      this.setState({
        element: this_element,
        dirty: true
      }, function () {
        if (targProperty === 'checked') {
          _this2.updateElement();
        }
      });
    }
  }, {
    key: "editElementCustomOptionsProp",
    value: function editElementCustomOptionsProp(elemProperty, targProperty, e) {
      var _this3 = this;

      // elemProperty could be content or label
      // targProperty could be value or checked
      var this_element = this.state.element;

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
      } // if (elemProperty === "isFieldDisabled" && targProperty ) {
      //   this_element.customOptions.charLimit = "";
      // }


      if (elemProperty === 'editorMode' && this_element.customOptions[elemProperty].toLowerCase().includes("rich")) {
        this_element.customOptions.isLimitEntry = false;
      }

      this_element.customOptions[elemProperty] = e.target[targProperty];

      if (elemProperty === 'required' || elemProperty === 'isLimitEntry' || elemProperty === "showEmptyTextOption" || elemProperty === 'isMasked' || elemProperty === 'countryCode' || elemProperty === 'isOtherOption' || elemProperty === 'checked' || elemProperty === 'readOnly' || elemProperty === 'disablePastDates' || elemProperty === 'disableTime' || elemProperty === 'isDependentSectionExpanded' || elemProperty === 'isFieldDisabled' || elemProperty === 'defaultValue') {
        this_element.customOptions[elemProperty] = targProperty;

        if (elemProperty === 'isFieldDisabled') {
          if (this_element.element === 'Number') {
            this_element.customOptions.isNumberLimit = false;
            this_element.customOptions.min = "";
            this_element.customOptions.max = "";
          }

          if (this_element.element === 'Long_Text') {
            this_element.customOptions.isLimitEntry = false;
            this_element.customOptions.editorMode = "Plain_Text", this_element.customOptions.validationType = 'None';
          }

          if (this_element.element === 'Short_Text') {
            this_element.customOptions.validation = "None";
            this_element.customOptions.charLimit = 120;
          }
        }
      }

      if (elemProperty === 'hasDependentComponents') {
        this_element[elemProperty] = targProperty;
      }

      this.setState({
        element: this_element,
        dirty: true
      }, function () {
        if (targProperty === 'checked') {
          _this3.updateElement();
        }
      });
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.props.element.element.toLowerCase().includes("table")) {
        var headerList = [{
          headerId: "0",
          label: "Header Item",
          type: 'text',
          required: false,
          options: []
        }];
        var rows = [{
          rowId: 0
        }];

        if (this.props.element.hasOwnProperty('headerList')) {
          headerList = this.props.element.headerList;
          rows = this.props.element.rows;
        }

        var element = this.state.element;
        element.headerList = headerList;
        element.rows = rows;
        this.setState({
          element: element
        });
      }
    }
  }, {
    key: "setChatLimit",
    value: function setChatLimit(elemProperty, e) {
      var this_element = this.state.element;
      this_element.customOptions[elemProperty] = e.target.value;
      this.setState({
        element: this_element,
        dirty: true,
        characterLimit: e.target.value
      });
    }
  }, {
    key: "setDefaultValue",
    value: function setDefaultValue(elemProperty, e) {
      var _e$target$value;

      var this_element = this.state.element;

      if (isNaN(parseFloat(e.target.value))) {
        this_element.customOptions[elemProperty] = e.target.value;
      } else {
        this_element.customOptions[elemProperty] = Number(e.target.value);
      }

      if (((_e$target$value = e.target.value) === null || _e$target$value === void 0 ? void 0 : _e$target$value.length) < 1) {
        this_element.customOptions.isFieldDisabled = false;
      }

      this.setState({
        element: this_element,
        dirty: true
      });
    }
  }, {
    key: "handleTimeChange",
    value: function handleTimeChange(time) {
      var this_element = this.state.element;
      this_element.customOptions.cutomTime = time;
      this.setState({
        selectedTime: time
      });
    }
  }, {
    key: "handleSelectedIcon",
    value: function handleSelectedIcon(selectedIcon) {
      var this_element = this.state.element;
      this_element.customOptions.selectedIcons = selectedIcon;
      this_element.customOptions.selectedIconsMobile = selectedIcon.split("_").join("-");
      this.setState({
        element: this_element,
        dirty: true
      });
    }
  }, {
    key: "handleFile",
    value: function () {
      var _handleFile = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(e) {
        var files, this_element;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                files = e.target.files;
                this_element = this.state.element;
                this_element.customOptions.fileName = files[0].name;
                this_element.customOptions.file = files[0];
                _context.next = 6;
                return this.props.uploadFile(files[0], "file");

              case 6:
                this_element.customOptions.defaultValue = _context.sent;
                this.setState({
                  element: this_element,
                  dirty: true
                });

              case 8:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function handleFile(_x) {
        return _handleFile.apply(this, arguments);
      }

      return handleFile;
    }() // handleVideo =(e)=> {
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

  }, {
    key: "handleVideoChange",
    value: function () {
      var _handleVideoChange = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(e) {
        var files, this_element;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                files = e.target.files;
                this_element = this.state.element;
                this_element.customOptions.fileName = files[0].name;
                _context2.next = 5;
                return this.props.uploadFile(files[0], "video");

              case 5:
                this_element.customOptions.defaultValue = _context2.sent;
                this_element.customOptions.url = URL.createObjectURL(files[0]);
                this.setState({
                  element: this_element,
                  dirty: true
                });

              case 8:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function handleVideoChange(_x2) {
        return _handleVideoChange.apply(this, arguments);
      }

      return handleVideoChange;
    }()
  }, {
    key: "toggleOtherOption",
    value: function toggleOtherOption(elemProperty, targProperty, e) {
      var this_element = this.state.element; // if (e.target[targProperty]) {

      if (targProperty) {
        if (!this_element.customOptions[elemProperty]) {
          var text = 'Other';
          var val = text.toLowerCase().split(' ').join('_');
          this_element.singleChoiceOptions.push({
            value: val,
            label: text,
            key: _UUID["default"].uuid()
          });
        }
      } else if (this_element.customOptions[elemProperty]) {
        this_element.singleChoiceOptions.pop();
      } //this_element.customOptions[elemProperty] = e.target[targProperty];


      this_element.customOptions[elemProperty] = targProperty; // setTimeout(()=>{
      //   this_element.customOptions[elemProperty] = targProperty;
      // }, 1000)
      // if (elemProperty === 'isOption') {
      //   this_element.customOptions[elemProperty] = targProperty;
      // }

      this.setState({
        element: this_element,
        dirty: true
      });
    }
  }, {
    key: "toggleCheckListOtherOption",
    value: function toggleCheckListOtherOption(elemProperty, targProperty, e) {
      var this_element = this.state.element;

      if (targProperty) {
        if (!this_element.customOptions[elemProperty]) {
          var text = 'Other';
          var val = text.toLowerCase().split(' ').join('_');
          this_element.checkListOptions.push({
            value: val,
            label: text
          });
        }
      } else if (this_element.customOptions[elemProperty]) {
        this_element.checkListOptions.pop();
      } // this_element.customOptions[elemProperty] = e.target[targProperty];
      // if (elemProperty === 'isOtherOption') {
      //   this_element.customOptions[elemProperty] = targProperty;
      // }


      this_element.customOptions[elemProperty] = targProperty;
      this.setState({
        element: this_element,
        dirty: true
      });
    }
  }, {
    key: "pickColor",
    value: function pickColor(event, elemProperty) {
      var this_element = this.state.element;
      this_element.customOptions[elemProperty] = event.target.value;
      this.setState({
        element: this_element,
        dirty: true
      });
    }
  }, {
    key: "setRows",
    value: function setRows(elemProperty, e) {
      var this_element = this.state.element;
      var rows = this_element.rows;

      if (e.target.value > rows.length) {
        var count = e.target.value - rows.length;
        rows.splice(rows.length, count, {
          rowId: rows.length
        });
      } else if (e.target.value < rows.length) {
        var _count = rows.length - e.target.value;

        rows.splice(e.target.value, _count);
      }

      this_element[elemProperty] = rows;
      this.setState({
        element: this_element,
        dirty: true
      });
    }
  }, {
    key: "setNumberLimit",
    value: function setNumberLimit(elemProperty, value) {
      var this_element = this.state.element;
      console.log(this_element.customOptions);

      if (elemProperty == 'min' || elemProperty == 'max') {
        this_element.customOptions[elemProperty] = Number(value);
      } else {
        this_element.customOptions[elemProperty] = value;
      }

      if (this_element.customOptions.min >= this_element.customOptions.max || value === "") {
        this.state.disableNumber = true;
      } else if (this_element.customOptions.min < this_element.customOptions.max) {
        this.state.disableNumber = false;
      }

      this.setState({
        element: this_element,
        dirty: true
      });
    }
  }, {
    key: "setValidationType",
    value: function setValidationType(value) {
      var this_element = this.state.element;
      this_element.customOptions.validationType = value;
      this.setState({
        element: this_element,
        dirty: true
      });
    }
  }, {
    key: "onEditorStateChange",
    value: function onEditorStateChange(index, property, editorContent) {
      var this_element = this.state.element;
      this_element[property] = html;
      this.setState({
        element: this_element,
        dirty: true
      });
    }
  }, {
    key: "onLabelChange",
    value: function onLabelChange(elemProperty, e) {
      var this_element = this.state.element;
      this_element[elemProperty] = e.target.value;
      this.setState({
        element: this_element,
        dirty: true
      });
    }
  }, {
    key: "handleTableOptions",
    value: function handleTableOptions(elemProperty, index, e) {
      var _this4 = this;

      var this_element = this.state.element;

      if (elemProperty === "required") {
        this_element.customOptions.headerList[index][elemProperty] = e; // let anyFieldIsMandatory = false;
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
        dirty: true
      }, function () {
        _this4.updateElement();
      });
    }
  }, {
    key: "handleTilesOptions",
    value: function handleTilesOptions(elemProperty, index, e) {
      var _this5 = this;

      // if (elemProperty === "columns" && e.target.value > 4) {
      //   return;
      // }
      var this_element = this.state.element;

      if (elemProperty == "spacing") {
        this_element.customOptions[elemProperty] = e.target.value;
      } else if (elemProperty == "componentOnScreenMethod") {
        this_element.customOptions.tileProperties[index][elemProperty] = e; //..Component Source

        var cs = this_element.customOptions.tileProperties[index].componentOnScreenSource; //..Component Target

        var ct = this_element.customOptions.tileProperties[index].componentOnScreenTarget;
        var sv, tv;

        if (cs && ct) {
          //..Source Index
          var si = this_element.customOptions.tileProperties.findIndex(function (x) {
            return x.ID === cs;
          }); //..Target Index

          var ti = this_element.customOptions.tileProperties.findIndex(function (x) {
            return x.ID === ct;
          }); //..Source Value

          sv = this_element.customOptions.tileProperties[si].text; //..Target Value

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
                var n = sv / tv;
                var result = n - Math.floor(n) !== 0;

                if (result) {
                  this_element.customOptions.tileProperties[index].text = n.toFixed(2);
                } else {
                  this_element.customOptions.tileProperties[index].text = n;
                }
              }

              break;

            default:
              this_element.customOptions.tileProperties[index].text = 0;
              break;
          }
        }
      } else if (elemProperty == "action") {
        if (e.target.checked) {
          var count = this_element.customOptions.tileProperties[index][elemProperty].length;
          this_element.customOptions.tileProperties[index][elemProperty].splice(count, 0, e.target.value);
        } else {
          var actionIndex = this_element.customOptions.tileProperties[index][elemProperty].findIndex(function (x) {
            return x === e.target.value;
          });

          if (actionIndex != -1) {
            this_element.customOptions.tileProperties[index][elemProperty].splice(actionIndex, 1);
          }
        }
      } else {
        this_element.customOptions.tileProperties[index][elemProperty] = e.target.value;
      }

      this.setState({
        element: this_element,
        dirty: true
      }, function () {
        _this5.updateElement();
      });
    }
  }, {
    key: "handleDropdownDataOptions",
    value: function handleDropdownDataOptions(e) {
      var _this6 = this;

      var this_element = this.state.element;
      this_element.customOptions.dataOptions = e.target.value;
      this.setState({
        element: this_element,
        dirty: true
      }, function () {
        _this6.updateElement();
      });
    }
  }, {
    key: "handledropDownOptions",
    value: function handledropDownOptions(dropdown, optionText, fileName, uploaded, download) {
      var this_element = this.state.element;
      this_element.dropDownOptions = [];
      this_element.customOptions.optionsText = optionText;
      this_element.customOptions.fileUploaded = fileName;
      this_element.customOptions.uploaded = uploaded;
      this_element.customOptions.download = download;

      for (var i = 0; i < dropdown.length; i++) {
        this_element.dropDownOptions.push({
          value: dropdown[i].value,
          label: dropdown[i].label,
          key: _UUID["default"].uuid()
        });
      }

      this.setState({
        element: this_element,
        dirty: true
      });
    }
  }, {
    key: "addTilesOptions",
    value: function addTilesOptions(index) {
      var this_element = this.state.element;

      if (this_element.customOptions && this_element.customOptions.tileProperties.length >= 4) {
        return;
      }

      var compId = this_element.customOptions.tileProperties.length + 1;
      this_element.customOptions.tileProperties.splice(compId, 0, {
        ID: "Tile ID- COMPONENT00".concat(compId),
        key: "Tile ID- COMPONENT00".concat(compId),
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
  }, {
    key: "removeTilesOptions",
    value: function removeTilesOptions(index) {
      var this_element = this.state.element;
      this_element.customOptions.tileProperties.splice(index, 1);
      this_element.customOptions.columns = this_element.customOptions.columns - 1;
      this.props.updateElement.call(this.props.preview, this_element);
    }
  }, {
    key: "addTableOptions",
    value: function addTableOptions() {
      var this_element = this.state.element;
      var compId = this_element.customOptions.headerList.length + 1;
      this_element.customOptions.headerList.splice(compId, 0, {
        label: '',
        headerId: "headerId00".concat(compId),
        required: false,
        type: ''
      });
      this_element.customOptions.columns = this_element.customOptions.columns + 1;
      this.props.updateElement.call(this.props.preview, this_element);
    }
  }, {
    key: "removeTableOptions",
    value: function removeTableOptions(index) {
      var this_element = this.state.element;
      this_element.customOptions.headerList.splice(index, 1);
      this_element.customOptions.columns = this_element.customOptions.columns - 1;
      this.props.updateElement.call(this.props.preview, this_element);
    }
  }, {
    key: "updateElement",
    value: function updateElement() {
      var this_element = this.state.element; // to prevent ajax calls with no change

      if (this.state.dirty) {
        this.props.updateElement.call(this.props.preview, this_element);
        this.setState({
          dirty: false
        });
      }
    }
  }, {
    key: "convertFromHTML",
    value: function convertFromHTML(content) {
      var newContent = (0, _draftJs.convertFromHTML)(content);

      if (!newContent.contentBlocks || !newContent.contentBlocks.length) {
        // to prevent crash when no contents in editor
        return _draftJs.EditorState.createEmpty();
      }

      var contentState = _draftJs.ContentState.createFromBlockArray(newContent);

      return _draftJs.EditorState.createWithContent(contentState);
    }
  }, {
    key: "addOptions",
    value: function addOptions() {
      var _this7 = this;

      var optionsApiUrl = document.getElementById('optionsApiUrl').value;

      if (optionsApiUrl) {
        (0, _requests.get)(optionsApiUrl).then(function (data) {
          _this7.props.element.options = [];
          var options = null;

          if (_this7.props.element.element.toLowerCase('singlechoice')) {
            options = _this7.props.element.singleChoiceOptions;
            data.forEach(function (x) {
              options.push(x);
            });
            this_element.singleChoiceOptions = options;
          } else if (_this7.props.element.element.toLowerCase('dropdown')) {
            options = _this7.props.element.dropDownOptions;
            data.forEach(function (x) {
              options.push(x);
            });
            this_element.singleChoiceOptions = options;
          }

          _this7.setState({
            element: this_element,
            dirty: true
          });
        });
      }
    }
  }, {
    key: "setEmptyText",
    value: function setEmptyText(elemProperty, e) {
      var this_element = this.state.element;
      this_element.customOptions[elemProperty] = e.target.value;
      this.setState({
        element: this_element,
        dirty: true
      });
    }
  }, {
    key: "setDefaultOptions",
    value: function setDefaultOptions(elemProperty, e) {
      var this_element = this.state.element;
      this_element.customOptions[elemProperty] = e.target.value;
      this.setState({
        element: this_element,
        dirty: true
      });
    }
  }, {
    key: "setDisplayOptions",
    value: function setDisplayOptions(elemProperty, e) {
      var this_element = this.state.element;
      this_element.customOptions[elemProperty] = e.target.value;
      this.setState({
        element: this_element,
        dirty: true
      });
    }
  }, {
    key: "setActionClick",
    value: function setActionClick(elemProperty, e) {
      var this_element = this.state.element;
      this_element.customOptions[elemProperty] = e.target.value;
      this.setState({
        element: this_element,
        dirty: true
      });
    }
  }, {
    key: "setScreenSelect",
    value: function setScreenSelect(elemProperty, e) {
      var this_element = this.state.element;
      this_element.customOptions[elemProperty] = e.target.value;
      this.setState({
        element: this_element,
        dirty: true
      });
    }
  }, {
    key: "setValidationOptions",
    value: function setValidationOptions(e) {
      var this_element = this.state.element;
      this_element.customOptions.validation = e.target.value;

      if (this_element.customOptions.validation === 'Email' || this_element.customOptions.validation === 'Currency' || this_element.customOptions.validation === 'URL') {
        this.state.element.customOptions.charLimit = ""; // this.state.characterLimit = ""; 
      } // else {
      //   this.state.element.customOptions.charLimit = this.state.characterLimit;
      // }


      this.setState({
        element: this_element,
        dirty: true
      });
    }
  }, {
    key: "setOtherOptionText",
    value: function setOtherOptionText(elemProperty, e) {
      var this_element = this.state.element;
      this_element.customOptions[elemProperty] = e.target.value;
      var text = e.target.value;
      var val = e.target.value.toLowerCase().split(' ').join('_');
      this_element.checkListOptions[this_element.checkListOptions.length - 1].value = val;
      this_element.checkListOptions[this_element.checkListOptions.length - 1].label = text;
      this_element.checkListOptions[this_element.checkListOptions.length - 1].key = _UUID["default"].uuid();
      this.setState({
        element: this_element,
        dirty: true
      });
    }
  }, {
    key: "setPreviousValues",
    value: function setPreviousValues() {
      var this_element = this.state.elementValues;
      this_element.dirty = false; // to prevent ajax calls with no change

      this.props.updateElement.call(this.props.preview, this_element);
      this.props.closeEdit();
    }
  }, {
    key: "handleDropdownOptionChange",
    value: function handleDropdownOptionChange(index, ids) {
      var this_element = this.state.element;
      this_element.dependentComponents[index].parentId = ids;
      this.setState({
        element: this_element,
        dirty: true
      });
    }
  }, {
    key: "handleAddSectionComponent",
    value: function handleAddSectionComponent(index, iIndex, element) {
      var this_element = this.state.element;
      this_element.dependentComponents[index].form[iIndex] = element;
      this.setState({
        element: this_element,
        dirty: true
      });
    }
  }, {
    key: "addMoreOption",
    value: function addMoreOption(index) {
      var this_element = this.state.element;
      this_element.dependentComponents.push({
        parentId: [],
        form: [{
          label: "",
          key: ""
        }]
      });
      this.setState({
        element: this_element,
        dirty: true
      });
    }
  }, {
    key: "removeOption",
    value: function removeOption(index) {
      var this_element = this.state.element;
      this_element.dependentComponents.splice(index, 1);
      this.setState({
        element: this_element,
        dirty: true
      });
    }
  }, {
    key: "addSectionComponentItem",
    value: function addSectionComponentItem(index, iIndex) {
      var this_element = this.state.element;
      this_element.dependentComponents[index].form.push({
        label: "",
        key: ""
      });
      this.setState({
        element: this_element,
        dirty: true
      });
    }
  }, {
    key: "removeSectionComponentItem",
    value: function removeSectionComponentItem(index, iIndex) {
      var this_element = this.state.element;
      this_element.dependentComponents[index].form.splice(iIndex, 1);
      this.setState({
        element: this_element,
        dirty: true
      });
    }
  }, {
    key: "handleDefaultLocationChange",
    value: function handleDefaultLocationChange(index, iIndex) {
      var this_element = this.state.element;
      this_element.dependentComponents[index].form.splice(iIndex, 1);
      this.setState({
        element: this_element,
        dirty: true
      });
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (prevProps.element !== this.props.element) {
        this.setState({
          element: this.props.element
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this8 = this;

      if (this.state.dirty) {
        this.props.element.dirty = true;
      }

      var elementKey = this.props.element.element;
      var isformDefault = this.props.globalStyles.formDefault;
      var this_show_empty_text = this.props.element.customOptions.hasOwnProperty('showEmptyTextOption') ? this.props.element.customOptions.showEmptyTextOption : false;
      var this_char_limit = this.props.element.hasOwnProperty('isCharLimit') ? this.props.element.isCharLimit : false;
      var charLimit = this.props.element.customOptions.charLimit;
      var validation = this.props.element.customOptions.validation;
      var sectionHeaderBGColor = this.props.element.customOptions.sectionHeaderBGColor; // const this_mask = this.props.element.customOptions.hasOwnProperty('isMasked') ? this.props.element.customOptions.isMasked : false;

      var c_code = this.props.element.customOptions.hasOwnProperty('countryCode') ? this.props.element.customOptions.countryCode : false;
      var this_required = this.props.element.customOptions.hasOwnProperty('required') ? this.props.element.customOptions.required : false;
      var disable_time = this.props.element.customOptions.hasOwnProperty('disableTime') ? this.props.element.customOptions.disableTime : false;
      var this_checked = this.props.element.customOptions.hasOwnProperty('checked') ? this.props.element.customOptions.checked : false;
      var checkList = this.props.element.customOptions.hasOwnProperty('isOtherOption') ? this.props.element.customOptions.isOtherOption : false;
      var readOnly = this.props.element.customOptions.hasOwnProperty('readOnly') ? this.props.element.customOptions.readOnly : false;
      var disablePastDates = this.props.element.customOptions.hasOwnProperty('disablePastDates') ? this.props.element.customOptions.disablePastDates : false;
      var data_table = this.props.element.customOptions.hasOwnProperty('dataTable') ? this.props.element.customOptions.dataTable : false;
      var this_filtered = this.props.element.customOptions.hasOwnProperty('filtered') ? this.props.element.customOptions.filtered : false;
      var this_editable = this.props.element.customOptions.hasOwnProperty('editable') ? this.props.element.customOptions.editable : false;
      var setupApproval = this.props.element.customOptions.hasOwnProperty("setupApproval") ? this.props.element.customOptions.setupApproval : false;
      var approvalMechanism = this.props.element.customOptions.hasOwnProperty("approvalMechanism") ? this.props.element.customOptions.approvalMechanism : false;
      var approvalInternalScreen = this.props.element.customOptions.hasOwnProperty("approvalInternalScreen") ? this.props.element.customOptions.approvalInternalScreen : false;
      var this_checked_center = this.props.element.hasOwnProperty('center') ? this.props.element.center : false;
      var check_List = this.props.element.customOptions.hasOwnProperty('isSingleChoiseOption') ? this.props.element.customOptions.isSingleChoiseOption : false;
      var is_field_disabled = this.props.element.customOptions.hasOwnProperty('isFieldDisabled') ? this.props.element.customOptions.isFieldDisabled : false;
      var default_value = this.props.element.customOptions.hasOwnProperty('defaultValue') ? this.props.element.customOptions.defaultValue : "";
      var _this$props$element = this.props.element,
          canHaveOptionCorrect = _this$props$element.canHaveOptionCorrect,
          canHaveOptionValue = _this$props$element.canHaveOptionValue,
          hasDependentComponents = _this$props$element.hasDependentComponents;
      var this_files = this.props.files.length ? this.props.files : [];

      if (this_files.length < 1 || this_files.length > 0 && this_files[0].id !== '') {
        this_files.unshift({
          id: '',
          file_name: ''
        });
      }

      var editorState;

      if (this.props.element.hasOwnProperty('content')) {
        editorState = this.convertFromHTML(this.props.element.content);
      }

      if (this.props.element.hasOwnProperty('label')) {
        editorState = this.convertFromHTML(this.props.element.label);
      }

      var headerList = this.state.element.hasOwnProperty('headerList') ? this.state.element.headerList : [{
        headerId: 0,
        label: "Header Item"
      }];
      var rowCount = this.state.element.hasOwnProperty('rows') ? this.state.element.rows.length : 1;
      var isMaterialTable = elementKey.toLowerCase().includes("table");
      var isMaterialNumber = elementKey.toLowerCase().includes("number");
      var fieldVariant = !this.props.element.hasOwnProperty("fieldVariant") ? this.props.globalStyles.globalFieldVariant : this.props.element.fieldVariant;
      var inputFieldSize = this.props.element.inputFieldSize;
      var buttonType = this.props.element.buttonType;
      var textAlignment = this.props.element.textAlignment;
      var commonStyleOptions = elementKey.toLowerCase() == "text" || elementKey.toLowerCase() == "email" || elementKey.toLowerCase() == "number" || elementKey.toLowerCase() == "phone" || elementKey.toLowerCase() == "input_table" || elementKey.toLowerCase() == 'date_picker' || elementKey.toLowerCase() == 'configurable_list' ? true : false;
      var commonStyleFieldOptions = elementKey.toLowerCase() == "email" || elementKey.toLowerCase() == "number" || elementKey.toLowerCase() == 'dropdown' || elementKey.toLowerCase() == 'short_text' || elementKey.toLowerCase() == 'long_text' || elementKey.toLowerCase() == 'date_picker' || elementKey.toLowerCase() == 'section_header' || elementKey.toLowerCase() == 'Location_Coordinates' ? true : false;
      var classes = this.props.classes;
      var toolbarProps = {
        items: ['Short_Text', 'Long_Text', 'Button', 'Number', 'Dropdown', 'Email', 'Date_Picker', 'Time']
      };
      var isDisabled = this.state.element.customOptions.isFieldDisabled;
      var isdefaultValue = this.state.element.customOptions.defaultValue;
      return /*#__PURE__*/_react["default"].createElement(_styles.ThemeProvider, {
        theme: theme
      }, /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(_core.Grid, {
        container: true
      }, this.props.fromMainView ? /*#__PURE__*/_react["default"].createElement(_core.Grid, {
        item: true,
        xs: 12,
        sm: 8
      }, /*#__PURE__*/_react["default"].createElement(_ArrowBack["default"], {
        onClick: function onClick() {
          _this8.setPreviousValues();
        },
        style: {
          cursor: "pointer",
          color: "#bbb"
        }
      })) : null, this.props.fromMainView ? /*#__PURE__*/_react["default"].createElement(_core.Grid, {
        item: true,
        xs: 12,
        className: "my-3"
      }, /*#__PURE__*/_react["default"].createElement(_core.TextField, {
        disabled: true,
        fullWidth: true //size="small"
        ,
        variant: "outlined",
        id: "outlined-basic",
        label: "Component Type",
        value: this.state.element.customOptions.componentType,
        inputProps: {
          type: "text"
        }
      })) : null, elementKey !== "Tiles" && /*#__PURE__*/_react["default"].createElement(_core.Grid, {
        item: true,
        xs: 12,
        className: "mt-3"
      }, /*#__PURE__*/_react["default"].createElement(_styles.ThemeProvider, {
        theme: characterLimitHelperTheme
      }, /*#__PURE__*/_react["default"].createElement(_core.TextField, {
        required: true //size="small"
        ,
        variant: "outlined",
        id: "outlined-basic",
        label: "Display Label",
        value: this.state.element.label.split("_").join(" "),
        inputProps: {
          type: 'text' //maxlength: 24

        },
        fullWidth: true,
        onChange: this.onLabelChange.bind(this, 'label') // helperText={this.state.element.label.length > 24 ? <><Grid container justifyContent="space-between"><Grid item><p>Label name must not exceed 24 characters</p></Grid><Grid item><p>{this.state.element.label.length}/24</p></Grid></Grid></> : <p>{this.state.element.label.length}/24</p>}
        // error={this.state.element.label.length > 24 ? true : false}

      }))), elementKey === "Tiles" && /*#__PURE__*/_react["default"].createElement(_tilesOptions["default"], {
        updateElement: this.props.updateElement,
        preview: this.props.preview,
        element: this.props.element,
        addTilesOptions: this.addTilesOptions,
        removeTilesOptions: this.removeTilesOptions,
        key: this.props.element.customOptions.tileProperties.length,
        inputFieldSize: this.props.element.inputFieldSize,
        customOptions: this.state.element.customOptions,
        handleTilesOptions: this.handleTilesOptions
      }), elementKey !== "Tiles" && /*#__PURE__*/_react["default"].createElement(_core.Grid, {
        item: true,
        xs: 12
      }, " "), elementKey.toLowerCase() == "header" && /*#__PURE__*/_react["default"].createElement(_core.Grid, {
        item: true,
        xs: 12,
        sm: 12
      }, /*#__PURE__*/_react["default"].createElement(_core.FormControl, {
        component: "fieldset"
      }, /*#__PURE__*/_react["default"].createElement(_core.FormLabel, {
        component: "legend"
      }, "Input Field Alignment:"), /*#__PURE__*/_react["default"].createElement(_core.RadioGroup, {
        row: true,
        "aria-label": "material",
        name: "material",
        value: textAlignment,
        onChange: this.changeTextAlginment.bind(this)
      }, /*#__PURE__*/_react["default"].createElement(_core.FormControlLabel, {
        value: "left",
        control: /*#__PURE__*/_react["default"].createElement(_core.Radio, {
          color: "primary"
        }),
        label: "Left"
      }), /*#__PURE__*/_react["default"].createElement(_core.FormControlLabel, {
        value: "center",
        control: /*#__PURE__*/_react["default"].createElement(_core.Radio, {
          color: "primary"
        }),
        label: "Center"
      }), /*#__PURE__*/_react["default"].createElement(_core.FormControlLabel, {
        value: "right",
        control: /*#__PURE__*/_react["default"].createElement(_core.Radio, {
          color: "primary"
        }),
        label: "Right"
      })))), // NUMBER OPTIONS
      isMaterialNumber && /*#__PURE__*/_react["default"].createElement(_numberOptions["default"], {
        element: this.props.element,
        setNumberLimit: this.setNumberLimit
      }), // MANDATORY FIELD PROPERTY 
      elementKey != "Section_Header" && elementKey != "Page_Break" && elementKey != "Input_Table" && elementKey != "Button" && elementKey != "Attachment" && elementKey !== "Tiles" && elementKey !== "Configurable_List" && /*#__PURE__*/_react["default"].createElement(_core.Grid, {
        item: true,
        xs: 12,
        className: "mt-3"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        justifyContent: "space-around",
        alignItems: "center"
      }, /*#__PURE__*/_react["default"].createElement("h6", {
        className: classes.text1
      }, "Mandatory Field: "), /*#__PURE__*/_react["default"].createElement(_core.FormControlLabel, {
        name: "is_required" // style={{ position: "relative", top: "3px" }}
        ,
        control: /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_core.Button, {
          variant: "outlined",
          size: "small",
          name: "No" //className={this_required ? "checkedboxFill" : "primary"}
          ,
          color: this_required ? "default" : "primary" //style={{ outline: "none", textTransform: "capitalize" }}
          ,
          className: "ml-4 mr-2 ".concat(classes.btnStyle),
          onClick: this.editElementCustomOptionsProp.bind(this, "required", false)
        }, /*#__PURE__*/_react["default"].createElement("span", null, "No"), /*#__PURE__*/_react["default"].createElement(_core.Checkbox, {
          className: "p-0 ml-1",
          color: "primary",
          name: "No",
          icon: /*#__PURE__*/_react["default"].createElement(_RadioButtonUnchecked["default"], {
            className: "checkboxSize"
          }),
          checked: !this_required,
          checkedIcon: /*#__PURE__*/_react["default"].createElement(_CheckCircle["default"], {
            className: "checkboxSize"
          })
        })), /*#__PURE__*/_react["default"].createElement(_core.Button, {
          variant: "outlined",
          size: "small" //style={{ outline: "none" }}
          ,
          name: "Yes" //className={this_required ? "checkedboxFill" : "primary"}
          ,
          color: this_required ? "primary" : "default" //name="is_required"
          //className='ml-2 mr-2'
          ,
          className: "ml-2 mr-2 ".concat(classes.btnStyle),
          onClick: this.editElementCustomOptionsProp.bind(this, "required", true)
        }, /*#__PURE__*/_react["default"].createElement("span", null, "Yes"), /*#__PURE__*/_react["default"].createElement(_core.Checkbox, {
          className: "p-0 ml-1",
          color: "primary" // name="YES"
          ,
          name: "is_required",
          icon: /*#__PURE__*/_react["default"].createElement(_RadioButtonUnchecked["default"], {
            className: "checkboxSize"
          }),
          checked: this_required,
          checkedIcon: /*#__PURE__*/_react["default"].createElement(_CheckCircle["default"], {
            className: "checkboxSize"
          })
        })))
      }))), // MANDATORY FIELD PROPERTY 
      (elementKey === "Short_Text" || elementKey === "Long_Text") && /*#__PURE__*/_react["default"].createElement(_core.Grid, {
        item: true,
        xs: 12,
        className: "mt-3"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        justifyContent: "space-around",
        alignItems: "center"
      }, /*#__PURE__*/_react["default"].createElement(_core.TextField //size="small"
      , {
        type: "text",
        label: "Default value",
        variant: "outlined",
        fullWidth: true,
        defaultValue: default_value,
        onChange: this.setDefaultValue.bind(this, "defaultValue")
      }))), elementKey === "Number" && /*#__PURE__*/_react["default"].createElement(_core.Grid, {
        item: true,
        xs: 12,
        className: "mt-3"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        justifyContent: "space-around",
        alignItems: "center"
      }, /*#__PURE__*/_react["default"].createElement(_core.TextField //size="small"
      , {
        type: "number",
        label: "Default value",
        variant: "outlined",
        fullWidth: true,
        defaultValue: default_value,
        onChange: this.setDefaultValue.bind(this, "defaultValue")
      }))), (elementKey === "Short_Text" || elementKey === "Long_Text" || elementKey === "Number" || elementKey === "Attachment" || elementKey === "Video" || elementKey === "Location_Coordinates") && /*#__PURE__*/_react["default"].createElement("div", {
        className: "mt-3",
        justifyContent: "space-around",
        alignItems: "center"
      }, isdefaultValue && /*#__PURE__*/_react["default"].createElement("h6", {
        className: classes.text1
      }, "Disable Field: "), isdefaultValue && /*#__PURE__*/_react["default"].createElement(_core.FormControlLabel, {
        name: "is_field_disabled",
        control: /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_core.Button, {
          variant: "outlined",
          disabled: this.props.element.customOptions.defaultValue === "",
          size: "small",
          name: "No",
          color: is_field_disabled ? "default" : "primary",
          className: "ml-4 mr-2 ".concat(classes.btnStyle),
          onClick: this.editElementCustomOptionsProp.bind(this, "isFieldDisabled", false)
        }, /*#__PURE__*/_react["default"].createElement("span", null, "No"), /*#__PURE__*/_react["default"].createElement(_core.Checkbox, {
          className: "p-0 ml-1",
          color: "primary",
          name: "No",
          icon: /*#__PURE__*/_react["default"].createElement(_RadioButtonUnchecked["default"], {
            className: "checkboxSize"
          }),
          checked: !is_field_disabled,
          checkedIcon: /*#__PURE__*/_react["default"].createElement(_CheckCircle["default"], {
            className: "checkboxSize"
          })
        })), /*#__PURE__*/_react["default"].createElement(_core.Button, {
          variant: "outlined",
          size: "small",
          disabled: this.props.element.customOptions.defaultValue === "",
          name: "Yes",
          color: is_field_disabled ? "primary" : "default",
          className: "ml-2 mr-2 ".concat(classes.btnStyle),
          onClick: this.editElementCustomOptionsProp.bind(this, "isFieldDisabled", true)
        }, /*#__PURE__*/_react["default"].createElement("span", null, "Yes"), /*#__PURE__*/_react["default"].createElement(_core.Checkbox, {
          className: "p-0 ml-1",
          color: "primary",
          name: "Yes",
          icon: /*#__PURE__*/_react["default"].createElement(_RadioButtonUnchecked["default"], {
            className: "checkboxSize"
          }),
          checked: is_field_disabled,
          checkedIcon: /*#__PURE__*/_react["default"].createElement(_CheckCircle["default"], {
            className: "checkboxSize"
          })
        })))
      })), elementKey === "Attachment" && /*#__PURE__*/_react["default"].createElement(_Attachment["default"], {
        element: this.state.element,
        fileName: this.state.element.customOptions.fileName,
        handleFile: this.handleFile,
        handleDelete: this.handleDeleteFile
      }), elementKey === 'Video' && /*#__PURE__*/_react["default"].createElement(_Video["default"], {
        element: this.state.element,
        fileName: this.state.element.customOptions.fileName,
        handleVideoChange: this.handleVideoChange,
        handleDeleteVideo: this.handleDeleteVideo
      }), (elementKey === "Video" || elementKey === "Photo") && /*#__PURE__*/_react["default"].createElement(_core.Grid, {
        container: true
      }, /*#__PURE__*/_react["default"].createElement(_core.Grid, {
        item: true,
        xs: 12,
        className: "mt-3"
      }, /*#__PURE__*/_react["default"].createElement("h6", {
        className: classes.text1
      }, "Max Size:")), /*#__PURE__*/_react["default"].createElement(_core.Grid, {
        item: true,
        xs: 12,
        className: "mt-3"
      }, /*#__PURE__*/_react["default"].createElement(_core.TextField, {
        label: "Size",
        defaultValue: this.state.element.customOptions.maxSize,
        type: "number",
        variant: "outlined",
        fullWidth: true,
        onChange: this.handleMaxSize,
        inputProps: {
          min: 1,
          max: this.state.element.customOptions.max
        },
        InputProps: {
          endAdornment: /*#__PURE__*/_react["default"].createElement(_core.InputAdornment, {
            position: "end"
          }, "MB")
        }
      }))), elementKey === "Time" && /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_core.Grid, {
        item: true,
        xs: 12
      }, /*#__PURE__*/_react["default"].createElement(_styles.ThemeProvider, {
        theme: theme
      }, /*#__PURE__*/_react["default"].createElement(_core.FormControl, {
        component: "fieldset"
      }, /*#__PURE__*/_react["default"].createElement(_core.Grid, {
        item: true,
        xs: 12,
        className: "mt-3"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        justifyContent: "space-around",
        alignItems: "center"
      }, /*#__PURE__*/_react["default"].createElement("h6", {
        className: classes.text1
      }, "Time Format: "), /*#__PURE__*/_react["default"].createElement(_core.FormControlLabel, {
        this_required: this_required,
        name: "is_required",
        style: {
          position: "relative",
          top: "3px",
          marginLeft: "1px"
        },
        control: /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_core.Button, {
          variant: "outlined",
          size: "small",
          name: "NO",
          color: this_checked ? "default" : "primary",
          style: {
            outline: "none"
          },
          className: "mr-2",
          onChange: this.editElementCustomOptionsProp.bind(this, "checked", false)
        }, /*#__PURE__*/_react["default"].createElement("span", null, "24 Hours"), /*#__PURE__*/_react["default"].createElement(_core.Checkbox, {
          className: "p-0 ml-1",
          color: "primary",
          name: "NO",
          icon: /*#__PURE__*/_react["default"].createElement(_RadioButtonUnchecked["default"], {
            className: "checkboxSize"
          }),
          checked: !this_checked,
          checkedIcon: /*#__PURE__*/_react["default"].createElement(_CheckCircle["default"], {
            className: "checkboxSize"
          })
        })), /*#__PURE__*/_react["default"].createElement(_core.Button, {
          variant: "outlined",
          size: "small",
          style: {
            outline: "none"
          },
          name: "YES",
          color: this_checked ? "primary" : "default" //name="is_required"
          ,
          className: "ml-2",
          onChange: this.editElementCustomOptionsProp.bind(this, "checked", true)
        }, /*#__PURE__*/_react["default"].createElement("span", null, "AM/PM"), /*#__PURE__*/_react["default"].createElement(_core.Checkbox, {
          className: "p-0 ml-1",
          color: "primary" // name="YES"
          ,
          name: "is_required",
          icon: /*#__PURE__*/_react["default"].createElement(_RadioButtonUnchecked["default"], {
            className: "checkboxSize"
          }),
          checked: this_checked,
          checkedIcon: /*#__PURE__*/_react["default"].createElement(_CheckCircle["default"], {
            className: "checkboxSize"
          })
        })))
      }))))), /*#__PURE__*/_react["default"].createElement(_styles.ThemeProvider, {
        theme: theme
      }, /*#__PURE__*/_react["default"].createElement(_core.FormControl, {
        component: "fieldset",
        className: "mt-3"
      }, /*#__PURE__*/_react["default"].createElement("h6", {
        className: classes.text1
      }, "Default Time:"), /*#__PURE__*/_react["default"].createElement(_core.FormControlLabel, {
        this_required: this_required,
        name: "is_required",
        style: {
          position: "relative",
          top: "3px"
        },
        control: /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_core.Button, {
          variant: "outlined",
          size: "small",
          color: this.props.element.customOptions.defaultTime === "none" ? "primary" : "default",
          style: {
            outline: "none"
          },
          className: "ml-2 mr-2",
          onClick: this.setCutomeTime.bind(this, "none", "defaultTime")
        }, /*#__PURE__*/_react["default"].createElement("span", null, "None"), /*#__PURE__*/_react["default"].createElement(_core.Checkbox, {
          className: "p-0 ml-1",
          color: "primary",
          name: "NO",
          icon: /*#__PURE__*/_react["default"].createElement(_RadioButtonUnchecked["default"], {
            className: "checkboxSize"
          }),
          checked: this.props.element.customOptions.defaultTime === "none",
          checkedIcon: /*#__PURE__*/_react["default"].createElement(_CheckCircle["default"], {
            className: "checkboxSize"
          })
        })), /*#__PURE__*/_react["default"].createElement(_core.Button, {
          variant: "outlined",
          size: "small",
          style: {
            outline: "none"
          },
          color: this.props.element.customOptions.defaultTime === "current" ? "primary" : "default",
          name: "is_required",
          className: "ml-2 mr-2",
          onClick: this.setCutomeTime.bind(this, "current", "defaultTime")
        }, /*#__PURE__*/_react["default"].createElement("span", null, "Current"), /*#__PURE__*/_react["default"].createElement(_core.Checkbox, {
          className: "p-0 ml-1",
          color: "primary" // name="YES"
          ,
          name: "is_required",
          icon: /*#__PURE__*/_react["default"].createElement(_RadioButtonUnchecked["default"], {
            className: "checkboxSize"
          }),
          checked: this.props.element.customOptions.defaultTime === "current",
          checkedIcon: /*#__PURE__*/_react["default"].createElement(_CheckCircle["default"], {
            className: "checkboxSize"
          })
        })), /*#__PURE__*/_react["default"].createElement(_core.Button, {
          variant: "outlined",
          size: "small",
          style: {
            outline: "none"
          },
          color: this.props.element.customOptions.defaultTime === "custom" ? "primary" : "default",
          className: "ml-2 mr-2",
          onClick: this.setCutomeTime.bind(this, "custom", "defaultTime")
        }, /*#__PURE__*/_react["default"].createElement("span", null, "Custom"), /*#__PURE__*/_react["default"].createElement(_core.Checkbox, {
          className: "p-0 ml-1",
          color: "primary" // name="YES"
          ,
          name: "is_required",
          icon: /*#__PURE__*/_react["default"].createElement(_RadioButtonUnchecked["default"], {
            className: "checkboxSize"
          }),
          checked: this.props.element.customOptions.defaultTime === "custom",
          checkedIcon: /*#__PURE__*/_react["default"].createElement(_CheckCircle["default"], {
            className: "checkboxSize"
          })
        })))
      })), this.props.element.customOptions.defaultTime === "custom" && /*#__PURE__*/_react["default"].createElement(_core.Grid, {
        container: true,
        className: "mt-3"
      }, /*#__PURE__*/_react["default"].createElement(_pickers.MuiPickersUtilsProvider, {
        utils: _dateFns["default"]
      }, /*#__PURE__*/_react["default"].createElement(_pickers.TimePicker, {
        label: "Time",
        views: ["hours", "minutes"],
        value: this.state.selectedTime,
        onChange: this.handleTimeChange // error={this.state.selectedTime === null ? true : false }
        // value={propsData.customOptions.defaultTime === "none" ? "" : selectedDate}
        ,
        ampm: this.props.element.customOptions.checked ? true : false,
        inputVariant: "outlined",
        fullWidth: true,
        InputProps: {
          endAdornment: /*#__PURE__*/_react["default"].createElement(_core.InputAdornment, {
            position: "end"
          }, /*#__PURE__*/_react["default"].createElement(_core.IconButton, null, /*#__PURE__*/_react["default"].createElement(_icons.AccessTimeSharp, null)))
        }
      })))), /*#__PURE__*/_react["default"].createElement(_core.Grid, {
        item: true,
        xs: 12,
        className: "mt-4"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        justifyContent: "space-around",
        alignItems: "center"
      }, /*#__PURE__*/_react["default"].createElement("h6", {
        className: classes.text1
      }, "Disable Past Time: "), /*#__PURE__*/_react["default"].createElement(_core.FormControlLabel, {
        name: "disablePastTime",
        style: {
          position: "relative",
          top: "3px"
        },
        control: /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_core.Button, {
          variant: "outlined",
          size: "small",
          name: "NO",
          color: disable_time ? "default" : "primary",
          style: {
            outline: "none"
          },
          className: "ml-4 mr-2",
          onClick: this.editElementCustomOptionsProp.bind(this, "disableTime", false)
        }, /*#__PURE__*/_react["default"].createElement("span", null, "No"), /*#__PURE__*/_react["default"].createElement(_core.Checkbox, {
          className: "p-0 ml-1",
          color: "primary",
          name: "NO",
          icon: /*#__PURE__*/_react["default"].createElement(_RadioButtonUnchecked["default"], {
            className: "checkboxSize"
          }),
          checked: !disable_time,
          checkedIcon: /*#__PURE__*/_react["default"].createElement(_CheckCircle["default"], {
            className: "checkboxSize"
          })
        })), /*#__PURE__*/_react["default"].createElement(_core.Button, {
          variant: "outlined",
          size: "small",
          style: {
            outline: "none"
          },
          name: "YES",
          color: disable_time ? "primary" : "default" //name="is_required"
          ,
          className: "ml-2 mr-2",
          onClick: this.editElementCustomOptionsProp.bind(this, "disableTime", true)
        }, /*#__PURE__*/_react["default"].createElement("span", null, "Yes"), /*#__PURE__*/_react["default"].createElement(_core.Checkbox, {
          className: "p-0 ml-1",
          color: "primary" // name="YES"
          ,
          name: "is_required",
          icon: /*#__PURE__*/_react["default"].createElement(_RadioButtonUnchecked["default"], {
            className: "checkboxSize"
          }),
          checked: disable_time,
          checkedIcon: /*#__PURE__*/_react["default"].createElement(_CheckCircle["default"], {
            className: "checkboxSize"
          })
        })))
      }))))), //LOCATION MAP
      elementKey == "Location_Coordinates" && /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_core.Grid, {
        item: true,
        xs: 12,
        className: "mt-3"
      }, /*#__PURE__*/_react["default"].createElement(_locationMapOptions["default"], {
        element: this.props.element,
        setDisplayMapOptions: this.setDefaultOptions,
        editElementCustomOptionsProp: this.editElementCustomOptionsProp.bind(this)
      }), /*#__PURE__*/_react["default"].createElement("h6", {
        className: classes.text1
      }, "Default location: "), /*#__PURE__*/_react["default"].createElement(_core.Grid, {
        className: "mt-3",
        style: {
          position: "relative"
        }
      }, /*#__PURE__*/_react["default"].createElement(_location_coordinates["default"], {
        fromDisablePointView: true,
        data: this.props.element,
        handleLocationChange: this.setDefaultValue.bind(this, "defaultValue")
      }))), /*#__PURE__*/_react["default"].createElement(_core.Grid, {
        item: true,
        xs: 12,
        className: "mt-3"
      }, /*#__PURE__*/_react["default"].createElement(_core.TextField, {
        required: true //size="small"
        ,
        variant: "outlined",
        id: "outlined-basic",
        label: "Display text address Label",
        value: this.state.element.customOptions.addressLabel,
        onChange: function onChange(event) {
          return _this8.setDisplayOptions("addressLabel", event);
        },
        inputProps: {
          type: 'text'
        },
        fullWidth: true,
        helperText: !this.state.element.customOptions.addressLabel && "Required"
      })), /*#__PURE__*/_react["default"].createElement(_core.Grid, {
        item: true,
        xs: 12,
        className: "mt-3"
      })), elementKey.toLowerCase() === 'long_text' && /*#__PURE__*/_react["default"].createElement(_longTextOptions["default"], {
        element: this.state.element,
        setNumberLimit: this.setNumberLimit,
        setValidationType: this.setValidationType,
        editElementCustomOptionsProp: this.editElementCustomOptionsProp.bind(this)
      }), elementKey.toLowerCase() === 'photo_prepost' && /*#__PURE__*/_react["default"].createElement(_photoPrePostOptions["default"], {
        element: this.state.element,
        editElementCustomOptionsProp: this.editElementCustomOptionsProp.bind(this)
      }), // ATTACHMENTS
      elementKey == "Attachment" && /*#__PURE__*/_react["default"].createElement(_core.Grid, {
        item: true,
        xs: 12,
        className: "mt-3 mb-2"
      }, /*#__PURE__*/_react["default"].createElement("h6", {
        className: classes.attachmentText
      }, "Attachment Type "), /*#__PURE__*/_react["default"].createElement(_core.Grid, {
        container: true,
        justifyContent: "space-between"
      }, this.state.Attachments.map(function (x) {
        var _this8$state$element$, _this8$state$element$2;

        return /*#__PURE__*/_react["default"].createElement(_core.Grid, {
          item: true,
          xs: 12,
          sm: 6,
          className: "mt-3"
        }, /*#__PURE__*/_react["default"].createElement(_core.FormControlLabel, {
          label: x.name,
          className: _this8.state.element.customOptions.Attachment && ((_this8$state$element$ = _this8.state.element.customOptions.Attachment) === null || _this8$state$element$ === void 0 ? void 0 : _this8$state$element$.length) > 2 ? classes.attachmentEnabled : (_this8$state$element$2 = _this8.state.element.customOptions.Attachment) !== null && _this8$state$element$2 !== void 0 && _this8$state$element$2.includes("".concat(x.name)) ? classes.attachmentEnabled : classes.attachment,
          control: /*#__PURE__*/_react["default"].createElement(_core.Checkbox, {
            onChange: _this8.handleAttachments // checked={ this.state.element.customOptions.Attachment.includes(`${x.name}`) }
            ,
            style: {
              display: "none"
            },
            value: x.name,
            name: x.name,
            color: "primary"
          })
        }));
      }))), // PHONE OPTIONS
      elementKey == "Phone" && /*#__PURE__*/_react["default"].createElement(_core.Grid, {
        item: true,
        xs: 12
      }, /*#__PURE__*/_react["default"].createElement(_phoneOptions["default"] // this_mask={this_mask} 
      , {
        c_code: c_code,
        editElementCustomOptionsProp: this.editElementCustomOptionsProp.bind(this)
      })), // SINGLE CHOICE OPTIONS
      this.props.element.hasOwnProperty('singleChoiceOptions') && this.props.element.singleChoiceOptions.length > 0 && elementKey === "Single_Choice" && /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_singleChoiceOptions["default"], {
        showCorrectColumn: this.props.showCorrectColumn,
        canHaveOptionCorrect: canHaveOptionCorrect,
        canHaveOptionValue: canHaveOptionValue,
        data: this.props.preview.state.data,
        updateElement: this.props.updateElement,
        preview: this.props.preview,
        element: this.props.element,
        key: this.props.element.singleChoiceOptions.length
      }), /*#__PURE__*/_react["default"].createElement(_core.Grid, {
        item: true,
        xs: 12,
        className: "mt-3"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        justifyContent: "space-around",
        alignItems: "center"
      }, /*#__PURE__*/_react["default"].createElement("h6", {
        className: classes.text1
      }, "Display Other option "), /*#__PURE__*/_react["default"].createElement(_core.FormControlLabel, {
        style: {
          marginTop: "3px"
        },
        control: /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_core.Button, {
          variant: "outlined",
          size: "small",
          name: "NO",
          color: check_List ? "default" : "primary",
          className: "".concat(classes.btnStyle, " ml-4 mr-2"),
          onClick: this.toggleOtherOption.bind(this, "isSingleChoiseOption", false)
        }, /*#__PURE__*/_react["default"].createElement("span", null, "No"), /*#__PURE__*/_react["default"].createElement(_core.Checkbox, {
          className: "p-0 ml-1",
          color: "primary",
          name: "NO",
          icon: /*#__PURE__*/_react["default"].createElement(_RadioButtonUnchecked["default"], {
            className: "checkboxSize"
          }),
          checked: !check_List,
          checkedIcon: /*#__PURE__*/_react["default"].createElement(_CheckCircle["default"], {
            className: "checkboxSize"
          })
        })), /*#__PURE__*/_react["default"].createElement(_core.Button, {
          variant: "outlined",
          size: "small" //style={{ position: "relative", top: "3px" }}
          ,
          name: "YES",
          color: check_List ? "primary" : "default",
          className: "".concat(classes.btnStyle, " ml-2 mr-2"),
          onClick: this.toggleOtherOption.bind(this, "isSingleChoiseOption", true)
        }, /*#__PURE__*/_react["default"].createElement("span", null, "Yes"), /*#__PURE__*/_react["default"].createElement(_core.Checkbox, {
          className: "p-0 ml-1",
          color: "primary" // name="YES"
          ,
          icon: /*#__PURE__*/_react["default"].createElement(_RadioButtonUnchecked["default"], {
            className: "checkboxSize"
          }),
          checked: check_List,
          checkedIcon: /*#__PURE__*/_react["default"].createElement(_CheckCircle["default"], {
            className: "checkboxSize"
          })
        })))
      })))), elementKey === "Date_Picker" && /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_core.Grid, {
        item: true,
        xs: 12,
        className: "mt-3"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        justifyContent: "space-around",
        alignItems: "center"
      }, /*#__PURE__*/_react["default"].createElement("h6", {
        className: classes.text1
      }, "Read-Only Type: "), /*#__PURE__*/_react["default"].createElement(_core.FormControlLabel, {
        name: "readOnly",
        style: {
          position: "relative",
          top: "3px"
        },
        control: /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_core.Button, {
          variant: "outlined",
          size: "small",
          name: "No",
          color: readOnly ? "default" : "primary" //style={{ outline: "none" }}
          //className='ml-4 mr-2'
          ,
          className: "ml-4 mr-2 ".concat(classes.btnStyle),
          onClick: this.editElementCustomOptionsProp.bind(this, "readOnly", false)
        }, /*#__PURE__*/_react["default"].createElement("span", null, "No"), /*#__PURE__*/_react["default"].createElement(_core.Checkbox, {
          className: "p-0 ml-1",
          color: "primary",
          name: "No",
          icon: /*#__PURE__*/_react["default"].createElement(_RadioButtonUnchecked["default"], {
            className: "checkboxSize"
          }),
          checked: !readOnly,
          checkedIcon: /*#__PURE__*/_react["default"].createElement(_CheckCircle["default"], {
            className: "checkboxSize"
          })
        })), /*#__PURE__*/_react["default"].createElement(_core.Button, {
          variant: "outlined",
          size: "small" //style={{ outline: "none" }}
          ,
          name: "Yes",
          color: readOnly ? "primary" : "default" //className='ml-2 mr-2'
          ,
          className: "ml-2 mr-2 ".concat(classes.btnStyle),
          onClick: this.editElementCustomOptionsProp.bind(this, "readOnly", true)
        }, /*#__PURE__*/_react["default"].createElement("span", null, "Yes"), /*#__PURE__*/_react["default"].createElement(_core.Checkbox, {
          className: "p-0 ml-1",
          color: "primary" // name="YES"
          ,
          name: "readOnly",
          icon: /*#__PURE__*/_react["default"].createElement(_RadioButtonUnchecked["default"], {
            className: "checkboxSize"
          }),
          checked: readOnly,
          checkedIcon: /*#__PURE__*/_react["default"].createElement(_CheckCircle["default"], {
            className: "checkboxSize"
          })
        })))
      }))), /*#__PURE__*/_react["default"].createElement(_datepickerOptions["default"], {
        data: this.props.preview.state.data,
        preview: this.props.preview,
        updateElement: this.props.updateElement,
        classes: this.props.classes,
        element: this.props.element
      }), /*#__PURE__*/_react["default"].createElement(_core.Grid, {
        item: true,
        xs: 12
      }, /*#__PURE__*/_react["default"].createElement("div", {
        justifyContent: "space-around",
        alignItems: "center"
      }, /*#__PURE__*/_react["default"].createElement("h6", {
        className: classes.text1
      }, "Disable Past Dates: "), /*#__PURE__*/_react["default"].createElement(_core.FormControlLabel, {
        name: "disablePastDates",
        style: {
          position: "relative",
          top: "3px"
        },
        control: /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_core.Button, {
          variant: "outlined",
          size: "small",
          name: "No",
          color: disablePastDates ? "default" : "primary" //style={{ outline: "none" }}
          //className='ml-4 mr-2'
          ,
          className: "ml-4 mr-2 ".concat(classes.btnStyle),
          onClick: this.editElementCustomOptionsProp.bind(this, "disablePastDates", false)
        }, /*#__PURE__*/_react["default"].createElement("span", null, "No"), /*#__PURE__*/_react["default"].createElement(_core.Checkbox, {
          className: "p-0 ml-1",
          color: "primary",
          name: "No",
          icon: /*#__PURE__*/_react["default"].createElement(_RadioButtonUnchecked["default"], {
            className: "checkboxSize"
          }),
          checked: !disablePastDates,
          checkedIcon: /*#__PURE__*/_react["default"].createElement(_CheckCircle["default"], {
            className: "checkboxSize"
          })
        })), /*#__PURE__*/_react["default"].createElement(_core.Button, {
          variant: "outlined",
          size: "small" //style={{ outline: "none" }}
          ,
          name: "Yes",
          color: disablePastDates ? "primary" : "default" //className='ml-2 mr-2'
          ,
          className: "ml-2 mr-2 ".concat(classes.btnStyle),
          onClick: this.editElementCustomOptionsProp.bind(this, "disablePastDates", true)
        }, /*#__PURE__*/_react["default"].createElement("span", null, "Yes"), /*#__PURE__*/_react["default"].createElement(_core.Checkbox, {
          className: "p-0 ml-1",
          color: "primary" // name="Yes"
          ,
          name: "disablePastDates",
          icon: /*#__PURE__*/_react["default"].createElement(_RadioButtonUnchecked["default"], {
            className: "checkboxSize"
          }),
          checked: disablePastDates,
          checkedIcon: /*#__PURE__*/_react["default"].createElement(_CheckCircle["default"], {
            className: "checkboxSize"
          })
        })))
      })))), elementKey === "Configurable_List" && /*#__PURE__*/_react["default"].createElement(_core.Grid, {
        item: true,
        xs: 12
      }, /*#__PURE__*/_react["default"].createElement(_configurableListOptions["default"], (0, _extends2["default"])({
        showCorrectColumn: this.props.showCorrectColumn,
        canHaveOptionCorrect: canHaveOptionCorrect,
        canHaveOptionValue: canHaveOptionValue,
        data: this.props.preview.state.data,
        preview: this.props.preview,
        element: this.props.element
      }, toolbarProps, {
        customOptions: this.state.element.customOptions,
        handleTableOptions: this.handleTableOptions,
        addTableOptions: this.addTableOptions,
        removeTableOptions: this.removeTableOptions
      }))), elementKey === "Button_Radios" && /*#__PURE__*/_react["default"].createElement(_buttonRadiosOptions["default"], {
        showCorrectColumn: this.props.showCorrectColumn,
        canHaveOptionCorrect: canHaveOptionCorrect,
        canHaveOptionValue: canHaveOptionValue,
        data: this.props.preview.state.data,
        preview: this.props.preview,
        element: this.props.element
      }), elementKey === "Button" && /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_core.FormControl, {
        component: "fieldset"
      }, /*#__PURE__*/_react["default"].createElement(_core.Grid, {
        container: true,
        justifyContent: "flex-start"
      }, /*#__PURE__*/_react["default"].createElement(_core.Grid, {
        item: true,
        className: "mr-2 mt-4"
      }, /*#__PURE__*/_react["default"].createElement("h5", {
        className: classes.text
      }, "Button Type: ")), /*#__PURE__*/_react["default"].createElement(_core.Grid, {
        item: true
      }, /*#__PURE__*/_react["default"].createElement(_core.RadioGroup, {
        row: true,
        "aria-label": "material",
        name: "material",
        value: buttonType,
        onChange: this.changeButtonType.bind(this)
      }, /*#__PURE__*/_react["default"].createElement(_core.FormControlLabel, {
        style: {
          marginRight: "10px",
          marginBottom: '0.5rem'
        },
        label: "Primary",
        labelPlacement: "start",
        value: "primary",
        className: buttonType === "primary" ? classes.checked : classes.unchecked,
        control: /*#__PURE__*/_react["default"].createElement(_core.Radio, {
          color: "primary",
          icon: /*#__PURE__*/_react["default"].createElement(_RadioButtonUnchecked["default"], {
            className: "checkboxSize"
          }),
          checkedIcon: /*#__PURE__*/_react["default"].createElement(_CheckCircle["default"], {
            className: "checkboxSize"
          })
        })
      }), /*#__PURE__*/_react["default"].createElement(_core.FormControlLabel, {
        style: {
          marginRight: "10px",
          marginBottom: '0.5rem'
        },
        value: "secondary",
        labelPlacement: "start",
        className: buttonType === "secondary" ? classes.checked : classes.unchecked,
        label: "Secondary",
        control: /*#__PURE__*/_react["default"].createElement(_core.Radio, {
          color: "primary",
          icon: /*#__PURE__*/_react["default"].createElement(_RadioButtonUnchecked["default"], {
            className: "checkboxSize"
          }),
          checkedIcon: /*#__PURE__*/_react["default"].createElement(_CheckCircle["default"], {
            className: "checkboxSize"
          })
        })
      }), /*#__PURE__*/_react["default"].createElement(_core.FormControlLabel, {
        style: {
          marginRight: "10px",
          marginBottom: '0.5rem'
        },
        value: "hyperlink",
        labelPlacement: "start",
        className: buttonType === "hyperlink" ? classes.checked : classes.unchecked,
        label: "Hyperlink",
        control: /*#__PURE__*/_react["default"].createElement(_core.Radio, {
          color: "primary",
          icon: /*#__PURE__*/_react["default"].createElement(_RadioButtonUnchecked["default"], {
            className: "checkboxSize"
          }),
          checkedIcon: /*#__PURE__*/_react["default"].createElement(_CheckCircle["default"], {
            className: "checkboxSize"
          })
        })
      })))), this.state.element.buttonType === 'hyperlink' && /*#__PURE__*/_react["default"].createElement(_core.TextField, {
        className: "mt-2",
        variant: "outlined",
        fullWidth: true // label="Add Hyperlink"
        ,
        placeholder: "Add Hyperlink",
        value: this.state.element.customOptions.Hyperlink,
        onChange: function onChange(e) {
          _this8.handleHyperlink(e);
        },
        type: "text"
      })), /*#__PURE__*/_react["default"].createElement(_core.Grid, {
        item: true,
        xs: 12,
        className: "my-3"
      }, /*#__PURE__*/_react["default"].createElement(_core.TextField, {
        className: "mt-2",
        variant: "outlined",
        fullWidth: true,
        label: "Button Action",
        value: this.state.element.customOptions.buttonAction,
        onChange: this.setDefaultValue.bind(this, "buttonAction"),
        type: "text"
      }))), elementKey === "Tab_Break" && /*#__PURE__*/_react["default"].createElement(_tabsOptions["default"], {
        showCorrectColumn: this.props.showCorrectColumn,
        canHaveOptionCorrect: canHaveOptionCorrect,
        canHaveOptionValue: canHaveOptionValue,
        data: this.props.preview.state.data,
        preview: this.props.preview,
        element: this.props.element
      }), // Check List Options
      elementKey === "Check_List" && /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_core.Grid, {
        item: true,
        xs: 12
      }, /*#__PURE__*/_react["default"].createElement(_checklistOptions["default"], {
        showCorrectColumn: this.props.showCorrectColumn,
        canHaveOptionCorrect: canHaveOptionCorrect,
        canHaveOptionValue: canHaveOptionValue,
        data: this.props.preview.state.data,
        preview: this.props.preview,
        element: this.props.element,
        key: this.props.element.checkListOptions.length
      }), /*#__PURE__*/_react["default"].createElement(_core.Grid, {
        style: {
          marginTop: "20px"
        },
        justifyContent: "space-around",
        alignItems: "center",
        className: "mb-2"
      }, /*#__PURE__*/_react["default"].createElement("h6", {
        className: classes.text1
      }, "Display Other option:"), /*#__PURE__*/_react["default"].createElement(_core.FormControlLabel, {
        control: /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_core.Button, {
          variant: "outlined",
          size: "small",
          name: "NO",
          color: checkList ? "default" : "primary",
          style: {
            outline: "none"
          },
          className: "".concat(classes.btnStyle, " ml-4 mr-2"),
          onClick: this.toggleCheckListOtherOption.bind(this, 'isOtherOption', false)
        }, /*#__PURE__*/_react["default"].createElement("span", null, "No"), /*#__PURE__*/_react["default"].createElement(_core.Checkbox, {
          className: "p-0 ml-1",
          color: "primary",
          name: "NO",
          icon: /*#__PURE__*/_react["default"].createElement(_RadioButtonUnchecked["default"], {
            className: "checkboxSize"
          }),
          checked: !checkList,
          checkedIcon: /*#__PURE__*/_react["default"].createElement(_CheckCircle["default"], {
            className: "checkboxSize"
          })
        })), /*#__PURE__*/_react["default"].createElement(_core.Button, {
          variant: "outlined",
          size: "small",
          style: {
            outline: "none"
          },
          name: "YES",
          color: checkList ? "primary" : "default",
          className: "".concat(classes.btnStyle, " ml-2 mr-2"),
          onClick: this.toggleCheckListOtherOption.bind(this, 'isOtherOption', true)
        }, /*#__PURE__*/_react["default"].createElement("span", null, "Yes"), /*#__PURE__*/_react["default"].createElement(_core.Checkbox, {
          className: "p-0 ml-1",
          color: "primary" // name="YES"
          ,
          name: "is_required",
          icon: /*#__PURE__*/_react["default"].createElement(_RadioButtonUnchecked["default"], {
            className: "checkboxSize"
          }),
          checked: checkList,
          checkedIcon: /*#__PURE__*/_react["default"].createElement(_CheckCircle["default"], {
            className: "checkboxSize"
          })
        })))
      })), this.props.element.customOptions.isOtherOption && /*#__PURE__*/_react["default"].createElement(_core.Grid, null, /*#__PURE__*/_react["default"].createElement(_core.TextField, {
        className: "mt-2" //size="small"
        ,
        variant: "outlined",
        fullWidth: true,
        id: "outlined-basic",
        label: "Other",
        value: this.props.element.customOptions.otherOptionText,
        onChange: this.setOtherOptionText.bind(this, "otherOptionText"),
        inputProps: {
          type: 'text'
        }
      })))), // SECTION HEADER OPTIONS
      elementKey == "Section_Header" && /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("h6", {
        className: "".concat(classes.text1, " mt-2 mb-2")
      }, "Section Header Options: "), /*#__PURE__*/_react["default"].createElement(_core.TextField, {
        fullWidth: true,
        variant: "outlined",
        type: "color",
        id: "favcolor",
        name: "favcolor",
        value: sectionHeaderBGColor,
        onChange: function onChange(e) {
          return _this8.pickColor(e, "sectionHeaderBGColor");
        },
        inputProps: {
          style: {
            paddingTop: 1,
            paddingRight: 5,
            paddingBottom: 1,
            paddingLeft: 5,
            height: 48
          }
        }
      }), /*#__PURE__*/_react["default"].createElement("p", {
        style: {
          marginLeft: '4rem',
          marginBottom: '14rem',
          opacity: "0.6"
        }
      }, "Pick a color for Section Header Background")), // INPUT TABLE OPTIONS
      isMaterialTable && /*#__PURE__*/_react["default"].createElement(_core.Grid, {
        item: true,
        xs: 12
      }, /*#__PURE__*/_react["default"].createElement(_inputTableOptions["default"], {
        showCorrectColumn: this.props.showCorrectColumn,
        canHaveOptionCorrect: canHaveOptionCorrect,
        canHaveOptionValue: canHaveOptionValue,
        data: this.props.preview.state.data,
        preview: this.props.preview,
        element: this.props.element
      }))), this.props.element.hasOwnProperty('file_path') && /*#__PURE__*/_react["default"].createElement("div", {
        className: "form-group"
      }, /*#__PURE__*/_react["default"].createElement("label", {
        className: "control-label",
        htmlFor: "fileSelect"
      }, "Choose file:"), /*#__PURE__*/_react["default"].createElement("select", {
        id: "fileSelect",
        className: "form-control",
        defaultValue: this.props.element.file_path,
        onBlur: this.updateElement.bind(this),
        onChange: this.editElementProp.bind(this, 'file_path', 'value')
      }, this_files.map(function (file) {
        var this_key = "file_".concat(file.id);
        return /*#__PURE__*/_react["default"].createElement("option", {
          value: file.id,
          key: this_key
        }, file.file_name);
      }))), this.props.element.hasOwnProperty('src') && /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("div", {
        className: "form-group"
      }, /*#__PURE__*/_react["default"].createElement("label", {
        className: "control-label",
        htmlFor: "srcInput"
      }, "Link to:"), /*#__PURE__*/_react["default"].createElement("input", {
        id: "srcInput",
        type: "text",
        className: "form-control",
        defaultValue: this.props.element.src,
        onBlur: this.updateElement.bind(this),
        onChange: this.editElementProp.bind(this, 'src', 'value')
      })), /*#__PURE__*/_react["default"].createElement("div", {
        className: "form-group"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "custom-control custom-checkbox"
      }, /*#__PURE__*/_react["default"].createElement("input", {
        id: "do-center",
        className: "custom-control-input",
        type: "checkbox",
        checked: this_checked_center,
        value: true,
        onChange: this.editElementProp.bind(this, 'center', 'checked')
      }), /*#__PURE__*/_react["default"].createElement("label", {
        className: "custom-control-label",
        htmlFor: "do-center"
      }, "Center?"))), /*#__PURE__*/_react["default"].createElement("div", {
        className: "row"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "col-sm-3"
      }, /*#__PURE__*/_react["default"].createElement("label", {
        className: "control-label",
        htmlFor: "elementWidth"
      }, "Width:"), /*#__PURE__*/_react["default"].createElement("input", {
        id: "elementWidth",
        type: "text",
        className: "form-control",
        defaultValue: this.props.element.width,
        onBlur: this.updateElement.bind(this),
        onChange: this.editElementProp.bind(this, 'width', 'value')
      })), /*#__PURE__*/_react["default"].createElement("div", {
        className: "col-sm-3"
      }, /*#__PURE__*/_react["default"].createElement("label", {
        className: "control-label",
        htmlFor: "elementHeight"
      }, "Height:"), /*#__PURE__*/_react["default"].createElement("input", {
        id: "elementHeight",
        type: "text",
        className: "form-control",
        defaultValue: this.props.element.height,
        onBlur: this.updateElement.bind(this),
        onChange: this.editElementProp.bind(this, 'height', 'value')
      })))), this.props.element.hasOwnProperty('label') && /*#__PURE__*/_react["default"].createElement("div", {
        className: "form-group",
        style: {
          marginTop: "2em"
        }
      }, elementKey == "Text" || elementKey == "Short_Text" && /*#__PURE__*/_react["default"].createElement(_core.Grid, {
        container: true,
        direction: "row"
      }, validation === "Alphabetic" || validation === "AlphaNumeric" || validation === "Numeric" || validation === "None" ? /*#__PURE__*/_react["default"].createElement(_core.Grid, {
        item: true,
        xs: 12,
        className: "mb-3"
      }, !isDisabled && /*#__PURE__*/_react["default"].createElement(_core.TextField //size="small"
      // disabled={this.state.element.customOptions.isFieldDisabled}
      , {
        type: "number",
        label: "Set Text Size",
        variant: "outlined",
        fullWidth: true,
        defaultValue: charLimit,
        onChange: this.setChatLimit.bind(this, "charLimit"),
        inputProps: {
          maxLength: charLimit,
          min: 0,
          pattern: "[0-9]*"
        },
        error: charLimit > 250 || charLimit < 0 || charLimit == "" ? true : false,
        helperText: charLimit > 250 ? "Text size should be less than 250 characters" : charLimit < 0 || charLimit == "" ? "Text size should be greater than 0" : null
      })) : null), this.props.element.element == "Dropdown" && /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("div", {
        className: "form-group pb-4",
        style: {
          borderBottom: "1px solid #bebebe"
        }
      }, /*#__PURE__*/_react["default"].createElement(_core.TextField, {
        label: "Options",
        variant: "outlined",
        type: "text",
        multiline: true //className="form-control"
        ,
        id: "questionDescription",
        fullWidth: true,
        defaultValue: this.props.element.dropDownOptions.filter(function (x) {
          return !_this8.props.element.customOptions.uploadedOptions.filter(function (y) {
            return y.value === x.value;
          }).length;
        }).map(function (el) {
          return el.value;
        }).join("\n"),
        onBlur: this.updateElement.bind(this),
        onChange: this.textAreaHandleChange,
        className: "mb-1"
      }), /*#__PURE__*/_react["default"].createElement(_core.Typography, {
        className: "ml-4"
      }, /*#__PURE__*/_react["default"].createElement("ul", {
        style: {
          fontSize: "small",
          opacity: "0.6"
        }
      }, /*#__PURE__*/_react["default"].createElement("li", null, "Enter the list of the dropdown options."), /*#__PURE__*/_react["default"].createElement("li", null, "Separate each options by new line.")))), /*#__PURE__*/_react["default"].createElement(_core.Grid, {
        item: true,
        xs: 12,
        className: "pt-4"
      }, /*#__PURE__*/_react["default"].createElement(_core.FormControl, {
        component: "fieldset"
      }, /*#__PURE__*/_react["default"].createElement(_core.Grid, {
        container: true,
        justifyContent: "flex-start"
      }, /*#__PURE__*/_react["default"].createElement(_core.Grid, {
        item: true,
        className: "mr-2"
      }, /*#__PURE__*/_react["default"].createElement("h6", {
        className: classes.text
      }, "Dropdown Data:")), /*#__PURE__*/_react["default"].createElement(_core.Grid, {
        item: true
      }, /*#__PURE__*/_react["default"].createElement(_core.RadioGroup, {
        row: true,
        "aria-label": "material",
        name: "material",
        value: this.props.element.customOptions.dataOptions,
        onChange: this.handleDropdownDataOptions
      }, /*#__PURE__*/_react["default"].createElement(_core.FormControlLabel, {
        value: "mastersheet",
        style: {
          marginRight: "12px"
        },
        className: this.props.element.customOptions.dataOptions === "mastersheet" ? classes.checked : classes.unchecked,
        control: /*#__PURE__*/_react["default"].createElement(_core.Radio, {
          color: "primary",
          icon: /*#__PURE__*/_react["default"].createElement(_RadioButtonUnchecked["default"], null),
          checkedIcon: /*#__PURE__*/_react["default"].createElement(_CheckCircle["default"], null)
        }),
        label: "Use Master Sheet",
        labelPlacement: "start"
      }), /*#__PURE__*/_react["default"].createElement(_core.FormControlLabel, {
        value: "options",
        className: this.props.element.customOptions.dataOptions === "options" ? classes.checked : classes.unchecked,
        control: /*#__PURE__*/_react["default"].createElement(_core.Radio, {
          color: "primary",
          icon: /*#__PURE__*/_react["default"].createElement(_RadioButtonUnchecked["default"], null),
          checkedIcon: /*#__PURE__*/_react["default"].createElement(_CheckCircle["default"], null)
        }),
        label: "Enter Options",
        labelPlacement: "start"
      })))))), this.props.element.customOptions.dataOptions === "mastersheet" ? /*#__PURE__*/_react["default"].createElement(_dropdownOptions["default"], {
        dropDownOptions: this.props.element.dropDownOptions,
        classes: classes,
        handleDropdownDataOptions: this.handleDropdownDataOptions,
        element: this.props.element,
        handledropDownOptions: this.handledropDownOptions,
        handleDownload: this.props.element.customOptions.download
      }) : /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_core.FormGroup, {
        className: "pt-4"
      }, /*#__PURE__*/_react["default"].createElement(_core.FormControl, {
        fullWidth: true,
        variant: "outlined",
        style: {
          marginTop: "10px"
        }
      }, /*#__PURE__*/_react["default"].createElement(_core.InputLabel, {
        id: "defaultSelect"
      }, "Select By Default"), /*#__PURE__*/_react["default"].createElement(_core.Select, {
        labelId: "defaultSelect",
        id: "defaultSelect",
        defaultValue: "none",
        label: "Select By Default",
        value: this.state.element.customOptions.defaultOptions,
        onChange: function onChange(event) {
          return _this8.setDefaultOptions("defaultOptions", event);
        }
      }, /*#__PURE__*/_react["default"].createElement(_core.MenuItem, {
        value: "none"
      }, "None"), this.state.element.dropDownOptions.map(function (file) {
        return /*#__PURE__*/_react["default"].createElement(_core.MenuItem, {
          key: file.key,
          value: file.value
        }, " ", file.value, " ");
      })))), /*#__PURE__*/_react["default"].createElement(_core.Grid, {
        item: true,
        xs: 12,
        className: "mt-4"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        style: {
          display: 'flex'
        },
        justifyContent: "space-around",
        alignItems: "center"
      }, /*#__PURE__*/_react["default"].createElement("h6", {
        className: classes.text1,
        style: {
          marginRight: '7px'
        }
      }, "Show Text in Empty Option: "), /*#__PURE__*/_react["default"].createElement(_core.FormControlLabel, {
        style: {
          position: "relative",
          bottom: "3px"
        },
        control: /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_core.Button, {
          variant: "outlined",
          size: "small",
          name: "NO",
          color: this_show_empty_text ? "default" : "primary",
          style: {
            outline: "none"
          },
          className: "".concat(classes.btnStyle, " ml-2 mr-2"),
          onClick: this.editElementCustomOptionsProp.bind(this, "showEmptyTextOption", false)
        }, /*#__PURE__*/_react["default"].createElement("span", null, "No"), /*#__PURE__*/_react["default"].createElement(_core.Checkbox, {
          className: "p-0 ml-1",
          color: "primary",
          name: "NO",
          icon: /*#__PURE__*/_react["default"].createElement(_RadioButtonUnchecked["default"], {
            className: "checkboxSize"
          }),
          checked: !this_show_empty_text,
          checkedIcon: /*#__PURE__*/_react["default"].createElement(_CheckCircle["default"], {
            className: "checkboxSize"
          })
        })), /*#__PURE__*/_react["default"].createElement(_core.Button, {
          variant: "outlined",
          size: "small",
          style: {
            outline: "none"
          },
          name: "YES",
          color: this_show_empty_text ? "primary" : "default" //name="this_show_empty_text"
          ,
          className: "".concat(classes.btnStyle, " ml-2 mr-2"),
          onClick: this.editElementCustomOptionsProp.bind(this, "showEmptyTextOption", true)
        }, /*#__PURE__*/_react["default"].createElement("span", null, "Yes"), /*#__PURE__*/_react["default"].createElement(_core.Checkbox, {
          className: "p-0 ml-1",
          color: "primary" // name="YES"
          ,
          name: "this_show_empty_text",
          icon: /*#__PURE__*/_react["default"].createElement(_RadioButtonUnchecked["default"], {
            className: "checkboxSize"
          }),
          checked: this_show_empty_text,
          checkedIcon: /*#__PURE__*/_react["default"].createElement(_CheckCircle["default"], {
            className: "checkboxSize"
          })
        })))
      }))), this_show_empty_text && /*#__PURE__*/_react["default"].createElement(_core.TextField, {
        variant: "outlined",
        type: "text",
        label: "Empty Option Text",
        fullWidth: true,
        className: "mt-2",
        value: this.state.element.emptyOptionText,
        onChange: this.setEmptyText.bind(this, "emptyOptionText")
      })), this.state.element.dropDownOptions && this.state.element.dropDownOptions.length && this.state.element.dropDownOptions.some(function (v) {
        return v.label;
      }) ? /*#__PURE__*/_react["default"].createElement(_core.Grid, {
        item: true,
        xs: 12,
        className: "mt-4"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        style: {
          display: 'flex'
        },
        justifyContent: "space-around",
        alignItems: "center"
      }, /*#__PURE__*/_react["default"].createElement("h6", {
        className: classes.text1,
        style: {
          marginRight: '7px'
        }
      }, "Create Dependent Components"), /*#__PURE__*/_react["default"].createElement(_core.FormControlLabel, {
        style: {
          position: "relative",
          bottom: "3px"
        },
        control: /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_core.Button, {
          variant: "outlined",
          size: "small",
          name: "NO",
          color: hasDependentComponents ? "default" : "primary",
          style: {
            outline: "none"
          },
          className: "".concat(classes.btnStyle, " ml-2 mr-2"),
          onClick: this.editElementCustomOptionsProp.bind(this, "hasDependentComponents", false)
        }, /*#__PURE__*/_react["default"].createElement("span", null, "No"), /*#__PURE__*/_react["default"].createElement(_core.Checkbox, {
          className: "p-0 ml-1",
          color: "primary",
          name: "NO",
          icon: /*#__PURE__*/_react["default"].createElement(_RadioButtonUnchecked["default"], {
            className: "checkboxSize"
          }),
          checked: !hasDependentComponents,
          checkedIcon: /*#__PURE__*/_react["default"].createElement(_CheckCircle["default"], {
            className: "checkboxSize"
          })
        })), /*#__PURE__*/_react["default"].createElement(_core.Button, {
          variant: "outlined",
          size: "small",
          style: {
            outline: "none"
          },
          name: "YES",
          color: hasDependentComponents ? "primary" : "default" //name="this_show_empty_text"
          ,
          className: "".concat(classes.btnStyle, " ml-2 mr-2"),
          onClick: this.editElementCustomOptionsProp.bind(this, "hasDependentComponents", true)
        }, /*#__PURE__*/_react["default"].createElement("span", null, "Yes"), /*#__PURE__*/_react["default"].createElement(_core.Checkbox, {
          className: "p-0 ml-1",
          color: "primary" // name="YES"
          ,
          name: "this_show_empty_text",
          icon: /*#__PURE__*/_react["default"].createElement(_RadioButtonUnchecked["default"], {
            className: "checkboxSize"
          }),
          checked: hasDependentComponents,
          checkedIcon: /*#__PURE__*/_react["default"].createElement(_CheckCircle["default"], {
            className: "checkboxSize"
          })
        })))
      })), hasDependentComponents ? renderDropdownDependentSection(this, classes, this.props.element.customOptions.isDependentSectionExpanded) : null) : null), this.props.element.element == "Header" && /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_headerOptions["default"], {
        data: this.props.preview.state.data,
        preview: this.props.preview,
        element: this.props.element,
        fileInputStyle: fileInputStyle
      })), this.props.element.element == "Short_Text" && /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_shorttextOptions["default"], {
        element: this.props.element,
        setValidationOptions: this.setValidationOptions,
        setInputMaskedValue: this.setInputMaskedValue,
        handleSelectedIcon: this.handleSelectedIcon,
        editElementCustomOptionsProp: this.editElementCustomOptionsProp.bind(this)
      })), this.props.element.element == "Photo" && /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_takephotoOptions["default"], {
        canHaveOptionCorrect: canHaveOptionCorrect,
        canHaveOptionValue: canHaveOptionValue,
        data: this.props.preview.state.data,
        updateElement: this.props.updateElement,
        setDefaultOptions: this.setDefaultOptions,
        preview: this.props.preview,
        setPhotoCustomOptions: this.setPhotoCustomOptions,
        element: this.props.element,
        changeCameraOptions: this.changeCameraOptions,
        editElementCustomOptionsProp: this.editElementCustomOptionsProp.bind(this)
      })), this.props.element.element == "Video" && /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_takevideoOptions["default"], {
        canHaveOptionCorrect: canHaveOptionCorrect,
        canHaveOptionValue: canHaveOptionValue,
        data: this.props.preview.state.data,
        updateElement: this.props.updateElement,
        setDefaultOptions: this.setDefaultOptions,
        preview: this.props.preview,
        setPhotoCustomOptions: this.setPhotoCustomOptions,
        element: this.props.element,
        changeCameraOptions: this.changeCameraOptions,
        editElementCustomOptionsProp: this.editElementCustomOptionsProp.bind(this)
      }))), this.props.element.canPopulateFromApi && this.props.element.hasOwnProperty('options') && elementKey != "Single_Choice" && this.props.element.element != "Dropdown" && /*#__PURE__*/_react["default"].createElement("div", {
        className: "form-group"
      }, /*#__PURE__*/_react["default"].createElement("label", {
        className: "control-label",
        htmlFor: "optionsApiUrl"
      }, "Populate Options from API"), /*#__PURE__*/_react["default"].createElement("div", {
        className: "row"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "col-sm-6"
      }, /*#__PURE__*/_react["default"].createElement("input", {
        className: "form-control",
        style: {
          width: '100%'
        },
        type: "text",
        id: "optionsApiUrl",
        placeholder: "http://localhost:8080/api/optionsdata"
      })), /*#__PURE__*/_react["default"].createElement("div", {
        className: "col-sm-6"
      }, /*#__PURE__*/_react["default"].createElement("button", {
        onClick: this.addOptions.bind(this),
        className: "btn btn-success"
      }, "Populate")))), // SHOW OUTPUT 
      elementKey != "Section_Header" && elementKey != "Page_Break" && elementKey != "Input_Table" && elementKey != "Button" && elementKey != "Attachment" && elementKey !== "Tiles" && elementKey != "Photo" && elementKey != "Configurable_List" && elementKey != "Location_Coordinates" && elementKey != 'Video' && elementKey != "Barcode_Scanner" && elementKey != "Signature" && elementKey != "Button" && /*#__PURE__*/_react["default"].createElement(_core.Grid, {
        item: true,
        xs: 12,
        className: "p-2 mt-4",
        style: {
          border: '1.5px solid rgb(128,128,128,.2)',
          opacity: "0.8",
          zIndex: '1'
        }
      }, /*#__PURE__*/_react["default"].createElement(_core.FormControl, {
        component: "fieldset",
        className: "p-2"
      }, /*#__PURE__*/_react["default"].createElement("h6", {
        className: "text"
      }, "Show Output"), /*#__PURE__*/_react["default"].createElement("div", {
        className: "ml-4 p-2",
        style: {
          display: "flex",
          flexDirection: "column"
        }
      }, /*#__PURE__*/_react["default"].createElement(_core.FormControlLabel, {
        className: data_table ? classes.label1 : classes.label,
        label: "In data table in first screen.",
        control: /*#__PURE__*/_react["default"].createElement(_core.Checkbox, {
          checked: data_table,
          onChange: this.editElementCustomOptionsProp.bind(this, 'dataTable', 'checked'),
          name: "is_dataTable",
          color: "primary"
        })
      }), elementKey == "Time" || elementKey == "Number" || elementKey == "Date_Picker" ? null : /*#__PURE__*/_react["default"].createElement(_core.FormControlLabel, {
        className: this_filtered ? classes.label1 : classes.label,
        label: "In filter section.",
        style: {
          marginTop: "-15px"
        },
        control: /*#__PURE__*/_react["default"].createElement(_core.Checkbox, {
          checked: this_filtered,
          onChange: this.editElementCustomOptionsProp.bind(this, 'filtered', 'checked'),
          name: "is_filtered",
          color: "primary"
        })
      })))), elementKey == "Barcode_Scanner" && /*#__PURE__*/_react["default"].createElement("div", {
        style: {
          marginBottom: "11rem"
        }
      }), elementKey == "Button" && /*#__PURE__*/_react["default"].createElement("div", {
        style: {
          marginBottom: "8rem"
        }
      }), elementKey == 'Signature' && /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("div", {
        style: {
          marginTop: '11rem'
        }
      })), elementKey == "Email" && /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("div", {
        style: {
          marginTop: '11rem'
        }
      })), this.props.fromMainView ? /*#__PURE__*/_react["default"].createElement(_core.Grid, {
        container: true,
        spacing: 4,
        style: {
          position: "sticky",
          bottom: "-16px",
          backgroundColor: "white",
          paddingLeft: "45%",
          marginTop: "1rem",
          zIndex: '2'
        }
      }, /*#__PURE__*/_react["default"].createElement(_core.Grid, {
        item: true,
        xs: 2,
        sm: 2,
        style: {
          marginRight: "2rem"
        }
      }, /*#__PURE__*/_react["default"].createElement(_core.Button, {
        className: "border-primary color-primary",
        variant: "outlined",
        onClick: function onClick() {
          _this8.setPreviousValues();
        }
      }, "CANCEL")), /*#__PURE__*/_react["default"].createElement(_core.Grid, {
        item: true,
        xs: 2,
        sm: 2,
        style: {
          marginLeft: "2.5rem"
        }
      }, /*#__PURE__*/_react["default"].createElement(_core.Button, {
        disabled: this.state.element.label.split("_").join(" ") === "" // || this.state.element.label.length > 24 
        || charLimit > 120 || charLimit < 0 ? true : this.props.element.customOptions.charLimit == "" && this.props.element.element == "Short_Text" && (this.props.element.customOptions.validation === 'Alphabetic' || this.props.element.customOptions.validation === 'AlphaNumeric' || this.props.element.customOptions.validation === 'Numeric') ? true : this.props.element.customOptions.isVideoLink && this.state.videoLinkDisable ? true : this.props.element.customOptions.isVideoLink && this.props.element.customOptions.videoLink === "" ? true : this.props.element.customOptions.defaultTime === "custom" && this.state.selectedTime === null ? true : elementKey === "Photo" && this.state.element.customOptions.maxSize > 5 || this.state.element.customOptions.maxSize < 1 ? true : elementKey === "video" && this.state.element.customOptions.maxSize > 10 || this.state.element.customOptions.maxSize < 1 ? true : // this.props.element.customOptions.isNumberLimit && this.state.element.customOptions.min > this.state.element.customOptions.max ? true :
        this.props.element.customOptions.isNumberLimit && this.state.disableNumber ? true : this.props.element.customOptions.isLimitEntry && this.state.element.customOptions.min > this.state.element.customOptions.max ? true : false,
        className: "bg-primary text-black",
        variant: "contained",
        onClick: this.props.manualEditModeOff
      }, "SAVE"))) : null));
    }
  }]);
  return FormElementsEdit;
}(_react["default"].Component);

FormElementsEdit.defaultProps = {
  className: 'edit-element-fields'
};

var renderDropdownDependentSection = function renderDropdownDependentSection(parent, classes, isDependentSectionExpanded, handleDropdownOptionChange) {
  var _parent$props$element;

  var handleOptionChange = function handleOptionChange(index, event) {
    parent.handleDropdownOptionChange(index, event.target.value);
  };

  var addSectionComponent = function addSectionComponent(index, iIndex, event) {
    parent.handleAddSectionComponent(index, iIndex, create(_materialElementsConfig.SECTION_COMPONENTS_LIST.filter(function (v) {
      return v.key === event.target.value;
    })[0]));
  };

  var addMoreOption = function addMoreOption(index) {
    parent.addMoreOption();
  };

  var removeOption = function removeOption(index) {
    parent.removeOption(index);
  };

  var addSectionComponentItem = function addSectionComponentItem(index, iIndex) {
    parent.addSectionComponentItem(index, iIndex);
  };

  var removeSectionComponentItem = function removeSectionComponentItem(index, iIndex) {
    parent.removeSectionComponentItem(index, iIndex);
  };

  var create = function create(item) {
    var elementOptions = {
      id: _UUID["default"].uuid(),
      element: item.element || item.key,
      // text: item.name,
      type: item.type,
      "static": item["static"],
      fieldVariant: "outlined",
      // outlined | filled | standard,
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

    if (parent.props.showDescription === true && !item["static"]) {
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

    if (item["static"]) {
      elementOptions.bold = false;
      elementOptions.italic = false;
    } // if (item.canHaveAnswer) { elementOptions.canHaveAnswer = item.canHaveAnswer; }


    if (item.canReadOnly) {
      elementOptions.readOnly = false;
    }

    if (item.canDefaultToday) {
      elementOptions.defaultToday = false;
    }

    if (item.content) {
      elementOptions.content = item.content;
    }

    if (item.href) {
      elementOptions.href = item.href;
    } // elementOptions.canHaveAlternateForm = item.canHaveAlternateForm !== false;
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
    } // if (item.key === 'DatePicker') {
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

    if (item.defaultValue) {
      elementOptions.defaultValue = item.defaultValue;
    }

    if (item.fieldName) {
      elementOptions.fieldName = item.fieldName + _UUID["default"].uuid();
    }

    if (item.label) {
      elementOptions.label = item.label;
    }

    if (item.options) {
      if (item.options.length > 0) {
        elementOptions.options = item.options;
      } else {
        elementOptions.options = _toolbar["default"]._defaultItemOptions(elementOptions.element);
      }
    }

    if (!parent.props.isBootstrapElements) {
      if (item.key === 'Number') {
        elementOptions.customOptions.componentType = item.type;
        elementOptions.customOptions.isNumberLimit = true;
        elementOptions.customOptions.min = 0;
        elementOptions.customOptions.max = 1;
        elementOptions.customOptions.defaultValue = null;
        elementOptions.customOptions.isFieldDisabled = false;
      }

      if (item.key === 'Long_Text') {
        elementOptions.customOptions.componentType = item.type;
        elementOptions.customOptions.limitType = 'Characters';
        elementOptions.customOptions.limitTypeOptions = 'Words,Characters';
        elementOptions.customOptions.isLimitEntry = false;
        elementOptions.customOptions.editorMode = "Plain_Text", elementOptions.customOptions.editorModeOptions = "Plain_Text,Rich_Text";
        elementOptions.customOptions.validationType = 'None';
        elementOptions.customOptions.validationOptions = 'None,Alphabetic,AlphaNumeric';
        elementOptions.customOptions.defaultValue = "";
        elementOptions.customOptions.isFieldDisabled = false; // elementOptions.customOptions.min = 0;
        // elementOptions.customOptions.max = 1;
      }

      if (item.key === 'Phone') {
        elementOptions.customOptions.componentType = item.type;
        elementOptions.customOptions.isMasked = false;
        elementOptions.customOptions.countryCode = true;
      }

      if (item.key === 'Attachment') {
        elementOptions.customOptions.required = false;
        elementOptions.customOptions.componentType = item.type;
        elementOptions.customOptions.Attachment = ['.pdf', '.doc', '.xls'];
        elementOptions.customOptions.defaultValue = "";
        elementOptions.customOptions.isFieldDisabled = false;
      }

      if (item.key === 'Button') {
        elementOptions.customOptions.componentType = item.type;
        elementOptions.customOptions.required = false;
        elementOptions.customOptions.actionClick = "Save";
        elementOptions.customOptions.Hyperlink = '';
        elementOptions.customOptions.hasRequiredProp = false;
      }

      if (item.key == 'Section_Header') {
        elementOptions.customOptions.componentType = item.type;
        elementOptions.customOptions.required = false;
        elementOptions.customOptions.sectionHeaderBGColor = "#202020";
      }

      if (item.key === 'Single_Choice') {
        elementOptions.customOptions.componentType = item.type;
        elementOptions.customOptions.required = false;
        elementOptions.customOptions.isSingleChoiseOption = true;
        elementOptions.customOptions.isSpreadToColumn = false;
        elementOptions.customOptions.columns = 0;
        elementOptions.singleChoiceOptions = _toolbar["default"]._defaultItemOptions(elementOptions.element);
      }

      if (item.key == "Dropdown") {
        elementOptions.customOptions.componentType = item.type;
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
        elementOptions.dependentComponents = [{
          parentId: [],
          form: [{
            label: ""
          } //   {
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
          ]
        }];

        if (item.dropDownOptions != undefined && item.dropDownOptions.length > 0) {
          elementOptions.dropDownOptions = item.optionsText;
          elementOptions.dropDownOptions = item.dropDownOptions;
        } else {
          elementOptions.dropDownOptions = [];
        }
      }

      if (item.key === 'Short_Text') {
        elementOptions.customOptions.componentType = item.type;

        if (item.customOptions != undefined && item.customOptions.isMasked != undefined) {
          elementOptions.customOptions.isMasked = item.customOptions.isMasked;
        } else {
          elementOptions.customOptions.isMasked = false;
        }

        if (item.customOptions != undefined && item.customOptions.maskedValue != undefined) {
          elementOptions.customOptions.maskedValue = item.customOptions.maskedValue;
        } else {
          elementOptions.customOptions.maskedValue = "";
        }

        if (item.customOptions != undefined && item.customOptions.validation != undefined) {
          elementOptions.customOptions.validation = item.customOptions.validation;
        } else {
          elementOptions.customOptions.validation = "None";
        }

        elementOptions.customOptions.charLimit = 120;
        elementOptions.customOptions.selectedIcons = "";
        elementOptions.customOptions.defaultValue = "";
        elementOptions.customOptions.isFieldDisabled = false;
      }

      if (item.key === 'Photo') {
        elementOptions.customOptions.maxSize = 5;
        elementOptions.customOptions.max = 5;
        elementOptions.customOptions.componentType = item.type;

        if (item.customOptions != undefined && item.customOptions.cameraFacingOptions != undefined) {
          elementOptions.customOptions.cameraFacingOptions = item.customOptions.cameraFacingOptions;
        } else {
          elementOptions.customOptions.cameraFacingOptions = "front";
        }

        elementOptions.customOptions.isPhotoAvail = true;
        elementOptions.customOptions.isPhotoUpload = true;
        elementOptions.customOptions.tapedrop = false;
        elementOptions.customOptions.isDistToBuilding = false;
        elementOptions.customOptions.distanceToBuildingRadius = '';
        elementOptions.customOptions.isTargetAzimuthAngle = false;
        elementOptions.customOptions.isEditPhoto = false;
        elementOptions.customOptions.isShowHelp = false;
        elementOptions.customOptions.isCommentsAvail = false;
        elementOptions.customOptions.isRadioGroup = false;
        elementOptions.customOptions.helpText = '';
        elementOptions.customOptions.sampleS3Uri = '';
        elementOptions.singleChoiceOptions = _toolbar["default"]._defaultItemOptions(elementOptions.element);
        f;
      }

      if (item.key === 'Video') {
        elementOptions.customOptions.componentType = item.type;
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
        elementOptions.customOptions.componentType = item.type;
        elementOptions.customOptions.optionsText = "Option 1\nOption 2";
        elementOptions.customOptions.columns = 0;
        elementOptions.checkListOptions = _toolbar["default"]._defaultItemOptions(elementOptions.element);
      }
    }

    if (item.key === 'Location_Coordinates' || item.key === 'Email' || item.key === 'Signature' || item.key === 'Time') {
      elementOptions.customOptions.componentType = item.type;
    }

    if (item.key === 'Location_Coordinates') {
      elementOptions.customOptions.addressLabel = "Address";
      elementOptions.customOptions.displayMapOption = "Map+Text";
      elementOptions.customOptions.editable = false;
      elementOptions.customOptions.required = false;
      elementOptions.customOptions.defaultValue = "";
      elementOptions.customOptions.isFieldDisabled = false;
    }

    if (item.key === 'Header') {
      elementOptions.customOptions.componentType = item.type;

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
      elementOptions.customOptions.componentType = item.type;
      elementOptions.customOptions.dateFormat = "MM-dd-yyyy";
      elementOptions.customOptions.defaultDate = null;
      elementOptions.customOptions.defaultDateOptions = "none";
      elementOptions.customOptions.formatSeparator = "hyphen";
      elementOptions.customOptions.disablePastDates = true;
      elementOptions.customOptions.required = true;
      elementOptions.customOptions.readOnly = false;
    }

    if (item.key === 'Configurable_List') {
      elementOptions.customOptions.componentType = item.type;
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
      elementOptions.customOptions.componentType = item.type;
      elementOptions.customOptions.optionsText = "Option 1[OnHover Option 1]\nOption 2\nOption 3";
      elementOptions.buttonRadioOptions = _toolbar["default"]._defaultItemOptions(elementOptions.element);
      elementOptions.customOptions.columns = 0;
      elementOptions.customOptions.spacing = 1;
      elementOptions.customOptions.buttonThemeColor = 'red';
    }

    if (item.key === 'Tab_Break') {
      elementOptions.customOptions.componentType = item.type;
      elementOptions.customOptions.optionsText = 'Tab 1\nTab 2';
      elementOptions.tabsOptions = _toolbar["default"]._defaultItemOptions(elementOptions.element);
    }

    if (item.key.toLowerCase() === 'photo_prepost') {
      elementOptions.customOptions.componentType = item.type;
      var customOptions = elementOptions.customOptions;
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
      elementOptions.customOptions.componentType = item.type;
      elementOptions.customOptions.required = false;
      var _customOptions = elementOptions.customOptions;
      _customOptions.isPreAvail = false;
      _customOptions.is360Avail = false;
      _customOptions.isBarcodeAvail = true;
      _customOptions.isPhotoAvail = false;
      _customOptions.is360PhotoUpload = false;
      _customOptions.isPrePhotoUpload = false;
      _customOptions.isPostPhotoUpload = false;
      _customOptions.isCommentsAvail = false;
      _customOptions.isCommentPopAvail = true;
      _customOptions.isPostAvail = false;
      _customOptions.isPhotoUpload = false;
      _customOptions.showLine = false;
      elementOptions.customOptions = _customOptions;
    }

    if (item.key === 'Tiles') {
      elementOptions.customOptions.componentType = item.type;
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
  };

  return /*#__PURE__*/_react["default"].createElement(_core.Grid, {
    container: true,
    className: "mt-5",
    style: {
      border: '1px solid #ccc'
    }
  }, /*#__PURE__*/_react["default"].createElement(_core.Grid, {
    item: true,
    lg: 12,
    md: 12,
    sm: 12
  }, /*#__PURE__*/_react["default"].createElement(_core.Card, {
    className: classes.paper,
    style: isDependentSectionExpanded ? {
      backgroundColor: "transparent"
    } : {}
  }, /*#__PURE__*/_react["default"].createElement(_core.Grid, {
    container: true,
    direction: "row",
    justifyContent: "space-between",
    alignItems: "center",
    className: "mx-1 mt-2"
  }, /*#__PURE__*/_react["default"].createElement("h6", {
    className: "text"
  }, "Section Details"), /*#__PURE__*/_react["default"].createElement(_core.IconButton, {
    expand: isDependentSectionExpanded,
    onClick: parent.editElementCustomOptionsProp.bind(parent, "isDependentSectionExpanded", !isDependentSectionExpanded),
    "aria-expanded": isDependentSectionExpanded,
    "aria-label": "show more",
    className: "float-right"
  }, isDependentSectionExpanded ? /*#__PURE__*/_react["default"].createElement(_KeyboardArrowUp["default"], {
    className: "color-primary"
  }) : /*#__PURE__*/_react["default"].createElement(_KeyboardArrowDown["default"], null))), /*#__PURE__*/_react["default"].createElement(_core.Collapse, {
    "in": isDependentSectionExpanded,
    timeout: "auto",
    unmountOnExit: true
  }, /*#__PURE__*/_react["default"].createElement(_core.CardContent, {
    style: {
      padding: '2px'
    }
  }, /*#__PURE__*/_react["default"].createElement(_core.Grid, {
    container: true
  }, (_parent$props$element = parent.props.element.dependentComponents) === null || _parent$props$element === void 0 ? void 0 : _parent$props$element.map(function (section, index) {
    var _parent$props$element2, _parent$props$element3;

    return /*#__PURE__*/_react["default"].createElement(_core.Grid, {
      containerdisplay: "flex",
      item: true,
      xs: 12,
      className: "pb-4 flex",
      style: {
        display: 'flex'
      }
    }, /*#__PURE__*/_react["default"].createElement(_core.Grid, {
      container: true,
      display: "flex",
      xs: 12,
      style: {
        backgroundColor: "#f0f0f0",
        padding: "5px",
        display: 'flex',
        width: '100%'
      }
    }, /*#__PURE__*/_react["default"].createElement(_core.FormControl, {
      className: classes.formControl
    }, /*#__PURE__*/_react["default"].createElement(_core.TextField, {
      select: true,
      label: "Select Option",
      id: "demo-mutiple-name",
      multiple: true // fullWidth
      ,
      variant: "outlined",
      value: (_parent$props$element2 = parent.props.element.dependentComponents[index]) === null || _parent$props$element2 === void 0 ? void 0 : _parent$props$element2.parentId,
      onChange: function onChange(e) {
        return handleOptionChange(index, e);
      },
      SelectProps: {
        multiple: true,
        value: (_parent$props$element3 = parent.props.element.dependentComponents[index]) === null || _parent$props$element3 === void 0 ? void 0 : _parent$props$element3.parentId
      }
    }, parent.props.element.dropDownOptions.map(function (option) {
      return /*#__PURE__*/_react["default"].createElement(_core.MenuItem, {
        key: option.key,
        value: option.key
      }, option.label);
    }))), /*#__PURE__*/_react["default"].createElement(_core.Grid, {
      display: "flex",
      direction: "row",
      style: {
        width: '20%'
      }
    }, /*#__PURE__*/_react["default"].createElement(_core.IconButton, {
      style: {
        padding: '6px'
      },
      "aria-label": "add"
    }, /*#__PURE__*/_react["default"].createElement(_Add["default"], {
      onClick: function onClick(e) {
        return addMoreOption(index);
      }
    })), index > 0 && /*#__PURE__*/_react["default"].createElement(_core.IconButton, {
      style: {
        padding: '6px'
      },
      "aria-label": "add"
    }, /*#__PURE__*/_react["default"].createElement(_Remove["default"], {
      onClick: function onClick(e) {
        return removeOption(index);
      }
    }))), /*#__PURE__*/_react["default"].createElement(_core.Grid, {
      item: true,
      xs: 12
    }, section.form.map(function (v, iIndex) {
      var _parent$props$element4, _section$form;

      return /*#__PURE__*/_react["default"].createElement(_core.Grid, {
        container: true,
        style: {
          display: 'flex',
          marginBottom: '10px',
          marginTop: '10px',
          borderBottom: '1px dashed #ccc'
        }
      }, /*#__PURE__*/_react["default"].createElement(_core.FormControl, {
        className: classes.formControl
      }, /*#__PURE__*/_react["default"].createElement(_core.TextField, {
        fullWidth: true,
        id: "cType",
        select: true,
        name: "cType",
        label: "Select Component",
        type: "text",
        variant: "outlined",
        value: (_parent$props$element4 = parent.props.element.dependentComponents[index]) === null || _parent$props$element4 === void 0 ? void 0 : _parent$props$element4.form[iIndex].element,
        onChange: function onChange(e) {
          addSectionComponent(index, iIndex, e);
        }
      }, /*#__PURE__*/_react["default"].createElement(_core.MenuItem, {
        value: ""
      }, "-Select One-"), _materialElementsConfig.SECTION_COMPONENTS_LIST.map(function (item) {
        return /*#__PURE__*/_react["default"].createElement(_core.MenuItem, {
          value: item.key
        }, item.label);
      }))), /*#__PURE__*/_react["default"].createElement(_core.Grid, {
        display: "flex",
        direction: "row",
        style: {
          width: '20%'
        }
      }, /*#__PURE__*/_react["default"].createElement(_core.IconButton, {
        style: {
          padding: '6px'
        },
        "aria-label": "add"
      }, /*#__PURE__*/_react["default"].createElement(_Add["default"], {
        onClick: function onClick(e) {
          return addSectionComponentItem(index, iIndex);
        }
      })), iIndex > 0 || iIndex === 0 && ((_section$form = section.form) === null || _section$form === void 0 ? void 0 : _section$form.length) > 1 ? /*#__PURE__*/_react["default"].createElement(_core.IconButton, {
        style: {
          padding: '6px'
        },
        "aria-label": "add"
      }, /*#__PURE__*/_react["default"].createElement(_Remove["default"], {
        onClick: function onClick(e) {
          return removeSectionComponentItem(index, iIndex);
        }
      })) : null), v.label ? /*#__PURE__*/_react["default"].createElement(_core.Grid, {
        item: true,
        xs: 12,
        className: "pb-1"
      }, /*#__PURE__*/_react["default"].createElement(FormElementsEdit, {
        isDefaultItems: parent.props.isDefaultItems,
        showCorrectColumn: parent.props.showCorrectColumn,
        files: parent.props.files,
        closeEdit: parent.props.manualEditModeOff,
        manualEditModeOff: parent.manualEditModeOff,
        preview: parent,
        element: v,
        updateElement: parent.updateElement,
        globalStyles: parent.props.globalStyles,
        updateGlobalStyleOptions: parent.updateGlobalStyleOptions,
        updateFormDefault: parent.updateFormDefault,
        uploadFile: parent.props.uploadFile,
        classes: classes
      })) : null);
    }))));
  })))))));
};

var _default = (0, _styles.withStyles)(styles, {
  withTheme: true
})(FormElementsEdit);

exports["default"] = _default;
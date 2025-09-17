"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommentsModal = CommentsModal;
exports["default"] = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _componentHeader = _interopRequireDefault(require("../form-elements/component-header"));

var _core = require("@material-ui/core");

var _ImageRounded = _interopRequireDefault(require("@material-ui/icons/ImageRounded"));

var _modal = _interopRequireDefault(require("./modal"));

var _materialElementLabel = _interopRequireDefault(require("./material-element-label"));

var _CreateRounded = _interopRequireDefault(require("@material-ui/icons/CreateRounded"));

var _CheckRounded = _interopRequireDefault(require("@material-ui/icons/CheckRounded"));

var _Modal = _interopRequireDefault(require("@material-ui/core/Modal"));

var _styles = require("@material-ui/core/styles");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var IS_PREAVAIL = "isPreAvail";
var IS_POSTAVAIL = "isPostAvail";
var IS_PHOTOAVAIL = "isPhotoAvail";
var IS_360AVAIL = "is360Avail";
var IS_BARCODEAVAIL = "isBarcodeAvail";
var IS_PREPHOTOUPLOAD = "isPrePhotoUpload";
var IS_POSTPHOTOUPLOAD = "isPostPhotoUpload";
var IS_PHOTOUPLOAD = "isPhotoUpload";
var IS_360PHOTOUPLOAD = "is360PhotoUpload";

var BarcodeScanner = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(BarcodeScanner, _React$Component);

  var _super = _createSuper(BarcodeScanner);

  function BarcodeScanner(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, BarcodeScanner);
    _this = _super.call(this, props);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "textChange", function (event) {
      var value = event.target.value;
      var state = _this.state;

      if (_this.props.data.customOptions.isCommentsAvail) {
        state.isCommentsEditMode = true;
      }

      state.commentText = value;

      _this.setState(state);
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "handleImageUpload", function (clickSource, e) {
      var self = (0, _assertThisInitialized2["default"])(_this);
      var target = e.target;
      var file;
      var reader;

      if (target.files && target.files.length) {
        file = target.files[0];
        reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onloadend = function () {
          _this.saveUploadImageSrc(clickSource, reader.result);
        };
      }
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "saveUploadImageSrc", function (clickSource, imageSrc) {
      console.log(clickSource);

      switch (clickSource) {
        case IS_PREPHOTOUPLOAD:
          var isPrePhotoUpload = _this.state.isPrePhotoUpload;
          isPrePhotoUpload = imageSrc;

          _this.setState({
            isPrePhotoUpload: isPrePhotoUpload
          });

          return;

        case IS_POSTPHOTOUPLOAD:
          var isPostPhotoUpload = _this.state.isPostPhotoUpload;
          isPostPhotoUpload = imageSrc;

          _this.setState({
            isPostPhotoUpload: isPostPhotoUpload
          });

          return;

        case IS_PHOTOUPLOAD:
          var isPhotoUpload = _this.state.isPhotoUpload;
          isPhotoUpload = imageSrc;

          _this.setState({
            isPhotoUpload: isPhotoUpload
          });

          return;

        case IS_360PHOTOUPLOAD:
          var is360PhotoUpload = _this.state.is360PhotoUpload;
          is360PhotoUpload = imageSrc;

          _this.setState({
            is360PhotoUpload: is360PhotoUpload
          });

          return;
      }
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "saveCaptureImageSrc", function (modalSource, imageSrc) {
      console.log(modalSource);

      switch (modalSource) {
        case IS_PREAVAIL:
          var isPreAvail = _this.state.isPreAvail;
          isPreAvail = imageSrc;

          _this.setState({
            isPreAvail: isPreAvail
          });

          return;

        case IS_POSTAVAIL:
          var isPostAvail = _this.state.isPostAvail;
          isPostAvail = imageSrc;

          _this.setState({
            isPostAvail: isPostAvail
          });

          return;

        case IS_PHOTOAVAIL:
          var isPhotoAvail = _this.state.isPhotoAvail;
          isPhotoAvail = imageSrc;

          _this.setState({
            isPhotoAvail: isPhotoAvail
          });

          return;

        case IS_360AVAIL:
          var is360Avail = _this.state.is360Avail;
          is360Avail = imageSrc;

          _this.setState({
            is360Avail: is360Avail
          });

          return;

        case IS_BARCODEAVAIL:
          var isBarcodeAvail = _this.state.isBarcodeAvail;
          isBarcodeAvail = imageSrc;

          _this.setState({
            isBarcodeAvail: isBarcodeAvail
          });

          return;
      }
    });
    _this.state = {
      commentText: '',
      isPreAvail: '',
      isPostAvail: '',
      isPhotoAvail: '',
      is360Avail: '',
      isBarcodeAvail: '',
      isPrePhotoUpload: '',
      isPostPhotoUpload: '',
      isPhotoUpload: '',
      is360PhotoUpload: '',
      isCommentsEditMode: false
    };
    return _this;
  }

  (0, _createClass2["default"])(BarcodeScanner, [{
    key: "enableCamera",
    value: function enableCamera(optionName) {
      console.log(optionName);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var customOptions = this.props.data.customOptions;
      var formPreview = this.props.hasOwnProperty('isFormPreview') ? this.props.isFormPreview : false;
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "SortableItem rfb-item"
      }, /*#__PURE__*/_react["default"].createElement(_componentHeader["default"], this.props), /*#__PURE__*/_react["default"].createElement("div", {
        className: "form-group "
      }, /*#__PURE__*/_react["default"].createElement(_materialElementLabel["default"], this.props), /*#__PURE__*/_react["default"].createElement(_core.Grid, {
        container: true,
        spacing: 1,
        justifyContent: "space-between",
        style: {
          marginTop: "1rem"
        }
      }, /*#__PURE__*/_react["default"].createElement(_core.Grid, {
        item: true,
        xs: 12,
        sm: 4,
        className: "ml-2 py-3 pl-2",
        style: {
          border: "1px solid #cecece",
          borderRadius: "5px",
          alignSelf: 'center'
        }
      }, /*#__PURE__*/_react["default"].createElement(_core.Typography, {
        component: "span"
      }, "Barcode")), /*#__PURE__*/_react["default"].createElement(_core.Grid, {
        item: true,
        xs: 12,
        sm: 7,
        style: {
          display: "flex"
        },
        justifyContent: "center"
      }, /*#__PURE__*/_react["default"].createElement(_modal["default"], {
        modalSource: IS_BARCODEAVAIL,
        isDisable: !customOptions.isBarcodeAvail,
        customOptions: customOptions,
        read_only: this.props.read_only,
        saveImageSrc: function saveImageSrc(modalSource, src) {
          return _this2.saveCaptureImageSrc(modalSource, src);
        }
      })), this.state.isBarcodeAvail !== '' && /*#__PURE__*/_react["default"].createElement(_core.Grid, {
        item: true,
        xs: 12
      }, this.state.isBarcodeAvail !== '' && /*#__PURE__*/_react["default"].createElement(_core.Typography, {
        component: "h6"
      }, "Barcode Data: ", this.state.isBarcodeAvail)))));
    }
  }]);
  return BarcodeScanner;
}(_react["default"].Component);

exports["default"] = BarcodeScanner;

function getModalStyle() {
  var top = 50;
  var left = 50;
  return {
    top: "".concat(top, "%"),
    left: "".concat(left, "%"),
    display: 'flex',
    flexDirection: 'column',
    transform: "translate(-".concat(top, "%, -").concat(left, "%)")
  };
}

var useStyles = (0, _styles.makeStyles)(function (theme) {
  return {
    paper: {
      position: "absolute",
      width: 300,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(4),
      outline: "none"
    },
    SaveCommentsBtn: {
      marginTop: '10px',
      width: 'fit-content',
      alignSelf: 'center'
    }
  };
});

function CommentsModal(props) {
  var classes = useStyles();

  var _useState = (0, _react.useState)(getModalStyle),
      _useState2 = (0, _slicedToArray2["default"])(_useState, 1),
      modalStyle = _useState2[0];

  return /*#__PURE__*/_react["default"].createElement(_Modal["default"], {
    "aria-labelledby": "simple-modal-title",
    "aria-describedby": "simple-modal-description",
    open: true
  }, /*#__PURE__*/_react["default"].createElement("div", {
    style: modalStyle,
    className: classes.paper
  }, /*#__PURE__*/_react["default"].createElement(_core.TextField, {
    size: "small",
    variant: "outlined",
    label: "Comments",
    name: "isCommentsAvail",
    value: props.value,
    onChange: function onChange(e) {
      return props.textChange(e);
    }
  }), /*#__PURE__*/_react["default"].createElement(_core.Button, {
    color: "primary",
    variant: "contained",
    className: classes.SaveCommentsBtn,
    onClick: function onClick() {
      return props.setCommentsEdit();
    }
  }, "Save")));
}
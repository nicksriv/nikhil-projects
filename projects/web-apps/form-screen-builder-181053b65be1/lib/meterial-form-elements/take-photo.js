"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _componentHeader = _interopRequireDefault(require("../form-elements/component-header"));

var _materialElementLabel = _interopRequireDefault(require("./material-element-label"));

var _core = require("@material-ui/core");

var _IconButton = _interopRequireDefault(require("@material-ui/core/IconButton"));

var _photoCaptureUpload = _interopRequireDefault(require("./photoCaptureUpload"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var TakePhoto = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(TakePhoto, _React$Component);

  var _super = _createSuper(TakePhoto);

  function TakePhoto(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, TakePhoto);
    _this = _super.call(this, props);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "setImageSrc", /*#__PURE__*/function () {
      var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(clickSource, imageFileObj, imageType) {
        var previousImages, uri, awsS3uri, newImages;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                previousImages = _this.state.newImages.splice(0, _this.state.newImages.length - 1); // fetch s3uri from aws

                uri = imageFileObj.imageSrc;

                if (!(_this.props.imageUploadCallback != null)) {
                  _context.next = 7;
                  break;
                }

                _context.next = 5;
                return _this.props.imageUploadCallback(imageFileObj);

              case 5:
                awsS3uri = _context.sent;
                uri = awsS3uri;

              case 7:
                newImages = {
                  imageUrl: uri,
                  feet: _this.state.feet,
                  inches: _this.state.inches,
                  azimuthAngle: _this.state.azimuthAngle // meter: meter,
                  // centimeter: centimeter

                };
                previousImages.push(newImages);
                _context.t0 = imageType;
                _context.next = _context.t0 === 'UPLOAD_IMAGE' ? 12 : _context.t0 === 'CAPTURE_IMAGE' ? 14 : 16;
                break;

              case 12:
                _this.setState({
                  newImages: previousImages,
                  feet: '',
                  inches: ''
                }, function () {
                  _this.sendDataToProps();
                });

                return _context.abrupt("break", 17);

              case 14:
                _this.setState({
                  newImages: previousImages
                }, function () {
                  _this.sendDataToProps();
                });

                return _context.abrupt("break", 17);

              case 16:
                return _context.abrupt("break", 17);

              case 17:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x, _x2, _x3) {
        return _ref.apply(this, arguments);
      };
    }());
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "saveAdditionalOptions", function (property, e) {
      if (property == 'feet') {
        _this.state.feet = e.target.value;
      } else if (property == 'inches') {
        _this.state.inches = e.target.value;
      } else if (property == 'azimuthAngle') {
        _this.state.azimuthAngle = e.target.value;
      }
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "handleChange", function (e) {
      var status = {
        value: e.currentTarget.value,
        error: false
      };
      var fieldResult = _this.state.fieldResult;
      fieldResult.value = status.value;
      fieldResult.error = false;

      _this.setState(status);

      _this.props.collectFieldResults(fieldResult);
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "handleCommentsChange", function (e) {
      var status = {
        comments: e.currentTarget.value,
        error: false
      };
      var fieldResult = _this.state.fieldResult;
      fieldResult.comments = status.comments;
      fieldResult.error = false;

      _this.setState(status);

      _this.props.collectFieldResults(fieldResult);
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "handleImageUpload", function () {
      var data = _this.props.imageUploadCallback("Sample image url");
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "onClickImagePreview", function (index) {
      if (_this.props.hasOwnProperty('photoPreview') && _this.props.photoPreview) {
        _this.props.photoPreview('PHOTOS', _this.state.mediaList, index);
      }
    });
    _this.state = {
      isPhotoUpload: '',
      isPhotoAvail: '',
      feet: '',
      inches: '',
      azimuthAngle: '',
      mediaList: props.media ? props.media : [],
      optionId: '',
      newImages: [],
      value: props.result ? props.result.value : '',
      comments: props.result ? props.result.comments : '',
      fieldResult: {
        questionId: props.data.id,
        value: '',
        comments: '',
        error: false
      }
    };
    return _this;
  }

  (0, _createClass2["default"])(TakePhoto, [{
    key: "sendDataToProps",
    value: function sendDataToProps() {
      var _this2 = this;

      var state = this.state;
      var fieldMedia = [];
      var fieldResult = {
        mediaCount: 0,
        value: null,
        questionId: this.props.data.id
      };

      if (this.state.newImages.length > 0) {
        this.state.newImages.map(function (item) {
          var photoUploadObj = {
            questionId: _this2.props.data.id,
            s3uri: item.imageUrl,
            act_dist_to_bldg_ft: null,
            act_dist_to_bldg_inch: null,
            actualAzimuthAngle: null,
            actualValue: null,
            angleMeasureName: null,
            angleUnit: null,
            comments: null,
            dist_to_bldg: null,
            dist_to_bldg_avail: null,
            expectedValue: null,
            feet: item.feet,
            inches: item.inches,
            meter: null,
            mime: null,
            targetAzimuthAngle: item.azimuthAngle,
            testMeasurement: null,
            testMeasurementAlternate: null,
            testMeasurementUnit: null,
            testMeasurementUnitAlternate: null,
            uri: null,
            validationIsAccepted: null
          };
          fieldMedia.push(photoUploadObj);
          fieldResult.mediaCount++;
        });
      }

      this.props.collectFieldMedia(fieldMedia);
      this.props.collectFieldResults(fieldResult);
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var options = this.props.data.singleChoiceOptions;
      var videoConstraints = {
        facingMode: this.props.data.customOptions.cameraFacingOptions == 'front' ? 'user' : 'environment'
      };
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "SortableItem rfb-item"
      }, /*#__PURE__*/_react["default"].createElement(_componentHeader["default"], this.props), /*#__PURE__*/_react["default"].createElement("div", {
        className: "form-group"
      }, /*#__PURE__*/_react["default"].createElement(_materialElementLabel["default"], this.props), /*#__PURE__*/_react["default"].createElement(_core.Grid, {
        container: true,
        spacing: 1,
        className: "material-element-container"
      }, /*#__PURE__*/_react["default"].createElement(_core.Grid, {
        item: true,
        xs: 12,
        sm: 4,
        className: "vertical-middle"
      }, /*#__PURE__*/_react["default"].createElement(_core.Typography, {
        component: "span"
      }, "Photo")), /*#__PURE__*/_react["default"].createElement(_core.Grid, {
        item: true,
        xs: 12,
        sm: 8
      }, /*#__PURE__*/_react["default"].createElement(_photoCaptureUpload["default"], {
        read_only: this.props.read_only,
        saveAdditionalOptions: this.saveAdditionalOptions,
        customOptions: this.props.data.customOptions,
        saveUploadImageSrc: function saveUploadImageSrc(modalSource, src) {
          return _this3.setImageSrc(modalSource, src, 'UPLOAD_IMAGE');
        },
        saveImageSrc: function saveImageSrc(modalSource, src) {
          return _this3.setImageSrc(modalSource, src, 'CAPTURE_IMAGE');
        }
      })), this.state.newImages.length > 0 && this.state.newImages.map(function (item) {
        return /*#__PURE__*/_react["default"].createElement("div", {
          style: {
            border: "0px solid grey",
            padding: '10px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center'
          }
        }, /*#__PURE__*/_react["default"].createElement("img", {
          src: item.imageUrl,
          height: "100",
          style: {
            marginBottom: '5px'
          },
          className: "image-upload-preview"
        }), _this3.props.data.customOptions.tapedrop && /*#__PURE__*/_react["default"].createElement("span", null, item.feet + " ft, " + item.inches + " in"));
      }), this.state.mediaList.length > 0 && this.state.mediaList.map(function (mediaItem, mediaIndex) {
        return /*#__PURE__*/_react["default"].createElement("div", {
          style: {
            border: "0px solid grey",
            padding: '10px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center'
          }
        }, /*#__PURE__*/_react["default"].createElement("img", {
          src: mediaItem.s3uri,
          height: "100",
          style: {
            marginBottom: '5px',
            cursor: 'pointer'
          },
          className: "image-upload-preview",
          onClick: function onClick() {
            return _this3.onClickImagePreview(mediaIndex);
          }
        }), _this3.props.data.customOptions.tapedrop && /*#__PURE__*/_react["default"].createElement("span", null, mediaItem.feet + " ft, " + mediaItem.inch + " in"));
      }), this.props.data.customOptions["isRadioGroup"] && /*#__PURE__*/_react["default"].createElement(_core.Grid, {
        item: true,
        xs: 12,
        sm: 9
      }, /*#__PURE__*/_react["default"].createElement(_core.FormControl, {
        component: "fieldset"
      }, /*#__PURE__*/_react["default"].createElement(_core.RadioGroup, {
        name: "single-choice",
        value: this.state.value,
        "aria-label": "Question Text",
        onChange: function onChange(e) {
          return _this3.handleChange(e);
        },
        row: this.props.data.customOptions.isSpreadToColumn
      }, options.map(function (option) {
        return /*#__PURE__*/_react["default"].createElement(_core.FormControlLabel, {
          key: option.key,
          label: option.label,
          value: option.value,
          control: /*#__PURE__*/_react["default"].createElement(_core.Radio, {
            color: "primary"
          })
        });
      })))), this.props.data.customOptions["isCommentsAvail"] && /*#__PURE__*/_react["default"].createElement(_core.Grid, {
        item: true,
        xs: 12,
        sm: 9
      }, /*#__PURE__*/_react["default"].createElement(_core.TextField, {
        fullWidth: true,
        rows: 4,
        variant: "outlined",
        id: this.props.id,
        placeholder: "Comments",
        value: this.state.comments,
        onChange: function onChange(e) {
          return _this3.handleCommentsChange(e);
        },
        name: this.props.data.fieldName
      })), this.props.data.customOptions["isNotApplicable"] && /*#__PURE__*/_react["default"].createElement(_core.Grid, {
        item: true,
        xs: 12,
        sm: 9
      }, /*#__PURE__*/_react["default"].createElement(_core.FormControlLabel, {
        control: /*#__PURE__*/_react["default"].createElement(_core.Checkbox, {
          name: "notApplicable",
          color: "primary"
        }),
        label: "Not Applicable"
      })))));
    }
  }]);
  return TakePhoto;
}(_react["default"].Component);

exports["default"] = TakePhoto;
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

var _videoCaptureUpload = _interopRequireDefault(require("./videoCaptureUpload"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var TakeVideo = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(TakeVideo, _React$Component);

  var _super = _createSuper(TakeVideo);

  function TakeVideo(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, TakeVideo);
    _this = _super.call(this, props);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "setVideoSrc", /*#__PURE__*/function () {
      var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(clickSource, imageFileObj, imageType) {
        var previousVideos, uri, awsS3uri, newVideos;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                previousVideos = _this.state.newVideos; // fetch s3uri from aws

                uri = imageFileObj.imageSrc;

                if (!(_this.props.imageUploadCallback != null)) {
                  _context.next = 7;
                  break;
                }

                _context.next = 5;
                return _this.props.videoUploadCallback(imageFileObj);

              case 5:
                awsS3uri = _context.sent;
                uri = awsS3uri;

              case 7:
                newVideos = {
                  imageUrl: uri,
                  feet: _this.state.feet,
                  inches: _this.state.inches,
                  azimuthAngle: _this.state.azimuthAngle // meter: meter,
                  // centimeter: centimeter

                };
                previousVideos.push(newVideos);
                _context.t0 = videoType;
                _context.next = _context.t0 === 'UPLOAD_VIDEO' ? 12 : _context.t0 === 'CAPTURE_Video' ? 14 : 16;
                break;

              case 12:
                _this.setState({
                  newVideos: previousVideos,
                  feet: '',
                  inches: ''
                }, function () {
                  _this.sendDataToProps();
                });

                return _context.abrupt("break", 17);

              case 14:
                _this.setState({
                  newVideos: previousVideos
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
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "handleVideoUpload", function () {
      var data = _this.props.videoUploadCallback("Sample video url");
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "onClickVideoPreview", function (index) {
      if (_this.props.hasOwnProperty('videoPreview') && _this.props.videoPreview) {
        _this.props.videoPreview('VIDEOS', _this.state.mediaList, index);
      }
    });
    _this.state = {
      isVideoUpload: '',
      isVideoAvail: '',
      feet: '',
      inches: '',
      azimuthAngle: '',
      mediaList: props.media ? props.media : [],
      optionId: '',
      newVideos: [],
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

  (0, _createClass2["default"])(TakeVideo, [{
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
    // handleDeleteVideo = () => {
    //     customOptions.recordedVideo = ""; 
    // }
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
      }, "Video")), /*#__PURE__*/_react["default"].createElement(_core.Grid, {
        item: true,
        xs: 12,
        sm: 8
      }, /*#__PURE__*/_react["default"].createElement(_videoCaptureUpload["default"], {
        isFromMastersScreen: this.props.isFromMastersScreen,
        read_only: this.props.read_only // handleDeleteVedio={this.handleDeleteVedio}
        // saveAdditionalOptions = {this.saveAdditionalOptions}
        ,
        customOptions: this.props.data.customOptions,
        saveUploadVideoSrc: function saveUploadVideoSrc(modalSource, src) {
          return _this3.setVideoSrc(modalSource, src, 'UPLOAD_VIDEO');
        },
        saveVideoSrc: function saveVideoSrc(modalSource, src) {
          return _this3.setVideoSrc(modalSource, src, 'CAPTURE_VIDEO');
        }
      })))));
    }
  }]);
  return TakeVideo;
}(_react["default"].Component);

exports["default"] = TakeVideo;
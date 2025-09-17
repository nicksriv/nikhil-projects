"use strict";

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

var _core = require("@material-ui/core");

var _react = _interopRequireDefault(require("react"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var videoType = 'video/webm';

var WebcamStreamCapture = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(WebcamStreamCapture, _React$Component);

  var _super = _createSuper(WebcamStreamCapture);

  function WebcamStreamCapture(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, WebcamStreamCapture);
    _this = _super.call(this, props);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "handleVideoUpload", function (clickSource, e) {
      var self = (0, _assertThisInitialized2["default"])(_this);
      var target = e.target;
      var file;
      var reader;

      if (target != undefined && target.files && target.files.length) {
        file = target.files[0];
        reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onloadend = function () {
          var videoSrc = reader.result;
          file.videoSrc = videoSrc;

          _this.setState({
            vdoFileObj: file
          });

          _this.setState({
            capturedVideo: ""
          });
        };
      }
    });
    _this.state = {
      recording: false,
      capturedVideo: "",
      vdoFileObj: null
    };
    return _this;
  }

  (0, _createClass2["default"])(WebcamStreamCapture, [{
    key: "componentDidMount",
    value: function () {
      var _componentDidMount = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        var _this2 = this;

        var stream, _stream;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (this.props.isVideoUpload) {
                  _context.next = 17;
                  break;
                }

                _context.prev = 1;
                _context.next = 4;
                return navigator.mediaDevices.getUserMedia({
                  video: true,
                  audio: false
                });

              case 4:
                stream = _context.sent;
                // show it to user
                this.video.srcObject = stream;
                this.video.play(); // init recording

                this.mediaRecorder = new MediaRecorder(stream, {
                  mimeType: videoType
                }); // init data storage for video chunks

                this.chunks = []; // listen for data from media recorder

                this.mediaRecorder.ondataavailable = function (e) {
                  if (e.data && e.data.size > 0) {
                    _this2.chunks.push(e.data);
                  }
                };

                _context.next = 17;
                break;

              case 12:
                _context.prev = 12;
                _context.t0 = _context["catch"](1);
                _stream = null;
                console.log("2");
                this.video.srcObject = _stream;

              case 17:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[1, 12]]);
      }));

      function componentDidMount() {
        return _componentDidMount.apply(this, arguments);
      }

      return componentDidMount;
    }()
  }, {
    key: "startRecording",
    value: function startRecording(e) {
      e.preventDefault(); // wipe old data chunks

      this.chunks = []; // start recorder with 10ms buffer

      this.mediaRecorder.start(10); // say that we're recording

      this.setState({
        recording: true
      });
      this.setState({
        vdoFileObj: ""
      });
    }
  }, {
    key: "stopRecording",
    value: function stopRecording(e) {
      e.preventDefault(); // stop the recorder

      this.mediaRecorder.stop(); // say that we're not recording

      this.setState({
        recording: false
      }); // save the video to memory

      this.saveVideo();
    }
  }, {
    key: "saveVideo",
    value: function saveVideo() {
      // convert saved chunks to blob
      var blob = new Blob(this.chunks, {
        type: videoType
      }); // generate video url from blob

      var videoURL = window.URL.createObjectURL(blob); // append videoURL to list of saved videos for rendering

      this.setState({
        capturedVideo: videoURL
      });
    }
  }, {
    key: "saveCapturedVideo",
    value: function saveCapturedVideo() {
      if (this.props.isVideoUpload) {
        this.props.customOptions.recordedVideo = this.state.vdoFileObj.videoSrc;
        this.props.isModalOpen(false);
      } else {
        this.setState({
          recording: false
        });
        this.props.customOptions.recordedVideo = this.state.capturedVideo;
        this.props.isModalOpen(false);
      }
    }
  }, {
    key: "deleteVideo",
    value: function () {
      var _deleteVideo = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(e) {
        var _this3 = this;

        var stream;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                // filter out current videoURL from the list of saved videos
                this.setState({
                  capturedVideo: ""
                });
                this.setState({
                  vdoFileObj: ""
                });

                if (this.props.isVideoUpload) {
                  _context2.next = 11;
                  break;
                }

                _context2.next = 5;
                return navigator.mediaDevices.getUserMedia({
                  video: true,
                  audio: false
                });

              case 5:
                stream = _context2.sent;
                // show it to user
                this.video.srcObject = stream;
                this.video.play(); // init recording

                this.mediaRecorder = new MediaRecorder(stream, {
                  mimeType: videoType
                }); // init data storage for video chunks

                this.chunks = []; // listen for data from media recorder

                this.mediaRecorder.ondataavailable = function (e) {
                  if (e.data && e.data.size > 0) {
                    _this3.chunks.push(e.data);
                  }
                };

              case 11:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function deleteVideo(_x) {
        return _deleteVideo.apply(this, arguments);
      }

      return deleteVideo;
    }()
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      var _this$state = this.state,
          recording = _this$state.recording,
          videos = _this$state.videos,
          capturedVideo = _this$state.capturedVideo,
          vdoFileObj = _this$state.vdoFileObj;
      return capturedVideo ? /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("video", {
        style: {
          width: 400
        },
        src: capturedVideo,
        autoPlay: true,
        loop: true
      }), /*#__PURE__*/_react["default"].createElement(_core.Button, {
        fullWidth: true,
        variant: "contained",
        color: "primary",
        onClick: function onClick(e) {
          return _this4.deleteVideo(e);
        },
        style: {
          marginTop: '10px'
        }
      }, " Delete "), /*#__PURE__*/_react["default"].createElement(_core.Button, {
        fullWidth: true,
        variant: "contained",
        color: "primary",
        onClick: function onClick(e) {
          return _this4.saveCapturedVideo(e);
        },
        style: {
          marginTop: '10px'
        }
      }, "Save")) : vdoFileObj ? /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("video", {
        style: {
          width: 400
        },
        src: vdoFileObj.videoSrc,
        autoPlay: true,
        loop: true
      }), /*#__PURE__*/_react["default"].createElement(_core.Button, {
        fullWidth: true,
        variant: "contained",
        color: "primary",
        onClick: function onClick(e) {
          return _this4.deleteVideo(e);
        },
        style: {
          marginTop: '10px'
        }
      }, " Delete "), /*#__PURE__*/_react["default"].createElement(_core.Button, {
        fullWidth: true,
        variant: "contained",
        color: "primary",
        onClick: function onClick(e) {
          return _this4.saveCapturedVideo(e);
        },
        style: {
          marginTop: '10px'
        }
      }, "Save")) : this.props.isVideoUpload ? /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_core.Button, {
        color: "primary",
        variant: "contained",
        component: "label",
        disableElevation: true,
        style: {
          color: '#FFFFFF'
        } // className={classname}

      }, "Choose Video to Upload", /*#__PURE__*/_react["default"].createElement("input", {
        type: "file",
        accept: 'video/*',
        hidden: true,
        onChange: function onChange(e) {
          return _this4.handleVideoUpload("isVideoUpload", e);
        }
      }))) : /*#__PURE__*/_react["default"].createElement("div", {
        className: "camera"
      }, /*#__PURE__*/_react["default"].createElement("video", {
        style: {
          width: 400
        },
        ref: function ref(v) {
          _this4.video = v;
        }
      }, "Video stream not available."), /*#__PURE__*/_react["default"].createElement("div", null, !recording && /*#__PURE__*/_react["default"].createElement(_core.Button, {
        fullWidth: true,
        variant: "contained",
        color: "primary",
        onClick: function onClick(e) {
          return _this4.startRecording(e);
        },
        style: {
          marginTop: '10px'
        }
      }, " Start Capture "), recording && /*#__PURE__*/_react["default"].createElement(_core.Button, {
        fullWidth: true,
        variant: "contained",
        color: "primary",
        onClick: function onClick(e) {
          return _this4.stopRecording(e);
        },
        style: {
          marginTop: '10px'
        }
      }, " Stop Capture ")));
    }
  }]);
  return WebcamStreamCapture;
}(_react["default"].Component);

exports["default"] = WebcamStreamCapture;
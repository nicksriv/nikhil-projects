"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactGeocode = _interopRequireDefault(require("react-geocode"));
var _componentHeader = _interopRequireDefault(require("../form-elements/component-header"));
var _materialElementLabel = _interopRequireDefault(require("./material-element-label"));
var _core = require("@material-ui/core");
var _Modal = _interopRequireDefault(require("@material-ui/core/Modal"));
var _styles = require("@material-ui/core/styles");
var _reactGoogleMaps = require("react-google-maps");
var _recompose = require("recompose");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
var useStyles = (0, _styles.makeStyles)(function (theme) {
  return {
    paper: {
      position: "absolute",
      width: '100%',
      height: '150px',
      top: 0,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(1),
      outline: "none"
    }
  };
});
var address = '';
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
var LocationCoordinates = /*#__PURE__*/function (_React$Component) {
  _inherits(LocationCoordinates, _React$Component);
  var _super = _createSuper(LocationCoordinates);
  function LocationCoordinates(props) {
    var _this;
    _classCallCheck(this, LocationCoordinates);
    _this = _super.call(this, props);
    _defineProperty(_assertThisInitialized(_this), "getLatLong", function (item) {
      var self = _assertThisInitialized(_this);
      var location = null;
      var lat = '';
      var lng = '';
      if (_this.state.latitude && _this.state.longitude) {
        _this.setState({
          showMapView: true
        });
        _this.setState({
          mapLoaded: true
        });
      } else {
        if (window.navigator && window.navigator.geolocation) {
          location = window.navigator.geolocation;
        }
        if (location) {
          location.getCurrentPosition(function (position) {
            lat = position.coords.latitude;
            lng = position.coords.longitude;
            _reactGeocode.default.setApiKey("AIzaSyDBpf0piumvPzaS0jxs0vWVz_FUDHb0S3M");

            // set response language. Defaults to english.
            _reactGeocode.default.setLanguage("en");
            _reactGeocode.default.setLocationType("ROOFTOP");
            _reactGeocode.default.fromLatLng(lat, lng).then(function (response) {
              var address = response.results[0].formatted_address;
              if (address) {
                self.setState({
                  address: address
                });
                self.onLocationChange(address, lat, lng);
              }
            }, function (error) {
              console.error(error);
            });
            // if(this.props.handleLocationChange) {
            //     this.props.handleLocationChange({
            //         address: address,
            //         latitude: lat,
            //         longitude: lng
            //     });
            // }
            self.setState({
              showMapView: item.props.data.customOptions.displayMapOption !== "Text" ? true : false,
              latitude: lat,
              longitude: lng,
              positions: {
                latitude: lat,
                longitude: lng
              }
            });
          });
        }
      }
    });
    _defineProperty(_assertThisInitialized(_this), "setMarkerPosition", function (ev) {
      if (_this.props.isMapEditable) {
        _this.setState({
          latitude: ev.latLng.lat(),
          longitude: ev.latLng.lng()
        });
        _reactGeocode.default.setApiKey("AIzaSyDBpf0piumvPzaS0jxs0vWVz_FUDHb0S3M");
        _reactGeocode.default.setLanguage("en");
        _reactGeocode.default.setLocationType("ROOFTOP");
        _reactGeocode.default.fromLatLng(ev.latLng.lat(), ev.latLng.lng()).then(function (response) {
          var address = response.results[0].formatted_address;
          console.log(address);
          if (address) {
            _this.setState({
              address: address
            });
            _this.onLocationChange(address, ev.latLng.lat(), ev.latLng.lng());
          }
        }, function (error) {
          console.error(error);
        });
      } else {
        return null;
      }
    });
    _defineProperty(_assertThisInitialized(_this), "handleClose", function () {
      _this.setState({
        showMapView: false
      });
    });
    _defineProperty(_assertThisInitialized(_this), "onLocationChange", function (address, lat, lng) {
      if (_this.props.handleLocationChange) {
        var event = {
          target: {
            value: {
              address: address,
              latitude: lat,
              longitude: lng
            }
          }
        };
        console.log(event);
        _this.props.handleLocationChange(event);
      }
    });
    _defineProperty(_assertThisInitialized(_this), "getLoactionFromAddress", function () {
      _reactGeocode.default.setApiKey("AIzaSyDBpf0piumvPzaS0jxs0vWVz_FUDHb0S3M");
      _reactGeocode.default.setLanguage("en");
      _reactGeocode.default.setLocationType("ROOFTOP");
      _reactGeocode.default.fromLatLng(_this.state.latitude, _this.state.longitude).then(function (response) {
        var address = response.results[0].formatted_address;
        if (address) {
          _this.onLocationChange(address, _this.state.latitude, _this.state.longitude);
          _this.setState({
            'address': address,
            "latitude": _this.state.latitude,
            "longitude": _this.state.longitude,
            showMapView: true
          });
          // formik.setFieldValue([data.id], { latitude: lat, longitude: lng});
        }
      }, function (error) {
        console.error(error);
      });
    });
    _defineProperty(_assertThisInitialized(_this), "handleAddress", function (e) {
      var value = e.target.value;
      _this.setState({
        address: value
      });
      _reactGeocode.default.setApiKey("AIzaSyDBpf0piumvPzaS0jxs0vWVz_FUDHb0S3M");
      _reactGeocode.default.setLanguage("en");
      _reactGeocode.default.setLocationType("ROOFTOP");
      _reactGeocode.default.fromAddress(value).then(function (response) {
        var _response$results$0$g = response.results[0].geometry.location,
          lat = _response$results$0$g.lat,
          lng = _response$results$0$g.lng;
        _this.setState({
          latitude: lat,
          longitude: lng
        });
      }, function (error) {
        console.error(error);
      });
    });
    _this.state = {
      showLatLong: false,
      latitude: '',
      longitude: '',
      showMapView: false,
      positions: {
        latitude: '',
        longitude: ''
      },
      address: ''
    };
    return _this;
  }
  _createClass(LocationCoordinates, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.props.data.customOptions.defaultValue) {
        var v = this.props.data.customOptions.defaultValue;
        this.setState({
          latitude: v.latitude,
          longitude: v.longitude,
          address: v.address,
          positions: {
            latitude: v.latitude,
            longitude: v.longitude
          }
        });
      }
    }
  }, {
    key: "render",
    value:
    // pointMaker = (data) => {
    //     const lat = data.latLng.lat();
    //     const lng = data.latLng.lng();
    //     this.setState({ showMapView: false, showLatLong: true, latitude: lat, longitude: lng, positions: { latitude: lat, longitude: lng } });
    // }

    function render() {
      var _this2 = this;
      var MapView = function MapView() {
        var classes = useStyles();
        var _useState = (0, _react.useState)(getModalStyle),
          _useState2 = _slicedToArray(_useState, 1),
          modalStyle = _useState2[0];
        var MyMapComponent = (0, _recompose.compose)((0, _recompose.withProps)({
          googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyDBpf0piumvPzaS0jxs0vWVz_FUDHb0S3M&v=3.exp&libraries=geometry,drawing,places",
          loadingElement: /*#__PURE__*/_react.default.createElement("div", {
            style: {
              height: "100%"
            }
          }),
          containerElement: /*#__PURE__*/_react.default.createElement("div", {
            style: {
              height: "134px"
            }
          }),
          mapElement: /*#__PURE__*/_react.default.createElement("div", {
            style: {
              height: "100%"
            }
          })
        }), _reactGoogleMaps.withScriptjs, _reactGoogleMaps.withGoogleMap)(function (props) {
          return /*#__PURE__*/_react.default.createElement(_reactGoogleMaps.GoogleMap, {
            defaultZoom: 8,
            defaultCenter: {
              lat: _this2.state.latitude ? _this2.state.latitude : _this2.state.positions.latitude,
              lng: _this2.state.longitude ? _this2.state.longitude : _this2.state.positions.longitude
            },
            onClick: function onClick(ev) {
              return _this2.setMarkerPosition(ev);
            }
          }, /*#__PURE__*/_react.default.createElement(_reactGoogleMaps.Marker, {
            position: _this2.props.isMapEditable ? {
              lat: _this2.state.latitude,
              lng: _this2.state.longitude
            } : {
              lat: _this2.state.positions.latitude,
              lng: _this2.state.positions.longitude
            }
          }));
        });
        return /*#__PURE__*/_react.default.createElement("div", {
          className: classes.paper
        }, /*#__PURE__*/_react.default.createElement(MyMapComponent, null));
      };
      // const disabled = this.props.read_only || false; 
      var propsData = this.props.data;
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "SortableItem rfb-item"
      }, !this.props.fromDisablePointView ? /*#__PURE__*/_react.default.createElement(_componentHeader.default, this.props) : null, /*#__PURE__*/_react.default.createElement("div", {
        className: "form-group"
      }, /*#__PURE__*/_react.default.createElement(_materialElementLabel.default, this.props), !this.state.showLatLong && /*#__PURE__*/_react.default.createElement(_core.Grid, null, this.state.showMapView ? /*#__PURE__*/_react.default.createElement(MapView, null, /*#__PURE__*/_react.default.createElement("p", null, "map")) : propsData.customOptions.displayMapOption !== "Text" ? /*#__PURE__*/_react.default.createElement("img", {
        style: {
          height: "150px",
          position: "inherit",
          width: "100%"
        },
        src: "/assets/images/map.png",
        alt: "map"
      }) : null, this.props.read_only ? null : /*#__PURE__*/_react.default.createElement(_core.Button, {
        variant: "contained",
        disabled: propsData.customOptions.checked ? false : true,
        onClick: function onClick() {
          return _this2.getLatLong(_this2);
        },
        style: {
          marginTop: this.state.showMapView ? "0rem" : "15px",
          marginBottom: this.state.showMapView ? "1.5rem" : "",
          backgroundColor: "transparent",
          border: "1px solid #2C3E93",
          color: "#2C3E93",
          fontWeight: "500",
          float: "right"
        }
      }, "GET LOCATION"), propsData.customOptions.displayMapOption !== "Map" && /*#__PURE__*/_react.default.createElement("div", {
        style: {
          marginTop: this.state.showMapView ? "8.5rem" : "3.5rem"
        }
      }, /*#__PURE__*/_react.default.createElement("p", {
        style: {
          marginBottom: "-0.1rem",
          fontWeight: "400",
          color: "rgba(0,0,0,0.7)"
        }
      }, propsData.customOptions.addressLabel), this.props.isMapEditable ? /*#__PURE__*/_react.default.createElement(_core.TextField, {
        variant: "outlined",
        fullWidth: true,
        value: this.state.address,
        placeholder: "Address appear here",
        onBlur: this.getLoactionFromAddress,
        onChange: function onChange(e) {
          return _this2.handleAddress(e);
        }
      }) : /*#__PURE__*/_react.default.createElement("p", {
        style: {
          fontWeight: "400",
          color: "#B7B7B6",
          fontSize: "1.02rem"
        }
      }, this.state.address ? this.state.address : "Address appear here")))));
    }
  }]);
  return LocationCoordinates;
}(_react.default.Component);
var _default = LocationCoordinates;
exports.default = _default;
"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
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

var _reactGeocode = _interopRequireDefault(require("react-geocode"));

var _componentHeader = _interopRequireDefault(require("../form-elements/component-header"));

var _materialElementLabel = _interopRequireDefault(require("./material-element-label"));

var _core = require("@material-ui/core");

var _Modal = _interopRequireDefault(require("@material-ui/core/Modal"));

var _styles = require("@material-ui/core/styles");

var _reactGoogleMaps = require("react-google-maps");

var _recompose = require("recompose");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

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
  (0, _inherits2["default"])(LocationCoordinates, _React$Component);

  var _super = _createSuper(LocationCoordinates);

  function LocationCoordinates(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, LocationCoordinates);
    _this = _super.call(this, props);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "getLatLong", function (item) {
      var self = (0, _assertThisInitialized2["default"])(_this);
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

            _reactGeocode["default"].setApiKey("AIzaSyDBpf0piumvPzaS0jxs0vWVz_FUDHb0S3M"); // set response language. Defaults to english.


            _reactGeocode["default"].setLanguage("en");

            _reactGeocode["default"].setLocationType("ROOFTOP");

            _reactGeocode["default"].fromLatLng(lat, lng).then(function (response) {
              var address = response.results[0].formatted_address;

              if (address) {
                self.setState({
                  address: address
                });
                self.onLocationChange(address, lat, lng);
              }
            }, function (error) {
              console.error(error);
            }); // if(this.props.handleLocationChange) {
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
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "handleClose", function () {
      _this.setState({
        showMapView: false
      });
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "onLocationChange", function (address, lat, lng) {
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

        _this.props.handleLocationChange(event);
      }
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

  (0, _createClass2["default"])(LocationCoordinates, [{
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
    // pointMaker = (data) => {
    //     const lat = data.latLng.lat();
    //     const lng = data.latLng.lng();
    //     this.setState({ showMapView: false, showLatLong: true, latitude: lat, longitude: lng, positions: { latitude: lat, longitude: lng } });
    // }
    value: function render() {
      var _this2 = this;

      var MapView = function MapView() {
        var classes = useStyles();

        var _useState = (0, _react.useState)(getModalStyle),
            _useState2 = (0, _slicedToArray2["default"])(_useState, 1),
            modalStyle = _useState2[0];

        var MyMapComponent = (0, _recompose.compose)((0, _recompose.withProps)({
          googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyDBpf0piumvPzaS0jxs0vWVz_FUDHb0S3M&v=3.exp&libraries=geometry,drawing,places",
          loadingElement: /*#__PURE__*/_react["default"].createElement("div", {
            style: {
              height: "100%"
            }
          }),
          containerElement: /*#__PURE__*/_react["default"].createElement("div", {
            style: {
              height: "134px"
            }
          }),
          mapElement: /*#__PURE__*/_react["default"].createElement("div", {
            style: {
              height: "100%"
            }
          })
        }), _reactGoogleMaps.withScriptjs, _reactGoogleMaps.withGoogleMap)(function (props) {
          return /*#__PURE__*/_react["default"].createElement(_reactGoogleMaps.GoogleMap, {
            defaultZoom: 8,
            defaultCenter: {
              lat: _this2.state.positions.latitude,
              lng: _this2.state.positions.longitude
            }
          }, /*#__PURE__*/_react["default"].createElement(_reactGoogleMaps.Marker, {
            position: {
              lat: _this2.state.positions.latitude,
              lng: _this2.state.positions.longitude
            }
          }));
        });
        return /*#__PURE__*/_react["default"].createElement("div", {
          className: classes.paper
        }, /*#__PURE__*/_react["default"].createElement(MyMapComponent, null));
      }; // const disabled = this.props.read_only || false; 


      var propsData = this.props.data;
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "SortableItem rfb-item"
      }, !this.props.fromDisablePointView ? /*#__PURE__*/_react["default"].createElement(_componentHeader["default"], this.props) : null, /*#__PURE__*/_react["default"].createElement("div", {
        className: "form-group"
      }, /*#__PURE__*/_react["default"].createElement(_materialElementLabel["default"], this.props), !this.state.showLatLong && /*#__PURE__*/_react["default"].createElement(_core.Grid, null, this.state.showMapView ? /*#__PURE__*/_react["default"].createElement(MapView, null, /*#__PURE__*/_react["default"].createElement("p", null, "map")) : propsData.customOptions.displayMapOption !== "Text" ? /*#__PURE__*/_react["default"].createElement("img", {
        style: {
          height: "150px",
          position: "inherit",
          width: "100%"
        },
        src: "/assets/images/map.png",
        alt: "map"
      }) : null, this.props.read_only ? null : /*#__PURE__*/_react["default"].createElement(_core.Button, {
        variant: "contained",
        disabled: propsData.customOptions.checked ? false : true,
        onClick: function onClick() {
          return _this2.getLatLong(_this2);
        },
        style: {
          marginTop: this.state.showMapView ? "0rem" : "15px",
          marginBottom: this.state.showMapView ? "1.5rem" : "",
          backgroundColor: "transparent",
          border: "1px solid #51BFB6",
          color: "#51BFB6",
          fontWeight: "500",
          "float": "right"
        }
      }, "GET LOCATION"), propsData.customOptions.displayMapOption !== "Map" && /*#__PURE__*/_react["default"].createElement("div", {
        style: {
          marginTop: this.state.showMapView ? "8.5rem" : "3.5rem"
        }
      }, /*#__PURE__*/_react["default"].createElement("p", {
        style: {
          marginBottom: "-0.1rem",
          fontWeight: "400",
          color: "rgba(0,0,0,0.7)"
        }
      }, propsData.customOptions.addressLabel), /*#__PURE__*/_react["default"].createElement("p", {
        style: {
          fontWeight: "400",
          color: "#B7B7B6",
          fontSize: "1.02rem"
        }
      }, this.state.address ? this.state.address : "Address appear here")))));
    }
  }]);
  return LocationCoordinates;
}(_react["default"].Component);

var _default = LocationCoordinates;
exports["default"] = _default;
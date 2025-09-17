"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _objectDestructuringEmpty2 = _interopRequireDefault(require("@babel/runtime/helpers/objectDestructuringEmpty"));

var _react = _interopRequireDefault(require("react"));

var _core = require("@material-ui/core");

var _reactGoogleMaps = require("react-google-maps");

var _recompose = require("recompose");

var _GoogleMapStyles = _interopRequireDefault(require("./GoogleMapStyles"));

var V5LocationMap = function V5LocationMap(props) {
  (0, _objectDestructuringEmpty2["default"])(props);
  var MyMapComponent = (0, _recompose.compose)((0, _recompose.withProps)({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyDBpf0piumvPzaS0jxs0vWVz_FUDHb0S3M&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: /*#__PURE__*/_react["default"].createElement("div", {
      style: {
        height: "100%"
      }
    }),
    containerElement: /*#__PURE__*/_react["default"].createElement("div", {
      style: {
        height: "120px"
      }
    }),
    mapElement: /*#__PURE__*/_react["default"].createElement("div", {
      style: {
        height: "100%"
      }
    })
  }), _reactGoogleMaps.withScriptjs, _reactGoogleMaps.withGoogleMap)(function (props) {
    return /*#__PURE__*/_react["default"].createElement(_reactGoogleMaps.GoogleMap, {
      defaultZoom: 4,
      defaultCenter: {
        lat: -34.397,
        lng: 150.644
      } //options={{ streetViewControl: false }}
      ,
      defaultOptions: {
        disableDefaultUI: true,
        // disable default map UI
        draggable: false,
        // make map draggable
        keyboardShortcuts: false,
        // disable keyboard shortcuts
        scaleControl: false,
        // allow scale controle
        scrollwheel: false,
        // allow scroll wheel                
        styles: _GoogleMapStyles["default"] // change default map styles

      }
    }, /*#__PURE__*/_react["default"].createElement(_reactGoogleMaps.Marker, {
      position: {
        lat: -34.397,
        lng: 150.644
      }
    }));
  });
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(MyMapComponent, null), /*#__PURE__*/_react["default"].createElement(_core.Button, {
    size: "small",
    variant: "outlined",
    disabled: true,
    style: {
      fontSize: "0.5rem",
      marginTop: "3px"
    }
  }, "SELECT LOCATION MANUALLY"));
};

var _default = V5LocationMap;
exports["default"] = _default;
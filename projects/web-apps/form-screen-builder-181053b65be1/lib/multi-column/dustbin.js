"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireWildcard(require("react"));

var _reactDnd = require("react-dnd");

var _formElements = _interopRequireDefault(require("../form-elements"));

var _meterialFormElements = _interopRequireDefault(require("../meterial-form-elements"));

var _ItemTypes = _interopRequireDefault(require("../ItemTypes"));

var _customElement = _interopRequireDefault(require("../form-elements/custom-element"));

var _registry = _interopRequireDefault(require("../stores/registry"));

function getCustomElement(item, props) {
  if (!item.component || typeof item.component !== 'function') {
    item.component = _registry["default"].get(item.key);

    if (!item.component) {
      console.error("".concat(item.element, " was not registered"));
    }
  }

  return /*#__PURE__*/_react["default"].createElement(_customElement["default"], (0, _extends2["default"])({}, props, {
    mutable: false,
    key: "form_".concat(item.id),
    data: item
  }));
}

function getFormElement(element, key) {
  if (element.toLowerCase().includes("material")) {
    return _meterialFormElements["default"][element || key];
  } else {
    return _formElements["default"][element || key];
  }
}

function getElement(item, props) {
  if (!item) return null;
  var Element = item.custom ? function () {
    return getCustomElement(item, props);
  } : getFormElement(item.element, item.key);
  return /*#__PURE__*/_react["default"].createElement(_react.Fragment, null, /*#__PURE__*/_react["default"].createElement(Element, (0, _extends2["default"])({}, props, {
    key: "form_".concat(item.id),
    data: item
  })));
}

function getStyle(backgroundColor) {
  return {
    border: '1px solid rgba(0,0,0,0.2)',
    minHeight: '2rem',
    minWidth: '12rem',
    width: '100%',
    backgroundColor: backgroundColor,
    padding: 0,
    "float": 'left'
  };
}

function isContainer(item) {
  if (item.itemType !== _ItemTypes["default"].CARD) {
    var data = item.data;

    if (data) {
      if (data.isContainer) {
        return true;
      }

      if (data.fieldName) {
        return data.fieldName.indexOf('_col_row') > -1;
      }
    }
  }

  return false;
}

var Dustbin = /*#__PURE__*/_react["default"].forwardRef(function (_ref, ref) {
  var greedy = _ref.greedy,
      isOver = _ref.isOver,
      isOverCurrent = _ref.isOverCurrent,
      connectDropTarget = _ref.connectDropTarget,
      items = _ref.items,
      col = _ref.col,
      getDataById = _ref.getDataById,
      rest = (0, _objectWithoutProperties2["default"])(_ref, ["greedy", "isOver", "isOverCurrent", "connectDropTarget", "items", "col", "getDataById"]);
  var item = getDataById(items[col]);
  (0, _react.useImperativeHandle)(ref, function () {
    return {
      onDrop: function onDrop()
      /* dropped */
      {// const { data } = dropped;
        // console.log('onDrop', data);
      }
    };
  }, []);
  var backgroundColor = 'rgba(0, 0, 0, .03)';

  if (isOverCurrent || isOver && greedy) {
    backgroundColor = 'darkgreen';
  }

  var element = getElement(item, rest); // console.log('accepts, canDrop', accepts, canDrop);

  return connectDropTarget( /*#__PURE__*/_react["default"].createElement("div", {
    style: getStyle(backgroundColor)
  }, element));
});

var _default = (0, _reactDnd.DropTarget)(function (props) {
  return props.accepts;
}, {
  drop: function drop(props, monitor, component) {
    if (!component) {
      return;
    }

    var item = monitor.getItem();

    if (!isContainer(item)) {
      component.onDrop(item);

      if (item.data && typeof props.setAsChild === 'function') {
        var isNew = !item.data.id;
        var data = isNew ? item.onCreate(item.data) : item.data;
        props.setAsChild(props.data, data, props.col);
      }
    }
  }
}, function (connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    isOverCurrent: monitor.isOver({
      shallow: true
    }),
    canDrop: monitor.canDrop()
  };
})(Dustbin);

exports["default"] = _default;
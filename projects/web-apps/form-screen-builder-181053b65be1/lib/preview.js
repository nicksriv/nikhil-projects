"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _store = _interopRequireDefault(require("./stores/store"));

var _immutabilityHelper = _interopRequireDefault(require("immutability-helper"));

var _sortableBootstrapFormElements = _interopRequireDefault(require("./sortable-bootstrap-form-elements"));

var _materialElementsEdit = _interopRequireDefault(require("./material-elements-edit"));

var _bootstrapElementsEdit = _interopRequireDefault(require("./bootstrap-elements-edit"));

var _sortableMaterialFormElements = _interopRequireDefault(require("./sortable-material-form-elements"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var PlaceHolder = _sortableBootstrapFormElements["default"].PlaceHolder;

var Preview = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(Preview, _React$Component);

  var _super = _createSuper(Preview);

  function Preview(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, Preview);
    _this = _super.call(this, props);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "editModeOff", function (e) {
      if (_this.editForm.current && !_this.editForm.current.contains(e.target)) {
        _this.manualEditModeOff();
      }
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "manualEditModeOff", function () {
      var editElement = _this.props.editElement;

      if (editElement && editElement.dirty) {
        editElement.dirty = false;

        _this.updateElement(editElement);
      }

      _this.props.manualEditModeOff();
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "updateGlobalStyleOptions", function (propType, value) {
      var _this$state = _this.state,
          data = _this$state.data,
          global_style_options = _this$state.global_style_options;
      global_style_options[propType] = value;

      if (global_style_options.formDefault) {
        data.forEach(function (item, index) {
          item.fieldVariant = global_style_options.globalFieldVariant;
        });
      }

      _this.setState({
        global_style_options: global_style_options
      }, function () {
        console.log("Global styles updated");
      });
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "updateFormDefault", function (element) {
      var global_style_options = _this.state.global_style_options;
      global_style_options.formDefault = !global_style_options.formDefault;
      global_style_options.globalFieldVariant = element.fieldVariant;

      _this.setState({
        global_style_options: global_style_options
      }, function () {
        _this.updateElement(element);
      });
    });
    var onLoad = props.onLoad,
        onPost = props.onPost;

    _store["default"].setExternalHandler(onLoad, onPost);

    _this.editForm = /*#__PURE__*/_react["default"].createRef();
    _this.state = {
      data: props.data || [],
      answer_data: {},
      global_style_options: {
        formDefault: false // globalFieldVariant: "filled", // outlined | filled | standard

      }
    };
    _this.seq = 0;
    _this.SortableElements = props.isDefaultItems ? _sortableBootstrapFormElements["default"] : _sortableMaterialFormElements["default"];

    var onUpdate = _this._onChange.bind((0, _assertThisInitialized2["default"])(_this));

    _store["default"].subscribe(function (state) {
      return onUpdate(state.data);
    });

    _this.getDataById = _this.getDataById.bind((0, _assertThisInitialized2["default"])(_this));
    _this.moveCard = _this.moveCard.bind((0, _assertThisInitialized2["default"])(_this));
    _this.insertCard = _this.insertCard.bind((0, _assertThisInitialized2["default"])(_this));
    _this.setAsChild = _this.setAsChild.bind((0, _assertThisInitialized2["default"])(_this));
    _this.removeChild = _this.removeChild.bind((0, _assertThisInitialized2["default"])(_this));
    _this._onDestroy = _this._onDestroy.bind((0, _assertThisInitialized2["default"])(_this));
    _this.getDataByArrayId = _this.getDataByArrayId.bind((0, _assertThisInitialized2["default"])(_this));
    _this.setArrayAsChild = _this.setArrayAsChild.bind((0, _assertThisInitialized2["default"])(_this));
    _this.removeChildFromArray = _this.removeChildFromArray.bind((0, _assertThisInitialized2["default"])(_this));
    return _this;
  }

  (0, _createClass2["default"])(Preview, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props = this.props,
          data = _this$props.data,
          url = _this$props.url,
          saveUrl = _this$props.saveUrl;

      _store["default"].dispatch('load', {
        loadUrl: url,
        saveUrl: saveUrl,
        data: data || []
      }); // document.addEventListener('mousedown', this.editModeOff);

    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {// document.removeEventListener('mousedown', this.editModeOff);
    }
  }, {
    key: "_setValue",
    value: function _setValue(text) {
      return text.replace(/[^A-Z0-9]+/ig, '_').toLowerCase();
    }
  }, {
    key: "updateElement",
    value: function updateElement(element) {
      var data = this.state.data;
      var found = false;

      for (var i = 0, len = data.length; i < len; i++) {
        if (data[i].childItems) {
          for (var j = 0, len1 = data[i].childItems.length; j < len1; j++) {
            if (data[i].childItems[j] != undefined) {
              var itemList = data[i].childItems[j];

              for (var k = 0, len2 = itemList.length; k < len2; k++) {
                var item = itemList[k];

                if (element.id === item.id) {
                  // data[i] = element;
                  found = true;
                  break;
                }
              }
            }
          }
        }

        if (element.id === data[i].id) {
          data[i] = element;
          found = true;
          break;
        }
      }

      if (found) {
        this.seq = this.seq > 100000 ? 0 : this.seq + 1;

        _store["default"].dispatch('updateOrder', data);
      }
    }
  }, {
    key: "_onChange",
    value: function _onChange(data) {
      var _this2 = this;

      var answer_data = {};
      console.log(data);
      data.forEach(function (item) {
        if (item && item.readOnly && _this2.props.variables[item.variableKey]) {
          answer_data[item.fieldName] = _this2.props.variables[item.variableKey];
        }
      });
      this.setState({
        data: data,
        answer_data: answer_data
      });
    }
  }, {
    key: "_onDestroy",
    value: function _onDestroy(item) {
      var _this3 = this;

      if (item.childItems) {
        item.childItems.forEach(function (x) {
          var child = _this3.getDataById(x);

          if (child) {
            _store["default"].dispatch('delete', child);
          }
        });
      }

      _store["default"].dispatch('delete', item);
    }
  }, {
    key: "getDataById",
    value: function getDataById(id) {
      var data = this.state.data;
      return data.find(function (x) {
        return x && x.id === id;
      });
    }
  }, {
    key: "getDataByArrayId",
    value: function getDataByArrayId(idList) {
      var data = this.state.data;
      var dataArray = [];
      idList.map(function (id) {
        dataArray.push(data.find(function (x) {
          return x && x.id === id;
        }));
      });
      return dataArray;
    }
  }, {
    key: "swapChildren",
    value: function swapChildren(data, item, child, col) {
      if (child.col !== undefined && item.id !== child.parentId) {
        return false;
      }

      if (!(child.col !== undefined && child.col !== col && item.childItems[col])) {
        // No child was assigned yet in both source and target.
        return false;
      }

      var oldId = item.childItems[col];
      var oldItem = this.getDataById(oldId);
      var oldCol = child.col; // eslint-disable-next-line no-param-reassign

      item.childItems[oldCol] = oldId;
      oldItem.col = oldCol; // eslint-disable-next-line no-param-reassign

      item.childItems[col] = child.id;
      child.col = col;

      _store["default"].dispatch('updateOrder', data);

      return true;
    }
  }, {
    key: "setAsChild",
    value: function setAsChild(item, child, col) {
      var data = this.state.data;

      if (this.swapChildren(data, item, child, col)) {
        return;
      }

      var oldParent = this.getDataById(child.parentId);
      var oldCol = child.col; // eslint-disable-next-line no-param-reassign

      item.childItems[col] = child.id;
      child.col = col; // eslint-disable-next-line no-param-reassign

      child.parentId = item.id; // eslint-disable-next-line no-param-reassign

      child.parentIndex = data.indexOf(item);

      if (oldParent) {
        oldParent.childItems[oldCol] = null;
      }

      var list = data.filter(function (x) {
        return x && x.parentId === item.id;
      });
      var toRemove = list.filter(function (x) {
        return item.childItems.indexOf(x.id) === -1;
      });
      var newData = data;

      if (toRemove.length) {
        // console.log('toRemove', toRemove);
        newData = data.filter(function (x) {
          return toRemove.indexOf(x) === -1;
        });
      }

      if (!this.getDataById(child.id)) {
        newData.push(child);
      }

      _store["default"].dispatch('updateOrder', newData);
    }
  }, {
    key: "setArrayAsChild",
    value: function setArrayAsChild(item, child, col) {
      var data = this.state.data;

      if (this.swapChildren(data, item, child, col)) {
        return;
      }

      var oldParent = this.getDataById(child.parentId);
      var oldCol = child.col; // eslint-disable-next-line no-param-reassign

      item.childItems[col].push(child);
      child.col = col; // eslint-disable-next-line no-param-reassign

      child.parentId = item.id; // eslint-disable-next-line no-param-reassign

      child.parentIndex = data.indexOf(item);

      if (oldParent) {
        oldParent.childItems[oldCol] = null;
      } // const list = data.filter(x => x && x.parentId === item.id);
      // const toRemove = list.filter(x => item.childItems.indexOf(x.id) === -1);
      // let newData = data;
      // if (toRemove.length) {
      //   // console.log('toRemove', toRemove);
      //   newData = data.filter(x => toRemove.indexOf(x) === -1);
      // }
      // if (!this.getDataById(child.id)) {
      //   newData.push(child);
      // }
      // store.dispatch('updateOrder', newData);

    }
  }, {
    key: "removeChild",
    value: function removeChild(item, col) {
      var data = this.state.data;
      var oldId = item.childItems[col];
      var oldItem = this.getDataById(oldId);

      if (oldItem) {
        var newData = data.filter(function (x) {
          return x !== oldItem;
        }); // eslint-disable-next-line no-param-reassign

        item.childItems[col] = null; // delete oldItem.parentId;

        this.seq = this.seq > 100000 ? 0 : this.seq + 1;

        _store["default"].dispatch('updateOrder', newData);

        this.setState({
          data: newData
        });
      }
    }
  }, {
    key: "removeChildFromArray",
    value: function removeChildFromArray(item, itemList, col) {
      var data = this.state.data;
      var oldItems = itemList.childItems[col]; // eslint-disable-next-line no-param-reassign

      var remainItems = oldItems.filter(function (x) {
        return x.id != item.id;
      });
      itemList.childItems[col] = remainItems; // delete oldItem.parentId;

      this.seq = this.seq > 100000 ? 0 : this.seq + 1;

      _store["default"].dispatch('updateOrder', data);
    }
  }, {
    key: "restoreCard",
    value: function restoreCard(item, id) {
      var data = this.state.data;
      var parent = this.getDataById(item.data.parentId);
      var oldItem = this.getDataById(id);

      if (parent && oldItem) {
        var newIndex = data.indexOf(oldItem);
        var newData = (0, _toConsumableArray2["default"])(data); // data.filter(x => x !== oldItem);
        // eslint-disable-next-line no-param-reassign

        parent.childItems[oldItem.col] = null;
        delete oldItem.parentId; // eslint-disable-next-line no-param-reassign

        delete item.setAsChild; // eslint-disable-next-line no-param-reassign

        delete item.parentIndex; // eslint-disable-next-line no-param-reassign

        item.index = newIndex;
        this.seq = this.seq > 100000 ? 0 : this.seq + 1;

        _store["default"].dispatch('updateOrder', newData);

        this.setState({
          data: newData
        });
      }
    }
  }, {
    key: "insertCard",
    value: function insertCard(item, hoverIndex, id) {
      var data = this.state.data;

      if (id) {
        this.restoreCard(item, id);
      } else {
        data.splice(hoverIndex, 0, item);
        this.saveData(item, hoverIndex, hoverIndex);
      }
    }
  }, {
    key: "moveCard",
    value: function moveCard(dragIndex, hoverIndex) {
      var _this4 = this;

      var data = this.state.data;
      var dragCard = data[dragIndex];
      setTimeout(function () {
        _this4.saveData(dragCard, dragIndex, hoverIndex), 100;
      });
    } // eslint-disable-next-line no-unused-vars

  }, {
    key: "cardPlaceHolder",
    value: function cardPlaceHolder(dragIndex, hoverIndex) {// Dummy
    }
  }, {
    key: "saveData",
    value: function saveData(dragCard, dragIndex, hoverIndex) {
      var newData = (0, _immutabilityHelper["default"])(this.state, {
        data: {
          $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]]
        }
      });
      this.setState(newData);

      _store["default"].dispatch('updateOrder', newData.data);
    }
  }, {
    key: "getElement",
    value: function getElement(item, index) {
      if (item.custom) {
        if (!item.component || typeof item.component !== 'function') {
          // eslint-disable-next-line no-param-reassign
          item.component = this.props.registry.get(item.key);
        }
      }

      var SortableFormElement = this.SortableElements[item.element];

      if (SortableFormElement === null) {
        return null;
      }

      item.globalStyles = this.state.global_style_options;
      return (
        /*#__PURE__*/
        // <div onDoubleClick={this.props.editModeOn.bind(this.props.parent, item)}>
        _react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(SortableFormElement, {
          id: item.id,
          seq: this.seq,
          index: index,
          moveCard: this.moveCard,
          insertCard: this.insertCard,
          mutable: false,
          parent: this.props.parent,
          editModeOn: this.props.editModeOn,
          isDraggable: true,
          key: item.id,
          sortData: item.id,
          data: item,
          getDataById: this.getDataById,
          setAsChild: this.setAsChild,
          removeChild: this.removeChild,
          removeChildFromArray: this.removeChildFromArray,
          _onDestroy: this._onDestroy,
          getDataByArrayId: this.getDataByArrayId,
          setArrayAsChild: this.setArrayAsChild,
          globalStyles: this.state.global_style_options,
          toolbarItemCheck: this.props.toolbarItemCheck,
          handleTemplateElemChange: this.props.handleTemplateElemChange
        }))
      );
    }
  }, {
    key: "render",
    value: function render() {
      var _this5 = this;

      // console.log(this.state.data)
      //let classes = this.props.className + " " + this.props.previewAlignClass;
      var classes = "".concat(this.props.isAligned ? 'react-form-builder-preview' : this.props.className, " ").concat(this.props.previewAlignClass);

      if (this.props.editMode) {
        classes += ' is-editing';
      }

      var data = this.state.data.filter(function (x) {
        return !!x && !x.parentId;
      });
      var items = data.map(function (item, index) {
        return _this5.getElement(item, index);
      });
      var FormBuilderHeaderComp = this.props.formBuilderHeaderComponent;
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: classes
      }, /*#__PURE__*/_react["default"].createElement(FormBuilderHeaderComp, {
        pageMode: this.props.pageMode,
        screenTitle: this.props.screenTitle
      }), /*#__PURE__*/_react["default"].createElement("div", {
        className: this.props.editFormClasses,
        style: {
          backgroundColor: 'transparent',
          transition: !this.props.editMode ? '.5s' : 'none',
          width: this.props.editMode ? '100%' : ''
        }
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: this.props.editFormClasses,
        ref: this.editForm
      }, this.props.editElement !== null && (this.props.isDefaultItems ? /*#__PURE__*/_react["default"].createElement(_bootstrapElementsEdit["default"], {
        isDefaultItems: this.props.isDefaultItems,
        showCorrectColumn: this.props.showCorrectColumn,
        files: this.props.files,
        closeEdit: this.props.manualEditModeOff,
        manualEditModeOff: this.manualEditModeOff,
        preview: this,
        element: this.props.editElement,
        updateElement: this.updateElement,
        globalStyles: this.state.global_style_options,
        updateGlobalStyleOptions: this.updateGlobalStyleOptions,
        updateFormDefault: this.updateFormDefault,
        fileId: this.props.fileId,
        uploadFile: this.props.uploadFile
      }) : /*#__PURE__*/_react["default"].createElement(_materialElementsEdit["default"], {
        fromMainView: "true",
        isDefaultItems: this.props.isDefaultItems,
        showCorrectColumn: this.props.showCorrectColumn,
        files: this.props.files,
        closeEdit: this.props.manualEditModeOff,
        manualEditModeOff: this.manualEditModeOff,
        preview: this,
        element: this.props.editElement,
        updateElement: this.updateElement,
        globalStyles: this.state.global_style_options,
        updateGlobalStyleOptions: this.updateGlobalStyleOptions,
        updateFormDefault: this.updateFormDefault,
        fileId: this.props.fileId,
        uploadFile: this.props.uploadFile
      })))), /*#__PURE__*/_react["default"].createElement("div", {
        className: "Sortable"
      }, items), /*#__PURE__*/_react["default"].createElement(PlaceHolder, {
        id: "form-place-holder",
        show: items.length === 0,
        index: items.length,
        moveCard: this.cardPlaceHolder,
        insertCard: this.insertCard
      }));
    }
  }]);
  return Preview;
}(_react["default"].Component);

exports["default"] = Preview;
Preview.defaultProps = {
  showCorrectColumn: false,
  files: [],
  editMode: false,
  editElement: null,
  className: 'col-md-9 react-form-builder-preview'
};
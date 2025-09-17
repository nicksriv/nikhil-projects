"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = editForm;
var _react = _interopRequireDefault(require("react"));
var _store = _interopRequireDefault(require("./stores/store"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
  * <EditForm />
  */

function editForm(props) {
  function generateDataItems() {
    if (!props.hasOwnProperty('editJSON') || !props.editJSON) {
      alert("JSON not found!");
      return;
    }
    var json = props.editJSON;
    _store.default.dispatch('updateOrder', json.list);
  }
  return /*#__PURE__*/_react.default.createElement("button", {
    className: "btn btn-default float-right",
    style: {
      marginRight: '10px'
    },
    onClick: function onClick() {
      return generateDataItems();
    }
  }, "Edit Form");
}
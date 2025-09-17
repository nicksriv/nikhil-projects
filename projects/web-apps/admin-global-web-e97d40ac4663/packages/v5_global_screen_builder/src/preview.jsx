/**
  * <Preview />
  */

import React from 'react';
import store from './stores/store';
import update from 'immutability-helper';
import FormElements from './sortable-bootstrap-form-elements';
import MaterialElementsEdit from './material-elements-edit';
import BootstrapElementsEdit from './bootstrap-elements-edit';
import MaterialFormElements from './sortable-material-form-elements';

const { PlaceHolder } = FormElements;

export default class Preview extends React.Component {
  constructor(props) {
    super(props);
    const { onLoad, onPost } = props;
    store.setExternalHandler(onLoad, onPost);

    this.editForm = React.createRef();
    this.state = {
      data: props.data || [],
      answer_data: {},
      global_style_options: {
        formDefault: false,
        // globalFieldVariant: "filled", // outlined | filled | standard
      }
    };
    this.seq = 0;
    this.SortableElements = (props.isDefaultItems) ? FormElements : MaterialFormElements;

    const onUpdate = this._onChange.bind(this);
    store.subscribe(state => onUpdate(state.data));

    this.getDataById = this.getDataById.bind(this);
    this.moveCard = this.moveCard.bind(this);
    this.insertCard = this.insertCard.bind(this);
    this.setAsChild = this.setAsChild.bind(this);
    this.removeChild = this.removeChild.bind(this);
    this._onDestroy = this._onDestroy.bind(this);
    this.getDataByArrayId = this.getDataByArrayId.bind(this);
    this.setArrayAsChild = this.setArrayAsChild.bind(this);
    this.removeChildFromArray = this.removeChildFromArray.bind(this);
  }
  componentDidMount() {
    const { data, url, saveUrl } = this.props;
    store.dispatch('load', { loadUrl: url, saveUrl, data: data || [] });
    // document.addEventListener('mousedown', this.editModeOff);
  }

  componentWillUnmount() {
    // document.removeEventListener('mousedown', this.editModeOff);
  }

  editModeOff = (e) => {
    if (this.editForm.current && !this.editForm.current.contains(e.target)) {
      this.manualEditModeOff();
    }
  }

  // manualEditModeOff = () => {
  //   const { editElement } = this.props;
  //   if (editElement && editElement.dirty) {
  //     editElement.dirty = false;
  //     this.updateElement(editElement);
  //   }
  //   this.props.manualEditModeOff();
  // }

  manualEditModeOff = () => {
    const { editElement } = this.props;
    if ( (editElement && editElement.dirty) || (editElement && editElement.element === "Dropdown")) {
      editElement.dirty = false;
      this.updateElement(editElement);
    }
    this.props.manualEditModeOff();
  }

  updateGlobalStyleOptions = (propType, value) => {
    let { data, global_style_options } = this.state;
    global_style_options[propType] = value;
    if (global_style_options.formDefault) {
      data.forEach((item, index) => {
        item.fieldVariant = global_style_options.globalFieldVariant;
      })
    }

    this.setState({ global_style_options: global_style_options },
      () => {
        console.log("Global styles updated");
      });
  }

  updateFormDefault = (element) => {
    let { global_style_options } = this.state;
    global_style_options.formDefault = !global_style_options.formDefault;
    global_style_options.globalFieldVariant = element.fieldVariant;
    this.setState({
      global_style_options: global_style_options
    }, () => {
      this.updateElement(element);
    })
  }


  _setValue(text) {
    return text.replace(/[^A-Z0-9]+/ig, '_').toLowerCase();
  }

  updateElement(element) {
    const { data } = this.state;
    let found = false;

    for (let i = 0, len = data.length; i < len; i++) {
      if (data[i].childItems) {
        for (let j = 0, len1 = data[i].childItems.length; j < len1; j++) {
          if (data[i].childItems[j] != undefined) {
            const itemList = data[i].childItems[j];
            for (let k = 0, len2 = itemList.length; k < len2; k++) {
              const item = itemList[k];
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
      store.dispatch('updateOrder', data);
    }
  }

  _onChange(data) {
    const answer_data = {};
    console.log(data)
    data.forEach((item) => {
      if (item && item.readOnly && this.props.variables[item.variableKey]) {
        answer_data[item.fieldName] = this.props.variables[item.variableKey];
      }
    });

    this.setState({
      data,
      answer_data,
    });
  }

  _onDestroy(item) {
    if (item.childItems) {
      item.childItems.forEach(x => {
        const child = this.getDataById(x);
        if (child) {
          store.dispatch('delete', child);
        }
      });
    }
    store.dispatch('delete', item);
  }

  getDataById(id) {
    const { data } = this.state;
    return data.find(x => x && x.id === id);
  }

  getDataByArrayId(idList) {
    const { data } = this.state;
    const dataArray = [];
    idList.map((id) => {
      dataArray.push(data.find(x => x && x.id === id));
    });
    return dataArray;
  }

  swapChildren(data, item, child, col) {
    if (child.col !== undefined && item.id !== child.parentId) {
      return false;
    }
    if (!(child.col !== undefined && child.col !== col && item.childItems[col])) {
      // No child was assigned yet in both source and target.
      return false;
    }
    const oldId = item.childItems[col];
    const oldItem = this.getDataById(oldId);
    const oldCol = child.col;
    // eslint-disable-next-line no-param-reassign
    item.childItems[oldCol] = oldId; oldItem.col = oldCol;
    // eslint-disable-next-line no-param-reassign
    item.childItems[col] = child.id; child.col = col;
    store.dispatch('updateOrder', data);
    return true;
  }

  setAsChild(item, child, col) {
    const { data } = this.state;
    if (this.swapChildren(data, item, child, col)) {
      return;
    }
    const oldParent = this.getDataById(child.parentId);
    const oldCol = child.col;
    // eslint-disable-next-line no-param-reassign
    item.childItems[col] = child.id; child.col = col;
    // eslint-disable-next-line no-param-reassign
    child.parentId = item.id;
    // eslint-disable-next-line no-param-reassign
    child.parentIndex = data.indexOf(item);
    if (oldParent) {
      oldParent.childItems[oldCol] = null;
    }
    const list = data.filter(x => x && x.parentId === item.id);
    const toRemove = list.filter(x => item.childItems.indexOf(x.id) === -1);
    let newData = data;
    if (toRemove.length) {
      // console.log('toRemove', toRemove);
      newData = data.filter(x => toRemove.indexOf(x) === -1);
    }
    if (!this.getDataById(child.id)) {
      newData.push(child);
    }
    store.dispatch('updateOrder', newData);
  }

  setArrayAsChild(item, child, col) {
    const { data } = this.state;
    if (this.swapChildren(data, item, child, col)) {
      return;
    }
    const oldParent = this.getDataById(child.parentId);
    const oldCol = child.col;
    // eslint-disable-next-line no-param-reassign
    item.childItems[col].push(child); child.col = col;
    // eslint-disable-next-line no-param-reassign
    child.parentId = item.id;
    // eslint-disable-next-line no-param-reassign
    child.parentIndex = data.indexOf(item);
    if (oldParent) {
      oldParent.childItems[oldCol] = null;
    }
    // const list = data.filter(x => x && x.parentId === item.id);
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

  removeChild(item, col) {
    const { data } = this.state;
    const oldId = item.childItems[col];
    const oldItem = this.getDataById(oldId);
    if (oldItem) {
      const newData = data.filter(x => x !== oldItem);
      // eslint-disable-next-line no-param-reassign
      item.childItems[col] = null;
      // delete oldItem.parentId;
      this.seq = this.seq > 100000 ? 0 : this.seq + 1;
      store.dispatch('updateOrder', newData);
      this.setState({ data: newData });
    }
  }

  removeChildFromArray(item, itemList, col) {
    const { data } = this.state;
    const oldItems = itemList.childItems[col];
    // eslint-disable-next-line no-param-reassign
    const remainItems = oldItems.filter(x => x.id != item.id);
    itemList.childItems[col] = remainItems;
    // delete oldItem.parentId;
    this.seq = this.seq > 100000 ? 0 : this.seq + 1;
    store.dispatch('updateOrder', data);
  }

  restoreCard(item, id) {
    const { data } = this.state;
    const parent = this.getDataById(item.data.parentId);
    const oldItem = this.getDataById(id);
    if (parent && oldItem) {
      const newIndex = data.indexOf(oldItem);
      const newData = [...data]; // data.filter(x => x !== oldItem);
      // eslint-disable-next-line no-param-reassign
      parent.childItems[oldItem.col] = null;
      delete oldItem.parentId;
      // eslint-disable-next-line no-param-reassign
      delete item.setAsChild;
      // eslint-disable-next-line no-param-reassign
      delete item.parentIndex;
      // eslint-disable-next-line no-param-reassign
      item.index = newIndex;
      this.seq = this.seq > 100000 ? 0 : this.seq + 1;
      store.dispatch('updateOrder', newData);
      this.setState({ data: newData });
    }
  }

  insertCard(item, hoverIndex, id) {
    const { data } = this.state;
    if (id) {
      this.restoreCard(item, id);
    } else {
      data.splice(hoverIndex, 0, item);
      this.saveData(item, hoverIndex, hoverIndex);
    }
  }

  moveCard(dragIndex, hoverIndex) {
    const { data } = this.state;
    const dragCard = data[dragIndex];
    setTimeout(() => {this.saveData(dragCard, dragIndex, hoverIndex),100});
  }

  // eslint-disable-next-line no-unused-vars
  cardPlaceHolder(dragIndex, hoverIndex) {
    // Dummy
  }

  saveData(dragCard, dragIndex, hoverIndex) {
    const newData = update(this.state, {
      data: {
        $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]],
      },
    });
    this.setState(newData);
    store.dispatch('updateOrder', newData.data);
  }

  getElement(item, index) {

    if (item.custom) {
      if (!item.component || typeof item.component !== 'function') {
        // eslint-disable-next-line no-param-reassign
        item.component = this.props.registry.get(item.key);
      }
    }
    const SortableFormElement = this.SortableElements[item.element];

    if (SortableFormElement === null) {
      return null;
    }

    item.globalStyles = this.state.global_style_options;

    return (
      // <div onDoubleClick={this.props.editModeOn.bind(this.props.parent, item)}>
      <div>
        <SortableFormElement id={item.id} seq={this.seq} index={index} moveCard={this.moveCard} insertCard={this.insertCard} mutable={false} parent={this.props.parent} editModeOn={this.props.editModeOn} isDraggable={true} key={item.id} sortData={item.id} data={item} getDataById={this.getDataById} setAsChild={this.setAsChild} removeChild={this.removeChild} removeChildFromArray={this.removeChildFromArray} _onDestroy={this._onDestroy} getDataByArrayId={this.getDataByArrayId} setArrayAsChild={this.setArrayAsChild} globalStyles={this.state.global_style_options}
          toolbarItemCheck={this.props.toolbarItemCheck}
          handleTemplateElemChange={this.props.handleTemplateElemChange} />
      </div>

    );
  }

  render() {
    // console.log(this.state.data)
    //let classes = this.props.className + " " + this.props.previewAlignClass;
    let classes = `${this.props.isAligned ? 'react-form-builder-preview' : this.props.className} ${this.props.previewAlignClass}`;

    if (this.props.editMode) { classes += ' is-editing'; }
    const data = this.state.data.filter(x => !!x && !x.parentId);
    const items = data.map((item, index) => this.getElement(item, index));
    const FormBuilderHeaderComp = this.props.formBuilderHeaderComponent;
    
    return (
      <div className={classes}>
        <FormBuilderHeaderComp pageMode={this.props.pageMode}
                                            screenTitle={this.props.screenTitle}/>
        <div className={this.props.editFormClasses} style={{ backgroundColor: 'transparent', transition: !this.props.editMode ? '.5s' : 'none', width: this.props.editMode ? '100%' : '' }}>
          <div className={this.props.editFormClasses} ref={this.editForm}>
            {this.props.editElement !== null &&
              (this.props.isDefaultItems ?
                <BootstrapElementsEdit isDefaultItems={this.props.isDefaultItems} showCorrectColumn={this.props.showCorrectColumn} files={this.props.files} closeEdit={this.props.manualEditModeOff} manualEditModeOff={this.manualEditModeOff} preview={this} element={this.props.editElement} updateElement={this.updateElement} globalStyles={this.state.global_style_options} updateGlobalStyleOptions={this.updateGlobalStyleOptions} updateFormDefault={this.updateFormDefault} fileId={this.props.fileId} uploadFile={this.props.uploadFile}/>
                :
                <MaterialElementsEdit fromMainView="true" isDefaultItems={this.props.isDefaultItems} showCorrectColumn={this.props.showCorrectColumn} files={this.props.files} closeEdit={this.props.manualEditModeOff} manualEditModeOff={this.manualEditModeOff} preview={this} element={this.props.editElement} updateElement={this.updateElement} globalStyles={this.state.global_style_options} updateGlobalStyleOptions={this.updateGlobalStyleOptions} updateFormDefault={this.updateFormDefault} fileId={this.props.fileId} uploadFile={this.props.uploadFile}/>)
            }
          </div>
        </div>
        <div className="Sortable">{items}</div>
        <PlaceHolder id="form-place-holder" show={items.length === 0} index={items.length} moveCard={this.cardPlaceHolder} insertCard={this.insertCard} />
      </div>

    );
  }
}
Preview.defaultProps = {
  showCorrectColumn: false, files: [], editMode: false, editElement: null, className: 'col-md-9 react-form-builder-preview',
};

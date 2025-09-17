/**
  * <Form />
  */

import React from 'react';
import ReactDOM from 'react-dom';
import { EventEmitter } from 'fbemitter';
import FormValidator from './form-validator';
import BootstrapElements from './form-elements';
import { Two_Column_Row, Three_Column_Row, Four_Column_Row } from './multi-column';
import Tabs from './meterial-form-elements/tabs';
import CustomElement from './form-elements/custom-element';
import Registry from './stores/registry';
import MaterialElements from './meterial-form-elements';
import GenerateJSON from './generateJson';
import { Button } from '@material-ui/core';

const {
  Image, Checkboxes, Download, Camera,
} = BootstrapElements;

const {
  Dropdown, Email, Header, Number, Phone, Photo_PrePost, PhotoCaptureUploadModal, Short_Text, Signature, Single_Choice, Input_Table, Photo } = MaterialElements;

export default class ReactForm extends React.Component {
  form;

  inputs = {};

  answerData;

  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
      fieldResults: [],
      fieldMedia: [],
      submitError: false,
    };
    this.answerData = this._convert(props.answer_data);
    this.emitter = new EventEmitter();
    this.getDataById = this.getDataById.bind(this);
    this.FormElements = (props.isBootstrapItems) ? BootstrapElements : MaterialElements
  }

  bindFieldResults(item) {
    if (!this.props.fieldResult)
      return null;

    if (!this.props.fieldResult.length)
      return null;

    const fieldResult = this.props.fieldResult;
    const result = fieldResult.filter(resultItem => item.id == resultItem.questionId);

    return result[0];
  }

  bindFieldMedia(item) {
    if (!this.props.fieldMedia)
      return null;

    if (!this.props.fieldMedia.length)
      return null;

    const fieldMedia = this.props.fieldMedia;
    const media = fieldMedia.filter(resultItem => item.id == resultItem.questionId);

    return media;
  }

  _convert(answers) {
    if (Array.isArray(answers)) {
      const result = {};
      answers.forEach(x => {
        if (x.name.indexOf('tags_') > -1) {
          result[x.name] = x.value.map(y => y.value);
        } else {
          result[x.name] = x.value;
        }
      });
      return result;
    }
    return answers || {};
  }

  _getDefaultValue(item) {
    return this.answerData[item.fieldName];
  }

  _optionsDefaultValue(item) {
    const defaultValue = this._getDefaultValue(item);
    if (defaultValue) {
      return defaultValue;
    }

    const defaultChecked = [];
    item.options.forEach(option => {
      if (this.answerData[`option_${option.key}`]) {
        defaultChecked.push(option.key);
      }
    });
    return defaultChecked;
  }

  _getItemValue(item, ref) {
    let $item = {
      element: item.element,
      value: '',
    };
    if (item.element === 'Rating') {
      $item.value = ref.inputField.current.state.rating;
    } else if (item.element === 'Tags') {
      $item.value = ref.inputField.current.state.value;
    } else if (item.element === 'DatePicker') {
      $item.value = ref.state.value;
    } else if (item.element === 'Camera') {
      $item.value = ref.state.img ? ref.state.img.replace('data:image/png;base64,', '') : '';
    } else if (ref && ref.inputField && ref.inputField.current) {
      $item = ReactDOM.findDOMNode(ref.inputField.current);
      if ($item && typeof $item.value === 'string') {
        $item.value = $item.value.trim();
      }
    }
    return $item;
  }

  _isIncorrect(item) {
    let incorrect = false;
    if (item.canHaveAnswer) {
      const ref = this.inputs[item.fieldName];
      if (item.element === 'Checkboxes' || item.element === 'RadioButtons') {
        item.options.forEach(option => {
          const $option = ReactDOM.findDOMNode(ref.options[`child_ref_${option.key}`]);
          if ((option.hasOwnProperty('correct') && !$option.checked) || (!option.hasOwnProperty('correct') && $option.checked)) {
            incorrect = true;
          }
        });
      } else {
        const $item = this._getItemValue(item, ref);
        if (item.element === 'Rating') {
          if ($item.value.toString() !== item.correct) {
            incorrect = true;
          }
        } else if ($item.value.toLowerCase() !== item.correct.trim().toLowerCase()) {
          incorrect = true;
        }
      }
    }
    return incorrect;
  }

  _isInvalid(item) {
    let invalid = false;
    if (item.required === true) {
      const ref = this.inputs[item.fieldName];
      if (item.element === 'Checkboxes' || item.element === 'RadioButtons') {
        let checked_options = 0;
        item.options.forEach(option => {
          const $option = ReactDOM.findDOMNode(ref.options[`child_ref_${option.key}`]);
          if ($option.checked) {
            checked_options += 1;
          }
        });
        if (checked_options < 1) {
          // errors.push(item.label + ' is required!');
          invalid = true;
        }
      } else {
        const $item = this._getItemValue(item, ref);
        if (item.element === 'Rating') {
          if ($item.value === 0) {
            invalid = true;
          }
        } else if ($item.value === undefined || $item.value.length < 1) {
          invalid = true;
        }
      }
    }
    return invalid;
  }

  _collect(item) {
    const itemData = { name: item.fieldName };
    const ref = this.inputs[item.fieldName];
    if (item.element === 'Checkboxes' || item.element === 'RadioButtons') {
      const checked_options = [];
      item.options.forEach(option => {
        const $option = ReactDOM.findDOMNode(ref.options[`child_ref_${option.key}`]);
        if ($option.checked) {
          checked_options.push(option.key);
        }
      });
      itemData.value = checked_options;
    } else {
      if (!ref) return null;
      itemData.value = this._getItemValue(item, ref).value;
    }
    return itemData;
  }

  _collectFormData(data) {
    const formData = [];
    data.forEach(item => {
      const item_data = this._collect(item);
      if (item_data) {
        formData.push(item_data);
      }
    });
    return formData;
  }

  _getSignatureImg(item) {
    const ref = this.inputs[item.fieldName];
    const $canvas_sig = ref.canvas.current;
    if ($canvas_sig) {
      const base64 = $canvas_sig.toDataURL().replace('data:image/png;base64,', '');
      const isEmpty = $canvas_sig.isEmpty();
      const $input_sig = ReactDOM.findDOMNode(ref.inputField.current);
      if (isEmpty) {
        $input_sig.value = '';
      } else {
        $input_sig.value = base64;
      }
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    let errors = [];
    let fieldResultsWithoutError = [];
    if (!this.props.skip_validations) {
      const { fieldResults } = this.state;
      fieldResultsWithoutError = fieldResults.map(item => {
        if (item.error == true) {
          errors.push(item);
        }
        delete item.error;
        return item;
      });
      //  errors = fieldResults.map(item => {return item.error == true});
    }

    // Only submit if there are no errors.
    if (errors.length < 1) {
      //  console.log(fieldResultsWithoutError);
      //  console.log(this.state.fieldResults);
      //  console.log(this.state.fieldMedia);
      this.props.collectFormData(fieldResultsWithoutError, this.state.fieldMedia);
    } else {
      this.setState({ submitError: true });
      console.log("Error in the form submission");
    }
  }

  collectFieldResults(elementResultObj) {
    const { fieldResults } = this.state;
    const elementStateData = fieldResults.filter(element => element.questionId !== elementResultObj.questionId);
    elementStateData.push(elementResultObj);
    this.setState({ fieldResults: elementStateData, submitError: false });
  }

  collectFieldMedia(elementMediaArray) {
    const { fieldMedia } = this.state;
    let filteredArray = fieldMedia;

    elementMediaArray.forEach(elementMediaObj => {
      const arr = filteredArray.filter(item => item.questionId !== elementMediaObj.questionId);
      filteredArray = arr;
    })

    filteredArray = filteredArray.concat(elementMediaArray);
    this.setState({ fieldMedia: filteredArray, submitError: false });
  }

  getDataById(id) {
    const { data } = this.props;
    return data.find(x => x.id === id);
  }

  getDataByArrayId(idList) {
    const { data } = this.props;
    const dataArray = [];
    idList.map((id) => {
      dataArray.push(data.find(x => x && x.id === id));
    });
    return dataArray;
  }

  getMaterialInputElement(item, items) {
    // console.log(item.element);
    const Input = this.FormElements[item.element];
    return (<Input
      isFromMastersScreen={this.props.isFromMastersScreen}
      data={item}
      mutable={true}
      totalItems={items}
      isFormPreview={true}
      key={`form_${item.id}`}
      handleChange={this.handleChange}
      globalStyles={item.globalStyles}
      media={this.bindFieldMedia(item)}
      result={this.bindFieldResults(item)}
      read_only={this.props.isFormReadOnly}
      defaultValue={this._getDefaultValue(item)}
      ref={c => this.inputs[item.fieldName] = c}
      photoPreview={this.props.hasOwnProperty('photoPreview') ? this.props.photoPreview : null}
      collectFieldMedia={(this.props.isFormReadOnly) ? null : this.collectFieldMedia.bind(this)}
      collectFieldResults={(this.props.isFormReadOnly) ? null : this.collectFieldResults.bind(this)}
      imageUploadCallback={this.props.imageUploadCallback ? this.props.imageUploadCallback : null}
    />)
  }

  getMaterialInputArrayElement(itemList, items) {
    const materialArrElement = [];
    itemList.map((item) => {
      const Input = this.FormElements[item.element];
      materialArrElement.push(<Input
        handleChange={this.handleChange}
        ref={c => this.inputs[item.fieldName] = c}
        mutable={true}
        key={`form_${item.id}`}
        data={item}
        totalItems={items}
        isFormPreview={true}
        result={this.bindFieldResults(item)}
        media={this.bindFieldMedia(item)}
        globalStyles={item.globalStyles}
        read_only={this.props.isFormReadOnly}
        defaultValue={this._getDefaultValue(item)} />)
    })
    return materialArrElement;

  }

  getMaterialDropdownElement(item) {
    const Dropdown = this.FormElements[item.element];
    return (<Dropdown
      handleChange={this.handleChange}
      ref={c => this.inputs[item.fieldName] = c}
      mutable={true}
      key={`form_${item.elementId}`}
      data={item}
      isFormPreview={true}
      globalStyles={item.globalStyles}
      read_only={this.props.isFormReadOnly}
      defaultValue={this._getDefaultValue(item)} />)
  }

  getInputElement(item) {
    if (item.element.toLowerCase().includes("material")) {
      return this.getMaterialInputElement(item);
    }
    if (item.custom) {
      return this.getCustomElement(item);
    }
    const Input = this.FormElements[item.element];
    return (<Input
      handleChange={this.handleChange}
      ref={c => this.inputs[item.fieldName] = c}
      mutable={true}
      key={`form_${item.id}`}
      data={item}
      read_only={this.props.isFormReadOnly}
      defaultValue={this._getDefaultValue(item)} />);
  }

  getTabsContainerElement(item, Element) {
    const controls = item.childItems.map(x => (x ? this.getMaterialInputArrayElement(x) : <div>&nbsp;</div>));
    return (<Element mutable={true} key={`form_${item.id}`} data={item} controls={controls} />);
  }

  getContainerElement(item, Element) {
    const controls = item.childItems.map(x => (x ? this.getInputElement(this.getDataById(x)) : <div>&nbsp;</div>));
    return (<Element mutable={true} key={`form_${item.id}`} data={item} controls={controls} />);
  }

  getSimpleElement(item, workFlowData) {
    const Element = this.FormElements[item.element];
    return (<Element 
       read_only={this.props.isFormReadOnly}
       mutable={true} key={`form_${item.id}`} data={item} workFlowData={workFlowData} />);
  }

  getCustomElement(item) {
    if (!item.component || typeof item.component !== 'function') {
      item.component = Registry.get(item.key);
      if (!item.component) {
        console.error(`${item.element} was not registered`);
      }
    }

    const inputProps = item.forwardRef && {
      handleChange: this.handleChange,
      defaultValue: this._getDefaultValue(item),
      ref: c => this.inputs[item.fieldName] = c,
    };
    return (
      <CustomElement
        mutable={true}
        read_only={this.props.isFormReadOnly}
        key={`form_${item.id}`}
        data={item}
        {...inputProps}
      />
    );
  }

  render() {
    let data_items = this.props.data;

    if (this.props.display_short) {
      data_items = this.props.data.filter((i) => i.alternateForm === true);
    }

    const items = data_items.filter(x => !x.parentId).map(item => {
      if (!item) return null;
      switch (item.element) {
        case 'Email':
        case 'Text':
        case 'Phone':
        case 'Number':
        case 'Section_Header':
        case 'Input_Table':
        case 'Single_Choice':
        case 'Header':
        case 'Short_Text':
        case 'Page_Break':
        case 'Photo':
        case 'Dropdown':
        case 'Check_List':
        case 'Photo_PrePost':
        case 'Barcode_Scanner':
        case 'Long_Text':
        case 'Configurable_List':
        case 'Date_Picker':
        case 'Button_Radios':
        case 'Tiles':
        case 'Time':
        case 'Attachment' :
        case 'Video' :
          return this.getMaterialInputElement(item, data_items);
        case 'TextInput':
        case 'NumberInput':
        case 'TextArea':
        case 'RadioButtons':
        case 'Rating':
        case 'Tags':
        case 'Range':
          // case 'Dropdown':
          return this.getInputElement(item);
        case 'CustomElement':
          return this.getCustomElement(item);
        case 'Tab_Break':
          return this.getTabsContainerElement(item, Tabs);
        case 'Four_Column_Row':
          return this.getContainerElement(item, Four_Column_Row);
        case 'Three_Column_Row':
          return this.getContainerElement(item, Three_Column_Row);
        case 'Two_Column_Row':
          return this.getContainerElement(item, Two_Column_Row);
        case 'Signature':
          return <Signature isFromPreview={true} ref={c => this.inputs[item.fieldName] = c} read_only={this.props.isFormReadOnly || item.readOnly} mutable={true} key={`form_${item.id}`} data={item} defaultValue={this._getDefaultValue(item)} />;
        case 'Checkboxes':
          return <Checkboxes ref={c => this.inputs[item.fieldName] = c} read_only={this.props.isFormReadOnly} handleChange={this.handleChange} mutable={true} key={`form_${item.id}`} data={item} defaultValue={this._optionsDefaultValue(item)} />;
        case 'Image':
          return <Image ref={c => this.inputs[item.fieldName] = c} handleChange={this.handleChange} mutable={true} key={`form_${item.id}`} data={item} defaultValue={this._getDefaultValue(item)} />;
        case 'Download':
          return <Download download_path={this.props.download_path} mutable={true} key={`form_${item.id}`} data={item} />;
        case 'Camera':
          return <Camera ref={c => this.inputs[item.fieldName] = c} read_only={this.props.isFormReadOnly || item.readOnly} mutable={true} key={`form_${item.id}`} data={item} defaultValue={this._getDefaultValue(item)} />;
        default:
          return this.getSimpleElement(item, this.props.workFlowData);
      }
    });

    const formTokenStyle = {
      display: 'none',
    };

    const actionName = (this.props.action_name) ? this.props.action_name : 'Submit';
    const backName = (this.props.back_name) ? this.props.back_name : 'Cancel';

    let classes = 'react-form-builder-form';
    //  if(this.props.isFormReadOnly) classes += ' readable-form-preview';
    return (
      <div className='scrollable-preview' style={{minHeight:"323px"}}>
        <FormValidator emitter={this.emitter} />
        <div className={classes}>
          <form encType='multipart/form-data' ref={c => this.form = c} action={this.props.form_action} onSubmit={this.handleSubmit.bind(this)} method={this.props.form_method}>
            {this.props.authenticity_token &&
              <div style={formTokenStyle}>
                <input name='utf8' type='hidden' value='&#x2713;' />
                <input name='authenticity_token' type='hidden' value={this.props.authenticity_token} />
                <input name='task_id' type='hidden' value={this.props.task_id} />
              </div>
            }
            {items}
            {this.props.internalScreensChecked &&
              this.props.workFlowData.displayIndex !== this.props.masterScreensWorkflowData.length - 1
              ?
              <Button style={{ width: "100%", border: "1px solid #2C3E93", color: "#2C3E93" }}>NEXT</Button> : this.props.internalScreensChecked ?
                <>
                  <Button style={{ width: "45%", border: "1px solid #2C3E93", color: "#2C3E93" }}>APPROVE</Button>
                  <Button style={{ width: "45%", border: "1px solid #B00020", marginLeft: "1rem", color: "#B00020" }}>REJECT</Button>
                </> : null
            }
            <div className='btn-toolbar' style={{ display: 'flex', flexDirection: 'column', width: "100%" }}>
              {
                this.state.submitError &&
                <div style={{ marginBottom: '10px', fontSize: '13px', color: '#f4493c' }}>
                  <span>Error! Please check the form data.</span>
                </div>
              }
              <div className={`mt-3 ${this.props.isFromMastersScreen && "mb-3"}`}>
                {/* <Button variant="contained" color="primary" fullWidth>{`${this.props.isFromMastersScreen ? "CHECK-OUT" : "CHECK-IN"}`}</Button> */}
                {/* {!this.props.hide_actions &&
                  // <input type='submit' className='btn btn-big' value={actionName} />
                  <Button
                    type='submit'
                    color="primary"
                    variant="outlined"
                    style={{marginRight: '10px'}}
                    disabled={!this.state.fieldResults.length && !this.state.fieldMedia.length}
                    // onClick={()=>generateJson(props)}
                  >
                    {actionName}
                </Button>
                } */}

                {/* {!this.props.hide_actions && this.props.back_action &&
                  <a href={this.props.back_action} className='btn btn-default btn-cancel btn-big'>{backName}</a>
                } */}
                {/* {
                  this.props.getGeneratedJSON && !this.props.isFormReadOnly &&
                  <GenerateJSON data={this.props} getJSON={this.props.getGeneratedJSON} closePreview={this.props.closePreview} />
                } */}
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

ReactForm.defaultProps = { validateForCorrectness: false };

/**
  * <Form />
  */

import React from 'react';
import ReactDOM from 'react-dom';
import { EventEmitter } from 'fbemitter';
import FormValidator from './form-validator';
import BootstrapElements from './form-elements';
import { Two_Column_Row, Three_Column_Row, Four_Column_Row } from './multi-column';
import CustomElement from './form-elements/custom-element';
import Registry from './stores/registry';
import MaterialElements from './meterial-form-elements';
import GenerateJSON from './generateJson';

const {
  Image, Checkboxes, Download, Camera,
} = BootstrapElements;

const {
  Dropdown, Email, Header, Number, Phone, Photo_PrePost, PhotoCaptureUploadModal, Short_Text, Signature, Single_Choice, Input_Table, Photo} = MaterialElements;

export default class ReactForm extends React.Component {
  form;

  inputs = {};

  answerData;

  constructor(props) {
    super(props);
    this.answerData = this._convert(props.answer_data);
    this.emitter = new EventEmitter();
    this.getDataById = this.getDataById.bind(this);
    this.FormElements = (props.isBootstrapItems) ? BootstrapElements : MaterialElements
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
    if (!this.props.skip_validations) {
      errors = this.validateForm();
      // Publish errors, if any.
      this.emitter.emit('formValidation', errors);
    }

    // Only submit if there are no errors.
    if (errors.length < 1) {
      const { onSubmit } = this.props;
      if (onSubmit) {
        // const data = this._collectFormData(this.props.data);
        // onSubmit(data);
      } else {
        const $form = ReactDOM.findDOMNode(this.form);
        // $form.submit();
      }
    }
  }

  validateForm() {
    const errors = [];
    let data_items = this.props.data;

    if (this.props.display_short) {
      data_items = this.props.data.filter((i) => i.alternateForm === true);
    }

    data_items.forEach(item => {
      if (item.element === 'Signature') {
        this._getSignatureImg(item);
      }

      if (this._isInvalid(item)) {
        errors.push(`${item.label} is required!`);
      }

      if (this.props.validateForCorrectness && this._isIncorrect(item)) {
        errors.push(`${item.label} was answered incorrectly!`);
      }
    });

    return errors;
  }

  getDataById(id) {
    const { data } = this.props;
    return data.find(x => x.id === id);
  }

  getMaterialInputElement(item,items){
    console.log(item.element);
    const Input = this.FormElements[item.element];
    return (<Input
      handleChange={this.handleChange}
      ref={c => this.inputs[item.fieldName] = c}
      mutable={true}
      key={`form_${item.id}`}
      data={item}
      isFormPreview={true}
      totalItems={items}
      globalStyles={item.globalStyles}
      read_only={this.props.read_only}
      defaultValue={this._getDefaultValue(item)} />)
  }

  getMaterialDropdownElement(item){
    const Dropdown = this.FormElements[item.element];
    return (<Dropdown
      handleChange={this.handleChange}
      ref={c => this.inputs[item.fieldName] = c}
      mutable={true}
      key={`form_${item.elementId}`}
      data={item}
      isFormPreview={true}
      globalStyles={item.globalStyles}
      read_only={this.props.read_only}
      defaultValue={this._getDefaultValue(item)} />)
  }

  getInputElement(item) {
    if(item.element.toLowerCase().includes("material")){
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
      read_only={this.props.read_only}
      defaultValue={this._getDefaultValue(item)} />);
  }

  getContainerElement(item, Element) {
    const controls = item.childItems.map(x => (x ? this.getInputElement(this.getDataById(x)) : <div>&nbsp;</div>));
    return (<Element mutable={true} key={`form_${item.id}`} data={item} controls={controls} />);
  }

  getSimpleElement(item) {
    const Element = this.FormElements[item.element];
    return (<Element mutable={true} key={`form_${item.id}`} data={item} />);
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
        read_only={this.props.read_only}
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

    data_items.forEach((item) => {
      if (item && item.readOnly && item.variableKey && this.props.variables[item.variableKey]) {
        this.answerData[item.fieldName] = this.props.variables[item.variableKey];
      }
    });

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
        case 'CheckList':
        case 'Photo_PrePost':
        case 'Long_Text':
        case 'Configurable_List':
        case 'Button_Radios':
        case 'Location_Coordinates':
          return this.getMaterialInputElement(item, data_items);
        case 'TextInput':
        case 'NumberInput':
        case 'TextArea':
        case 'DatePicker':
        case 'RadioButtons':
        case 'Rating':
        case 'Tags':
        case 'Range':
        // case 'Dropdown':
          return this.getInputElement(item);
        case 'CustomElement':
          return this.getCustomElement(item);
        case 'Four_Column_Row':
          return this.getContainerElement(item, Four_Column_Row);
        case 'Three_Column_Row':
          return this.getContainerElement(item, Three_Column_Row);
        case 'Two_Column_Row':
          return this.getContainerElement(item, Two_Column_Row);
        case 'Signature':
          return <Signature ref={c => this.inputs[item.fieldName] = c} read_only={this.props.read_only || item.readOnly} mutable={true} key={`form_${item.id}`} data={item} defaultValue={this._getDefaultValue(item)} />;
        case 'Checkboxes':
          return <Checkboxes ref={c => this.inputs[item.fieldName] = c} read_only={this.props.read_only} handleChange={this.handleChange} mutable={true} key={`form_${item.id}`} data={item} defaultValue={this._optionsDefaultValue(item)} />;
        case 'Image':
          return <Image ref={c => this.inputs[item.fieldName] = c} handleChange={this.handleChange} mutable={true} key={`form_${item.id}`} data={item} defaultValue={this._getDefaultValue(item)} />;
        case 'Download':
          return <Download download_path={this.props.download_path} mutable={true} key={`form_${item.id}`} data={item} />;
        case 'Camera':
          return <Camera ref={c => this.inputs[item.fieldName] = c} read_only={this.props.read_only || item.readOnly} mutable={true} key={`form_${item.id}`} data={item} defaultValue={this._getDefaultValue(item)} />;
        default:
          return this.getSimpleElement(item);
      }
    });

    const formTokenStyle = {
      display: 'none',
    };

    const actionName = (this.props.action_name) ? this.props.action_name : 'Submit';
    const backName = (this.props.back_name) ? this.props.back_name : 'Cancel';

    let classes = 'react-form-builder-form';
    if(this.props.isReadable) classes += ' readable-form-preview';
    return (
      <div className='scrollable-preview'>
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
            <div className='btn-toolbar'>
              {!this.props.hide_actions &&
                <input type='submit' className='btn btn-big' value={actionName} />
              }
              
              {!this.props.hide_actions && this.props.back_action &&
                <a href={this.props.back_action} className='btn btn-default btn-cancel btn-big'>{backName}</a>
              }
              {
                this.props.getGeneratedJSON && !this.props.isReadable &&
                <GenerateJSON data={this.props} getJSON={this.props.getGeneratedJSON} closePreview={this.props.closePreview} />
              }
              
            </div>
          </form>
        </div>
      </div>
    );
  }
}

ReactForm.defaultProps = { validateForCorrectness: false };

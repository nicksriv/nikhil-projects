/**
  * <ReactFormBuilder />
*/

import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Preview from './preview';
import Toolbar from './toolbar';
import MaterialFormGenerator from './materialForm';
import BootstrapFormGenerator from './bootstrapForm';
import store from './stores/store';
import Registry from './stores/registry';
import EditForm from './edit-form';
import GenerateJson from './generateJson';
import V5FormBuilder from './v5-form-builder-wrapper';
import V5FormBuilderDemoBar from './v5-form-builder-demobar';
import V5FormBuilderToolbar from './v5-form-builder-toolbar';
import V5FormBuilderRefHandlers from './v5-form-builder-forward-ref';
import V5FormBuilderFeatureTemplate from './v5-form-builder-feature-templates';
import V5FormBuilderMasterScreens from './v5-form-builder-master-screens';
import V5FormBuilderDownloadTemplate from './v5-form-builder-download-template';
class ReactFormBuilder extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editMode: false,
      editElement: null,
      toolbarItemCheck: []
    };
    this.editModeOn = this.editModeOn.bind(this);
    this.handleTemplateElemChange = this.handleTemplateElemChange.bind(this);
  }

  editModeOn(data, e) {
    e.preventDefault();
    e.stopPropagation();
    if (this.state.editMode) {
      this.setState({ editMode: !this.state.editMode, editElement: null });
    } else {
      this.setState({ editMode: !this.state.editMode, editElement: data });
    }
  }

  handleTemplateElemChange(e, data) {
    let highestDisplayOrder = 1;
    if (this.state.toolbarItemCheck
      && Array.isArray(this.state.toolbarItemCheck)
      && this.state.toolbarItemCheck.length > 0) {
      const displayOrder = this.state.toolbarItemCheck.map((a) => a.displayOrder);
      highestDisplayOrder = Math.max(...displayOrder) + 1;
    }

    if (e.target.checked) {
      this.setState({
        toolbarItemCheck: [
          ...this.state.toolbarItemCheck,
          {
            id: data.id,
            displayOrder: highestDisplayOrder
          }
        ]
      });
      this.props.handleFormElementCheck(e, [
        ...this.state.toolbarItemCheck,
        {
          id: data.id,
          displayOrder: highestDisplayOrder
        }
      ]);
    } else {
      this.setState({
        toolbarItemCheck: this.state.toolbarItemCheck.filter(x => x.id !== data.id)
      });
      this.props.handleFormElementCheck(e, this.state.toolbarItemCheck.filter(x => x.id !== data.id));
    }
  }

  manualEditModeOff() {
    if (this.state.editMode) {
      this.setState({
        editMode: false,
        editElement: null,
      });
    }
  }

  render() {
    let previewAlignClass = "";
    let editFormClasses = "edit-form ";
    let isDefaultItems = true;
    const toolbarProps = {
      showDescription: this.props.show_description,
    };
    if (this.props.toolbarItems) {
      toolbarProps.items = this.props.toolbarItems;
      isDefaultItems = false;
    }

    if (this.props.toolboxOrigin == "left") {
      previewAlignClass = "float-left";
      editFormClasses += "left-slider";
    } else {
      previewAlignClass = "float-right";
      editFormClasses += "right-slider";
    }

    toolbarProps.toolbarAlignClass = this.props.toolboxOrigin == "left" ? "float-left" : "float-right";
    return (
      // <DndProvider backend={HTML5Backend}>
      <div>
        {/* <div>
           <p>
             It is easy to implement a sortable interface with React DnD. Just make
             the same component both a drag source and a drop target, and reorder
             the data in the <code>hover</code> handler.
           </p>
           <Container />
         </div> */}
        <div className="react-form-builder clearfix">
          <div>
            <Preview files={this.props.files}
              isAligned={this.props.isAligned}
              formBuilderHeaderComponent={this.props.formBuilderHeaderComponent}
              pageMode={this.props.pageMode}
              screenTitle={this.props.screenTitle}
              previewAlignClass={previewAlignClass}
              editFormClasses={editFormClasses}
              manualEditModeOff={this.manualEditModeOff.bind(this)}
              showCorrectColumn={this.props.showCorrectColumn}
              parent={this}
              data={this.props.data}
              url={this.props.url}
              saveUrl={this.props.saveUrl}
              onLoad={this.props.onLoad}
              onPost={this.props.onPost}
              editModeOn={this.editModeOn}
              editMode={this.state.editMode}
              variables={this.props.variables}
              registry={Registry}
              isDefaultItems={isDefaultItems}
              editElement={this.state.editElement}
              toolbarItemCheck={this.state.toolbarItemCheck}
              handleTemplateElemChange={this.handleTemplateElemChange}
              uploadFile={this.props.uploadFile}
              fileId={this.props.fileId}
            />
            {/* <Toolbar {...toolbarProps} customItems={this.props.customToolbarItems} /> */}
          </div>
        </div>
      </div>
      // </DndProvider>
    );
  }
}

const FormBuilders = {};
FormBuilders.EditForm = EditForm;
FormBuilders.ReactFormBuilder = ReactFormBuilder;
FormBuilders.MaterialFormGenerator = MaterialFormGenerator;
FormBuilders.BootstrapFormGenerator = BootstrapFormGenerator;
FormBuilders.ElementStore = store;
FormBuilders.Registry = Registry;
FormBuilders.GenerateJSON = GenerateJson;
FormBuilders.V5FormBuilder = V5FormBuilder;
FormBuilders.V5FormBuilderDemoBar = V5FormBuilderDemoBar;
FormBuilders.V5FormBuilderToolbar = V5FormBuilderToolbar;
FormBuilders.V5FormBuilderRefHandlers = V5FormBuilderRefHandlers;
FormBuilders.V5FormBuilderFeatureTemplate = V5FormBuilderFeatureTemplate;
FormBuilders.V5FormBuilderMasterScreens = V5FormBuilderMasterScreens;
FormBuilders.V5FormBuilderDownloadTemplate = V5FormBuilderDownloadTemplate;

export default FormBuilders;

export {
  EditForm, GenerateJson, ReactFormBuilder, MaterialFormGenerator, BootstrapFormGenerator, store as ElementStore, Registry,
  V5FormBuilder, V5FormBuilderDemoBar, V5FormBuilderToolbar, V5FormBuilderRefHandlers, V5FormBuilderFeatureTemplate,
  V5FormBuilderMasterScreens,
  V5FormBuilderDownloadTemplate
};

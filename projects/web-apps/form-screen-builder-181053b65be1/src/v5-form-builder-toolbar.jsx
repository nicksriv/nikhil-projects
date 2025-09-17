import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Toolbar from './toolbar';

const V5FormBuilderToolbar = (props) => {
    const {
        customToolbarItems,
        toolbarProps,
        setFormData,
        handleDownloadTemplate
    } = props;
    return (
        // <DndProvider backend={HTML5Backend}>
        <div className="react-form-builder clearfix">
            <Toolbar {...toolbarProps}
                isAligned={true}
                customItems={customToolbarItems}
                setFormData={setFormData}
                handleDownloadTemplate={handleDownloadTemplate}
            />
        </div>
        // </DndProvider>
    )
}

export default V5FormBuilderToolbar;
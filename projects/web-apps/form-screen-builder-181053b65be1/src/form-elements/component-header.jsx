import React from 'react';
import HeaderBar from './header-bar';

const ComponentHeader = (props) => {
  if (props.mutable) {
    return null;
  }
  return (
    <div>
      <HeaderBar parent={props.parent} editModeOn={props.editModeOn} data={props.data} index={props.index} setAsChild={props.setAsChild} onDestroy={props._onDestroy} onEdit={props.onEdit} static={props.data.static} required={props.data.required}
        toolbarItemCheck={props.toolbarItemCheck}
        handleTemplateElemChange={props.handleTemplateElemChange} />
    </div>
  );
};

export default ComponentHeader;

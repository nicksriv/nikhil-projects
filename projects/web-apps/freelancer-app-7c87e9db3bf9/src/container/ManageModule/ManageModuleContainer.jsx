import React from "react";
import Text from "../../component/common/Text";
import ModuleForm from "../../component/form/ModuleForm";

class ManageModuleContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <>
        <ModuleForm />
      </>
    );
  }
}

export default ManageModuleContainer;

import React from "react";

import RaisedDisputeForm from "@app/component/RaisedDispute/RaisedDisputeForm";

import { disputeApis } from "@app/store/dispute/disputeApis";
import { navigationHelper } from "@app/helper/navigation";

class RaiseDisputeFormContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      formData: {
        jobCandidateId: "",
        disputeCategoryId: "",
        disputeTitle: "",
        disputeName: "test",
        disputeDescription: "",
        // disputeCategory: "",
        // jobTitle: "",
      },
      formError: {
        // disputeCategory: "",
        // jobTitle: "",
        jobCandidateId: "",
        disputeCategoryId: "",
        disputeTitle: "",
        disputeName: "random",
        disputeDescription: "",
      },
      isLoading: false,
    };
  }

  componentDidMount() {
    this.props.getMyWorkAction();
    this.props.getDisputeCategoriesAction();
  }

  handleInput = (name, value) => {
    const { formData } = this.state;
    formData[name] = value;
    this.setState({ formData });
  };

  handleSubmit = async () => {
    try {
      const {
        jobCandidateId,
        disputeCategoryId,
        disputeTitle,
        disputeName,
        disputeDescription,
      } = this.state.formData;
      const payload = {
        jobCandidateId: jobCandidateId,
        disputeCategoryId: disputeCategoryId,
        disputeTitle: disputeTitle,
        disputeName: disputeName,
        disputeDescription: disputeDescription,
      };
      this.setState({ isLoading: true });
      const res = await disputeApis.createDisputeApi(payload);
      if (res) {
        this.props.getDisputeListAction();
        this.props.setToastAction({ message: res.message });
        navigationHelper.goBack();
        this.handleResetForm();
      }
    } catch (error) {
    } finally {
      this.setState({ isLoading: false });
    }
  };
  handleResetForm = () => {
    this.setState({
      formData: {
        jobCandidateId: "",
        disputeCategoryId: "",
        disputeTitle: "",
        disputeName: "test",
        disputeDescription: "",
      },
    });
  };
  render() {
    const { formData, formError, isLoading } = this.state;
    const { myWorkList, disputeListCategory } = this.props;
    return (
      <RaisedDisputeForm
        disputeListCategory={disputeListCategory}
        myWorkList={myWorkList}
        formData={formData}
        formError={formError}
        onChange={this.handleInput}
        isLoading={isLoading}
        onSubmit={this.handleSubmit}
      />
    );
  }
}

export default RaiseDisputeFormContainer;

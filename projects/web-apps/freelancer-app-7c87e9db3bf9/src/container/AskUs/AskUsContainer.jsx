import React from "react";

import AskUsForm from "@app/component/AskUs/AskUsForm";

import { validationHelper } from "@app/helper/validation";
import { askUsApi } from "@app/store/askUs/askUsApi";

export class AskUsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        askUsTitle: "",
        askUsDescription: "",
      },
      formError: {
        askUsTitle: "",
        askUsDescription: "",
      },
      isLoading: false,
      initialState: "",
    };
  }
  handleChange = (value, name) => {
    const { formData } = this.state;
    formData[name] = value;
    this.setState({ formData });
  };

  handleValidation = () => {
    const { formError, formData } = this.state;
    const askUsTitle = validationHelper.required(formData.askUsTitle);
    formError.askUsTitle = askUsTitle.message;

    const askUsDescription = validationHelper.required(
      formData.askUsDescription
    );
    formError.askUsDescription = askUsDescription.message;

    this.setState({ formError });
    return askUsTitle.isValid && askUsDescription.isValid;
  };

  handleOnSubmit = async () => {
    const validation = this.handleValidation();
    if (!validation) {
      return;
    }
    try {
      const { formData } = this.state;
      const payload = {
        askTitle: formData.askUsTitle,
        askUsDescription: formData.askUsDescription,
      };
      this.setState({ isLoading: true });
      const res = await askUsApi.askUs(payload);
      if (res) {
        this.props.setToastAction({ message: res.message });
        this.handleResetForm();
      }
      return;
    } catch {
      this.setState({ isLoading: false });
    }
  };
  handleResetForm = () => {
    this.setState({
      isLoading: false,
      formData: {
        askUsTitle: "",
        askUsDescription: "",
      },
      formError: {
        askUsTitle: "",
        askUsDescription: "",
      },
    });
  };

  render() {
    const { formData, isLoading, formError } = this.state;
    return (
      <AskUsForm
        formError={formError}
        onChange={this.handleChange}
        formData={formData}
        onSubmit={this.handleOnSubmit}
        isLoading={isLoading}
      />
    );
  }
}

export default AskUsContainer;

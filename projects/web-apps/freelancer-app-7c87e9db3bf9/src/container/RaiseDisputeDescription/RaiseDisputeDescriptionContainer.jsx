import React, { Component } from "react";
import RaisedDisputeDescription from "@app/component/RaisedDispute/RaisedDisputeDescription";
export default class RaiseDisputeDescriptionContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.getDisputeCategoriesAction();
  }

  render() {
    const { route, disputeListCategory = [] } = this.props;
    const { params } = route;
    const { data } = params;

    return (
      <>
        <RaisedDisputeDescription
          data={data}
          disputeListCategory={disputeListCategory}
        />
      </>
    );
  }
}

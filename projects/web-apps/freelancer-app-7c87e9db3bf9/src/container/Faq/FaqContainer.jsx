import React from "react";
import { R } from "@app/res";

import View from "@app/component/common/View";
import Accordion from "@app/component/Faq/Accordion";
import ActivityIndicator from "@app/component/common/ActivityIndicator";

class FaqContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    this.props.getFaqListAction();
  }

  render() {
    const { faqList, isLoading = 1 } = this.props;

    if (isLoading) {
      return (
        <View
          justifyContent="center"
          alignItems="center"
          style={{ height: "100%" }}
        >
          <ActivityIndicator
            isLoading
            color={R.colors.background}
            size="large"
          />
        </View>
      );
    }


    return (
      <View scrollable>
        {faqList.map((item, idx) => {
          return (
            <Accordion
              title={item.faqcategoryName}
              faqs={item.faqs}
              key={`keygen_${idx}`}
            />
          );
        })}
      </View>
    );
  }
}

export default FaqContainer;

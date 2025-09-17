import React from "react";

import Text from "./common/Text";
import View from "./common/View";
import Button from "./form/Button";

const SectionHeader = (props) => {
    return (
        <View flexDirection="row" alignItems="center" justifyContent="space-between">
          <Text variant="subtitle2" font="medium">{props.title}</Text>
          {props.onPress && <Button text="View All" onPress={props.onPress} variant="text" style={{ paddingVertical: 0 }} />}
        </View>
    )
}

export default SectionHeader;
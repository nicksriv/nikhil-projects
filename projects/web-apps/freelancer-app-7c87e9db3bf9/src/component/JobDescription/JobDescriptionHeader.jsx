import React from "react";

import Text from "@app/component/common/Text";
import View from "@app/component/common/View";
import Image from "@app/component/common/Image";

import { R } from "@app/res";

const JobDescriptionHeader = ({ client }) => {
  return (
    <View flex={0} alignItems="center">
      <Image
        source={client.clientLogo ? { uri: client.clientLogo } : R.images.informative.noImage()}
        width={R.units.windowWidth(0.8)}
        height={R.units.scale(100)}
      />
      <Text variant="title2" font="medium">{client.clientName} <Text variant="caption" color="secondary" font="semibold">(#{client.clientId})</Text></Text>
    </View>
  );
};

export default JobDescriptionHeader;

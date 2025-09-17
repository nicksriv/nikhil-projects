import React from "react";
import { R } from "../../res";

import View from "../common/View";
import Text from "../common/Text";
import Separator from "../common/Separator";
import Icon from "../common/Icon";

const IconWidget = ({ globalStyles }) => {
    return (
        <>
            <View style={[globalStyles.card]}>
                <Text size="10" font="medium">
                    Prop: size
                </Text>
                <Text size="10" font="medium">
                    Values: sm (default) | xs | md | lg | xl
                </Text>
                <Text size="10">
                    Description: is used to provide view box size for the image
                    icon
                </Text>
                <Separator />

                <Text size="10">size=xs</Text>
                <Icon size="xs" source={R.images.tab.propertiesActive()} />
                <Separator />

                <Text size="10">size=sm (default)</Text>
                <Icon size="sm" source={R.images.tab.propertiesActive()} />
                <Separator />

                <Text size="10">size=md</Text>
                <Icon size="md" source={R.images.tab.propertiesActive()} />
                <Separator />

                <Text size="10">size=lg</Text>
                <Icon size="lg" source={R.images.tab.propertiesActive()} />
                <Separator />

                <Text size="10">size=xl</Text>
                <Icon size="xl" source={R.images.tab.propertiesActive()} />
                <Separator />
            </View>
            <Separator />
        </>
    );
};

export default IconWidget;

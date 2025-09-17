import React from "react";
import { R } from "../../res";

import ActivityIndicator from "../common/ActivityIndicator";
import View from "../common/View";
import Text from "../common/Text";
import Separator from "../common/Separator";

const ActivityIndicatorWidget = ({ globalStyles }) => {
    return (
        <>
            <View style={[globalStyles.card]}>
                <Text size="10" font="medium">
                    Prop: isLoading (required)
                </Text>
                <Text size="10" font="medium">
                    Values: false (default) | true
                </Text>
                <Text size="10">
                    Description: is used to hide and show the activity indicator
                </Text>
                <Separator />

                <ActivityIndicator isLoading={true} />
            </View>
            <Separator />

            <View style={[globalStyles.card]}>
                <Text size="10" font="medium">
                    Prop: size
                </Text>
                <Text size="10" font="medium">
                    Values: small (default) | large
                </Text>
                <Text size="10">
                    Description: is used to define size for the indicator
                </Text>
                <Separator />

                <Text size="10">size=small</Text>
                <ActivityIndicator isLoading={true} size="small" />
                <Separator />

                <Text size="10">size=large</Text>
                <ActivityIndicator isLoading={true} size="large" />
            </View>
            <Separator />

            <View style={[globalStyles.card]}>
                <Text size="10" font="medium">
                    Prop: color
                </Text>
                <Text size="10" font="medium">
                    Values: color code (default = R.colors.primary.main)
                </Text>
                <Text size="10">
                    Description: is used to define color for the indicator
                </Text>
                <Separator />

                <Text size="10">color=R.colors.primary.main (default)</Text>
                <ActivityIndicator isLoading={true} />
                <Separator />
                
                <Text size="10">color=R.colors.text.primary</Text>
                <ActivityIndicator isLoading={true} color={R.colors.text.primary} />
                <Separator />
                
                <Text size="10">color=R.colors.text.info</Text>
                <ActivityIndicator isLoading={true} color={R.colors.text.info} />
                <Separator />

                <Text size="10">color=R.colors.text.success</Text>
                <ActivityIndicator isLoading={true} color={R.colors.text.success} />
                <Separator />

                <Text size="10">color=R.colors.text.disabled</Text>
                <ActivityIndicator isLoading={true} color={R.colors.text.disabled} />
                <Separator />

            </View>
            <Separator />
        </>
    );
};

export default React.memo(ActivityIndicatorWidget);

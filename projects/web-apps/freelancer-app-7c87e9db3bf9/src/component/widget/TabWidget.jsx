import React from "react";
import { R } from "../../res";

import Tab from "../common/Tab";
import View from "../common/View";
import Text from "../common/Text";
import Separator from "../common/Separator";

const TabWidget = ({ globalStyles }) => {
    const tabs = [
        {
            label: "Overview",
            value: "OVERVIEW",
        },
        {
            label: "Leads",
            value: "LEADS",
        },
        {
            label: "Schedule",
            value: "SCHEDULE",
        },
    ];

    const tabs2 = [
        {
            label: "Properties",
            value: "PROPERTIES",
        },
        {
            label: "Requirements",
            value: "REQUIREMENTS",
        },
    ];

    return (
        <>
            <View style={[globalStyles.card]}>
                <Text size="10" font="medium">
                    Prop: tabs (required)
                </Text>
                <Text size="10" font="medium">
                    Values: array of data
                </Text>
                <Text size="10">Description: is used to render tab items</Text>
                <Separator />

                <Tab tabs={tabs} />
            </View>
            <Separator />

            <View style={[globalStyles.card]}>
                <Text size="10" font="medium">
                    Prop: tabs (required)
                </Text>
                <Text size="10" font="medium">
                    Values: array of data
                </Text>
                <Text size="10">Description: is used to render tab items</Text>
                <Separator />

                <Tab tabs={tabs2} />
            </View>
            <Separator />
        </>
    );
};

export default React.memo(TabWidget);

import React from "react";
import { StyleSheet } from "react-native";

import TextWidget from "../component/widget/TextWidget";
import ViewWidget from "../component/widget/ViewWidget";
import ButtonWidget from "../component/widget/ButtonWidget";
import SeparatorWidget from "../component/widget/SeparatorWidget";
import LabelWidget from "../component/widget/LabelWidget";
import DividerWidget from "../component/widget/DividerWidget";
import IconWidget from "../component/widget//IconWidget";
import ImageWidget from "../component/widget/ImageWidget";
import ActivityIndicatorWidget from "../component/widget/ActivityIndicatorWidget";
import TabWidget from "../component/widget/TabWidget";
// import RequirmentPropertyCard from "../component/widget/propertyCardWidget;
import CardWidget from "../component/widget/CardWidget";

// import RequirmentPropertyCard from "../component/widget/propertyCardWidget

import View from "../component/common/View";
import Button from "../component/form/Button";
import Separator from "../component/common/Separator";
import Text from "../component/common/Text";
import Tab from "../component/common/Tab";

import { R } from "../res";
import PickerWidget from "../component/widget/PickerWidget";

const widgets = [
    "Text",
    "View",
    "Button",
    "Separator",
    "Label",
    "Divider",
    "Icon",
    "Image",
    "ActivityIndicator",
    "Tab",
    "Picker",
    "propertyCrad",
    "Card"
];

const WidgetScreen = (props) => {
    const [active, setActive] = React.useState("Text");

    return (
        <View style={styles.root}>
            <View style={{ flex: 0 }}>
                <Tab
                    scrollable
                    tabs={widgets.map((widget) => ({ widget }))}
                    labelKey="widget"
                    valueKey="widget"
                    onChange={({ value }) => setActive(value)}
                    value={active}
                />
                <Separator />
                <Text size="14">Component: {active}</Text>
                <Separator />
            </View>

            <View scrollable style={{ flex: 1 }}>
                {active === "Text" && <TextWidget globalStyles={styles} />}
                {active === "View" && <ViewWidget globalStyles={styles} />}
                {active === "Button" && <ButtonWidget globalStyles={styles} />}
                {active === "Separator" && (
                    <SeparatorWidget globalStyles={styles} />
                )}
                {active === "Label" && <LabelWidget globalStyles={styles} />}
                {active === "Divider" && (
                    <DividerWidget globalStyles={styles} />
                )}
                {active === "Icon" && <IconWidget globalStyles={styles} />}
                {active === "Image" && <ImageWidget globalStyles={styles} />}
                {active === "ActivityIndicator" && (
                    <ActivityIndicatorWidget globalStyles={styles} />
                )}
                {active === "Tab" && <TabWidget globalStyles={styles} />}
                {active === "Picker" && <PickerWidget globalStyles={styles} />}
                {/* {active === "propertyCrad" && <RequirmentPropertyCard globalStyles={styles} />} */}
                {active === "Card" && <CardWidget cardType="propertyCard" globalStyles={styles} />}

            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    root: {
        padding: R.units.scale(10),
        flex: 1,
    },
    card: {
        backgroundColor: R.colors.background.paper,
        borderRadius: R.units.scale(6),
        padding: R.units.scale(10),
        alignItems: "flex-start",
        justifyContent: "flex-start",
    },
});

export default WidgetScreen;

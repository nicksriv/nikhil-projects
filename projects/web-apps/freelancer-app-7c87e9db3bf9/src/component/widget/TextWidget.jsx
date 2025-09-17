import React from "react";
import { R } from "../../res";

import View from "../common/View";
import Text from "../common/Text";
import Separator from "../common/Separator";

const TextWidget = ({ globalStyles }) => {
    return (
        <>
            <View style={[globalStyles.card]}>
                <Text size="10" font="medium">
                    Prop: font
                </Text>
                <Text size="10" font="medium">
                    Values: regular (default) | light | medium | semibold | bold
                </Text>
                <Text size="10">
                    Description: is used to define core type of the button style
                </Text>
                <Separator />
                <Text size="10" font="light">
                    font=light
                </Text>
                <Text size="10" font="regular">
                    font=regular
                </Text>
                <Text size="10" font="medium">
                    font=medium
                </Text>
                <Text size="10" font="semibold">
                    font=semibold
                </Text>
                <Text size="10" font="bold">
                    font=bold
                </Text>
            </View>
            <Separator />

            <View style={[globalStyles.card]}>
                <Text size="10" font="medium">
                    Prop: size
                </Text>
                <Text size="10" font="medium">
                    Values: string | number (default = 12)
                </Text>
                <Text size="10">
                    Description: size is used to provide different font sizes
                </Text>
                <Separator />
                <Text size="10">size=10</Text>
                <Text size="14.25">size=14.25</Text>
                <Text size={16}>size=&#123;16&#125;</Text>
            </View>
            <Separator />

            <View style={[globalStyles.card]}>
                <Text size="10" font="medium">
                    Prop: color
                </Text>
                <Text size="10" font="medium">
                    Values: primary (default) | secondary | disabled | success |
                    info | colorcode
                </Text>
                <Text size="10">
                    Description: color is used to provide different color
                </Text>
                <Separator />
                <Text size="10" color="primary">
                    color=primary
                </Text>
                <Text size="10" color="secondary">
                    color=secondary
                </Text>
                <Text size="10" color="disabled">
                    color=disabled
                </Text>
                <Text size="10" color="success">
                    color=success
                </Text>
                <Text size="10" color="info">
                    color=info
                </Text>
                <Text size="10" color={R.colors.primary.light}>
                    color=&#123;R.colors.primary.light&#125;
                </Text>
            </View>
            <Separator />

            <View style={[globalStyles.card]}>
                <Text size="10" font="medium">
                    Prop: transform
                </Text>
                <Text size="10" font="medium">
                    Values: none (default) | capitalize | lowercase | uppercase
                </Text>
                <Text size="10">
                    Description: transform is used to transform case of text
                </Text>
                <Separator />
                <Text size="10" transform="none">
                    transform=none
                </Text>
                <Text size="10" transform="capitalize">
                    transform=capitalize
                </Text>
                <Text size="10" transform="lowercase">
                    transform=lowercase
                </Text>
                <Text size="10" transform="uppercase">
                    transform=uppercase
                </Text>
            </View>
            <Separator />

            <View style={[globalStyles.card]}>
                <Text size="10" font="medium">
                    Prop: textDecoration
                </Text>
                <Text size="10" font="medium">
                    Values: none (default) | underline | line-through |
                    underline line-through
                </Text>
                <Text size="10">
                    Description: textDecoration is used to apply line based
                    decoration to the text
                </Text>
                <Separator />
                <Text size="10" textDecoration="none">
                    textDecoration=none
                </Text>
                <Text size="10" textDecoration="underline">
                    textDecoration=underline
                </Text>
                <Text size="10" textDecoration="line-through">
                    textDecoration=line-through
                </Text>
                <Text size="10" textDecoration="underline line-through">
                    textDecoration=underline line-through
                </Text>
            </View>
            <Separator />

            <View style={[globalStyles.card, { flex: 1 }]}>
                <Text size="10" font="medium">
                    Prop: align
                </Text>
                <Text size="10" font="medium">
                    Values: auto (default) | left | center | justify | right
                </Text>
                <Text size="10">
                    Description: align is used to apply line based decoration to
                    the text
                </Text>
                <Separator />
                <View
                    style={[
                        globalStyles.card,
                        {
                            width: "100%",
                            backgroundColor: R.colors.primary.lightest,
                        },
                    ]}
                >
                    <Text size="10" align="auto">
                        "align=auto adding some paragraph to demonstrate the
                        impact of auto alignment of the text"
                    </Text>
                </View>
                <Separator />

                <View
                    style={[
                        globalStyles.card,
                        {
                            width: "100%",
                            backgroundColor: R.colors.success.lightest,
                        },
                    ]}
                >
                    <Text size="10" align="center">
                        "align=center adding some paragraph to demonstrate the
                        impact of center alignment of the text"
                    </Text>
                </View>
                <Separator />

                <View
                    style={[
                        globalStyles.card,
                        {
                            width: "100%",
                            backgroundColor: R.colors.primary.lightest,
                        },
                    ]}
                >
                    <Text size="10" align="left">
                        "align=left adding some paragraph to demonstrate the
                        impact of left alignment of the text"
                    </Text>
                </View>
                <Separator />

                <View
                    style={[
                        globalStyles.card,
                        {
                            width: "100%",
                            backgroundColor: R.colors.success.lightest,
                        },
                    ]}
                >
                    <Text size="10" align="justify">
                        "align=justify adding some paragraph to demonstrate the
                        impact of justify alignment of the text"
                    </Text>
                </View>
                <Separator />

                <View
                    style={[
                        globalStyles.card,
                        {
                            width: "100%",
                            backgroundColor: R.colors.primary.lightest,
                        },
                    ]}
                >
                    <Text size="10" align="right">
                        "align=right adding some paragraph to demonstrate the
                        impact of right alignment of the text"
                    </Text>
                </View>
            </View>
            <Separator />
        </>
    );
};

export default TextWidget;

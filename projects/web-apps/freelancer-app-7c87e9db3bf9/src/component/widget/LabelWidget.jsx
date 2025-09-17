import React from 'react';
import { R } from '../../res/index';

import View from "../common/View";
import Label from "../common/Label";
import Separator from "../common/Separator";

const LabelWidget = ({ globalStyles }) => {

    return (
        <>
            <View style={[globalStyles.card]}>
                <Label size="10" font="medium">
                    Prop: font
                </Label>
                <Label size="10" font="medium">
                    Values: regular (default) | light | medium | semibold | bold
                </Label>
                <Label size="10">
                    Description: is used to define core type of the Label style
                </Label>
                <Separator />
                <Label size="10" font="light">
                    font=light
                </Label>
                <Label size="10" font="regular">
                    font=regular
                </Label>
                <Label size="10" font="medium">
                    font=medium
                </Label>
                <Label size="10" font="semibold">
                    font=semibold
                </Label>
                <Label size="10" font="bold">
                    font=bold
                </Label>
            </View>
            <Separator />

            <View style={[globalStyles.card]}>
                <Label size="10" font="medium">
                    Prop: size
                </Label>
                <Label size="10" font="medium">
                    Values: string | number (default = 12)
                </Label>
                <Label size="10">
                    Description: size is used to provide different font sizes
                </Label>
                <Separator />
                <Label size="10">size=10</Label>
                <Label size="14.25">size=14.25</Label>
                <Label size={16}>size=&#123;16&#125;</Label>
            </View>
            <Separator />

            <View style={[globalStyles.card]}>
                <Label size="10" font="medium">
                    Prop: color
                </Label>
                <Label size="10" font="medium">
                    Values: primary (default) | secondary | disabled | success |
                    info | colorcode
                </Label>
                <Label size="10">
                    Description: color is used to provide different color
                </Label>
                <Separator />
                <Label size="10" color="primary">
                    color=primary
                </Label>
                <Label size="10" color="secondary">
                    color=secondary
                </Label>
                <Label size="10" color="disabled">
                    color=disabled
                </Label>
                <Label size="10" color="success">
                    color=success
                </Label>
                <Label size="10" color="info">
                    color=info
                </Label>
                <Label size="10" color={R.colors.primary.light}>
                    color=&#123;R.colors.primary.light&#125;
                </Label>
            </View>
            <Separator />

            <View style={[globalStyles.card]}>
                <Label size="10" font="medium">
                    Prop: transform
                </Label>
                <Label size="10" font="medium">
                    Values: none (default) | capitalize | lowercase | uppercase
                </Label>
                <Label size="10">
                    Description: transform is used to transform case of Label
                </Label>
                <Separator />
                <Label size="10" transform="none">
                    transform=none
                </Label>
                <Label size="10" transform="capitalize">
                    transform=capitalize
                </Label>
                <Label size="10" transform="lowercase">
                    transform=lowercase
                </Label>
                <Label size="10" transform="uppercase">
                    transform=uppercase
                </Label>
            </View>
            <Separator />

            <View style={[globalStyles.card]}>
                <Label size="10" font="medium">
                    Prop: textDecoration
                </Label>
                <Label size="10" font="medium">
                    Values: none (default) | underline | line-through |
                    underline line-through
                </Label>
                <Label size="10">
                    Description: textDecoration is used to apply line based
                    decoration to the Label
                </Label>
                <Separator />
                <Label size="10" textDecoration="none">
                    textDecoration=none
                </Label>
                <Label size="10" textDecoration="underline">
                    textDecoration=underline
                </Label>
                <Label size="10" textDecoration="line-through">
                    textDecoration=line-through
                </Label>
                <Label size="10" textDecoration="underline line-through">
                    textDecoration=underline line-through
                </Label>
            </View>
            <Separator />

            <View style={[globalStyles.card, { flex: 1 }]}>
                <Label size="10" font="medium">
                    Prop: align
                </Label>
                <Label size="10" font="medium">
                    Values: auto (default) | left | center | justify | right
                </Label>
                <Label size="10">
                    Description: align is used to apply line based decoration to
                    the Label
                </Label>
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
                    <Label size="10" align="auto">
                        "align=auto adding some paragraph to demonstrate the
                        impact of auto alignment of the Label"
                    </Label>
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
                    <Label size="10" align="center">
                        "align=center adding some paragraph to demonstrate the
                        impact of center alignment of the Label"
                    </Label>
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
                    <Label size="10" align="left">
                        "align=left adding some paragraph to demonstrate the
                        impact of left alignment of the Label"
                    </Label>
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
                    <Label size="10" align="justify">
                        "align=justify adding some paragraph to demonstrate the
                        impact of justify alignment of the Label"
                    </Label>
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
                    <Label size="10" align="right">
                        "align=right adding some paragraph to demonstrate the
                        impact of right alignment of the Label"
                    </Label>
                </View>
            </View>
            <Separator />
        </>
    )
}
export default LabelWidget;
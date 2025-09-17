import React from "react";
import { R } from "../../res";

import View from "../common/View";
import Text from "../common/Text";
import Separator from "../common/Separator";

const ViewWidget = ({ globalStyles }) => {
    return (
        <>
            <View style={[globalStyles.card]}>
                <Text size="10" font="medium">
                    Prop: pressable
                </Text>
                <Text size="10" font="medium">
                    Values: false (default) | true
                </Text>
                <Text size="10">
                    Description: is used to make view pressable. once made
                    pressable all props of react-native's pressable component
                    becomes applicable on this component
                </Text>
                <Separator />

                <View
                    pressable={false}
                    style={[
                        globalStyles.card,
                        {
                            width: "100%",
                            backgroundColor: R.colors.background.disabled,
                            alignItems: "center",
                            justifyContent: "center",
                        },
                    ]}
                >
                    <Text size="10">Amir Shaikh</Text>
                    <Text size="10">Hobbies: Code and Play</Text>
                    <Text size="10" align="center">
                        generic view component for rendering any content type
                    </Text>
                    <Text font="medium">pressable=false</Text>
                </View>
                <Separator />

                <View
                    pressable={true}
                    onPress={() => alert("pressable view")}
                    style={[
                        globalStyles.card,
                        {
                            width: "100%",
                            backgroundColor: R.colors.background.disabled,
                            alignItems: "center",
                            justifyContent: "center",
                        },
                    ]}
                >
                    <Text size="10">Amir Shaikh</Text>
                    <Text size="10">Hobbies: Code and Play</Text>
                    <Text size="10" align="center">
                        a pressable view which doesn't require any button
                        component
                    </Text>
                    <Text font="medium">pressable=true</Text>
                </View>
            </View>
            <Separator />

            <View style={[globalStyles.card]}>
                <Text size="10" font="medium">
                    Prop: rippleColor
                </Text>
                <Text size="10" font="medium">
                    Values: colorCode (default=R.colors.background.disabled)
                </Text>
                <Text size="10">
                    Description: is used to change ripple color effect
                </Text>
                <Separator />

                <View
                    pressable={true}
                    onPress={() => {}}
                    style={[
                        globalStyles.card,
                        {
                            width: "100%",
                            backgroundColor: R.colors.background.disabled,
                            alignItems: "center",
                            justifyContent: "center",
                        },
                    ]}
                >
                    <Text size="10">Amir Shaikh</Text>
                    <Text size="10" font="medium">
                        rippleColor=&#123;R.colors.background.disabled&#125;
                    </Text>
                </View>
                <Separator />

                <View
                    pressable={true}
                    onPress={() => {}}
                    rippleColor={R.colors.primary.lightest}
                    style={[
                        globalStyles.card,
                        {
                            width: "100%",
                            backgroundColor: R.colors.background.disabled,
                            alignItems: "center",
                            justifyContent: "center",
                        },
                    ]}
                >
                    <Text size="10">Amir Shaikh</Text>
                    <Text size="10" font="medium">
                        rippleColor=&#123;R.colors.primary.lightest&#125;
                    </Text>
                </View>
                <Separator />

                <View
                    pressable={true}
                    onPress={() => {}}
                    rippleColor={R.colors.success.light}
                    style={[
                        globalStyles.card,
                        {
                            width: "100%",
                            backgroundColor: R.colors.background.disabled,
                            alignItems: "center",
                            justifyContent: "center",
                        },
                    ]}
                >
                    <Text size="10">Amir Shaikh</Text>
                    <Text size="10" font="medium">
                        rippleColor=&#123;R.colors.success.light&#125;
                    </Text>
                </View>
                <Separator />

                <View
                    pressable={true}
                    onPress={() => {}}
                    rippleColor={R.colors.text.info}
                    style={[
                        globalStyles.card,
                        {
                            width: "100%",
                            backgroundColor: R.colors.background.disabled,
                            alignItems: "center",
                            justifyContent: "center",
                        },
                    ]}
                >
                    <Text size="10">Amir Shaikh</Text>
                    <Text size="10" font="medium">
                        rippleColor=&#123;R.colors.text.info&#125;
                    </Text>
                </View>
                <Separator />
            </View>
            <Separator />
        </>
    );
};

export default ViewWidget;

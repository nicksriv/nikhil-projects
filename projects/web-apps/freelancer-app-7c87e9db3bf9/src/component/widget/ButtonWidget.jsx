import React from "react";
import { R } from "../../res";

import View from "../common/View";
import Text from "../common/Text";
import Button from "../form/Button";
import Separator from "../common/Separator";
import { Image } from "react-native";

const ButtonWidget = ({ globalStyles }) => {
    return (
        <>
            <View style={[globalStyles.card]}>
                <Text size="10" font="medium">
                    Prop: onPress
                </Text>
                <Text size="10" font="medium">
                    Values: function type
                </Text>
                <Text size="10">
                    Description: is used to define a callback function to be
                    triggered on press event of button
                </Text>
                <Separator />
                <Button
                    onPress={() => {
                        alert("pressed");
                    }}
                    text="onPress={() => alert('pressed')}"
                />
            </View>
            <Separator />

            <View style={[globalStyles.card]}>
                <Text size="10" font="medium">
                    Prop: onLongPress
                </Text>
                <Text size="10" font="medium">
                    Values: function type
                </Text>
                <Text size="10">
                    Description: is used to define a callback function to be
                    triggered on long press event of button
                </Text>
                <Separator />
                <Button
                    onLongPress={() => {
                        alert("pressed for x duration");
                    }}
                    text="onLongPress={() => alert('pressed for x duration')}"
                />
            </View>
            <Separator />

            <View style={[globalStyles.card]}>
                <Text size="10" font="medium">
                    Prop: disabled
                </Text>
                <Text size="10" font="medium">
                    Values: false (default) | true
                </Text>
                <Text size="10">
                    Description: is used to set state of button; overrides style
                    and callback function
                </Text>
                <Separator />
                <Button
                    onPress={() => {
                        alert("event triggered since disabled is false");
                    }}
                    text="disabled=false"
                    disabled={false}
                />
                <Separator />
                <Button
                    onPress={() => {
                        alert("event won't triggered since disabled is true");
                    }}
                    text="variant=contained disabled=true"
                    disabled={true}
                />
                <Separator />
                <Button
                    onPress={() => {
                        alert("event won't triggered since disabled is true");
                    }}
                    text="variant=text disabled=true"
                    variant="text"
                    disabled={true}
                />
                <Separator />
                <Button
                    onPress={() => {
                        alert("event won't triggered since disabled is true");
                    }}
                    text="variant=outlined disabled=true"
                    variant="outlined"
                    disabled={true}
                />
            </View>
            <Separator />

            <View style={[globalStyles.card]}>
                <Text size="10" font="medium">
                    Prop: variant
                </Text>
                <Text size="10" font="medium">
                    Values: contained (default) | outlined | text
                </Text>
                <Text size="10">
                    Description: is used to define core type of the button style
                </Text>
                <Separator />
                <Button
                    onPress={() => {}}
                    text="variant=Contained"
                    variant="contained"
                />
                <Separator />
                <Button
                    onPress={() => {}}
                    text="variant=Outlined"
                    variant="outlined"
                />
                <Separator />
                <Button onPress={() => {}} text="variant=Text" variant="text" />
            </View>
            <Separator />

            <View style={[globalStyles.card]}>
                <Text size="10" font="medium">
                    Prop: size
                </Text>
                <Text size="10" font="medium">
                    Values: xs | sm (default) | md | lg
                </Text>
                <Text size="10">
                    Description: is used to set different sizes of button
                </Text>
                <Separator />
                <Button onPress={() => {}} text="size=xs" size="xs" />
                <Separator />
                <Button onPress={() => {}} text="size=sm" size="sm" />
                <Separator />
                <Button onPress={() => {}} text="size=md" size="md" />
                <Separator />
                <Button onPress={() => {}} text="size=lg" size="lg" />
            </View>
            <Separator />

            <View style={[globalStyles.card]}>
                <Text size="10" font="medium">
                    Prop: shape
                </Text>
                <Text size="10" font="medium">
                    Values: default (default) | round | square
                </Text>
                <Text size="10">
                    Description: is used to set different shapes of button
                </Text>
                <Separator />
                <Button
                    onPress={() => {}}
                    text="shape=none"
                    shape="none"
                    variant="outlined"
                />
                <Separator />
                <Button
                    onPress={() => {}}
                    text="shape=round"
                    shape="round"
                    variant="outlined"
                />
                <Separator />
                <Button
                    onPress={() => {}}
                    text="shape=square"
                    shape="square"
                    variant="outlined"
                />
            </View>
            <Separator />

            <View style={[globalStyles.card]}>
                <Text size="10" font="medium">
                    Prop: color
                </Text>
                <Text size="10" font="medium">
                    Values: string of color code
                </Text>
                <Text size="10">
                    Description: used to override color of button text also
                    helps to set android ripple color
                </Text>
                <Separator />
                <Button
                    onPress={() => {}}
                    text="color={R.colors.success.main}"
                    size="xs"
                    variant="text"
                    color={R.colors.success.main}
                />
                <Separator />
                <Button
                    onPress={() => {}}
                    text="color={R.colors.primary.light}"
                    size="xs"
                    variant="text"
                    color={R.colors.primary.light}
                />
            </View>
            <Separator />

            <View style={[globalStyles.card]}>
                <Text size="10" font="medium">
                    Prop: backgroundColor
                </Text>
                <Text size="10" font="medium">
                    Values: string of color code
                </Text>
                <Text size="10">
                    Description: used to override background color of button
                </Text>
                <Separator />
                <Button
                    onPress={() => {}}
                    text="backgroundColor={R.colors.success.lightest}"
                    size="xs"
                    variant="text"
                    shape="round"
                    color={R.colors.success.main}
                    backgroundColor={R.colors.success.lightest}
                />
                <Separator />
                <Button
                    onPress={() => {}}
                    text="backgroundColor={R.colors.primary.lightest}"
                    size="xs"
                    variant="text"
                    shape="round"
                    color={R.colors.primary.main}
                    backgroundColor={R.colors.primary.lightest}
                />
            </View>
            <Separator />

            <View style={[globalStyles.card]}>
                <Text size="10" font="medium">
                    Prop: borderColor
                </Text>
                <Text size="10" font="medium">
                    Values: string of color code
                </Text>
                <Text size="10">
                    Description: used to override border color of button
                </Text>
                <Separator />
                <Button
                    onPress={() => {}}
                    text="borderColor={R.colors.success.light}"
                    size="xs"
                    variant="outlined"
                    shape="round"
                    color={R.colors.success.light}
                    borderColor={R.colors.success.lightest}
                />
                <Separator />
                <Button
                    onPress={() => {}}
                    text="borderColor={R.colors.primary.light}"
                    size="xs"
                    variant="outlined"
                    shape="round"
                    color={R.colors.primary.light}
                    borderColor={R.colors.primary.lightest}
                />
            </View>
            <Separator />

            <View style={[globalStyles.card]}>
                <Text size="10" font="medium">
                    Prop: leftComponent/rightComponent
                </Text>
                <Text size="10" font="medium">
                    Values: react node or any component
                </Text>
                <Text size="10">
                    Description: used to place components before/after button text
                </Text>
                <Separator />
                <Button
                    onPress={() => {}}
                    text="Chat"
                    variant="text"
                    color={R.colors.text.secondary}
                    leftComponent={() => (
                        <Image
                            resizeMode="contain"
                            style={{ height: 24, width: 24 }}
                            source={R.images.action.whatsapp()}
                        />
                    )}
                />
                <Button
                    onPress={() => {}}
                    text="Chat"
                    variant="text"
                    color={R.colors.text.secondary}
                    rightComponent={() => (
                        <Image
                            resizeMode="contain"
                            style={{ height: 24, width: 24 }}
                            source={R.images.tab.profile()}
                        />
                    )}
                />

                <Button
                    onPress={() => {}}
                    text="Chat"
                    variant="text"
                    color={R.colors.text.secondary}
                    leftComponent={() => (
                        <Image
                            resizeMode="contain"
                            style={{ height: 24, width: 24 }}
                            source={R.images.action.whatsapp()}
                        />
                    )}
                    rightComponent={() => (
                        <Image
                            resizeMode="contain"
                            style={{ height: 24, width: 24 }}
                            source={R.images.tab.profile()}
                        />
                    )}
                />
            </View>
            <Separator />
        </>
    );
};

export default ButtonWidget;

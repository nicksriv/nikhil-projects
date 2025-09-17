import React from "react";
import { Text as RNText, StyleSheet } from "react-native";
import { R } from "../../res";

// variant
// 20 = title2
// 18 = subtitle1
// 16 = subtitle2
// 14 = body1
// 12 = body2 == default
// 10 = caption

// boldness
// bold
// regular
// semibold
// medium
// light

const Text = ({
    variant = "body2",
    font = "regular",
    color = "primary",
    transform = "none",
    textDecoration = "none",
    align = "auto",
    style: customStyle = {},
    ...props
}) => {
    return (

        <RNText
            style={[
                style[font],
                style[variant],
                {
                    color: R.colors.text[color] || color,
                    textTransform: transform,
                    textDecorationLine: textDecoration,
                    textAlign: align,
                },
                customStyle,
            ]}
            {...props}            
        />
    );
};

const style = StyleSheet.create({
    title2: {
        fontSize: R.units.scale(20),
    },
    subtitle1: {
        fontSize: R.units.scale(18),
    },
    subtitle2: {
        fontSize: R.units.scale(16),
    },
    body1: {
        fontSize: R.units.scale(14),
    },
    body2: {
        fontSize: R.units.scale(12),
    },
    caption: {
        fontSize: R.units.scale(10),
    },
    bold: {
        fontFamily: R.fonts.poppin.bold,
    },
    regular: {
        fontFamily: R.fonts.poppin.regular,
    },
    semibold: {
        fontFamily: R.fonts.poppin.semibold,
    },
    medium: {
        fontFamily: R.fonts.poppin.medium,
    },
    light: {
        fontFamily: R.fonts.poppin.light,
    },
});

export default React.memo(Text);

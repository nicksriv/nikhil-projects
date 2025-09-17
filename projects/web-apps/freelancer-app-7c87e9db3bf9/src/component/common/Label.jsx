import React from "react";
import Text from "./Text";
import { R } from "../../res";

const Label = ({
    size = 12,
    font = "regular",
    color = "primary",
    transform = "none",
    textDecoration = "none",
    align = "auto",
    ...props
}) => {
    return (
      <>
      <Text size={size} font={font} color={color} transform={transform} textDecoration={textDecoration} align={align}
        {...props} />
      </>
    );
};

export default Label;

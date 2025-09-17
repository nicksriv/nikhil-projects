import React from "react";
import Image from "./Image";

const Icon = ({
    size = "sm",
    align = "auto",
    backgroundColor = "transparent",
    ...props
}) => {
    const sizes = { xxs:12, xs: 18, sm: 24, md: 32, lg: 48, xl: 64 };
    return (
        <Image
            height={sizes[size]}
            width={sizes[size]}
            backgroundColor={backgroundColor}
            {...props}
        />
    );
};

export default React.memo(Icon);

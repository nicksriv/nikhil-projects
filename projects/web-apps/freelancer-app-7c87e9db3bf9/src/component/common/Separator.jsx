import React from "react";
import View from "./View";
import { R } from "../../res";

const Separator = ({ size = 8, color = "transparent", vertical = false }) => {
    if (vertical) {
        return (
            <View
                style={{
                    backgroundColor: color,
                    width: R.units.scale(size),
                    height: "100%",
                }}
            />
        );
    }
    return (
        <View
            style={{
                backgroundColor: color,
                height: R.units.scale(size),
                width: "100%",
            }}
        />
    );
};

export default React.memo(Separator);

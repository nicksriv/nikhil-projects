import React from "react";
import { Alert } from "react-native";
import Ionicons from "react-native-vector-icons/dist/Ionicons";
import AntDesign from "react-native-vector-icons/dist/AntDesign";

const Icon = {
    Ionicons,
    AntDesign
}

const VectorIcon = (props) => {
    const {
        type = "Ionicons",
        name,
        ...restProps
    } = props;
    const IconComponent = Icon[type];

    if (!IconComponent) {
        // Alert.alert(`${type} is not supprted`);
        console.warn(`${type} is not supprted`)
        return null;
    }

    return (
        <IconComponent name={name} {...restProps} />
    )
}

export default VectorIcon;
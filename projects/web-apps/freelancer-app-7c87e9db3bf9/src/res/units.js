import { Dimensions, PixelRatio, Platform } from "react-native";

const units = {};

const { height, width } = Dimensions.get("window");
units.windowWidth = (size) => width * size;
units.windowHeight = (size) => height * size;

units.pixelRatio = PixelRatio.get();
console.log("pixelRatio", Platform.OS, units.pixelRatio)
units.scale = (size = 10) => {
    if (units.pixelRatio >= 2) return size * 1.15;
    if (units.pixelRatio >= 3) return size * 1.35;
    return size * units.pixelRatio;
};

export { units };
import { Platform, PixelRatio } from "react-native";
import { windowHeight } from "../../utils/constants";

const DEFAULT_RESIZE_SCREEN = Platform.OS === "ios" ? 812 : 667;

export function RA(size, screenSize) {
    let scale = windowHeight / DEFAULT_RESIZE_SCREEN;
    if (Platform.OS === "ios" && windowHeight <= 896) {
        scale = 1;
    }
    const newSize = size * scale;
    if (Platform.OS === "ios") {
        return Math.round(PixelRatio.roundToNearestPixel(newSize));
    } else {
        return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 0.5;
    }
}

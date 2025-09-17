import { Dimensions, Platform } from 'react-native';

/**
 * Constant containing device's window height
 */
export const windowHeight = Dimensions.get('window').height;

/**
 * Constant containing device's window width
 */
export const windowWidth = Dimensions.get('window').width;

/**
 * Constant to check if device OS is Android
 */
export const IS_ANDROID = Platform.OS === 'android';

/**
 * Constant to check if device OS is iOS
 */
export const IS_IOS = Platform.OS === 'ios';

/**
 * Constant to check iphoneXS status bar height
 */

const X_WIDTH = 375;
const X_HEIGHT = 812;

const XS_MAX_WIDTH = 414;
const XS_MAX_HEIGHT = 896;

export const isIPhoneX =
  Platform.OS === 'ios' && !Platform.isPad && !Platform.isTVOS
    ? (windowWidth === X_WIDTH && windowHeight === X_HEIGHT) ||
    (windowWidth === XS_MAX_WIDTH && windowHeight === XS_MAX_HEIGHT)
    : false;

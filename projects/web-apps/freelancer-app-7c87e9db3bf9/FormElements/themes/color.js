import { dColors } from './darkColor';
import { lColors } from './lightColor';
const colorScheme = ""
if (colorScheme === 'dark') {
  // Use dark color scheme
}
export const primaryColor = (props) => {
  return props?.auth?.primaryColor ? props.auth.primaryColor : "#2069A3";
};

export const menuColor = (props) => {
  return colorScheme === 'dark' ? colors.staticWhiteColor : props?.auth?.menuColor ? props.auth.menuColor : "#2069A3";
};

export const colors = {
  staticLoginPrimaryColor: "#2C3E93",
  staticPrimaryColor: "#2C3E93",
  borderWhite: "#FFFFFF",
  loginSignInButton: "#1981A5",
  staticTextColor: colorScheme === 'dark' ? dColors.staticTextColor : lColors.staticTextColor,
  staticGrayColor: colorScheme === 'dark' ? dColors.staticGrayColor : lColors.staticGrayColor,
  staticDisableTextColor: colorScheme === 'dark' ? dColors.staticDisableTextColor : lColors.staticDisableTextColor,
  staticShowColor: colorScheme === 'dark' ? dColors.staticShowColor : lColors.staticShowColor,
  staticDisableShowColor: colorScheme === 'dark' ? dColors.staticDisableShowColor : lColors.staticDisableShowColor,
  staticProfileDisableShowColor: colorScheme === 'dark' ? dColors.staticProfileDisableShowColor : lColors.staticProfileDisableShowColor,
  staticWhiteColor: colorScheme === 'dark' ? dColors.staticWhiteColor : lColors.staticWhiteColor,
  staticIconGrayColor: colorScheme === 'dark' ? dColors.staticIconGrayColor : lColors.staticIconGrayColor,
  staticRedColor: colorScheme === 'dark' ? dColors.staticRedColor : lColors.staticRedColor,
  staticBlackColor: colorScheme === 'dark' ? dColors.staticBlackColor : lColors.staticBlackColor,
  transparentColor: colorScheme === 'dark' ? dColors.transparentColor : lColors.transparentColor,
  backgroundColor: colorScheme === 'dark' ? dColors.backgroundColor : lColors.backgroundColor,
  staticGrayLabelColor: colorScheme === 'dark' ? dColors.staticGrayLabelColor : lColors.staticGrayLabelColor,
  componentFrameColor: colorScheme === 'dark' ? dColors.componentFrameColor : lColors.componentFrameColor,
  graphHorizontal: colorScheme === 'dark' ? dColors.graphHorizontal : lColors.graphHorizontal,
  graphVertical: colorScheme === 'dark' ? dColors.graphVertical : lColors.graphVertical,
  lightGrayColor: colorScheme === 'dark' ? dColors.lightGrayColor : lColors.lightGrayColor,
  shadowColor: colorScheme === 'dark' ? dColors.shadowColor : lColors.shadowColor,
  grayToWhite: colorScheme === 'dark' ? dColors.grayToWhite : lColors.grayToWhite,
  tableHeaderBg: colorScheme === 'dark' ? dColors.tableHeaderBg : lColors.tableHeaderBg,
  tableRowBg: colorScheme === 'dark' ? dColors.tableRowBg : lColors.tableRowBg,
  buttonlightGrayColor: colorScheme === 'dark' ? dColors.buttonlightGrayColor : lColors.buttonlightGrayColor,
  splashScreenColor: colorScheme === 'dark' ? dColors.splashScreenColor : lColors.splashScreenColor,
  staticRedColor: "red",
  staticGreenColor: "green"
};

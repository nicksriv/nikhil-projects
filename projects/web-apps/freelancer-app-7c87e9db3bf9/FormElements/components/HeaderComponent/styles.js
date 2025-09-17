import { Dimensions, Platform, StyleSheet } from "react-native";
import { colors } from "../../themes/color";
import { RA } from "../../assets/fontSize/fontSize";

export const styles = StyleSheet.create({
  container: {
    height: 50,
  },
  headerComponent: {
    height: 50,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: colors.transparentColor,
  },
  menuComponent: {
    height: 70,
    width: "100%",
    flexDirection: "row",
  },
  hamburgerView: {
    height: "100%",
    width: "30%",
    justifyContent: "center",
    alignItems: "flex-end",
    paddingRight: "5%"
  },
  iconView: {
    height: "100%",
    width: "40%",
    // paddingLeft: "15%",
    marginLeft: 5,
    // backgroundColor: "pink",
    alignSelf: "center",
    flexDirection: "row",
  },
  profileView: {
    height: "100%",
    width: "30%",
    flexDirection: "row",
    // backgroundColor: "blue",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  actionLogo: {
    height: RA(50),
    width: RA(50),
    // marginVertical: RA(5),
  },
  profileImage: {
    height: 40,
    width: 40,
    borderRadius: 20,
    borderColor: colors.staticPrimaryColor,
    borderWidth: 1,

    marginLeft:30,
    backgroundColor: colors.staticPrimaryColor,
    fontSize: 10,
    color: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  closeIcon: {
    color: "white",
    height: 20,
    width: 20,
    marginLeft: Dimensions.get("screen").width * 0.045,
    marginTop:
      Platform.OS === "android"
        ? Dimensions.get("screen").width * 0.1
        : Dimensions.get("screen").width * 0.17,
  },
  // closeIcon: {
  //   height: Dimensions.get("screen").width * 0.04,
  //   width: Dimensions.get("screen").width * 0.04,
  //   marginLeft: Dimensions.get("screen").width * 0.045,
  //   marginTop:
  //     Platform.OS === "android"
  //       ? Dimensions.get("screen").width * 0.1
  //       : Dimensions.get("screen").width * 0.17,
  // },
  closeOnOuterViewMenu: {
    width: "100%",
    height: "100%",
  },
  menuModuleContainer: {
    width: "100%",
    backgroundColor: colors.transparentColor
  },
  moduleContainer: {
    width: "100%",
    height: Dimensions.get("screen").width * 0.15,
    flexDirection: "row",
    alignItems: "center",
  },
  selectedModuleContainer: {
    width: "100%",
    marginTop: "10%",
    height: Dimensions.get("screen").width * 0.15,
    flexDirection: "row",
    alignItems: "center",
  },
  moduleNameStyle: {
    fontSize: 15,
    fontWeight: Platform.OS === "android" ? "400" : "300",
    marginLeft: Dimensions.get("screen").width * 0.045,
  },
  moduleListContainer: {
    width: "100%",
  },
  menuFlatList: {
    width: "100%",
  },
  moduleIcon: {
    marginLeft: Dimensions.get("screen").width * 0.05,
    color: colors.staticTextColor
  },
  eachModulesContainer: {
    width: "85%",
    flexDirection: "row",
  },
  arrowIcon: {
    opacity: 0.4,
    color: colors.staticTextColor
  },
  subModulesContainer: {
    width: "100%",
  },
  subModulesList: {
    flexDirection: "row",
    height: Dimensions.get("screen").width * 0.15,
    alignItems: "center",
    marginLeft: Dimensions.get("screen").width * 0.08,
  },
  bottomNavigationView: {
    backgroundColor: colors.staticWhiteColor,
    width: "100%",
    height: 350,
    borderRadius: 10,
  },
  textDanger: {
    color: "#dc3545",
    marginLeft: 20,
    marginTop: -10,
    fontSize: 12,
  },
  headerMenuImageView: {
    // width: 25,
    color: colors.grayToWhite
  },
  menuContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "rgba(52, 52, 52, 0.8)",
  },
});

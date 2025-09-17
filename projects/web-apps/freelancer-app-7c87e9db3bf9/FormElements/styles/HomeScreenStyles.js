import { Dimensions, Platform, StyleSheet } from "react-native";
import { colors } from "../themes/color";
export const styles = StyleSheet.create({
  continer: {
    flex: 1,
  },
  headerComponent: {
    height: 50,
    width: "100%",
   
    // backgroundColor: "#F6F8FA",
  },
  menuComponent: {
    height: 70,
    width: "100%",

    flexDirection: "row",
  },
  hamburgerview: {
    height: "100%",
    width: "15%",

    justifyContent: "center",
    alignItems: "center",
  },
  iconView: {
    height: "100%",
    width: "55%",
    marginTop: 20,
    alignItems: "center",
  },
  profileView: {
    height: "100%",
    width: "30%",

    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  imageLogo: {
    height: 30,
    width: 70,
  },
  imageMenu: {
    height: 20,
    width: 20,
  },
  imageMenu1: {
    height: Dimensions.get("screen").width * 0.06,
    width: Dimensions.get("screen").width * 0.06,
    // marginHorizontal: 5,
    marginTop: 5,
    // marginBottom: -10,
  },
  actionLogo: {
    height: 30,
    width: 180,
    marginRight: 10,
  },
  profileImage: {
    height: 30,
    width: 30,
    borderRadius: 20,
    marginRight: 7,
  },
  welcomeText: {
    fontSize: 40,
    fontWeight: "200",
    marginTop: 20,
    marginLeft: 20,
  },
  nameText: {
    fontSize: 25,
    fontWeight: "600",
    marginLeft: "5%",
    // marginTop: "2%",
    alignSelf: "center",
  },
  menuContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "rgba(52, 52, 52, 0.8)",
  },
  closeIcon: {
    height: Dimensions.get("screen").width * 0.04,
    width: Dimensions.get("screen").width * 0.04,
    marginLeft: Dimensions.get("screen").width * 0.045,
    marginTop:
      Platform.OS === "android"
        ? Dimensions.get("screen").width * 0.1
        : Dimensions.get("screen").width * 0.17,
  },
  closeOnOuterViewMenu: {
    width: "100%",
    height: "100%",
  },
  menuModuleContainer: {
    width: "100%",
  },
  moduleContainer: {
    width: "100%",
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
  menuFlatlist: {
    width: "100%",
  },
  moduleIcon: {
    marginLeft: Dimensions.get("screen").width * 0.05,
  },
  eachModulesContainer: {
    width: "85%",
    flexDirection: "row",
  },
  arrowIcon: {
    opacity: 0.4,
  },
  subModulesContainer: {
    width: "100%",
  },
  subModulesList: {
    flexDirection: "row",
    height: Dimensions.get("screen").width * 0.15,
    alignItems: "center",
    marginLeft: Dimensions.get("screen").width * 0.13,
  },

  menuViewComponent: {
    height: "100%",
    width: "100%",
    flexDirection: "row",
    marginTop: 0,
  },
  closeMenu: {
    height: "100%",
    backgroundColor: "black",
    opacity: 0.1,
    width: "20%",
  },
  menuHeader: {
    height: "10%",
    width: "100%",
    justifyContent: "center",
  },
  sideMenuCloser: {
    height: 30,
    width: 30,
    marginLeft: 40,
    marginTop: 0,
  },
  listComponent: {
    height: 80,
    width: "100%",
  },
  listComponent1: {
    height: 80,
    width: "100%",
    flexDirection: "row",
  },

  listItemComponents: {
    height: "100%",
    width: "30%",
    justifyContent: "center",
    alignItems: "center",
  },

  contentTextStyle: {
    fontWeight: "500",
    fontSize: 20,
    textAlign: "center",
    marginTop: 25,
  },
  contentTextStyle1: {
    fontWeight: "200",
    fontSize: 20,
    textAlign: "center",
    marginTop: 25,
  },
  sideMenuView: {
    backgroundColor: "green",
    height: 50,
    width: "100%",
    backgroundColor: "#000",
    justifyContent: "center",
  },
  menuTextView: { height: "100%", width: "100%" },
  cellView: { height: 60, width: "100%", flexDirection: "row" },
  menuImageView: {
    height: "100%",
    width: "30%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 60,
    marginLeft: 30,
  },
  menuItemsText: {
    marginLeft: -30,
    fontWeight: "300",
    fontSize: 15,
  },
  table: {
    width: "100%",
    height: 70,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  bottomModal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  container: {
    width: "100%",
    height: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "lightblue",
    padding: 12,
    margin: 16,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)",
  },
  modalContent: {
    backgroundColor: colors.staticWhiteColor,
    padding: 22,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)",
  },
  bottomModal: {
    justifyContent: "flex-end",
    margin: 0,
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
    fontSize: 12,
  },
});

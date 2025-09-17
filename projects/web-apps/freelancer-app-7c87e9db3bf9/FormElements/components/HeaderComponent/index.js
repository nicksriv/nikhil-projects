import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
  FlatList,
  Modal,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Dimensions,
  Platform,
  KeyboardAvoidingView,
  PermissionsAndroid,
  BackHandler,
} from "react-native";
import envConfig from "../../api/env";
import { styles } from "./styles";
import Icon from "react-native-vector-icons/MaterialIcons";
import container from "../../stores/Services/HomeServices";
import { compose } from "recompose";
// import Modal from 'react-native-modal';
import { TextInput, DefaultTheme } from "react-native-paper";
import { BottomSheet } from "react-native-btr";
import { useRoute } from "@react-navigation/native";
import { colors, menuColor, primaryColor } from "../../themes/color";
import { fontsRegular, fontsBold } from "../../assets/fonts/fonts";
import Toast from "react-native-simple-toast";
import * as Keychain from "react-native-keychain";
import { RA } from "../../assets/fontSize/fontSize";
// import RNFetchBlob from "rn-fetch-blob";
import RNExitApp from "react-native-exit-app";
const authToken = `Bearer eyJhbGciOiJIUzUxMiJ9.eyJ0eXBlT2ZVc2VyIjoiVXNlciIsImZpcnN0TmFtZSI6IkNoYXJhbiIsImxhc3ROYW1lIjoiUiIsImNsaWVudFN5c3RlbUlkIjoiNjJlOGYyOTNhZDljMDUyZGQyZDExZDAyIiwiY2xpZW50SWQiOiJDTDAwMDMiLCJpZCI6IjYyZThmNjdlYWQ5YzA1MmRkMmQxMWQxMyIsInVzZXJSb2xlIjoiIiwidXNlcklkIjoiRzAwMyIsImlhdCI6MTY3MTU0NDk4NH0.nS5uIpvxd0Rw1mAzMkyyhIS9zQKQKTFXjN4GexqCNrEuRNEQW5_M5iWbfGHo4THJrFZtyQlSJ6Df4Fm0gdlQog`;

var intials;
let settimeload;

const HeaderComponent = ( {props, navigateScreen, fromScreen} ) => {
  // Find current screen name
  const route = useRoute();
  const [counter, setCounter] = React.useState(0);

  const header = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: authToken,
  };


  useEffect(() => {
    //rowList = [];

    console.log("prifleeeeeidd", props.profilePicture);

    settimeload = setInterval(() => {
      setCounter((state) => state + 1);
    }, 2000);
  }, []);

  useEffect(() => {
    // props.actions.setredirectlogin(false);

    if (counter == 1) {
      clearInterval(settimeload);
      load();
    }

    intials =
      props.auth.decoded.firstName
        .split(" ")
        .map((name) => name[0])
        .join("")
        .toUpperCase() +
      "" +
      props.auth.decoded.lastName
        .split(" ")
        .map((name) => name[0])
        .join("")
        .toUpperCase();

    console.log("intialsintials", intials);

    getSideMenuData();
  }, [menuItems, counter]);
  console.log("props.auth", props.auth);

  const [showMenu, setShowMenu] = useState(false);
  const [menuItems, setMenuItems] = useState();
  const [clientLogo, setClientLogo] = useState();
  // const [profileLogo, setProfileLogo] = useState();
  const [flatModal, setFlatModal] = useState(false);
  const [spinner, setSpinner] = useState(true);
  const [passwordMenu, setPasswordMenu] = useState(false);
  const [userProfile, setUserProfile] = useState(false);
  const [logout, setLogout] = useState(false);
  const [profileid, setProfileid] = useState();
  const [statuscode, setStatusCode] = useState(false);

  //change password screen state start
  const [currentPassword, setcurrentPassword] = useState("");
  const [newPassword, setnewPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [newpasswordVisible, setnewPasswordVisible] = useState(true);
  const [passwordErrorMessage, setpasswordErrorMessage] = useState("");
  const [confirmPasswordErrorMessage, setconfirmPasswordErrorMessage] =
    useState("");
  const [loading, setloading] = useState(false);

  //change password screen state end

  // User Profile
  const showUserProfileMenu = () => {
    setUserProfile(true);
  };

  const hideUserProfileMenu = () => {
    setUserProfile(false);
  };

  const showLogoutMenu = () => {
    setLogout(true);
    setUserProfile(false);
  };
  const hideLogoutMenu = () => {
    setLogout(false);
    setUserProfile(false);
  };
  const logoutFromSession = () => {
    clearprofileid();
    props.actions.setProfilePicture("");
    props.actions.setLocalLogo("");
    props.actions.setLocalBackground("");

    setLogout(false);
    setUserProfile(false);
    // props.actions.logOut();
    // props.actions.setredirectlogin(true);

    // if (Platform.OS === "ios") {
    //   RNExitApp.exitApp();
    // } else {
    //   BackHandler.exitApp();
    // }
    props.navigation.navigate("Login");
  };

  const clearprofileid = async () => {
    await Keychain.resetGenericPassword();
  };

  const userProfileNav = () => {
    setUserProfile(false);
    props.navigation.navigate("ProfileScreen");
  };
  const backArrowFunction = () => {
    if (fromScreen == 'Details') {
      navigateScreen();
    } else {
      if (props.reportlist != "") {
        props.actions.setViewReportlist("");
      } else if ( props.listofreport == true) {
        props.actions.setVisibleListofReport(false);
      } else {
        props.navigation.goBack()    
      }
    }
  };

  const load = async () => {
    try {
      // Retrieve the credentials
      const credentials = await Keychain.getGenericPassword();

      if (credentials) {
        console.log(
          "Credentials successfully loaded for user " + credentials.username
        );
        setProfileid(credentials.username);

        fetch(envConfig.ClientLogo + "api/v1/files/" + credentials.username, {
          headers: header,
        })
          .then((response) => {
            console.log("LOGOgetprofileeeee ===> ", response);
            // setProfileLogo(response.url);
            // global.profileLogo = response.url;
            props.actions.setProfilePicture(response.url);

            const statusCode = response.status;
            const responseJson = response.json();
            return Promise.all([statusCode, responseJson]);
          })

          .then(([statusCode, responseJson]) => {
            if (statusCode == 401 || statusCode == 403) {
              props.actions.logOut();
            }
            return responseJson;
          })
          .catch((error) => {
            console.error(error);
            if (
              error?.data?.statuscode == 401 ||
              error?.data?.statuscode == 403
            ) {
              global.authToken = "";
              props.actions.setAuth(null);
            }
          });
      } else {
        console.log("No credentials stored");
      }
    } catch (error) {
      console.log("Keychain couldn't be accessed!", error);
    }
  };

  const getSideMenuData = () => {
    setSpinner(true);
    if (props.auth.logoId != "" && props.localLogo == "") {
      getClientLogo();
    }
    if (props.auth.backgroundImageId != "" && props.localBackground == "") {
      getClientBackground();
    }
    getProfileLogo();
    return fetch(fullUrl, {
      headers: header,
    })
      .then((response) => {
        const statusCode = response.status;
        const responseJson = response.json();
        return Promise.all([statusCode, responseJson]);
      })
      .then(([statusCode, responseJson]) => {
        if (statusCode == 401 || statusCode == 403) {
          props.actions.logOut();
        }
        const data = responseJson.modules;
        setMenuItems(data);
        setSpinner(false);
        return responseJson;
      })
      .catch((error) => {
        console.error(error);
        if (error?.data?.statuscode == 401 || error?.data?.statuscode == 403) {
          global.authToken = "";
          props.actions.setAuth(null);
        }
      });
  };

  //    Logo Api
  const getClientLogo = () => {
    return fetch(
      envConfig.ClientLogo + "api/v1/files/" + `${props.auth.logoId}`,
      {
        headers: header,
      }
    )
      .then((response) => {
        console.log("LOGO1 ===> ", response);

        if (response?.url) {
          setClientLogo(response?.url);
          // setTimeout(() => {
          if (props.localLogo == "" || props.localLogo == undefined) {
            logoDownload(response?.url);
          }
          // }, 500);

          global.clientLogos = response?.url;
        }

        const statusCode = response.status;
        const responseJson = response.json();
        return Promise.all([statusCode, responseJson]);
      })
      .then(([statusCode, responseJson]) => {
        if (statusCode == 401 || statusCode == 403) {
          props.actions.logOut();
        }
        console.log("LOGO RES===> ", responseJson);
        return responseJson;
      })
      .catch((error) => {
        console.error(error);
        if (error?.data?.statuscode == 401 || error?.data?.statuscode == 403) {
          global.authToken = "";
          props.actions.setAuth(null);
        }
      });
  };

  const logoDownload = (newUrl) => {
    //Function to check the platform
    //If iOS the start downloading
    //If Android then ask for runtime permission
    if (Platform.OS === "ios") {
      // downloadLogo(newUrl);
    } else {
      try {
        PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: "storage title",
            message: "storage_permission",
          }
        ).then((granted) => {
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            //Once user grant the permission start downloading
            console.log("Storage Permission Granted.");
            // downloadLogo(newUrl);
          } else {
            //If permission denied then show alert 'Storage Permission
            //Not Granted'
            Alert.alert("storage_permission");
          }
        });
      } catch (err) {
        //To handle permission related issue
        console.log("error", err);
      }
    }
  };

  const downloadLogo = async (downloadURL) => {
    var date = new Date();
    const {
      dirs: { DownloadDir, DocumentDir },
    } = RNFetchBlob.fs;
    const { config } = RNFetchBlob;
    const isIOS = Platform.OS == "ios";
    const aPath = Platform.select({ ios: DocumentDir, android: DownloadDir });
    const fPath =
      aPath +
      "/" +
      "Logo" +
      Math.floor(date.getTime() + date.getSeconds() / 2) +
      ".png";

    const configOptions = Platform.select({
      ios: {
        fileCache: true,
        path: fPath,
        // mime: 'application/xlsx',
        // appendExt: 'xlsx',
        //path: filePath,
        //appendExt: fileExt,
        notification: false,
      },

      android: {
        fileCache: false,
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: false,
          path: fPath,
          description: "Downloading attachment file...",
        },
      },
    });

    if (isIOS) {
      config(configOptions)
        .fetch("GET", downloadURL)
        .then((res) => {
          //this.refs.toast.show('File download successfully');
          console.log("resresresresresresresres = ", "file://" + res.data);

          props.actions.setLocalLogo("file://" + res.data);
        })
        .catch((errorMessage) => {
          console.log("errorrmessage", errorMessage);
        });
    } else {
      config(configOptions)
        .fetch("GET", downloadURL)
        .then((res) => {
          console.log("resresresresresresresres = ", res);
          props.actions.setLocalLogo("file://" + res.data);
        })
        .catch((errorMessage, statusCode) => {
          console.log("errorrmessage", errorMessage);
        });
    }
  };

  //Client Background Image

  const getClientBackground = () => {
    return fetch(
      envConfig.ClientLogo +
        "api/v1/files/" +
        `${props.auth.backgroundImageId}`,
      {
        headers: header,
      }
    )
      .then((response) => {
        console.log("LOGO1 ===> ", response);

        if (response?.url) {
          setClientLogo(response?.url);
          // setTimeout(() => {
          if (
            props.localBackground == "" ||
            props.localBackground == undefined
          ) {
            backgroundDownload(response?.url);
          }
          // }, 500);

          global.clientLogos = response?.url;
        }

        const statusCode = response.status;
        const responseJson = response.json();
        return Promise.all([statusCode, responseJson]);
      })
      .then(([statusCode, responseJson]) => {
        if (statusCode == 401 || statusCode == 403) {
          props.actions.logOut();
        }
        console.log("LOGO RES===> ", responseJson);
        return responseJson;
      })
      .catch((error) => {
        console.error(error);
        if (error?.data?.statuscode == 401 || error?.data?.statuscode == 403) {
          global.authToken = "";
          props.actions.setAuth(null);
        }
      });
  };

  const backgroundDownload = (newUrl) => {
    //Function to check the platform
    //If iOS the start downloading
    //If Android then ask for runtime permission
    if (Platform.OS === "ios") {
      downloadBackground(newUrl);
    } else {
      try {
        PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: "storage title",
            message: "storage_permission",
          }
        ).then((granted) => {
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            //Once user grant the permission start downloading
            console.log("Storage Permission Granted.");
            downloadBackground(newUrl);
          } else {
            //If permission denied then show alert 'Storage Permission
            //Not Granted'
            Alert.alert("storage_permission");
          }
        });
      } catch (err) {
        //To handle permission related issue
        console.log("error", err);
      }
    }
  };

  const downloadBackground = async (downloadURL) => {
    var date = new Date();
    const {
      dirs: { DownloadDir, DocumentDir },
    } = RNFetchBlob.fs;
    const { config } = RNFetchBlob;
    const isIOS = Platform.OS == "ios";
    const aPath = Platform.select({ ios: DocumentDir, android: DownloadDir });
    const fPath =
      aPath +
      "/" +
      "Test" +
      Math.floor(date.getTime() + date.getSeconds() / 2) +
      ".png";

    const configOptions = Platform.select({
      ios: {
        fileCache: true,
        path: fPath,
        // mime: 'application/xlsx',
        // appendExt: 'xlsx',
        //path: filePath,
        //appendExt: fileExt,
        notification: false,
      },

      android: {
        fileCache: false,
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: false,
          path: fPath,
          description: "Downloading attachment file...",
        },
      },
    });

    if (isIOS) {
      config(configOptions)
        .fetch("GET", downloadURL)
        .then((res) => {
          //this.refs.toast.show('File download successfully');
          console.log("resresresresresresresres = ", "file://" + res.data);

          props.actions.setLocalBackground("file://" + res.data);
        })
        .catch((errorMessage) => {
          console.log("errorrmessage", errorMessage);
        });
    } else {
      config(configOptions)
        .fetch("GET", downloadURL)
        .then((res) => {
          console.log("resresresresresresresres = ", res);
          props.actions.setLocalBackground("file://" + res.data);
        })
        .catch((errorMessage, statusCode) => {
          console.log("errorrmessage", errorMessage);
        });
    }
  };

  const getProfileLogo = () => {
    console.log("profilelogo");

    if (typeof profileid != undefined) {
      console.log("profilelogohittttwelcome");
      return fetch(
        envConfig.ClientLogo + "api/v1/files/" + `${props.auth.profileId}`,
        {
          headers: header,
        }
      )
        .then((response) => {
          console.log("LOGO ===> ", response);
          // setProfileLogo(response.url);
          // global.profileLogo = response.url;

          const statusCode = response.status;

          if (response.status == 200) {
            if (props.profilePicture == "") {
              props.actions.setProfilePicture(response.url);
              setStatusCode(false);
            } else {
              setStatusCode(true);
            }
          } else if (response.status == 404) {
            setStatusCode(false);
          } else {
            console.log("response.status", response.status);
          }

          const responseJson = response.json();
          return Promise.all([statusCode, responseJson]);
        })

        .then(([statusCode, responseJson]) => {
          if (statusCode == 401 || statusCode == 403) {
            props.actions.logOut();
          }

          return responseJson;
        })
        .catch((error) => {
          console.error(error);
          if (
            error?.data?.statuscode == 401 ||
            error?.data?.statuscode == 403
          ) {
            global.authToken = "";
            props.actions.setAuth(null);
          }
          console.log("catchstatusCode", statusCode);
        });
    }
  };
  const sideMenu = () => {
    // getSideMenuData();
    setShowMenu(true);
  };

  const hideSideMenu = () => {
    setShowMenu(false);
  };


  const closeListItems = () => {
    setFlatModal(false);
  };

  const sidePasswordMenu = () => {
    setPasswordMenu(true);
    setUserProfile(false);
  };

  const sidePasswordmenuclose = () => {
    setPasswordMenu(false);
  };

 

  //change password screen validation start
  const formValidation = () => {
    setloading(true);
    let errorFlag = false;

    if (currentPassword.length == 0) {
      errorFlag = true;
      setpasswordErrorMessage("Password is required field");
    } else if (currentPassword.length < 6 || currentPassword.length > 20) {
      errorFlag = true;
      setpasswordErrorMessage("Password should be min 6 char and max 20 char");
    }

    if (newPassword.length == 0) {
      errorFlag = true;
      setconfirmPasswordErrorMessage("Confirm Password is required field");
    } else if (newPassword.length < 6 || newPassword.length > 20) {
      errorFlag = true;
      setconfirmPasswordErrorMessage(
        "Password should be min 6 char and max 20 char"
      );
    }

    if (errorFlag) {
      console.log("errorFlag");
      // errorFlag = true;
    } else {
      //  errorFlag = false;

      /** Call our Change password API start*/
      setloading(false);

      let resStatus = 0;
      fetch(ClientLogo + "api/v1/profiles/changepassword", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: props.auth.token,
        },
        body: JSON.stringify({
          currentPassword: currentPassword,
          newPassword: newPassword,
        }),
      })
        .then((response) => {
          resStatus = response.status;
          const statusCode = response.status;
          const responseJson = response.json();
          return Promise.all([statusCode, responseJson]);
        })
        .then(([statusCode, responseJson]) => {
          if (statusCode == 401 || statusCode == 403) {
            props.actions.logOut();
          }
          console.log("responseJsonmahendrencode", JSON.stringify(resStatus));

          switch (resStatus) {
            case 200:
              setPasswordMenu(false);
              setcurrentPassword("");
              setnewPassword("");
              setpasswordErrorMessage("");
              setconfirmPasswordErrorMessage("");
              Toast.show(responseJson.message, Toast.SHORT);
              // alert(responseJson.message);
              props.actions.logOut();
              break;
            case 201:
              setPasswordMenu(false);
              setcurrentPassword("");
              setnewPassword("");
              setpasswordErrorMessage("");
              setconfirmPasswordErrorMessage("");
              Toast.show(responseJson.message, Toast.SHORT);
              // alert(responseJson.message);
              props.actions.logOut();
              break;
            case 400:
              if (resStatus.code === "ValidationFailed") {
                // My custom error messages from the API.
                Toast.show(responseJson.message, Toast.SHORT);
              } else if (
                responseJson.message ==
                "New Password should not be same as current password"
              ) {
                setconfirmPasswordErrorMessage(
                  "New Password should not be same as current password"
                );
                setpasswordErrorMessage("");
              } else {
                Toast.show(responseJson.message, Toast.SHORT);
                setconfirmPasswordErrorMessage("");
              }
              break;
            case 403:
              Toast.show(responseJson.message, Toast.SHORT);
              break;
            case 500:
              Toast.show(responseJson.message, Toast.SHORT);
              break;
            default:
              console.log("unhandled");
              break;
          }
          console.log(responseJson);
        })
        .catch((error) => {
          console.error(error);
          if (
            error?.data?.statuscode == 401 ||
            error?.data?.statuscode == 403
          ) {
            props.actions.setAuth(null);
            global.authToken = "";
          }
        });
      /** Call our Change password API end*/
    }
  };
  //change password screen validation end

  const closedbottommenu = () => {
    setPasswordMenu(false);
    setcurrentPassword("");
    setnewPassword("");
    setpasswordErrorMessage("");
    setconfirmPasswordErrorMessage("");
  };

  const [openSubModules, setOpenSubModules] = useState([]);
  const redirectToModuleSelected = (item) => {
    const subModules = [...openSubModules];
    if (item.subModules.length > 0) {
      if (subModules.length == 0 || subModules == "undefined") {
        subModules.push(item.id);
        setOpenSubModules(subModules);
      } else if (!openSubModules.includes(item.id)) {
        subModules.push(item.id);
        setOpenSubModules(subModules);
      } else {
        if (openSubModules.length > 1) {
          const subModulesCopy = subModules.filter(
            (module) => module != item.id
          );
          setOpenSubModules(subModulesCopy);
        } else {
          subModules.pop();
          setOpenSubModules(subModules);
        }
      }
    } else {
      hideSideMenu();
    }
  };


  const navigateToNextScreen = (item, subItem) => {
    console.log(
      "itemitemitemitemitemitemitemitem  = ",
      item,
      " subItemsubItemsubItemsubItem = ",
      subItem
    );
    props.actions.setMyItem(item);
    props.actions.setMySubItem(subItem);
    props.navigation.navigate("Home");
    props.actions.setViewReportlist("");
    props.actions.setVisibleListofReport(false);

    // console.log('Godwin testing = ',item , subItem);

    // console.log("Module ID=> ", item.id);
    // console.log("Submodule ID=> ", subItem.id);
    // setTableSpinner(true);
    // global.authToken = props?.auth?.token;
    // props.actions.getHeaderList(item.id, subItem.id);
    // props.actions.getWorkflowList(item.id, subItem.id);
    // props.actions
    //     .getRowList(item.id, subItem.id)
    //     .then((response) => {
    //         console.log("INSIDE TABLE ");
    //         setTableSpinner(false);
    //     })
    //     .catch((error) => {
    //         console.error(error);
    //     });
    // setModuleId(item.id);
    // setSubModuleId(subItem.id);
    // setWorkflowId(subItem.workFlowId);
    // global.currentWorkflowId = subItem.workFlowId;
    // getScreenNames();
    // getClientLogo();
    hideSideMenu();
    // navigate to any screen by using navigation.navigate(anyScreen). For now just hiding the menu
  };


  const dashboardScreen = () => {
    hideSideMenu();
    console.log("NavigationNavigation === ", props);
    props.navigation.navigate("DashboardScreen");
  };

  const renderMenuModules = ({ item, index }) => {
    console.log("itemitemitemitemitemitem = ", item);
    return (
      <View key={index} style={styles.menuModuleContainer}>
        <TouchableOpacity onPress={() => redirectToModuleSelected(item)}>
          <View style={styles.moduleContainer}>
            <View style={styles.eachModulesContainer}>
              <Icon
                name={item?.iconMobile ? item?.iconMobile : "adjust"}
                size={15}
                style={styles.moduleIcon}
              />
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: Platform.OS === "android" ? "400" : "300",
                  marginLeft: Dimensions.get("screen").width * 0.045,
                  color: colors.staticTextColor,
                  fontFamily: fontsRegular(props),
                }}
              >
                {item.name}
              </Text>
            </View>
            {item.subModules.length > 0 ? (
              <Icon
                key={index}
                name={
                  openSubModules.includes(item.id)
                    ? "keyboard-arrow-up"
                    : "keyboard-arrow-down"
                }
                size={25}
                style={styles.arrowIcon}
              />
            ) : null}
          </View>
        </TouchableOpacity>
        {openSubModules.includes(item.id) ? (
          <View style={styles.subModulesContainer}>
            {item.subModules.map((subItem, index) => (
              <TouchableOpacity
                key={subItem.id}
                onPress={() => navigateToNextScreen(item, subItem)}
              >
                <View style={styles.subModulesList}>
                  <Icon
                    name={
                      subItem?.iconMobile
                        ? subItem?.iconMobile
                        : subItem?.name == "Reports"
                        ? "table-chart"
                        : "adjust"
                    }
                    // name={subItem.iconMobile}
                    size={15}
                    style={styles.moduleIcon}
                  />
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: Platform.OS === "android" ? "400" : "300",
                      marginLeft: Dimensions.get("screen").width * 0.045,
                      fontFamily: fontsRegular(props),
                      color: colors.staticTextColor,
                    }}
                  >
                    {subItem.name}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        ) : null}
      </View>
    );
  };

  //  Api Calling

  const baseUrl = envConfig.BaseUrl;
  const ClientLogo = envConfig.ClientLogo;

  const api =
    // "api/v1/clients/" + `${props.auth.decoded.clientSystemId}` + "/modules";
    
    "api/v1/clients/" + '62e8f293ad9c052dd2d11d02' + "/modules";

  const fullUrl = baseUrl + api;

 

  // return spinner ? (
  //   <View
  //     style={{
  //       flex: 1,
  //       justifyContent: "center",
  //       alignItems: "center",
  //       backgroundColor: "transparent",
  //     }}
  //   >
  //     <ActivityIndicator
  //       size={15}
  //       style={{ alignSelf: "center" }}
  //       color="#000"
  //     />
  //   </View>
  // ) :
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerComponent}>
        {/* <TouchableOpacity
          style={styles.hamburgerView}
          onPress={() => {
            sideMenu();
          }}
        >
          <Icon
            name="notes"
            size={RA(25)}
            style={{color: primaryColor(props), transform: [{rotateY: '180deg'}]}}
          />
        </TouchableOpacity> */}
        <View style={styles.profileView}>
          {route.name != "DashboardScreen" ? (
            <TouchableOpacity
              style={{ marginLeft: 10 }}
              onPress={() => {
                backArrowFunction();
              }}
            >
              <Icon
                name="keyboard-arrow-left"
                size={30}
                color={colors.staticBlackColor}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => {
                showUserProfileMenu();
              }}
            >
              {props.profilePicture != "" ? (
                <Image
                  // source={require("../../assets/images/Johnwick.jpg")}
                  source={{ uri: props.profilePicture }}
                  style={{
                    height: 35,
                    width: 35,
                    borderRadius: 20,
                    borderColor: primaryColor(props),
                    borderWidth: 1,

                    marginLeft: 15,
                    backgroundColor: primaryColor(props),
                    fontSize: 10,
                    color: "#fff",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                />
              ) : (
                <View
                  // source={require("../../assets/images/Johnwick.jpg")}
                  style={{
                    height: 35,
                    width: 35,
                    borderRadius: 20,
                    borderColor: primaryColor(props),
                    borderWidth: 1,

                    marginLeft: 15,
                    backgroundColor: primaryColor(props),
                    fontSize: 10,
                    color: "#fff",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                    }}
                  >
                    {intials}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.iconView}>
          {/*   */}
          <Image
            source={{
              uri: props?.localLogo,
            }}
            // source={require("../../assets/images/twobyone.png")}
            resizeMode="contain"
            style={{ height: "80%", width: "100%", marginTop: "2%" }}
          />
        </View>

        <TouchableOpacity
          style={styles.hamburgerView}
          onPress={() => {
            sideMenu();
          }}
        >
          <Icon
            name="notes"
            size={RA(25)}
            style={{
              color: primaryColor(props),
              transform: [{ rotateY: "180deg" }],
            }}
          />
        </TouchableOpacity>

        {/* <View style={styles.profileView}>
          <TouchableOpacity
            onPress={() => {
              showUserProfileMenu();
            }}
          >
            {props.profilePicture != "" ? (
              <Image
                // source={require("../../assets/images/Johnwick.jpg")}
                source={{ uri: props.profilePicture }}
                style={{
                  height: 35,
                  width: 35,
                  borderRadius: 20,
                  borderColor: primaryColor(props),
                  borderWidth: 1,

                  marginLeft: 30,
                  backgroundColor: primaryColor(props),
                  fontSize: 10,
                  color: "#fff",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              />
            ) : (
              <View
                // source={require("../../assets/images/Johnwick.jpg")}
                style={{
                  height: 35,
                  width: 35,
                  borderRadius: 20,
                  borderColor: primaryColor(props),
                  borderWidth: 1,

                  marginLeft: 30,
                  backgroundColor: primaryColor(props),
                  fontSize: 10,
                  color: "#fff",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 12,
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                  }}
                >
                  {intials}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View> */}
      </View>

      {/* Side Menu */}
      <Modal animationType="fade" transparent={true} visible={showMenu}>
        <View style={styles.menuContainer}>
          <View
            style={{
              width: "75%",
              height: "100%",
              marginLeft: "25%",
              backgroundColor: menuColor(props),
            }}
          >
            <Image
              source={require("../../assets/images/side_menu_header_bg.png")}
              style={{
                position: "absolute",
                width: Dimensions.get("screen").width,
                height: "20%",
              }}
            />
            <Image
              source={require("../../assets/images/side_menu_header_icon.png")}
              style={{
                marginLeft: Dimensions.get("screen").width * 0.045,
                marginTop:
                  Platform.OS === "android"
                    ? Dimensions.get("screen").width * 0.1
                    : Dimensions.get("screen").width * 0.17,
                position: "absolute",
                width: 50,
                height: 55,
              }}
            />
            <TouchableOpacity
              onPress={hideSideMenu}
              style={{
                width: "93%",
                justifyContent: "center",
                alignItems: "flex-end",
              }}
            >
              <Icon name="close" size={25} style={styles.closeIcon} />
            </TouchableOpacity>
            <View style={{ height: Dimensions.get("screen").width * 0.15 }} />
            <TouchableOpacity onPress={() => dashboardScreen()}>
              <View style={[styles.selectedModuleContainer]}>
                <View style={styles.eachModulesContainer}>
                  <Icon name="home" size={15} style={styles.moduleIcon} />
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight:
                        route.name === "DashboardScreen"
                          ? Platform.OS === "android"
                            ? "600"
                            : "500"
                          : Platform.OS === "android"
                          ? "400"
                          : "300",
                      marginLeft: Dimensions.get("screen").width * 0.045,
                      fontFamily: fontsRegular(props),
                      color: colors.staticTextColor,
                    }}
                  >
                    Dashboard
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
            <FlatList
              data={menuItems}
              renderItem={renderMenuModules}
              keyExtractor={(item, index) => index.toString()}
              contentContainerStyle={styles.moduleListContainer}
              style={styles.menuFlatList}
              extraData={openSubModules}
            />
          </View>
          <TouchableWithoutFeedback onPress={hideSideMenu}>
            <View style={styles.closeOnOuterViewMenu} />
          </TouchableWithoutFeedback>
        </View>
      </Modal>

      <Modal animationType={"fade"} transparent={true} visible={flatModal}>
        <TouchableOpacity
          style={{ flex: 1, flexDirection: "row" }}
          onPress={closeListItems}
        >
          <View style={{ height: "100%", width: "50%" }}></View>
        </TouchableOpacity>
      </Modal>

      {/* Log Out Menu  */}

      <Modal animationType="fade" transparent={true} visible={logout}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#000000",
            opacity: Platform.OS == "ios" ? 1 : 0.9,
          }}
        >
          <View
            style={{
              height: 150,
              width: "95%",
              backgroundColor: colors.staticIconGrayColor,
              opacity: 1,
              shadowOpacity: 0.5,
              borderRadius: 10,
            }}
          >
            <View
              style={{
                height: "40%",
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: colors.staticIconGrayColor,
                borderRadius: 5,
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  color: colors.staticTextColor,
                  fontWeight: "400",
                  fontFamily: fontsRegular(props),
                }}
              >
                Are you sure you want to logout ?
              </Text>
            </View>
            <View
              style={{
                height: "60%",
                borderRadius: 5,
                width: "100%",
                flexDirection: "row",
                backgroundColor: colors.staticIconGrayColor,
              }}
            >
              <View
                style={{
                  height: "100%",
                  width: "50%",
                  justifyContent: "center",
                  alignItems: "center",
                  // backgroundColor: colors.staticWhiteColor
                }}
              >
                <TouchableOpacity
                  style={{
                    height: 40,
                    width: 120,
                    // backgroundColor: "red",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 10,
                  }}
                  onPress={() => {
                    logoutFromSession();
                  }}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      color: colors.textColor,
                      fontWeight: "700",
                      fontFamily: fontsRegular(props),
                    }}
                  >
                    Yes
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  height: "100%",
                  width: "50%",
                  justifyContent: "center",
                  alignItems: "center",
                  // backgroundColor: colors.staticWhiteColor
                }}
              >
                <TouchableOpacity
                  style={{
                    height: 40,
                    width: 120,
                    // backgroundColor: "gray",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 10,
                  }}
                  onPress={() => {
                    hideLogoutMenu();
                  }}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      color: primaryColor(props),
                      fontWeight: "700",
                      fontFamily: fontsRegular(props),
                    }}
                  >
                    No
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
      {/* User Profile Menu  */}
      <Modal animationType="fade" transparent={true} visible={userProfile}>
        <View style={{ flex: 1 }}>
          <TouchableWithoutFeedback onPress={hideUserProfileMenu}>
            <View style={{ flexDirection: "row", height: 250, width: "100%" }}>
              {/* <View style={{ height: "100%", width: "57%" }}></View> */}
              <View
                style={{
                  height: "50%",
                  width: "40%",
                  backgroundColor: colors.staticWhiteColor,
                  borderColor: colors.staticBlackColor,
                  borderWidth: 1,
                  marginLeft: "3%",
                  marginTop: Platform.OS === "android" ? "11.5%" : "24%",
                  shadowOpacity: 0.5,
                  borderRadius: 7,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <TouchableOpacity
                  style={{
                    height: 30,
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                    flex: 1,
                    flexDirection: "row",
                    marginLeft: 20,
                    marginRight: 20,
                  }}
                  onPress={userProfileNav}
                >
                  <Icon
                    name="person"
                    size={20}
                    style={{ width: "20%" }}
                    color={colors.grayToWhite}
                  />
                  <Text
                    style={{
                      fontFamily: fontsRegular(props),
                      width: "70%",
                      marginRight: "5%",
                      color: colors.staticTextColor,
                      fontSize: 15,
                    }}
                  >
                    My Profile
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    height: 30,
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                    flex: 1,
                    flexDirection: "row",
                    marginLeft: 20,
                    marginRight: 20,
                  }}
                  onPress={() => sidePasswordMenu()}
                >
                  <Icon
                    name="autorenew"
                    size={20}
                    style={{ width: "20%" }}
                    color={colors.grayToWhite}
                  />
                  <Text
                    style={{
                      fontFamily: fontsRegular(props),
                      width: "70%",
                      marginRight: "5%",
                      color: colors.staticTextColor,
                      fontSize: 15,
                    }}
                  >
                    Change Password
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    height: 30,
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                    flex: 1,
                    flexDirection: "row",
                    marginLeft: 20,
                    marginRight: 20,
                  }}
                  onPress={() => {
                    showLogoutMenu();
                  }}
                >
                  <Icon
                    name="power-settings-new"
                    size={20}
                    style={{ width: "20%" }}
                    color={colors.grayToWhite}
                  />
                  <Text
                    style={{
                      fontFamily: fontsRegular(props),
                      width: "70%",
                      marginRight: "5%",
                      color: colors.staticTextColor,
                      fontSize: 15,
                    }}
                  >
                    Log Out
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={hideUserProfileMenu}>
            <View style={styles.closeOnOuterViewMenu} />
          </TouchableWithoutFeedback>
        </View>
      </Modal>
      {/*change password bottom screen start */}

      {/* <Toast
                ref={(toast) => this.toast = toast}
                style={{backgroundColor:'white'}}
                position='top'
                positionValue={200}
                fadeInDuration={750}
                fadeOutDuration={1000}
                opacity={0.8}
                textStyle={styles.textcolor}
            /> */}

      <BottomSheet
        visible={passwordMenu}
        onBackButtonPress={sidePasswordmenuclose}
        onBackdropPress={sidePasswordmenuclose}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "position" : "height"}
          keyboardVerticalOffset={Platform.OS == "ios" ? -20 : -300}
          enabled
        >
          {/*Bottom Sheet inner View*/}
          <View style={styles.bottomNavigationView}>
            <View
              style={{
                flex: 1,
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  textAlign: "left",
                  padding: 20,
                  fontSize: 16,
                  color: colors.staticTextColor,
                  fontFamily: fontsRegular(props),
                }}
              >
                Change Password
              </Text>
              <View style={{ flex: 1, flexDirection: "column" }}>
                <TextInput
                  label="Current Password"
                  mode="outlined"
                  secureTextEntry={passwordVisible}
                  theme={{
                    colors: {
                      text: colors.staticTextColor,
                      primary: primaryColor(props),
                      underlineColor: colors.transparentColor,
                      placeholder: colors.staticTextColor,
                    },
                    fonts: { regular: { fontFamily: fontsRegular(props) } },
                  }}
                  defaultValue={currentPassword}
                  editable={true}
                  style={{
                    backgroundColor: colors.staticProfileDisableShowColor,
                    marginLeft: 20,
                    marginRight: 20,
                    marginBottom: 10,
                    fontSize: 14,
                  }}
                  onChangeText={(currentPassword) =>
                    setcurrentPassword(currentPassword)
                  }
                  right={
                    <TextInput.Icon
                      name={passwordVisible ? "eye" : "eye-off"}
                      color={colors.grayToWhite}
                      onPress={() => setPasswordVisible(!passwordVisible)}
                    />
                  }
                />

                {passwordErrorMessage.length > 0 && (
                  <Text
                    style={[
                      styles.textDanger,
                      { fontFamily: fontsRegular(props) },
                    ]}
                  >
                    {passwordErrorMessage}
                  </Text>
                )}

                <TextInput
                  label="New Password"
                  mode="outlined"
                  secureTextEntry={newpasswordVisible}
                  defaultValue={newPassword}
                  editable={true}
                  style={{
                    backgroundColor: colors.staticProfileDisableShowColor,
                    marginLeft: 20,
                    marginRight: 20,
                    marginBottom: 10,
                    fontSize: 14,
                  }}
                  theme={{
                    colors: {
                      text: colors.staticTextColor,
                      primary: primaryColor(props),
                      underlineColor: colors.transparentColor,
                      placeholder: colors.staticTextColor,
                    },
                    fonts: { regular: { fontFamily: fontsRegular(props) } },
                  }}
                  onChangeText={(newPassword) => setnewPassword(newPassword)}
                  right={
                    <TextInput.Icon
                      name={newpasswordVisible ? "eye" : "eye-off"}
                      color={colors.grayToWhite}
                      onPress={() => setnewPasswordVisible(!newpasswordVisible)}
                    />
                  }
                />

                {confirmPasswordErrorMessage.length > 0 && (
                  <Text
                    style={[
                      styles.textDanger,
                      { fontFamily: fontsRegular(props) },
                    ]}
                  >
                    {confirmPasswordErrorMessage}
                  </Text>
                )}

                <View
                  style={{ marginBottom: 15, height: 32, marginHorizontal: 10 }}
                >
                  <TouchableOpacity
                    onPress={closedbottommenu}
                    style={{
                      height: 35,
                      width: "95%",
                      borderColor: primaryColor(props),
                      borderWidth: 1,
                      marginTop: 10,
                      justifyContent: "center",
                      alignItems: "center",
                      alignSelf: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: "400",
                        color: primaryColor(props),
                        fontFamily: fontsRegular(props),
                      }}
                    >
                      CANCEL
                    </Text>
                  </TouchableOpacity>
                </View>

                <View
                  style={{ marginBottom: 15, height: 32, marginHorizontal: 10 }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      formValidation();
                    }}
                    style={{
                      height: 35,
                      width: "95%",
                      backgroundColor: primaryColor(props),
                      marginTop: 10,
                      justifyContent: "center",
                      alignItems: "center",
                      alignSelf: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: "400",
                        color: colors.staticTextColor,
                        fontFamily: fontsRegular(props),
                      }}
                    >
                      SAVE PASSWORD
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </BottomSheet>
      {/*change password bottom screen end */}
    </SafeAreaView>
  );
};

export default HeaderComponent

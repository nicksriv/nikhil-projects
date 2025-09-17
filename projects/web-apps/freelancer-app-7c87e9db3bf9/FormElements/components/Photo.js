import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  TouchableOpacity,
  PermissionsAndroid,
  Alert,
  Platform,
  Image,
  View,
  Modal,
  ImageBackground,
} from "react-native";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import Icon from "react-native-vector-icons/MaterialIcons";
import { colors, primaryColor } from "../themes/color"; // Dynamic Themes
import { fontsRegular, fontsBold } from "../assets/fonts/fonts";
import { RA } from "../assets/fontSize/fontSize";
import envConfig from "../api/env";
import Toast from "react-native-simple-toast";
import { PERMISSIONS, request } from "react-native-permissions";
import ImagePicker from "react-native-image-crop-picker";
import { RNCamera } from "react-native-camera";
import Permissions from "react-native-permissions";
import { Button } from "react-native-paper";
import { useSelector } from "react-redux";
import { asyncStorage } from "@app/store/asyncStorage";

var uri = "";
const Photo = (props) => {
  const isEditable = useSelector(
    (state) => state.dynamicModule.tablelist.rowDetails.editable
  );
  const { data, themeData, changedValues } = props;

  const [showDummyImage, setShowDummyImage] = useState(true);
  const [resourcePath, setResourcePath] = useState("");
  const [imagesetview, setimageview] = useState(false);
  const [isPhotoAvail, setisPhotoAvail] = useState(false);
  const [isPhotoUpload, setisPhotoUpload] = useState(false);
  const [camerafacing, setCameraFacing] = useState(false);
  const [camerafacingboth, setCameraFacingboth] = useState(false);

  const [shouldShow, setShouldShow] = useState(false);
  const [type, setType] = useState(RNCamera.Constants.Type.back);

  const ClientLogo = envConfig.ClientLogo;

  let cameraRef = useRef(null);


  useEffect(() => {
    if (data.customOptions.required) {
      if (data.value != undefined) {
        getphotoset(data.value);
      } else {
        changedValues("", data.id, false);
      }
    } else {
      if (data.value != undefined) {
        getphotoset(data.value);
      } else {
        changedValues("", data.id, true);
      }
    }
  }, []);


  useEffect(() => {
    if (data.customOptions.isPhotoAvail) {
      setisPhotoAvail(true);
    }

    if (data.customOptions.cameraFacingOptions == "both") {
      setCameraFacingboth(true);
    }


    if (data.customOptions.isPhotoUpload) {
      setisPhotoUpload(true);
    }
  }, [
    data.customOptions.isPhotoAvail,
    data.customOptions.isPhotoUpload,
    data.customOptions.cameraFacingOptions,
    camerafacing,
  ]);

  //RN Camera implement start
  useEffect(() => {
    Permissions.check("photo").then((response) => {
      // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
    });
  }, []);

  const takePicture = async () => {
    if (cameraRef) {
      const options = { quality: 0.5, base64: true };
      const data = await cameraRef.current.takePictureAsync(options);
      // setShouldShow(false);
      const imagePath = data.uri;
      var extfilename = imagePath.substring(imagePath.lastIndexOf("/") + 1);
      console.log("pathhhhh", extfilename);
      setShowDummyImage(false);
      setShouldShow(false);

      if (Platform.OS == "ios") {
        var formData = new FormData();
        formData.append("file", {
          uri: `data:image/gif;base64,${data.base64}`,
          type: "multipart/form-data",
          name: extfilename,
        });
        setResourcePath(data.uri);
        fileuploadAPI(formData, data.uri, "cameraa");
      } else {
        var formData = new FormData();
        formData.append("file", {
          uri: data.uri,
          type: "multipart/form-data",
          name: extfilename,
        });
        setResourcePath(data.uri);
        fileuploadAPI(formData, data.uri, "cameraa");
      }
    }
  };
  //RN Camera implement end

  const getphotoset = (id) => {
    return fetch(envConfig.ClientLogo + "api/v1/files/" + `${id}`, {
      headers: {
        "Content-type": "application/json",
        Authorization: global.authToken,
      },
    })
      .then((response) => {
        console.log("setimageinphoto ===> ", response.url);
        setResourcePath(response.url);
        changedValues(id, data?.id, true);
        setShowDummyImage(false);
        setimageview(true);
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

  const requestCameraPermission = async () => {
    if (Platform.OS === "android") {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          ""
        );
        // If CAMERA Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else return true;
  };
  const requestExternalWritePermission = async () => {
    if (Platform.OS === "android") {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          ""
        );
        // If WRITE_EXTERNAL_STORAGE Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        alert("Write permission err", err);
      }
      return false;
    } else return true;
  };
  const selectPhototype = () => {
    if (!data.customOptions.isPhotoAvail && !data.customOptions.isPhotoUpload) {
      console.log("iscustomavailtrue");
      Alert.alert("No Camera & No Gallery options enable", "", [
        {
          text: "OK",
        },
      ]);
    }

    if (data.customOptions.isPhotoAvail && !data.customOptions.isPhotoUpload) {
      Alert.alert(
        "Take Picture",
        "Take a new photo or select from your photo library",
        [
          {
            text: "Camera",
            style: "cancel",
            onPress: () => captureImageByCamera("photo"),
          },
          {
            text: "Cancel",
            style: "cancel",
            onPress: () => setShouldShow(false),
          },
        ]
      );
    }

    if (data.customOptions.isPhotoUpload && !data.customOptions.isPhotoAvail) {
      Alert.alert(
        "Take Picture",
        "Take a new photo or select from your photo library",
        [
          {
            text: "Gallery",
            onPress: () => captureImageByGallery("photo"),
          },
          {
            text: "Cancel",
            style: "cancel",
            onPress: () => setShouldShow(false),
          },
        ]
      );
    }

    if (data.customOptions.isPhotoAvail && data.customOptions.isPhotoUpload) {
      Alert.alert(
        "Take Picture",
        "Take a new photo or select from your photo library",
        [
          {
            text: "Camera",
            style: "cancel",
            onPress: () => captureImageByCamera("photo"),
          },
          {
            text: "Gallery",
            onPress: () => captureImageByGallery("photo"),
          },
        ]
      );
    }
  };

  const selectCameraPhototype = () => {
    Alert.alert(
      "Take Picture",
      "Take a new photo or select from your photo library",
      [
        {
          text: "Camera",
          style: "cancel",
          onPress: () => captureImageByCamera("photo"),
        },
        {
          text: "Cancel",
          style: "cancel",
          onPress: () => setShouldShow(false),
        },
      ]
    );
  };

  const selectGalleryPhototype = () => {
    Alert.alert(
      "Take Picture",
      "Take a new photo or select from your photo library",
      [
        {
          text: "Gallery",
          onPress: () => captureImageByGallery("photo"),
        },
        {
          text: "Cancel",
          style: "cancel",
          onPress: () => setShouldShow(false),
        },
      ]
    );
  };

  //profile image upload API start
  const fileuploadAPI = async (formData, imagePath, uri) => {
    const token = await asyncStorage.getToken()
    fetch(ClientLogo + "api/v1/files/upload?fileType=IMAGE", {
      method: "PUT",
      body: formData,
      headers: {
        Authorization: token,
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        //resStatus = response.status;
        return response.json();
      })
      .then((res) => {
        console.log("upload succes", JSON.stringify(res));
        Toast.show(res.message, Toast.SHORT);
        // setResourcePath(imagePath);
        changedValues(res?.id, data.id, true);
      })
      .catch((error) => {
        console.log("upload error", error);
      });
  };
  //profile image upload API end

  const captureImageByCamera = async (type) => {
    // if (camerafacingboth) {

    //   let options = {
    //     mediaType: type,
    //     maxWidth: 500,
    //     maxHeight: 500,
    //     quality: 1,
    //     videoQuality: "low",
    //     durationLimit: 30, //Video max duration in seconds
    //     saveToPhotos: true,
    //   };
    //   let isCameraPermitted = await requestCameraPermission();
    //   let isStoragePermitted = await requestExternalWritePermission();
    //   if (isCameraPermitted && isStoragePermitted) {
    //     launchCamera(options, (response) => {
    //       if (response.didCancel) {
    //         // alert("User cancelled camera picker");
    //         return;
    //       } else if (response.errorCode == "camera_unavailable") {
    //         alert("Camera not available on device");
    //         return;
    //       } else if (response.errorCode == "permission") {
    //         alert("Permission not satisfied");
    //         return;
    //       } else if (response.errorCode == "others") {
    //         alert(response.errorMessage);
    //         return;
    //       }
    //       console.log("pathhhhhh", response.assets[0].uri);
    //       setShowDummyImage(false);

    //       const imagesetpath = response.assets[0];

    //       const imagePathuri = response.assets[0].uri;

    //       var extfilename = imagePathuri.substring(
    //         imagePathuri.lastIndexOf("/") + 1
    //       );
    //       console.log("pathhhhh", extfilename);
    //       console.log("pathhhhhuriii", response.assets[0].uri);
    //       var formData = new FormData();
    //       formData.append("file", {
    //         uri: imagePathuri,
    //         type: "multipart/form-data",
    //         name: extfilename,
    //       });

    //       console.log("formdataaaaa" + JSON.stringify(formData));

    //       setResourcePath(imagePathuri);
    //       fileuploadAPI(formData, imagesetpath, imagePathuri);
    //     });
    //   }
    // } else {
    setShouldShow(true);

    // }
  };

  // //camera upload start
  // const handleLaunchCamera = () => {
  //   // setCameraFacing(false);

  //   console.log("launchedcameraaaa");
  //   if (Platform.OS === "android") {
  //     request(PERMISSIONS.ANDROID.CAMERA).then(
  //       (fulfilled) => {
  //         if (fulfilled === "granted") {
  //           console.log("camerafacingcamerafacingcamerafacing", camerafacing);
  //           ImagePicker.openCamera({
  //             width: 390,
  //             height: 325,
  //             cropping: true,
  //             mediaType: "photo",
  //             quality: 1,
  //           })
  //             .then(async (response) => {
  //               try {
  //                 const imagePath = response.path;
  //                 var extfilename = imagePath.substring(
  //                   imagePath.lastIndexOf("/") + 1
  //                 );

  //                 console.log("responsecameraaaaresponseeee", response);
  //                 console.log("imagePath", imagePath);

  //                 console.log("pathhhhh", extfilename);
  //                 var formData = new FormData();
  //                 formData.append("file", {
  //                   uri: imagePath,
  //                   type: "multipart/form-data",
  //                   name: extfilename,
  //                 });

  //                 console.log("formdataaaaa" + JSON.stringify(formData));

  //                 // setImageUrl(imagePath);
  //                 fileuploadAPI(formData, imagePath, "");
  //               } catch (error) {
  //                 throw error;
  //               } finally {
  //                 console.log("finally");
  //               }
  //             })
  //             .catch((error) => {});
  //         } else if (fulfilled === "blocked") {
  //           handlePhotosCameraPermissionAlert();
  //         }
  //       },
  //       (rejected) => {}
  //     );
  //   } else {
  //     request(PERMISSIONS.IOS.CAMERA).then(
  //       (fulfilled) => {
  //         if (fulfilled === "granted" || fulfilled === "limited") {
  //           ImagePicker.openCamera({
  //             width: 390,
  //             height: 325,
  //             cropping: true,
  //             mediaType: "photo",
  //             quality: 1,
  //           })
  //             .then(async (response) => {
  //               try {
  //                 const imagePath = response.path;
  //                 var extfilename = imagePath.substring(
  //                   imagePath.lastIndexOf("/") + 1
  //                 );
  //                 console.log("pathhhhh", extfilename);
  //                 var formData = new FormData();
  //                 formData.append("file", {
  //                   uri: imagePath,
  //                   type: "multipart/form-data",
  //                   name: extfilename,
  //                 });

  //                 console.log("formdataaaaa" + JSON.stringify(formData));

  //                 // setNewFormData(formData);
  //                 // setNewImagePath(imagePath);
  //                 // setImageUrl(imagePath);
  //                 fileuploadAPI(formData, imagePath, "");
  //               } catch (error) {
  //                 throw error;
  //               } finally {
  //                 console.log("finallly");
  //               }
  //             })
  //             .catch((error) => {});
  //         } else {
  //           handlePhotosCameraPermissionAlert();
  //         }
  //       },
  //       (rejected) => {}
  //     );
  //   }
  // };
  // //camera upload end

  //Delete
  const deletePhoto = () => {
    setShowDummyImage(true);
    setResourcePath("");
    if (data.customOptions.required) {
      changedValues("", data.id, false);
    }
  };
  const captureImageByGallery = async (type) => {
    let options = {
      mediaType: type,
      maxWidth: 500,
      maxHeight: 500,
      quality: 1,
      videoQuality: "low",
      durationLimit: 30, //Video max duration in seconds
      saveToPhotos: true,
    };
    let isCameraPermitted = await requestCameraPermission();
    let isStoragePermitted = await requestExternalWritePermission();
    if (isCameraPermitted && isStoragePermitted) {
      launchImageLibrary(options, async (response) => {
        console.log("Response 11111 = ", response);
        if (response.didCancel) {
          //alert("User cancelled camera picker");
          return;
        } else if (response.errorCode == "camera_unavailable") {
          //alert("Camera not available on device");
          return;
        } else if (response.errorCode == "permission") {
          /// alert("Permission not satisfied");
          return;
        } else if (response.errorCode == "others") {
          return;
        }
        setShowDummyImage(false);

        const imagesetpath = response.assets[0];

        const imagePathuri = response.assets[0].uri;

        var extfilename = imagePathuri.substring(
          imagePathuri.lastIndexOf("/") + 1
        );
        console.log("pathhhhh", extfilename);
        console.log("imagesetpath", imagesetpath);
        console.log("imagePathuri", imagePathuri);
        var formData = new FormData();
        formData.append("file", {
          uri: imagePathuri,
          type: "multipart/form-data",
          name: extfilename,
        });

        console.log("formdataaaaa" + JSON.stringify(formData));

        setResourcePath(imagePathuri);

       await fileuploadAPI(formData, imagesetpath, imagePathuri);
      });
    }
  };

  const clickfront = (type) => {
    console.log("clickedddddtype", type);
  };

  return (
    <View>
      <View style={{ flexDirection: "row" }}>
        <Text
          style={{
            marginTop: RA(10),
            marginLeft: RA(10),
            fontFamily: fontsRegular(themeData),
            color: colors.staticTextColor,
          }}
        >
          {data?.label}
        </Text>
        {data.customOptions?.required ? (
          <Text
            style={{
              color: colors.staticRedColor,
              marginLeft: RA(5),
              marginTop: RA(10),
              fontFamily: fontsRegular(themeData),
            }}
          >
            *
          </Text>
        ) : null}
      </View>

      {isPhotoAvail && !isPhotoUpload ? (
        <View
          style={{
            width: "95%",
            height: RA(200),
            borderWidth: 1,
            borderRadius: 10,
            flexDirection: "row",
            borderColor: primaryColor(themeData),
            borderStyle: "dashed",
            // shadowOpacity: 1,
            shadowColor: "gray",
            marginTop: RA(10),
            marginLeft: RA(10),
          }}
        >
          {showDummyImage == true ? (
            <TouchableOpacity
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 10,
                opacity: 0.6,
                backgroundColor: primaryColor(themeData),
                justifyContent: "center",
              }}
              onPress={selectPhototype}
            >
              <View>
                <Icon
                  name="photo-camera"
                  size={25}
                  style={{ alignSelf: "center" }}
                />
                <Text
                  style={{
                    fontSize: RA(12),
                    textAlign: "center",
                    fontWeight: "600",
                    fontFamily: fontsRegular(themeData),
                    color: colors.staticTextColor,
                  }}
                >
                  CAPTURE SELFIE
                </Text>
              </View>
            </TouchableOpacity>
          ) : (
            <View
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 10,
                backgroundColor: primaryColor(themeData),
                justifyContent: "center",
              }}
            >
              <ImageBackground
                style={{
                  width: "100%",
                  height: "100%",
                  overflow: "hidden",
                  borderRadius: 5,
                }}
                // source={{ uri: imagesetview ? resourcePath : resourcePath.uri }}
                source={{ uri: resourcePath }}
                imageStyle={{
                  resizeMode: "contain", // works only here!
                }}
              >
                {isEditable != undefined ? isEditable : true ? (
                  <TouchableOpacity
                    onPress={() => {
                      deletePhoto();
                    }}
                  >
                    <Icon
                      name="delete"
                      color="#ececf3"
                      size={25}
                      style={{ marginLeft: 320, marginTop: 10 }}
                    />
                  </TouchableOpacity>
                ) : null}
              </ImageBackground>
            </View>
          )}
        </View>
      ) : null}

      {isPhotoUpload && !isPhotoAvail ? (
        <View
          style={{
            width: "95%",
            height: RA(200),
            borderWidth: 1,
            borderRadius: 10,
            flexDirection: "row",
            borderColor: primaryColor(themeData),
            borderStyle: "dashed",
            // shadowOpacity: 1,
            shadowColor: "gray",
            marginTop: RA(10),
            marginLeft: RA(10),
          }}
        >
          {showDummyImage == true ? (
            <TouchableOpacity
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 10,
                opacity: 0.6,
                backgroundColor: primaryColor(themeData),
                justifyContent: "center",
              }}
              disabled={isEditable != undefined ? !isEditable : false}
              onPress={selectPhototype}
            >
              <View>
                <Icon name="photo" size={25} style={{ alignSelf: "center" }} />
                <Text
                  style={{
                    fontSize: RA(12),
                    textAlign: "center",
                    fontWeight: "600",
                    fontFamily: fontsRegular(themeData),
                    color: colors.staticTextColor,
                  }}
                >
                  GALLERY
                </Text>
              </View>
            </TouchableOpacity>
          ) : (
            <View
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 10,
                backgroundColor: primaryColor(themeData),
                justifyContent: "center",
              }}
            >
              <ImageBackground
                style={{
                  width: "100%",
                  height: "100%",
                  overflow: "hidden",
                  borderRadius: 5,
                }}
                // source={{ uri: imagesetview ? resourcePath : resourcePath.uri }}
                source={{ uri: resourcePath }}
                imageStyle={{
                  resizeMode: "contain", // works only here!
                }}
              >
                {isEditable != undefined ? isEditable : true ? (
                  <TouchableOpacity
                    onPress={() => {
                      deletePhoto();
                    }}
                  >
                    <Icon
                      name="delete"
                      color="#ececf3"
                      size={25}
                      style={{ marginLeft: 320, marginTop: 10 }}
                    />
                  </TouchableOpacity>
                ) : null}
              </ImageBackground>
            </View>
          )}
        </View>
      ) : null}

      {isPhotoUpload && isPhotoAvail ? (
        <View
          style={{
            width: "95%",
            height: RA(200),
            borderWidth: 1,
            borderRadius: 10,
            flexDirection: "row",
            borderColor: primaryColor(themeData),
            borderStyle: "dashed",
            // shadowOpacity: 1,
            shadowColor: "gray",
            marginTop: RA(10),
            marginLeft: RA(10),
          }}
        >
          {showDummyImage == true ? (
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                style={{
                  width: "50%",
                  height: "100%",
                  opacity: 0.6,
                  backgroundColor: primaryColor(themeData),
                  justifyContent: "center",
                }}
                disabled={isEditable != undefined ? !isEditable : false}
                // onPress={selectPhototype}
                onPress={selectCameraPhototype}
              >
                <View>
                  <Icon
                    name="photo"
                    size={25}
                    style={{ alignSelf: "center" }}
                  />
                  <Text
                    style={{
                      fontSize: RA(12),
                      textAlign: "center",
                      fontWeight: "600",
                      fontFamily: fontsRegular(themeData),
                      color: colors.staticTextColor,
                    }}
                  >
                    CAMERA
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  width: "50%",
                  height: "100%",
                  opacity: 0.6,
                  backgroundColor: primaryColor(themeData),
                  justifyContent: "center",
                }}
                disabled={isEditable != undefined ? !isEditable : false}
                // onPress={selectPhototype}
                onPress={selectGalleryPhototype}
              >
                <View>
                  <Icon
                    name="photo"
                    size={25}
                    style={{ alignSelf: "center" }}
                  />
                  <Text
                    style={{
                      fontSize: RA(12),
                      textAlign: "center",
                      fontWeight: "600",
                      fontFamily: fontsRegular(themeData),
                      color: colors.staticTextColor,
                    }}
                  >
                    GALLERY
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          ) : (
            <View
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 10,
                backgroundColor: primaryColor(themeData),
                justifyContent: "center",
              }}
            >
              <ImageBackground
                style={{
                  width: "100%",
                  height: "100%",
                  overflow: "hidden",
                  borderRadius: 5,
                }}
                // source={{ uri: imagesetview ? resourcePath : resourcePath.uri }}
                source={{ uri: resourcePath }}
                imageStyle={{
                  resizeMode: "contain", // works only here!
                }}
              >
                {isEditable != undefined ? isEditable : true ? (
                  <TouchableOpacity
                    onPress={() => {
                      deletePhoto();
                    }}
                  >
                    <Icon
                      name="delete"
                      color="#ececf3"
                      size={25}
                      style={{ marginLeft: "90%", marginTop: 10 }}
                    />
                  </TouchableOpacity>
                ) : null}
              </ImageBackground>
            </View>
          )}
        </View>
      ) : null}

      {camerafacingboth ? (
        <Modal animationType="fade" transparent={false} visible={shouldShow}>
          <RNCamera
            ref={cameraRef}
            style={{
              flex: 1,
              justifyContent: "flex-end",
              alignItems: "center",
            }}
            type={type}
            //  flashMode={RNCamera.Constants.FlashMode.on}
          />

          <View
            style={{ flex: 0, flexDirection: "row", justifyContent: "center" }}
          >
            <TouchableOpacity
              onPress={takePicture}
              style={{
                flex: 0,
                backgroundColor: "#fff",
                borderRadius: 5,
                padding: 15,
                paddingHorizontal: 20,
                alignSelf: "center",
                margin: 10,
              }}
            >
              <Button
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  backgroundColor: colors.staticPrimaryColor,
                }}
              >
                {" "}
                CAPTURE{" "}
              </Button>
            </TouchableOpacity>
          </View>

          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 1 }}>
              <TouchableOpacity
                onPress={() => {
                  setType(
                    type === RNCamera.Constants.Type.back
                      ? RNCamera.Constants.Type.front
                      : RNCamera.Constants.Type.back
                  );
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    margin: 10,
                    fontWeight: "bold",
                    color: colors.staticPrimaryColor,
                  }}
                >
                  {" "}
                  Flip{" "}
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={() => {
                setShouldShow(false);
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  margin: 10,
                  fontWeight: "bold",
                  color: colors.staticPrimaryColor,
                  alignItems: "flex-end",
                  justifyContent: "flex-end",
                }}
              >
                {" "}
                Close{" "}
              </Text>
            </TouchableOpacity>
          </View>
        </Modal>
      ) : (
        <Modal animationType="fade" transparent={false} visible={shouldShow}>
          <RNCamera
            ref={cameraRef}
            style={{
              flex: 1,
              justifyContent: "flex-end",
              alignItems: "center",
            }}
            type={
              data.customOptions.cameraFacingOptions == "front"
                ? RNCamera.Constants.Type.front
                : RNCamera.Constants.Type.back
            }
            //  flashMode={RNCamera.Constants.FlashMode.on}
          />

          <View
            style={{ flex: 0, flexDirection: "row", justifyContent: "center" }}
          >
            <TouchableOpacity
              onPress={takePicture}
              style={{
                flex: 0,
                backgroundColor: "#fff",
                borderRadius: 5,
                padding: 15,
                paddingHorizontal: 20,
                alignSelf: "center",
                margin: 20,
              }}
            >
              <Button
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  backgroundColor: colors.staticPrimaryColor,
                }}
              >
                {" "}
                CAPTURE
              </Button>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={() => {
              setShouldShow(false);
            }}
          >
            <Text
              style={{
                fontSize: 16,
                margin: 10,
                fontWeight: "bold",
                color: colors.staticPrimaryColor,
                alignItems: "flex-end",
                justifyContent: "flex-end",
              }}
            >
              {" "}
              Close{" "}
            </Text>
          </TouchableOpacity>
        </Modal>
      )}
    </View>
  );
};
export default Photo;

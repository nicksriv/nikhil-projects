import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Text,
  TouchableOpacity,
  PermissionsAndroid,
  Alert,
  Platform,
  View,
  StyleSheet,
  ImageBackground,
  Linking,
  Button,
} from "react-native";
import Video from "react-native-video";
import MediaControls, { PLAYER_STATES } from "react-native-media-controls";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import Icon from "react-native-vector-icons/MaterialIcons";
import { colors, primaryColor } from "../themes/color";
import { fontsRegular, fontsBold } from "../assets/fonts/fonts";
import { RA } from "../assets/fontSize/fontSize";
import envConfig from "../api/env";
import Toast from "react-native-simple-toast";
import MovToMp4 from "react-native-mov-to-mp4";
import { useSelector } from "react-redux";
import { asyncStorage } from "@app/store/asyncStorage";

var uri = "";
const VideoScreen = (props) => {
  const isEditable = useSelector(
    (state) => state.dynamicModule.tablelist.rowDetails.editable
  );

  const { data, themeData, changedValues } = props;

  const [showDummyImage, setShowDummyImage] = useState(true);
  const [resourcePath, setResourcePath] = useState("");
  const videoPlayer = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [paused, setPaused] = useState(false);
  const [playerState, setPlayerState] = useState(PLAYER_STATES.PLAYING);
  const [screenType, setScreenType] = useState("content");
  const [imageDelete, setImagedelete] = useState(false);
  const [isVideoLink, setisVideoLink] = useState(false);

  const ClientLogo = envConfig.ClientLogo;

  useEffect(() => {
    if (data.customOptions.required) {
      if (data.value != undefined && data.value != "") {
        getphotoset(data.value);
      } else if (
        data?.customOptions?.defaultValue != "" &&
        data?.customOptions?.defaultValue != undefined
      ) {
        getphotoset(data?.customOptions?.defaultValue);
      } else {
        changedValues("", data.id, false);
      }
    } else {
      if (data.value != undefined) {
        getphotoset(data.value);
      } else if (
        data?.customOptions?.defaultValue != "" &&
        data?.customOptions?.defaultValue != undefined
      ) {
        getphotoset(data?.customOptions?.defaultValue);
      } else {
        changedValues("", data.id, true);
      }
    }
    if (data.customOptions.isVideoLink) {
      changedValues("", data.id, true);
      setisVideoLink(true);
    }
  }, []);

  const getphotoset = (id) => {
    return fetch(envConfig.ClientLogo + "api/v1/files/" + `${id}`, {
      headers: {
        "Content-type": "application/json",
        Authorization: global.authToken,
      },
    })
      .then((response) => {
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

  const onSeek = (seek) => {
    //Handler for change in seekbar
    videoPlayer.current.seek(seek);
  };
  const onPaused = (playerState) => {
    //Handler for Video Pause
    setPaused(!paused);
    setPlayerState(playerState);
  };
  const onReplay = () => {
    //Handler for Replay
    setPlayerState(PLAYER_STATES.PLAYING);
    videoPlayer.current.seek(0);
  };
  const onProgress = (data) => {
    // Video Player will progress continue even if it ends
    if (!isLoading && playerState !== PLAYER_STATES.ENDED) {
      setCurrentTime(data.currentTime);
    }
  };
  const onLoad = (data) => {
    setDuration(data.duration);
    setIsLoading(false);
  };
  const onLoadStart = (data) => setIsLoading(true);
  const onEnd = () => setPlayerState(PLAYER_STATES.ENDED);
  const onError = () => alert("Oh! ", error);
  const exitFullScreen = () => {
    alert("Exit full screen");
  };
  const enterFullScreen = () => {};
  const onFullScreen = () => {
    setIsFullScreen(isFullScreen);
    if (screenType == "content") setScreenType("cover");
    else setScreenType("content");
  };
  const renderToolbar = () => (
    <View>
      <Text style={styles.toolbar}> toolbar </Text>
    </View>
  );
  const onSeeking = (currentTime) => setCurrentTime(currentTime);
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
    if (!data.customOptions.isVideoAvail && !data.customOptions.isVideoUpload) {
      console.log("iscustomavailtrue");
      Alert.alert("No Camera video & No Gallery video options enable", "", [
        {
          text: "OK",
        },
      ]);
    }

    if (data.customOptions.isVideoAvail && !data.customOptions.isVideoUpload) {
      console.log("iscustomavailtrue");
      Alert.alert(
        "Take Video",
        "Take a new video or select from your video library",
        [
          {
            text: "Camera",
            style: "cancel",
            onPress: () => captureImageByCamera("video"),
          },
        ]
      );
    }

    if (data.customOptions.isVideoUpload && !data.customOptions.isVideoAvail) {
      console.log("isVideoUploadtrue");
      Alert.alert(
        "Take Video",
        "Take a new video or select from your video library",
        [
          {
            text: "Gallery",
            onPress: () => captureImageByGallery("video"),
          },
        ]
      );
    }

    if (data.customOptions.isVideoAvail && data.customOptions.isVideoUpload) {
      console.log("isVideoAvailisVideoUploadtrue");
      Alert.alert(
        "Take Video",
        "Take a new video or select from your video library",
        [
          {
            text: "Camera",
            onPress: () => captureImageByCamera("video"),
          },
          {
            text: "Gallery",
            onPress: () => captureImageByGallery("video"),
          },
          {
            text: "Cancel",
            style: "cancel",
            onPress: () => {},
          },
        ]
      );
    }
  };

  //profile image upload API start
  const fileuploadAPI = async (formData, uri) => {
    const token = await asyncStorage.getToken()
    console.log("fileuploadapi");
    fetch(ClientLogo + "api/v1/files/upload?fileType=VIDEO", {
      method: "PUT",
      body: formData,
      headers: {
        Authorization: token, //Specifying the Content-Type
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        //resStatus = response.status;
        return response.json();
      })
      .then((res) => {
        console.log("upload succes", JSON.stringify(res));
        changedValues(res?.id, data?.id, true);
        Toast.show(res.message, Toast.SHORT);
        setResourcePath(uri);
      })
      .catch((error) => {
        console.log("upload error", error);
      });
  };
  //profile image upload API end

  const captureImageByCamera = async (type) => {
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
      launchCamera(options, async (response) => {
        if (response.didCancel) {
          //  alert("User cancelled camera picker");
          return;
        } else if (response.errorCode == "camera_unavailable") {
          alert("Camera not available on device");
          return;
        } else if (response.errorCode == "permission") {
          alert("Permission not satisfied");
          return;
        } else if (response.errorCode == "others") {
          alert(response.errorMessage);
          return;
        }
        setResourcePath(response.assets[0].uri);

        const imagePathuri = response.assets[0].uri;

        if (Platform.OS === "ios") {
          const filename = Date.now().toString();
          MovToMp4.convertMovToMp4(imagePathuri, filename).then(function (
            results
          ) {
            //here you can upload the video...
            var extfilename = results.substring(results.lastIndexOf("/") + 1);

            console.log("pathhhhhextname", extfilename);
            var formData = new FormData();
            formData.append("file", {
              uri: results,
              type: "multipart/form-data",
              name: extfilename,
            });

            console.log("formdataaaaa" + JSON.stringify(formData));
            fileuploadAPI(formData, results);

            setShowDummyImage(false);
            console.log(results);
          });
        } else {
          var extfilename = imagePathuri.substring(
            imagePathuri.lastIndexOf("/") + 1
          );
          console.log("pathhhhhextname", extfilename);
          var formData = new FormData();
          formData.append("file", {
            uri: imagePathuri,
            type: "multipart/form-data",
            name: extfilename,
          });

          console.log("formdataaaaa" + JSON.stringify(formData));
         await fileuploadAPI(formData, imagePathuri);

          setShowDummyImage(false);
        }
      });
    }
  };

  //Delete
  const deleteVideo = () => {
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
      launchImageLibrary(options, (response) => {
        console.log("Response 555555= ", response);
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
        setResourcePath(response.assets[0].uri);

        const imagePathuri = response.assets[0].uri;
        if (Platform.OS === "ios") {
          const filename = Date.now().toString();
          MovToMp4.convertMovToMp4(imagePathuri, filename).then(function (
            results
          ) {
            //here you can upload the video...
            var extfilename = results.substring(results.lastIndexOf("/") + 1);

            console.log("pathhhhhextname", extfilename);
            var formData = new FormData();
            formData.append("file", {
              uri: results,
              type: "multipart/form-data",
              name: extfilename,
            });

            console.log("formdataaaaa" + JSON.stringify(formData));
            fileuploadAPI(formData, results);

            setShowDummyImage(false);
            console.log(results);
          });
        } else {
          var extfilename = imagePathuri.substring(
            imagePathuri.lastIndexOf("/") + 1
          );
          console.log("pathhhhhextname", extfilename);
          var formData = new FormData();
          formData.append("file", {
            uri: imagePathuri,
            type: "multipart/form-data",
            name: extfilename,
          });

          console.log("formdataaaaa" + JSON.stringify(formData));
          fileuploadAPI(formData, imagePathuri);

          setShowDummyImage(false);
        }
        // setImagedelete(true);
        // setShowDummyImage(false);
      });
    }
  };

  const openLink = ({ url }) => {
    Linking.openURL(url);
  };

  const supportedURL = data.customOptions.videoLink;

  const OpenURLButton = ({ url, children }) => {
    console.log("urllllll", url);
    const handlePress = useCallback(async () => {
      // Checking if the link is supported for links with custom URL scheme.
      const supported = await Linking.canOpenURL(url);
      console.log("urllllllsupported", supported);

      if (url.indexOf("http") == 0) {
        await Linking.openURL(url);
      } else {
        alert("This is not valid url!");
      }
    }, [url]);
    return (
      <Text style={{ fontWeight: "bold", color: "blue" }} onPress={handlePress}>
        Video link
      </Text>
    );
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
      <View
        style={{
          width: "95%",
          height: RA(180),
          borderWidth: 1,
          borderRadius: 10,
          justifyContent: "center",
          alignSelf: "center",
          borderColor: primaryColor(themeData),
          borderStyle: "dashed",
          marginTop: RA(10),
          // shadowColor: "gray",
          // shadowOpacity: 1,
        }}
      >
        {/* <TouchableOpacity
          style={{
            width: "100%",
            height: "100%",
            borderRadius: 10,
            opacity: 0.6,
            backgroundColor: primaryColor(themeData),
            justifyContent: "center",
          }}
          onPress={selectPhototype}
        > */}
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
            disabled={
              data?.customOptions?.isFieldDisabled
                ? data?.customOptions?.isFieldDisabled
                : isEditable != undefined
                ? !isEditable
                : false
            }
            onPress={selectPhototype}
          >
            <Icon
              name="photo-camera"
              size={25}
              style={{ alignSelf: "center" }}
            />
            <Text
              style={{
                textAlign: "center",
                color: colors.staticGrayLabelColor,
              }}
            >
              VIDEO
            </Text>
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
            <Video
              onEnd={onEnd}
              onLoad={onLoad}
              onLoadStart={onLoadStart}
              onProgress={onProgress}
              paused={paused}
              ref={videoPlayer}
              resizeMode="stretch"
              source={{
                uri: resourcePath,
              }}
              style={styles.mediaPlayer}
              volume={10}
            ></Video>
            {/* <MediaControls
              duration={duration}
              isLoading={isLoading}
              mainColor="#333"
              onPaused={onPaused}
              onReplay={onReplay}
              onSeek={onSeek}
              onSeeking={onSeeking}
              playerState={playerState}
              progress={currentTime}
              toolbar={renderToolbar()}
            /> */}
            {data?.customOptions?.isFieldDisabled ? (
              data?.customOptions?.isFieldDisabled
            ) : isEditable != undefined ? (
              isEditable
            ) : true ? (
              <TouchableOpacity
                style={{
                  position: "absolute",
                  marginLeft: "80%",
                  alignItems: "center",
                }}
                onPress={() => {
                  deleteVideo();
                }}
              >
                <Icon name="delete" color={colors.staticWhiteColor} size={25} />
              </TouchableOpacity>
            ) : null}
          </View>
        )}

        {/* </TouchableOpacity> */}
      </View>

      {isVideoLink ? (
        <View
          style={{
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "center",
            margin: 8,
          }}
        >
          {/* <Text style={{ fontWeight: 'bold' }}>Video link:</Text> */}
          {/* <Text style={{fontWeight:'bold',color: 'blue'}} onPress={openLink}>{data.customOptions.videoLink}</Text> */}
          <OpenURLButton url={supportedURL}>Video link:</OpenURLButton>
        </View>
      ) : null}
    </View>
  );
};
export default VideoScreen;
const styles = StyleSheet.create({
  toolbar: {
    marginTop: 30,
    backgroundColor: colors.staticWhiteColor,
    padding: 10,
    borderRadius: 5,
  },
  mediaPlayer: {
    backgroundColor: "black",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: "center",
    alignSelf: "center",
    borderColor: "#0000099",
  },
});

import React, { createRef, useEffect, useState, useRef } from "react";
// import all the components we are going to use
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  Modal,
  Image,
  Platform,
  PermissionsAndroid,
} from "react-native";
import SignatureCapture from "react-native-signature-capture";
import { colors, primaryColor } from "../themes/color"; // Dynamic Themes
import { fontsRegular, fontsBold } from "../assets/fonts/fonts";
import { RA } from "../assets/fontSize/fontSize";
import Icon from "react-native-vector-icons/MaterialIcons";
import envConfig from "../api/env";
import Toast from "react-native-simple-toast";
import { base64StringToBlob } from "blob-util";
import { decode as atob, encode as btoa } from "base-64";
import RNFS from "react-native-fs";
import { useSelector } from "react-redux";
import { asyncStorage } from "@app/store/asyncStorage";

const Signature = (props) => {
  const isEditable = useSelector(
    (state) => state.dynamicModule.tablelist.rowDetails.editable
  );
  const { data, themeData, changedValues } = props;
  const [showSignaturePreview, setShowSignaturePreview] = useState("");
  const [showsignature, setsignature] = useState(false);

  useEffect(() => {
    if (data.customOptions.required) {
      if (data.value != undefined) {
        getsignatureset(data.value);
      } else {
        changedValues("", data.id, false);
      }
    } else {
      if (data.value != undefined) {
        getsignatureset(data.value);
      }
    }
  }, []);

  const getsignatureset = (id) => {
    return fetch(envConfig.ClientLogo + "api/v1/files/" + `${id}`, {
      headers: {
        "Content-type": "application/json",
        Authorization: global.authToken,
      },
    })
      .then((response) => {
        console.log("setimageinphoto ===> ", response.url);
        setShowSignaturePreview(response.url);
        setsignature(true);
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


  const sign = createRef();
  const saveSign = () => {
    console.log("savesignsss");
    sign.current.saveImage();
  };
  const resetSign = () => {
    console.log("clearsigns");
    sign.current.resetImage();
  };
  // Changes
  const _onSaveEvent = async (result) => {
    
    const imagePath = result.pathName;

    var extfilename = imagePath.substring(imagePath.lastIndexOf("/") + 1);

    var formData = new FormData();
    formData.append("file", {
      uri: "file://" + imagePath,
      type: "multipart/form-data",
      name: extfilename,
    });

    console.log("formmmmmdataaaaformData", imagePath);
    setShowSignaturePreview(result.encoded);

   await fileuploadAPI(formData, result.encoded);

    setSignatureView(false);
  };

  const saveFile = (filename, dataurl) => {
    console.log("savefillleeleee");
    return new Promise((resolve, reject) => {
      fetch(dataurl, {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        redirect: "follow",
        referrerPolicy: "strict-origin-when-cross-origin",
      })
        .then((res) => res.blob())
        .then((blob) => {
          const file = new File([blob], filename, { type: "image/png" });
          console.log("blobblob -->", blob);
          console.log("filefile -->", file);
          resolve(file);
        })
        .catch((error) => {
          console.error("ErrorError:", error);
        });
    });
  };

  const sendEmail = async (file) => {
    var options = {};
    if (file.length < 1) {
      options = {
        subject: "Sending email with attachment",
        recipients: ["mahendrenkce90@gmail.com"],
        body: "Enter email body here...",
        attachments: file,
      };
    } else {
      options = {
        subject: "Sending email with attachment",
        recipients: ["godwinpauldurai@gmail.com"],
        body: "Enter email body here...",
        attachments: file,
      };
      let promise = new Promise((resolve, reject) => {
        MailComposer.composeAsync(options)
          .then((result) => {
            resolve(result);
          })
          .catch((error) => {
            reject(error);
          });
      });
      promise.then(
        (result) => setStatus("Status: email " + result.status),
        (error) => setStatus("Status: email " + error.status)
      );
    }
  };

  const dataURLtoFile = (dataurl, filename) => {
    var arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  };

  const base64ToBlob = (base64, mime) => {
    mime = mime || "";
    var sliceSize = 1024;
    var byteChars = atob(base64);
    var byteArrays = [];

    for (
      var offset = 0, len = byteChars.length;
      offset < len;
      offset += sliceSize
    ) {
      var slice = byteChars.slice(offset, offset + sliceSize);

      var byteNumbers = new Array(slice.length);
      for (var i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      var byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, { type: mime });
  };

  function revisedRandId() {
    return Math.random()
      .toString(36)
      .replace(/[^a-z]+/g, "")
      .substr(2, 10);
  }

  //signature upload API start
  const fileuploadAPI = async (formData, base64Icon) => {

    const token = await asyncStorage.getToken()

    console.log(
      "fileuploadapi",
      envConfig.ClientLogo + "api/v1/files/upload?fileType=IMAGE"
    );
    fetch(envConfig.ClientLogo + "api/v1/files/upload?fileType=IMAGE", {
      method: "PUT",
      body: formData,
      headers: {
        Authorization: token, //Specifying the Content-Type
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        console.log("ressssssssss", JSON.stringify(response));
        //resStatus = response.status;
        return response.json();
      })
      .then((res) => {
        console.log("upload succes", JSON.stringify(res));
        Toast.show(res.message, Toast.SHORT);
        // setShowSignaturePreview(base64Icon);
        changedValues(res?.id, data.id, true);
      })
      .catch((error) => {
        console.log("upload error", error);
      });
  };
  //signature upload API end

  //Delete
  const deleteSignature = () => {
    setShowSignaturePreview("");
    setsignature(false);
  };
  const _onDragEvent = () => {
    // This callback will be called when the user enters signature
    console.log("dragged");
  };
  const [signatureView, setSignatureView] = useState(false);
  return (
    <View style={styles.container}>
      <Modal animationType="fade" transparent={false} visible={signatureView}>
        <View
          style={{
            height: 90,
            width: "100%",
            flexDirection: "row",
            backgroundColor: colors.staticWhiteColor,
          }}
        >
          <View
            style={{
              height: "100%",
              width: "70%",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: colors.staticWhiteColor,
            }}
          >
            <Text
              style={{
                fontSize: RA(25),
                fontWeight: "700",
                marginLeft: -30,
                marginTop: 20,
                backgroundColor: colors.staticWhiteColor,
                color: colors.staticTextColor,
                fontFamily: fontsRegular(themeData),
              }}
            >
              Signature
            </Text>
          </View>
          <TouchableOpacity
            style={{
              height: "100%",
              width: "30%",
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => {
              setSignatureView(false);
            }}
          >
            {/* <Image
              source={require("../assets/images/close.png")}
              style={{ height: RA(20), width: RA(20), marginTop: 20 }}
            /> */}
            <Icon
              name="close"
              size={RA(28)}
              style={styles.headerMenuImageView}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
          <View
            style={{
              height: "80%",
              width: "95%",
              borderColor: "#ECECF3",
              borderWidth: 2,
              marginLeft: 10,
            }}
          >
            <SignatureCapture
              style={styles.signature}
              ref={sign}
              onSaveEvent={_onSaveEvent}
              onDragEvent={_onDragEvent}
              saveImageFileInExtStorage={true}
              showNativeButtons={false}
              showTitleLabel={false}
              viewMode={"portrait"}
            />
          </View>
          <View style={{ flexDirection: "row" }}>
            <TouchableHighlight
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                height: 50,
                borderColor: primaryColor(themeData),
                borderWidth: 0.5,
                margin: 10,
              }}
              onPress={() => {
                resetSign();
              }}
            >
              <Text
                style={{
                  color: primaryColor(themeData),
                  fontFamily: fontsRegular(themeData),
                }}
              >
                CLEAR
              </Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                height: 50,
                backgroundColor: primaryColor(themeData),
                margin: 10,
              }}
              onPress={() => {
                saveSign();
              }}
            >
              <Text style={{ fontFamily: fontsRegular(themeData) }}>SAVE</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
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
          height: RA(100),
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
        {showSignaturePreview != "" ? (
          <View
            style={{
              width: "100%",
              height: "100%",
              borderRadius: 10,
              // opacity: 0.6,
              backgroundColor: colors.staticBlackColor,
              justifyContent: "center",
            }}
          >
            <View
              style={{
                height: "100%",
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <Image
                  // source={{uri: 'https://i.vimeocdn.com/portrait/58832_300x300.jpg'}}
                  // source={{ uri: showSignaturePreview }}
                  source={{
                    uri: showsignature
                      ? showSignaturePreview
                      : `data:image/png;base64,${showSignaturePreview}`,
                  }}
                  style={{
                    height: RA(100),
                    width: RA(100),
                    backgroundColor: colors.staticWhiteColor,
                    alignItems: "center",
                  }}
                />
                {isEditable != undefined ? isEditable : true ? (
                  <TouchableOpacity
                    style={{
                      position: "absolute",
                      marginLeft: RA(170),
                      marginTop: RA(10),
                    }}
                    onPress={() => {
                      deleteSignature();
                    }}
                  >
                    <Icon
                      name="delete-outline"
                      size={RA(22)}
                      style={styles.imageIconStyle}
                    />
                  </TouchableOpacity>
                ) : null}
              </View>
            </View>
          </View>
        ) : (
          <View
            style={{
              width: "100%",
              height: "100%",
              borderRadius: 10,
              opacity: 0.6,
              backgroundColor: primaryColor(themeData),
              justifyContent: "center",
            }}
          >
            <View
              style={{
                height: "100%",
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <TouchableOpacity
                style={{ alignItems: "center" }}
                onPress={() => {
                  setSignatureView(true);
                }}
              >
                <Image
                  source={require("../assets/images/sign.png")}
                  style={{ height: 40, width: 40 }}
                  resizeMode="contain"
                />
                <Text
                  style={{
                    fontSize: RA(12),
                    fontWeight: "600",
                    fontFamily: fontsRegular(themeData),
                    color: colors.staticTextColor,
                  }}
                >
                  SIGNATURE
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};
export default Signature;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleStyle: {
    fontSize: 20,
    textAlign: "center",
  },
  signature: {
    height: "100%",
    width: "100%",
  },
  imageIconStyle: {
    height: RA(20),
    width: RA(20),
    color: colors.staticWhiteColor,
    resizeMode: "stretch",
  },
  headerMenuImageView: {
    marginTop: 20,
    // width: 25,
    color: colors.grayToWhite,
  },
  // buttonStyle: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   height: 50,
  //   backgroundColor: primaryColor(props),
  //   margin: 10,
  // },
  // buttonStyle1: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   height: 50,
  //   borderColor: primaryColor(props),
  //   borderWidth:0.5,
  //   margin: 10,
  // },
});

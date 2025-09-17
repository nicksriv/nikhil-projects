import React, { useState, useEffect } from "react";

import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  Image,
  PermissionsAndroid,
} from "react-native";

// Import Document Picker
import DocumentPicker from "react-native-document-picker";
import Icon from "react-native-vector-icons/MaterialIcons";
import { colors, primaryColor } from "../themes/color"; // Dynamic Themes
import { fontsRegular, fontsBold } from "../assets/fonts/fonts";
import { RA } from "../assets/fontSize/fontSize";
import envConfig from "../api/env";
import Toast from "react-native-simple-toast";
// import RNFetchBlob from "rn-fetch-blob";
import RNFS from "react-native-fs";
import { log } from "console";
import { useSelector } from "react-redux";
import moment from "moment";
import { asyncStorage } from "@app/store/asyncStorage";

const BaseUrlReport = envConfig.BaseUrlReport;

const Attachment = (props) => {
  const isEditable = useSelector(
    (state) => state.dynamicModule.tablelist.rowDetails.editable
  );
  const { data, changedValues, themeData } = props;

  const [singleFile, setSingleFile] = useState("");
  const [multipleFile, setMultipleFile] = useState([]);
  const [filename, setFileName] = useState("");
  const [filedownload, setFileDownload] = useState(false);
  const [formatAlert, setFormatAlert] = useState(false);

  useEffect(() => {
    // console.log("datadatadatadatadata = ", data);
    if (data.value != undefined && data.value != "") {
      setFileName(data?.value?.name);
      getphotoset(data.value.id);
    } else if (
      data?.customOptions?.defaultValue != "" &&
      data?.customOptions?.defaultValue != undefined
    ) {
      setFileName(data?.customOptions?.fileName);
      getphotoset(data?.customOptions?.defaultValue);
    }

    if (!data.customOptions?.required) {
      changedValues("", data.id, true);
    }
  }, [data.value]);

  const getphotoset = (id) => {
    return fetch(envConfig.ClientLogo + "api/v1/files/" + `${id}`, {
      headers: {
        "Content-type": "application/json",
        Authorization: global.authToken,
      },
    })
      .then((response) => {
        console.log("setimageinphoto ===> ", response);
        console.log("setimageinphotoattachment ===> ", response.headers.map);
        if (response != null) {
          console.log("sucessss");
          setFileDownload(true);
        }

        const statusCode = response.status;
        const responseJson = response.json();
        return Promise.all([statusCode, responseJson]);

        // setFileName(decodeURI(Name));
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

  const historyDownload = () => {
    //Function to check the platform
    //If iOS the start downloading
    //If Android then ask for runtime permission
    if (Platform.OS === "ios") {
      downloadHistory();
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
            downloadHistory();
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

  const downloadHistory = async () => {
    var date = new Date();

    let datee = new Date(Math.floor(date.getTime() + date.getSeconds() / 2));

    var currentDate = moment().format("DD-MM-YYYY hh:mm a");

    const {
      dirs: { DownloadDir, DocumentDir },
    } = RNFetchBlob.fs;
    const { config } = RNFetchBlob;
    const isIOS = Platform.OS == "ios";
    const aPath = Platform.select({ ios: DocumentDir, android: DownloadDir });
    const fPath =
      data?.customOptions?.fileName != ""
        ? aPath +
          "/" +
          data?.customOptions?.fileName.split(".").slice(0, -1).join(".") +
          " " +
          moment().format("DD_MM_YYYY_hh_mm_a") +
          "." +
          data?.customOptions?.fileName.split(".").slice(0, -1).join(".")
        : aPath +
          "/" +
          data?.value?.name.split(".").slice(0, -1).join(".") +
          " " +
          moment().format("DD_MM_YYYY_hh_mm_a") +
          "." +
          data?.value?.name.split(".").pop();

    const configOptions = Platform.select({
      ios: {
        fileCache: true,
        path: fPath,
        // mime: 'application/xlsx',
        // appendExt: 'xlsx',
        //path: filePath,
        //appendExt: fileExt,
        notification: true,
      },

      android: {
        fileCache: false,
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          path: fPath,
          description: "Downloading attachment file...",
        },
      },
    });

    if (isIOS) {
      if (data.value != undefined) {
        config(configOptions)
          .fetch("GET", envConfig.ClientLogo + "api/v1/files/" + data.value.id)
          .then((res) => {
            //this.refs.toast.show('File download successfully');
            console.log("resresresresresresresres = ", res);
            setTimeout(() => {
              RNFetchBlob.ios.previewDocument("file://" + res.path());
              // RNFetchBlob.ios.openDocument(res.data);
              Toast.show("File downloaded..!", Toast.SHORT);
              // Alert.alert(CONSTANTS.APP_NAME,'File download successfully');
            }, 300);
          })
          .catch((errorMessage) => {
            console.log("errorrmessage", errorMessage);
          });
      } else if (data?.customOptions?.defaultValue != "") {
        config(configOptions)
          .fetch(
            "GET",
            envConfig.ClientLogo +
              "api/v1/files/" +
              data?.customOptions?.defaultValue
          )
          .then((res) => {
            //this.refs.toast.show('File download successfully');
            console.log("resresresresresresresres = ", res);
            setTimeout(() => {
              RNFetchBlob.ios.previewDocument("file://" + res.path());
              // RNFetchBlob.ios.openDocument(res.data);
              Toast.show("File downloaded..!", Toast.SHORT);
              // Alert.alert(CONSTANTS.APP_NAME,'File download successfully');
            }, 300);
          })
          .catch((errorMessage) => {
            console.log("errorrmessage", errorMessage);
          });
      }
      // else {
      //   config(configOptions)
      //     .fetch("GET", envConfig.ClientLogo + "api/v1/files/" + data.value.id)
      //     .then((res) => {
      //       //this.refs.toast.show('File download successfully');
      //       console.log("resresresresresresresres = ", res);
      //       setTimeout(() => {
      //         RNFetchBlob.ios.previewDocument("file://" + res.path());
      //         // RNFetchBlob.ios.openDocument(res.data);
      //         Toast.show("File downloaded..!", Toast.SHORT);
      //         // Alert.alert(CONSTANTS.APP_NAME,'File download successfully');
      //       }, 300);
      //     })
      //     .catch((errorMessage) => {
      //       console.log("errorrmessage", errorMessage);
      //     });
      // }
    } else {
      if (data.value != undefined) {
        config(configOptions)
          .fetch("GET", envConfig.ClientLogo + "api/v1/files/" + data.value.id)
          .then((res) => {
            RNFetchBlob.android.actionViewIntent(res.path());
            Toast.show("File downloaded..!", Toast.SHORT);
          })
          .catch((errorMessage, statusCode) => {
            console.log("errorrmessage", errorMessage);
          });
      } else if (data?.customOptions?.defaultValue != "") {
        config(configOptions)
          .fetch(
            "GET",
            envConfig.ClientLogo +
              "api/v1/files/" +
              data?.customOptions?.defaultValue
          )
          .then((res) => {
            RNFetchBlob.android.actionViewIntent(res.path());
            Toast.show("File downloaded..!", Toast.SHORT);
          })
          .catch((errorMessage, statusCode) => {
            console.log("errorrmessage", errorMessage);
          });
      } else {
        config(configOptions)
          .fetch("GET", envConfig.ClientLogo + "api/v1/files/" + data.value.id)
          .then((res) => {
            RNFetchBlob.android.actionViewIntent(res.path());
            Toast.show("File downloaded..!", Toast.SHORT);
          })
          .catch((errorMessage, statusCode) => {
            console.log("errorrmessage", errorMessage);
          });
      }
      // config(configOptions)
      //   .fetch(
      //     "GET",
      //     envConfig.ClientLogo +
      //       "api/v1/files/" +
      //       data?.customOptions?.defaultValue !=
      //       ""
      //       ? data?.customOptions?.defaultValue
      //       : data.value.id
      //   )
      //   .then((res) => {
      //     RNFetchBlob.android.actionViewIntent(res.path());
      //     Toast.show("File downloaded..!", Toast.SHORT);
      //   })
      //   .catch((errorMessage, statusCode) => {
      //     console.log("errorrmessage", errorMessage);
      //   });
    }

    //   const { dirs } = RNFetchBlob.fs;
    //       const dirToSave = Platform.OS == 'ios' ? dirs.DocumentDir : dirs.DownloadDir

    //       const configfb = {
    //           fileCache: true,
    //           useDownloadManager: true,
    //           notification: true,
    //           mediaScannable: true,
    //           title: data.value.name,
    //           path: `${dirToSave}/${data.value.name}`,
    //       }
    //       const configOptions = Platform.select({
    //           ios: {
    //               fileCache: configfb.fileCache,
    //               title: configfb.title,
    //               path: configfb.path,
    //               appendExt: 'pdf',
    //           },
    //           android: configfb,
    //       });

    //       console.log('The file saved to 23233', configfb, dirs);

    //       RNFetchBlob.config(configOptions)
    //           .fetch('GET', envConfig.ClientLogo +"api/v1/files/"+data.value.id, {})
    //           .then((res) => {
    //               if (Platform.OS === "ios") {
    //                   RNFetchBlob.fs.writeFile(configfb.path, res.data, 'base64');
    //                   RNFetchBlob.ios.previewDocument(configfb.path);
    //               }
    //               if (Platform.OS == 'android') {
    //                   Toast.show("File downloaded..!", Toast.LONG);
    //                   RNFetchBlob.android.actionViewIntent(
    //                     res.path(),
    //                     "application/pdf"
    //                   );

    //               }

    //               res.flush()
    //               console.log('The file saved to ', res);
    //           })
    //           // remove file by specifying a path
    // RNFetchBlob.fs.unlink(configfb.path).then(() => {
    //   // ...
    // })
    //           .catch((e) => {
    //               console.log('The file saved to ERROR', e.message)
    //           });
  };

  const deleteAttachment = () => {
    setSingleFile("");
    setFileName("");
    setFormatAlert(false);
    Toast.show("File deleted successfully..!", Toast.SHORT);
  };

  const selectOneFile = async () => {
    //Opening Document Picker for selection of one file
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      //Printing the log realted to the file
      console.log("res : " + JSON.stringify(res));
      console.log("URI : " + res.uri);
      console.log("Type : " + res.type);
      console.log("File Name : " + res.name);
      console.log("File Size : " + res.size);
      var Uri = res.map(function (el) {
        return el.uri;
      });
      var Name = res.map(function (el) {
        return el.name;
      });
      var NewValue = decodeURI(Name).substr(decodeURI(Name).length - 4);

      let serverType = false;

      data.customOptions.Attachment.map((ele, i) => {
        console.log("serverTypeserverType ele" + ele + NewValue);
        if (ele === NewValue) {
          serverType = true;
        }
      });

      console.log("serverTypeserverType = ", serverType);
      // if (NewValue == ) {

      // } else {

      // }

      console.log("URIURI : " + Uri);
      console.log("NameName : " + Name);

      if (serverType == true) {
        setFormatAlert(false);
        setSingleFile(res);

        var formData = new FormData();
        formData.append("file", {
          uri: decodeURI(Uri),
          type: "multipart/form-data",
          name: decodeURI(Name),
        });

        setFileName(decodeURI(Name));
        console.log("formdataaa", JSON.stringify(formData));
        console.log("filenammeeeee", filename);
       await fileuploadAPI(formData, Name);
      } else {
        alert(
          "Invalid data format, we support " + data.customOptions.Attachment
        );
        setFormatAlert(true);
      }

      //Setting the state to show single file attributes
    } catch (err) {
      //Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        //If user canceled the document selection
        // alert("Canceled from single doc picker");
      } else {
        //For Unknown Error
        alert("Unknown Error: " + JSON.stringify(err));
        throw err;
      }
    }
  };

  //profile image upload API start
  const fileuploadAPI = async (formData, name) => {
    console.log(
      "fileuploadapi",
      envConfig.ClientLogo + "api/v1/files/upload?fileType=DOCUMENT"
    );
    const token = await asyncStorage.getToken()
    fetch(envConfig.ClientLogo + "api/v1/files/upload?fileType=DOCUMENT", {
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
        console.log("upload succesnamename", name[0]);
        Toast.show(res.message, Toast.SHORT);
        // let person = {
        //   id : res.id,
        //   name  : formData.name,
        // };
        //setResourcePath(imagePath);
        // changedValues(res.id, data.id, true);
        changedValues({ id: res.id, name: name[0] }, data.id, true);
      })
      .catch((error) => {
        console.log("upload error", error);
      });
  };
  //profile image upload API end

  const selectMultipleFile = async () => {
    //Opening Document Picker for selection of multiple file
    try {
      const results = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.images],
        //There can me more options as well find above
      });
      for (const res of results) {
        //Printing the log realted to the file
        console.log("res : " + JSON.stringify(res));
        console.log("URI : " + res.uri);
        console.log("Type : " + res.type);
        console.log("File Name : " + res.name);
        console.log("File Size : " + res.size);
      }
      //Setting the state to show multiple file attributes
      setMultipleFile(results);
    } catch (err) {
      //Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        //If user canceled the document selection
        alert("Canceled from multiple doc picker");
      } else {
        //For Unknown Error
        alert("Unknown Error: " + JSON.stringify(err));
        throw err;
      }
    }
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
        <TouchableOpacity
          activeOpacity={0.5}
          disabled={
            data?.customOptions?.isFieldDisabled
              ? data?.customOptions?.isFieldDisabled
              : isEditable != undefined
              ? !isEditable
              : false
          }
          style={{
            width: "100%",
            height: "100%",
            borderRadius: 10,
            opacity: 0.6,
            backgroundColor: primaryColor(themeData),
            justifyContent: "center",
          }}
          onPress={selectOneFile}
        >
          {/*Single file selection button*/}
          {data?.customOptions?.isFieldDisabled ? (
            data?.customOptions?.isFieldDisabled
          ) : isEditable != undefined ? (
            isEditable
          ) : filename != "" ? (
            <TouchableOpacity
              style={{
                position: "relative",
                alignSelf: "center",
                marginLeft: "80%",
              }}
              disabled={isEditable != undefined ? !isEditable : false}
              onPress={() => {
                deleteAttachment();
              }}
            >
              <Icon
                name="delete"
                color={colors.staticGrayLabelColor}
                size={25}
                // style={{ marginLeft: RA(275) }}
              />
            </TouchableOpacity>
          ) : null}
          <View
            style={{
              flexDirection: "column",
              alignItems: "center",
              alignSelf: "center",
              alignContent: "center",
            }}
          >
            <Icon
              name="attachment"
              size={RA(22)}
              style={styles.imageIconStyle}
            />

            {filename && !filedownload ? (
              <Text
                style={{
                  fontSize: RA(16),
                  fontWeight: "600",
                  fontFamily: fontsRegular(themeData),
                  color: colors.staticTextColor,
                }}
              >
                {filename}
              </Text>
            ) : filedownload ? (
              <Text
                style={{
                  fontSize: RA(16),
                  fontWeight: "600",
                  fontFamily: fontsRegular(themeData),
                  color: colors.staticTextColor,
                }}
                onPress={historyDownload}
              >
                {/* {data?.customOptions?.fileName != ""
                  ? data?.customOptions?.fileName
                  : data?.value?.name} */}
                {filename}
              </Text>
            ) : (
              <Text
                style={{
                  fontSize: RA(12),
                  fontWeight: "600",
                  fontFamily: fontsRegular(themeData),
                  color: colors.staticTextColor,
                }}
              >
                ATTACHMENT
              </Text>
            )}
          </View>
        </TouchableOpacity>
      </View>
      {formatAlert ? (
        <View style={{ flexDirection: "row" }}>
          <Text
            style={{
              color: colors.staticRedColor,
              marginLeft: RA(10),
              marginTop: RA(10),
              fontFamily: fontsRegular(themeData),
            }}
          >
            *
          </Text>
          <Text
            style={{
              marginTop: RA(10),
              marginLeft: RA(5),
              fontFamily: fontsRegular(themeData),
              color: colors.staticRedColor,
            }}
          >
            {"we support " + data.customOptions.Attachment + " formats only"}
          </Text>
        </View>
      ) : null}
    </View>
  );
};

export default Attachment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.staticWhiteColor,
    justifyContent: "center",
    alignItems: "center",
  },
  titleText: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    paddingVertical: 20,
  },
  textStyle: {
    backgroundColor: colors.staticWhiteColor,
    fontSize: 15,
    marginTop: 16,
    color: "black",
  },
  buttonStyle: {
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#DDDDDD",
    padding: 5,
    height: 80,
    width: "95%",
    borderRadius: 5,
  },
  imageIconStyle: {
    height: RA(20),
    width: RA(20),
    resizeMode: "stretch",
  },
});

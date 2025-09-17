import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Modal,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
  KeyboardAvoidingView,
  FlatList,
  Dimensions,
} from 'react-native';
import apiConfig from '@app/FormElements/api/api_config';
import envConfig from '@app/FormElements/api/env';
import {TextInput, ActivityIndicator, RadioButton} from 'react-native-paper';
import FormElement from '@app/FormElements/components/index';
import {colors, primaryColor} from '@app/FormElements/themes/color';
import {fontsRegular, fontsBold} from '@app/FormElements/assets/fonts/fonts';
import {RA} from '@app/FormElements/assets/fontSize/fontSize';
import moment from 'moment';
import {useSelector} from 'react-redux';
import {asyncStorage} from '@app/store/asyncStorage';
import {Alert} from 'react-native';
import {dynamicModuleAxios} from '@app/helper/axios';
import {ScreenConstants} from '@app/navigator/ScreenConstants';
import { BackHandler } from 'react-native';
import { R } from '@app/res/index';
import { urlHelper } from '@app/helper/url';

var fieldAlignMent = 'center';

function ScreenBuilderContainer(props) {
  const isEditable = useSelector(
    state => state.dynamicModule.tablelist.rowDetails.editable,
  );
  const mappingData = useSelector(
    state => state.dynamicModule.tablelist.mappingData,
  );

  const [spinner, setSpinner] = useState(true);
  const [screenName, setScreenName] = useState('');
  const [dataSource, setDataSource] = useState([]);
  const [moduleId, setModuleId] = useState('');
  const [subModuleId, setSubModuleId] = useState('');
  const [rowDetailsState, setRowDetailsState] = useState(props.rowDetails);
  const [useValidation, setValidation] = useState(props.rowDetails);
  const [clientId, setClientId] = useState('');
  const [requiredFields, setRequiredFields] = useState([]);
  const [checkRequiredFields, setCheckRequiredFields] = useState(true);
  const [selectMenuItem, setSelectMenuItem] = useState(props.mySubModule);
  const [rejectButton, setRejectButton] = useState(
    !props.rowDetails.approved && !props.rowDetails.previouslyApproved,
  );
  const [approveButton, setApproveButton] = useState(
    !props.rowDetails.approved && !props.rowDetails.previouslyApproved,
  );
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [screenNumber, setScreenNumber] = useState(0);
  const [moduleData, setModuleData] = useState();
  const [subModuleData, setSubModuleData] = useState();

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, [Keyboard]);

  useEffect(() => {
    getScreensById();
  }, [screenNumber]);

  useEffect(()=>{
    const module = props.route?.params?.moduleData;
    const subModule = props.route?.params?.subModuleData;
    setModuleData(module)
    setSubModuleData(subModule)
    setSubModuleId(subModule.id);
  },[])

  
  const numberOfScreens = global?.screenIds?.length - 1;
  const baseUrl = envConfig.BaseUrl;

  var empDate = moment(props.rowDetails.date).format('DD-MM-yyyy');
  if (fieldAlignMent === 'center') {
    fieldAlignMent = 'center';
  } else if ('left') {
    fieldAlignMent = '';
  } else {
    fieldAlignMent = 'marginLeft';
  }

  // Find Keyboard is open or close

  const submitData = async () => {
    const token = await asyncStorage.getToken();
    const header = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: token,
    };

    try {
      if (!checkIsDisabled()) {
        if (screenNumber != numberOfScreens) {
          setScreenNumber(screenNumber + 1);
          setCheckRequiredFields(true);
        } else {
          if (props.route.params.fromRowData) {
            console.log('submitApi1 triggered');
            submitApi1(header);
          } else {
            console.log('submitApi2 triggered');
            submitApi2(header);
          }
        }
      }
    } catch (error) {
      console.log('Error', error);
    }
  };
  const approveData = async value => {
    const token = await asyncStorage.getToken();
    const header = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: token,
    };

    try {
      value === false ? setRejectButton(true) : setApproveButton(false);
      value === true ? setRejectButton(false) : setApproveButton(true);
      if (props.route.params.fromRowData) {
        fetch(
          selectMenuItem?.mappedBy
            ? envConfig.BaseUrl +
                'api/v1/modules/' +
                `${moduleId}` +
                '/submodule/' +
                `${subModuleId}` +
                '/form/' +
                `${props.rowDetails.id}` +
                `?mappedBy=${selectMenuItem?.mappedBy}` +
                '&workflowId=' +
                `${global.currentWorkflowId}`
            : envConfig.BaseUrl +
                'api/v1/modules/' +
                `${moduleId}` +
                '/submodule/' +
                `${subModuleId}` +
                '/form/' +
                `${props.rowDetails.id}` +
                '?workflowId=' +
                `${global.currentWorkflowId}`,
          {
            method: 'PUT',
            headers: header,
            body: JSON.stringify({approved: value}),
          },
        )
          .then(response => {
            const statusCode = response.status;
            const responseJson = response.json();
            return Promise.all([statusCode, responseJson]);
          })
          .then(([statusCode, responseJson]) => {
            if (statusCode == 401 || statusCode == 403) {
              props.actions.logOut();
            }
            const data = rowDetailsState;
            data.approved = value;
            setRowDetailsState(data);
          })
          .catch(error => {
            console.error(error);
            if (
              error?.data?.statuscode == 401 ||
              error?.data?.statuscode == 403
            ) {
              global.authToken = '';
            }
          });
      }
    } catch (error) {
      console.log('Error', error);
    }
  };

  

  const getScreensById = async() => { 

    try {
      const url =  baseUrl +
      `api/v1/submodules/${global.screenIds[screenNumber].current}/screens`
      const responseJson = await dynamicModuleAxios.get(url);

      if(responseJson){
        setSpinner(false);
        const data = responseJson
        let formData = data.form;
        formData.map((item, index) => {
          if (
            item.customOptions.required &&
            !requiredFields.includes(item.id)
          ) {
            requiredFields.push(item.id);
          }
        });
        if (Object.keys(rowDetailsState).length != 0) {
          formData.map((item, index) => {
            Object.keys(rowDetailsState).map(subItem => {
              if (item.hasDependentComponents == true) {
                {
                  item.dependentComponents.map((componentItem, index) => {
                    {
                      componentItem.form.map((formItem, formIndex) => {
                        if (formItem.type == 'Dropdown') {
                          if (formItem.hasDependentComponents == true) {
                            {
                              formItem.dependentComponents.map(
                                (innerComponentItem, index) => {
                                  {
                                    innerComponentItem.form.map(
                                      (innerFormItem, innerFormIndex) => {
                                        if (subItem == innerFormItem.id) {
                                          innerComponentItem.form[
                                            innerFormIndex
                                          ]['value'] = rowDetailsState[subItem];
                                        }
                                      },
                                    );
                                  }
                                },
                              );
                            }
                          }
                        }
                        if (subItem == formItem.id) {
                          componentItem.form[formIndex]['value'] =
                            rowDetailsState[subItem];
                        }
                      });
                    }
                  });
                }
              }
              if (subItem == item.id) {
                formData[index]['value'] = rowDetailsState[subItem];
              }
              if (item.customOptions.required) {
                if (!rowDetailsState.hasOwnProperty(item.id)) {
                  rowDetailsState[item.id] = '';
                }
              }
            });
          });
        } else {
          formData.map((item, index) => {
            if (item.customOptions.required) {
              rowDetailsState[item.id] = '';
            }
          });
        }

        formData = formData.map(element => {
          if (element.element === 'Mapping_Dropdown') {
            return {
              ...element,
              dropDownOptions: mappingData.length ? mappingData : [],
              [element.id]: '',
            };
          }
          return element;
        });
        setDataSource(formData);
        setScreenName(data.name);
        props.navigation.setOptions({title: data.name});
        setModuleId(data.moduleId);
        // setSubModuleId(props.mySubModule.id);
        setClientId(data.clientId);
        global.names = data.name;
        return responseJson;
      }
    } catch (error) {
      console.log("getScreensById error",error)
    }
   }


  const changeText = (text, id, validation) => {
    try {
      const editedValidation = rowDetailsState;
      editedValidation[id + 100] = validation;
      setValidation(editedValidation);

      const editedItem = rowDetailsState;
      editedItem[id] = text;
      // editedItem[id] = text.toString();
      setRowDetailsState(editedItem);
      checkIsDisabled(validation);
    } catch (error) {
      console.log('error', error);
    }
  };

  const goToHome = () => {
    props.actions.setRowDetails({});
    props.navigation.navigate('Home');
  };

  const checkIsDisabled = verify => {
    try {
      let disable = false;
      if (verify == false) {
        disable = true;
      }
      requiredFields.map((item, index) => {
        if (screenNumber == 0) {
          if (!props.route.params.fromRowData) {
            if (
              (useValidation[item]?.length == 0 && checkRequiredFields) ||
              useValidation[item + 100] == false ||
              undefined
            ) {
              disable = true;
            }
          } else {
            if (useValidation[item + 100] == false || undefined) {
              disable = true;
            }
          }
          // enables last element

          // else if (verify == true) {
          //   disable = false;

          // }
        } else {
          if (!props.route.params.fromRowData) {
            if (
              useValidation[item] == '' ||
              useValidation[item + 100] == false ||
              undefined
            ) {
              if (useValidation[item + 100] == false || undefined) {
                disable = true;
              }
            }
          } else {
            if (useValidation[item + 100] == false || undefined) {
              if (useValidation[item + 100] == false || undefined) {
                disable = true;
              }
            }
          }
        }
      });
      setCheckRequiredFields(disable);
      return disable;
    } catch (error) {
      console.log('error');
    }
  };

  const submitApi1 = async () => {
    const url1 =
      envConfig.BaseUrl +
      'api/v1/modules/' +
      `${moduleId}` +
      '/submodule/' +
      `${subModuleId}` +
      '/form/' +
      `${props.rowDetails.id}` +
      `?mappedBy=${selectMenuItem?.mappedBy}` +
      '&workflowId=' +
      `${subModuleData.workFlowId}`;

    const url2 =
      envConfig.BaseUrl +
      'api/v1/modules/' +
      `${moduleId}` +
      '/submodule/' +
      `${subModuleId}` +
      '/form/' +
      `${props.rowDetails.id}` +
      '?workflowId=' +
      `${subModuleData.workFlowId}`;


const url = urlHelper.submitApi1({
  moduleId,
  subModuleId,
  rowDetailsId:props.rowDetails.id,
  mappedBy:selectMenuItem?.mappedBy,
  workFlowId:subModuleData.workFlowId
})


    try {
      const res = await dynamicModuleAxios.post(
        selectMenuItem?.mappedBy ? url1 : url2,
        rowDetailsState,
      );
      if (res) {
        setSpinner(false);
        props.actions.getRowList(moduleId, subModuleId, selectMenuItem,props.activeJobId);
        props.actions.setRowDetails({});
        Alert.alert('Data Saved Successfully');
           props.navigation.navigate({
             name: ScreenConstants.MODULE_DETAIL,
             params: {
               myModule: moduleData,
               mySubModule: subModuleData,
               reload:true
             },
           });        
      }
      console.log('Submit api 2 res', res);
    } catch (error) {
      setSpinner(false);
      console.log('submit api 2 error', error);
    }
  };

  const submitApi2 = async header => {
    const url1 =
      envConfig.BaseUrl +
      'api/v1/modules/' +
      `${moduleId}` +
      '/submodule/' +
      `${subModuleId}` +
      '?workflowId=' +
      `${subModuleData.workFlowId}` +
      `?mappedBy=${selectMenuItem?.mappedBy}`;

    const url2 =
      envConfig.BaseUrl +
      'api/v1/modules/' +
      `${moduleId}` +
      '/submodule/' +
      `${subModuleId}` +
      '?workflowId=' +
      `${subModuleData.workFlowId}&jobId=${props.activeJobId}`;
    setSpinner(true);
    try {
      const res = await dynamicModuleAxios.post(
        selectMenuItem?.mappedBy ? url1 : url2,
        rowDetailsState,
      );
      if (res) {
        setSpinner(false);
        props.actions.setRowDetails({});
        // Alert.alert('Data Saved Successfully');

        props.navigation.navigate({
          name: ScreenConstants.MODULE_DETAIL,
          params: {
            myModule: moduleData,
            mySubModule: subModuleData,
            reload:true
          },
        })

      }
      console.log('Submit api 1 res', res);
    } catch (error) {
      setSpinner(false);
      console.log('submit api1 error', error);
    }
  };

  return spinner ? (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.transparentColor,
      }}>
      <ActivityIndicator
        size={25}
        animating={true}
        color={colors.staticPrimaryColor}
      />

      <Text style={{fontSize: 20, color: colors.staticTextColor}}>Loading</Text>
    </View>
  ) : (
    <SafeAreaView style={styles.container}>
      <View style={{flex: 1}}>
        <View
          style={{
            height: '75%',
          }}>
          <View
            style={{
              height:
                selectMenuItem?.mappedBy &&
                screenNumber === numberOfScreens &&
                selectMenuItem?.hasApprovalOnScreens
                  ? '88%'
                  : '100%',
              width: '100%',
              paddingTop:
                Platform.OS === 'android'
                  ? isKeyboardVisible
                    ? '2%'
                    : '2%'
                  : '2%',
              paddingBottom:
                Platform.OS === 'android'
                  ? isKeyboardVisible
                    ? '5%'
                    : '0%'
                  : '0%',
            }}>
            <ScrollView>
              {selectMenuItem?.mappedBy && screenNumber == 0 && (
                <View style={{width: '100%'}}>
                  <TextInput
                    label="Created Date"
                    // placeholder="Emp Name"
                    mode="outlined"
                    theme={{
                      fonts: {regular: {fontFamily: fontsRegular(props)}},
                      colors: {
                        primary: primaryColor(props),
                        underlineColor: 'transparent',
                      },
                    }}
                    right={
                      <TextInput.Icon
                        name="calendar"
                        color={colors.staticIconGrayColor}
                        style={{marginTop: 15}}
                      />
                    }
                    value={empDate}
                    editable={false}
                    style={{
                      backgroundColor: colors.staticWhiteColor,
                      marginHorizontal: 10,
                      fontSize: 14,
                      height: 56,
                      marginVertical: 10,
                    }}
                  />

                  <TextInput
                    label="Emp Id"
                    placeholder="Emp Id"
                    mode="outlined"
                    theme={{
                      fonts: {regular: {fontFamily: fontsRegular(props)}},
                      colors: {
                        primary: primaryColor(props),
                        underlineColor: 'transparent',
                      },
                    }}
                    value={rowDetailsState.employeeId}
                    editable={false}
                    style={{
                      backgroundColor: colors.staticWhiteColor,
                      marginHorizontal: 10,
                      fontSize: 14,
                      height: 56,
                      marginVertical: 10,
                    }}
                  />
                  <TextInput
                    label="Emp Name"
                    placeholder="Emp Name"
                    mode="outlined"
                    theme={{
                      fonts: {regular: {fontFamily: fontsRegular(props)}},
                      colors: {
                        primary: primaryColor(props),
                        underlineColor: 'transparent',
                      },
                    }}
                    value={rowDetailsState.userName}
                    editable={false}
                    style={{
                      backgroundColor: colors.staticWhiteColor,
                      marginHorizontal: 10,
                      fontSize: 14,
                      height: 56,
                      marginVertical: 10,
                    }}
                  />
                  <TextInput
                    label="Emp Role"
                    placeholder="Emp Role"
                    mode="outlined"
                    theme={{
                      fonts: {regular: {fontFamily: fontsRegular(props)}},
                      colors: {
                        primary: primaryColor(props),
                        underlineColor: 'transparent',
                      },
                    }}
                    value={rowDetailsState.roles}
                    editable={false}
                    style={{
                      backgroundColor: colors.staticWhiteColor,
                      marginHorizontal: 10,
                      fontSize: 14,
                      height: 56,
                      marginVertical: 10,
                    }}
                  />
                </View>
              )}

              <KeyboardAvoidingView
                behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={
                  Platform.OS == 'android'
                    ? dataSource?.length * -300
                    : dataSource?.length > 6
                    ? dataSource?.length * -66
                    : 0
                }
                enabled>
                <ScrollView>
                  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    {/* dataSource */}
                    {/* {data?.form &&
              data?.form.map((item, index) => <FormElement data={item} />)} */}
                    <View>
                      {dataSource &&
                        dataSource.map((item, index) => (
                          <FormElement
                            key={item.id}
                            data={item}
                            themeData={props}
                            changedValues={changeText}
                            isRequiredFieldsFilled={checkRequiredFields}
                          />
                        ))}
                    </View>
                  </TouchableWithoutFeedback>
                </ScrollView>
              </KeyboardAvoidingView>
            </ScrollView>
          </View>
          {selectMenuItem?.mappedBy &&
            screenNumber === numberOfScreens &&
            selectMenuItem?.hasApprovalOnScreens && (
              <View
                style={{
                  height: '10%',
                  width: '100%',
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                  marginTop: 10,
                }}>
                <TouchableOpacity
                  style={{
                    height: 60,
                    // backgroundColor: "#50BFB7",
                    width: '45%',
                    // marginBottom: 15,
                    // marginLeft: 10,
                    borderColor: rejectButton
                      ? colors.staticRedColor
                      : colors.staticGrayColor,
                    borderWidth: 1,
                    borderRadius: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={async () => {
                    await approveData(false);
                  }}>
                  <Text
                    style={{
                      color: rejectButton
                        ? colors.staticRedColor
                        : colors.staticGrayColor,
                      fontSize: 16,
                      fontWeight: '600',
                      fontFamily: fontsRegular(props),
                    }}>
                    REJECT
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    height: 60,
                    backgroundColor: approveButton
                      ? colors.staticGrayColor
                      : primaryColor(props),
                    width: '45%',
                    // marginBottom: 15,
                    // marginLeft: 10,
                    borderRadius: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={async () => {
                    await approveData(true);
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: '600',
                      fontFamily: fontsRegular(props),
                    }}>
                    APPROVE
                  </Text>
                </TouchableOpacity>
              </View>
            )}
        </View>

        <View
          style={{
            height: '10%',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            bottom: 10,
          }}>
          {checkRequiredFields ? (
            <View
              style={{
                height: 60,
                backgroundColor: R.colors.text.disabled,
                width: '95%',
                borderRadius: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={[
                  styles.submitText,
                  {
                    fontFamily: fontsRegular(props),
                    color: R.colors.white,
                  },
                ]}>
                {screenNumber == numberOfScreens ? 'Submit' : 'Next'}
              </Text>
            </View>
          ) : (
            <TouchableOpacity
              style={{
                height: 60,
                backgroundColor: R.colors.primary.main,
                width: '95%',
                borderRadius: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={async () => {
                screenNumber == numberOfScreens
                  ? isEditable != undefined
                    ? isEditable == false
                      ? goToHome()
                      : await submitData()
                    : await submitData()
                  : await submitData();
              }}>
              <Text
                style={[styles.submitText, {fontFamily: fontsRegular(props), color:"#fff"}]}>
                {screenNumber == numberOfScreens
                  ? isEditable != undefined
                    ? isEditable == false
                      ? 'Go to home'
                      : 'Submit'
                    : 'Submit'
                  : 'Next'}
              </Text> 
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.transparentColor,
  },
  header: {
    height: RA(50),
    width: '100%',
    // paddingTop: RA(30),
    // backgroundColor: "#FFFFFF",
    flexDirection: 'row',
  },
  backView: {
    // height: "100%",
    // width: "20%",

    justifyContent: 'center',
    alignItems: 'center',
  },
  textView: {
    height: '100%',
    width: '80%',
    justifyContent: 'center',
  },
  imageMenu: {
    height: 20,
    width: 20,
  },
  imageMenu1: {
    height: 40,
    width: 40,
  },
  headingText: {
    fontSize: 20,
    fontWeight: '500',
    marginLeft: 10,
  },
  calenderView: {
    height: 70,
    width: '95%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#0000001F',
    marginLeft: 10,
    marginTop: 20,
    flexDirection: 'row',
  },
  calenderTextinputs: {
    height: '100%',
    width: '80%',

    padding: 10,
    fontWeight: '300',
    fontSize: 20,
  },
  calenderImage: {
    height: '100%',
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageMenu: {
    height: 30,
    width: 30,
  },
  mapView: {
    height: '50%',
    width: '95%',

    marginLeft: 10,
    marginTop: 20,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: '#0000001F',
  },
  // locationButton: {
  //   height: 40,
  //   width: "50%",
  //   borderRadius: 10,
  //   borderColor: "#50BFB7",
  //   marginTop: 10,
  //   marginLeft: "47%",
  //   borderWidth: 1,
  //   justifyContent: "center",
  //   alignItems: "center",
  // },
  // buttonText: {
  //   fontSize: 20,
  //   fontWeight: "400",
  //   color: "#50BFB7",
  // },
  addressView: {
    height: '90%',
    width: '95%',
    padding: 10,

    marginLeft: 10,
    marginTop: 10,
  },
  addressNormalText: {
    fontWeight: '400',
    fontSize: 18,
  },
  addressBoldText: {
    fontWeight: '600',
    fontSize: 18,
  },
  // captureView: {
  //   height: "40%",
  //   width: "100%",
  //   borderRadius: 10,
  //   justifyContent: "center",
  //   alignItems: "center",
  //   borderColor: "#50BFB7",
  //   borderWidth: 1,
  //   marginTop: 8,
  // },
  // submitButton: {
  //   height: 60,
  //   backgroundColor: "#50BFB7",
  //   width: "95%",
  //   // marginBottom: 15,
  //   // marginLeft: 10,
  //   borderRadius: 10,
  //   justifyContent: "center",
  //   alignItems: "center",
  // },
  // approve_Button: {
  //   height: 60,
  //   backgroundColor: "#50BFB7",
  //   width: "45%",
  //   // marginBottom: 15,
  //   // marginLeft: 10,
  //   borderRadius: 10,
  //   justifyContent: "center",
  //   alignItems: "center",
  // },
  reject_Button: {
    height: 60,
    // backgroundColor: "#50BFB7",
    width: '45%',
    // marginBottom: 15,
    // marginLeft: 10,
    borderColor: '#B00020',
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // submitButton1: {
  //   height: 60,
  //   backgroundColor: "#50BFB7",
  //   width: "95%",
  //   marginTop: 20,
  //   marginLeft: 10,
  //   borderRadius: 10,
  //   justifyContent: "center",
  //   alignItems: "center",
  // },
  submitText: {
    fontSize: 20,
    fontWeight: '600',
  },
  submitText1: {
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 10,
  },
  dropdownStyles: {
    height: 60,
    width: '95%',

    marginTop: 20,
    marginLeft: 10,
    padding: 10,
  },
  profileView: {
    height: '100%',
    width: '30%',

    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  profileImage: {
    height: 30,
    width: 30,
    borderRadius: 20,
    marginRight: 7,
  },
  imageMenu: {
    height: 20,
    width: 20,
  },
  itemStyle: {
    padding: 10,
  },
  itemSeparatorStyle: {
    height: 0.5,
    width: '100%',
    backgroundColor: '#C8C8C8',
  },
});

export default ScreenBuilderContainer;

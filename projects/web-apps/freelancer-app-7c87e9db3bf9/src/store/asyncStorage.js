import AsyncStorage from "@react-native-async-storage/async-storage";

const asyncStorage = {};

// auth tokens
asyncStorage.getToken = async () => await AsyncStorage.getItem("AUTH_TOKEN");
asyncStorage.setToken = async (token) => await AsyncStorage.setItem("AUTH_TOKEN", token);
asyncStorage.setDynamicModuleToken = async (token) => await AsyncStorage.setItem("DYNAMIC_TOKEN", token);
asyncStorage.getDynamicModuleToken = async (token) => await AsyncStorage.getItem("DYNAMIC_TOKEN", token);
asyncStorage.removeToken = async () => await AsyncStorage.removeItem("AUTH_TOKEN");

// location
asyncStorage.getLocation = async () => await AsyncStorage.getItem("LOCATION");
asyncStorage.setLocation = async (location) => await AsyncStorage.setItem("LOCATION", JSON.stringify(location));
asyncStorage.removeLocation = async () => await AsyncStorage.removeItem("LOCATION");

// form-urlencoded
asyncStorage.getFormURLEncoded = async () => await AsyncStorage.getItem("form-urlencoded")
asyncStorage.setFormURLEncoded = async () => await AsyncStorage.setItem("form-urlencoded",'true')
asyncStorage.removeFormURLEncoded = async () => await AsyncStorage.removeItem("form-urlencoded")

//login data

asyncStorage.getProfileData = async () => await AsyncStorage.getItem('PROFILE_DATA');
asyncStorage.setProfileData = async (data) => await AsyncStorage.setItem('PROFILE_DATA',JSON.stringify(data));
asyncStorage.removeProfileData = async () => await AsyncStorage.removeItem('PROFILE_DATA');


//handle user type
asyncStorage.getUserType = async () => await AsyncStorage.getItem('USER_TYPE');
asyncStorage.setUserType = async (data) => await AsyncStorage.setItem('USER_TYPE',data);
asyncStorage.removeUserType = async () => await AsyncStorage.removeItem('USER_TYPE');

export { asyncStorage };

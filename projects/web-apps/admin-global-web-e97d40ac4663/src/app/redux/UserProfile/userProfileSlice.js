import { createSlice } from '@reduxjs/toolkit';
// import StatesData from "../../views/UserProfile/components/states.json";

var initialState =  {
    userProfileDetails : {
    "aadhar": "",
    "address": "",
    "area": "",
    "city": "",
    "country": "India",
        "dob": null,
    "email": "",
    "firstName": "",
    "fullName": "",
    "gender": "",
    "lastName": "",
    "pan": "",
    "phone": "",
    "pincode": "",
    "profileUrl": "",
    "state": "",
    },
    // STATES: StatesData,
    userProfileLogo: '',
    updateUserProfileLogo: '',
    states: [],
    cities: [],
}

const userProfileSlice = createSlice({
    name: 'userProfile',
    initialState,
    reducers: {
        setInitialState(state, action) { 
        },
        setUserProfileDetails(state, action) {
            state.userProfileDetails = action.payload;
        },
        setUserProfileLogo(state, action) {
            state.userProfileLogo = action.payload;
          },
        setUpdatedUserProfileLogo(state, action) {
            state.updateUserProfileLogo = action.payload;
        },
        setStatesData(state, action) {
            state.states = action.payload;
        },
        setCitiesData(state, action) {
            state.cities = action.payload;
        },
    }
})

export default userProfileSlice.reducer;

export const {
    setInitialState,
    setUserProfileDetails,
    setUserProfileLogo,
    setUpdatedUserProfileLogo,

    setStatesData,
    setCitiesData
} = userProfileSlice.actions;
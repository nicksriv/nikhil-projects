import { profileConstants } from "./profileConstants";

const profileActions = {};

profileActions.getProfile = () => ({
  type: profileConstants.PROFILE_SAGA,
});

profileActions.getVendorProfile = ()=>({
  type:profileConstants.VENDOR_USER_PROFILE_SAGA
})

export { profileActions };

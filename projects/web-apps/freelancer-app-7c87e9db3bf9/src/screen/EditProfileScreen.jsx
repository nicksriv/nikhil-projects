import React from "react";
import View from "../component/common/View";
import EditProfileContainer from "../container/EditProfile";

const EditProfileScreen = (props) => {
  return (
    <View flex={1}>
      <EditProfileContainer {...props}  />
    </View>
  );
};

export default EditProfileScreen;

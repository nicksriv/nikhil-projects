import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { profileActions } from "../../store/profile/profileActions";
import { searchJobActions } from "../../store/searchJob/searchJobActions";
import { commonActions } from "@app/store/common/commonActions";

const mapStateToProps = (state) => {
  return {
    profileData: state.profile.profileData,
    isLoading: state.profile.isLoading.profileData,
    skillsList: state.searchJobList.skillsList,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getProfileAction: profileActions.getProfile,
      getSkillsListAction: searchJobActions.getSkillsList,
      setToastAction: commonActions.setToast,
    },
    dispatch
  );

const EditProfileStore = (container) =>
  connect(mapStateToProps, mapDispatchToProps)(container);
export default EditProfileStore;

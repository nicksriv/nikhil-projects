import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { authActions } from "../../store/auth/authActions";

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      setAuthenticationAction: authActions.setAuthentication,
    },
    dispatch
  );

const SplashScreenStore = (container) =>
  connect(mapStateToProps, mapDispatchToProps)(container);
export default SplashScreenStore;
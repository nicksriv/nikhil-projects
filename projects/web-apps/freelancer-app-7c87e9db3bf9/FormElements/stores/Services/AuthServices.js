import { compose, hoistStatics } from "recompose";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
// import withSpinner from "../Components/withSpinner";
import * as authActions from "../Actions/auth";

const mapStateToProps = (state) => ({
    auth: state.dynamicModule.auth.login,
    loginredirect: state.dynamicModule.auth.loginredirect,
    loader: state.dynamicModule.loader.loader,
    error:state.dynamicModule.error.error
});

const ActionCreators = Object.assign({}, authActions);

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(ActionCreators, dispatch),
});

const container = compose(
    connect(mapStateToProps, mapDispatchToProps)
    // connect(mapStateToProps, {}),
    // withSpinner()
);

export default hoistStatics(container);

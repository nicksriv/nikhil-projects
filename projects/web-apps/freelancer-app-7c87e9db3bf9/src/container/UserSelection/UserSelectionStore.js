import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

const UserSelectionStore = Container =>
  connect(mapStateToProps, mapDispatchToProps)(Container);
export default UserSelectionStore;

import {connect} from 'react-redux';
import App from './app';
import {getAll} from '../actions/candidates_actions';

const mapDispatchToProps = (dispatch) => ({
  getAll: () => dispatch(getAll())
})

const AppContainer = connect(null, mapDispatchToProps)(App);

export default AppContainer;

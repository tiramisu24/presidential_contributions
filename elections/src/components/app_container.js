import {connect} from 'react-redux';
import App from './app';
import {getAll} from '../actions/candidates_actions';

const mapStateToProps = (state) => ({
  "candidates" : state.candidates
})

const mapDispatchToProps = (dispatch) => ({
  getAll: () => dispatch(getAll())
})

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppContainer;

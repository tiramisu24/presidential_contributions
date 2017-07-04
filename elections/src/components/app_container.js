import {connect} from 'react-redux';
import App from './app';
import {getAll,addCandidate, removeCandidate} from '../actions/candidates_actions';


const mapStateToProps = (state) => ({
  "candidates" : state.candidates
})

const mapDispatchToProps = (dispatch) => ({
  getAll: () => dispatch(getAll()),
  addCandidate: (candidate) => dispatch(addCandidate(candidate)),
  removeCandidate: (candidateName) => dispatch(removeCandidate(candidateName))
})

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppContainer;

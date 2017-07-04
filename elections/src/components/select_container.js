import {connect} from 'react-redux';
import Select from './select';
import {addCandidate, removeCandidate} from '../actions/candidates_actions';

const mapStateToProps = (state) => ({
  "candidates" : state.candidates
})

const mapDispatchToProps = (dispatch) => ({
  add: (candidate) => addCandidate(candidate),
  remove: (candidateName) => removeCandidate(candidateName)
})

const SelectContainer = connect(mapStateToProps, mapDispatchToProps)(Select);

export default SelectContainer;

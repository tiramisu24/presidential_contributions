import {connect} from 'react-redux';
import Select from './select';

const mapStateToProps = (state) => ({
  "candidates" : state.candidates
})

const mapDispatchToProps = (dispatch) => ({
  addCandidate: (candidate) => dispatch(addCandidate(candidate)),
  removeCandidate: (candidateName) => dispatch(removeCandidate(candidateName))
})

const SelectContainer = connect(mapStateToProps, mapDispatchToProps)(Select);

export default SelectContainer;

import {GET_ALL, ADD_CANDIDATE, REMOVE_CANDIDATE} from '../actions/candidates_actions';
import merge from 'lodash/merge';

const Candidates = (state={},action) => {
  let newCandidates = merge({}, state);
  switch(action.type){
    case GET_ALL:
      newCandidates = merge({}, action.candidates);
      return newCandidates;
    case ADD_CANDIDATE:
      newCandidates = merge({}, action.candidate);
      return newCandidates;
    case REMOVE_CANDIDATE:
      delete newCandidates[action.candidateName];
    default:
      return newCandidates;
  }
}

export default Candidates;

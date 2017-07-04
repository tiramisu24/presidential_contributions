import {GET_ALL} from '../actions/candidates_actions';
import merge from 'lodash/merge';

const Candidates = (state={},action) => {
  let newCandidates = merge({}, state);
  switch(action.type){
    case GET_ALL:
      console.log("actions", action.candidates);
      newCandidates = merge({}, action.candidates);
      return newCandidates;
    default:
      return newCandidates;
  }
}

export default Candidates;

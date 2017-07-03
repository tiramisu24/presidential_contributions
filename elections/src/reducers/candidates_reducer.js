import {GET_ALL} from '../actions/candidates_actions';
import merge from 'lodash/merge';

const Candidates = (state={},action) => {
  let newCandidates = merge({}, state);
  switch(action.type){
    case GET_ALL:
      newCandidates = merge(newCandidates, action.candidates)
    default:
      return newCandidates
  }
}

import {combineReducers} from 'redux';

import Candidates from './candidates_reducer';
import CandidateInfo from './candidate_info_reducer';
import ErrorsReducer from './errors_reducer';

const rootReducer = combineReducers({
  candidates: Candidates,
  candidate: CandidateInfo,
  errors: ErrorsReducer
})

export default rootReducer;

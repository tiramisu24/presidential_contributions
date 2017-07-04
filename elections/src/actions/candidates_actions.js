import * as Util from '../util/api_calls';
export const GET_ALL = "GET_ALL";
export const ADD_CANDIDATE = "ADD_CANDIDATE";
export const REMOVE_CANDIDATE = "REMOVE_CANDIDATE";
export const RECEIVE_ERRORS = 'RECEIVE_ERRORS';
export const CLEAR_ERRORS = 'CLEAR_ERRORS';


export const receiveErrors = (errors) => ({
  type: RECEIVE_ERRORS,
  errors
})

export const clearErrors = () => ({
  type: CLEAR_ERRORS
})

const getAllCandidateInfo = (candidates) => ({
  type: GET_ALL,
  candidates
})
const addCandidate = (candidate) => ({
  type: ADD_CANDIDATE,
  candidate
})
const removeCandidate = (candidate) => ({
  type: REMOVE_CANDIDATE,
  candidate
})


export const getAll = () => dispatch => {
  return Util.getAllCandidateInfo()
             .then(candidates => dispatch(getAllCandidateInfo(candidates)))
}

import { combineReducers } from 'redux';
import * as api from '../utils/api';

// ------------------------------------
// Constants
// ------------------------------------
export const FETCH_PEOPLE = 'FETCH_PEOPLE';

// ------------------------------------
// Actions
// ------------------------------------
export const fetchPeople = () => {
  return (dispatch, getState) => {
    return api.fetchPeople(data => {
      dispatch({ type: FETCH_PEOPLE, data });
    });
  };
};

// export const actions = {};

// ------------------------------------
// Reducer
// ------------------------------------

function people(state = [], action) {
  switch (action.type) {
    case FETCH_PEOPLE:
      return action.data;
    default:
      return state;
  }
}

const lunchReducer = combineReducers({
  people,
});

export const getPeople = state => state.lunch.people;

export default lunchReducer;

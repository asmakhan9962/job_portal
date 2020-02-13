import {
  ADD_JOB, DELETE_JOB, UPDATE_JOB, GET_JOBS,
  JOB_ERROR, CLEAR_JOBS, SET_CURRENT, CLEAR_CURRENT,
  FILTER_ITEMS, CLEAR_FILTER
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_JOBS:
      return {
        ...state,
        jobs: action.payload,
        loading: false
      };
    case ADD_JOB:
      return {
        ...state,
        jobs: [...state.jobs, action.payload],
        loading: false
      };
    case UPDATE_JOB:
      return {
        ...state,
        jobs: state.jobs.map(job =>
          job._id === action.payload._id ? action.payload : job
        ),
        loading: false
      };
    case DELETE_JOB:
      return {
        ...state,
        jobs: state.jobs.filter(
          job => job._id !== action.payload
        ),
        loading: false
      };
    case CLEAR_JOBS:
      return {
        ...state,
        jobs: null,
        error: null,
        current: null
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null
      };
    case FILTER_ITEMS:
      return {
        ...state,
        filtered: state.jobs.filter(job => {
          const regex = new RegExp(`${action.payload}`, 'gi');
          return job.title.match(regex);
        })
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null
      };
    case JOB_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
}
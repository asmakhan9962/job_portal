import {
  ADD_CATEGORY, DELETE_CATEGORY, UPDATE_CATEGORY,
  CATEGORY_ERROR, GET_CATEGORIES, CLEAR_CATEGORIES, SET_CURRENT,
  CLEAR_CURRENT, FILTER_ITEMS, CLEAR_FILTER
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
        loading: false
      };
    case ADD_CATEGORY:
      return {
        ...state,
        categories: [...state.categories, action.payload],
        loading: false
      };
    case UPDATE_CATEGORY:
      return {
        ...state,
        categories: state.categories.map(category =>
          category._id === action.payload._id ? action.payload : category
        ),
        loading: false
      };
    case DELETE_CATEGORY:
      return {
        ...state,
        categories: state.categories.filter(
          category => category._id !== action.payload
        ),
        loading: false
      };
    case CLEAR_CATEGORIES:
      return {
        ...state,
        categories: null,
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
        filtered: state.categories.filter(category => {
          const regex = new RegExp(`${action.payload}`, 'gi');
          return category.title.match(regex);
        })
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null
      };
    case CATEGORY_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
}
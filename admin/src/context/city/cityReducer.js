import {
  ADD_CITY, DELETE_CITY, UPDATE_CITY, GET_CITIES,
  CITY_ERROR, CLEAR_CITIES, SET_CURRENT, CLEAR_CURRENT,
  FILTER_ITEMS, CLEAR_FILTER
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_CITIES:
      return {
        ...state,
        cities: action.payload,
        loading: false
      };
    case ADD_CITY:
      return {
        ...state,
        cities: [...state.cities, action.payload],
        loading: false
      };
    case UPDATE_CITY:
      return {
        ...state,
        cities: state.cities.map(city =>
          city._id === action.payload._id ? action.payload : city
        ),
        loading: false
      };
    case DELETE_CITY:
      return {
        ...state,
        cities: state.cities.filter(
          city => city._id !== action.payload
        ),
        loading: false
      };
    case CLEAR_CITIES:
      return {
        ...state,
        cities: null,
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
        filtered: state.cities.filter(city => {
          const regex = new RegExp(`${action.payload}`, 'gi');
          return city.city.match(regex) || city.country.match(regex);
        })
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null
      };
    case CITY_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
}
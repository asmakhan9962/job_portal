import React, { useReducer } from 'react';
import axios from 'axios';
import CityContext from './cityContext';
import cityReducer from './cityReducer';
import {
  ADD_CITY, DELETE_CITY, UPDATE_CITY, GET_CITIES,
  CITY_ERROR, CLEAR_CITIES, SET_CURRENT, CLEAR_CURRENT,
  FILTER_ITEMS, CLEAR_FILTER
} from '../types';


const CityState = (props) => {
  const initialState = {
    cities: [],
    current: null,
    error: null,
    filtered: null,
    loading: true
  };

  const [state, dispatch] = useReducer(cityReducer, initialState);

  // Get Categories
  const getCities = async () => {
    try {
      const res = await axios.get('/api/cities');
      // @ts-ignore
      dispatch({
        type: GET_CITIES,
        payload: res.data
      });
    } catch (err) {
      // @ts-ignore
      dispatch({
        type: CITY_ERROR,
        payload: err.response.msg
      });
    }
  };
  // Add City
  const addCity = async city => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post('/api/cities', city, config);
      // @ts-ignore
      dispatch({
        type: ADD_CITY,
        payload: res.data
      });
    } catch (err) {
      // @ts-ignore
      dispatch({
        type: CITY_ERROR,
        payload: err.response.msg
      });
    }
  };

  // Update City
  const updateCity = async city => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.put(
        `/api/cities/${city._id}`,
        city,
        config
      );
      // @ts-ignore
      dispatch({
        type: UPDATE_CITY,
        payload: res.data
      });
    } catch (err) {
      // @ts-ignore
      dispatch({
        type: CITY_ERROR,
        payload: err.response.msg
      });
    }
  };

  // Delete City
  const deleteCity = async id => {
    try {
      await axios.delete(`/api/cities/${id}`);
      // @ts-ignore
      dispatch({
        type: DELETE_CITY,
        payload: id
      });
    } catch (err) {
      // @ts-ignore
      dispatch({
        type: CITY_ERROR,
        payload: err.response.msg
      });
    }
  };

  // Clear Category
  const clearCities = () => {
    // @ts-ignore
    dispatch({ type: CLEAR_CITIES });
  };

  // Set Current Category
  const setCurrent = category => {
    // @ts-ignore
    dispatch({ type: SET_CURRENT, payload: category });
  };

  // Clear Current Category
  const clearCurrent = () => {
    // @ts-ignore
    dispatch({ type: CLEAR_CURRENT });
  };

  // Filter Category
  // @ts-ignore
  const filterCities = text => {
    // @ts-ignore
    dispatch({ type: FILTER_ITEMS, payload: text });
  };

  // Clear Filter
  // @ts-ignore
  const clearFilter = () => {
    // @ts-ignore
    dispatch({ type: CLEAR_FILTER });
  };


  return <CityContext.Provider
    value={{
      cities: state.cities,
      error: state.error,
      filtered: state.filtered,
      current: state.current,
      loading: state.loading,
      getCities,
      addCity,
      updateCity,
      deleteCity,
      clearCities,
      setCurrent,
      clearCurrent,
      filterCities,
      clearFilter
    }}>
    {props.children}</CityContext.Provider>
};

export default CityState;


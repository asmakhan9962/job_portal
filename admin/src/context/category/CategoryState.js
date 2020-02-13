import React, { useReducer } from 'react';
import axios from 'axios';
import CategoryContext from './categoryContext';
import categoryReducer from './categoryReducer';
import {
  ADD_CATEGORY, DELETE_CATEGORY, UPDATE_CATEGORY, GET_CATEGORIES,
  CATEGORY_ERROR, CLEAR_CATEGORIES, SET_CURRENT, CLEAR_CURRENT,
  FILTER_ITEMS, CLEAR_FILTER
} from '../types';


const CategoryState = (props) => {
  const initialState = {
    categories: [],
    current: null,
    error: null,
    filtered: null,
    loading: true
  };

  const [state, dispatch] = useReducer(categoryReducer, initialState);

  // Get Categories
  const getCategories = async () => {
    try {
      const res = await axios.get('/api/categories');
      // @ts-ignore
      dispatch({
        type: GET_CATEGORIES,
        payload: res.data
      });
    } catch (err) {
      // @ts-ignore
      dispatch({
        type: CATEGORY_ERROR,
        payload: err.response.msg
      });
    }
  };
  // Add Category
  const addCategory = async category => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post('/api/categories', category, config);
      // @ts-ignore
      dispatch({
        type: ADD_CATEGORY,
        payload: res.data
      });
    } catch (err) {
      // @ts-ignore
      dispatch({
        type: CATEGORY_ERROR,
        payload: err.response.msg
      });
    }
  };

  // Update Category
  const updateCategory = async category => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.put(
        `/api/categories/${category._id}`,
        category,
        config
      );
      // @ts-ignore
      dispatch({
        type: UPDATE_CATEGORY,
        payload: res.data
      });
    } catch (err) {
      // @ts-ignore
      dispatch({
        type: CATEGORY_ERROR,
        payload: err.response.msg
      });
    }
  };

  // Delete Category
  const deleteCategory = async id => {
    try {
      await axios.delete(`/api/categories/${id}`);
      // @ts-ignore
      dispatch({
        type: DELETE_CATEGORY,
        payload: id
      });
    } catch (err) {
      // @ts-ignore
      dispatch({
        type: CATEGORY_ERROR,
        payload: err.response.msg
      });
    }
  };

  // Clear Category
  const clearCategories = () => {
    // @ts-ignore
    dispatch({ type: CLEAR_CATEGORIES });
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
  const filterCategories = text => {
    // @ts-ignore
    dispatch({ type: FILTER_ITEMS, payload: text });
  };

  // Clear Filter
  // @ts-ignore
  const clearFilter = () => {
    // @ts-ignore
    dispatch({ type: CLEAR_FILTER });
  };


  return <CategoryContext.Provider
    value={{
      categories: state.categories,
      error: state.error,
      filtered: state.filtered,
      current: state.current,
      loading: state.loading,
      getCategories,
      addCategory,
      updateCategory,
      deleteCategory,
      clearCategories,
      setCurrent,
      clearCurrent,
      filterCategories,
      clearFilter
    }}>
    {props.children}</CategoryContext.Provider>
};

export default CategoryState;


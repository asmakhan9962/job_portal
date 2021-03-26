import React, { useReducer } from 'react';
import axios from 'axios';
import JobContext from './jobContext';
import jobReducer from './jobReducer';
import {
  ADD_JOB, DELETE_JOB, UPDATE_JOB, GET_JOBS,
  JOB_ERROR, CLEAR_JOBS, SET_CURRENT, CLEAR_CURRENT,
  FILTER_ITEMS, CLEAR_FILTER, GET_FEATRUED
} from '../types';


const JobState = (props) => {
  const initialState = {
    jobs: [],
    current: null,
    error: null,
    filtered: null,
    featured: [],
    loading: true
  };

  const [state, dispatch] = useReducer(jobReducer, initialState);

  // Get Jobs
  const getJobs = async () => {
    try {
      const res = await axios.get('/api/jobs');
      // @ts-ignore
      dispatch({
        type: GET_JOBS,
        payload: res.data
      });
    } catch (err) {
      // @ts-ignore
      dispatch({
        type: JOB_ERROR,
        payload: err.response.msg
      });
    }
  };
  // Get Featred Jobs
  const getFeatredJobs = async () => {
    try {
      const res = await axios.get('/api/jobs/ft/jobs');
      // @ts-ignore
      dispatch({
        type: GET_FEATRUED,
        payload: res.data
      });
    } catch (err) {
      // @ts-ignore
      dispatch({
        type: JOB_ERROR,
        payload: err.response.msg
      });
    }
  };
  // Add Job
  const addJob = async (job) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post('/api/jobs', job, config);
      // @ts-ignore
      dispatch({
        type: ADD_JOB,
        payload: res.data
      });
    } catch (err) {
      // @ts-ignore
      dispatch({
        type: JOB_ERROR,
        payload: err.response.msg
      });
    }
  };

  // Update Job
  const updateJob = async (job) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.put(
        `/api/jobs/${job._id}`,
        job,
        config
      );
      // @ts-ignore
      dispatch({
        type: UPDATE_JOB,
        payload: res.data
      });
    } catch (err) {
      // @ts-ignore
      dispatch({
        type: JOB_ERROR,
        payload: err.response.msg
      });
    }
  };

  // Delete Job
  const deleteJob = async (id) => {
    try {
      await axios.delete(`/api/jobs/${id}`);
      // @ts-ignore
      dispatch({
        type: DELETE_JOB,
        payload: id
      });
    } catch (err) {
      // @ts-ignore
      dispatch({
        type: JOB_ERROR,
        payload: err.response.msg
      });
    }
  };

  // Clear Job
  const clearJobs = () => {
    // @ts-ignore
    dispatch({ type: CLEAR_JOBS });
  };

  // Set Current Job
  const setCurrent = (job) => {
    // @ts-ignore
    dispatch({ type: SET_CURRENT, payload: job });
  };

  // Clear Current Job
  const clearCurrent = () => {
    // @ts-ignore
    dispatch({ type: CLEAR_CURRENT });
  };

  // Filter Job
  // @ts-ignore
  const filterJobs = (text) => {
    // @ts-ignore
    dispatch({ type: FILTER_ITEMS, payload: text });
  };

  // Clear Filter
  // @ts-ignore
  const clearFilter = () => {
    // @ts-ignore
    dispatch({ type: CLEAR_FILTER });
  };


  return <JobContext.Provider
    value={{
      jobs: state.jobs,
      error: state.error,
      filtered: state.filtered,
      featured: state.featured,
      current: state.current,
      loading: state.loading,
      getJobs,
      addJob,
      updateJob,
      deleteJob,
      clearJobs,
      setCurrent,
      clearCurrent,
      filterJobs,
      clearFilter,
      getFeatredJobs
    }}>
    {props.children}</JobContext.Provider>
};

export default JobState;


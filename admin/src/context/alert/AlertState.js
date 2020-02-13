import React, { useReducer } from 'react';
import alertContext from './alertContext';
import alertReducer from './alertReducer';
import uuid from 'uuid';
import { REMOVE_ALERT, SET_ALERT } from '../types';

const AlertState = (props) => {
  const initialState = [];

  const [state, dispatch] = useReducer(alertReducer, initialState);

  // Set Alert
  const setAlert = (msg, type, timeout = 5000) => {
    const id = uuid.v4();
    // @ts-ignore
    dispatch({
      type: SET_ALERT,
      payload: { msg, type, id }
    });

    // @ts-ignore
    setTimeout(() => dispatch({
      type: REMOVE_ALERT,
      payload: id
    }), timeout);
  }

  // Remove Alert

  return <alertContext.Provider
    value={{
      alerts: state,
      setAlert

    }}>
    {props.children}</alertContext.Provider>
};

export default AlertState;


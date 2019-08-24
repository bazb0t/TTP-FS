import axios from 'axios';
import history from '../history';

// Action Types
const GET_USER = 'GET_USER';
const REMOVE_USER = 'REMOVE_USER';

// Initial State
const defaultUser = {};

// Action Creators
const getUser = user => ({ type: GET_USER, user });
const removeUser = () => ({ type: REMOVE_USER });

// Thunk Creators
export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me');
    dispatch(getUser(res.data || defaultUser));
  } catch (err) {
    console.error(err);
  }
};

export const auth = (email, password, method, name) => async dispatch => {
  let res = {};
  try {
      res = await axios.post(`/auth/${method}`, { name, email, password });
    try {
      dispatch(getUser(res.data));
      history.push('/');
    } catch (dispatchOrHistoryErr) {
      console.error(dispatchOrHistoryErr);
    }
  } catch (authError) {
    return dispatch(getUser({ error: authError }));
  }
};

export const logout = () => async dispatch => {
  try {
    await axios.post(`/auth/logout`);
    dispatch(removeUser());
    history.push('/')
  } catch (err) {
    console.error(err);
  }
};

// Reducer
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user;
    case REMOVE_USER:
      return defaultUser;
    default:
      return state;
  }
}

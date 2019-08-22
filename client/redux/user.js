import axios from 'axios';

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

export const auth = (name, email, password, method) => async dispatch => {
  console.log('in user reducer! method is:', method);
  let res = {};
  try {
    if (method === 'signup') {
      res = await axios.post(`/auth/signup`, { name, email, password });
    } else if (method === 'login') {
      res = await axios.post(`/auth/login`, { email, password });
    }
  } catch (authError) {
    return dispatch(getUser({ error: authError }));
  }
};

export const logout = () => async dispatch => {
  try {
    await axios.post(`/auth/logout`);
    dispatch(removeUser());
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

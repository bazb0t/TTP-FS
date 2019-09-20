import axios from 'axios';
import publicIEXtoken from './store';


/**
 * ACTION TYPES
 */
const GOT_ASSETS = 'GOT_ASSETS';

/**
 * INITIAL STATE
 */
const initialState = {
  assets: [],
};

/**
 * ACTION CREATORS
 */
const gotAssets = assets => ({ type: GOT_ASSETS, assets });


/**
 * THUNK CREATORS
 */
export const getAssets = id => async dispatch => {
  try {
    const { data } = await axios.get(`/api/assets/${id}`);
    return dispatch(gotAssets(data));
  } catch (err) {
    console.error(err);
  }
};

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_ASSETS:
      return { ...state, assets: action.assets };
    default:
      return state;
  }
}

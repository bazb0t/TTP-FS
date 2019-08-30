import axios from 'axios';

/**
 * ACTION TYPES
 */
const GOT_ASSETS = 'GOT_ASSETS';

/**
 * INITIAL STATE
 */
const assets = [];

/**
 * ACTION CREATORS
 */
const gotAssets = assets => ({ type: GOT_ASSETS, assets });

/**
 * THUNK CREATORS
 */
export const getAssets = id => async dispatch => {
  try {
    const {data} = await axios.get(`/api/assets/${id}`);
    return dispatch(gotAssets(data));
  } catch (err) {
    console.error(err);
  }
};

/**
 * REDUCER
 */
export default function(state = assets, action) {
  switch (action.type) {
    case GOT_ASSETS:
      return action.assets;
    default:
      return state;
  }
}

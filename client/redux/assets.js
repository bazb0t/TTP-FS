import axios from 'axios';
const publicIEXtoken = 'pk_f0ccf989fe1c4b18b384149db931a243';

/**
 * ACTION TYPES
 */
const GOT_ASSETS = 'GOT_ASSETS';
const GOT_CHANGE = 'GOT_CHANGE';

/**
 * INITIAL STATE
 */
const initialState = {
  assets: [],
  change: 0,
};

/**
 * ACTION CREATORS
 */
const gotAssets = assets => ({ type: GOT_ASSETS, assets });
const gotChange = change => {
  return { type: GOT_CHANGE, change};
};

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

export const getChange = tickerSymbol => async dispatch => {
  try {
    let stockChange = await axios.get(
      `https://cloud.iexapis.com/stable/stock/${tickerSymbol}/quote/change?token=${publicIEXtoken}`
    );
    return dispatch(gotChange(stockChange.data));
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
    case GOT_CHANGE:
      return { ...state, change: action.change };
    default:
      return state;
  }
}

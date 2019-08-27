import axios from 'axios';

/**
 * ACTION TYPES
 */
const SUMMED_ASSETS = 'SUMMED_ASSETS';

/**
 * INITIAL STATE
 */

const sumValue = 0;

/**
 * ACTION CREATORS
 */
const summedAssets = sumValue => ({ type: SUMMED_ASSETS, sumValue });

/**
 * THUNK CREATORS
 */

export const sumValueTotals = assets => async dispatch => {
  try {
    let sumValue = 0;
    for (let asset = 0; asset < assets.length; asset++) {
      sumValue = Number(sumValue) + Number(assets[asset].totalValue);
      return dispatch(summedAssets(sumValue));
    }
  } catch (err) {
    console.error(err);
  }
};

export const sumAssets = id => async dispatch => {
  try {
    const { data } = await axios.get(`/api/assets/${id}`);
    return dispatch(sumValueTotals(data));
  } catch (err) {
    console.error(err);
  }
};

/**
 * REDUCER
 */
export default function(state = sumValue, action) {
  switch (action.type) {
    case SUMMED_ASSETS:
      return action.sumValue;
    default:
      return state;
  }
}

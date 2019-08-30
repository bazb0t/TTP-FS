import axios from 'axios';

/**
 * ACTION TYPES
 */
const SUMMED_ASSETS = 'SUMMED_ASSETS';

/**
 * INITIAL STATE
 */

const sumAssets = 0;

/**
 * ACTION CREATORS
 */
const summedAssets = summedValue => ({ type: SUMMED_ASSETS, summedValue });

/**
 * THUNK CREATORS
 */

export const sumUpTotals = assets => dispatch => {
  try {
    let summedValue = 0;
    for (let asset in assets) {
      summedValue = Number(summedValue) + Number(assets[asset].totalValue);
    }
    return dispatch(summedAssets(summedValue));
  } catch (err) {
    console.error(err);
  }
};

export const getSumAssets = id => async dispatch => {
  try {
    const { data } = await axios.get(`/api/assets/${id}`);
    return dispatch(sumUpTotals(data));
  } catch (err) {
    console.error(err);
  }
};

/**
 * REDUCER
 */
export default function(state = sumAssets, action) {
  switch (action.type) {
    case SUMMED_ASSETS:
      return action.summedValue;
    default:
      return state;
  }
}

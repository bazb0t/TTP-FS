import axios from 'axios';

/**
 * ACTION TYPES
 */
const GOT_TRANSACTIONS = 'GOT_TRANSACTIONS';

/**
 * INITIAL STATE
 */
const transactions = [];

/**
 * ACTION CREATORS
 */
const gotTransactions = transactions => ({ type: GOT_TRANSACTIONS, transactions });

/**
 * THUNK CREATORS
 */
export const getTransactions = id => async dispatch => {
  try {
    const {data} = await axios.get(`/api/transactions/${id}`);
    return dispatch(gotTransactions(data));
  } catch (err) {
    console.error(err);
  }
};

/**
 * REDUCER
 */
export default function(state = transactions, action) {
  switch (action.type) {
    case GOT_TRANSACTIONS:
      return action.transactions;
    default:
      return state;
  }
}

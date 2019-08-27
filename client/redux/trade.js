import axios from 'axios';
const publicIEXtoken = 'pk_f0ccf989fe1c4b18b384149db931a243';

// Action Types
// const GET_USER = 'GET_USER';

// Initial State
const defaultState = {};

// Action Creators
// const getUser = user => ({ type: GET_USER, user });

// Thunk Creators
export const logTransaction = (user, quote, qty, method) => async dispatch => {
  // update transactions
  await axios.post(`/api/transactions`, {
    tickerSymbol: quote.data.symbol,
    price: Number(quote.data.latestPrice),
    qty: Number(qty),
    method: method,
    userId: user.id
  });
};

export const buyShares = (user, quote, qty, method) => async dispatch => {
  try {
    // check/update user cash balance
    const subtotal = Number(qty) * Number(quote.data.latestPrice);
    let newBalance = user.cash - subtotal;
    if (newBalance < 0) {
      console.error(`You don't have enough money to buy these assets.`);
    } else if (newBalance > 0) {
      await axios.put(`/api/users/${user.id}`, { cash: newBalance });

      // look for tickerSymbol in user's assets
      let assets = await axios.get(`/api/assets/${user.id}`);
      let asset = await axios.get(
        `/api/assets/${user.id}/${quote.data.symbol}`
      );
      // No asset: add
      if (!assets.data.length || !asset.data) {
        await axios.post(`/api/assets/${user.id}`, {
          tickerSymbol: quote.data.symbol,
          qty,
          totalValue: subtotal
        });
      } else {
        //   // Asset: update
        const newQty = Number(asset.data.qty) + Number(qty);
        const newValue = newQty * Number(quote.data.latestPrice);
        await axios.put(`/api/assets/${user.id}`, {
          tickerSymbol: quote.data.symbol,
          qty: newQty,
          totalValue: newValue
        });
      }
      dispatch(logTransaction(user, quote, qty, method));
    }
  } catch (err) {
    console.error(err);
  }
};

export const sellShares = (user, quote, qty, method) => async dispatch => {
  // look for tickerSymbol in user's assets
  try {
    const asset = await axios.get(
      `/api/assets/${user.id}/${quote.data.symbol}`
    );
    if (!asset.data) {
      console.error(`You do not own this asset!`);
    } else if (asset.data.qty < qty) {
      console.error(
        `You only have ${asset.data.qty} shares of this asset to sell.`
      );
    } else {
      const newQty = Number(asset.data.qty) - Number(qty);
      const newValue = Number(quote.data.latestPrice) * newQty;
      await axios.put(`/api/assets/${user.id}`, {
        qty: newQty,
        tickerSymbol: quote.data.symbol,
        totalValue: newValue
      });

      // update user cash balance
      let newBalance =
        Number(user.cash) + Number(qty) * Number(quote.data.latestPrice);
      await axios.put(`/api/users/${user.id}`, { cash: newBalance });
      dispatch(logTransaction(user, quote, qty, method));
    }
  } catch (err) {
    console.error(err);
  }
};

export const transact = (user, tickerSymbol, qty, method) => async dispatch => {
  // validate whole num of shares
  if (qty < 0 || qty % 1 !== 0) {
    console.error(
      `Shares must be traded in whole number quantities greater than zero.`
    );
  }
  // check for valid ticker symbol; error if invalid
  try {
    let isStock = await axios.get(
      `https://api.iextrading.com/1.0/tops?symbols=${tickerSymbol}`
    );
    if (isStock.status !== 200) {
      let unkSym = new Error(
        `Ticker Symbol not in IEX. Please review https://iextrading.com/trading/eligible-symbols/ and try again.`
      );
      console.error(unkSym);
      // everything valid? keep going!
    } else {
      let quote = await axios.get(
        `https://cloud.iexapis.com/stable/stock/${tickerSymbol}/quote?token=${publicIEXtoken}`
      );
      if (method === 'buy') {
        dispatch(buyShares(user, quote, qty, method));
      } else {
        dispatch(sellShares(user, quote, qty, method));
      }
    }
  } catch (err) {
    console.error(err);
  }
};

// Reducer
export default function(state = defaultState, action) {
  switch (action.type) {
    //     case GET_USER:
    //       return action.user;
    //     case REMOVE_USER:
    //       return defaultUser;
    default:
      return state;
  }
}

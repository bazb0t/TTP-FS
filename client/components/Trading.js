import React from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { transact } from '../redux/store';

// Component
const Trading = props => {
  const { user, handleSubmit, error } = props;

  return (
    <div>
      <h4>Cash: ${user.cash}</h4>
      <form onSubmit={() => handleSubmit(event, props.user)} name={name}>
        <select name='method'>
          <option selected value='buy'>
            BUY
          </option>
          <option value='sell'>SELL</option>
        </select>
        <div>
          <label htmlFor='tickerSymbol'>
            <small>Symbol</small>
          </label>
          <input name='tickerSymbol' type='text' />
  {/* put latest price here: latestPrice ? `price: ${latestPrice}` : <></> */}
        </div>
        <div>
          <label htmlFor='qty'>
            <small>Quantity</small>
          </label>
          <input name='qty' type='number' />
            {/* put subtotal here: latestPrice ? `total: ${latestPrice * qty}` : <></> */}
        </div>
        <div>
          <button type='submit'>TRADE</button>
        </div>
        {error && error.response && <div> {error.response.data}</div>}
      </form>
    </div>
  );
};

// Container
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    user: state.user,
    error: state.user.error
  };
};

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt, user) {
      evt.preventDefault();
      const tickerSymbol = evt.target.tickerSymbol.value;
      const qty = evt.target.qty.value;
      const method = evt.target.method.value;
      dispatch(transact(user, tickerSymbol, qty, method));
    }
  };
};

export default connect(
  mapState,
  mapDispatch
)(Trading);

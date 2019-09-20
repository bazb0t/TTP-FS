import React from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { transact } from '../redux/store';

// Component
const Trading = props => {
  const { user, handleSubmit, error } = props;

  return (
    <div className='Trading__container'>
      <h4>Cash: ${user.cash}</h4>
      <div className='tradeForm'>
        <form onSubmit={() => handleSubmit(event, props.user)} name={name}>
          <select name='method' className='tradeForm'>
            <option value='buy'>BUY</option>
            <option value='sell'>SELL</option>
          </select>
          <div>
            <input
              name='tickerSymbol'
              type='text'
              placeholder='SYMBOL'
              className='tradeForm'
              required
            />
          </div>
          <div>
            <input
              name='qty'
              type='number'
              placeholder='QUANTITY'
              className='tradeForm'
              required
            />
          </div>
          <div>
            <button type='submit' className='tradeForm'>
              TRADE
            </button>
          </div>
          {error && error.response && <div> {error.response.data}</div>}
        </form>
      </div>
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

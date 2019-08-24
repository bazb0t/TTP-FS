import React from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { auth } from '../redux/store';

// Component
const Trading = props => {
  const { name, handleSubmit, error, isLoggedIn } = props;

  return (
    <div>
          <form onSubmit={handleSubmit} name={name}>
            <div>
              <label htmlFor='tickerSymbol'>
                <small>Symbol</small>
              </label>
              <input name='tickerSymbol' type='text' />
            </div>
            <div>
              <label htmlFor='qty'>
                <small>Quantity</small>
              </label>
              <input name='qty' type='number' />
            </div>
            <div>
              <button type='submit'>BUY</button>
            </div>
            {error && error.response && <div> {error.response.data}</div>}
          </form>
    </div>)
};

// Container
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    name: 'login',
    error: state.user.error
  };
};

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const formName = evt.target.name;
      const userName = evt.target.userName ? evt.target.userName.value : null;
      const email = evt.target.email.value;
      const password = evt.target.password.value;
      dispatch(auth(email, password, formName, userName));
    }
  };
};

export default connect(
  mapState,
  mapDispatch
)(Trading);

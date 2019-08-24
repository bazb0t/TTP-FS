import React from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { auth } from '../redux/store';

// Component
const AuthForm = props => {
  const { name, displayName, handleSubmit, error, isLoggedIn } = props;

  return (
    <div>
      {isLoggedIn ? (
        <Redirect to='/' />
      ) : (
        <div>
          <h2>{displayName}</h2>
          <form onSubmit={handleSubmit} name={name}>
            {displayName === 'Register' ? (
              <div>
                <label htmlFor='userName'>
                  <small>Name</small>
                </label>
                <input name='userName' type='text' />
              </div>
            ) : (
              <></>
            )}
            <div>
              <label htmlFor='email'>
                <small>Email</small>
              </label>
              <input name='email' type='text' />
            </div>
            <div>
              <label htmlFor='password'>
                <small>Password</small>
              </label>
              <input name='password' type='password' />
            </div>
            <div>
              <button type='submit'>{displayName}</button>
            </div>
            {error && error.response && <div> {error.response.data}</div>}
          </form>
          <Link to={name === 'signup' ? `/login` : `/signup`}>
            {displayName === 'Register' ? 'Sign In' : 'Register'}
          </Link>
        </div>
      )}
    </div>
  );
};

// Container
const mapLogin = state => {
  return {
    isLoggedIn: !!state.user.id,
    name: 'login',
    displayName: 'Sign In',
    error: state.user.error
  };
};

const mapSignup = state => {
  return {
    isLoggedIn: !!state.user.id,
    name: 'signup',
    displayName: 'Register',
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

export const Signup = connect(
  mapSignup,
  mapDispatch
)(AuthForm);

export const Login = connect(
  mapLogin,
  mapDispatch
)(AuthForm);

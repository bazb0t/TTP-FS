import React from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { auth } from '../redux/store';

// Component
const AuthForm = props => {
  const { name, displayName, handleSubmit, error, isLoggedIn } = props;

  return (
    <div className='authContainer'>
      {isLoggedIn ? (
        <Redirect to='/' />
      ) : (
        <div>
          <h3>{displayName}</h3>
          <div className='authForm'>
            <form onSubmit={handleSubmit} name={name}>
              {displayName === 'REGISTER' ? (
                <div>
                  <input
                    name='userName'
                    type='text'
                    placeholder='NAME'
                    className='authForm'
                  />
                </div>
              ) : (
                <></>
              )}
              <div>
                <input
                  name='email'
                  type='text'
                  placeholder='EMAIL'
                  className='authForm'
                />
              </div>
              <div>
                <input
                  name='password'
                  type='password'
                  placeholder='PASSWORD'
                  className='authForm'
                />
              </div>
              <div>
                <button type='submit' className='authForm'>
                  {displayName}
                </button>
              </div>
              {error && error.response && <div> {error.response.data}</div>}
            </form>
            <h6>
              <Link to={name === 'signup' ? `/login` : `/signup`}>
                <em>
                  {displayName === 'REGISTER'
                    ? 'Registered? SIGN IN'
                    : 'No account? REGISTER'}
                </em>
              </Link>
            </h6>
          </div>
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
    displayName: 'SIGN IN',
    error: state.user.error
  };
};

const mapSignup = state => {
  return {
    isLoggedIn: !!state.user.id,
    name: 'signup',
    displayName: 'REGISTER',
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

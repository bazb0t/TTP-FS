import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from './redux/store';

const Navbar = ({ handleClick, isLoggedIn }) => (
  <div id="nav">
    <nav>
      {isLoggedIn ? (
        <div className="nav--logged-in">
          {/* The navbar will show these links after you log in */}
          <Link className="links" to="/portfolio">
            Portfolio
          </Link>
          {' | '}
          <Link className="links" to="/transactions">
            Transactions
          </Link>
          {' | '}
          <a className="links" href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : (
        <div className='nav--logged-out'>
          <h1>Welcome to Bearabull Trading</h1>
          <h2>painless portfolio management</h2>
        </div>
      )}
    </nav>
  </div>
);

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    cart: state.cart,
    user: state.user,
    isAdmin: state.user.isAdmin
  };
};

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout());
    }
  };
};

export default connect(
  mapState,
  mapDispatch
)(Navbar);

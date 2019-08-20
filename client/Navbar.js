import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="navbar">
      <Link to="/Portfolio" className="navbar__link">Portfolio</Link>
      {' | '}
     <Link to="/Transactions">Transactions</Link>
    </div>
  );
};

export default Navbar;

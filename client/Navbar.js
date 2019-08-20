import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <div className='navbar'>
      <Link to='/Portfolio'>Portfolio</Link>
      {' | '}
      {/* <Link to="/Transactions">Portfolio</Link> */}
    </div>
  );
}

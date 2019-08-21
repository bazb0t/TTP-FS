import React, { useState } from 'react';
// import { connect } from 'react-redux';
import { auth } from '../redux/store';
import {Redirect} from 'react-router-dom';
import axios from 'axios';

const asyncRegister = async (n, e, pw) => {
  try {
    await axios.post(`/auth/signup`, {name: n, email: e, password: pw});
  } catch (err) {
    console.error(`Registration unsuccessful. Please try again.`)
    .then(() => {
      return (
        <Redirect to="/" />
      )
    })
  }
}

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  return (
    <div className="Register">
        <h2>Register</h2>
      <form onSubmit={() => auth(name, email, password)}>
        <input
          type="text"
          name="name"
          value={name}
          placeholder="FULL LEGAL NAME"
          onChange={e => setName(e.target.value)}
        />
        <input
          type="text"
          name="email"
          value={email}
          placeholder="EMAIL"
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="text"
          name="password"
          value={password}
          placeholder="PASSWORD"
          onChange={e => setPassword(e.target.value)}
        />
        <button type="submit" name="register button">REGISTER</button>
      </form>
    </div>
  );
}
export default Register;

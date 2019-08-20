import React, { useState } from 'react';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  return (
    <div className="Register">
        <h2>Register</h2>
      <form>
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
      </form>
    </div>
  );
}
export default Register;

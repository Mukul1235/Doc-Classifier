import React, { useState } from 'react';
import axios from 'axios';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async() => {
    // Add signup logic here (e.g., API request)
      // console.log('Signup clicked with name:', name, 'email:', email, 'and password:', password);
       const userData = {
      name: name,
      email: email,
      password: password
       };
      try { 
          const res = await axios.post('/user/create/', userData)
          localStorage.setItem('user',(res.data.user))
          console.log(res.data.user);
      }
      catch (err) {
          
      }
  }

  return (
    <div>
      <h2>Signup</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignup}>Signup</button>
    </div>
  );
}

export default Signup;

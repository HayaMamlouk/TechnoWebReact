import React, { useState } from 'react';

function SignUp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Check if password and confirm password match
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    // Here you can add your logic to handle the sign-up process
    console.log('Username:', username);
    console.log('Password:', password);
    console.log('First name:', firstName);
    console.log('Last name:', lastName);
    // For example, you might want to call an API to create a new user
  };

  return (
    <div className="SignUp">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
      <div className='input-name'>
          <div className='input-container'>
          <label htmlFor="firstName">First name</label>
            <input
                type="text"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
            />
          </div>
          <div className='input-container'>
          <label htmlFor="lastName">Last name</label>
            <input
                type="text"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
            />
          </div>
        </div>
        <div>
          <label htmlFor="username">Username</label>
          <div className='input-container'>
            <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />
            </div>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <div className='input-container'>
            <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
          </div>
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm password</label>
          <div className='input-container'>
            <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
            />
           </div>
        </div>
        <button className="submit-button" type="submit">Sign up</button>
      </form>
    </div>
    
  );
}

export default SignUp;

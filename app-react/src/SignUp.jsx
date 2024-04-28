import { useState } from 'react';

function SignUp({ toggleHasAccount }) {
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
    // Then wait for validation
  };

  return (
    <form className="LandingForm" onSubmit={handleSubmit}>
      <h2 className="Title">Sign Up</h2>
      <div className='input-name'>
        <div className='input-container'>
        <label className="label" htmlFor="firstName">First name</label>
          <input
              type="text"
              id="firstName"
              className="input"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              autoComplete="name"
          />
        </div>
        <div className='input-container'>
        <label className="label" htmlFor="lastName">Last name</label>
          <input
              type="text"
              id="lastName"
              className="input"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              autoComplete="name"
          />
        </div>
      </div>
      <div>
        <label className="label" htmlFor="username">Username</label>
        <div className='input-container'>
          <input
              type="text"
              id="username"
              className="input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoComplete="username"
          />
          </div>
      </div>
      <div>
        <label className="label" htmlFor="password">Password</label>
        <div className='input-container'>
          <input
              type="password"
              id="password"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="new-password"
          />
        </div>
      </div>
      <div>
        <label className="label" htmlFor="confirmPassword">Confirm password</label>
        <div className='input-container'>
          <input
              type="password"
              id="confirmPassword"
              className="input"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              autoComplete="new-password"
          />
         </div>
      </div>
      <button className="submit-button" type="submit">Sign up</button>
      <span className="not-member-text">
        Already a member?&nbsp;
        <button onClick={toggleHasAccount} className="not-member-button">
          Sign in
        </button>
      </span>
    </form>
  );
}

export default SignUp;

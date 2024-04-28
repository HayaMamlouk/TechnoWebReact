import { useState } from 'react';

function SignIn({ toggleHasAccount, setLoggedIn }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you can add your logic to handle the sign-in process
    console.log('Username:', username);
    console.log('Password:', password);
    // For example, you might want to call an authentication API here
    // Then set logged in: true
    setLoggedIn(true);
  };

  return (
    <>
      <form className="LandingForm" onSubmit={handleSubmit}>
        <h2 className="Title">Sign In</h2>
        <div className="input-container">
          <label className="label" htmlFor="username">Username</label>
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
        <div className="input-container">
          <label className="label" htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
        </div>
        <button className="submit-button" type="submit">Sign in</button>
        <span className="not-member-text">
          Not a member yet?&nbsp;
          <button onClick={toggleHasAccount} className="not-member-button">
            Create an account
          </button>
        </span>
      </form>
    </>
  );
}

export default SignIn;

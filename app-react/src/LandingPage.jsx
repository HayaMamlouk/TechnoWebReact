import React, { useState } from 'react';
import './LandingPage.css';
import SignIn from './SignIn';
import SignUp from './SignUp';

function LandingPage({ loggedIn }) {
  const [hasAccount, setHasAccount] = useState(true);

  const toggleHasAccount = () => {
    setHasAccount(!hasAccount);
  };

  // Redirect the user to the main page if they are already logged in
  if (loggedIn) {
    return <Redirect to="/MainPage" />;
  }

  return (
    <div className='Container'>
      <div className='LandingPage'>
        <div className='LandingImage'>

        </div>
        <div className="LandingForm">
          {hasAccount ? (
            <>
            <SignIn />
            <div className="button-text-container">
              <div className="not-member-text">
                Not a member yet? 
                <a onClick={toggleHasAccount} className="not-member-button">
                Create an account
              </a>
              </div>
              
            </div>
            </>
          ) : (

            <>
            <SignUp />
            <div className="button-text-container">
              <div className="not-member-text">
                Already a member? 
                <a onClick={toggleHasAccount} className="not-member-button">
                  Sign in
                </a>
              </div>
            </div>
          </>
            
          )}
        </div>
      </div>
    </div>
  );
}

export default LandingPage;

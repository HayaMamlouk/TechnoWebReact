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
    <div className='LandingPage'>
      <div className="LandingPageBackground"/>
      <div className='LandingPageContainer'>
        <div className='LandingImage' />
          {hasAccount ? (
            <SignIn toggleHasAccount={toggleHasAccount} />
          ) : (
            <SignUp toggleHasAccount={toggleHasAccount} />
          )}
        </div>
    </div>
  );
}

export default LandingPage;

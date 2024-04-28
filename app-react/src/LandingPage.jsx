import { useState } from 'react';
import './LandingPage.css';
import SignIn from './SignIn';
import SignUp from './SignUp';

function LandingPage({ setLoggedIn }) {
  const [hasAccount, setHasAccount] = useState(true);

  const toggleHasAccount = () => {
    setHasAccount(!hasAccount);
  };

  return (
    <div className='LandingPage'>
      <div className="LandingPageBackground"/>
      <div className='LandingPageContainer'>
        <div className='LandingImage' />
          {hasAccount ? (
            <SignIn toggleHasAccount={toggleHasAccount} setLoggedIn={setLoggedIn} />
          ) : (
            <SignUp toggleHasAccount={toggleHasAccount} />
          )}
        </div>
    </div>
  );
}

export default LandingPage;

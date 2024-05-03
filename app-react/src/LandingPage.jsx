import { useState } from 'react';
import './LandingPage.css';
import SignIn from './SignIn';
import SignUp from './SignUp';

function LandingPage({ setCurrentUser }) {
    const [hasAccount, setHasAccount] = useState(true);

    const toggleHasAccount = () => {
        setHasAccount(!hasAccount);
    };

    return (
        <div className='LandingPage'>
            <div className='LandingPageBackground' />
            <div className='LandingPageContainer'>
                <div className='LandingImage' />
                {hasAccount ? (
                    <SignIn toggleHasAccount={toggleHasAccount} setCurrentUser={setCurrentUser} />
                ) : (
                    <SignUp toggleHasAccount={toggleHasAccount} />
                )}
            </div>
        </div>
    );
}

export default LandingPage;

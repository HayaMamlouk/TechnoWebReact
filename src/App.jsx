import { useState } from 'react';
import LandingPage from './LandingPage';
import MainPage from './MainPage';

function App() {
    const [currentUser, setCurrentUser] = useState(undefined);

    return currentUser ? (<MainPage currentUser={currentUser} setCurrentUser={setCurrentUser} />) : (<LandingPage setCurrentUser={setCurrentUser} />);
}

export default App;

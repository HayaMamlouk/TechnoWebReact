import { useState } from 'react';
// import './App.css';
import LandingPage from './LandingPage';
import MainPage from './MainPage';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return loggedIn ? (<MainPage setLoggedIn={setLoggedIn} />) : (<LandingPage setLoggedIn={setLoggedIn} />);
}

export default App;

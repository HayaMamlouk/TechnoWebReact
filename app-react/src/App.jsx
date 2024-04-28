import React, { useState } from 'react';
// import './App.css';
import LandingPage from './LandingPage';
import MainPage from './MainPage';

function App() {
  const [loggedIn, setLoggedIn] = useState(true);

  return loggedIn ? (<MainPage setLoggedIn={setLoggedIn}/>) : (<LandingPage />);
}

export default App;

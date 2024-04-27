import React, { useState } from 'react';
// import './App.css';
// import LandingPage from './LandingPage';
import MainPage from './MainPage';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  // Function to toggle the loggedIn state
  const toggleLoggedIn = () => {
    setLoggedIn(!loggedIn);
  };

  return loggedIn ? (<MainPage />) : (<LandingPage />);
}

export default App;



 

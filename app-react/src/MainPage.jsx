import React, { useState } from 'react';
// import './MaingPage.css';
import NavBar from './NavBar';
import Forum from './Forum';
import Users from './Users'
import Requests from './Requests'
import SearchResult from './SearchResult'
import Profile from './Profile'
import LandingPage from './LandingPage';

function MainPage({setLoggedIn}) {
  const [currentPage, setCurrentPage] = useState('public forum');

  return (
    <div className='Container'>
      <NavBar currentPage={currentPage} setCurrentPage={setCurrentPage} setLoggedIn={setLoggedIn} />
      {currentPage === 'public forum' && <Forum />}
      {currentPage === 'private forum' && <Forum />}
      {currentPage === 'users' && <Users />}
      {currentPage === 'requests' && <Requests />}
      {currentPage === 'search result' && <SearchResult />}
      {currentPage === 'profile' && <Profile />}

    </div>
  );
}

export default MainPage;

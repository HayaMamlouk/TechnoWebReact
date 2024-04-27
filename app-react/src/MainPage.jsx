import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
// import './MaingPage.css';
import NavBar from './NavBar';
import Forum from './Forum';
import Users from './Users'
import Requests from './Requests'
import SearchResult from './SearchResult'
import Profile from './Profile'


function MainPage({ loggedIn }) {
  const [currentPage, setCurrentPage] = useState('public forum');

  // Redirect the user to the landing page if they are not logged in
  if (!loggedIn) {
    return <Redirect to="./LandingPage" />;
  }

  return (
    <div className='Container'>
      <NavBar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      {currentPage === 'public forum' && <Forum />}
      {currentPage === 'private forum' && <Forum />}
      {currentPage === 'users' && <Users />}
      {currentPage === 'requests' && <Requests />}
      {currentPage === 'search result' && <SearchResult />}
      {currentPage === 'profile' && <Profile />}
      {currentPage === 'sign out' && <Redirect to="./LandingPage" />}
    </div>
  );
}

export default MainPage;

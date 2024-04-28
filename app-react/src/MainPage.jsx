import { useState } from 'react';
import NavBar from './NavBar';
import Forum from './Forum';
import Users from './Users'
import Requests from './Requests'
import SearchResult from './SearchResult'
import Profile from './Profile'

function MainPage({setLoggedIn}) {
  const [currentPage, setCurrentPage] = useState('public forum');

  return (
    <>
      <NavBar currentPage={currentPage} setCurrentPage={setCurrentPage} setLoggedIn={setLoggedIn} />
      {currentPage === 'public forum' && <Forum />}
      {currentPage === 'private forum' && <Forum />}
      {currentPage === 'users' && <Users />}
      {currentPage === 'requests' && <Requests />}
      {currentPage === 'search result' && <SearchResult />}
      {currentPage === 'profile' && <Profile />}
    </>
  );
}

export default MainPage;

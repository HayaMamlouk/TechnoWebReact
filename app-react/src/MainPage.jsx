import { useEffect, useState } from 'react';
import NavBar from './NavBar';
import Forum from './Forum';
import Users from './Users';
import Requests from './Requests';
import Profile from './Profile';
import User from './User';
import './MainPage.css';

function MainPage({ currentUser, setCurrentUser }) {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState('public forum');
    const [shownUser, setShownUser] = useState(undefined);

    async function fetchData() {
        const response = await fetch('http://localhost:4000/api/users', {
            method: 'GET',
            credentials: 'include'
        });
        if (response.status === 200) {
            const data = await response.json();
            setUsers(data);
        }
    }

    useEffect(() => {
        fetchData();
    }, [currentPage, shownUser]);

    return (
        <>
            <NavBar currentUser={currentUser} currentPage={currentPage} setCurrentPage={setCurrentPage}
                    setCurrentUser={setCurrentUser} />
            <div className='MainPageContent'>
                <div className='MainPageWelcome'>
                    <h1>{currentPage}</h1>
                </div>
                {currentPage === 'public forum' &&
                    <Forum type='public' currentUser={currentUser} users={users} setShownUser={setShownUser} />}
                {currentPage === 'private forum' && currentUser.role === 'admin' &&
                    <Forum type='private' currentUser={currentUser} users={users} setShownUser={setShownUser} />}
                {currentPage === 'users' && <Users users={users} setShownUser={setShownUser} />}
                {currentPage === 'requests' && <Requests setShownUser={setShownUser} />}
                {currentPage === 'profile' && <Profile user={currentUser} setCurrentUser={setCurrentUser} users={users}
                                                       setShownUser={setShownUser} />}
                {shownUser !== undefined &&
                    <User currentUser={currentUser} setCurrentUser={setCurrentUser} user={shownUser} users={users}
                          setShownUser={setShownUser} />}
            </div>
        </>
    );
}

export default MainPage;

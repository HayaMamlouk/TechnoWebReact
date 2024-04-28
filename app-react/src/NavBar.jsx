function NavBar({ currentPage, setCurrentPage, setLoggedIn }) {
    return (
        <div className='NavBar'>
        <div className='NavBarButton'>
            <div className='navTab'>
            <button
            className={currentPage === 'public forum' ? 'selected' : ''}
            onClick={() => setCurrentPage('public forum')}
            >
            Public forum
            </button>
            <button
            className={currentPage === 'private forum' ? 'selected' : ''}
            onClick={() => setCurrentPage('private forum')}
            >
            Private forum
            </button>
            <button
            className={currentPage === 'users' ? 'selected' : ''}
            onClick={() => setCurrentPage('users')}
            >
            Users
            </button>
            <button
            className={currentPage === 'requests' ? 'selected' : ''}
            onClick={() => setCurrentPage('requests')}
            >
            Requests
            </button>
            </div>
            
            <button
            className={currentPage === 'profile' ? 'selected' : ''}
            onClick={() => setCurrentPage('profile')}
            >
            My profile
            </button>
            <button
            className='sign-out'
            onClick={() => setLoggedIn(false)}
            >
            Sign out
            </button>
        </div>
        </div>
    );
    }

    export default NavBar;

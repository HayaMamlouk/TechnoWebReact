import './NavBar.css';

function NavBar({ currentUser, currentPage, setCurrentPage, setCurrentUser }) {
    async function signOut() {
        const response = await fetch('http://localhost:4000/api/auth', {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'DELETE',
            credentials: 'include'
        });
        if (response.status === 200) {
            const data = await response.json();
            if (data.success) {
                setCurrentUser(undefined);
            }
        }
    }

    return (
        <div className='NavBar'>
            <div className='NavBarSection'>
                <button
                    className={currentPage === 'public forum' ? 'selected' : ''}
                    onClick={() => setCurrentPage('public forum')}
                >
                    Public forum
                </button>
                <button
                    className={currentUser.role === 'admin' && currentPage === 'private forum' ? 'selected' : ''}
                    data-details={currentUser.role !== 'admin' ? 'You don\'t have access to the private forum' : ''}
                    disabled={currentUser.role !== 'admin'}
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
                    className={currentUser.role === 'admin' && currentPage === 'requests' ? 'selected' : ''}
                    data-details={currentUser.role !== 'admin' ? 'You don\'t have access to requests' : ''}
                    disabled={currentUser.role !== 'admin'}
                    onClick={() => setCurrentPage('requests')}
                >
                    Requests
                </button>
            </div>

            <div className='NavBarSection'>
                <button
                    className={currentPage === 'profile' ? 'selected' : ''}
                    onClick={() => setCurrentPage('profile')}
                >
                    My profile
                </button>
                <button
                    className='sign-out'
                    onClick={signOut}
                >
                    Sign out
                </button>
            </div>
        </div>
    );
}

export default NavBar;

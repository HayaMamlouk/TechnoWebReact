// NavBar
// Composant contenant la barre de navigation. Celle-ci permet à l'utilisateur de
// naviguer dans les différentes pages de l'application : il peut se déplacer dans
// "Public forum", "Private forum" (réservé aux administrateurs), "Users", "Requests"
// (réservé aux administrateurs) à travers les onglets ou visiter son profile en
// cliquant sur "My profile". Il a aussi la possibilité de se déconnecter grâce au
// bouton "Sign out".
// props
// - currentPage qui montre en soulignant quelle page est sélectionnée et fait
// remonter un changement de page lors d'un clic sur un bouton de navigation

function NavBar({ currentPage, setCurrentPage }) {
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
            onClick={() => setCurrentPage('sign out')}
            >
            Sign out
            </button>
        </div>
        </div>
    );
    }

    export default NavBar;

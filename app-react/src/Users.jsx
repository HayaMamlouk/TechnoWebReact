import './Users.css'

function Users({ users, setShownUser }) {
    return (
        <ul className='Users'>
            {(users ?? []).map((user) => (
                <li className='User' key={user._id}>
                    <span>{user.firstname} {user.lastname}</span>
                    <span className='UserUsername'>@{user.login}</span>
                    {user.role === 'admin' && (<span className='UserAdmin'>⭐</span>)}
                    <button className='UserViewProfile SimpleButton' onClick={() => setShownUser(user)}>
                        View profile
                    </button>
                </li>
            ))}
        </ul>
    );
}

export default Users;

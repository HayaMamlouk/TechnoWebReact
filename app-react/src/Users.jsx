function Users({ users }) {
    return (
        <div className='Users'>
            <ul>
                {(users ?? []).map((user) => (
                    <li key={user.id}>
                        <span>User ID: {user.logins}</span>
                        <span>Username: {user.username}</span>
                        <span>Date of Join: {user.dateOfJoin}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}  

export default Users;

import React from 'react';
import User from './User';

function Users(props) {
    const { users } = props;

    return (
        <div className='Users'>
            <ul>
                {users.map((user) => (
                    <User key={user.id} user={user} messages={user.messages} />  
                ))}
            </ul>
        </div>
    );
}  

export default Users;
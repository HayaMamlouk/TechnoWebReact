import React, { useState } from 'react';

function User(props) {
    const [showMessages, setShowMessages] = useState(false);
    const { user, messages } = props;
    const { id, name } = user;

    const toggleMessages = () => {
        setShowMessages(!showMessages);
    };

    return (
        <li className='User'>
            <p>ID: {id}</p>
            <p>Name: {name}</p>
            <button onClick={toggleMessages}>
                {showMessages ? `Hide ${messages.length} messages` : `Show ${messages.length} messages`}
            </button>
            {showMessages && (
                <ul>
                    {messages.map((message, index) => (
                        <li key={index}>
                            {message.content}
                        </li>
                    ))}
                </ul>
            )}
        </li>
    );
}

export default User;

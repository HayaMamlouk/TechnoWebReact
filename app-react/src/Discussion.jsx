import React, { useState, useEffect } from 'react';
import Message from './Message';

function Discussion(props) {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Fetch messages from the API using props.id
    }, [props.id]);

    function handleSubmit(e) {
        e.preventDefault();
        const newMessage = {
            id: messages.length,
            userId: 1,  // for now
            content: message,
            date: new Date().toISOString(),
            type: props.type,
            replyTo: null, // Assuming this is the root message
            replies: [],
            replyCount: 0,
        };
        setMessages([...messages, newMessage]);
        setMessage('');
    }

    return (
        <div className='Discussion'>
            <ul>
                {messages.map((message) => (
                    <Message key={message.id} message={message} handleSubmit={handleSubmit} />
                ))}
            </ul>
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button type='submit'>Add message</button>
            </form>
        </div>
    );
}

export default Discussion;

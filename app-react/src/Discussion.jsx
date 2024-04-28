import React, { useState } from 'react';
import Message from './Message';

function Discussion(props) {
    const [messages, setMessages] = useState(props.discussion.messages);
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Fetch messages from the API using props.title of the discussion
    }, [props.key]);

    const handleSubmit = (content) => {
        const newMessage = {
            content: content,
            type: props.type,
            replies: [] // Initialize replies as an empty array for this message
        };
        setMessages([...messages, newMessage]);
    };

    return (
        <div className='Discussion'>
            <ul>
                {messages.map((message) => (
                    <Message key={message.id} message={message} handleSubmit={handleSubmit} />
                ))}
            </ul>
            <form onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(message);
                setMessage('');
            }}>
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

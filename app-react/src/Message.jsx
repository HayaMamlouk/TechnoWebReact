import React, { useState } from 'react';

function Message({ message, handleSubmit }) {
    const [showReplies, setShowReplies] = useState(false);
    const [showReplyForm, setShowReplyForm] = useState(false);
    const [reply, setReply] = useState('');

    const { id, type, userId, content, date, replyTo, replies } = message;

    const toggleReplies = () => {
        setShowReplies(!showReplies);
    };

    const toggleReplyForm = () => {
        setShowReplyForm(!showReplyForm);
    };

    const handleReply = (e) => {
        e.preventDefault();
        handleSubmit(reply, id);
        setReply('');
        setShowReplyForm(false);
    };

    return (
        <li className='Message'>
            <p>Type: {type}</p>
            <p>User ID: {userId}</p>
            <p>Content: {content}</p>
            <p>Date: {date}</p>
            <p>Reply To: {replyTo}</p>
            <p>
                Replies:
                <br />
                <button onClick={toggleReplies}>
                    {showReplies ? `Hide ${replies.length} replies` : `Show ${replies.length} replies`} 
                </button>
                {showReplies && replies.map((reply, index) => (
                    <div key={index}>
                        {reply.content}
                    </div>
                ))}
            </p>
            <button onClick={toggleReplyForm}>Reply</button>
            {showReplyForm && (
                <form onSubmit={handleReply}>
                    <input
                        type='text'
                        value={reply}
                        onChange={(e) => setReply(e.target.value)}
                    />
                    <button type='submit'>Reply</button>
                </form>
            )}
        </li>
    );
}

export default Message;

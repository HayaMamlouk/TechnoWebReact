import React, { useState } from 'react';


function Message(props) {
    const [showReplies, setShowReplies] = useState(false);
    const [showReplyForm, setShowReplyForm] = useState(false);
    const [reply, setReply] = useState('');

    const { message, handleSubmit } = props;
    const { id, type, userId, content, date, replyTo, replies } = message;

    const toggleReplies = () => {
        setShowReplies(!showReplies);
    };

    const toggleReplyForm = () => {
        setShowReplyForm(!showReplyForm);
    };

    const handleReply = (e) => {
        e.preventDefault();
        handleSubmit(reply, id); // Pass the reply and message id to the parent's handleSubmit function
        setReply('');
        setShowReplyForm(false);
    };

    return (
        <li className='Message'>
            <p>ID: {id}</p>
            <p>Type: {type}</p>
            <p>User ID: {userId}</p>
            <p>Content: {content}</p>
            <p>Date: {date}</p>
            <p>Reply To: {replyTo}</p>
            <p>
                Replies:
                <br />
                {showReplies && replies.map((reply, index) => (
                    <React.Fragment key={index}>
                        {reply.content} {/* Display the content of each reply */}
                        <br />
                    </React.Fragment>
                ))}
                <button>
                     {showReplies ? `Hide ${replies.length} replies` : `Show ${replies.length} replies`} 
                </button>
            </p>
            <p>Reply Count: {replies.length}</p>
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

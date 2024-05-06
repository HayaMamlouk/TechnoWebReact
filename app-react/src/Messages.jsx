import { useEffect, useRef, useState } from 'react';
import './Messages.css';

function Message({ message, currentUser, users, setShownUser, singleMessage }) {
    const [currentMessage, setCurrentMessage] = useState(message);
    const [showReplyForm, setShowReplyForm] = useState(false);
    const [reply, setReply] = useState('');
    const [user, setUser] = useState(undefined);
    const [deleted, setDeleted] = useState(false);

    async function fetchData() {
        const response = await fetch(`http://localhost:4000/api/message/${message._id}`, {
            method: 'GET',
            credentials: 'include'
        });
        if (response.status === 200) {
            const data = await response.json();
            setCurrentMessage(data);
        }
    }

    async function postReply() {
        const response = await fetch('http://localhost:4000/api/message', {
            body: JSON.stringify({
                content: reply,
                type: message.type,
                replyTo: message._id,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'PUT',
            credentials: 'include'
        });
        if (response.status === 201) {
            fetchData();
        }
    }

    async function deleteMessage() {
        const response = await fetch(`http://localhost:4000/api/message/${message._id}`, {
            method: 'DELETE',
            credentials: 'include'
        });
        if (response.status === 200) {
            setDeleted(true);
        }
    }

    useEffect(() => {
        setUser(users?.find(({ _id }) => _id === currentMessage.userId));
        fetchData();
    }, [users, currentMessage.userId]);

    function timeAgo(input) {
        if (Date.now() - input < 5000) {
            // If difference is less than 5s, return "just now"
            return 'just now';
        }
        const date = new Date(input);
        const formatter = new Intl.RelativeTimeFormat('en');
        const ranges = [
            ['years', 3600 * 24 * 365],
            ['months', 3600 * 24 * 30],
            ['weeks', 3600 * 24 * 7],
            ['days', 3600 * 24],
            ['hours', 3600],
            ['minutes', 60],
            ['seconds', 1],
        ];
        const secondsElapsed = (date.getTime() - Date.now()) / 1000;

        for (const [rangeType, rangeVal] of ranges) {
            if (rangeVal < Math.abs(secondsElapsed)) {
                const delta = secondsElapsed / rangeVal;
                return formatter.format(Math.round(delta), rangeType);
            }
        }
    }

    return (
        <li className='Message'>
            {!singleMessage && (
                <div className='MessageReplyDesign'>
                    <div className='MessageReplyIndicator' />
                    <div className='MessageReplyLineHide' />
                </div>
            )}
            <div className='MessageContent'>
                <span className='MessageDetails'>
                    <button
                        className='MessageAuthor'
                        onClick={() => setShownUser(user)}
                    >{user?.login}</button> • {timeAgo(currentMessage.date)}
                </span>
                {!deleted ? (
                    <>
                        <span>{currentMessage.content}</span>
                        <div>
                            <button
                                className='MessageAction'
                                onClick={() => setShowReplyForm(true)}
                            >
                                💬 Reply
                            </button>
                            {(currentUser?.role === 'admin' || currentUser?._id === message.userId) && (
                                <button
                                    className='MessageAction'
                                    onClick={deleteMessage}
                                >
                                    🗑️ Delete
                                </button>
                            )}
                        </div>
                        {showReplyForm && (
                            <form
                                className='MessageReplyForm'
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    postReply();
                                    setShowReplyForm(false);
                                    setReply('');
                                }}
                                onReset={(e) => {
                                    e.preventDefault();
                                    setShowReplyForm(false);
                                    setReply('');
                                }}>
                                <input
                                    className='SimpleInput'
                                    id='reply'
                                    type='text'
                                    placeholder='Message'
                                    value={reply}
                                    onChange={(e) => setReply(e.target.value)}
                                    required
                                />
                                <button className='SimpleButton' type='reset'>Cancel</button>
                                <button className='SimpleButton' type='submit'>Reply</button>
                            </form>
                        )}
                        {(currentMessage.replies ?? []).length > 0 && (
                            <Messages
                                messages={currentMessage.replies}
                                currentUser={currentUser}
                                users={users}
                                setShownUser={setShownUser}
                            />
                        )}
                    </>
                ) : (
                    <span className='MessageDeleted'>🚫 This message was deleted.</span>
                )}
            </div>
        </li>
    );
}

function Messages({ messages, currentUser, users, setShownUser, expandReplies, singleMessages }) {
    const [showReplies, setShowReplies] = useState(expandReplies ?? false);

    const messageList = useRef(undefined);
    const [style, setStyle] = useState({});

    useEffect(() => {
        if (!messageList.current) {
            return;
        }
        const resizeObserver = new ResizeObserver(() => {
            const { height } = messageList.current.lastChild.firstChild.lastChild.getBoundingClientRect();
            setStyle({ '--clip-height': `${height}px` });
        });
        resizeObserver.observe(messageList.current);
        return () => resizeObserver.disconnect();

    }, [showReplies]);

    return (
        <>
            {(messages ?? []).length > 0 && (!showReplies ? (
                <div className='Message'>
                    <div className='MessageReplyIndicator' />
                    <button className='MessageContent' onClick={() => setShowReplies(!showReplies)}>
                        <span className='MessageReplyCount'>{messages.length} replies</span>
                    </button>
                </div>
            ) : (
                <ul ref={!singleMessages ? messageList : undefined} className={!singleMessages ? 'RepliesLine' : ''}
                    style={style}>
                    {messages.map((message) => (
                        <Message
                            key={message._id}
                            message={message}
                            currentUser={currentUser}
                            users={users}
                            setShownUser={setShownUser}
                            singleMessage={singleMessages}
                        />
                    ))}
                </ul>
            ))}
        </>
    );
}

export default Messages;

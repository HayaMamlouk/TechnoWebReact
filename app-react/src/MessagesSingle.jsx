import { useEffect, useState } from 'react';
import './Messages.css';

function MessageSingle({ message, users, setShownUser }) {
    const [user, setUser] = useState(undefined);

    useEffect(() => {
        setUser(users?.find(({ _id }) => _id === message.userId));
    }, [users, message.userId]);

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
            <div className='MessageContent'>
                <span className='MessageDetails'>
                    <span className='MessageAuthor'>{user?.login}</span> • {timeAgo(message.date)} {message.type === 'private' && (
                    <span>• <span className='DiscussionPrivateIcon'>🔒</span></span>)}
                </span>
                <span>{message.content}</span>
            </div>
        </li>
    );
}

function MessagesSingle({ messages, users, setShownUser }) {
    return (
        <>
            {(messages ?? []).length > 0 && (
                <ul className='MessagesSingle'>
                    {messages.map((message) => (
                        <MessageSingle key={message._id} message={message} users={users} setShownUser={setShownUser} />
                    ))}
                </ul>
            )}
        </>
    );
}

export default MessagesSingle;

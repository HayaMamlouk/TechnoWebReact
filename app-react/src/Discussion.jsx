import { useEffect, useState } from 'react';
import Messages from './Messages';
import './Discussion.css';

function Discussion({ discussion, users, currentUser, setShownUser, setUpdateMessages, highlight }) {
    const [message, setMessage] = useState('');
    const [user, setUser] = useState(undefined);

    async function postReply() {
        const response = await fetch('http://localhost:4000/api/message', {
            body: JSON.stringify({
                content: message,
                type: discussion.type,
                replyTo: discussion._id,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'PUT',
            credentials: 'include'
        });
        if (response.status === 201) {
            setUpdateMessages(true);
        }
    }

    async function deleteDiscussion() {
        const response = await fetch(`http://localhost:4000/api/message/${discussion._id}`, {
            method: 'DELETE',
            credentials: 'include'
        });
        if (response.status === 200) {
            setUpdateMessages(true);
        }
    }

    useEffect(() => {
        setUser(users?.find(({ _id }) => _id === discussion.userId));
    }, [users, discussion.userId]);

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

    function highlightText(content, query) {
        try {
            const keywords = query.split(' ');

            if (keywords === undefined || keywords.length === 0) {
                return content;
            }

            return content.replace(
                new RegExp(`(${keywords.join('|')})`, 'gi'),
                `<span class='highlight'>$1</span>`,
            );
        } catch (e) {
            console.error(`RegExp error ${e}`);
        }
    }

    return (
        <div className='Discussion'>
            <span className='DiscussionDetails'>
                started by <button
                className='DiscussionAuthor'
                onClick={() => setShownUser(user)}
            >{user?.login}</button> • {timeAgo(discussion.date)} {discussion.type === 'private' && (
                <span>• <span className='DiscussionPrivateIcon'>🔒</span></span>)}
            </span>
            {!highlight ? (
                <>
                    <h6>{discussion.title}</h6>
                    <span className='DiscussionContent'>{discussion.content}</span>
                </>
            ) : (
                <>
                    <h6 dangerouslySetInnerHTML={{ __html: highlightText(discussion.title, highlight) }} />
                    <span dangerouslySetInnerHTML={{ __html: highlightText(discussion.content, highlight) }} />
                </>
            )}
            {(currentUser?.role === 'admin' || currentUser?._id === discussion.userId) && (
                <button
                    className='DiscussionAction'
                    onClick={deleteDiscussion}
                >
                    🗑️ Delete
                </button>
            )}
            <form className='DiscussionReply' onSubmit={(e) => {
                e.preventDefault();
                console.log(`Replying to discussion id: ${discussion._id}...`)
                postReply();
                setMessage('');
            }}>
                <input
                    className='SimpleInput'
                    id='reply'
                    type='text'
                    placeholder='Message'
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                />
                <button className='SimpleButton' type='submit'>Reply</button>
            </form>
            <Messages messages={discussion.replies ?? []} currentUser={currentUser} users={users}
                      setShownUser={setShownUser} />
        </div>
    );
}

export default Discussion;

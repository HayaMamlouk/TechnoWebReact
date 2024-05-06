import { useEffect, useState } from 'react';

import MessagesSingle from './MessagesSingle';
import './User.css';

function User({ user, users, setShownUser }) {
    const [messages, setMessages] = useState([]);

    async function fetchData() {
        const response = await fetch('http://localhost:4000/api/messages/search', {
            body: JSON.stringify({
                query: user._id,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            credentials: 'include'
        });
        if (response.status === 200) {
            const data = await response.json();
            setMessages((data ?? []).reverse());
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div id='UserDialog' className='UserDialog' onClick={(e) => {
            if (e.target.id === 'UserDialog') {
                setShownUser(undefined);
            }
        }}>
            <div className='UserDialogContainer'>
                <button className='SimpleButton UserDialogClose' onClick={() => setShownUser(undefined)}>Close</button>
                <span className='UserUsername'>@{user.login}</span>
                <span className='UserDialogName'>
                    {user.firstname} {user.lastname}&nbsp;&nbsp;
                    {user.role === 'admin' && (<span className='UserAdmin'>⭐</span>)}
                </span>
                {/*<hr className='UserDialogDivider' />*/}
                {messages.length > 0 ? (
                    <>
                        <span className='UserDialogMessagesTitle'>Messages</span>
                        <MessagesSingle messages={messages} users={users} setShownUser={setShownUser} />
                    </>
                ) : (
                    <span className='UserDialogMessagesTitle'>No messages found</span>
                )}
            </div>
        </div>
    );
}

export default User;

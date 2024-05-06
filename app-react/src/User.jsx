import { useEffect, useState } from 'react';

import MessagesSingle from './MessagesSingle';
import './User.css';

function User({ currentUser, setCurrentUser, user, users, setShownUser }) {
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

    async function deleteAccount() {
        const response = await fetch(`http://localhost:4000/api/user/${user._id}`, {
            method: 'DELETE',
            credentials: 'include'
        });
        if (response.status === 200) {
            if (currentUser?._id === user._id) {
                setCurrentUser(undefined);
            } else {
                setShownUser(undefined);
            }
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
                {messages.length > 0 ? (
                    <>
                        <span className='UserDialogMessagesTitle'>Messages</span>
                        <MessagesSingle messages={messages} users={users} setShownUser={setShownUser} />
                    </>
                ) : (
                    <span className='UserDialogMessagesTitle'>No messages found</span>
                )}
                {((currentUser?.role === 'admin' && user.role !== 'admin') || currentUser?._id === user._id) && (
                    <>
                        <hr className='UserDivider' />
                        <button className='SimpleButton UserDeleteButton' onClick={deleteAccount}>Delete
                            account
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}

export default User;

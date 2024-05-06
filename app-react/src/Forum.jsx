import { useEffect, useState } from 'react';
import SearchBar from './SearchBar';
import Discussion from './Discussion';
import './Forum.css';

function Forum({ type, currentUser, users, setShownUser }) {
    const [discussions, setDiscussions] = useState([]);
    const [searchResults, setSearchResults] = useState(undefined);
    const [newDiscussionTitle, setNewDiscussionTitle] = useState('');
    const [newDiscussionContent, setNewDiscussionContent] = useState('');
    const [updateMessages, setUpdateMessages] = useState(false);

    async function postDiscussion() {
        const response = await fetch('http://localhost:4000/api/message', {
            body: JSON.stringify({
                title: newDiscussionTitle,
                content: newDiscussionContent,
                type,
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

    async function fetchData() {
        setUpdateMessages(false);
        const response = await fetch(`http://localhost:4000/api/messages/${type}`, {
            method: 'GET',
            credentials: 'include'
        });
        if (response.status === 200) {
            const data = await response.json();
            setDiscussions((data ?? []).reverse());
        }
    }

    useEffect(() => {
        fetchData();
    }, [updateMessages]);

    return (
        <div className='Forum'>
            <form className='ForumNewDiscussion' onSubmit={(e) => {
                e.preventDefault();
                postDiscussion();
                setNewDiscussionTitle('');
                setNewDiscussionContent('');
            }}>
                <h2>What do you feel like discussing?</h2>
                <input
                    className='SimpleInput'
                    id='title'
                    type='text'
                    placeholder='Title'
                    value={newDiscussionTitle}
                    onChange={(e) => setNewDiscussionTitle(e.target.value)}
                    required
                />
                <textarea
                    className='SimpleInput'
                    id='title'
                    rows='5'
                    placeholder='Message'
                    value={newDiscussionContent}
                    onChange={(e) => setNewDiscussionContent(e.target.value)}
                    required
                />
                <button className='SimpleButton' type='submit'>Post</button>
            </form>
            <hr className='ForumDivider' />
            <SearchBar setSearchResults={setSearchResults} />
            {searchResults === undefined ? (
                <>
                    {discussions.length === 0 && (
                        <h2>No discussions yet</h2>
                    )}
                    {discussions.map(discussion => (
                        <Discussion
                            key={discussion._id}
                            discussion={discussion}
                            currentUser={currentUser}
                            users={users}
                            setShownUser={setShownUser}
                            setUpdateMessages={setUpdateMessages} />
                    ))}
                </>
            ) : (
                <>
                    {searchResults.results.length === 0 && (
                        <h2>No results found</h2>
                    )}
                    {searchResults.results.filter((discussion) => discussion.type === type).map(discussion => (
                        <Discussion
                            key={discussion._id}
                            discussion={discussion}
                            currentUser={currentUser}
                            users={users}
                            setShownUser={setShownUser}
                            setUpdateMessages={setUpdateMessages}
                            highlight={searchResults.query}
                        />
                    ))}
                </>
            )}
        </div>
    );
}

export default Forum;

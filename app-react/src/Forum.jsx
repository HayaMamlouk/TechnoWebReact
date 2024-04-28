import { useState } from 'react';
import SearchBar from './SearchBar';
import Discussion from './Discussion';

function Forum() {
    const [type, setType] = useState('public');
    const [discussions, setDiscussions] = useState([]);
    const [newDiscussionTitle, setNewDiscussionTitle] = useState('');

    const addDiscussion = () => {
        const newDiscussion = {
            title: newDiscussionTitle,
            messages: [] // Initialize messages as an empty array for this discussion
        };
        setDiscussions([...discussions, newDiscussion]);
        setNewDiscussionTitle(''); // Reset the title input after adding a discussion
    };

    return (
        <div className='Forum'>
            <SearchBar />
            <input
                type='text'
                placeholder='Enter new discussion title'
                value={newDiscussionTitle}
                onChange={(e) => setNewDiscussionTitle(e.target.value)}
            />
            <button onClick={addDiscussion}>New Discussion</button>
            {discussions.map(discussion => (
                <Discussion key={discussion.title} discussion={discussion} type={type}/>
            ))}
        </div>
    );
}

export default Forum;

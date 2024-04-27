import React, { useState } from 'react';
import SearchBar from './SearchBar';
import Discussion from './Discussion';

// here discussion is a list of discussion (check with toufic)
function Forum() {
    const [type, setType] = useState('public');
    
    return (
        <div className='Forum'>
        <SearchBar />
        <Discussion type={type} id={1} />  {/* id is fix for now check with toufic*/}
        </div>
    );
}

export default Forum;
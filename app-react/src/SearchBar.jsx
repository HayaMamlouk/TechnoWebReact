import { useState } from 'react';

function SearchBar() {
    const [query, setQuery] = useState('');
    
    return (
        <div className='SearchBar'>
            <form>
                <input
                    type='text'
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    
                />
                <button type='submit'>Search</button>
            </form>
        </div>
    );
}

export default SearchBar;

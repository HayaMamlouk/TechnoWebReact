import { useState } from 'react';
import './SearchBar.css';

function SearchBar({ setSearchResults }) {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    async function search() {
        const response = await fetch('http://localhost:4000/api/messages/search', {
            body: JSON.stringify({
                query,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            credentials: 'include'
        });
        if (response.status === 200) {
            const data = await response.json();
            setResults(data ?? []);
            setSearchResults({
                query,
                results: (data ?? []).reverse(),
            });
        }
    }

    return (
        <form className='SearchBar' onReset={(e) => {
            e.preventDefault();
            setQuery('');
            setResults([]);
            setSearchResults(undefined);
        }} onSubmit={(e) => {
            e.preventDefault();
            search();
        }}>
            <input
                className='SearchInput'
                type='text'
                placeholder='Search message by title or content...'
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            {(query.length > 0 || results.length > 0) && (
                <button className='SimpleButton' type='reset'>Clear</button>
            )}
            <button className='SimpleButton' type='submit'>Search</button>
        </form>
    );
}

export default SearchBar;

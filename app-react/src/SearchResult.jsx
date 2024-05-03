// SearchResult
// Composant affichant une liste de messages (utilisant le composant Messages)
// correspondants à la recherche avec le nombre de résultats trouvés, un message
// "Aucun résultat trouvé" le cas écheant.
// props
// - query contenant le texte recherché pour pouvoir effectuer la recherche
// states
// - messages une liste des messages qui correspondent aux termes de la
// recherche

import { useEffect, useState } from 'react';
import Messages from './Messages';

function SearchResult(props) {
    const [messages, setMessages] = useState([]);
    const { query } = props;

    useEffect(() => {
        // Fetch messages from the API using props.query
    }, [query]);

    return (
        <div className='SearchResult'>
            <p>Found {messages.length} results</p>
            {messages.length === 0 && <p>No results found</p>}
            <ul>
                {messages.map((message) => (
                    <Messages key={message.id} message={message} />
                ))}
            </ul>
        </div>
    );
}

export default SearchResult;

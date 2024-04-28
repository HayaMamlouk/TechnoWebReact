function Profile(props) {
    const { id, name, messages } = props;
    
    return (
        <li className='Profile'>
            <p>ID: {id}</p>
            <p>Name: {name}</p>

            <ul>
                {messages.map((message, index) => (
                    <li key={index}>
                        {message.content}
                    </li>
                ))}
            </ul>
        </li>
    );
}

export default Profile;

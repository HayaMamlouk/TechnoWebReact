import { useState } from 'react';

function SignIn({ toggleHasAccount, setCurrentUser }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    async function login() {
        const response = await fetch('http://localhost:4000/api/auth', {
            body: JSON.stringify({
                login: username,
                password: password,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'PUT',
            credentials: 'include'
        });
        if (response.status === 200) {
            const data = await response.json();
            setCurrentUser(data);
        }
    }

    return (
        <>
            <form className='LandingForm' onSubmit={(e) => {
                e.preventDefault();
                console.log(`Logging in... with username: ${username} and password: ${password}`);
                login();
            }}>
                <h2 className='Title'>Sign In</h2>
                <div className='input-container'>
                    <label className='label' htmlFor='username'>Username</label>
                    <input
                        type='text'
                        id='username'
                        className='input'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        autoComplete='username'
                    />
                </div>
                <div className='input-container'>
                    <label className='label' htmlFor='password'>Password</label>
                    <input
                        type='password'
                        id='password'
                        className='input'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        autoComplete='current-password'
                    />
                </div>
                <button className='submit-button' type='submit'>Sign in</button>
                <span className='not-member-text'>
                    Not a member yet?&nbsp;
                    <button onClick={toggleHasAccount} className='not-member-button'>
                        Create an account
                    </button>
                </span>
            </form>
        </>
    );
}

export default SignIn;

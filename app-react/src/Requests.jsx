import { useEffect, useState } from 'react';
import './Requests.css';

function Requests({ setShownUser }) {
    const [requests, setRequests] = useState([]);

    async function answerRequest(demandId, accept) {
        const response = await fetch(`http://localhost:4000/api/demand/${demandId}`, {
            method: accept ? 'POST' : 'DELETE',
            credentials: 'include'
        });
        if (response.status === 200) {
            fetchData();
        }
    }

    async function fetchData() {
        const response = await fetch(`http://localhost:4000/api/demands`, {
            method: 'GET',
            credentials: 'include'
        });
        if (response.status === 200) {
            const data = await response.json();
            setRequests((data ?? []).reverse());
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    function timeAgo(input) {
        if (Date.now() - input < 5000) {
            // If difference is less than 5s, return "just now"
            return 'just now';
        }
        const date = new Date(input);
        const formatter = new Intl.RelativeTimeFormat('en');
        const ranges = [
            ['years', 3600 * 24 * 365],
            ['months', 3600 * 24 * 30],
            ['weeks', 3600 * 24 * 7],
            ['days', 3600 * 24],
            ['hours', 3600],
            ['minutes', 60],
            ['seconds', 1],
        ];
        const secondsElapsed = (date.getTime() - Date.now()) / 1000;

        for (const [rangeType, rangeVal] of ranges) {
            if (rangeVal < Math.abs(secondsElapsed)) {
                const delta = secondsElapsed / rangeVal;
                return formatter.format(Math.round(delta), rangeType);
            }
        }
    }

    return (
        <ul className='Requests'>
            {(requests ?? []).length > 0 ? (
                requests.map((request) => (
                    <li className='Request' key={request._id}>
                        <span className='RequestDate'>{timeAgo(request.requestedDate)}</span>
                        <div className='RequestContainer'>
                            <span>{request.userDetails.firstname} {request.userDetails.lastname}</span>
                            <span className='RequestUsername'>@{request.userDetails.login}</span>
                            <button className='RequestViewProfile SimpleButton'
                                    onClick={() => setShownUser(request.userDetails)}>
                                View profile
                            </button>
                            <button className='RequestResponseButton' onClick={() => answerRequest(request._id, false)}>
                                ❎
                            </button>
                            <button className='RequestResponseButton' onClick={() => answerRequest(request._id, true)}>
                                ✅
                            </button>
                        </div>
                    </li>
                ))
            ) : (
                <h2>No requests at the moment</h2>
            )}
        </ul>
    );
}

export default Requests;

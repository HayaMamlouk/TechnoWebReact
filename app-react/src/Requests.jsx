import React, { useState, useEffect } from 'react';
import Request from './Request';

function Requests() {
    const [requests, setRequests] = useState([]);

    // Fetch requests from the API when the component mounts
    // useEffect(() => {
    //     fetchRequestsFromAPI();
    // }, []);

    // Function to fetch requests from the API
    // const fetchRequestsFromAPI => {
    // };

    // Function to handle accept request
    // const handleAccept => {
    // };

    // Function to handle reject request
    // const handleReject  => {
    // };

    return (
        <div className='Requests'>
            <ul>
                {requests.map((request) => (
                    <Request
                        key={request.id}
                        request={request}
                        handleAccept={handleAccept}
                        handleReject={handleReject}
                    />
                ))}
            </ul>
        </div>
    );
}

export default Requests;

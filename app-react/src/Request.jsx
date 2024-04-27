import React, { useState } from 'react';

function Request(props) {
    const { request, handleAccept, handleReject } = props;
    const { id, firstname, lastname } = request;

    return (
        <li className='Request'>
            <p>ID: {id}</p>
            <p>First Name: {firstname}</p>
            <p>Last Name: {lastname}</p>

            <button onClick={() => handleAccept(id)}>Accept</button>
            <button onClick={() => handleReject(id)}>Reject</button>
        </li>
    );
} 

export default Request;
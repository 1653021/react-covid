import React from 'react';
import './PatientInfo.css'

const PatientInfo = ({name, address, note, verifyDate}) => {
    return <>
        <div id='title-patient-info'>
            Patient Information
        </div>
        <ul>
            <li>Name: {name}</li>
            <li>Address: {address}</li>
            <li>Note: {note}</li>
            <li>Verify Date: {verifyDate}</li>
        </ul>
    </>
};

export default PatientInfo;
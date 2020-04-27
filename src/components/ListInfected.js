import React, { useEffect } from 'react';
import ListGroup from "react-bootstrap/ListGroup";
import './ListInfected.css'
const ListInfected = ({patients, name_current_patient, onListGroupItemClicked}) => {

    let listInfect = document.querySelectorAll(".infected-patient");

    function scrollTo(name) {
        listInfect = document.querySelectorAll(".infected-patient");
        listInfect.forEach((patient, i) => {
            const patientName = patient.innerText;
            if (patientName === name) {
                patient.scrollIntoView({behavior: 'smooth'});
            }
        })
    }

    useEffect(() =>{
        if (name_current_patient) {
            scrollTo(name_current_patient)
        }
    })
    
    return <>
        <div className='title-list-infected-patient'>
            List Infected Patients
        </div>
        <ListGroup id='wrap-list-infected'>
            {patients && patients.map((patient, i) =>  
                <ListGroup.Item key={'list-infected-' + i} className='infected-patient'
                    onClick={() => {onListGroupItemClicked(patient)}}>
                    {patient.name} 
                </ListGroup.Item>
            )}
        </ListGroup>
    </>
};

export default ListInfected;
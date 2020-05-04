import React, {useEffect, useState} from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PatientInfo from "./PatientInfo";
import Container from "react-bootstrap/Container";
import CovidMap from "./CovidMap";
import ListInfected from "./ListInfected";
import SeekBar from "./SeekBar"
// import axios from 'axios';


const CovidDashboard = (props) => {
    const init_lat = 10.762887, init_lng = 106.6800684;
    const [originPatient, setOriginPatient] = useState([])
    const [currentPatient, setCurrentPatient] = useState();
    const [patients, setPatients] = useState([]);
    const [dateSelectedOfRange, setDateSelectedOfRange] = useState(new Date('2019-12-08'))

    

    const patientMarkerClickedHandler = (patient) => {
        setCurrentPatient(patient);
    }

    const patientListGroupItemClickedHandler = (patient) => {
        setCurrentPatient(patient);
    }

    const handleDateRange = (date) => {
        setDateSelectedOfRange(date)
        updatePatientListWithDateRange(date)
    }

    const updatePatientListWithDateRange = (dateSelectedOfRange) => {
        let result = []
        originPatient.map((patient, index) => {
            const verifyDate = new Date(patient.verifyDate)
            if(verifyDate.getTime() <= dateSelectedOfRange.getTime()) {
                result.push(patient);
            }
        })
        setPatients(result);
        return result
    }

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch("https://cors-anywhere.herokuapp.com/maps.vnpost.vn/apps/covid19/api/patientapi/list")
            res.json()
            .then(
                (response) => {
                    const sort_list_patient = response.data.sort((a, b) => (new Date(a.verifyDate) >= new Date(b.verifyDate)) ? -1 : 1);
                    setOriginPatient(sort_list_patient)
                    let result = []
                    sort_list_patient.map((patient, index) => {
                        const verifyDate = new Date(patient.verifyDate)
                        if(verifyDate.getTime() <= dateSelectedOfRange.getTime()) {
                            result.push(patient);
                        }
                    })
                    setPatients(result);
                },
                (error) => {
                    // setIsLoaded(true);
                    // setError(error);
                }
            )
            
        }
        fetchData(dateSelectedOfRange);
    }, [])
    
    return <Container>
        <Row>
            {currentPatient ? 
                <Col xs={9}><CovidMap onPatientMarkerClicked={patientMarkerClickedHandler} patients={patients} lat={currentPatient.lat} lng={currentPatient.lng}/></Col>
                : <Col xs={9}><CovidMap onPatientMarkerClicked={patientMarkerClickedHandler} patients={patients} lat={init_lat} lng={init_lng}/></Col>
            }
            <Col xs={3}>
                {currentPatient &&
                <PatientInfo name={currentPatient.name} address={currentPatient.address} note={currentPatient.note}
                             verifyDate={currentPatient.verifyDate}/>}

                {currentPatient ? <ListInfected patients={patients} name_current_patient={currentPatient.name} onListGroupItemClicked={patientListGroupItemClickedHandler} /> 
                    : <ListInfected patients={patients} name_current_patient={''} onListGroupItemClicked={patientListGroupItemClickedHandler} /> }
                
            </Col>
        </Row>
        <Row>
            <SeekBar onClickHandleDateRange={handleDateRange} patients={patients}/>
        </Row>
    </Container>
};

export default CovidDashboard;
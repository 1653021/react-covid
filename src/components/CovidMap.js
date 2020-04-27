import React from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

const CovidMap = ({onPatientMarkerClicked, patients, lat, lng}) => {
    return <Map key={'covid-map'} center={[lat, lng]} zoom={13}>
            <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.osm.org/{z}/{x}/{y}.png   "
            />
            {patients && patients.map((patient, i) => 
                <Marker key={'patient-marker' + i} position={[patient.lat, patient.lng]} 
                    onClick={() => {onPatientMarkerClicked(patient)}}>
                    <Popup>
                        <ul>
                            <li>Name: {patient.name}</li>
                            <li>Address: {patient.address}</li>
                            <li>Note: {patient.note}</li>
                            <li>Verify date: {patient.verifyDate}</li>
                        </ul>
                    </Popup>
                </Marker>
            )}
        </Map>;
};

export default CovidMap;

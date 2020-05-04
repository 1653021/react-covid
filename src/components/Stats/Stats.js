import React, {useEffect, useState} from 'react';
import VNGraph from './VNGraph/VNGraph';
import WorldGraph from './WorldGraph/WorldGraph';
import { Row, Col } from "react-bootstrap";
import './Stats.css';


// import classes from "./LineGraph.module.css";

const Stats = () => {
    // const [patientVN, setPatientVN] = useState([]);
    const [dateRange, setDateRange] = useState(new Date());

    useEffect(() => {
        
    }, [])

    return (
        <div>
            <Row >
                <Col md={6}> 
                    <div className="title-graph">
                        Vietname graph
                    </div>
                    <VNGraph />
                </Col>

                <Col md={6}> 
                    <div className="title-graph">
                        World Graph
                    </div>
                    <WorldGraph />
                </Col>
            </Row>
            
        </div>
    )
}

export default Stats;
import React, { Component, useEffect, useState } from 'react'
import Chart from "chart.js";

const options = { year: 'numeric', month: 'long', day: 'numeric' };
let chartRef = React.createRef();

const WorldGraph = (props) => {
    const [patientWorld, setPatientWorld] = useState([]);
    const [dateRange, setDateRange] = useState(new Date());

    useEffect(() => {
        const fetchDataWorld = async () => {
            const res = await fetch("https://cors-anywhere.herokuapp.com/https://td.fpt.ai/corona/corona-total.json")
            res.json()
            .then(
                (response) => {
                    let result = []
                    for (const property in response) {
                        const date = property

                        let resultDate = ""
                        if(date === "Dec 8"){
                            resultDate = new Date(date + ", 2019");
                        }
                        else{
                            resultDate = new Date(date + ", 2020");
                        }
                        if(resultDate <= dateRange) {
                            result.push({ngay: resultDate, array: response[property]});
                        }
                    }
                    setPatientWorld(result);
                    drawChart(result);

                },
                (error) => {
                    // setIsLoaded(true);
                    // setError(error);
                }
            )
        }
        fetchDataWorld();
    }, [])

    const drawChart = (patientWorld) => {
        if(chartRef !== null && chartRef.current !== null){
            const myChartRef = chartRef.current.getContext("2d");

            let dateInfected = [], doubtInfected = [], deadPatients = [], curedPatients = [];

            patientWorld.forEach(patient => {
                dateInfected.push(patient.ngay.toLocaleDateString([],options))
                doubtInfected.push(patient.array[0]);
                deadPatients.push(patient.array[1]);
                curedPatients.push(patient.array[2]);

            })

            
            new Chart(myChartRef, {
                type: "line",
                data: {
                    //Bring in data
                    labels: dateInfected,
                    datasets: [
                        {
                            label: "Nhiem",
                            data: doubtInfected,
                            fill: false,
                            borderColor: "orange"
                        },
                        {
                            label: "Tu vong",
                            data: deadPatients,
                            fill: false,
                            borderColor: "red"
                        },
                        {
                            label: "Khoi benh",
                            data: curedPatients,
                            fill: false,
                            borderColor: "green"
                        },
                    ]
                },
                options: {
                    scales: {
                        xAxes: [{
                            ticks: {
                              autoSkip: true,
                              maxTicksLimit: 18
                            }
                        }]
                    }
                }
            });
        }
    }

    return (
        <div >
            <canvas
                id="myChart"
                ref={chartRef}
            />
        </div>
    )
}

export default WorldGraph;
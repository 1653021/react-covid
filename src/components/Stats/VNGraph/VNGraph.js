import React, { Component, useEffect, useState } from 'react'
import Chart from "chart.js";

const options = { year: 'numeric', month: 'long', day: 'numeric' };
let chartRef = React.createRef();

const VNGraph = (props) => {
    const [patientVN, setPatientVN] = useState([]);
    const [dateRange, setDateRange] = useState(new Date());


    useEffect(() => {
        const fetchDataVN = async () => {
            const res = await fetch("https://cors-anywhere.herokuapp.com/https://td.fpt.ai/corona/corona-chart-vn.json")
            res.json()
            .then(
                (response) => {
                    let result = []
                    for (const property in response) {
                        const date = property.split(/\s+/)[1].split("/");

                        const day = date[0];
                        const month = date[1];

                        const resultDate = new Date(month + "/" + day + "/2020");
                        if(resultDate <= dateRange) {
                            result.push({ngay: resultDate, array: response[property]});
                        }
                    }
                    setPatientVN(result);
                    drawChart(result);

                },
                (error) => {
                    // setIsLoaded(true);
                    // setError(error);
                }
            )
        }
        fetchDataVN();
    }, [])

    const drawChart = (patientVN) => {
        if(chartRef !== null && chartRef.current !== null){
            const myChartRef = chartRef.current.getContext("2d");

            let dateInfected = [], infected = [], doubtInfected = [], cured = [];

            patientVN.forEach(patient => {
                dateInfected.push(patient.ngay.toLocaleDateString([],options))
                infected.push(patient.array[0]);
                doubtInfected.push(patient.array[1]);
                cured.push(patient.array[2]);
            })

            
            new Chart(myChartRef, {
                type: "line",
                data: {
                    //Bring in data
                    labels: dateInfected,
                    datasets: [
                        {
                            label: "Nhiem",
                            data: infected,
                            fill: false,
                            borderColor: "red"
                        }, 
                        {
                            label: "Nghi Nhiem",
                            data: doubtInfected,
                            fill: false,
                            borderColor: "orange"
                        },
                        {
                            label: "Hoi phuc",
                            data: cured,
                            fill: false,
                            borderColor: "green"
                        },
                    ]
                },
                options: {
                    tooltips: {
                        callbacks: {
                          title: function(tooltipItem, data) {
                                return data['labels'][tooltipItem[0]['index']];
                          },
                          beforeLabel: function(tooltipItem, data) {
                            const result = "Nhiem: " + data['datasets'][0]['data'][tooltipItem['index']];
                            return result;
                          },
                          label: function(tooltipItem, data) {
                                const result = "Nghi nhiem: " + data['datasets'][1]['data'][tooltipItem['index']];
                                return result;
                          },
                          afterLabel: function(tooltipItem, data) {
                            const result = "Hoi phuc: " + data['datasets'][2]['data'][tooltipItem['index']];
                            return result;
                          }
                        }
                    },
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

export default VNGraph;
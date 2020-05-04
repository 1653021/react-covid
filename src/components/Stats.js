import React, {useEffect, useState} from 'react';

const Stats = () => {
    const [patientVN, setPatientVN] = useState([]);
    const [patientWorld, setPatientWorld] = useState([]);
    const [dateRange, setDateRange] = useState(new Date());

    useEffect(() => {
        async function fetchDataVN() {
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
                },
                (error) => {
                    // setIsLoaded(true);
                    // setError(error);
                }
            )
        }
        fetchDataVN();

        async function fetchDataWorld() {
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
                    console.log(result)
                    setPatientWorld(result);
                },
                (error) => {
                    // setIsLoaded(true);
                    // setError(error);
                }
            )
        }
        fetchDataWorld();
    }, [])

    return (
        <div>
            Stats
        </div>
    )
}

export default Stats;
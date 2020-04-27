import React, { useState, useEffect } from 'react';
import './SeekBar.css';
import { Range } from 'react-range';

const getDateRange = (start_date, end_date) => {
    start_date = new Date(start_date)
    let dateRange = []
    while(start_date <= end_date) {
        dateRange.push(new Date (start_date))
        start_date.setDate(start_date.getDate() +1);
    }
    return dateRange;
}
const options = { year: 'numeric', month: 'long', day: 'numeric' }
const startDate = new Date('2019-12-08').toLocaleDateString([],options)
const today = new Date().toLocaleDateString([],options)
const dateRange = getDateRange('2019-12-08', new Date())

const SeekBar = ({onClickHandleDateRange, patients}) => {
    
    const [indexDateOfRange, setIndexDateOfRange] = useState([0]);
    const [isActive, setIsActive] = useState(false);

    function toggle() {
        setIsActive(!isActive);
    }

    function reset() {
        setIndexDateOfRange([0]);
        setIsActive(false);
    }

    const getSizeDateRange = (dateRange) => {
        return dateRange.length - 1;
    }

    const handleDateRange = (indexOfDateRange, onClick) => {
        setIndexDateOfRange(indexOfDateRange)
        onClick(dateRange[indexOfDateRange])
    }

    useEffect(() => {
        let interval = null;
        if (isActive) {
          interval = setInterval(() => {
            let updateIndex = []
            updateIndex.push(indexDateOfRange[0] + 1)
            onClickHandleDateRange(dateRange[updateIndex])
            setIndexDateOfRange(updateIndex);
          }, 1000);
        } else if (!isActive && indexDateOfRange !== 0) {
          clearInterval(interval);
        }
        return () => clearInterval(interval);
      }, [isActive, indexDateOfRange]);

    return (
        <div className='wrap-seek-bar'>
            <div className='wrap-current-date-selected'>
                <span className='title-current-date'>
                    Current date: &nbsp;
                </span>
                <span>
                    {
                        dateRange[indexDateOfRange].toLocaleDateString([],options)
                    }
                </span>
                <div>
                    <button className={`button button-primary button-play-pause button-primary-${isActive ? 'active' : 'inactive'}`} onClick={toggle}>
                        {isActive ? 'Pause' : 'Start'}
                    </button>
                    <button className="button button-reset" onClick={reset}>
                        Reset
                    </button>
                </div>
            </div>
            <div className='wrap-title-start-end-date'>
                 <span className='title-start-date'>{startDate}</span>
                 <span className='title-end-date'>{today}</span>
            </div>
            { (typeof(patients) !== 'undefined' || patients != null) ? 
                <Range
                    step={1}
                    min={0}
                    max={getSizeDateRange(dateRange)}
                    values={indexDateOfRange}
                    onChange={indexDateOfRange => handleDateRange(indexDateOfRange, onClickHandleDateRange)}
                    renderTrack={({ props, children }) => (
                        <div
                            {...props}
                            style={{
                            ...props.style,
                            height: '6px',
                            width: '100%',
                            backgroundColor: '#ccc'
                            }}
                        >
                            {children}
                        </div>
                    )}
                    renderThumb={({ props }) => (
                        <div
                            {...props}
                            style={{
                            ...props.style,
                            height: '42px',
                            width: '42px',
                            backgroundColor: '#999'
                            }}
                        />
                    )}
                />
                : ''
            }
        </div>
    )
};

export default SeekBar;
// (patients[indexDateOfRange].toLocaleDateString([],options))
{/* <Range
                    step={1}
                    min={0}
                    max={getSizeDateRange(dateRange)}
                    values={indexDateOfRange}
                    onChange={indexDateOfRange => handleDateRange(indexDateOfRange, onClickHandleDateRange)}
                    renderTrack={({ props, children }) => (
                        <div
                            {...props}
                            style={{
                            ...props.style,
                            height: '6px',
                            width: '100%',
                            backgroundColor: '#ccc'
                            }}
                        >
                            {children}
                        </div>
                    )}
                    renderThumb={({ props }) => (
                        <div
                            {...props}
                            style={{
                            ...props.style,
                            height: '42px',
                            width: '42px',
                            backgroundColor: '#999'
                            }}
                        />
                    )}
                />  */}
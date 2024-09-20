import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DateRangeSelector = ({ onSelect }) => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const handleSubmit = () => {
        if (startDate && endDate) {
            onSelect(startDate, endDate);
        }
    };

    return (
        <div>
            <DatePicker
                selected={startDate}
                onChange={date => setStartDate(date)}
                placeholderText="Start Date"
                dateFormat="yyyy/MM/dd"
            />
            <DatePicker
                selected={endDate}
                onChange={date => setEndDate(date)}
                placeholderText="End Date"
                dateFormat="yyyy/MM/dd"
            />
            <button onClick={handleSubmit}>Get Report</button>
        </div>
    );
};

export default DateRangeSelector;

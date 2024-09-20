// React component to select a month and year
import React, { useState } from 'react';

const MonthSelector = ({ onSelect }) => {
    const months = [
        { value: 1, label: 'Jan' }, { value: 2, label: 'Feb' },
        { value: 3, label: 'Mar' }, { value: 4, label: 'Apr' },
        { value: 5, label: 'May' }, { value: 6, label: 'Jun' },
        { value: 7, label: 'Jul' }, { value: 8, label: 'Aug' },
        { value: 9, label: 'Sep' }, { value: 10, label: 'Oct' },
        { value: 11, label: 'Nov' }, { value: 12, label: 'Dec' }
    ];
    
    const years = [...Array(5).keys()].map(i => (new Date().getFullYear() - i));

    const [selectedMonth, setSelectedMonth] = useState(null);
    const [selectedYear, setSelectedYear] = useState(null);

    const handleSubmit = () => {
        if (selectedMonth && selectedYear) {
            onSelect(selectedMonth, selectedYear);
        }
    };

    return (
        <div>
            <select onChange={e => setSelectedMonth(parseInt(e.target.value))}>
                <option value="">Select Month</option>
                {months.map(month => (
                    <option key={month.value} value={month.value}>{month.label}</option>
                ))}
            </select>
            <select onChange={e => setSelectedYear(parseInt(e.target.value))}>
                <option value="">Select Year</option>
                {years.map(year => (
                    <option key={year} value={year}>{year}</option>
                ))}
            </select>
            <button onClick={handleSubmit}>Get Report</button>
        </div>
    );
};

export default MonthSelector;

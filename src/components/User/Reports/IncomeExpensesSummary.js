import React, { useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Bar } from 'react-chartjs-2';
import api from  '../../../services/api';

const IncomeExpenseSummary = () => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [reportData, setReportData] = useState(null);

    const handleGenerateReport = async () => {
        if (!startDate || !endDate) {
            alert('Please select both start and end dates.');
            return;
        }

        try {
            const response = await api.get('/reports/income-expense-summary', {
                params: {
                    startDate: startDate.toISOString(),
                    endDate: endDate.toISOString(),
                }
            });

            setReportData(data);
        } catch (error) {
            console.error('Error fetching report data:', error);
        }
    };

    const chartData = {
        labels: ['Income', 'Expenses'],
        datasets: [
            {
                label: 'Amount',
                data: [reportData?.totalIncome || 0, reportData?.totalExpenses || 0],
                backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'],
            },
        ],
    };

    return (
        <div>
            <h2>Income vs Expense Summary</h2>
            <div>
                <label>Select Date Range:</label>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        selectsStart
                        startDate={startDate}
                        endDate={endDate}
                        placeholderText="Start Date"
                    />
                    <DatePicker
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                        selectsEnd
                        startDate={startDate}
                        endDate={endDate}
                        minDate={startDate}
                        placeholderText="End Date"
                    />
                    <button onClick={handleGenerateReport}>Generate Report</button>
                </div>
            </div>
            {reportData && (
                <>
                    <div style={{ marginTop: '20px' }}>
                        <Bar data={chartData} />
                    </div>
                    <div style={{ marginTop: '20px' }}>
                        <table>
                            <thead>
                                <tr>
                                    <th>Type</th>
                                    <th>Total Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Income</td>
                                    <td>{reportData.totalIncome}</td>
                                </tr>
                                <tr>
                                    <td>Expenses</td>
                                    <td>{reportData.totalExpenses}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </>
            )}
        </div>
    );
};

export default IncomeExpenseSummary;

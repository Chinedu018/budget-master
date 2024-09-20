import React from 'react';
import { Bar } from 'react-chartjs-2';

const TotalReport = ({ data }) => {
    if (!data) return null;

    const chartData = {
        labels: ['Income', 'Expenses'],
        datasets: [
            {
                label: 'Total Amount',
                data: [data.totalIncome, data.totalExpenses],
                backgroundColor: ['#4CAF50', '#FF6384'],
            },
        ],
    };

    return (
        <div>
            <h3>Total Income & Expenses</h3>
            <div className='row'>
                <div className='col-12 col-md-6'>
            <Bar data={chartData} />
            </div>
                <div className='col-12 col-md-6'>
                    <div className='card'>
                        <div className='card-body'>

            <table className='table table-striped table-hover'>
                <thead>
                    <tr>
                        <th>Type</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Income</td>
                        <td>{data.totalIncome}</td>
                    </tr>
                    <tr>
                        <td>Expenses</td>
                        <td>{data.totalExpenses}</td>
                    </tr>
                </tbody>
            </table>
            </div>
                    </div>
                </div>
            </div>
            
           
        </div>
    );
};

export default TotalReport;

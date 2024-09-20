import React from 'react';
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
    ArcElement // Import ArcElement
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';

// Registering the necessary components, including ArcElement
ChartJS.register(
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
    ArcElement // Register ArcElement
);

const CategoryBreakdownReport = ({ data }) => {

    if (!data) return null;

    const labels = data.map(item => item.source);
    const expenseData = data.map(item => item.totalIncome);

    const chartData = {
        labels,
        datasets: [
            {
                label: 'Income by Source',
                data: expenseData,
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50'],
            },
        ],
    };

    return (
        <div>
            <h3>Income Breakdown by Source</h3>
            {data.length <= 0 && (
                <div className='row'>
                    <div className='col-12'>
                <div className='alert alert-danger'>
                    Sorry, no data exists for the selected report range
                    </div>
                    </div>
                    </div>  
            )}
            <div className='row'>
                <div className='col-12 col-md-6'>
                <Pie data={chartData} />
                </div>
                <div className='col-12 col-md-6'>
                    <div className='card'>
                        <div className='card-body'>

                        
                <table className='table table-striped table-hover'>
                <thead>
                    <tr>
                        <th>Income Source</th>
                        <th>Total Income</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td>{item.source}</td>
                            <td>{item.totalIncome}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
                    </div>
                </div>
            </div>
            
           
        </div>
    );
};

export default CategoryBreakdownReport;

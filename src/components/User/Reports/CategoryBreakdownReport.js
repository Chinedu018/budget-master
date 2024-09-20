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
import ChartDataLabels from 'chartjs-plugin-datalabels';

// Registering the necessary components, including ArcElement
ChartJS.register(
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
    ArcElement, // Register ArcElement
    ChartDataLabels
);

const CategoryBreakdownReport = ({ data }) => {

    if (!data) return null;

    const labels = data.map(item => item.categoryName);
    const expenseData = data.map(item => item.totalExpenses);

    const chartData = {
        labels,
        datasets: [
            {
                label: 'Expenses by Category',
                data: expenseData,
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50'],
            },
        ],
    };
    const options = {
        plugins: {
          datalabels: {
            formatter: (value, ctx) => {
              let sum = 0;
              let dataArr = ctx.chart.data.datasets[0].data;
              dataArr.map(data => {
                sum += data;
              });
              let percentage = (value * 100 / sum).toFixed(2);
              return percentage + '%';
            },
            color: '#fff',
          }
        }
      };
      
    return (
        <div>
            <h3>Category-wise Expense Breakdown</h3>
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
                <Pie data={chartData}   options={options} />
                </div>
                <div className='col-12 col-md-6'>
                    <div className='card'>
                        <div className='card-body'>

                        
                <table className='table table-striped table-hover'>
                <thead>
                    <tr>
                        <th>Category</th>
                        <th>Total Expenses</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td>{item.categoryName}</td>
                            <td>{item.totalExpenses}</td>
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

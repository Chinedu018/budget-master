import React from 'react';
import { Line, Bar } from 'react-chartjs-2';
import DynamicChart from '../../DynamicChart';

const MonthlyBreakdownReport = ({ data }) => {
    
    console.log(data);
    //return;
    //try {
            if (!data) return null;
            let labels = [];
            let incomeData;
            let expenseData;    
    //let i = 0
    // console.log(data.incomeByMonth.length);
    // for (let i = 0; i < data.incomeByMonth.length; i++) {
    //     labels[i] = `${data.incomeByMonth[i]._id.month}/${data.incomeByMonth[i]._id.year}`;
    // }
    
    labels = data.map(item => `${item.month}/${item.year}`);
     incomeData = data.map(item => item.totalIncome);
     expenseData = data.map(item => item.totalExpenses);

     
    

    const chartData = {
        labels,
        datasets: [
            {
                label: 'Income',
                data: incomeData,
                borderColor: '#f00',
                backgroundColor: '#FF6384',
                fill: true,
            },
            {
                label: 'Expenses',
                data: expenseData,
                borderColor: '#000',
                backgroundColor: '#36A2EB',
                fill: true,
            },
        ],
    };

   
    return (
        <div>
            <h3 >Monthly Income & Expenses Breakdown</h3>
            
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
            <Bar data={chartData} />
            </div>
                <div className='col-12 col-md-6'>
                    <div className='card'>
                        <div className='card-body'>

                        <table className='table table-striped table-hover'>
                <thead>
                    <tr>
                        <th>Month/Year</th>
                        <th>Income</th>
                        <th>Expenses</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td>{`${item.month}/${item.year}`}</td>
                            <td>{item.totalIncome}</td>
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

export default MonthlyBreakdownReport;

import React, { useEffect, useState } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import api from  '../../../services/api' ; // Assume you have an API utility
import {
    Chart,
    LineElement,    // For line elements
    PointElement,   // For point elements
    LinearScale,
    CategoryScale,
    Title,
    Tooltip,
    BarElement,
    Legend
  } from 'chart.js';
import MainComponent from '../../MainComponent';
  
  // Register the components
  Chart.register(LineElement, PointElement, BarElement, LinearScale, CategoryScale, Title, Tooltip, Legend);
  
  
const MonthlyBreakdownChart = () => {
    const [chartData, setChartData] = useState({ labels: [], datasets: [] });

    const formatMonthLabel = (month, year) => {
        const monthNames = [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ];
        return `${monthNames[month - 1]} ${year}`;
    };
    
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get('/reports/monthly-breakdown', {withCredentials:true});
                
                const { incomeByMonth, expenseByMonth } = response.data;

                //console.log(response.data);
                if (incomeByMonth && incomeByMonth.length > 0) {
                   // console.log(incomeByMonth.map(item => `Month ${item.totalIncome}`));
                    const labels = incomeByMonth.map(item => formatMonthLabel(item._id.month, item._id.year));
                const incomeData = incomeByMonth.map(item => item.totalIncome);
                const expenseData = expenseByMonth.map(item => item.totalExpenses);
                
                setChartData({
                    labels,
                    datasets: [
                        {
                            label: 'Income',
                            data: incomeData,
                            borderColor: 'rgba(75, 192, 192, 1)',
                            backgroundColor: 'rgba(75, 192, 192, 1)',
                        },
                        {
                            label: 'Expenses',
                            data: expenseData,
                            borderColor: 'rgba(255, 99, 132, 1)',
                            backgroundColor: 'rgba(255, 99, 132, 1)',
                        },
                    ],
                });

                console.log("chartData: ", chartData )
                
            }
            } catch (error) {
                console.error('Error fetching monthly breakdown data', error);
            }
        };

        fetchData();
    }, []);
    
    console.log(chartData);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        let label = context.dataset.label || '';
                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed.y !== null) {
                            label += context.parsed.y;
                        }
                        return label;
                    },
                },
            },
        },
        scales: {
            x: {
                stacked: true,
            },
            y: {
                stacked: true,
            },
        },
    };
    

    const handleMonthSelection = async (month, year) => {
        try {
            const response = await fetch(`/api/income-by-month?month=${month}&year=${year}`);
            const data = await response.json();
            // Process and update chart with data
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    
    const handleDateRangeSelection = async (startDate, endDate) => {
        try {
            const response = await fetch(`/api/income-by-range?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`);
            const data = await response.json();
            // Process and update chart with data
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    
    return (
      <div>
        <div>
            <MainComponent />
        </div>

        <h2>Monthly Income and Expense Breakdown</h2>
        {/* {(data.length > 0 ? <Line data={data} /> : "Nothing found")} */}
        <div className="row">
          <div className="col-12 col-md-6">
            <Line data={chartData} />;
          </div>
          <div className="col-12 col-md-6">
            <Bar data={chartData} options={options} />
          </div>
        </div>
      </div>
    );
};

export default MonthlyBreakdownChart;

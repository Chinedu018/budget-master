import React, { useState } from 'react';
import DynamicChart from './DynamicChart';
import MonthSelector from './MonthSelector'; // or DateRangeSelector
import api from '../services/api';

const MainComponent = () => {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  const handleMonthSelection = async (month, year) => {
    try {
      const response = await  api.get(`/reports/income-by-month?month=${month}&year=${year}`, {withCredentials:true});
      const data = await response.data;
      setChartData({
        labels: data.map(item => `${item._id.month}/${item._id.year}`), // Adjust based on actual data structure
        datasets: [
          {
            label: 'Income',
            data: data.map(item => item.totalIncome),
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
          },
        ],
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleDateRangeSelection = async (startDate, endDate) => {
    try {
      const response = await api.get(`/reports/income-by-range?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`, {withCredentials:true});
      const data = await response.data
      setChartData({
        labels: data.map(item => `${item._id.month}/${item._id.year}`), // Adjust based on actual data structure
        datasets: [
          {
            label: 'Income',
            data: data.map(item => item.totalIncome),
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
          },
        ],
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <MonthSelector onSelect={handleMonthSelection} />
      {/* <DateRangeSelector onSelect={handleDateRangeSelection} /> */}
      <DynamicChart data={chartData} />
    </div>
  );
};

export default MainComponent;

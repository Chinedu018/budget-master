import React, { useState, useEffect } from "react";
import DynamicChart from "../DynamicChart"; // Adjust the import based on your folder structure
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import api from "../../services/api";
import ExpenseCategoryBreakdown from "./Reports/ExpenseCategoryBreakdown2";

const Report = () => {
  const [selectedReportTitle, setSelectedReportTitle] = useState("");
  const [selectedReport, setSelectedReport] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  let reportToDisplay;
  
  const handleReportSelection = (e) => {
    setSelectedReport(e.target.value);
  };
  const handleReportTitleSelection = (e) => {
    setSelectedReportTitle(e.target.value);
  };
  useEffect(() => {
    fetchReportData();
  }, []);

  const formatMonthLabel = (month, year) => {
    const monthNames = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    return `${monthNames[month - 1]} ${year}`;
};


  const fetchChatReportwithMonthAndYear = async (response) => {
    if (response) {
      const data = await response.data;
      console.log(data);
      setChartData({
        labels: data.map((item) => `${item._id.month}/${item._id.year}`), // Adjust based on actual data structure
        datasets: [
          {
            label: "Income",
            data: data.map((item) => item.totalIncome),
            borderColor: "rgba(75, 192, 192, 1)",
            backgroundColor: "rgba(75, 192, 192, 1)",
          },
          {
            label: "Expenses",
            data: data.map((item) => item.totalExpenses),
            borderColor: "rgba(255, 99, 132, 1)",
            backgroundColor: "rgba(255, 99, 132, 1)",
          },
        ],
      });
        }
  }
  const fetchChatReportwithTotalIncomeAndExpense = async (response) => {
    console.log(response);
    if (response) {
      const data = await response.data;
      console.log(data);
      const { incomeByMonth, expenseByMonth } = response.data;

      //console.log(response.data);
      if (incomeByMonth && incomeByMonth.length > 0) {
         // console.log(incomeByMonth.map(item => `Month ${item.totalIncome}`));
          const labels = incomeByMonth.map(item => formatMonthLabel(item._id.month, item._id.year));
      const incomeData = incomeByMonth.map(item => item.totalIncome);
      const expenseData = expenseByMonth.map(item => item.totalExpenses);

      setChartData({
        labels: incomeData, // Adjust based on actual data structure
        datasets: [
          {
            label: "Income",
            data: incomeData,
            borderColor: "rgba(75, 192, 192, 1)",
            backgroundColor: "rgba(75, 192, 192, 1)",
          },
          {
            label: "Expenses",
            data:  expenseData,
            borderColor: "rgba(255, 99, 132, 1)",
            backgroundColor: "rgba(255, 99, 132, 1)",
          },
        ],
      });

    }
        }
  }

  const fetchChatReportwithCategory = async (response) => {
    console.log(response);
    if (response) {
      const data = await response.data;
      
      //console.log(response.data);
      if ( 1 == 1) { // (totalExpenses && totalExpenses.length > 0) {


        const generateColors = (count) => {
          const colors = [];
          for (let i = 0; i < count; i++) {
            // Generate a random color
            const color = `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.6)`;
            colors.push(color);
          }
          return colors;
        };
        
        // Extract data and labels
        const labels = data.map(item => item.categoryName);
        const expenseData = data.map(item => item.totalExpenses);
        
        // Generate a color for each category
        const colors = generateColors(data.length);
        
        // Create a dataset for each category
        const datasets = data.map((item, index) => ({
          label: item.categoryName,
          data: [item.totalExpenses],
          borderColor: colors[index],
          backgroundColor: colors[index],
        }));
        console.log(datasets)
        setChartData({
          labels: labels,
          datasets: datasets,
        });
        
    }
        }
  }

  const fetchReportData = async () => {
    try {
        const getQueryStringParameters = (selectedReportOption) => {
            //set query parameters based on month or range
            if (selectedReportOption === "Monthly") {
              const month = startDate.getMonth() + 1; // getMonth() is zero-indexed
              const year = startDate.getFullYear();
              return `?month=${month}&year=${year}`
            } else if (selectedReportOption === "DateRange") {
              return  `?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`
            } else {
                return ''; //return empty. no date filder parameter
            }
          }
      
      let response;
      console.log(selectedReportTitle);
        if (selectedReportTitle === "categorybreakdown") {
            response = await api.get(`/reports/category-breakdown${getQueryStringParameters(selectedReport)}`,
                { withCredentials: true }
              );
              reportToDisplay =response;
              
              fetchChatReportwithCategory(response);
            } else if (selectedReportTitle === "monthlybreakdown") {
          response = await api.get(`/reports/monthly-breakdown${getQueryStringParameters(selectedReport)}`,
          { withCredentials: true });
        
          fetchChatReportwithMonthAndYear(response);

        } else if (selectedReportTitle === "incomebymonth") {
              response = await api.get(
          `/reports/income-by-range?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`,
          { withCredentials: true }
        );

        fetchChatReportwithMonthAndYear(response);
        }

       
      
    //   if (selectedReport === "Monthly") {
    //     const month = startDate.getMonth() + 1; // getMonth() is zero-indexed
    //     const year = startDate.getFullYear();
    //     response = await api.get(
    //       `/reports/income-by-month?month=${month}&year=${year}`,
    //       { withCredentials: true }
    //     );
    //   } else if (selectedReport === "DateRange") {
    //     response = await api.get(
    //       `/reports/income-by-range?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`,
    //       { withCredentials: true }
    //     );
    //   }
     

    // if (response) {
    //     const data = await response.data;
    //     console.log(data);
    //     setChartData({
    //       labels: data.map((item) => `${item.totalIncome}/${item.totalExpense}`), // Adjust based on actual data structure
    //       datasets: [
    //         {
    //           label: "Income",
    //           data: data.map((item) => item.totalIncome),
    //           borderColor: "rgba(75, 192, 192, 1)",
    //           backgroundColor: "rgba(75, 192, 192, 1)",
    //         },
    //         {
    //           label: "Expenses",
    //           data: data.map((item) => item.totalExpense),
    //           borderColor: "rgba(255, 99, 132, 1)",
    //           backgroundColor: "rgba(255, 99, 132, 1)",
    //         },
    //       ],
    //     });

      
} catch (error) {
      console.error("Error fetching report data:", error);
    }
  };



  return (
    <div className="report-container">
      <div class="page-wrapper">
        <div class="content">
          <div class="sss">
            <div class="row">
              <div class="col-12 text-center">
                <h2>Welcome to the Reports Section</h2>
                <p>Please select a report from the below to continue</p>
              </div>
              <div class="col-12">
                <h5>Select Report Title</h5>
                <div class="form-group">
                  <div class="input-groupicon">
                    <select
                      className="form-control"
                      value={selectedReportTitle}
                      onChange={handleReportTitleSelection}
                    >
                      <option value="">-- Select Report By Title --</option>
                      <option value="allincome">My Income</option>
                      <option value="allexpense">My Expenses</option>
                      <option value="monthlybreakdown">Monthly Breakdown</option>
                      <option value="categorybreakdown">Category Breakdown</option>
                      <option value="incomebymonth">Monthly Income Breakdown</option>
                      <option value="incomebyrange">Category Breakdown</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="col-md-3 col-sm-6 col-12">
                <h5>Select Range</h5>
                <div class="form-group">
                  <div class="input-groupicon">
                    <select
                      className="form-control"
                      value={selectedReport}
                      onChange={handleReportSelection}
                    >
                      <option value="">-- Select Report --</option>
                      <option value="Monthly">Monthly Report</option>
                      <option value="DateRange">Date Range Report</option>
                    </select>
                  </div>
                </div>
              </div>

              {selectedReport === "Monthly" && (
                <div class="col-md-3 col-sm-6 col-12">
                  <div class="form-group">
                    <div class="input-groupicon">
                      <h5>Select Month</h5>
                      <DatePicker
                        className="form-control w-100"
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        dateFormat="MM/yyyy"
                        showMonthYearPicker
                      />
                    </div>
                  </div>
                </div>
              )}

              {selectedReport === "DateRange" && (
                <div class="col-md-6 col-sm-12 col-12">
                  <div className="row">
                    <div class="col-6">
                      <div class="form-group">
                        <div class="input-groupicon">
                          <h5>Start Date</h5>

                          <DatePicker
                            className="form-control w-100"
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            selectsStart
                            startDate={startDate}
                            endDate={endDate}
                          />
                        </div>
                      </div>
                    </div>
                    <div class="col-6">
                      <div class="form-group">
                        <div class="input-groupicon">
                          <h5>End Date</h5>
                          <DatePicker
                            className="form-control w-100"
                            selected={endDate}
                            onChange={(date) => setEndDate(date)}
                            selectsEnd
                            startDate={startDate}
                            endDate={endDate}
                            minDate={startDate}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div class="col-md-3 col-sm-6 col-12">
                <button
                  onClick={fetchReportData}
                  disabled={!selectedReport}
                  className="btn btn-submit p-3 mt-3"
                >
                  Generate Report
                </button>
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                {chartData.labels.length > 0 && (
                  <DynamicChart data={chartData} />
                )}

                
              </div>
            </div>
            <h1>Report</h1> 
            
            {<ExpenseCategoryBreakdown response={reportToDisplay}  />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;

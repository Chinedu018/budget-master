import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TotalReport from "./Reports/TotalReport";
import MonthlyBreakdownReport from "./Reports/MonthlyBreakdownReport";
import CategoryBreakdownReport from "./Reports/CategoryBreakdownReport";
import IncomeSourceReport from "./Reports/IncomeSourceReport";
import api from "../../services/api";
import AllExpenseReport from "./Reports/AllExpenseReport";
import AllIncomeReport from "./Reports/AllIncomeReport";

const Reports = () => {
  const [reportType, setReportType] = useState("");
  const [selectedReportRange, setSelectedReportRange] = useState("");

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [month, setMonth] = useState(new Date());
  const [reportData, setReportData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Clear report data when report type changes
    setReportData(null);
  }, [reportType]);

  const handleReportType = (e) => {
    setReportData(null);
    setReportType(e.target.value);
  };

  const handleReportSelection = (e) => {
    setSelectedReportRange(e.target.value);
  };

  const getQueryStringParameters = (selectedReportRange) => {
    //set query parameters based on month or range

    if (selectedReportRange === "monthly") {
      const _month = month.getMonth() + 1; // getMonth() is zero-indexed
      const _year = month.getFullYear();
      return `?month=${_month}&year=${_year}`;
    } else if (selectedReportRange === "daterange") {
      return `?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`;
    } else {
      return ""; //return empty. no date filder parameter
    }
  };

  const handleFetchReport = async () => {
    let url = "";

    switch (reportType) {
      case "totals":
        url = "/reports/totals";
        break;
      case "monthly-breakdown":
        url = `/reports/monthly-breakdown`;
        break;
      case "category-breakdown":
        url = `/reports/category-breakdown`;
        break;
      case "income-source-breakdown":
        url = `/reports/income-source-breakdown`;
        break;
        case "all-expense":
        url = `/reports/all-expense`;
        break;
        case "all-income":
        url = `/reports/all-income`;
        break;
      default:
        setError("Please Select a Report type");
        return;
    }

    try {
      url = `${url}${getQueryStringParameters(selectedReportRange)}`;
      console.log(url);
      const response = await api.get(url, { withCredentials: true });
      setReportData(response.data);
      setError(null);
    } catch (err) {
      console.error("Error fetching report:", err);
      setError(
        "Sorry, could not connect to Server. Please refresh your page and try again"
      );
    }
  };

  return (
    <div>
      <div className="page-wrapper">
        <div className="content">
          <h2>Reports</h2>
          <div>
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-body">
                    <div className="row">
                      <div className="form-group col-12 col-md-3">
                        <label>Select Report Type: </label>
                        <select
                          className="form-control"
                          value={reportType}
                          onChange={handleReportType}
                        >
                          <option value="">Select a report</option>
                          <option value="totals">Total Income & Expense</option>
                          <option value="monthly-breakdown">
                            Monthly Breakdown
                          </option>
                          <option value="category-breakdown">
                            Category-wise Breakdown
                          </option>
                          <option value="income-source-breakdown">
                            Income by Source Breakdown
                          </option>
                          <option value="all-expense">
                            All Expense Listing
                          </option>
                          <option value="all-income">All Income Listing</option>
                        </select>
                      </div>
                      <div class="form-group col-12 col-md-3">
                        <label>Report Range: </label>
                        <div class="input-groupicon">
                          <select
                            className="form-control"
                            value={selectedReportRange}
                            onChange={handleReportSelection}
                          >
                            <option value="">-- View All --</option>
                            <option value="monthly">Monthly Report</option>
                            <option value="daterange">Date Range Report</option>
                          </select>
                        </div>
                      </div>
                      <div className="form-group col-6">
                        {selectedReportRange === "monthly" && (
                          <div>
                            <label>Select Month: </label>
                            <DatePicker
                              className="form-control"
                              selected={month}
                              onChange={(date) => setMonth(date)}
                              dateFormat="MM/yyyy"
                              showMonthYearPicker
                            />
                          </div>
                        )}

                        {selectedReportRange === "daterange" && (
                          <div className="row">
                            <div className="col-6">
                              <label>From Date: </label>
                              <DatePicker
                                className="form-control"
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                              />
                            </div>
                            <div className="col-6">
                              <label>To Date: </label>

                              <DatePicker
                                className="form-control"
                                selected={endDate}
                                onChange={(date) => setEndDate(date)}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="col-12">
                        <button
                          className="btn btn-submit"
                          onClick={handleFetchReport}
                        >
                          Generate Report
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {error !== null && (
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-12">
                        <div className="alert alert-danger">{error}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {error === null && (
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-body">
                    {/* Conditional rendering based on reportType and reportData */}
                    {reportType === "totals" && reportData && (
                      <TotalReport data={reportData} />
                    )}
                    {reportType === "monthly-breakdown" && reportData && (
                      <MonthlyBreakdownReport data={reportData} />
                    )}
                    {reportType === "category-breakdown" && reportData && (
                      <CategoryBreakdownReport data={reportData} />
                    )}
                    {reportType === "income-source-breakdown" && reportData && (
                      <IncomeSourceReport data={reportData} />
                    )}
                    {reportType === "all-expense" && reportData && (
                      <AllExpenseReport  data={reportData} />
                    )}
                    {reportType === "all-income" && reportData && (
                      <AllIncomeReport    data={reportData} />
                      
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reports;

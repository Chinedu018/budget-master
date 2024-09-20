import React, {useEffect, useState} from 'react';
import {useUser } from '../../services/UserContext';
import api from '../../services/api';
import MonthlyBreakdownChart from './Reports/MonthlyBreakdownChart';
import CategoryBreakdownReport from './Reports/CategoryBreakdownReport';
import IncomeSourceBreakdown from './Reports/IncomeSourceReport';

const Dashboard = () => {
    const { userRole, userName } = useUser();
    const [error, setError] = useState(null);
    const [reports, setReports] = useState({
        categoryBreakdown: null,
        incomeSourceBreakdown: null,
        totals: null,
      });
      const [loading, setLoading] = useState(true);

      // useEffect to fetch all reports once on component mount
  useEffect(() => {
    const fetchAllReports = async () => {
      try {
        setLoading(true); // Start loading

        // Fetch all reports in parallel
        const [categoryBreakdown, incomeSourceBreakdown, totals] = await Promise.all([
            handleFetchReport('category-breakdown'),
            handleFetchReport('income-source-breakdown'),
            handleFetchReport('totals'),
        ]);


        // Update state with the fetched data
        setReports({
          categoryBreakdown,
          incomeSourceBreakdown,
          totals,
        });

      } catch (err) {
        console.log(err.message);
        setError(err.message); // Set error if any fetch fails
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchAllReports();
  }, []);


    const handleFetchReport = async (reportType) => {
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
          url = `${url}`;
          console.log(url);
          const response = await api.get(url, { withCredentials: true });
          //setReports(response.data);
          return response.data;
          setError(null);
        } catch (err) {
          console.error("Error fetching report:", err);
          
        }
     

        };


    return (
        <div>
            <div class="page-wrapper">
            <div class="content">
                <div class="row">
                    <div class="col-12">
                    <div class="card mb-3">
                    <div class="card-body">
                      <h1>Welcome, {(userName && (userName)) || 'User'}</h1>
                    </div>
                </div>
                    </div>
                    <div class="col-lg-3 col-sm-6 col-12">
                        <div class="dash-widget ">
                            <div class="dash-widgetimg">
                                <span><img src="/assets/img/icons/dash1.svg" alt="img" /></span>
                            </div>
                            <div class="dash-widgetcontent">
                                <h5><span class="counters" data-count={reports.incomeSourceBreakdown && (
                                reports.incomeSourceBreakdown.length
                               ) || 0 
                                }>
                               {reports.incomeSourceBreakdown && (
                                reports.incomeSourceBreakdown.length || 0
                               ) || 0} 
                                    </span></h5>
                                <h6>Unique Income Sources</h6>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 col-sm-6 col-12">
                        <div class="dash-widget dash1">
                            <div class="dash-widgetimg">
                                <span><img src="/assets/img/icons/dash2.svg" alt="img" /></span>
                            </div>
                            <div class="dash-widgetcontent">
                                <h5><span class="counters" data-count={reports.categoryBreakdown && (
                                reports.categoryBreakdown.length
                               ) || 0 
                                }>
                               {reports.categoryBreakdown && (
                                reports.categoryBreakdown.length || 0
                               ) || 0} </span></h5>
                                <h6>Expense Categories</h6>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 col-sm-6 col-12">
                        <div class="dash-widget dash2">
                            <div class="dash-widgetimg">
                                <span><img src="/assets/img/icons/dash3.svg" alt="img" /></span>
                            </div>
                            <div class="dash-widgetcontent">
                                <h5>£<span class="counters" data-count={reports.totals && (
                                reports.totals.totalIncome
                               ) || 0 
                                }>
                               {reports.totals && (
                                reports.totals.totalIncome
                               ) || 0} </span></h5>
                                <h6>Total Income</h6>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 col-sm-6 col-12">
                        <div class="dash-widget dash3">
                            <div class="dash-widgetimg">
                                <span><img src="/assets/img/icons/dash4.svg" alt="img" /></span>
                            </div>
                            <div class="dash-widgetcontent">
                                <h5>£<span class="counters" data-count={reports.totals && (
                                reports.totals.totalExpenses
                               ) || 0 
                                }>
                               {reports.totals && (
                                reports.totals.totalExpenses
                               ) || 0} </span></h5>
                                <h6>Total Expenses</h6>
                            </div>
                        </div>
                    </div>
                    
                </div>

                <div class="row">
                    <div class="col-lg-6 col-sm-12 col-12 d-flex">
                        <div class="card flex-fill">
                            <div class="card-header pb-0 d-flex justify-content-between align-items-center">
                                <h5 class="card-title mb-0"> Income at a Glance </h5>
                                
                            </div>
                            <div class="card-body">
                                
                            { loading && (
                   <div>Loading...</div>
               )}
               
               { !loading && (
                   <IncomeSourceBreakdown data={reports.incomeSourceBreakdown} />
                   
               )} 
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6 col-sm-12 col-12 d-flex">
                        <div class="card flex-fill">
                            <div class="card-header pb-0 d-flex justify-content-between align-items-center">
                                <h4 class="card-title mb-0">Expenses at a Glance</h4>
                               
                            </div>
                            <div class="card-body">
                                <div class="table-responsive dataview">
               { loading && (
                   <div>Loading...</div>
               )}
               { !loading && (
                   <CategoryBreakdownReport data={reports.categoryBreakdown} />
               )} 
             
                                
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
};

export default Dashboard;
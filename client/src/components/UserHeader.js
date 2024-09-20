import React from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { useUser } from "../services/UserContext";
// import css from './UserHeader.css'
const UserHeader = () => {
  const navigate = useNavigate();
const {userRole} = useUser();
  // Logout handler function
  const handleLogout = async () => {
    try {
      await api.post("/auth/logout", {}, { withCredentials: true });
      // Optionally redirect to login page
      
      navigate("/login");

    } catch (error) {
      console.error("Logout failed:", error);
      // Optionally handle logout failure
    }
  };

  return (
    <div>
      {/* <div id="global-loader">
        <div className="whirly-loader"> </div>
      </div> */}
      <nav class="navbar navbar-expand-lg navbar-dark bg-theme  fixed-top">
        <a class="navbar-brand float-left" href="#">
        <img src="/assets/img/logo.png" alt="img" style={{height:'40px', marginLeft:"30px"}} />
        </a>
        
        <button class="navbar-toggler text-white" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            
                <i className="fa fa-list-alt "></i>
                &nbsp; Menu
            
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
                <li class="nav-item active">
                    <a class="nav-link" href="/user/dashboard">
                    <i class="fas fa-th-large"></i>
                        Dashboard
                    </a>
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="incomeDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i class="fas fa-wallet"></i>
                        My Income
                    </a>
                    <div class="dropdown-menu" aria-labelledby="incomeDropdown">
                        <a class="dropdown-item" href="/user/income">Income List</a>
                        <a class="dropdown-item" href="/user/addincome">Add Income</a>
                    </div>
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="expensesDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i class="fas fa-list"></i>
                        My Expenses
                    </a>
                    <div class="dropdown-menu" aria-labelledby="expensesDropdown">
                        <a class="dropdown-item" href="/user/expenses">Expense List</a>
                        <a class="dropdown-item" href="/user/expenses/add">Add Expense</a>
                        <a class="dropdown-item" href="/user/expenses/categories">Expense Category</a>
                    </div>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/user/resources">
                    <i class="fas fa-desktop"></i>
                        Learning Resources
                    </a>
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="reportDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i class="fas fa-list-alt"></i>
                        Report
                    </a>
                    <div class="dropdown-menu" aria-labelledby="reportDropdown">
                        <a class="dropdown-item" href="/user/reports">All Reports</a>
                    </div>
                </li>
                { (userRole.toLowerCase() === "admin") && (
                    <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="learningDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i class="fas fa-user"></i>
                        Admin
                    </a>
                    <div class="dropdown-menu" aria-labelledby="learningDropdown">
                        <a class="dropdown-item" href="/admin/resources">Add Learning Resource</a>
                        <a class="dropdown-item" href="/admin/users">Users List</a>
                    </div>
                </li>
                )}
                
                <li class="nav-item">
                    <a class="nav-link" href="javascript:void(0);" onClick={handleLogout} >
                        <i class="fas fa-sign-out-alt"></i> Logout
                    </a>
                </li>
            </ul>
        </div>
    </nav>      
    </div>
  );
};

export default UserHeader;

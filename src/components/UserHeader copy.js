import React from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
const UserHeader = () => {
  const navigate = useNavigate();

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
      <div id="global-loader">
        <div className="whirly-loader"> </div>
      </div>

      <div className="main-wrapper">
        <div className="header">
          
        <div class="header-left active">
                <a href="index.html" class="logo">
                    <img src="/assets/img/logo.png" alt="" />
                </a>
                <a href="index.html" class="logo-small">
                    <img src="/assets/img/logo-small.png" alt="" />
                </a>
                <a id="toggle_btn" href="javascript:void(0);">
                </a>
            </div>

            <a id="mobile_btn" class="mobile_btn" href="#sidebar">
                <span class="bar-icon">
                    <span></span>
                    <span></span>
                    <span></span>
                </span>
            </a>

            <ul class="nav user-menu">
            <li className="nav-item">
              <div className="top-nav-search">
                <a href="javascript:void(0);" className="responsive-search">
                  <i className="fa fa-search"></i>
                </a>
                <form action="#">
                  <div className="searchinputs">
                    <input type="text" placeholder="Search Here ..." />
                    <div className="search-addon">
                      <span>
                        <img src="/assets/img/icons/closes.svg" alt="img" />
                      </span>
                    </div>
                  </div>
                  <a className="btn" id="searchdiv">
                    <img src="/assets/img/icons/search.svg" alt="img" />
                  </a>
                </form>
              </div>
            </li>

            <li className="nav-item dropdown has-arrow flag-nav">
              <a
                className="nav-link dropdown-toggle"
                data-bs-toggle="dropdown"
                href="javascript:void(0);"
                role="button"
              >
                <img src="/assets/img/flags/us1.png" alt="" height="20" />
              </a>
              <div className="dropdown-menu dropdown-menu-right">
                <a href="javascript:void(0);" className="dropdown-item">
                  <img src="/assets/img/flags/us.png" alt="" height="16" />
                  English
                </a>
                <a href="javascript:void(0);" className="dropdown-item">
                  <img src="/assets/img/flags/fr.png" alt="" height="16" />
                  French
                </a>
                <a href="javascript:void(0);" className="dropdown-item">
                  <img src="/assets/img/flags/es.png" alt="" height="16" />
                  Spanish
                </a>
                <a href="javascript:void(0);" className="dropdown-item">
                  <img src="/assets/img/flags/de.png" alt="" height="16" />
                  German
                </a>
              </div>
            </li>

            <li className="nav-item dropdown">
              <a
                href="javascript:void(0);"
                className="dropdown-toggle nav-link"
                data-bs-toggle="dropdown"
              >
                <img src="/assets/img/icons/notification-bing.svg" alt="img" />
                <span className="badge rounded-pill">4</span>
              </a>
              <div className="dropdown-menu notifications">
                <div className="topnav-dropdown-header">
                  <span className="notification-title">Notifications</span>
                  <a href="javascript:void(0)" className="clear-noti">
                    
                    Clear All
                  </a>
                </div>
                <div className="noti-content">
                  <ul className="notification-list">
                    <li className="notification-message">
                      <a href="#">
                        <div className="media d-flex">
                          <span className="avatar flex-shrink-0">
                            <img
                              alt=""
                              src="/assets/img/profiles/avatar-02.jpg"
                            />
                          </span>
                          <div className="media-body flex-grow-1">
                            <p className="noti-details">Sorry, Nothing's Here</p>
                            <p className="noti-time">
                              <span className="notification-time">4 mins ago</span>
                            </p>
                          </div>
                        </div>
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="topnav-dropdown-footer">
                  <a href="activities.html">View all Notifications</a>
                </div>
              </div>
            </li>

            <li className="nav-item dropdown has-arrow main-drop">
              <a
                href="javascript:void(0);"
                className="dropdown-toggle nav-link userset"
                data-bs-toggle="dropdown"
              >
                <span className="user-img">
                  <img src="/assets/img/profiles/avator1.jpg" alt="" />
                  <span className="status online"></span>
                </span>
              </a>
              <div className="dropdown-menu menu-drop-user">
                <div className="profilename">
                  <div className="profileset">
                    <span className="user-img">
                      <img src="/assets/img/profiles/avator1.jpg" alt="" />
                      <span className="status online"></span>
                    </span>
                    <div className="profilesets">
                      <h6>John Doe</h6>
                      <h5>Admin</h5>
                    </div>
                  </div>
                  <hr className="m-0" />
                  <a className="dropdown-item" href="profile.html">
                    
                    <i className="me-2" data-feather="user"></i> My Profile
                  </a>
                  <a className="dropdown-item" href="generalsettings.html">
                    <i className="me-2" data-feather="settings"></i>Settings
                  </a>
                  <hr className="m-0" />
                  <a className="dropdown-item logout pb-0" onClick={handleLogout}>
                    <img
                      src="/assets/img/icons/log-out.svg"
                      className="me-2"
                      alt="img"
                    />
                    Logout
                  </a>
                </div>
              </div>
            </li>
          </ul>

         
        </div>
        <div class="sidebar" id="sidebar">
            <div class="sidebar-inner slimscroll">
                <div id="sidebar-menu" class="sidebar-menu">
                    <ul>
                <li className="active">
                  <a href="/user/dashboard">
                    <img src="/assets/img/icons/dashboard.svg" alt="img" />
                    <span>Dashboard</span>
                  </a>
                </li>
                <li className="submenu">
                  <a>
                    <img src="/assets/img/icons/expense1.svg" alt="img" />
                    <span>My Income</span> <span className="menu-arrow"></span>
                  </a>
                  <ul>
                    <li>
                      <a href="/user/income">Income List</a>
                    </li>
                    <li>
                      <a href="/user/addincome">Add Income</a>
                    </li>
                  </ul>
                </li>
                <li className="submenu">
                  <a href="javascript:void(0);">
                    <img src="/assets/img/icons/purchase1.svg" alt="img" />
                    <span>My Expenses</span> <span className="menu-arrow"></span>
                  </a>
                  <ul>
                    <li>
                      <a href="/user/expenses">Expense List</a>
                    </li>
                    <li>
                      <a href="/user/expenses/add">Add Expense</a>
                    </li>

                    <li>
                      <a href="/user/expenses/categories">Expense Category</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a href="/user/blog">
                    <img src="/assets/img/icons/purchase1.svg" alt="img" />
                    <span>Learning Resourses</span>
                  </a>
                </li>


                <li className="submenu">
                  <a href="javascript:void(0);">
                    <img src="/assets/img/icons/time.svg" alt="img" />
                    <span>Report</span> <span className="menu-arrow"></span>
                  </a>
                  <ul>
                    <li>
                      <a href="/user/reports">All Reports</a>
                    </li>
                    
                  </ul>
                </li>
                <li className="submenu">
                  <a href="javascript:void(0);">
                    <img src="/assets/img/icons/users1.svg" alt="img" />
                    <span>Users</span> <span className="menu-arrow"></span>
                  </a>
                  <ul>
                    <li>
                      <a href="newuser.html">New User </a>
                    </li>
                    <li>
                      <a href="userlists.html">Users List</a>
                    </li>
                  </ul>
                </li>
                <li className="submenu">
                  <a href="javascript:void(0);">
                    <img src="/assets/img/icons/settings.svg" alt="img" />
                    <span>Settings</span> <span className="menu-arrow"></span>
                  </a>
                  <ul>
                    <li>
                      <a href="generalsettings.html">General Settings</a>
                    </li>
                    <li>
                      <a href="emailsettings.html">Email Settings</a>
                    </li>
                    <li>
                      <a href="paymentsettings.html">Payment Settings</a>
                    </li>
                    <li>
                      <a href="currencysettings.html">Currency Settings</a>
                    </li>
                    <li>
                      <a href="grouppermissions.html">Group Permissions</a>
                    </li>
                    <li>
                      <a href="taxrates.html">Tax Rates</a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHeader;

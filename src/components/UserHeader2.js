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
      <header className="navbar navbar-expand navbar-light bg-light">
      <a className="navbar-brand" href="#">Brand</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <a className="nav-link" href="#">Link 1</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Link 2</a>
          </li>
        </ul>
      </div>
    </header>
        <nav id="sidebar" className="bg-light border-right">
        <div className="sidebar-header">
          <h3>Brand</h3>
        </div>
        <ul className="list-unstyled components">
          <li>
            <a href="#homeSubmenu" data-toggle="collapse" aria-expanded="false">Home</a>
            <ul className="collapse list-unstyled" id="homeSubmenu">
              <li><a href="#">Submenu 1</a></li>
              <li><a href="#">Submenu 2</a></li>
            </ul>
          </li>
          <li><a href="#">About</a></li>
          <li>
            <a href="#servicesSubmenu" data-toggle="collapse" aria-expanded="false">Services</a>
            <ul className="collapse list-unstyled" id="servicesSubmenu">
              <li><a href="#">Service 1</a></li>
              <li><a href="#">Service 2</a></li>
            </ul>
          </li>
          <li><a href="#">Contact</a></li>
        </ul>
      </nav>
      </div>
    </div>
  );
};

export default UserHeader;

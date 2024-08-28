import React from "react";
import "./VerticalNavBar.css";
import { useNavigate } from "react-router-dom";

import VerticalNavBarElement from "../VerticalNavBarElement/VerticalNavBarElement";


const VerticalNavBar = ({ onViewChange }) => {
  const navigate = useNavigate();

  return (
    <div className="vertical-nav-bar">
      <VerticalNavBarElement
        icon="dashboard"
        label="Dashboards"
        onClick={() => onViewChange('settings')}
      />
      <VerticalNavBarElement
        icon="warning"
        label="Tables"
        onClick={() => onViewChange('tables')}
      />
      <VerticalNavBarElement
        icon="email"
        label="Emails"
        onClick={() => onViewChange('emails')}
      />
      <VerticalNavBarElement
        icon="logout"
        label="Logout"
        onClick={() => {
          window.sessionStorage.removeItem('token');
          navigate('/');
        }}
      />
    </div>
  );
};

export default VerticalNavBar;

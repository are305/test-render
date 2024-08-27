import React from "react";
import "./VerticalNavBar.css";
import VerticalNavBarElement from "../VerticalNavBarElement/VerticalNavBarElement";

const VerticalNavBar = () => {
  return (
    <div className="vertical-nav-bar">
      <VerticalNavBarElement
        icon="dashboard"
        label="Dashboards"
      />
      <VerticalNavBarElement
        icon="warning"
        label="At-risk Students: Grades"
      />
      <VerticalNavBarElement
        icon="warning"
        label="At-risk Students: Attendance"
      />
      <VerticalNavBarElement
        icon="warning"
        label="At-risk Students: Activity"
      />
      <VerticalNavBarElement
        icon="logout"
        label="Logout"
      />
    </div>
  );
};

export default VerticalNavBar;
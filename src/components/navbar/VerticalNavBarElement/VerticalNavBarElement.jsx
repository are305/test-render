import React, { useState } from "react";
import "./VerticalNavBarElement.css";

const VerticalNavBarElement = ({ icon, label, subItems }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    if (subItems) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div className="nav-element">
      <div className="nav-element-main" onClick={handleToggle}>
        <span className="material-symbols-outlined nav-icon">{icon}</span>
        <span className="nav-text">{label}</span>
        {subItems && (
          <span className="material-symbols-outlined nav-arrow">
            {isOpen ? "expand_less" : "expand_more"}
          </span>
        )}
      </div>
      {subItems && isOpen && (
        <div className="sub-menu">
          {subItems.map((item, index) => (
            <a key={index} href={item.link} className="sub-menu-item">
              {item.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default VerticalNavBarElement;
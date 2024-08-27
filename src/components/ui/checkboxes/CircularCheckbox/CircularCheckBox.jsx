import React from 'react';
import './CircularCheckbox.css';

function CircularCheckbox({ label, isSelected, onToggle }) {
    return (
        <div
            className={`custom-checkbox ${isSelected ? 'selected' : ''}`}
            onClick={onToggle}
        >
            <div className="checkbox-circle">
                {isSelected && <div className="checkbox-indicator"></div>}
            </div>
            <label className="checkbox-label">{label}</label>
        </div>
    );
}

export default CircularCheckbox;

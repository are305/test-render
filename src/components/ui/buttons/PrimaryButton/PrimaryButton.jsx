import React from "react";

import './PrimaryButton.css'

function PrimaryButton({ text, icon = null, scale = 1, onClick = () => { } }) {

    const scaleStyle = {
        transform: `scale(${scale})`
    };

    return (
        <div
            className="icon-primary-button"
            onClick={onClick}
            style={scaleStyle}
        >
            {icon && (
                <span className="material-symbols-outlined">{icon}</span>
            )}
            <div className="text">
                {text}
            </div>
        </div>
    );

}

export default PrimaryButton
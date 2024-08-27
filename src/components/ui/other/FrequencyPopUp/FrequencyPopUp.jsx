import React from 'react';
import ToolTip from '../ToolTip/ToolTip';
import './popup.css';

function FrequencyPopup(props) {

    const handleSubmitFrequency = (event) => {
        event.preventDefault();

        fetch(`http://localhost:8000/indicator/frequency/`, {
            method: 'PUT',
            body: JSON.stringify(props.currentUserSetting),
            headers: {
                'Authorization': `Bearer ${window.sessionStorage.getItem("token")}`,
                'Content-Type': 'application/json'
            }
            })
            .catch(error => {
                console.error('Error updating frequency:', error);
            });
    };

    const handleFrequencyChange = (e) => {
        const { name, value } = e.target;
        if (value !== '0') {
            props.setCurrentUserSetting(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    }

    const handleBackgroundClick = (e) => {
        if (e.target.classList.contains('popup-container')) {
            props.onClose();
        }
    };

    const handleDecrease = () => {
        const newFrequency = Math.max(parseInt(props.currentUserSetting.frequency) - 1, 1);
        props.setCurrentUserSetting({ ...props.currentUserSetting, frequency: newFrequency });
    };

    const handleIncrease = () => {
        const newFrequency = parseInt(props.currentUserSetting.frequency) + 1;
        props.setCurrentUserSetting({ ...props.currentUserSetting, frequency: newFrequency });
    };

    const handleKeyDown = (event) => {
        if (event.key === '-') {
            event.preventDefault();
        }
    };

    return (
        <div className="popup-container" onClick={handleBackgroundClick}>
            <div className="popup">
                <button className="close-btn" onClick={props.onClose}>X</button>
                <div className="title centered">
                    <div className='aligner'>
                        <h3>Frequency</h3>
                        <ToolTip title={''} text={'Configures the number of DAYS between each automatic messaging to all identified At Risk student. For example, if set to 7 days: the messages will be sent weekly.'} />
                    </div>
                </div>
                <div class="number">
                    <span className="minus" onClick={handleDecrease}>-</span>
                    <input
                        type="number"
                        placeholder="Specify the frequency here."
                        className="frequency-input"
                        onChange={handleFrequencyChange}
                        onKeyDown={handleKeyDown}
                        name='frequency'
                        value={props.currentUserSetting.frequency}
                    />
                    <span className="plus" onClick={handleIncrease}>+</span>
                </div>
                <button onClick={handleSubmitFrequency} className="save-btn">
                    Save
                </button>
            </div>
        </div>
    );
}

export default FrequencyPopup;
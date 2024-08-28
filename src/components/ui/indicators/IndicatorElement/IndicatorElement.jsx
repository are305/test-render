import { useState, useEffect } from 'react';
import { API_URL } from '../../../../config';
import Loading2 from '../../animations/loading/Loading2/Loading2';
import { convertSecondsToHoursMinutes } from '../../../../utils/timeUtils';
import { formatDateString } from '../../../../utils/dateUtils';
import './IndicatorElement.css';

function IndicatorElement({
    icon = "person",
    color = "#337ab7",
    indicator,
    enrollment,
    subtitle = "View Details",
    size = 1,
    format = null
}) {
    const [loading, setLoading] = useState(false);
    const [count, setCount] = useState(0);

    useEffect(() => {
        const controller = new AbortController();
        if (enrollment) {
            setLoading(true);
            fetch(`${API_URL}/api/dashboard/${indicator}/${enrollment}`, {
                signal: controller.signal,
                headers: {
                    'Authorization': `Bearer ${window.sessionStorage.getItem("token")}`,
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    setCount(data || 0);
                    setLoading(false);
                })
                .catch(error => {
                    if (error.name !== 'AbortError') {
                        console.error("Error fetching data:", error);
                    }
                    setLoading(false);
                });
        }
        return () => {
            controller.abort();
        };
    }, [indicator, enrollment]);

    const scaleStyle = {
        transform: `scale(${size})`,
        width: `${100 * size}px`,
        height: `${100 * size}px`,
    };

    const dataStyle = {
        fontSize: `${50 * size}px`,
        color: '#fff',
    };

    const formattedCount = (() => {
        if (loading) return null;

        if (format === 'secondsToTime') {
            return convertSecondsToHoursMinutes(count);
        }

        if (format === 'dateString') {
            return formatDateString(count);
        }

        return count;
    })();

    return (
        <div className='indicator-element-container' style={{ borderColor: color, scaleStyle }}>
            <div className='indicator-content' style={{ backgroundColor: color }}>
                <div className="material-icons">
                    {icon}
                </div>
                <div className="data">
                    {loading ? (
                        <Loading2 />
                    ) : (
                        <div className='indicator-number' style={dataStyle}>
                            {formattedCount}
                        </div>
                    )}
                    <div className="indicator-subtitle">
                        {subtitle}
                    </div>
                </div>
            </div>
            <a className="indicator-details" href='https://www.google.com' rel="noreferrer" target='_blank'>
                <div className="text" style={{ color: color }}>
                    View Details
                </div>
                <div className="material-icons-outlined" style={{ backgroundColor: color }}>arrow_forward</div>
            </a>
        </div>
    );
}

export default IndicatorElement;
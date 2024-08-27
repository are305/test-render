import { useState, useEffect } from 'react';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { API_URL } from '../../../../config';
import './IndicatorProgressBar.css';
import Loading2 from '../../animations/loading/Loading2/Loading2';

function IndicatorProgressBar({ title = null, color, icon, indicator, selectedEnrollment: enrollment, size = 1 }) {
    const [loading, setLoading] = useState(false);
    const [indicatorPercentage, setIndicatorPercentage] = useState(0);

    useEffect(() => {
        const controller = new AbortController();
        setIndicatorPercentage(0);
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
                    setIndicatorPercentage(data);
                    setLoading(false);
                })
                .catch(error => console.error(error));
        }
        return () => {
            controller.abort();
        }
    }, [enrollment, indicator]);

    const scaleStyle = {
        transform: `scale(${size})`,
        width: `${100 * size}px`,
        height: `${100 * size}px`,
    };

    const textStyle = {
        fontSize: `${14 * size}px`,
        color: color,
    };

    const iconStyle = {
        fontSize: `${24 * size}px`,
        color: color,
    };

    return (
        <div className='indicator-progress-bar-container' style={scaleStyle}>
            {title && <div className="title" style={textStyle}>{title}</div>}
            <CircularProgressbarWithChildren
                value={loading ? 0 : indicatorPercentage}
                styles={buildStyles({
                    pathColor: color,
                    textColor: color,
                    trailColor: '#d6d6d6',
                })}
            >
                <span
                    className="material-symbols-outlined"
                    style={iconStyle}
                >
                    {icon}
                </span>

                {loading ? (
                    <Loading2/>
                ) : (
                    <div className="text" style={textStyle}>
                    {indicatorPercentage}%
                </div>
                )}
                
                
            </CircularProgressbarWithChildren>
        </div>
    );
}

export default IndicatorProgressBar;

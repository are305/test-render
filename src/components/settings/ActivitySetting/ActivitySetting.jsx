import React, { useState, useEffect, useCallback } from 'react';
import ToolTip from '../../ui/other/ToolTip/ToolTip';
import Loading2 from '../../ui/animations/loading/Loading2/Loading2';
import PrimaryButton from '../../ui/buttons/PrimaryButton/PrimaryButton';
import { API_URL } from '../../../config';

const defaultActivitySettings = {
    course_id: 0,
    setting_status: false,
    tolerance_days: 0
};

const fetchData = async (url, options, signal) => {
    try {
        const response = await fetch(url, { ...options, signal });
        if (!response.ok) throw new Error('Error fetching data');
        return response.json();
    } catch (error) {
        if (error.name === 'AbortError') {
            console.log('Fetch aborted');
        } else {
            console.error(error);
        }
        return null;
    }
};

function ActivitySetting({ selectedEnrollment, setCurrentActivityInfo }) {
    const [currentActivitySetting, setCurrentActivitySetting] = useState(defaultActivitySettings);
    const [numStudentsAtRisk, setNumStudentsAtRisk] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (name, value) => {
        setCurrentActivitySetting(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmitActivity = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        const options = {
            method: 'POST',
            body: JSON.stringify(currentActivitySetting),
            headers: {
                'Authorization': `Bearer ${window.sessionStorage.getItem("token")}`,
                'Content-Type': 'application/json'
            }
        };
        const data = await fetchData(`${API_URL}/api/ars/setting/activity/${selectedEnrollment}`, options);
        if (data) {
            const activityData = await fetchData(`${API_URL}/api/ars/activity/${selectedEnrollment}`, {
                headers: {
                    'Authorization': `Bearer ${window.sessionStorage.getItem("token")}`,
                    'Content-Type': 'application/json'
                }
            });
            if (activityData) {
                setCurrentActivityInfo(activityData);
                setNumStudentsAtRisk(activityData.total);
            }
        }
        setIsLoading(false);
    };

    const fetchActivitySettings = useCallback(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        const loadAtttendanceSettings = async () => {
            setCurrentActivitySetting(defaultActivitySettings);
            setIsLoading(true);

            const activitySettingData = await fetchData(`${API_URL}/api/ars/setting/activity/${selectedEnrollment}`, {
                headers: {
                    'Authorization': `Bearer ${window.sessionStorage.getItem("token")}`,
                    'Content-Type': 'application/json'
                }
            }, signal);

            if (activitySettingData) {
                setCurrentActivitySetting(activitySettingData);

                const activityData = await fetchData(`${API_URL}/api/ars/activity/${selectedEnrollment}`, {
                    headers: {
                        'Authorization': `Bearer ${window.sessionStorage.getItem("token")}`,
                        'Content-Type': 'application/json'
                    }
                }, signal);
                if (activityData) {
                    setCurrentActivityInfo(activityData);
                    setNumStudentsAtRisk(activityData.total);
                }
            } else {
                setCurrentActivitySetting(defaultActivitySettings);
            }
            setIsLoading(false);
        };
        loadAtttendanceSettings();
        return () => {
            controller.abort();
        };
    }, [selectedEnrollment, setCurrentActivityInfo]);

    useEffect(() => {
        const abortFetch = fetchActivitySettings();
        return () => abortFetch();
    }, [fetchActivitySettings]);

    return (
        <div>
            <div className="title">
                <div className='aligner'>
                    <input
                        className='checkbox spaced-checkbox'
                        type="checkbox"
                        onChange={e => handleChange('setting_status', e.target.checked)}
                        name="setting_status"
                        value="Status"
                        checked={currentActivitySetting.setting_status}
                    />
                    Activity
                    <ToolTip title={''} text={'Identify Students at Risk according to their Last Activity in Canvas. Activities in Canvas include: Submitting assignments or quizzes, participating in Discussions, using Inbox, etc.'} />
                </div>
            </div>
            <form onSubmit={handleSubmitActivity}>
                <label htmlFor="activity_tolerance">
                    Tolerance Days:
                    <ToolTip title={''} text={"Tolerance Days (Activity): Tracks how many DAYS a student can be inactive before being flagged as 'At Risk'. For example, if configured to 7 days: if the system detects a student has no activity for 1 week, then the student will be considered 'At Risk'."} />
                </label>
                <div className="centered">
                    <input
                        type="number"
                        id="activity_tolerance"
                        onChange={e => handleChange('tolerance_days', e.target.value)}
                        name="tolerance_days"
                        value={currentActivitySetting.tolerance_days}
                        style={{ opacity: currentActivitySetting.setting_status ? 1 : 0.5, pointerEvents: currentActivitySetting.setting_status ? 'auto' : 'none' }}
                    />
                </div>
                <PrimaryButton
                    text="Save"
                    icon="save"
                    scale={1}
                    onClick={handleSubmitActivity}
                />
            </form>
            {isLoading ? (
                <Loading2 />
            ) : (
                <p>Number of students at risk: {numStudentsAtRisk}</p>
            )}
        </div>
    )
}

export default ActivitySetting;
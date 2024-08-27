import React, { useState, useEffect, useCallback } from 'react';
import ToolTip from '../../ui/other/ToolTip/ToolTip';
import Loading2 from '../../ui/animations/loading/Loading2/Loading2';
import PrimaryButton from '../../ui/buttons/PrimaryButton/PrimaryButton';
import { API_URL } from '../../../config';

const defaultAttendanceSettings = {
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

function AttendanceSetting({ selectedEnrollment, setCurrentAttendanceInfo }) {
    const [currentAttendanceSetting, setCurrentAttendanceSetting] = useState(defaultAttendanceSettings);
    const [numStudentsAtRisk, setNumStudentsAtRisk] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (name, value) => {
        setCurrentAttendanceSetting(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmitAttendance = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        const options = {
            method: 'POST',
            body: JSON.stringify(currentAttendanceSetting),
            headers: {
                'Authorization': `Bearer ${window.sessionStorage.getItem("token")}`,
                'Content-Type': 'application/json'
            }
        };
        const data = await fetchData(`${API_URL}/api/ars/setting/attendance/${selectedEnrollment}`, options);
        if (data) {
            const attendanceData = await fetchData(`${API_URL}/api/ars/attendance/${selectedEnrollment}`, {
                headers: {
                    'Authorization': `Bearer ${window.sessionStorage.getItem("token")}`,
                    'Content-Type': 'application/json'
                }
            });
            if (attendanceData) {
                setCurrentAttendanceInfo(attendanceData);
                setNumStudentsAtRisk(attendanceData.total);
            }
        }
        setIsLoading(false);
    };

    const fetchAttendanceSettings = useCallback(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        const loadAtttendanceSettings = async () => {
            setCurrentAttendanceSetting(defaultAttendanceSettings);
            setIsLoading(true);

            const attendanceSettingData = await fetchData(`${API_URL}/api/ars/setting/attendance/${selectedEnrollment}`, {
                headers: {
                    'Authorization': `Bearer ${window.sessionStorage.getItem("token")}`,
                    'Content-Type': 'application/json'
                }
            }, signal);

            if (attendanceSettingData) {
                setCurrentAttendanceSetting(attendanceSettingData);

                const attendanceData = await fetchData(`${API_URL}/api/ars/attendance/${selectedEnrollment}`, {
                    headers: {
                        'Authorization': `Bearer ${window.sessionStorage.getItem("token")}`,
                        'Content-Type': 'application/json'
                    }
                }, signal);
                if (attendanceData) {
                    setCurrentAttendanceInfo(attendanceData);
                    setNumStudentsAtRisk(attendanceData.total);
                }
            } else {
                setCurrentAttendanceSetting(defaultAttendanceSettings);
            }
            setIsLoading(false);
        };
        loadAtttendanceSettings();
        return () => {
            controller.abort();
        };
    }, [selectedEnrollment, setCurrentAttendanceInfo]);

    useEffect(() => {
        const abortFetch = fetchAttendanceSettings();
        return () => abortFetch();
    }, [fetchAttendanceSettings]);

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
                        checked={currentAttendanceSetting.setting_status}
                    />
                    Attendance
                    <ToolTip title={''} text={'Identify Students at Risk according to their Attendance in Canvas. Only works for in Courses where Attendance is taken (In-Person, Zoom, Mixed). For optimal accuracy, Roll Call Attendance must be taken regularly.'} />
                </div>
            </div>
            <form onSubmit={handleSubmitAttendance}>
                <label htmlFor="attendance_tolerance">Tolerance Days:<ToolTip title={''} text={'Tolerance Days (Attendance): This setting helps identify students who might be struggling. It tracks how many days a student can be absent from class before being flagged as "At Risk."'} /></label>
                <div className="centered">
                    <input
                        type="number"
                        id="attendance_tolerance"
                        onChange={e => handleChange('tolerance_days', e.target.value)}
                        name="tolerance_days"
                        value={currentAttendanceSetting.tolerance_days}
                        style={{ opacity: currentAttendanceSetting.setting_status ? 1 : 0.5, pointerEvents: currentAttendanceSetting.setting_status ? 'auto' : 'none' }} />
                </div>
                <PrimaryButton
                    text="Save"
                    icon="save"
                    scale={1}
                    onClick={handleSubmitAttendance}
                />
            </form>
            {isLoading ? ( // Conditional rendering based on isLoading state
                <Loading2 /> // Show Loading1 component while loading
            ) : (
                <p>Number of students at risk: {numStudentsAtRisk}</p> // Show number of students at risk when not loading
            )}
            {/* <div className="current">
            Currently using
        </div> */}
        </div>
    )
}

export default AttendanceSetting;
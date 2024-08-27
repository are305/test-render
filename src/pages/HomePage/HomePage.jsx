import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";

import './HomePage.css'

import GradeSetting from '../../components/settings/GradeSetting/GradeSetting';
import AttendanceSetting from '../../components/settings/AttendanceSetting/AttendanceSetting';
import ActivitySetting from "../../components/settings/ActivitySetting/ActivitySetting";
import EnrollmentsList from '../../components/enrollments/EnrollmentsList/EnrollmentsList';

import ARSGrades from '../../components/tables/ARSGrades/ARSGrades';
import ARSActivity from '../../components/tables/ARSActivity/ARSActivity';
import ARSAttendance from '../../components/tables/ARSAttendance/ARSAttendance';

import EmailsPage from '../EmailsPage/EmailsPage';

import FrequencyPopup from '../../components/ui/other/FrequencyPopUp/FrequencyPopUp'
import VerticalNavBar from '../../components/navbar/VerticalNavBar/VerticalNavBar';

import IndicatorProgressBar from '../../components/ui/indicators/IndicatorProgressBar/IndicatorProgressBar';
import IndicatorElement from '../../components/ui/indicators/IndicatorElement/IndicatorElement';
function HomePage() {
    const navigate = useNavigate();

    const [showFrequencyPopup, setShowFrequencyPopup] = useState(false);
    // eslint-disable-next-line
    const [view, setView] = useState('settings');

    const [selectedEnrollment, setSelectedEnrollment] = useState(null);
    const [currentGradesInfo, setCurrentGradesInfo] = useState([]);
    const [currentAttendanceInfo, setCurrentAttendanceInfo] = useState([]);
    const [currentActivityInfo, setCurrentActivityInfo] = useState([]);

    const defaultUserSettings = { frequency: 7, frequency_active: false };
    const [currentUserSetting, setCurrentUserSetting] = useState(defaultUserSettings);

    const handleToggleFrequencyPopup = () => {
        setShowFrequencyPopup(!showFrequencyPopup);
    };

    const indicatorsBar = [
        { icon: "person", color: "#337ab7", indicator: "comments-interaction", subtitle: "Total Students", size: 1 },
        { icon: "school", color: "#f39c12", indicator: "teacher-activity", subtitle: "Total Courses", size: 1.2 },
        { icon: "assignment", color: "#d9534f", indicator: "grading-using-rubrics", subtitle: "Total Assignments", size: 0.9 },
        { icon: "event", color: "#5cb85c", indicator: "average-class-activity", subtitle: "Upcoming Events", size: 1 },
        { icon: "grade", color: "#9b59b6", indicator: "missing-grade-date", subtitle: "Average Grade", size: 1.1 },
    ];

    const indicatorsProgressBar = [
        { title: "Comments", color: "#4caf50", icon: "person", indicator: "comments-interaction" },
        { title: "Teacher Activity", color: "#2196f3", icon: "school", indicator: "teacher-activity" },
        { title: "Grading Using Rubrics", color: "#ff9800", icon: "grading", indicator: "grading-using-rubrics" },
        { title: "Average Class Activity", color: "#9c27b0", icon: "bar_chart", indicator: "average-class-activity" },
        { title: "Average Class Grade", color: "#673ab7", icon: "grade", indicator: "average-class-grade" },
        { title: "Missing Grade Date", color: "#f44336", icon: "schedule", indicator: "missing-grade-date" },
    ];

    useEffect(() => {
        if (!window.sessionStorage.getItem("token")) {
            navigate('/unauthorized');
        }
    }, [navigate]);

    return (
        <div className='homepage-container'>
            <VerticalNavBar />
            <div className="primary-container">
                <div className="course-list">
                    <EnrollmentsList
                        selectedCourse={selectedEnrollment}
                        setSelectedCourse={setSelectedEnrollment}
                    />
                </div>
                <div className="display">
                    {view === 'settings' ? (
                        <div className="dashboard">
                            <div className="settings">
                                <GradeSetting
                                    selectedEnrollment={selectedEnrollment}
                                    setCurrentGradesInfo={setCurrentGradesInfo}
                                />
                                <AttendanceSetting
                                    selectedEnrollment={selectedEnrollment}
                                    setCurrentAttendanceInfo={setCurrentAttendanceInfo}
                                />
                                <ActivitySetting
                                    selectedEnrollment={selectedEnrollment}
                                    setCurrentActivityInfo={setCurrentActivityInfo}
                                />
                            </div>
                            <div className="indicators">
                                {indicatorsProgressBar.map((config, index) => (
                                    <IndicatorProgressBar
                                        key={index}
                                        title={config.title}
                                        color={config.color}
                                        icon={config.icon}
                                        indicator={config.indicator}
                                        selectedEnrollment={selectedEnrollment}
                                    />
                                ))}

                            </div>
                        </div>
                    ) : view === 'tables' ? (
                        <div className="ars-tables">
                            <ARSGrades
                                selectedEnrollment={selectedEnrollment}
                                setCurrentGradesInfo={setCurrentGradesInfo}
                                currentGradesInfo={currentGradesInfo}
                            />
                            <ARSAttendance
                                selectedEnrollment={selectedEnrollment}
                                setCurrentAttendanceInfo={setCurrentAttendanceInfo}
                                currentAttendanceInfo={currentAttendanceInfo}
                            />
                            <ARSActivity
                                selectedEnrollment={selectedEnrollment}
                                setCurrentActivityInfo={setCurrentActivityInfo}
                                currentActivityInfo={currentActivityInfo}
                            />
                        </div>
                    ) : view === 'emails' ? (
                        <div className="emails">
                            <EmailsPage
                                currentActivityInfo={currentActivityInfo}
                                currentAttendanceInfo={currentAttendanceInfo}
                                currentGradesInfo={currentGradesInfo}
                                selectedEnrollment={selectedEnrollment}
                            />
                        </div>
                    ) : (
                        <div>Welcome to Shepherd's Guide</div>
                    )
                    }
                </div>

                <div className="dashboard-indicators-elements">
                    {indicatorsBar.map((config, index) => (
                        <IndicatorElement
                            key={index}
                            icon={config.icon}
                            color={config.color}
                            indicator={config.indicator}
                            enrollment={selectedEnrollment}
                            subtitle={config.subtitle}
                            size={config.size}
                        />
                    ))}
                </div>
            </div>
            {
                showFrequencyPopup &&
                <FrequencyPopup
                    onClose={handleToggleFrequencyPopup}
                    currentUserSetting={currentUserSetting}
                    setCurrentUserSetting={setCurrentUserSetting}
                />
            }
        </div>
    )
}

export default HomePage;
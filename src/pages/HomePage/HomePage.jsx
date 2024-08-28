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

    const handleViewChange = (newView) => {
        setView(newView);
    };

    const indicatorsElements = [
        { icon: "person", color: "#337ab7", indicator: "total-students", subtitle: "Total Students", size: 1 },
        { icon: "timer", color: "#f39c12", indicator: "teacher-activity", subtitle: "Teacher Activity", size: 0.7, format: "secondsToTime" },
        { icon: "functions", color: "#5cb85c", indicator: "average-class-activity", subtitle: "Avr. Class Activity", size: 0.7, format: "secondsToTime" },
        { icon: "functions", color: "#d9534f", indicator: "average-class-grade", subtitle: "Avr. Class Grade", size: 0.7 },
        { icon: "rule", color: "#9b59b6", indicator: "missing-grade-date", subtitle: "Missing Grading", size: 0.4, format: "dateString" },
        { icon: "assignment", color: "#d9534f", indicator: "total-students", subtitle: "TBD", size: 1},
    ];

    const indicatorsProgressBar = [
        { title: "Comments", color: "#4caf50", icon: "comment", indicator: "comments-interaction" },
        { title: "Grading Using Rubrics", color: "#ff9800", icon: "rubric", indicator: "grading-using-rubrics" },
        { title: "TBD", color: "#C5CAE9", icon: "rubric", indicator: "test" },
        { title: "TBD", color: "#7986CB", icon: "rubric", indicator: "test" },
        { title: "TBD", color: "#5C6BC0", icon: "rubric", indicator: "test" },
        { title: "TBD", color: "#3f51b5", icon: "rubric", indicator: "test" },
    ];

    useEffect(() => {
        if (!window.sessionStorage.getItem("token")) {
            navigate('/unauthorized');
        }
    }, [navigate]);

    return (
        <div className='homepage-container'>
            <VerticalNavBar onViewChange={handleViewChange} />
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
                    {indicatorsElements.map((config, index) => (
                        <IndicatorElement
                            key={index}
                            icon={config.icon}
                            color={config.color}
                            indicator={config.indicator}
                            enrollment={selectedEnrollment}
                            subtitle={config.subtitle}
                            size={config.size}
                            format={config.format}
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
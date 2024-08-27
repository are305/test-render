import React, { useState } from 'react';
import { Link } from "react-router-dom";

import EnrollmentsList from '../../components/enrollments/EnrollmentsList/EnrollmentsList';
import ARSGrades from "../../components/tables/ARSGrades/ARSGrades"
import ARSActivity from "../../components/tables/ARSActivity/ARSActivity"
import ARSAttendance from "../../components/tables/ARSAttendance/ARSAttendance"

import './arstables.css'

function ARSTables() {
    const [selectedEnrollment, setSelectedEnrollment] = useState('None');

    const handleEnrollmentChange = (enrollmentId) => {
        setSelectedEnrollment(enrollmentId);
    };

    return (
        <div>
            <nav>
                <div className="navTitle">
                    Shepherd's Guide
                </div>
                <div className="navOptions">
                    <div className="welcome">
                        Welcome,
                    </div>
                    <div className="logout">
                        Log Out
                    </div>
                </div>
            </nav>
            <div className="primary-container">
                <div className="course-list">
                    <EnrollmentsList onEnrollmentChange={handleEnrollmentChange} />
                    
                </div>
                <div className="settings">
                    
                    <div className="ARSTables">

                        <ARSGrades selectedEnrollment={selectedEnrollment} />
                        <ARSAttendance selectedEnrollment={selectedEnrollment} />
                        <ARSActivity selectedEnrollment={selectedEnrollment} />

                    </div>

                    
                </div>
                <div className="advanced-settings">
                    <Link to="/home">
                        <button className="actions">
                            <p className="text">Return to Home</p>
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default ARSTables;
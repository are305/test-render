import React, { useState, useEffect } from 'react';
import CircularCheckbox from '../../ui/checkboxes/CircularCheckbox/CircularCheckBox';
import Loading1 from '../../ui/animations/loading/Loading1/Loading1';
import { API_URL } from '../../../config';

import './EnrollmentsList.css';

function EnrollmentsList({ selectedCourse, setSelectedCourse }) {
    const [enrollments, setEnrollments] = useState(null);

    useEffect(() => {
        fetch(`${API_URL}/api/ars/enrollments`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${window.sessionStorage.getItem("token")}`,
                'Content-Type': 'application/json',
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setEnrollments(data);
            })
            .catch((error) => console.error(error));
        // eslint-disable-next-line
    }, []);

    const handleEnrollmentClick = (enrollmentId) => {
        setSelectedCourse(enrollmentId);
    };

    if (enrollments && enrollments.length === 0) {
        return <div>You don't have classes</div>;
    }

    return (
        <div className='enrollments-container'>
            <div className='enrollment-title'>
                Your Courses:
            </div>

            <div className="enrollments-list">
                {enrollments ? (
                    enrollments.map((enrollment) => (
                        <CircularCheckbox
                            key={enrollment.id}
                            label={enrollment.name}
                            isSelected={selectedCourse === enrollment.id}
                            onToggle={() => handleEnrollmentClick(enrollment.id)}
                        />
                    ))
                ) : (
                    <Loading1 />
                )}
            </div>
        </div>
    );
}

export default EnrollmentsList;

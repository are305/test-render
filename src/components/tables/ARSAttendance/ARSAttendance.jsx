import React, { useState, useEffect } from 'react';
import Loading2 from '../../ui/animations/loading/Loading2/Loading2';

function ARSAttendance({ selectedEnrollment, currentAttendanceInfo, setCurrentAttendanceInfo }) {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const controller = new AbortController();

        if (selectedEnrollment && selectedEnrollment !== currentAttendanceInfo.course_id) {
            setLoading(true);

            fetch(`http://localhost:8000/indicator/attendance/${selectedEnrollment}`, {
                signal: controller.signal,
                headers: {
                    'Authorization': `Bearer ${window.sessionStorage.getItem("token")}`,
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(async data => {
                await setCurrentAttendanceInfo(data.at_risk_students_attendance);
                setLoading(false);
            })
            .catch(error => console.error(error));
        }

        return () => {
            controller.abort();
        };
    }, [selectedEnrollment, currentAttendanceInfo.course_id, setCurrentAttendanceInfo]);

    const getDaysDifference = (dateString) => {
        const today = new Date();
        const inactiveDate = new Date(dateString);
        const differenceInTime = today.getTime() - inactiveDate.getTime();
        const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
        return differenceInDays;
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth() + 1; // Month is zero-based
        const year = date.getFullYear();
        
        // Pad single digit day and month with leading zero if necessary
        const formattedDay = day < 10 ? `0${day}` : day;
        const formattedMonth = month < 10 ? `0${month}` : month;
        
        // Format: dd/MM/yyyy
        return `${formattedDay}/${formattedMonth}/${year}`;
    };

    if (loading) {
        return <Loading2 />;
    }

    if (!currentAttendanceInfo.students) {
        return <Loading2 />;
    }

    return (
        <div>
            <h2 className='title'>Attendance</h2>
            <table className='arstable'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Last Day of Attendance</th>
                        <th>Days Since Last Attendance</th>
                    </tr>
                </thead>
                <tbody>
                    {currentAttendanceInfo.students.map(student => (
                        <tr key={student.id}>
                            <td>{student.name}</td>
                            <td>{formatDate(student.days_inactive)}</td>
                            <td>{getDaysDifference(student.days_inactive)} days</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ARSAttendance;

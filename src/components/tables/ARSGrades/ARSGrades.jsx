import React, { useState, useEffect } from 'react';
import Loading2 from '../../ui/animations/loading/Loading2/Loading2';

function ARSGrades({ selectedEnrollment, currentGradesInfo, setCurrentGradesInfo }) {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const controller = new AbortController();

        if (selectedEnrollment && selectedEnrollment !== currentGradesInfo.course_id) {
            setLoading(true);

            fetch(`http://localhost:8000/indicator/grades/${selectedEnrollment}`, {
                signal: controller.signal,
                headers: {
                    'Authorization': `Bearer ${window.sessionStorage.getItem("token")}`,
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(async data => {
                await setCurrentGradesInfo(data.at_risk_students_grades);
                setLoading(false);
            })
            .catch(error => console.error(error));
        }

        return () => {
            controller.abort();
        };
    }, [selectedEnrollment, currentGradesInfo.course_id, setCurrentGradesInfo]);

    if (loading) {
        return <Loading2 />;
    }

    if (!currentGradesInfo.students) {
        return <Loading2 />;
    }

    if (currentGradesInfo.students.length === 0) {
        return (
            <div>
                <h2 className='title'>Grades</h2>
                <table className='arstable'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Grade</th>
                            <th>Current Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan="3">No Students Data</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }

    return (
        <div>
            <h2 className='title'>Grades</h2>
            <table className='arstable'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Grade</th>
                        <th>Current Score</th>
                    </tr>
                </thead>
                <tbody>
                    {currentGradesInfo.students.map(student => (
                        <tr key={student.id}>
                            <td>{student.name}</td>
                            <td>{student.grade}</td>
                            <td>{student.current_score}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ARSGrades;

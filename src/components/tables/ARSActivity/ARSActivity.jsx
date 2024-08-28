import React, { useState, useEffect } from 'react';
import Loading2 from '../../ui/animations/loading/Loading2/Loading2';


function ARSActivity({ selectedEnrollment, currentActivityInfo, setCurrentActivityInfo }) {

    const [loading, setLoading] = useState(false);

    useEffect(() => {

        const controller = new AbortController();

        if (selectedEnrollment) {

            if (selectedEnrollment !== currentActivityInfo.course_id) {

                setLoading(true);

                fetch(`http://localhost:8000/indicator/activity/${selectedEnrollment}`, {
                    signal: controller.signal,
                    headers: {
                        'Authorization': `Bearer ${window.sessionStorage.getItem("token")}`,
                        'Content-Type': 'application/json'
                    }
                })
                    .then(res => res.json())
                    .then(async data => {
                        await setCurrentActivityInfo(data.at_risk_students_activity);
                        setLoading(false);
                    })
                    .catch(error => console.error(error));
            }
        }
        return () => {
            controller.abort();
        }
    },
        //eslint-disable-next-line
        [selectedEnrollment]);

    if (loading) {
        return <Loading2 />
    }

    if (!currentActivityInfo.students) {
        return <Loading2 />;
    }

    return (
        <div>
            <h2 className='title'>Activity</h2>
            <table className='arstable'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Days Inactive</th>
                    </tr>
                </thead>
                <tbody>
                    {currentActivityInfo.students.map(student => (
                        <tr key={student.id}>
                            <td>{student.name}</td>
                            <td>{student.days_inactive}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ARSActivity;
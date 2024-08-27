import React, { useState, useEffect } from 'react';
import Loading2 from '../../ui/animations/loading/Loading2/Loading2';


function ARSActivity(props) {

    const [loading, setLoading] = useState(false);

    useEffect(() => {

        const controller = new AbortController();

        if (props.selectedEnrollment){

            if(props.selectedEnrollment !== props.currentActivityInfo.course_id){
                
                setLoading(true);

                fetch(`http://localhost:8000/indicator/activity/${props.selectedEnrollment}`, {
                    signal: controller.signal,
                    headers: {
                        'Authorization': `Bearer ${window.sessionStorage.getItem("token")}`,
                        'Content-Type': 'application/json'
                    }
                })
                .then(res => res.json())
                .then(async data => {
                    await props.setCurrentActivityInfo(data.at_risk_students_activity);
                    setLoading(false);
                })
                .catch(error => console.error(error));
            }
        }
        return () =>{
            controller.abort();
        }
    }, [props.selectedEnrollment]);

    if (loading) {
        return <Loading2/>
    }

    if (!props.currentActivityInfo.students) {
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
                    {props.currentActivityInfo.students.map(student => (
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
// eslint-disable-next-line
import React, {useState, useEffect} from 'react'
import './arssummary.css'

function ARSSummary(props) {
    const [allStudents, setAllStudents] = useState([]);
    const [studentsSelected, setStudentsSelected] = useState([]);

    useEffect(() => {

        const controller = new AbortController();

        fetch(`http://localhost:8000/indicator/students/${props.selectedEnrollment}`, {
            signal: controller.signal,
            headers: {
                'Authorization': `Bearer ${window.sessionStorage.getItem("token")}`,
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            setAllStudents(data.students);
        })
        .catch(error => console.error(error));

        return () =>{
            controller.abort();
        }
    }, [props.selectedEnrollment]);

    const handleStudentSelection = (e) => {
        const { value } = e.target;
        setStudentsSelected([...studentsSelected, value]);
        console.log(studentsSelected);

    };

    return (
        <div className='alltables'>
            <h2 className='title'>Summary</h2>
            <table className='arstable'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Grade</th>
                        <th>Attendance</th>
                        <th>Activity</th>
                        <th>Previous Inbox</th>
                        <th>Send Email</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {allStudents.map(student => (
                        <tr key={student.student_id}>
                            <td>{student.name}</td>
                            
                            <td>
                                {props.currentGradesInfo.students.some(studentInfo => studentInfo.name === student.name) && <div>fail</div>}
                            </td>

                            <td>
                                {props.currentAttendanceInfo.students.some(studentInfo => studentInfo.name === student.name) && <div>fail</div>}
                            </td>

                            <td>
                                {props.currentActivityInfo.students.some(studentInfo => studentInfo.name === student.name) && <div>fail</div>}
                            </td>
                            
                            <td> Historial </td>
                            <td> 
                                <div className="sendEmailCheckBox">
                                    <div className="checkboxElement">
                                        <input 
                                            className='checkbox3' 
                                            type="checkbox" 
                                            onChange={handleStudentSelection} 
                                            checked={studentsSelected.includes(student.student_id)} 
                                            value={student.student_id}
                                        />
                                    </div> 
                                </div>     
                            </td>
                            
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>         
    )
}

export default ARSSummary;
import React, {useState, useEffect} from 'react'

import TextEditor from "../../components/ui/editor/TextEditor/TextEditor";
import './emails.css'
import ARSSummary from '../../components/tables/ARSSummary/ARSSummary';

function EmailsPage(props) {
    const [currentSubject, setCurrentSubject] = useState('');
    const [currentEmailContent, setCurrentEmailContent] = useState('');

    const [template1, setTemplate1] = useState(null);
    const [template2, setTemplate2] = useState(null);
    const [template3, setTemplate3] = useState(null);

    useEffect(() => {
        if(!template1){
            fetch(`http://localhost:8000/indicator/template/1`, {
            headers: {
                'Authorization': `Bearer ${window.sessionStorage.getItem("token")}`,
                'Content-Type': 'application/json'
            }
            })
            .then(res => res.json())
            .then(data => {
                setTemplate1(data.email_template);
            })
        }
        if(!template2){
            fetch(`http://localhost:8000/indicator/template/2`, {
            headers: {
                'Authorization': `Bearer ${window.sessionStorage.getItem("token")}`,
                'Content-Type': 'application/json'
            }
            })
            .then(res => res.json())
            .then(data => {
                setTemplate2(data.email_template);
            })
        }
        if(!template3){
            fetch(`http://localhost:8000/indicator/template/3`, {
            headers: {
                'Authorization': `Bearer ${window.sessionStorage.getItem("token")}`,
                'Content-Type': 'application/json'
            }
            })
            .then(res => res.json())
            .then(data => {
                setTemplate3(data.email_template);
            })
        }
        // eslint-disable-next-line
    }, []);

    const handleSubjectChange = (event) => {
        setCurrentSubject(event.target.value);
    };

    const handleContentChange = (content) => {
        setCurrentEmailContent(content);
    };

    return (
        <div className='emails'>

            <div className="templates">
                <div className="option" id='template_1' onClick={()=>{setCurrentSubject(template1.subject); setCurrentEmailContent(template1.body)}}>Template 1</div>
                <div className="option" id='template_2' onClick={()=>{setCurrentSubject(template2.subject); setCurrentEmailContent(template2.body)}}>Template 2</div>
                <div className="option" id='template_3' onClick={()=>{setCurrentSubject(template3.subject); setCurrentEmailContent(template3.body)}}>Template 3</div>
            </div>

            <form>
                <label htmlFor="subject" value={currentSubject}>Subject:</label>
                <div className="subject-input">
                    <input type="text" id="subject" value={currentSubject} onChange={handleSubjectChange} placeholder="Enter subject"/>
                </div>
                <div className="setting">
                    <TextEditor 
                        onContentChange={handleContentChange}
                        currentEmailContent = {currentEmailContent}
                    />
                </div>
                <button type="submit" className="save">
                    <p className="text">
                        Save
                    </p>
                </button>
            </form>

            <ARSSummary
                currentActivityInfo = {props.currentActivityInfo}
                currentAttendanceInfo = {props.currentAttendanceInfo}
                currentGradesInfo = {props.currentGradesInfo}

                selectedEnrollment={props.selectedEnrollment}
            />

            <button type="submit" className="save">
                <p className="text">
                    Send
                </p>
            </button>

        </div>         
    )
}

export default EmailsPage;
import React, { useState, useEffect, useCallback } from 'react';
import ToolTip from '../../ui/other/ToolTip/ToolTip';
import Loading2 from '../../ui/animations/loading/Loading2/Loading2';
import PrimaryButton from '../../ui/buttons/PrimaryButton/PrimaryButton'
import { API_URL } from '../../../config';

import './GradeSetting.css'

const defaultGradeSettings = {
    course_id: 0,
    setting_status: false,
    percentile: 0,
    a_plus: false,
    a: false,
    a_minus: false,
    b_plus: false,
    b: false,
    b_minus: false,
    c_plus: false,
    c: false,
    c_minus: false,
    d_plus: false,
    d: false,
    d_minus: false,
    e: false,
    f: false
};

const GradeCheckbox = ({ name, label, checked, onChange }) => (
    <div className="checkboxElement">
        <input
            className='checkbox3'
            type="checkbox"
            name={name}
            checked={checked}
            onChange={onChange}
        />
        <label>{label}</label>
    </div>
);

const fetchData = async (url, options, signal) => {
    try {
        const response = await fetch(url, { ...options, signal });
        if (!response.ok) throw new Error('Error fetching data');
        return response.json();
    } catch (error) {
        if (error.name === 'AbortError') {
            console.log('Fetch aborted');
        } else {
            console.error(error);
        }
        return null;
    }
};

function GradeSetting({ selectedEnrollment, setCurrentGradesInfo }) {
    const [currentGradesSetting, setCurrentGradesSetting] = useState(defaultGradeSettings);
    const [numStudentsAtRisk, setNumStudentsAtRisk] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (name, value) => {
        setCurrentGradesSetting(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmitGrades = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        const options = {
            method: 'POST',
            body: JSON.stringify(currentGradesSetting),
            headers: {
                'Authorization': `Bearer ${window.sessionStorage.getItem("token")}`,
                'Content-Type': 'application/json'
            }
        };
        const data = await fetchData(`${API_URL}/api/ars/setting/grade/${selectedEnrollment}`, options);
        if (data) {
            const gradesData = await fetchData(`${API_URL}/api/ars/grades/${selectedEnrollment}`, {
                headers: {
                    'Authorization': `Bearer ${window.sessionStorage.getItem("token")}`,
                    'Content-Type': 'application/json'
                }
            });
            if (gradesData) {
                setCurrentGradesInfo(gradesData);
                setNumStudentsAtRisk(gradesData.total);
            }
        }
        setIsLoading(false);
    };

    const fetchGradeSettings = useCallback(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        const loadGradeSettings = async () => {
            setCurrentGradesSetting(defaultGradeSettings);
            setIsLoading(true);

            const gradeSettingData = await fetchData(`${API_URL}/api/ars/setting/grade/${selectedEnrollment}`, {
                headers: {
                    'Authorization': `Bearer ${window.sessionStorage.getItem("token")}`,
                    'Content-Type': 'application/json'
                }
            }, signal);

            if (gradeSettingData) {
                setCurrentGradesSetting(gradeSettingData);

                const gradesData = await fetchData(`${API_URL}/api/ars/grades/${selectedEnrollment}`, {
                    headers: {
                        'Authorization': `Bearer ${window.sessionStorage.getItem("token")}`,
                        'Content-Type': 'application/json'
                    }
                }, signal);
                if (gradesData) {
                    setCurrentGradesInfo(gradesData);
                    setNumStudentsAtRisk(gradesData.total);
                }
            } else {
                setCurrentGradesSetting(defaultGradeSettings);
            }

            setIsLoading(false);
        };

        loadGradeSettings();

        return () => {
            controller.abort();
        };
    }, [selectedEnrollment, setCurrentGradesInfo]);

    useEffect(() => {
        const abortFetch = fetchGradeSettings();
        return () => abortFetch();
    }, [fetchGradeSettings]);

    return (
        <div>
            <div className="title">
                <div className='aligner'>
                    <input
                        className='checkbox spaced-checkbox'
                        type="checkbox"
                        onChange={e => handleChange('setting_status', e.target.checked)}
                        name="setting_status"
                        checked={currentGradesSetting.setting_status}
                    />
                    Grades
                    <ToolTip
                        title=""
                        text="Identify Students at Risk according to their current Total Grade. For optimal accuracy, assignments must be graded regularly."
                    />
                </div>
            </div>

            <div className="centered">
                <form id="gradesForm" onSubmit={handleSubmitGrades}>
                    <div className="centered">
                        <div
                            className="checkboxes"
                            style={{
                                opacity: currentGradesSetting.setting_status ? 1 : 0.5,
                                pointerEvents: currentGradesSetting.setting_status ? 'auto' : 'none'
                            }}
                        >
                            {['e', 'd_minus', 'd', 'd_plus', 'c_minus', 'c', 'c_plus'].map(grade => (
                                <GradeCheckbox
                                    key={grade}
                                    name={grade}
                                    label={grade.toUpperCase().replace('_', ' ')}
                                    checked={currentGradesSetting[grade]}
                                    onChange={e => handleChange(grade, e.target.checked)}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="centered">OR</div>
                    <label htmlFor="percentile">
                        Percentile:
                        <ToolTip
                            title=""
                            text="The Percentile feature helps identify Students at Risk by comparing their current scores to the rest of the class."
                        />
                    </label>
                    <div className="centered">
                        <input
                            type="number"
                            id="percentile"
                            onChange={e => handleChange('percentile', e.target.value)}
                            name="percentile"
                            value={currentGradesSetting.percentile}
                            style={{
                                opacity: currentGradesSetting.setting_status ? 1 : 0.5,
                                pointerEvents: currentGradesSetting.setting_status ? 'auto' : 'none'
                            }}
                        />
                    </div>

                    <PrimaryButton
                        text="Save"
                        icon="save"
                        scale={1}
                        onClick={handleSubmitGrades}
                    />
                </form>
                {isLoading ? (
                    <Loading2 />
                ) : (
                    <p>Number of students at risk: {numStudentsAtRisk}</p>
                )}
            </div>
        </div>
    );
}

export default GradeSetting;

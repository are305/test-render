import { useState, useEffect } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import ToolTip from '../../other/ToolTip/ToolTip';
import { API_URL } from '../../../../config';

function CommentsPercentage({ selectedEnrollment }) {

    const [loading, setLoading] = useState(false);
    const [commentsPercentage, setCommentsPercentage] = useState(0);

    useEffect(() => {
        const controller = new AbortController();

        if (selectedEnrollment) {
            setLoading(true);
            fetch(`${API_URL}/api/dashboard/comments-interaction/${selectedEnrollment}`, {
                signal: controller.signal,
                headers: {
                    'Authorization': `Bearer ${window.sessionStorage.getItem("token")}`,
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    setCommentsPercentage(data);
                    setLoading(false);
                })
                .catch(error => console.error(error));
        }

        return () => {
            controller.abort();
        }

    }, [selectedEnrollment]);

    return (
        <div style={{ width: 100, height: 100 }}>
            <div className="title">
                Comments Interaction
                <ToolTip title={''} text={'Identify how often the Teacher comments in Students assignments.'} />
            </div>
            {loading ? (
                <CircularProgressbar
                    value={0}
                    text={0}
                />
            ) : (
                <CircularProgressbar
                    value={commentsPercentage}
                    text={`${commentsPercentage}%`}
                />
            )}
        </div>
    );
}

export default CommentsPercentage;
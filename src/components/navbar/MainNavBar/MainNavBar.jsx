import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../../config";
import './MainNavBar.css';

function MainNavBar() {
    const navigate = useNavigate();
    const currentUserInfoDefault = { first_name: "" };
    const [currentUserInfo, setCurrentUserInfo] = useState(currentUserInfoDefault);

    const handleLogout = () => {
        window.sessionStorage.removeItem('token');
        navigate('/');
    };

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await fetch(`${API_URL}/api/ars/myinfo`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${window.sessionStorage.getItem("token")}`,
                        'Content-Type': 'application/json'
                    }
                });
                
                if (response.ok) {
                    const data = await response.json();
                    setCurrentUserInfo(data);
                } else {
                    setCurrentUserInfo(currentUserInfoDefault);
                }
            } catch (error) {
                console.error("Error fetching user info:", error);
                setCurrentUserInfo(currentUserInfoDefault);
            }
        };

        fetchUserInfo();
    }, []);

    return (
        <div className="nav-container">
            <div className="title">
                Shepherd's Guide
            </div>
            <div className="options">
                <div className="welcome">
                    Welcome, {currentUserInfo.first_name}
                </div>
                <div className="logout" onClick={handleLogout}>
                    Log Out
                </div>
            </div>
        </div>
    );
}

export default MainNavBar;

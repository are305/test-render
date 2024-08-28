import React, { useEffect, useState } from 'react';
import { config } from '../../config';
import { useNavigate } from "react-router-dom";
import PrimaryButton from '../../components/ui/buttons/PrimaryButton/PrimaryButton';
import { PublicClientApplication } from "@azure/msal-browser";
import styles from './LoginPage.module.css';

function LoginPage() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    const msalConfig = {
        auth: {
            clientId: config.clientId,
            authority: config.authority,
            redirectUri: config.redirectUri,
        },
    };
    const msalInstance = new PublicClientApplication(msalConfig);
    msalInstance.initialize();

    const handleLogin = async () => {
        try {
            const response = await msalInstance.loginPopup();
            window.sessionStorage.setItem("token", response.idToken);
            navigate('/home');
        } catch (error) {
            navigate('/unauthorized');
        }
    };

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 100);
    }, []);

    return (
        <div id={styles.main} className={isLoading ? styles.isLoading : ''}>
            <div className={styles.loginContainer}>
                <h1 className={styles.title}>
                    Shepherd's Guide
                </h1>
                <PrimaryButton onClick={handleLogin} text={"Log In"}/>
            </div>
        </div>
    );
}

export default LoginPage;

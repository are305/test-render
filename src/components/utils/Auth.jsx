import { Navigate } from "react-router-dom"

const Auth = ({ children }) => {
    if(sessionStorage.getItem("token")) {
        return children;
    }
    return <Navigate to="/" />;
}

export default Auth;
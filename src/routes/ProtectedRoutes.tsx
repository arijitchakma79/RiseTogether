import React from "react";
import { Navigate } from 'react-router-dom';
import { useAuth } from "../contexts/AuthContext";


const ProtectedRoutes : React.FC <({children: React.ReactElement})> = ({children}) => {
    const { isAuthenticated } = useAuth(); 
    
    if (!isAuthenticated) {
        return <Navigate to="/auth" />;
    }

    return children;
}

export default ProtectedRoutes;
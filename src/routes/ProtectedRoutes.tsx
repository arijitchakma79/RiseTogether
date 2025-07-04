import React from "react";
import { Navigate } from 'react-router-dom';
import { useAuth } from "../contexts/AuthContext";


const ProtectedRoutes : React.FC <({children: React.ReactElement})> = ({children}) => {
    const { isAuthenticated, user, isLoading } = useAuth();
    console.log(user);

    if (isLoading) return <div>Loading...</div>;
    
    if (!isAuthenticated) {
        return <Navigate to="/auth" />;
    }

    if (user?.role === 'admin') {
        return <Navigate to="/admin" />;
    }

    return children;
}

export default ProtectedRoutes;
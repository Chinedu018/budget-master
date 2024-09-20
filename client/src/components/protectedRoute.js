import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import UserHeader from './UserHeader';


const ProtectedRoute = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await axios.get('/api/auth/check', { withCredentials: true });
                setIsAuthenticated(response.data.isAuthenticated);
            } catch (err) {
                setIsAuthenticated(false);
            }
        };

        checkAuth();
    }, []);

    if (isAuthenticated === null) {
      
        return <div>Loading...</div>; // Or a spinner

    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    } 

    return (
        <div>
        <UserHeader />
        {children}
        </div>
    )
    

};

export default ProtectedRoute;

// UserContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import api from './api'; // Adjust the import according to your project structure


const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [userRole, setUserRole] = useState('guest');
    const [userName, setUserName] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    let role = 'guest';
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await api.get('/auth/check', { withCredentials: true });
                setUserRole(response.data.user.role.toLowerCase());
                role = response.data.user.role.toLowerCase();
                setUserName((response.data.user.name && (response.data.user.name.toUpperCase())) || null);
            } catch (err) {
                console.error('Authentication check failed:', err.message);
                setUserRole('guest');
                setUserName(null);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    return (
        <UserContext.Provider value={{ userRole, userName, loading, error, role }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
import React, { createContext, useState } from 'react';

//create the context
export const AuthContext = createContext();

// Provider component
export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({ isAuthenticated: false, user: null });

    const login = (userData) => {
        setAuthState({ isAuthenticated: true, user: userData });
    };

    const logout = () => {
        setAuthState({ isAuthenticated: false, user: null });
    };

    return (
        <AuthContext.Provider value={{ authState, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
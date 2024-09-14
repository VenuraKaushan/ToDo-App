import React, { createContext, useState } from 'react';

// Create the context
export const AuthContext = createContext();

// Helper function to generate a custom ID
const generateCustomId = () => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.length === 0) {
        return 'USR1';
    }
    const lastUserId = users[users.length - 1].id;
    const idNumber = parseInt(lastUserId.replace('USR', ''), 10);
    return `USR${idNumber + 1}`;
};

// Provider component
export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({ isAuthenticated: false, user: null });

    const register = (name, email, password) => {
        const newUser = {
            id: generateCustomId(),
            name,
            email,
            password,
        };
        const users = JSON.parse(localStorage.getItem('users')) || [];
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        setAuthState({ isAuthenticated: true, user: newUser });
    };

    const login = (userData) => {
        setAuthState({ isAuthenticated: true, user: userData });
    };

    const logout = () => {
        setAuthState({ isAuthenticated: false, user: null });
    };

    return (
        <AuthContext.Provider value={{ authState, register, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

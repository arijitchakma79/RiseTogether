// src/context/AuthContext.tsx

import React, {createContext, useContext, useState, ReactNode} from 'react';
import { AuthContextType, User } from './authTypes';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{children: ReactNode}> = ({children}) => {
    const [user, setUser] = useState<User | null>(null);
    
    const login = (userData: User) => {
        setUser(userData);
    };

    const logout = () => {
        setUser(null);
    }

    const value: AuthContextType = {
        user,
        login,
        logout,
        isAuthenticated: !!user,
    };
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () : AuthContextType => {
    const context = useContext(AuthContext)
    if (!context) throw new Error('useAuth must be used within an AuthProvider');
    return context;
}
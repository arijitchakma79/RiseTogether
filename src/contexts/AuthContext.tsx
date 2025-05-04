// src/context/AuthContext.tsx

import React, {createContext, useContext, useState, ReactNode} from 'react';
import { AuthContextType, Role, User } from './authTypes';
import { login_user, create_user, logout_user } from '../apis/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{children: ReactNode}> = ({children}) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    
    const login = async (email: string, password: string) => {
        setIsLoading(true);
        const result = await login_user(email, password);
        if (!result.success) {
            setIsLoading(false);
            return {success: false, error: result.error};
        }

        const sessionUser = result.data?.user;
        if (!sessionUser) {
            setIsLoading(false);
            return { success: false, error: "User not returned from Supabase" };
          }
        const metadata = sessionUser?.user_metadata || {};

        setUser({
            email: sessionUser.email!,
            role: metadata.userRole as Role|| 'user' ,
            fullName: metadata.fullName || '',
            displayName: metadata.displayName || '',

        });

        setIsLoading(false);
        return {success: true};
    };

    const signup = async (email: string, password: string, fullName: string, role: 'user' | 'admin' = 'user') => {
        setIsLoading(true);
        const result = await create_user(email, password, fullName, role);
        setIsLoading(false);
        return result;
    }

    const logout = async () => {
        setIsLoading(true);
        await logout_user();
        setUser(null);
        setIsLoading(false);
    }

    const value: AuthContextType = {
        user,
        login,
        logout,
        signup,
        isAuthenticated: !!user,
        isLoading,
      };
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () : AuthContextType => {
    const context = useContext(AuthContext)
    if (!context) throw new Error('useAuth must be used within an AuthProvider');
    return context;
}
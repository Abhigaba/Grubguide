'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { account } from '@/config/appwrite';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const getUser = async () => {
            try {
                const user = await account.get();
                setUser(user);
            } catch {
                setUser(null);
            }
        };
        getUser();
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

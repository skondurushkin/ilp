import { createContext } from 'react';
import { User } from './User';

export interface Auth {
    authData: AuthData;
    isAuthenticated: boolean;
}

export interface AuthData {
    me: User;
}

export const AuthContext = createContext<Auth | null>(null);

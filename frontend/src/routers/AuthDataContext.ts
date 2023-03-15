import { createContext } from 'react';
import { UserRole } from '../config/constants';

export interface AuthDataContextInterface {
    isAuthenticated: boolean;
    authData: {
        me: {
            role: UserRole | null;
        };
    };
}

export const AuthDataContext = createContext<AuthDataContextInterface | null>(null);

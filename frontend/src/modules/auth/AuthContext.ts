import { User } from './User';
import { createContext } from 'react';

export interface AuthData {
    me: User;
}

export const AuthContext = createContext<AuthData | null>(null);

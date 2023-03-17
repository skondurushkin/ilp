import { createContext } from 'react';
import { UserRole } from './User';

export interface AuthActions {
    signIn: (role: UserRole) => void;
    signOut: () => void;
}

export const AuthActionsContext = createContext<AuthActions | null>(null);

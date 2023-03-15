import { createContext } from 'react';
import { UserRole } from '../config/constants';

export interface AuthActionsContextInterface {
    signIn: (role: UserRole) => void;
    signOut: () => void;
}

export const AuthActionsContext = createContext<AuthActionsContextInterface | null>(null);

import { createContext } from 'react';

export interface AuthActions {
    signIn: (email: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
}

export const AuthActionsContext = createContext<AuthActions | null>(null);

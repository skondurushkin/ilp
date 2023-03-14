import { createContext } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';

type AuthContextProps = ReturnType<typeof useAuthContext>['authContext'];

export const AuthContext = createContext<Partial<AuthContextProps>>({});

import { useContext } from 'react';
import { AuthDataContext } from '../routers/AuthDataContext';

export const useAuthDataContext = () => {
    const context = useContext(AuthDataContext);
    if (!context) {
        throw new Error('useAuthDataContext must be used inside AuthDataContext.Provider');
    }
    return context;
};

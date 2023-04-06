import { AuthActionsContext } from './AuthActionsContext';
import { useContext } from 'react';

export const useAuthActions = () => {
    const context = useContext(AuthActionsContext);
    if (!context) {
        throw new Error('useAuthActions must be used inside AuthActionsContext.Provider');
    }
    return context;
};

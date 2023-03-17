import { useContext } from 'react';
import { AuthActionsContext } from './AuthActionsContext';

export const useAuthActions = () => {
    const context = useContext(AuthActionsContext);
    if (!context) {
        throw new Error('useAuthActions must be used inside AuthActionsContext.Provider');
    }
    return context;
};

import { useContext } from 'react';
import { AuthActionsContext } from '../routers/AuthActionsContext';

export const useAuthActionsContext = () => {
    const context = useContext(AuthActionsContext);
    if (!context) {
        throw new Error('useAuthActionsContext must be used inside AuthActionsContext.Provider');
    }
    return context;
};

import {
    AuthActionsContext,
    AuthContext,
    UserRole,
    hasRole,
    restoreAuthFromLocalStorage,
    useHttpAuthBackend,
} from '../modules/auth';

import { authAdminRoutes } from './authAdminRoutes';
import { authUserRoutes } from './authUserRoutes';
import { guestRoutes } from './guestRoutes';
import { useMemo } from 'react';
import { useRoutes } from 'react-router-dom';

restoreAuthFromLocalStorage();

export const AppRouter = () => {
    const { authData, authActions } = useHttpAuthBackend();

    const routerForUser = useMemo(() => {
        return hasRole(authData, UserRole.USER)
            ? hasRole(authData, UserRole.ADMIN)
                ? [...authUserRoutes, ...authAdminRoutes]
                : authUserRoutes
            : guestRoutes;
    }, [authData.me.roles]);

    const router = useRoutes(routerForUser);

    return (
        <AuthContext.Provider value={authData}>
            <AuthActionsContext.Provider value={authActions}>{router}</AuthActionsContext.Provider>
        </AuthContext.Provider>
    );
};

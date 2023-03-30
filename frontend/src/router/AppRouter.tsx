import {
    AuthActionsContext,
    AuthContext,
    UserRole,
    hasRole,
    restoreAuthFromLocalStorage,
    useHttpAuthBackend,
} from '../modules/auth';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { authAdminRoutes } from './authAdminRoutes';
import { authUserRoutes } from './authUserRoutes';
import { guestRoutes } from './guestRoutes';

const guestRouter = <RouterProvider router={createBrowserRouter([...guestRoutes])} />;
const userRouter = <RouterProvider router={createBrowserRouter([...authUserRoutes])} />;
const adminRouter = <RouterProvider router={createBrowserRouter([...authUserRoutes, ...authAdminRoutes])} />;

restoreAuthFromLocalStorage();

export const AppRouter = () => {
    const { authData, authActions } = useHttpAuthBackend();
    console.log(authData)

    // const router = hasRole(authData, UserRole.USER)
    //     ? hasRole(authData, UserRole.ADMIN)
    //         ? adminRouter
    //         : userRouter
    //     : guestRouter;
    const router = hasRole(authData, UserRole.USER)
        ? hasRole(authData, 'MODERATOR')
            ? adminRouter
            : userRouter
        : guestRouter;

    return (
        <AuthContext.Provider value={authData}>
            <AuthActionsContext.Provider value={authActions}>{router}</AuthActionsContext.Provider>
        </AuthContext.Provider>
    );
};

export type RoutePath = InferRoutesPaths<typeof guestRoutes> | InferRoutesPaths<typeof authUserRoutes>;

type InferRoutesPaths<T> = T extends ReadonlyArray<infer Route>
    ? Route extends { path: infer Path }
        ? Path extends string
            ? Path extends '*'
                ? never
                : Path | WithPrefix<InferChildrenPaths<Route>, Path>
            : never
        : never
    : never;

type InferChildrenPaths<T> = T extends { children: infer Children }
    ? Children extends ReadonlyArray<infer Route>
        ? Route extends { path: infer Path }
            ? Path extends string
                ? Path extends '*'
                    ? never
                    : Path | InferRoutesPaths<Children>
                : never
            : never
        : never
    : never;

type WithPrefix<T extends string, Prefix extends string> = `${Prefix}/${T}`;

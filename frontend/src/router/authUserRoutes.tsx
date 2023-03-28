import { MainPage, NotFound, Profile } from '../pages';

import { TypedNavigate } from './components/TypedNavigate';

export const authUserRoutes = [
    { path: '/sign-in', element: <TypedNavigate to="/" replace /> },
    { path: '/', element: <MainPage /> },
    { path: '/profile', element: <Profile /> },
    { path: '/admin', element: <div>Admin page</div> },
    { path: '/rules', element: <div>Program rules page</div> },
    { path: '/support', element: <div>Support page</div> },
    { path: '*', element: <NotFound /> },
] as const;

import { MainPage, NotFoundPage, ProfilePage, RulesPage } from '../pages';

import { TypedNavigate } from './components/TypedNavigate';

export const authUserRoutes = [
    { path: '/sign-in', element: <TypedNavigate to="/" replace /> },
    { path: '/', element: <MainPage /> },
    { path: '/profile', element: <ProfilePage /> },
    { path: '/rules', element: <RulesPage /> },
    { path: '*', element: <NotFoundPage /> },
] as const;

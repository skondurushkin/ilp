import { Dashboard, Profile, NotFound } from '../pages';
import { TypedNavigate } from './components/TypedNavigate';

export const authUserRoutes = [
    { path: '/', element: <TypedNavigate to="/dashboard" replace /> },
    { path: '/sign-in', element: <TypedNavigate to="/dashboard" replace /> },
    { path: '/dashboard', element: <Dashboard /> },
    { path: '/profile', element: <Profile /> },
    { path: '*', element: <NotFound /> },
] as const;

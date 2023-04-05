import { MainPage, NotFoundPage, ProfilePage, RulesPage } from '../pages';

import { AdminStatistic } from '../pages/AdminStatistic';
import { Layout } from '../components/Layout';
import { TypedNavigate } from './components/TypedNavigate';

export const authUserRoutes = [
    { path: '/sign-in', element: <TypedNavigate to="/" replace /> },
    { path: '/', element: <MainPage /> },
    { path: '/profile', element: <ProfilePage /> },
    { path: '/admin', element: <Layout>Admin page</Layout> },
    { path: '/admin/statistic', element: <AdminStatistic /> },
    { path: '/rules', element: <RulesPage /> },
    { path: '*', element: <NotFoundPage /> },
] as const;

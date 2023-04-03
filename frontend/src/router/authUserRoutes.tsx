import { MainPage, NotFoundPage, ProductPage, ProfilePage, RulesPage } from '../pages';

import { Layout } from '../components/Layout';
import { TypedNavigate } from './components/TypedNavigate';

export const authUserRoutes = [
    { path: '/sign-in', element: <TypedNavigate to="/" replace /> },
    { path: '/', element: <MainPage /> },
    { path: '/profile', element: <ProfilePage /> },
    { path: '/products/:id', element: <ProductPage /> },
    { path: '/admin', element: <Layout>Admin page</Layout> },
    { path: '/rules', element: <RulesPage /> },
    { path: '*', element: <NotFoundPage /> },
] as const;

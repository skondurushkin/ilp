import { ActivitiesAdminPage } from '../pages/ActivitiesAdminPage';
import { CreateActivitiesAdminPage } from '../pages/CreateActivitiesAdminPage';
import { Layout } from '../components/Layout';

export const authAdminRoutes = [
    {
        path: '/admin',
        element: <Layout>Admin page</Layout>,
        index: true,
    },
    {
        path: '/admin/activities',
        index: true,
        element: <ActivitiesAdminPage />,
    },
    {
        path: '/admin/activities/create',
        element: <CreateActivitiesAdminPage />,
    },
] as const;

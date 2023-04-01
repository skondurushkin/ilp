import { ActivitiesAdminPage } from '../pages/ActivitiesAdminPage';
import { CreateActivitiesAdminPage } from '../pages/CreateActivitiesAdminPage';
import { EditActivitiesAdminPage } from '../pages/EditActivitiesAdminPage';
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
    {
        path: '/admin/activities/edit/:activityId',
        element: <EditActivitiesAdminPage />,
    },
] as const;

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
        element: (
            <Layout className="overflow-y-hidden overflow-x-scroll">
                <ActivitiesAdminPage />
            </Layout>
        ),
    },
    {
        path: '/admin/activities/create',
        element: (
            <Layout>
                <CreateActivitiesAdminPage />
            </Layout>
        ),
    },
] as const;

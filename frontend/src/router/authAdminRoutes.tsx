import { ActivitiesAdminPage } from '../pages/ActivitiesAdminPage';
import { Layout } from '../components/Layout';

export const authAdminRoutes = [
    {
        path: '/admin',
        element: <Layout>Admin page</Layout>,
        index: true,
    },
    {
        path: '/admin/activities',
        element: (
            <Layout className="overflow-y-hidden overflow-x-scroll">
                <ActivitiesAdminPage />
            </Layout>
        ),
    },
] as const;

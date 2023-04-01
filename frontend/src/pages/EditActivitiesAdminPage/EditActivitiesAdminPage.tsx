import { EditActivitiesForm } from './EditActivitiesForm';
import { Layout } from '../../components/Layout';
import { Spinner } from '../../components/Spinner';
import { useParams } from 'react-router-dom';
import { useQueryActivityById } from '../../modules/admin/activities';

export const EditActivitiesAdminPage = () => {
    const { activityId } = useParams();

    const { data: activity, isLoading } = useQueryActivityById({
        activityId: Number(activityId),
    });

    if (isLoading) {
        return (
            <Layout>
                <Spinner />
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="flex flex-col gap-6">
                <h1 className="text-h1">Редактирование активности</h1>
                <EditActivitiesForm
                    defaultValues={{
                        name: activity?.name,
                        amount: activity?.amount,
                        infoLink: activity?.infoLink,
                    }}
                />
            </div>
        </Layout>
    );
};

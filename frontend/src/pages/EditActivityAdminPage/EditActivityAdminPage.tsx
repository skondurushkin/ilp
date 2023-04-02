import { DataNotFound } from '../../components/DataNotFound';
import { EditActivityForm } from './EditActivityForm';
import { Layout } from '../../components/Layout';
import { Spinner } from '../../components/Spinner';
import { useParams } from 'react-router-dom';
import { useQueryActivityById } from '../../modules/admin';

export const EditActivityAdminPage = () => {
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

    if (activity) {
        return (
            <Layout>
                <div className="flex flex-col gap-6">
                    <h1 className="text-h1">Редактирование активности</h1>
                    <EditActivityForm
                        values={{
                            id: activity.id,
                            name: activity.name,
                            amount: activity.amount,
                            infoLink: activity.infoLink,
                        }}
                    />
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <DataNotFound />
        </Layout>
    );
};

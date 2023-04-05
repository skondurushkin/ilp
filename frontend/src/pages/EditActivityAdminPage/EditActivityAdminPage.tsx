import { Breadcrumbs } from '../../components/Breadcrumbs';
import { DataNotFound } from '../../components/DataNotFound';
import { EditActivityForm } from './EditActivityForm';
import { PageSpinner } from '../../components/Spinner';
import { useParams } from 'react-router-dom';
import { useQueryActivityById } from '../../modules/admin';

export const EditActivityAdminPage = () => {
    const { activityId } = useParams();

    const { data: activity, isLoading } = useQueryActivityById({
        activityId: Number(activityId),
    });

    if (isLoading) {
        return <PageSpinner />;
    }

    if (activity) {
        return (
            <div className="flex flex-col gap-6">
                <h1 className="text-h1">Редактирование активности</h1>
                <Breadcrumbs
                    items={[
                        { label: 'Администрирование', link: '/admin' },
                        { label: 'Активности', link: '/admin/activities' },
                        { label: 'Редактирование активности' },
                    ]}
                />
                <EditActivityForm
                    values={{
                        id: activity.id,
                        name: activity.name,
                        amount: activity.amount,
                        infoLink: activity.infoLink,
                    }}
                />
            </div>
        );
    }

    return <DataNotFound />;
};

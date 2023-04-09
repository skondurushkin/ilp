import { Breadcrumbs } from '../../components/Breadcrumbs';
import { CreateActivityForm } from './CreateActivityForm';

export const CreateActivityAdminPage = () => {
    return (
        <div className="flex flex-col gap-6">
            <Breadcrumbs
                items={[
                    { label: 'Администрирование', link: '/admin' },
                    { label: 'Активности', link: '/admin/activities' },
                    { label: 'Добавление активности' },
                ]}
            />
            <h1 className="text-h1">Добавление активности</h1>
            <CreateActivityForm
                defaultValues={{
                    amount: 1,
                    name: '',
                    infoLink: '',
                    description: '',
                }}
            />
        </div>
    );
};

import { CreateActivitiesForm } from './CreateActivitiesForm';
import { Layout } from '../../components/Layout';

export const CreateActivitiesAdminPage = () => {
    return (
        <Layout>
            <div className="flex flex-col gap-6">
                <h1 className="text-h1">Добавление активности</h1>
                <CreateActivitiesForm
                    defaultValues={{
                        amount: 1,
                        name: '',
                        infoLink: '',
                    }}
                />
            </div>
        </Layout>
    );
};

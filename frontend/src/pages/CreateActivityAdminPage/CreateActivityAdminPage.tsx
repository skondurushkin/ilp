import { CreateActivityForm } from './CreateActivityForm';
import { Layout } from '../../components/Layout';

export const CreateActivityAdminPage = () => {
    return (
        <Layout>
            <div className="flex flex-col gap-6">
                <h1 className="text-h1">Добавление активности</h1>
                <CreateActivityForm
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

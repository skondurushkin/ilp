import { BalanceHistory } from './BalanceHistory';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { DataNotFound } from '../../components/DataNotFound';
import { PageSpinner } from '../../components/Spinner';
import { useParams } from 'react-router-dom';
import { useQueryProfileByIdAsAdmin } from '../../modules/admin';

export const UserAdminPage = () => {
    const { userId } = useParams();

    const { data: profile, isLoading } = useQueryProfileByIdAsAdmin({
        userId: Number(userId),
    });

    if (isLoading) {
        return <PageSpinner />;
    }
    if (!profile) {
        return <DataNotFound />;
    }

    const fio = `${profile.fio.lastName} ${profile.fio.firstName} ${profile.fio.middleName}`;

    return (
        <div className="flex flex-col gap-6">
            <Breadcrumbs
                items={[
                    { label: 'Администрирование', link: '/admin' },
                    { label: 'Пользователи', link: '/admin/users' },
                    { label: fio },
                ]}
            />
            <h1 className="text-h1">{fio}</h1>
            <div>
                <h2 className="text-h2">Баланс</h2>
                <h2 className="text-h2">{profile.balance} Вольт</h2>
            </div>

            <BalanceHistory userId={Number(userId)} />

            <h1 className="text-h1">Заказы</h1>
        </div>
    );
};

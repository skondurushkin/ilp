import { BalanceHistory } from './BalanceHistory';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { DataNotFound } from '../../components/DataNotFound';
import { PageSpinner } from '../../components/Spinner';
import { UserBalanceCard } from './UserBalanceCard';
import { UserProfileCard } from './UserProfileCard';
import { WriteOffsHistory } from './WriteOffsHistory';
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
            <div className="flex flex-col gap-6 xl:flex-row">
                <UserProfileCard
                    showEditLink={false}
                    id={profile.id}
                    avatarLink={profile.avatarLink}
                    city={profile.city}
                    country={profile.country}
                    email={profile.email}
                    jobPosition={profile.jobPosition}
                    phone={profile.phone}
                />
                <UserBalanceCard balance={profile.balance} />
            </div>
            <BalanceHistory userId={Number(userId)} />
            <WriteOffsHistory userId={Number(userId)} />
        </div>
    );
};

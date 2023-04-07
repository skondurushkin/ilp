import { Breadcrumbs } from '../../components/Breadcrumbs';
import { Button } from '../../components/Button';
import { DataNotFound } from '../../components/DataNotFound';
import { ProfileCard } from './ProfileCard';
import { SearchInput } from './SearchInput';
import { useQuerySearchProfileAsAdmin } from '../../modules/admin';
import { useState } from 'react';

export const UsersAdminPage = () => {
    const [searchKey, setSearchKey] = useState('');

    const { data, fetchNextPage, hasNextPage, isFetching, isError } = useQuerySearchProfileAsAdmin(searchKey);

    return (
        <div className="flex flex-col gap-6">
            <Breadcrumbs items={[{ label: 'Администрирование', link: '/admin' }, { label: 'Пользователи' }]} />
            <h1 className="text-h1 mb-2">Пользователи</h1>

            <SearchInput value={searchKey} onChange={setSearchKey} />

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {(data?.pages ?? []).map((paginated) =>
                    paginated.results?.map((profile) => (
                        <div className="flex flex-1" key={profile.id}>
                            <ProfileCard
                                id={profile.id}
                                avatarLink={profile.avatarLink}
                                jobPosition={profile.jobPosition}
                                city={profile.city}
                                country={profile.country}
                                email={profile.email}
                                fio={`${profile.fio.lastName} ${profile.fio.firstName} ${profile.fio.middleName}`}
                                phone={profile.phone}
                            />
                        </div>
                    )),
                )}
            </div>

            {hasNextPage && (
                <div className="md:self-center">
                    <Button primary className="w-full" disabled={isFetching} onClick={() => fetchNextPage()}>
                        Загрузить еще
                    </Button>
                </div>
            )}

            {isError && <DataNotFound />}
        </div>
    );
};

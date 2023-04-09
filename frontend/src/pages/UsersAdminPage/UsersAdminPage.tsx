import { Breadcrumbs } from '../../components/Breadcrumbs';
import { Button } from '../../components/Button';
import { DataNotFound } from '../../components/DataNotFound';
import { PageSpinner } from '../../components/Spinner';
import { ProfileCard } from './ProfileCard';
import { SearchInput } from '../../components/SearchInput';
import { useQuerySearchProfileAsAdmin } from '../../modules/admin';
import { useSearchParams } from 'react-router-dom';

export const USERS_ADMIN_PAGE_FILTER_NAME = 'filter';

export const UsersAdminPage = () => {
    const [search, setSearch] = useSearchParams();
    const searchKey = search.get(USERS_ADMIN_PAGE_FILTER_NAME) ?? '';

    const { data, fetchNextPage, hasNextPage, isFetching, isError } = useQuerySearchProfileAsAdmin(searchKey);
    const pages = data?.pages ?? [];

    return (
        <div className="flex flex-col gap-6">
            <Breadcrumbs items={[{ label: 'Администрирование', link: '/admin' }, { label: 'Пользователи' }]} />
            <h1 className="text-h1">Пользователи</h1>

            <SearchInput
                value={searchKey}
                placeholder="Поиск по ФИО, email"
                onChange={(value) =>
                    setSearch(
                        { [USERS_ADMIN_PAGE_FILTER_NAME]: value },
                        {
                            replace: true,
                        },
                    )
                }
            />

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {pages.map((paginated) =>
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

            {!isFetching && !!searchKey && (pages[0].results ?? []).length === 0 && (
                <DataNotFound message="Пользователи не найдены" />
            )}
            {isFetching && <PageSpinner />}

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

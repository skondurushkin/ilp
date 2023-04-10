import { ActivityResponse, PageRequest, api } from '../../api';
import { useCallback, useMemo } from 'react';
import { useMutation, useQueryClient } from 'react-query';

import { ACTIVITIES_ADMIN_PAGE_QUERY_KEY } from '../../modules/admin';
import { AdminTable } from '../../components/AdminTable';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import type { ColumnDef } from '@tanstack/react-table';
import { ReactComponent as EditSVG } from '../../assets/edit.svg';
import { ReactComponent as TrashSVG } from '../../assets/trash.svg';
import { TypedLink } from '../../router';
import { Zaps } from '../../components/Zaps';
import { twMerge } from 'tailwind-merge';

export const ActivitiesAdminPage = () => {
    const queryData = useCallback((pageRequest: PageRequest) => {
        return api.activity.browseActivities({
            pageRequest,
        });
    }, []);

    const columns = useMemo<ColumnDef<ActivityResponse>[]>(
        () => [
            {
                accessorKey: 'id',
                header: () => <span>ИД</span>,
                cell: (info) => info.getValue(),
            },
            {
                accessorKey: 'name',
                header: () => <span>Название</span>,
                cell: (info) => {
                    const { infoLink, name } = info.row.original;
                    return (
                        <div className="flex flex-col gap-2">
                            <p className="text-base text-white">{name}</p>
                            <a
                                target="_blank"
                                rel="noreferrer"
                                href={infoLink}
                                className="text-small text-gray text-ellipsis underline"
                            >
                                {infoLink}
                            </a>
                        </div>
                    );
                },
            },
            {
                accessorKey: 'amount',
                header: () => <span>Стоимость</span>,
                cell: (info) => {
                    const { amount } = info.row.original;
                    return <Zaps length={5} amount={amount} />;
                },
            },
            {
                accessorKey: 'startDate',
                header: () => <span>Дата</span>,
                cell: (info) => {
                    const { startDate, endDate, active } = info.row.original;
                    return (
                        <div className="flex flex-col gap-2">
                            {startDate && <p>{new Date(startDate).toLocaleDateString('ru-RU')}</p>}
                            {!active && endDate && (
                                <p className="text-gray">{new Date(endDate).toLocaleDateString('ru-RU')}</p>
                            )}
                        </div>
                    );
                },
            },
            {
                accessorKey: 'actions',
                header: () => <span>Действия</span>,
                cell: (info) => {
                    const { id, active } = info.row.original;
                    const queryClient = useQueryClient();

                    const { mutate: deleteActivity, isLoading: deleteIsLoading } = useMutation(
                        () => {
                            return api.activity.deleteActivity({
                                activityDeleteRequest: {
                                    id,
                                },
                            });
                        },
                        {
                            onSuccess: () => {
                                queryClient.invalidateQueries(ACTIVITIES_ADMIN_PAGE_QUERY_KEY);
                            },
                        },
                    );

                    if (active) {
                        return (
                            <div className="flex flex-col gap-2">
                                <TypedLink
                                    className="flex items-center gap-2"
                                    to="/admin/activities/edit/:activityId"
                                    params={{ activityId: id.toString() }}
                                >
                                    <EditSVG className="stroke-primary h-4 w-4" />
                                    <span className="text-small text-primary">Изменить</span>
                                </TypedLink>
                                <button
                                    className={twMerge('flex items-center gap-2', deleteIsLoading && 'opacity-50')}
                                    disabled={deleteIsLoading}
                                    onClick={() => deleteActivity()}
                                >
                                    <TrashSVG className="stroke-primary h-4 w-4" />
                                    <span className="text-small text-primary">Удалить</span>
                                </button>
                            </div>
                        );
                    }

                    return <p className="text-error text-small pl-6">В архиве</p>;
                },
            },
        ],
        [],
    );

    return (
        <div className="flex flex-col items-start gap-6">
            <Breadcrumbs items={[{ label: 'Администрирование', link: '/admin' }, { label: 'Активности' }]} />
            <div className="self-start">
                <div className="flex flex-col gap-4">
                    <h1 className="text-h1">Активности</h1>
                    <TypedLink to="/admin/activities/create" className="btn btn-primary">
                        Добавить активность
                    </TypedLink>
                </div>
            </div>
            <AdminTable
                storage="query"
                queryStorageName="globalFilter"
                queryKey={ACTIVITIES_ADMIN_PAGE_QUERY_KEY}
                globalFilterPlaceholder="Поиск по Названию и Описанию"
                columns={columns}
                queryData={queryData}
            />
        </div>
    );
};

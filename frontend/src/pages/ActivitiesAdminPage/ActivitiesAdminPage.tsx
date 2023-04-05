import { ActivityResponse, PageRequest, api } from '../../api';
import { useCallback, useMemo } from 'react';
import { useMutation, useQueryClient } from 'react-query';

import { AdminTable } from '../../components/AdminTable';
import type { ColumnDef } from '@tanstack/react-table';
import { ReactComponent as EditSVG } from '../../assets/edit.svg';
import { ReactComponent as TrashSVG } from '../../assets/trash.svg';
import { TypedLink } from '../../router';
import { twMerge } from 'tailwind-merge';

const ACTIVITIES_ADMIN_PAGE_QUERY_KEY = 'browseActivities';

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
                cell: (info) => info.getValue(),
            },
            {
                accessorKey: 'infoLink',
                header: () => <span>Дата</span>,
                cell: (info) => {
                    const { startDate, endDate } = info.row.original;
                    return (
                        <div className="flex flex-col gap-2">
                            {startDate && <p>{new Date(startDate).toLocaleDateString('ru-RU')}</p>}
                            {endDate && <p>{new Date(endDate).toLocaleDateString('ru-RU')}</p>}
                        </div>
                    );
                },
            },
            {
                accessorKey: 'actions',
                header: () => <span>Действия</span>,
                cell: (info) => {
                    const { id } = info.row.original;
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

                    return (
                        <div className="flex flex-col gap-2">
                            <TypedLink to="/admin/activities/edit/:activityId" params={{ activityId: id.toString() }}>
                                <button className="flex items-center gap-2">
                                    <EditSVG className="stroke-primary h-4 w-4" />
                                    <span className="text-small text-primary">Изменить</span>
                                </button>
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
                },
            },
        ],
        [],
    );

    return (
        <div className="flex flex-col gap-6">
            <h1 className="text-h1">Активности</h1>
            <div>
                <TypedLink to="/admin/activities/create">
                    <button className="btn btn-primary">Добавить активность</button>
                </TypedLink>
            </div>
            <AdminTable
                queryKey={ACTIVITIES_ADMIN_PAGE_QUERY_KEY}
                globalFilterPlaceholder="Поиск по Названию и Описанию"
                columns={columns}
                queryData={queryData}
            />
        </div>
    );
};

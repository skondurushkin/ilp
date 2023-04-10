import { ActivityStatisticResponse, PageRequest, api } from '../../api';
import { useCallback, useMemo } from 'react';

import { ACTIVITIES_STATISTIC_ADMIN_QUERY_KEY } from '../../modules/admin';
import { AdminTable } from '../../components/AdminTable';
import type { ColumnDef } from '@tanstack/table-core';

export const TopActivities = ({ period }: { period: 'day' | 'all' }) => {
    const queryData = useCallback(
        (pageRequest: PageRequest) => {
            return api.admin.browseStatisticActivities({
                browseStatisticArticlesRequest: {
                    ...pageRequest,
                    sort: 'DESC',
                    period,
                },
            });
        },
        [period],
    );

    const columns = useMemo<ColumnDef<ActivityStatisticResponse>[]>(
        () => [
            {
                accessorKey: 'id',
                header: () => <span>ун</span>,
                cell: (info) => info.getValue(),
            },
            {
                accessorKey: 'name',
                header: () => <span>название</span>,
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
                header: () => <span>стоимость</span>,
                cell: (info) => info.getValue(),
            },
            {
                accessorKey: 'infoLink',
                header: () => <span>дата</span>,
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
                header: () => <span className="flex">Участия</span>,
                accessorKey: 'count',
                cell: (info) => info.getValue(),
            },
        ],
        [],
    );

    return (
        <div className="py-4">
            <AdminTable
                queryKey={ACTIVITIES_STATISTIC_ADMIN_QUERY_KEY + period}
                globalFilterPlaceholder="Поиск по Названию и Описанию"
                columns={columns}
                queryData={queryData}
            />
        </div>
    );
};

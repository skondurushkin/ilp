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
                    const { name } = info.row.original;
                    return <p className="text-base text-white">{name}</p>;
                },
            },
            {
                accessorKey: 'price',
                header: () => <span>стоимость</span>,
                cell: (info) => info.getValue(),
            },
            {
                header: () => <span className="flex">участия</span>,
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

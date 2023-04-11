import { ArticleResponse, PageRequest, api } from '../../api';
import { useCallback, useMemo } from 'react';

import { ARTICLES_STATISTIC_ADMIN_QUERY_KEY } from '../../modules/admin';
import { AdminTable } from '../../components/AdminTable';
import type { ColumnDef } from '@tanstack/table-core';

export const TopProducts = ({ period }: { period: 'day' | 'all' }) => {
    const queryData = useCallback(
        (pageRequest: PageRequest) => {
            return api.admin.browseStatisticArticles({
                browseStatisticArticlesRequest: { ...pageRequest, period, sort: 'DESC' },
            });
        },
        [period],
    );

    const columns = useMemo<ColumnDef<ArticleResponse>[]>(
        () => [
            {
                accessorKey: 'id',
                header: () => <span>ун</span>,
                cell: (info) => info.getValue(),
            },
            {
                accessorKey: 'name',
                header: () => <span>наименование</span>,
                cell: (info) => {
                    const { description, name } = info.row.original;
                    return (
                        <div className="flex flex-col gap-2">
                            <p className="text-base text-white">{name}</p>
                            <p className="text-small text-gray text-ellipsis">{description}</p>
                        </div>
                    );
                },
            },
            {
                accessorKey: 'code',
                header: () => <span>артикул</span>,
                cell: (info) => info.getValue(),
            },
            {
                accessorKey: 'price',
                header: () => <span>стоимость</span>,
                cell: (info) => info.getValue(),
            },
            {
                accessorKey: 'count',
                header: () => <span className="flex">заказы</span>,
                cell: (info) => info.getValue(),
            },
        ],
        [],
    );

    return (
        <div className="py-4">
            <AdminTable
                queryKey={ARTICLES_STATISTIC_ADMIN_QUERY_KEY + period}
                globalFilterPlaceholder="Поиск по Наименованию, Артиклу и Стоимости"
                columns={columns}
                queryData={queryData}
            />
        </div>
    );
};

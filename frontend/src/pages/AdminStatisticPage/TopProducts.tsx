import { ArticleResponse, PageRequest, api } from '../../api';
import { useCallback, useMemo } from 'react';

import { ARTICLES_STATISTIC_ADMIN_QUERY_KEY } from '../../modules/admin';
import { AdminTable } from '../../components/AdminTable';
import type { ColumnDef } from '@tanstack/table-core';

export const TopProducts = () => {
    const queryData = useCallback((pageRequest: PageRequest) => {
        return api.article.browseArticles({
            pageRequest,
        });
    }, []);

    const columns = useMemo<ColumnDef<ArticleResponse>[]>(
        () => [
            {
                accessorKey: 'id',
                header: () => <span>ИД</span>,
                cell: (info) => info.getValue(),
            },
            {
                accessorKey: 'name',
                header: () => <span>Наименование</span>,
                cell: (info) => {
                    const { description, name } = info.row.original;
                    return (
                        <div className="flex flex-col gap-2">
                            <p className="text-base text-white">{name}</p>
                            <p className="text-small text-ellipsis text-gray">{description}</p>
                        </div>
                    );
                },
            },
            {
                accessorKey: 'code',
                header: () => <span>Артикул</span>,
                cell: (info) => info.getValue(),
            },
            {
                accessorKey: 'price',
                header: () => <span>Стоимость</span>,
                cell: (info) => info.getValue(),
            },
            {
                accessorKey: 'orders',
                header: () => <span>Заказы</span>,
                cell: (info) => info.getValue(),
            },
        ],
        [],
    );

    return (
        <div className="py-4">
            <AdminTable
                queryKey={ARTICLES_STATISTIC_ADMIN_QUERY_KEY}
                globalFilterPlaceholder="Поиск по ИД, Наименованию, Артиклу и Стоимости"
                columns={columns}
                initialSort={[{ id: 'orders', desc: true }]}
                queryData={queryData}
            />
        </div>
    );
};

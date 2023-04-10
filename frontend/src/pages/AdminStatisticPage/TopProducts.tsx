import { ArticleResponse, PageRequest, api } from '../../api';
import { useCallback, useMemo, useState } from 'react';

import { ARTICLES_STATISTIC_ADMIN_QUERY_KEY } from '../../modules/admin';
import { AdminTable } from '../../components/AdminTable';
import type { ColumnDef } from '@tanstack/table-core';
import { twMerge } from 'tailwind-merge';

export const TopProducts = ({ period }: { period: 'day' | 'all' }) => {
    const [sort, setSort] = useState<'DESC' | 'ASC'>('DESC');
    const queryData = useCallback(
        (pageRequest: PageRequest) => {
            return api.admin.browseStatisticArticles({
                browseStatisticArticlesRequest: { ...pageRequest, period, sort },
            });
        },
        [sort, period],
    );

    const columns = useMemo<ColumnDef<ArticleResponse>[]>(
        () => [
            {
                accessorKey: 'id',
                header: () => <span>ун</span>,
                cell: (info) => info.getValue(),
                enableSorting: false,
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
                enableSorting: false,
            },
            {
                accessorKey: 'code',
                header: () => <span>артикул</span>,
                cell: (info) => info.getValue(),
                enableSorting: false,
            },
            {
                accessorKey: 'price',
                header: () => <span>стоимость</span>,
                cell: (info) => info.getValue(),
                enableSorting: false,
            },
            {
                accessorKey: 'count',
                enableSorting: false,
                header: () => (
                    <button
                        onClick={() => {
                            setSort(sort == 'ASC' ? 'DESC' : 'ASC');
                        }}
                        className="cursor-pointer border-none bg-none p-0 outline-none"
                    >
                        <span className="flex">
                            Заказы
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className={twMerge(
                                    'stroke-primary h-auto w-4 transform',
                                    sort === 'ASC' ? 'rotate-90' : '-rotate-90',
                                )}
                            >
                                <path
                                    d="M15 18L9 12L15 6"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                ></path>
                            </svg>
                        </span>
                    </button>
                ),
                cell: (info) => info.getValue(),
            },
        ],
        [sort],
    );

    return (
        <div className="py-4">
            <AdminTable
                queryKey={ARTICLES_STATISTIC_ADMIN_QUERY_KEY + sort + period}
                globalFilterPlaceholder="Поиск по Наименованию, Артиклу и Стоимости"
                columns={columns}
                queryData={queryData}
            />
        </div>
    );
};

import { ActivityStatisticResponse, PageRequest, api } from '../../api';
import { useCallback, useMemo, useState } from 'react';

import { ACTIVITIES_STATISTIC_ADMIN_QUERY_KEY } from '../../modules/admin';
import { AdminTable } from '../../components/AdminTable';
import type { ColumnDef } from '@tanstack/table-core';
import { twMerge } from 'tailwind-merge';

export const TopActivities = ({ period }: { period: 'day' | 'all' }) => {
    const [sort, setSort] = useState<'DESC' | 'ASC'>('DESC');
    const queryData = useCallback(
        (pageRequest: PageRequest) => {
            return api.admin.browseStatisticActivities({
                browseStatisticArticlesRequest: {
                    ...pageRequest,
                    sort,
                    period,
                },
            });
        },
        [sort],
    );

    const columns = useMemo<ColumnDef<ActivityStatisticResponse>[]>(
        () => [
            {
                accessorKey: 'id',
                header: () => <span>ун</span>,
                cell: (info) => info.getValue(),
                enableSorting: false,
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
                enableSorting: false,
            },
            {
                accessorKey: 'amount',
                header: () => <span>стоимость</span>,
                cell: (info) => info.getValue(),
                enableSorting: false,
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
                enableSorting: false,
            },
            {
                header: () => (
                    <button
                        onClick={() => {
                            setSort(sort == 'ASC' ? 'DESC' : 'ASC');
                        }}
                        className="
                        cursor-pointer
                        border-none
                        bg-none
                        p-0
                        outline-none
"
                    >
                        <span className="flex">
                            Участия
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
                enableSorting: false,
                accessorKey: 'count',
                cell: (info) => info.getValue(),
            },
        ],
        [sort],
    );

    return (
        <div className="py-4">
            <AdminTable
                queryKey={ACTIVITIES_STATISTIC_ADMIN_QUERY_KEY}
                globalFilterPlaceholder="Поиск по Названию и Описанию"
                columns={columns}
                queryData={queryData}
            />
        </div>
    );
};

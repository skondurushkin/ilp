import { ActivityResponse, PageRequest, api } from '../../api';
import { useCallback, useMemo } from 'react';

import { ACTIVITIES_STATISTIC_ADMIN_QUERY_KEY } from '../../modules/admin';
import { AdminTable } from '../../components/AdminTable';
import type { ColumnDef } from '@tanstack/table-core';

export const TopActivities = () => {
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
                header: () => <span>Заказы</span>,
                accessorKey: 'orders',
                cell: (info) => info.getValue(),
            },
        ],
        [],
    );

    return (
        <div className="py-4">
            <AdminTable
                queryKey={ACTIVITIES_STATISTIC_ADMIN_QUERY_KEY}
                globalFilterPlaceholder="Поиск по ИД, Названию и Описанию"
                initialSort={[{ id: 'orders', desc: true }]}
                columns={columns}
                queryData={queryData}
            />
        </div>
    );
};

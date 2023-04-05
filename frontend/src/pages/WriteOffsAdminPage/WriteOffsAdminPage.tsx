import { PageRequest, WriteOffResponse, api } from '../../api';
import { useCallback, useMemo } from 'react';

import { AdminTable } from '../../components/AdminTable';
import type { ColumnDef } from '@tanstack/react-table';
import { ReactComponent as EditSVG } from '../../assets/edit.svg';
import { TypedLink } from '../../router';
import { WriteOffStatusName } from '../../modules/loyalty';

const ACTIVITIES_ADMIN_PAGE_QUERY_KEY = 'browseActivities';

export const WriteOffsAdminPage = () => {
    const queryData = useCallback((pageRequest: PageRequest) => {
        return api.admin.browseWriteOffsAsAdmin({
            pageRequest,
        });
    }, []);

    const columns = useMemo<ColumnDef<WriteOffResponse>[]>(
        () => [
            {
                accessorKey: 'id',
                header: () => <span>ИД</span>,
                cell: (info) => info.getValue(),
            },
            {
                accessorKey: 'user',
                header: () => <span>Покупатель</span>,
                cell: (info) => {
                    const { user } = info.row.original;
                    return (
                        <div className="flex flex-col gap-2">
                            <div>
                                <p className="text-base text-white">{user.name.lastName}</p>
                                <p className="text-base text-white">
                                    {user.name.firstName} {user.name.middleName}
                                </p>
                            </div>
                            <TypedLink to="/admin/users/:userId" params={{ userId: user.id.toString() }}>
                                <p className="text-small text-gray underline">Перейти</p>
                            </TypedLink>
                        </div>
                    );
                },
            },
            {
                accessorKey: 'articleId',
                header: () => <span>Товар</span>,
                cell: (info) => {
                    const { articleId, articleName } = info.row.original;
                    return (
                        <div className="flex flex-col gap-2">
                            <p className="text-base text-white">{articleName}</p>
                            <TypedLink
                                to="/admin/products/edit/:productId"
                                params={{ productId: articleId.toString() }}
                            >
                                <p className="text-small text-gray underline">Перейти</p>
                            </TypedLink>
                        </div>
                    );
                },
            },
            {
                accessorKey: 'status',
                header: () => <span>Статус заказа</span>,
                cell: (info) => {
                    const { status } = info.row.original;
                    return <p>{WriteOffStatusName[status]}</p>;
                },
            },
            {
                accessorKey: 'actions',
                header: () => <span>Действия</span>,
                cell: (info) => {
                    const { id } = info.row.original;

                    return (
                        <TypedLink to="/admin/activities/edit/:activityId" params={{ activityId: id.toString() }}>
                            <button className="flex items-center gap-2">
                                <EditSVG className="stroke-primary h-4 w-4" />
                                <span className="text-small text-primary">Изменить</span>
                            </button>
                        </TypedLink>
                    );
                },
            },
        ],
        [],
    );

    return (
        <div className="flex flex-col gap-6">
            <h1 className="text-h1">Заказы</h1>
            <AdminTable
                queryKey={ACTIVITIES_ADMIN_PAGE_QUERY_KEY}
                globalFilterPlaceholder="Поиск по ИД, Покупателю и Товару"
                columns={columns}
                queryData={queryData}
            />
        </div>
    );
};

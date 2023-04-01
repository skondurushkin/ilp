import { ActivityResponse, PageRequest, api } from '../../api';
import { useCallback, useMemo } from 'react';

import { AdminTable } from '../../components/AdminTable';
import type { ColumnDef } from '@tanstack/react-table';
import { ReactComponent as EditSVG } from '../../assets/edit.svg';
import { Layout } from '../../components/Layout';
import { ReactComponent as TrashSVG } from '../../assets/trash.svg';
import { TypedLink } from '../../router';

export const ActivitiesAdminPage = () => {
    const queryData = useCallback((pageRequest: PageRequest) => {
        return api.activity.browseActivities({
            pageRequest,
        });
    }, []);

    const columns = useMemo<ColumnDef<ActivityResponse>[]>(
        () => [
            {
                accessorKey: 'name',
                header: () => <span>Название</span>,
                cell: (info) => {
                    const { description, name } = info.row.original;
                    return (
                        <div className="flex flex-col gap-2">
                            <p>{name}</p>
                            <p className="text-small text-ellipsis">{description}</p>
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
                            {startDate && (
                                <p className="text-small">{new Date(startDate).toLocaleDateString('ru-RU')}</p>
                            )}
                            {endDate && <p className="text-small">{new Date(endDate).toLocaleDateString('ru-RU')}</p>}
                        </div>
                    );
                },
            },
            {
                accessorKey: 'actions',
                header: () => <span>Действия</span>,
                cell: (info) => {
                    const { id } = info.row.original;

                    return (
                        <div className="flex gap-2">
                            <TypedLink to="/admin/activities/edit/:activityId" params={{ activityId: id.toString() }}>
                                <button className="btn">
                                    <EditSVG />
                                </button>
                            </TypedLink>

                            <button className="btn">
                                <TrashSVG />
                            </button>
                        </div>
                    );
                },
            },
        ],
        [],
    );

    return (
        <Layout>
            <div className="flex flex-col gap-6">
                <h1 className="text-h1">Активности</h1>
                <div>
                    <TypedLink to="/admin/activities/create">
                        <button className="btn btn-primary">Добавить активность</button>
                    </TypedLink>
                </div>
                <AdminTable
                    globalFilterPlaceholder="Поиск по названию и описанию"
                    columns={columns}
                    queryData={queryData}
                    queryKey="browseActivities"
                />
            </div>
        </Layout>
    );
};

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
                                className="text-small text-ellipsis text-gray underline"
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
                    globalFilterPlaceholder="Поиск по Названию и Описанию"
                    columns={columns}
                    queryData={queryData}
                    queryKey="browseActivities"
                />
            </div>
        </Layout>
    );
};

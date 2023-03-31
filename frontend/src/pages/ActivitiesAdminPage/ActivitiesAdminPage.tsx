import { ActivityResponse, PageRequest, api } from '../../api';
import { useCallback, useMemo } from 'react';

import { AdminTable } from '../../components/AdminTable';
import type { ColumnDef } from '@tanstack/react-table';
import { ReactComponent as EditSVG } from '../../assets/edit.svg';
import { ReactComponent as TrashSVG } from '../../assets/trash.svg';

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
                cell: (info) => info.getValue(),
            },
            {
                accessorKey: 'price',
                header: () => <span>Стоимость</span>,
                cell: (info) => info.getValue(),
            },
            {
                accessorKey: 'infoLink',
                header: () => <span>Ссылка на описание</span>,
                cell: (info) => {
                    const { description } = info.row.original;
                    return (
                        <a className="underline" href={(info.cell.getValue() as string).toString()}>
                            {description}
                        </a>
                    );
                },
            },
            {
                accessorKey: 'lastName2',
                header: () => <span>Действия</span>,
                cell: () => (
                    <div className="flex gap-2">
                        <button className="btn">
                            <EditSVG />
                        </button>
                        <button className="btn">
                            <TrashSVG />
                        </button>
                    </div>
                ),
            },
        ],
        [],
    );

    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-h1">Активности</h1>
            <div>
                <button className="btn btn-primary">Добавить активность</button>
            </div>
            <AdminTable columns={columns} queryData={queryData} queryKey="browseActivities" />
        </div>
    );
};

import { ActivityResponse, PageRequest, api } from '../../api';
import { DeleteActivityData, DeleteActivityForm } from './DeleteActivityForm';
import { useCallback, useMemo, useState } from 'react';

import { ACTIVITIES_ADMIN_PAGE_QUERY_KEY } from '../../modules/admin';
import { AdminTable } from '../../components/AdminTable';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import type { ColumnDef } from '@tanstack/react-table';
import { ReactComponent as EditSVG } from '../../assets/edit.svg';
import Modal from '../../components/Modal';
import { ReactComponent as TrashSVG } from '../../assets/trash.svg';
import { TypedLink } from '../../router';
import { Zaps } from '../../components/Zaps';

export const ActivitiesAdminPage = () => {
    const [removeActivityModalData, setRemoveActivityModalData] = useState<DeleteActivityData | null>(null);

    const queryData = useCallback((pageRequest: PageRequest) => {
        return api.activity.browseActivities({
            pageRequest,
        });
    }, []);

    const columns = useMemo<ColumnDef<ActivityResponse>[]>(
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
                header: () => <span>стоимость</span>,
                cell: (info) => {
                    const { amount } = info.row.original;
                    return <Zaps length={5} amount={amount} />;
                },
            },
            {
                accessorKey: 'startDate',
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
            },
            {
                accessorKey: 'actions',
                header: () => <span>действия</span>,
                cell: (info) => {
                    const { id, name, active } = info.row.original;

                    if (active) {
                        return (
                            <div className="flex flex-col gap-2">
                                <TypedLink
                                    className="flex items-center gap-2"
                                    to="/admin/activities/edit/:activityId"
                                    params={{ activityId: id.toString() }}
                                >
                                    <EditSVG className="stroke-primary h-4 w-4" />
                                    <span className="text-small text-primary">Изменить</span>
                                </TypedLink>
                                <button
                                    className="flex items-center gap-2"
                                    onClick={() =>
                                        setRemoveActivityModalData({
                                            id,
                                            name,
                                        })
                                    }
                                >
                                    <TrashSVG className="stroke-primary h-4 w-4" />
                                    <span className="text-small text-primary">Архивировать</span>
                                </button>
                            </div>
                        );
                    }

                    return <p className="text-error text-small pl-6">В архиве</p>;
                },
            },
        ],
        [],
    );

    return (
        <div className="flex flex-col items-start gap-6">
            <Breadcrumbs items={[{ label: 'Администрирование', link: '/admin' }, { label: 'Активности' }]} />
            <div className="self-start">
                <div className="flex flex-col gap-4">
                    <h1 className="text-h1">Активности</h1>
                    <TypedLink to="/admin/activities/create" className="btn btn-primary">
                        Добавить активность
                    </TypedLink>
                </div>
            </div>
            <AdminTable
                storage="query"
                queryStorageName="globalFilter"
                queryKey={ACTIVITIES_ADMIN_PAGE_QUERY_KEY}
                globalFilterPlaceholder="Поиск по Названию и Описанию"
                columns={columns}
                queryData={queryData}
            />
            <Modal
                id="RemoveActivityForm"
                size="sm"
                isOpen={!!removeActivityModalData}
                closeModal={() => setRemoveActivityModalData(null)}
            >
                <Modal.Body>
                    {!!removeActivityModalData && (
                        <DeleteActivityForm
                            defaultValues={removeActivityModalData}
                            queryKey={ACTIVITIES_ADMIN_PAGE_QUERY_KEY}
                            closeModal={() => setRemoveActivityModalData(null)}
                        />
                    )}
                </Modal.Body>
            </Modal>
        </div>
    );
};

import {
    EditWriteOffsStatusForm,
    ReadonlyEditWriteOffsStatusFormRequest,
} from '../../components/WriteOffs/EditWriteOffsStatusForm';
import { PageRequest, WriteOffResponse, WriteOffStatus, api } from '../../api';
import { useCallback, useMemo, useState } from 'react';

import { AdminTable } from '../../components/AdminTable';
import { BROWSE_WRITE_OFFS_FOR_USER_ID_AS_ADMIN_QUERY_KEY } from '../../modules/admin';
import type { ColumnDef } from '@tanstack/react-table';
import { ReactComponent as EditSVG } from '../../assets/edit.svg';
import Modal from '../../components/Modal';
import { TypedLink } from '../../router';
import { WriteOffStatusName } from '../../modules/loyalty';

interface WriteOffsHistoryProps {
    userId: number;
}

export const WriteOffsHistory = (props: WriteOffsHistoryProps) => {
    const { userId } = props;

    const [modalData, setModalData] = useState<ReadonlyEditWriteOffsStatusFormRequest | null>(null);

    const queryData = useCallback((pageRequest: PageRequest) => {
        return api.admin.browseWriteOffsForUserIdAsAdmin({
            userId,
            pageRequest,
        });
    }, []);

    const columns = useMemo<ColumnDef<WriteOffResponse>[]>(
        () => [
            {
                accessorKey: 'id',
                header: () => <span>УН</span>,
                cell: (info) => info.getValue(),
            },
            {
                accessorKey: 'date',
                header: () => <span>Дата</span>,
                cell: (info) => {
                    const { date } = info.row.original;
                    return (
                        <div className="flex flex-col gap-2">
                            {date && <p>{new Date(date).toLocaleDateString('ru-RU')}</p>}
                        </div>
                    );
                },
            },
            {
                accessorKey: 'user',
                header: () => <span>Пользователь</span>,
                cell: (info) => {
                    const { user } = info.row.original;
                    return (
                        <div className="flex flex-col items-start gap-2">
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
                    const { article } = info.row.original;
                    return <p className="text-base text-white">{article.name}</p>;
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
                    const { id, date, status, article } = info.row.original;
                    if (status !== WriteOffStatus.Completed && status !== WriteOffStatus.Cancelled) {
                        return (
                            <button
                                className="flex items-center gap-2"
                                onClick={() =>
                                    setModalData({
                                        articleName: article.name,
                                        id,
                                        status,
                                        date: new Date(date).toLocaleDateString('ru-RU'),
                                    })
                                }
                            >
                                <EditSVG className="stroke-primary h-4 w-4" />
                                <span className="text-small text-primary">Изменить</span>
                            </button>
                        );
                    }

                    return null;
                },
            },
        ],
        [setModalData],
    );
    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col items-start gap-4">
                <h1 className="text-h1">Заказы</h1>
            </div>
            <AdminTable
                showSearch={false}
                queryKey={BROWSE_WRITE_OFFS_FOR_USER_ID_AS_ADMIN_QUERY_KEY}
                globalFilterPlaceholder="Поиск по Названию и Описанию"
                columns={columns}
                queryData={queryData}
            />
            <Modal id="EditStatusForm" isOpen={Boolean(modalData)} closeModal={() => setModalData(null)} size="sm">
                <Modal.Body>
                    {!!modalData && (
                        <EditWriteOffsStatusForm
                            queryKey={BROWSE_WRITE_OFFS_FOR_USER_ID_AS_ADMIN_QUERY_KEY}
                            defaultValues={modalData}
                            closeModal={() => setModalData(null)}
                        />
                    )}
                </Modal.Body>
            </Modal>
        </div>
    );
};

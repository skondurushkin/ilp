import { OperationResponse, OperationResponseTypeEnum, PageRequest, api } from '../../api';
import { useCallback, useMemo, useState } from 'react';

import { AdminTable } from '../../components/AdminTable';
import { Button } from '../../components/Button';
import type { ColumnDef } from '@tanstack/react-table';
import { EditBalanceForm } from './EditBalanceForm';
import { GET_WALLET_HISTORY_FOR_USER_ID_QUERY_KEY_FN } from '../../modules/admin';
import Modal from '../../components/Modal';
import { PriceTableCell } from '../../components/PriceTableCell';
import { TypedLink } from '../../router';

interface BalanceHistoryProps {
    userId: number;
}

export const BalanceHistory = (props: BalanceHistoryProps) => {
    const { userId } = props;
    const [modalIsVisible, setModalIsVisible] = useState(false);

    const queryData = useCallback(async (pageRequest: PageRequest) => {
        return api.admin.getWalletHistoryForUserId({
            userId,
            pageRequest,
        });
    }, []);

    const columns = useMemo<ColumnDef<OperationResponse>[]>(
        () => [
            {
                accessorKey: 'id',
                header: () => <span>ИД</span>,
                cell: (info) => info.getValue(),
            },
            {
                accessorKey: 'date',
                header: () => <span>Дата</span>,
                cell: (info) => {
                    const { date } = info.row.original;
                    return date ? <p>{new Date(date).toLocaleDateString('ru-RU')}</p> : null;
                },
            },
            {
                accessorKey: 'name',
                header: () => <span>Действие</span>,
                cell: (info) => {
                    const { id, name, type } = info.row.original;

                    return (
                        <div className="flex flex-col items-start gap-2">
                            <div>
                                <p className="text-base text-white">{name}</p>
                            </div>
                            {type === OperationResponseTypeEnum.Accrual && (
                                <TypedLink to="/admin/products/edit/:productId" params={{ productId: id.toString() }}>
                                    <p className="text-small text-gray underline">Перейти</p>
                                </TypedLink>
                            )}
                        </div>
                    );
                },
            },
            {
                accessorKey: 'amount',
                header: () => <span>Стоимость</span>,
                cell: (info) => {
                    const { amount, type } = info.row.original;
                    return <PriceTableCell price={amount} type={type} />;
                },
            },
        ],
        [],
    );

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col items-start gap-4">
                <h1 className="text-h1">История баланса</h1>
                <Button primary onClick={() => setModalIsVisible(true)}>
                    Начислить вольты
                </Button>
            </div>
            <AdminTable
                showSearch={false}
                queryKey={GET_WALLET_HISTORY_FOR_USER_ID_QUERY_KEY_FN(userId)}
                globalFilterPlaceholder="Поиск по ИД, Названию и Описанию"
                columns={columns}
                queryData={queryData}
            />
            <Modal id="EditBalanceForm" isOpen={modalIsVisible} closeModal={() => setModalIsVisible(false)} size="sm">
                <Modal.Body>
                    {!!modalIsVisible && (
                        <EditBalanceForm userId={userId} closeModal={() => setModalIsVisible(false)} />
                    )}
                </Modal.Body>
            </Modal>
        </div>
    );
};

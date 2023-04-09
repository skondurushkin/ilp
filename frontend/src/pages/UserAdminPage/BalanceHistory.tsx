import { CancelAccrualForm, CancelAccrualFormData } from './CancelAccrualForm';
import { OperationResponse, OperationResponseTypeEnum, PageRequest, api } from '../../api';
import { useCallback, useMemo, useState } from 'react';

import { AdminTable } from '../../components/AdminTable';
import { Button } from '../../components/Button';
import type { ColumnDef } from '@tanstack/react-table';
import { EditBalanceForm } from './EditBalanceForm';
import { GET_WALLET_HISTORY_FOR_USER_ID_QUERY_KEY } from '../../modules/admin';
import Modal from '../../components/Modal';
import { PriceTableCell } from '../../components/PriceTableCell';
import { TypedLink } from '../../router';
import { ReactComponent as XSquareVG } from '../../assets/x-square.svg';

interface BalanceHistoryProps {
    userId: number;
}

export const BalanceHistory = (props: BalanceHistoryProps) => {
    const { userId } = props;
    const [editBalanceModalIsVisible, setEditBalanceModalIsVisible] = useState(false);
    const [cancelAccrualModalData, setCancelAccrualModalData] = useState<CancelAccrualFormData | null>(null);

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
                            {type === OperationResponseTypeEnum.WriteOff && (
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
            {
                accessorKey: 'actions',
                header: () => <span>Действия</span>,
                cell: (info) => {
                    const { id, amount, name, type, date, active } = info.row.original;

                    if (active && type === OperationResponseTypeEnum.Accrual) {
                        return (
                            <button
                                className="flex items-center gap-2"
                                onClick={() =>
                                    setCancelAccrualModalData({
                                        amount,
                                        id,
                                        name,
                                        date: new Date(date).toLocaleDateString('ru-RU'),
                                    })
                                }
                            >
                                <XSquareVG className="fill-error h-4 w-4" />
                                <span className="text-small text-error">Отменить</span>
                            </button>
                        );
                    }

                    return null;
                },
            },
        ],
        [],
    );

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col items-start gap-4">
                <h1 className="text-h1">История баланса</h1>
                <Button primary onClick={() => setEditBalanceModalIsVisible(true)}>
                    Начислить вольты
                </Button>
            </div>
            <AdminTable
                showSearch={false}
                queryKey={GET_WALLET_HISTORY_FOR_USER_ID_QUERY_KEY}
                globalFilterPlaceholder="Поиск по Названию и Описанию"
                columns={columns}
                queryData={queryData}
            />
            <Modal
                id="CancelAccrualForm"
                size="sm"
                isOpen={!!cancelAccrualModalData}
                closeModal={() => setCancelAccrualModalData(null)}
            >
                <Modal.Body>
                    {!!cancelAccrualModalData && (
                        <CancelAccrualForm
                            queryKey={GET_WALLET_HISTORY_FOR_USER_ID_QUERY_KEY}
                            values={cancelAccrualModalData}
                            userId={userId}
                            closeModal={() => setCancelAccrualModalData(null)}
                        />
                    )}
                </Modal.Body>
            </Modal>
            <Modal
                id="EditBalanceForm"
                size="sm"
                isOpen={editBalanceModalIsVisible}
                closeModal={() => setEditBalanceModalIsVisible(false)}
            >
                <Modal.Body>
                    {!!editBalanceModalIsVisible && (
                        <EditBalanceForm
                            userId={userId}
                            queryKey={GET_WALLET_HISTORY_FOR_USER_ID_QUERY_KEY}
                            closeModal={() => setEditBalanceModalIsVisible(false)}
                        />
                    )}
                </Modal.Body>
            </Modal>
        </div>
    );
};

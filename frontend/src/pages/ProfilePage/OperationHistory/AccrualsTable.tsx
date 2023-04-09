import { AccrualResponse, OperationResponseTypeEnum } from '../../../api';
import { ReactElement, useMemo } from 'react';

import type { ColumnDef } from '@tanstack/table-core';
import { HistoryTable } from './HistoryTable';
import { Zaps } from '../../../components/Zaps';
import { useAccrualsHistoryQuery } from '../../../modules/loyalty';

export function AccrualsTable(): ReactElement {
    const columns = useMemo<ColumnDef<AccrualResponse>[]>(
        () => [
            {
                accessorKey: 'date',
                header: 'дата',
                cell: (info) => {
                    const { date } = info.row.original;
                    return <div>{new Date(date).toLocaleDateString('ru-RU')}</div>;
                },
                size: 120,
            },
            {
                accessorKey: 'name',
                header: 'действие',
                cell: (info) => {
                    const { activityName } = info.row.original;
                    return <div>{activityName}</div>;
                },
                minSize: 0,
                size: 0,
            },
            {
                accessorKey: 'amount',
                header: 'сумма действия',
                cell: (info) => {
                    const { amount } = info.row.original;
                    return (
                        <Zaps
                            className="items-baseline font-bold"
                            type={OperationResponseTypeEnum.Accrual}
                            amount={amount}
                        />
                    );
                },
                size: 160,
            },
        ],
        [],
    );

    return <HistoryTable useHistoryQuery={useAccrualsHistoryQuery} columns={columns} noRowsMessage="Нет пополнений" />;
}

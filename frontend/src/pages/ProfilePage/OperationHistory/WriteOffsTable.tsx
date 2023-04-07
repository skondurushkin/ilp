import { ReactElement, useMemo } from 'react';

import { Amount } from './Amount';
import type { ColumnDef } from '@tanstack/table-core';
import { HistoryTable } from './HistoryTable';
import { TypedLink } from '../../../router';
import { WriteOffResponse } from '../../../api';
import { useWriteOffsHistoryQuery } from '../../../modules/loyalty';

export function WriteOffsTable(): ReactElement {
    const columns = useMemo<ColumnDef<WriteOffResponse>[]>(
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
                    const { article } = info.row.original;
                    return (
                        <TypedLink to="/products/:id" params={{ id: article.id.toString() }}>
                            {article.name}
                        </TypedLink>
                    );
                },
                minSize: 0,
                size: 0,
            },
            {
                accessorKey: 'amount',
                header: 'сумма действия',
                cell: (info) => {
                    const { amount } = info.row.original;
                    return <Amount dir="-" amount={amount} />;
                },
                size: 160,
            },
        ],
        [],
    );

    return <HistoryTable useHistoryQuery={useWriteOffsHistoryQuery} columns={columns} />;
}

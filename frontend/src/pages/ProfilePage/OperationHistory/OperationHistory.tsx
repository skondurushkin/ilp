import { AccrualResponse, OperationResponseTypeEnum, TypedPaginatedResult, WriteOffResponse } from '../../../api';
import { HistoryTable, HistoryTableSkeleton } from './HistoryTable';
import { ReactElement, useEffect, useMemo, useRef, useState } from 'react';
import { useAccrualsHistoryQuery, useWriteOffsHistoryQuery } from '../../../modules/loyalty';

import { Box } from '../../../components/Box';
import { Chips } from '../../../components/Chips';
import type { ColumnDef } from '@tanstack/table-core';
import { RouterLink } from '../../../components/RouterLink';
import { UseQueryResult } from 'react-query';
import { Zaps } from '../../../components/Zaps';
import useUpdateEffect from 'react-use/lib/useUpdateEffect';

export interface OperationHistoryProps {
    operationType: OperationResponseTypeEnum;
    onChangeOperationType: (type: OperationResponseTypeEnum) => void;
}

interface OperationDataType {
    [OperationResponseTypeEnum.Accrual]: AccrualResponse;
    [OperationResponseTypeEnum.WriteOff]: WriteOffResponse;
}

interface HistoryData<T extends OperationResponseTypeEnum> {
    operationType: T;
    query: UseQueryResult<TypedPaginatedResult<OperationDataType[T]>>;
}

export function OperationHistory(props: OperationHistoryProps): ReactElement {
    const { operationType, onChangeOperationType } = props;

    // подготавливаем параметры
    const [params, setParams] = useState({ operationType, page: 0 });
    useUpdateEffect(() => setParams({ operationType, page: 0 }), [operationType]);
    const changePage = (p: number) => setParams({ operationType, page: p });

    // подготавливаем query, но пока не запускаем их
    const accrualHistoryQuery = useAccrualsHistoryQuery(params.operationType === 'accrual' ? params.page : 0, {
        enabled: false,
    });
    const writeOffHistoryQuery = useWriteOffsHistoryQuery(params.operationType === 'writeOff' ? params.page : 0, {
        enabled: false,
    });

    // выбираем актуальный query
    const result = useMemo<HistoryData<'accrual'> | HistoryData<'writeOff'>>(
        () =>
            params.operationType === OperationResponseTypeEnum.Accrual
                ? { query: accrualHistoryQuery, operationType: params.operationType }
                : { query: writeOffHistoryQuery, operationType: params.operationType },
        [params.operationType, accrualHistoryQuery, writeOffHistoryQuery],
    );
    // запоминаем предыдущий успешный query. он нам нужен, чтобы его рендерить, пока актуальный грузится
    const prevSuccessResult = usePrevSuccessResult(result);

    // запуск актуального query происходит только тут.
    // почему-то хук вызывается два раза, до того как юзер начинает взаимодействовать с компонентом.
    // я не понял почему
    useEffect(() => {
        result.query.refetch();
    }, [params]);

    let dataElement: ReactElement;
    if (!result.query.isSuccess) {
        if (prevSuccessResult == undefined || !prevSuccessResult.query.isSuccess) {
            dataElement = <HistoryTableSkeleton />;
        } else {
            dataElement = <HistoryView history={prevSuccessResult} isFetching />;
        }
    } else {
        dataElement = <HistoryView history={result} onChangePage={changePage} />;
    }

    return (
        <div>
            <Chips
                options={
                    [
                        { label: 'пополнение', value: 'accrual' },
                        { label: 'списание', value: 'writeOff' },
                    ] as const
                }
                value={operationType}
                onChange={onChangeOperationType}
            />
            <Box className="mt-4 md:mt-8">{dataElement}</Box>
        </div>
    );
}

export interface HistoryViewProps {
    history: HistoryData<'accrual'> | HistoryData<'writeOff'>;
    isFetching?: boolean;
    onChangePage?: (page: number) => void;
}

export function HistoryView(props: HistoryViewProps): ReactElement {
    const { history, ...rest } = props;
    const accrualColumns = useAccrualColumns();
    const writeOffColumns = useWriteOffColumns();

    if (history.operationType === OperationResponseTypeEnum.Accrual) {
        return (
            <HistoryTable {...rest} columns={accrualColumns} data={history.query.data} noDataMessage="Нет пополнений" />
        );
    } else {
        return (
            <HistoryTable {...rest} columns={writeOffColumns} data={history.query.data} noDataMessage="Нет списаний" />
        );
    }
}

function useAccrualColumns() {
    return useMemo<ColumnDef<AccrualResponse>[]>(
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
                    const length = Math.max(
                        ...info.table.getRowModel().rows.map((row) => row.original.amount.toString().length),
                    );
                    return <AmountCell type={OperationResponseTypeEnum.Accrual} amount={amount} length={length} />;
                },
                size: 160,
            },
        ],
        [],
    );
}

function useWriteOffColumns() {
    return useMemo<ColumnDef<WriteOffResponse>[]>(
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
                        <RouterLink to="/products/:id" params={{ id: article.id.toString() }}>
                            {article.name}
                        </RouterLink>
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
                    const length = Math.max(
                        ...info.table.getRowModel().rows.map((row) => row.original.amount.toString().length),
                    );
                    return <AmountCell type={OperationResponseTypeEnum.WriteOff} amount={amount} length={length} />;
                },
                size: 160,
            },
        ],
        [],
    );
}

function usePrevSuccessResult(
    result: HistoryData<'accrual'> | HistoryData<'writeOff'>,
): HistoryData<'accrual'> | HistoryData<'writeOff'> | undefined {
    const ref = useRef<HistoryData<'accrual'> | HistoryData<'writeOff'> | undefined>();
    useEffect(() => {
        if (!result.query.isSuccess) {
            return;
        }
        ref.current = result;
    });
    return ref.current;
}

interface AmountCellProps {
    type: OperationResponseTypeEnum;
    amount: number;
    length: number;
}

function AmountCell(props: AmountCellProps): ReactElement {
    const { type, amount, length } = props;
    return (
        <div className="justify-center sm:flex">
            <Zaps className="items-baseline font-bold" type={type} amount={amount} length={length} />
        </div>
    );
}

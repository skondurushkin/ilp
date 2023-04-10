import { AccrualResponse, OperationResponseTypeEnum, TypedPaginatedResult, WriteOffResponse } from '../../../api';
import { HistoryTable, HistoryTableSkeleton } from './HistoryTable';
import { ReactElement, useEffect, useMemo, useState } from 'react';
import { useAccrualsHistoryQuery, useWriteOffsHistoryQuery } from '../../../modules/loyalty';

import { Box } from '../../../components/Box';
import { Chips } from '../../../components/Chips';
import type { ColumnDef } from '@tanstack/table-core';
import { NoRows } from '../../../components/NoRows';
import { Spinner } from '../../../components/Spinner';
import { TypedLink } from '../../../router';
import { UseQueryResult } from 'react-query';
import { Zaps } from '../../../components/Zaps';
import usePreviousDistinct from 'react-use/lib/usePreviousDistinct';

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
    const [page, setPage] = useState(0);
    const prevOperationType = usePreviousDistinct(operationType);
    const params = useMemo(
        () => ({ operationType, page: operationType === prevOperationType ? page : 0 }),
        [operationType, page, prevOperationType],
    );

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
    //запоминаем предыдущий query (не прям прерыдущий, а предыдущий с отличным operationType)
    // он нам нужен? чтобы его рендерить, пока актуальный грузится
    const prevResult = usePreviousDistinct(result, (prev, next) => !prev || prev.operationType != next.operationType);

    // запуск актуального query происходит только тут
    useEffect(() => {
        result.query.refetch();
    }, [params]);

    let dataElement: ReactElement;
    if (!result.query.isSuccess) {
        if (prevResult == undefined || !prevResult.query.isSuccess) {
            dataElement = <HistoryTableSkeleton />;
        } else {
            dataElement = (
                <div className="relative">
                    <div className="absolute bottom-0 left-0 right-0 top-0 top-0 flex items-center justify-center">
                        <Spinner />
                    </div>
                    <HistoryView history={prevResult} onChangePage={setPage} />
                </div>
            );
        }
    } else {
        dataElement = <HistoryView history={result} onChangePage={setPage} />;
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

export interface HistoryViewProps<T extends OperationResponseTypeEnum> {
    history: HistoryData<T>;
    onChangePage: (page: number) => void;
}

export function HistoryView<T extends OperationResponseTypeEnum>(props: HistoryViewProps<T>): ReactElement {
    const { history, onChangePage } = props;
    const accrualColumns = useAccrualColumns();
    const writeOffColumns = useWriteOffColumns();

    if (history.operationType === OperationResponseTypeEnum.Accrual) {
        const hst = history as HistoryData<'accrual'>;
        if (!hst.query.data || hst.query.data.results.length === 0) {
            return <NoRows>Нет пополнений</NoRows>;
        }
        return <HistoryTable columns={accrualColumns} data={hst.query.data} onChangePage={onChangePage} />;
    } else {
        const hst = history as HistoryData<'writeOff'>;
        if (!hst.query.data || hst.query.data.results.length === 0) {
            return <NoRows>Нет списаний</NoRows>;
        }
        return <HistoryTable columns={writeOffColumns} data={hst.query.data} onChangePage={onChangePage} />;
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
                    return (
                        <Zaps
                            className="items-baseline font-bold"
                            type={OperationResponseTypeEnum.WriteOff}
                            amount={amount}
                        />
                    );
                },
                size: 160,
            },
        ],
        [],
    );
}

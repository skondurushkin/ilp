import { ButtonSkeleton, Skeleton, SkeletonContainer } from '../../components/Skeleton';
import { OperationResponse, OperationResponseTypeEnum, WalletResponse } from '../../api';
import { ReactElement, useMemo, useState } from 'react';
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';

import { Box } from '../../components/Box';
import { Chips } from '../../components/Chips';
import type { ColumnDef } from '@tanstack/react-table';
import { ReactComponent as FrownIcon } from '../../assets/frown.svg';
import { Link } from 'react-router-dom';
import { Table } from '../../components/Table';
import { ReactComponent as TokenIcon } from '../../assets/token.svg';
import { TypedLink } from '../../router';
import { UseQueryResult } from 'react-query';
import { twMerge } from 'tailwind-merge';
import { useUpdateEffect } from 'react-use';
import { useWalletHistoryQuery } from '../../modules/loyalty';

export interface WalletHistoryProps {
    walletQuery: UseQueryResult<WalletResponse>;
}

export function WalletHistory(props: WalletHistoryProps): ReactElement {
    const { walletQuery } = props;

    const [walletHistoryPage, setWalletHistoryPage] = useState(0);
    const [walletHistoryType, setWalletHistoryType] = useState<OperationResponseTypeEnum>('accrual');
    const walletHistoryQuery = useWalletHistoryQuery(walletHistoryType, walletHistoryPage);

    if (!walletQuery.isSuccess) {
        return <WalletHistorySkeleton />;
    }
    if (walletQuery.data.operations.length === 0) {
        return <EmptyWalletHistory />;
    }
    if (!walletHistoryQuery.isSuccess) {
        return <WalletHistorySkeleton />;
    }
    return (
        <NonEmptyWalletHistory
            history={walletHistoryQuery.data.results}
            historyType={walletHistoryType}
            currentPage={walletHistoryQuery.data.page}
            pageCount={walletHistoryQuery.data.total}
            pageSize={walletHistoryQuery.data.pageSize}
            onHistoryTypeChange={(htype) => {
                setWalletHistoryType(htype);
                setWalletHistoryPage(0);
            }}
            onPageChange={(page) => setWalletHistoryPage(page)}
        />
    );
}

interface NonEmptyWalletHistoryProps {
    className?: string;
    history: OperationResponse[];
    historyType: OperationResponseTypeEnum;
    currentPage: number;
    pageCount: number;
    pageSize: number;
    onHistoryTypeChange: (htype: OperationResponseTypeEnum) => void;
    onPageChange: (page: number) => void;
}

function NonEmptyWalletHistory(props: NonEmptyWalletHistoryProps): ReactElement {
    const { className, history, historyType, currentPage, pageCount, pageSize, onPageChange, onHistoryTypeChange } =
        props;

    const columns = useMemo<ColumnDef<OperationResponse>[]>(
        () => [
            {
                accessorKey: 'date',
                header: () => <span>дата</span>,
                cell: (info) => {
                    const { date } = info.row.original;
                    return <div>{new Date(date).toLocaleDateString('ru-RU')}</div>;
                },
            },
            {
                accessorKey: 'name',
                header: () => <span>действие</span>,
                cell: (info) => {
                    const { name } = info.row.original;
                    return <div>{name}</div>;
                },
            },
            {
                accessorKey: 'amount',
                header: () => <span>сумма действия</span>,
                cell: (info) => {
                    const { amount, type } = info.row.original;
                    const dir = type === 'accrual' ? '+' : '-';
                    return (
                        <div className="flex items-center">
                            {dir}
                            {amount}
                            <TokenIcon />
                        </div>
                    );
                },
            },
        ],
        [],
    );

    const [pagination, setPagination] = useState({ pageIndex: currentPage, pageSize });
    useUpdateEffect(() => {
        onPageChange(pagination.pageIndex);
    }, [pagination]);

    const table = useReactTable({
        columns,
        data: history,
        pageCount,
        state: { pagination },
        manualPagination: true,
        getCoreRowModel: getCoreRowModel(),
        onPaginationChange: setPagination,
    });

    return (
        <Box className={className}>
            <Chips
                options={
                    [
                        { label: 'пополнение', value: 'accrual' },
                        { label: 'списание', value: 'writeOff' },
                    ] as const
                }
                value={historyType}
                onChange={onHistoryTypeChange}
            />
            <Table className="mt-4" table={table} />
        </Box>
    );
}

interface EmptyWalletHistoryProps {
    className?: string;
}

function EmptyWalletHistory(props: EmptyWalletHistoryProps): ReactElement {
    const { className } = props;
    return (
        <Box className={twMerge('text-gray items-center px-3 pt-6 sm:pb-11 sm:pt-8 md:pb-9 md:pt-12', className)}>
            <FrownIcon />
            <div className="text-small text-gray mt-3">Пока здесь ничего нет</div>
            <div className="mt-6 flex flex-col md:mt-10">
                <div className="text-center text-2xl md:text-3xl">
                    Учавствуй в <span className="text-white">активностях</span> и добывай{' '}
                    <span className="text-white">вольты</span>
                </div>
                <div className="mt-6 flex flex-col gap-4 sm:flex-row md:px-10">
                    <Link className="btn btn-primary w-full sm:w-auto sm:grow" to="/#activities">
                        Начать добычу вольт
                    </Link>
                    <TypedLink className="w-full sm:w-auto sm:grow" presentation="button" to="/rules">
                        Ознакомиться с правилами
                    </TypedLink>
                </div>
            </div>
        </Box>
    );
}

interface WalletHistorySkeletonProps {
    className?: string;
}

function WalletHistorySkeleton(props: WalletHistorySkeletonProps): ReactElement {
    return (
        <Box {...props}>
            <SkeletonContainer>
                <div className="flex gap-2">
                    <ButtonSkeleton className="w-1/4" />
                    <ButtonSkeleton className="w-1/4" />
                </div>
                <Skeleton className="mt-4 h-4 w-1/5" />
                <Skeleton className="mt-1 h-4 w-1/4" />
                <Skeleton className="mt-1 h-4 w-1/4" />
                <Skeleton className="mt-1 h-4 w-full" />
                <Skeleton className="mt-1 h-4 w-1/4" />
                <Skeleton className="mt-1 h-4 w-1/5" />
                <Skeleton className="mt-4 h-8 w-4/5 self-center" />
            </SkeletonContainer>
        </Box>
    );
}

import { ReactElement, ReactNode, useState } from 'react';
import { Skeleton, SkeletonContainer } from '../../../components/Skeleton';

import { Box } from '../../../components/Box';
import type { ColumnDef } from '@tanstack/table-core';
import { NoRows } from '../../../components/NoRows';
import { Table } from '../../../components/Table';
import { TypedPaginatedResult } from '../../../api';
import { UseQueryResult } from 'react-query';
import { getCoreRowModel } from '@tanstack/table-core';
import { useReactTable } from '@tanstack/react-table';
import useUpdateEffect from 'react-use/lib/useUpdateEffect';

export interface HistoryTableProps<T> {
    useHistoryQuery: (page: number) => UseQueryResult<TypedPaginatedResult<T>>;
    columns: ColumnDef<T>[];
    noRowsMessage?: ReactNode;
}

export function HistoryTable<T>(props: HistoryTableProps<T>): ReactElement {
    const { useHistoryQuery, columns, noRowsMessage } = props;

    const [page, setPage] = useState(0);
    const historyQuery = useHistoryQuery(page);

    if (!historyQuery.isSuccess) {
        return <TableSkeleton />;
    }

    if (historyQuery.data.results.length === 0) {
        return noRowsMessage != undefined ? <NoRows>{noRowsMessage}</NoRows> : <></>;
    }

    return <HistoryTableView columns={columns} data={historyQuery.data} onChangePage={setPage} />;
}

interface HistoryTableViewProps<T> {
    data: TypedPaginatedResult<T>;
    columns: ColumnDef<T>[];
    onChangePage: (page: number) => void;
}

function HistoryTableView<T>(props: HistoryTableViewProps<T>): ReactElement {
    const { data, columns, onChangePage } = props;

    const { results: history, page: currentPage, total: pageCount, pageSize } = data;
    const [pagination, setPagination] = useState({ pageIndex: currentPage, pageSize });

    useUpdateEffect(() => {
        onChangePage(pagination.pageIndex);
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

    return <Table fixed table={table} />;
}

function TableSkeleton(): ReactElement {
    return (
        <Box>
            <SkeletonContainer>
                <TableSkeletonBody />
            </SkeletonContainer>
        </Box>
    );
}

export function TableSkeletonBody(): ReactElement {
    return (
        <>
            <Skeleton className="h-4 w-1/5" />
            <Skeleton className="mt-1 h-4 w-1/4" />
            <Skeleton className="mt-1 h-4 w-1/4" />
            <Skeleton className="mt-1 h-4 w-full" />
            <Skeleton className="mt-1 h-4 w-1/4" />
            <Skeleton className="mt-1 h-4 w-1/5" />
        </>
    );
}

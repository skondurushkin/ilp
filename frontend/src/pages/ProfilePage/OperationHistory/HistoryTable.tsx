import { ReactElement, useState } from 'react';
import { Skeleton, SkeletonContainer } from '../../../components/Skeleton';

import { Box } from '../../../components/Box';
import type { ColumnDef } from '@tanstack/table-core';
import { Table } from '../../../components/Table';
import { TypedPaginatedResult } from '../../../api';
import { getCoreRowModel } from '@tanstack/table-core';
import { useReactTable } from '@tanstack/react-table';
import useUpdateEffect from 'react-use/lib/useUpdateEffect';

export interface HistoryTableProps<T> {
    columns: ColumnDef<T>[];
    data: TypedPaginatedResult<T>;
    onChangePage: (page: number) => void;
}

export function HistoryTable<T>(props: HistoryTableProps<T>): ReactElement {
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

export function HistoryTableSkeleton(): ReactElement {
    return (
        <Box>
            <SkeletonContainer>
                <Skeleton className="h-4 w-1/5" />
                <Skeleton className="mt-1 h-4 w-1/4" />
                <Skeleton className="mt-1 h-4 w-1/4" />
                <Skeleton className="mt-1 h-4 w-full" />
                <Skeleton className="mt-1 h-4 w-1/4" />
                <Skeleton className="mt-1 h-4 w-1/5" />
            </SkeletonContainer>
        </Box>
    );
}

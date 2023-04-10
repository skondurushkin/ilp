import type { ColumnDef, HeaderContext, RowData } from '@tanstack/table-core';
import { ReactElement, useState } from 'react';
import { Skeleton, SkeletonContainer } from '../../../components/Skeleton';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Table, TableProps } from '../../../components/Table';
import { flexRender, useReactTable } from '@tanstack/react-table';

import { Box } from '../../../components/Box';
import { DataNotFound } from '../../../components/DataNotFound';
import { SimpleTablePagination } from '../../../components/TablePagination';
import { Spinner } from '../../../components/Spinner';
import { TypedPaginatedResult } from '../../../api';
import { colors } from '../../../../colors';
import { getCoreRowModel } from '@tanstack/table-core';
import { useIsXsScreen } from '../../../components/useBreakpoint';
import useUpdateEffect from 'react-use/lib/useUpdateEffect';

export interface HistoryTableProps<T> {
    columns: ColumnDef<T>[];
    data?: TypedPaginatedResult<T>;
    isFetching?: boolean;
    noDataMessage?: string;
    onChangePage?: (page: number) => void;
}

export function HistoryTable<T>(props: HistoryTableProps<T>): ReactElement {
    const { data, columns, isFetching, noDataMessage, onChangePage } = props;

    const isXsScreen = useIsXsScreen();

    const rows = data ? data.results : [];
    const currentPage = data ? data.page : 0;
    const pageCount = data ? data.total : 0;
    const pageSize = data ? data.pageSize : 0;

    const [pagination, setPagination] = useState({ pageIndex: currentPage, pageSize });

    useUpdateEffect(() => {
        onChangePage && onChangePage(pagination.pageIndex);
    }, [pagination, onChangePage]);

    const table = useReactTable({
        columns,
        data: rows,
        pageCount,
        state: { pagination },
        manualPagination: true,
        getCoreRowModel: getCoreRowModel(),
        onPaginationChange: setPagination,
    });

    let tableEl: ReactElement;
    if (isXsScreen) {
        tableEl = <HistoryCards table={table} isFetching={isFetching} noDataMessage={noDataMessage} />;
    } else {
        tableEl = <Table fixed table={table} isFetching={isFetching} noDataMessage={noDataMessage} />;
    }

    return (
        <>
            {tableEl}
            {table.getPageCount() > 1 && <SimpleTablePagination className="mx-auto mt-6 md:mt-8" table={table} />}
        </>
    );
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

function HistoryCards<TData extends RowData>(props: TableProps<TData>): ReactElement {
    const { table, noDataMessage, isFetching } = props;

    if (table.getPageCount() === 0) {
        return <DataNotFound message={noDataMessage} />;
    }
    return (
        <div className="relative">
            {isFetching && (
                <div className="absolute-center">
                    <Spinner color={colors.white} />
                </div>
            )}
            <Swiper cssMode slidesPerView={1} spaceBetween={16}>
                {table.getRowModel().rows.map((row) => (
                    <SwiperSlide key={row.id} className="space-y-2">
                        {row.getVisibleCells().map((cell) => (
                            <div key={cell.id} className="space-y-1">
                                <div className="text-gray text">
                                    {flexRender(cell.column.columnDef.header, {
                                        table,
                                        column: cell.column,
                                    } as HeaderContext<TData, unknown>)}
                                </div>
                                <div className="text text-white">
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </div>
                            </div>
                        ))}
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

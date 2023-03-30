import type {
    ColumnDef,
    PaginationState,
    RowData,
    SortingState,
    SortingTableState,
    Updater,
} from '@tanstack/react-table';
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useCallback, useMemo, useState } from 'react';

import { DebouncedInput } from './DebouncedInput';
import { PaginatedResult } from '../api';
import { useQuery } from 'react-query';

export type AdaptiveColumnDef<TData extends RowData, TValue = unknown> = {
    adaptiveHeader: string;
} & ColumnDef<TData, TValue>;

const DEFAULT_PAGINATION_STATE = { pageIndex: 0, pageSize: 10 };

export const AdminTable = <TData extends RowData>({ columns, fetchData }: AdminTableProps<TData>) => {
    const [globalFilter, setGlobalFilter] = useState('');
    const [sorting, setSorting] = useState<SortingState>([]);

    const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>(DEFAULT_PAGINATION_STATE);

    const handleGlobalFilter = useCallback((query: string) => {
        setGlobalFilter(query);
        setPagination(DEFAULT_PAGINATION_STATE);
    }, []);

    const handleSorting = useCallback((newSorting: Updater<SortingState>) => {
        setSorting(newSorting);
        setPagination(DEFAULT_PAGINATION_STATE);
    }, []);

    const fetchDataOptions = {
        pageIndex,
        pageSize,
        globalFilter,
        sortBy: sorting.map((s) => ({
            name: s.id,
            order: s.desc ? 'DESC' : 'ASC',
        })),
    };

    const dataQuery = useQuery(['data', fetchDataOptions], () => fetchData(fetchDataOptions), {
        keepPreviousData: true,
        refetchOnWindowFocus: false,
    });

    const defaultData = useMemo(() => [], []);

    const pagination = useMemo(
        () => ({
            pageIndex,
            pageSize,
        }),
        [pageIndex, pageSize],
    );

    const table = useReactTable({
        columns,
        data: dataQuery.data?.results ?? defaultData,
        pageCount: dataQuery.data?.pageCount ?? -1,
        state: {
            pagination,
            globalFilter,
            sorting,
        },
        manualPagination: true,
        manualFiltering: true,
        manualSorting: true,
        enableGlobalFilter: true,
        enableMultiSort: true,
        getCoreRowModel: getCoreRowModel(),
        onPaginationChange: setPagination,
        onGlobalFilterChange: handleGlobalFilter,
        onSortingChange: handleSorting,
    });

    return (
        <div className="block max-w-full overflow-y-hidden overflow-x-scroll">
            <div className="h-2" />
            <DebouncedInput
                value={globalFilter ?? ''}
                onChange={(value) => handleGlobalFilter(String(value))}
                className="font-lg border-block border p-2 shadow"
                placeholder="Search all columns..."
            />
            <table className="w-full">
                <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <th key={header.id} colSpan={header.colSpan}>
                                        <button
                                            disabled={!header.column.getCanSort()}
                                            onClick={header.column.getToggleSortingHandler()}
                                        >
                                            {header.isPlaceholder ? null : (
                                                <div>
                                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                                </div>
                                            )}
                                            {{
                                                asc: ' 🔼',
                                                desc: ' 🔽',
                                            }[header.column.getIsSorted() as string] ?? null}
                                        </button>
                                    </th>
                                );
                            })}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map((row) => {
                        return (
                            <tr key={row.id}>
                                {row.getVisibleCells().map((cell, index) => {
                                    return (
                                        <td data-label={columns[index].adaptiveHeader?.toString()} key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <div className="h-2" />
            <div className="flex flex-col items-center justify-center gap-2">
                <div className="flex gap-2">
                    <button
                        className="rounded border p-1"
                        onClick={() => table.setPageIndex(0)}
                        disabled={!table.getCanPreviousPage()}
                    >
                        {'<<'}
                    </button>
                    <button
                        className="rounded border p-1"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        {'<'}
                    </button>
                    <button
                        className="rounded border p-1"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        {'>'}
                    </button>
                    <button
                        className="rounded border p-1"
                        onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                        disabled={!table.getCanNextPage()}
                    >
                        {'>>'}
                    </button>
                </div>
                <div className="flex gap-2">
                    <span className="flex items-center gap-1">
                        <div>Page</div>
                        <strong>
                            {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                        </strong>
                    </span>
                    <span className="flex items-center gap-1">
                        | Go to page:
                        <input
                            type="number"
                            defaultValue={table.getState().pagination.pageIndex + 1}
                            onChange={(e) => {
                                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                                table.setPageIndex(page);
                            }}
                            className="w-16 rounded border p-1"
                        />
                    </span>
                    <select
                        value={table.getState().pagination.pageSize}
                        onChange={(e) => {
                            table.setPageSize(Number(e.target.value));
                        }}
                    >
                        {[10, 20, 30, 40, 50].map((pageSize) => (
                            <option key={pageSize} value={pageSize}>
                                Show {pageSize}
                            </option>
                        ))}
                    </select>
                </div>
                {dataQuery.isFetching ? 'Loading...' : null}
            </div>
            <div>{table.getRowModel().rows.length} Rows</div>
            <pre>{JSON.stringify(fetchDataOptions, null, 2)}</pre>
        </div>
    );
};

interface AdminTableProps<TData extends RowData> {
    columns: AdaptiveColumnDef<TData, unknown>[];
    fetchData: ({
        pageIndex,
        pageSize,
        globalFilter,
    }: {
        pageIndex: number;
        pageSize: number;
        globalFilter: string;
    }) => Promise<
        {
            results: TData[];
        } & Pick<PaginatedResult, 'pageCount'>
    >;
}

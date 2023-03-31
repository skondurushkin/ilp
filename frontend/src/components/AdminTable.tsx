import type { ColumnDef, PaginationState, RowData, SortingState, Updater } from '@tanstack/react-table';
import { PageRequest, PageRequestConfigSortInnerSortTypeEnum, PaginatedResult } from '../api';
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useCallback, useMemo, useState } from 'react';

import { DebouncedInput } from './DebouncedInput';
import { ReactComponent as SearchSVG } from '../assets/search.svg';
import { useQuery } from 'react-query';

const DEFAULT_PAGINATION_STATE = { pageIndex: 0, pageSize: 10 };

export const AdminTable = <TData extends RowData>({
    columns,
    queryKey,
    queryData,
    globalFilterPlaceholder,
}: AdminTableProps<TData>) => {
    const [globalFilter, setGlobalFilter] = useState('');
    const [sorting, setSorting] = useState<SortingState>([]);

    const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>(DEFAULT_PAGINATION_STATE);

    const defaultData = useMemo(() => [], []);

    const pagination = useMemo(
        () => ({
            pageIndex,
            pageSize,
        }),
        [pageIndex, pageSize],
    );

    const queryDataOptions: PageRequest = {
        page: pageIndex,
        pageSize,
        config: {
            globalFilter: globalFilter?.length > 0 ? globalFilter : undefined,
            sort: sorting.map((s) => ({
                colName: s.id,
                sortType: s.desc
                    ? PageRequestConfigSortInnerSortTypeEnum.Desc
                    : PageRequestConfigSortInnerSortTypeEnum.Asc,
            })),
        },
    };

    const dataQuery = useQuery(
        [Array.isArray(queryKey) ? [...queryKey] : queryKey, queryDataOptions],
        () => queryData(queryDataOptions),
        {
            keepPreviousData: true,
            refetchOnWindowFocus: false,
        },
    );

    const handleGlobalFilter = useCallback((query: string) => {
        setGlobalFilter(query);
        setPagination(DEFAULT_PAGINATION_STATE);
    }, []);

    const handleSorting = useCallback((newSorting: Updater<SortingState>) => {
        setSorting(newSorting);
        setPagination(DEFAULT_PAGINATION_STATE);
    }, []);

    const table = useReactTable({
        columns,
        data: dataQuery.data?.results ?? defaultData,
        pageCount: dataQuery.data?.total ?? -1,
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
        <div className=" flex w-full flex-col gap-6 overflow-y-hidden overflow-x-scroll">
            <div className="relative mt-2 inline-flex text-left">
                <DebouncedInput
                    value={globalFilter ?? ''}
                    onChange={(value) => handleGlobalFilter(String(value))}
                    className="input w-full pl-12"
                    placeholder={globalFilterPlaceholder ?? 'Поиск по всем колонкам'}
                />
                <SearchSVG className="absolute bottom-3 left-3" />
            </div>
            <div className="flex flex-col gap-6 bg-black p-6">
                <div className="relative overflow-y-hidden overflow-x-scroll">
                    {dataQuery.isFetching && (
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform bg-black p-4 text-white">
                            Загрузка ...
                        </div>
                    )}
                    <table className="w-full overflow-y-hidden overflow-x-scroll">
                        <thead>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <tr key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => (
                                        <th key={header.id} colSpan={header.colSpan} className="py-2 px-3 text-left">
                                            <button
                                                disabled={!header.column.getCanSort()}
                                                onClick={header.column.getToggleSortingHandler()}
                                            >
                                                {header.isPlaceholder ? null : (
                                                    <>
                                                        <div className="text-base font-bold text-gray">
                                                            {flexRender(
                                                                header.column.columnDef.header,
                                                                header.getContext(),
                                                            )}
                                                        </div>
                                                        {{
                                                            asc: ' 🔼',
                                                            desc: ' 🔽',
                                                        }[header.column.getIsSorted() as string] ?? null}
                                                    </>
                                                )}
                                            </button>
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody>
                            {table.getRowModel().rows.map((row) => (
                                <tr key={row.id}>
                                    {row.getVisibleCells().map((cell) => (
                                        <td key={cell.id} className="py-2 px-3">
                                            <div className="text-base text-white">
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </div>
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="flex flex-col items-center justify-between gap-2 xl:flex-row">
                    <div className="flex gap-2">
                        <button
                            className="btn"
                            onClick={() => table.setPageIndex(0)}
                            disabled={!table.getCanPreviousPage()}
                        >
                            {'<<'}
                        </button>
                        <button
                            className="btn"
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                        >
                            {'<'}
                        </button>
                        <span className="btn text-pr flex items-center gap-1">
                            <div className="hidden md:block">Страница</div>
                            <strong>
                                {table.getState().pagination.pageIndex + 1} из {table.getPageCount()}
                            </strong>
                        </span>
                        <button className="btn" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                            {'>'}
                        </button>
                        <button
                            className="btn"
                            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                            disabled={!table.getCanNextPage()}
                        >
                            {'>>'}
                        </button>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-2">
                            <span className="hidden md:block">Перейти на </span>
                            <input
                                type="number"
                                className="input h-10 w-16"
                                defaultValue={table.getState().pagination.pageIndex + 1}
                                onChange={(e) => {
                                    const page = e.target.value ? Number(e.target.value) - 1 : 0;
                                    table.setPageIndex(page);
                                }}
                            />
                        </div>
                        <select
                            className="input h-10"
                            value={table.getState().pagination.pageSize}
                            onChange={(e) => {
                                table.setPageSize(Number(e.target.value));
                            }}
                        >
                            {[10, 20, 30, 40, 50].map((pageSize) => (
                                <option key={pageSize} value={pageSize}>
                                    Показать по {pageSize}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
};

interface AdminTableProps<TData extends RowData> {
    globalFilterPlaceholder?: string;
    columns: ColumnDef<TData, unknown>[];
    queryKey: string | string[];
    queryData: (body: PageRequest) => Promise<
        {
            results: TData[];
        } & Pick<PaginatedResult, 'total'>
    >;
}

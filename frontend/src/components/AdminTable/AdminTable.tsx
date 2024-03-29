import type { ColumnDef, PaginationState, RowData, SortingState, Updater } from '@tanstack/react-table';
import { PageRequest, PageRequestConfigSortInnerSortTypeEnum, PaginatedResult } from '../../api';
import { UseAdminTableSearchParams, useAdminTableSearch } from './useAdminTableSearch';
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useCallback, useMemo, useState } from 'react';

import { SearchInput } from '../SearchInput';
import { Table } from '../Table';
import { TablePagination } from '../TablePagination';
import { useQuery } from 'react-query';

const DEFAULT_PAGINATION_STATE = { pageIndex: 0, pageSize: 10 };

export const AdminTable = <TData extends RowData>({
    queryStorageName,
    storage = 'state',
    showSearch = true,
    columns,
    queryKey,
    initialSort = [],
    queryData,
    globalFilterPlaceholder,
}: AdminTableProps<TData>) => {
    const { globalFilter, setGlobalFilter } = useAdminTableSearch({
        queryStorageName: queryStorageName ?? queryKey,
        storage,
    });
    const [sorting, setSorting] = useState<SortingState>(initialSort);

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
        pageCount: dataQuery.data?.total ?? 0,
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
        <div className="flex w-full flex-col gap-6 overflow-x-auto overflow-y-hidden">
            {showSearch && (
                <SearchInput
                    value={globalFilter ?? ''}
                    placeholder={globalFilterPlaceholder ?? 'Поиск по всем колонкам'}
                    onChange={(value) => handleGlobalFilter(String(value))}
                />
            )}
            <div className="flex flex-col gap-6 bg-black p-6">
                <Table table={table} isFetching={dataQuery.isFetching} />
                {table.getPageCount() > 0 && <TablePagination table={table} />}
            </div>
        </div>
    );
};

interface AdminTableProps<TData extends RowData> extends Partial<UseAdminTableSearchParams> {
    showSearch?: boolean;
    globalFilterPlaceholder?: string;
    initialSort?: SortingState;
    columns: ColumnDef<TData, unknown>[];
    queryKey: string;
    queryData: (body: PageRequest) => Promise<
        {
            results: TData[];
        } & Pick<PaginatedResult, 'total'>
    >;
}

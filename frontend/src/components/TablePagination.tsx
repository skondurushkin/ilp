import { Button, ButtonProps } from './Button';
import type { Table as ITable, RowData } from '@tanstack/react-table';

import { ReactComponent as ChevronLeftSVG } from '../assets/chevron-left.svg';
import { ReactComponent as ChevronRightSVG } from '../assets/chevron-right.svg';
import { ReactElement } from 'react';
import { twMerge } from 'tailwind-merge';

interface TablePaginationProps<TData extends RowData> {
    className?: string;
    table: ITable<TData>;
}

export const TablePagination = <TData extends RowData>(props: TablePaginationProps<TData>) => {
    const { className, table } = props;

    return (
        <div className={twMerge('flex flex-col items-center justify-between gap-2 md:flex-row', className)}>
            <span className="text-pr hidden items-center gap-1 border-none px-3 py-2 text-white sm:flex">
                <span className="text-base text-white">Страница</span>
                <strong>
                    {table.getState().pagination.pageIndex + 1} из {table.getPageCount()}
                </strong>
            </span>
            <div className="flex flex-col gap-2 sm:flex-row">
                <div className="flex items-center justify-between gap-2">
                    <span className="text-white">Перейти к</span>
                    <input
                        type="number"
                        className="input form-input border-gray h-10 w-16 border bg-black text-white"
                        value={table.getState().pagination.pageIndex + 1}
                        onChange={(e) => {
                            const page = e.target.value ? Number(e.target.value) - 1 : 0;
                            table.setPageIndex(page);
                        }}
                    />
                </div>
                <div className="flex gap-2">
                    <FirstButton table={table} />
                    <PrevButton table={table} />
                    <NextButton table={table} />
                    <LastButton table={table} />
                </div>
                <select
                    className="select form-select border-gray h-10 border bg-black text-white"
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
    );
};

export const SimpleTablePagination = <TData extends RowData>(props: TablePaginationProps<TData>) => {
    const { className, table } = props;

    return (
        <div className={twMerge('flex items-center gap-2', className)}>
            <FirstButton table={table} />
            <PrevButton table={table} />
            <div className="text-pr flex items-center gap-1 border-none px-3 py-2 font-bold text-white">
                {table.getState().pagination.pageIndex + 1} из {table.getPageCount()}
            </div>
            <NextButton table={table} />
            <LastButton table={table} />
        </div>
    );
};

type PagingButtonProps<TData extends RowData> = ButtonProps & { table: ITable<TData> };

function FirstButton<TData extends RowData>(props: PagingButtonProps<TData>): ReactElement {
    const { table, ...rest } = props;
    return (
        <PagingButton {...rest} onClick={() => table.setPageIndex(0)} disabled={!table.getCanPreviousPage()}>
            <ChevronLeftSVG className="h-4 w-4 stroke-white" />
            <ChevronLeftSVG className="-ml-2 h-4 w-4 stroke-white" />
        </PagingButton>
    );
}

function PrevButton<TData extends RowData>(props: PagingButtonProps<TData>): ReactElement {
    const { table, ...rest } = props;
    return (
        <PagingButton {...rest} onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
            <ChevronLeftSVG className="h-4 w-4 stroke-white" />
        </PagingButton>
    );
}

function NextButton<TData extends RowData>(props: PagingButtonProps<TData>): ReactElement {
    const { table, ...rest } = props;
    return (
        <PagingButton {...rest} onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            <ChevronRightSVG className="h-4 w-4 stroke-white" />
        </PagingButton>
    );
}

function LastButton<TData extends RowData>(props: PagingButtonProps<TData>): ReactElement {
    const { table, ...rest } = props;
    return (
        <PagingButton
            {...rest}
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
        >
            <ChevronRightSVG className="-mr-2 h-4 w-4 stroke-white" />
            <ChevronRightSVG className="h-4 w-4 stroke-white" />
        </PagingButton>
    );
}

const PagingButton = (props: ButtonProps) => {
    return <Button black className="border-gray disabled:bg-gray-dark flex items-center px-3 py-2" {...props} />;
};

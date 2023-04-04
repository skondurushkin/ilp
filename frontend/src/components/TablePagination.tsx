import type { Table as ITable, RowData } from '@tanstack/react-table';

import { ReactComponent as ChevronLeftSVG } from '../assets/chevron-left.svg';
import { ReactComponent as ChevronRightSVG } from '../assets/chevron-right.svg';

interface TablePaginationProps<TData extends RowData> {
    table: ITable<TData>;
    className?: string;
}

export const TablePagination = <TData extends RowData>({ table }: TablePaginationProps<TData>) => {
    return (
        <div className="flex flex-col items-center justify-between gap-2 md:flex-row">
            <span className="btn-black text-pr flex items-center gap-1 border-none">
                <div className="text-base text-white">Страница</div>
                <strong>
                    {table.getState().pagination.pageIndex + 1} из {table.getPageCount()}
                </strong>
            </span>
            <div className="flex flex-col gap-2 sm:flex-row">
                <div className="flex items-center justify-between gap-2">
                    <span className="text-white">Перейти к</span>
                    <input
                        type="number"
                        className="input form-input h-10 w-16 border border-gray bg-black text-white"
                        value={table.getState().pagination.pageIndex + 1}
                        onChange={(e) => {
                            const page = e.target.value ? Number(e.target.value) - 1 : 0;
                            table.setPageIndex(page);
                        }}
                    />
                </div>
                <div className="flex gap-2">
                    <button
                        className="btn-black flex items-center"
                        onClick={() => table.setPageIndex(0)}
                        disabled={!table.getCanPreviousPage()}
                    >
                        <ChevronLeftSVG className="h-4 w-4 stroke-white" />
                        <ChevronLeftSVG className="-ml-2 h-4 w-4 stroke-white" />
                    </button>
                    <button
                        className="btn-black"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        <ChevronLeftSVG className="h-4 w-4 stroke-white" />
                    </button>
                    <button className="btn-black" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                        <ChevronRightSVG className="h-4 w-4 stroke-white" />
                    </button>
                    <button
                        className="btn-black flex items-center"
                        onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                        disabled={!table.getCanNextPage()}
                    >
                        <ChevronRightSVG className="-mr-2 h-4 w-4 stroke-white" />
                        <ChevronRightSVG className="h-4 w-4 stroke-white" />
                    </button>
                </div>
                <select
                    className="select form-select h-10 border border-gray bg-black text-white"
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

import type { Table as ITable, RowData } from '@tanstack/react-table';

interface TablePaginationProps<TData extends RowData> {
    table: ITable<TData>;
    className?: string;
}

export const TablePagination = <TData extends RowData>({ table }: TablePaginationProps<TData>) => {
    return (
        <div className="flex flex-col items-center justify-between gap-2 xl:flex-row">
            <div className="flex gap-2">
                <button
                    className="btn-black"
                    onClick={() => table.setPageIndex(0)}
                    disabled={!table.getCanPreviousPage()}
                >
                    {'<<'}
                </button>
                <button
                    className="btn-black"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    {'<'}
                </button>
                <span className="btn-black text-pr flex items-center gap-1">
                    <div className="hidden md:block">Страница</div>
                    <strong>
                        {table.getState().pagination.pageIndex + 1} из {table.getPageCount()}
                    </strong>
                </span>
                <button className="btn-black" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                    {'>'}
                </button>
                <button
                    className="btn-black"
                    onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                    disabled={!table.getCanNextPage()}
                >
                    {'>>'}
                </button>
            </div>

            <div className="flex items-center gap-2">
                <div className="flex items-center gap-2">
                    <span className="text-white">Перейти к</span>
                    <input
                        type="number"
                        className="input form-input h-10 w-16 border border-gray bg-black text-white"
                        defaultValue={table.getState().pagination.pageIndex + 1}
                        onChange={(e) => {
                            const page = e.target.value ? Number(e.target.value) - 1 : 0;
                            table.setPageIndex(page);
                        }}
                    />
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

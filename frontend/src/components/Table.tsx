import type { Table as ITable, RowData } from '@tanstack/react-table';

import { flexRender } from '@tanstack/react-table';
import { twMerge } from 'tailwind-merge';

interface TableProps<TData extends RowData> {
    table: ITable<TData>;
    isFetching?: boolean;
    className?: string;
}

export const Table = <TData extends RowData>(props: TableProps<TData>) => {
    const { table, isFetching, className } = props;

    return (
        <div className="relative overflow-y-hidden overflow-x-scroll">
            {isFetching && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform bg-primary p-4 text-black">
                    Загрузка ...
                </div>
            )}
            <table
                className={twMerge('w-full overflow-y-hidden overflow-x-scroll', isFetching && 'opacity-50', className)}
            >
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
                                                    {flexRender(header.column.columnDef.header, header.getContext())}
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
                                <td key={cell.id} className="py-2 px-4">
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
    );
};

import type { Table as ITable, RowData } from '@tanstack/react-table';

import { CSSProperties } from 'react';
import { ReactComponent as ChevronLeftSVG } from '../assets/chevron-left.svg';
import { DataNotFound } from './DataNotFound';
import { Spinner } from './Spinner';
import { colors } from '../../colors';
import { flexRender } from '@tanstack/react-table';
import { twMerge } from 'tailwind-merge';

interface TableProps<TData extends RowData> {
    table: ITable<TData>;
    isFetching?: boolean;
    className?: string;
    fixed?: boolean;
}

export const Table = <TData extends RowData>(props: TableProps<TData>) => {
    const { table, isFetching, className, fixed } = props;

    return (
        <div className="relative overflow-y-hidden">
            {isFetching && (
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
                    <Spinner color={colors.white} />
                </div>
            )}
            <table className={twMerge('w-full', isFetching && 'opacity-50', fixed && 'table-fixed', className)}>
                <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th
                                    key={header.id}
                                    colSpan={header.colSpan}
                                    className="px-3 py-2 text-left"
                                    style={cellStyle(header, fixed)}
                                >
                                    <button
                                        disabled={!header.column.getCanSort()}
                                        onClick={header.column.getToggleSortingHandler()}
                                    >
                                        {header.isPlaceholder ? null : (
                                            <>
                                                <div className="text-gray text-base font-bold">
                                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                                </div>
                                                {{
                                                    asc: (
                                                        <ChevronLeftSVG className="stroke-primary h-4 w-4 rotate-90 transform" />
                                                    ),
                                                    desc: (
                                                        <ChevronLeftSVG className="stroke-primary h-4 w-4 -rotate-90 transform" />
                                                    ),
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
                    {table.getPageCount() === 0 ? (
                        <tr>
                            <td colSpan={table.getAllColumns().length}>
                                <DataNotFound />
                            </td>
                        </tr>
                    ) : (
                        table.getRowModel().rows.map((row) => (
                            <tr key={row.id}>
                                {row.getVisibleCells().map((cell) => (
                                    <td key={cell.id} className="px-3 py-2 text-left">
                                        <div className="text-base text-white">
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </div>
                                    </td>
                                ))}
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

function cellStyle(column: { getSize: () => number }, fixed: boolean | undefined): CSSProperties | undefined {
    if (!fixed) {
        return undefined;
    }
    const size = column.getSize();
    return size > 0 ? { width: size } : undefined;
}

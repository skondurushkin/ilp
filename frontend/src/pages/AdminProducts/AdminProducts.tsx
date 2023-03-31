import makeData, { Person } from './makeData';

import { AdminTable } from '../../components/AdminTable';
import type { ColumnDef } from '@tanstack/react-table';
import { PageRequest } from '../../api';
import { useMemo } from 'react';

const data = makeData(100);

export async function queryData(options: PageRequest) {
    // Simulate some network latency
    await new Promise((r) => setTimeout(r, 500));

    console.log('options', JSON.stringify(options, null, 2));

    return {
        results: data.slice(options.page * options.pageSize, (options.page + 1) * options.pageSize),
        total: Math.ceil(data.length / options.pageSize),
    };
}

export const AdminProducts = () => {
    const columns = useMemo<ColumnDef<Person>[]>(
        () => [
            {
                accessorKey: 'firstName',
                cell: (info) => info.getValue(),
                header: () => <span>firstName</span>,
                adaptiveHeader: 'firstName',
                enableSorting: true,
            },
            {
                accessorKey: 'lastName',
                cell: (info) => info.getValue(),
                header: () => <span>Last Name</span>,
                adaptiveHeader: 'lastName',
                enableSorting: true,
            },
            {
                accessorKey: 'firstName2',
                cell: (info) => info.getValue(),
                header: () => <span>firstName</span>,
                adaptiveHeader: 'firstName2',
            },
            {
                accessorKey: 'lastName2',
                cell: (info) => info.getValue(),
                header: () => <span>Last Name</span>,
                adaptiveHeader: 'lastName2',
            },
        ],
        [],
    );

    return (
        <div>
            <AdminTable queryKey="test" columns={columns} queryData={queryData} />
        </div>
    );
};

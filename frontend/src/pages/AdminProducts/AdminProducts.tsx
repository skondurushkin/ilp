import { AdaptiveColumnDef, AdminTable } from '../../components/AdminTable';
import makeData, { Person } from './makeData';

import { useMemo } from 'react';

const data = makeData(100);

export async function fetchData(options: { pageIndex: number; pageSize: number; globalFilter: string }) {
    // Simulate some network latency
    await new Promise((r) => setTimeout(r, 500));

    console.log('options', options);

    return {
        results: data.slice(options.pageIndex * options.pageSize, (options.pageIndex + 1) * options.pageSize),
        pageCount: Math.ceil(data.length / options.pageSize),
    };
}

export const AdminProducts = () => {
    const columns = useMemo<AdaptiveColumnDef<Person>[]>(
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
            {
                accessorKey: 'firstName3',
                cell: (info) => info.getValue(),
                header: () => <span>firstName</span>,
                adaptiveHeader: 'firstName3',
            },
            {
                accessorKey: 'lastName3',
                cell: (info) => info.getValue(),
                header: () => <span>Last Name</span>,
                adaptiveHeader: 'lastName3',
            },
            {
                accessorKey: 'firstName4',
                cell: (info) => info.getValue(),
                header: () => <span>firstName</span>,
                adaptiveHeader: 'firstName4',
            },
            {
                accessorKey: 'lastName4',
                cell: (info) => info.getValue(),
                header: () => <span>Last Name</span>,
                adaptiveHeader: 'lastName4',
            },
        ],
        [],
    );

    return (
        <div>
            <h1>AdminProducts</h1>
            <AdminTable columns={columns} fetchData={fetchData} />
        </div>
    );
};

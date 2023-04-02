import { ArticleResponse, PageRequest, api } from '../../api';
import { useCallback, useMemo } from 'react';

import { AdminTable } from '../../components/AdminTable';
import type { ColumnDef } from '@tanstack/react-table';
import { ReactComponent as EditSVG } from '../../assets/edit.svg';
import { Layout } from '../../components/Layout';
import { ReactComponent as TrashSVG } from '../../assets/trash.svg';
import { TypedLink } from '../../router';

export type Columns<DataType extends object = Record<string, unknown>> = readonly ColumnDef<DataType>[];

export const ProductsAdminPage = () => {
    const queryData = useCallback((pageRequest: PageRequest) => {
        return api.article.browseArticles({
            pageRequest,
        });
    }, []);

    const columns = useMemo<ColumnDef<ArticleResponse>[]>(
        () => [
            {
                accessorKey: 'id',
                header: () => <span>ИД</span>,
                cell: (info) => info.getValue(),
            },
            {
                accessorKey: 'name',
                header: () => <span>Наименование</span>,
                cell: (info) => {
                    const { description, name } = info.row.original;
                    return (
                        <div className="flex flex-col gap-2">
                            <p className="text-base text-white">{name}</p>
                            <p className="text-small text-ellipsis text-gray">{description}</p>
                        </div>
                    );
                },
            },
            {
                accessorKey: 'code',
                header: () => <span>Артикул</span>,
                cell: (info) => info.getValue(),
            },
            {
                accessorKey: 'price',
                header: () => <span>Стоимость</span>,
                cell: (info) => info.getValue(),
            },
            {
                accessorKey: 'actions',
                header: () => <span>Действия</span>,
                cell: (info) => {
                    const { id } = info.row.original;

                    return (
                        <div className="flex gap-2">
                            <TypedLink to="/admin/products/edit/:productId" params={{ productId: id.toString() }}>
                                <button className="btn">
                                    <EditSVG />
                                </button>
                            </TypedLink>

                            <button className="btn">
                                <TrashSVG />
                            </button>
                        </div>
                    );
                },
            },
        ],
        [],
    );

    return (
        <Layout>
            <div className="flex flex-col gap-6">
                <h1 className="text-h1">Товары</h1>
                <div>
                    <TypedLink to="/admin/products/create">
                        <button className="btn btn-primary">Добавить товар</button>
                    </TypedLink>
                </div>
                <AdminTable
                    globalFilterPlaceholder="Поиск по Наименованию, Артиклу и Стоимости"
                    columns={columns}
                    queryData={queryData}
                    queryKey="browseArticles"
                />
            </div>
        </Layout>
    );
};

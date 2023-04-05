import { ArticleResponse, PageRequest, api } from '../../api';
import { useCallback, useMemo } from 'react';
import { useMutation, useQueryClient } from 'react-query';

import { AdminTable } from '../../components/AdminTable';
import type { ColumnDef } from '@tanstack/react-table';
import { ReactComponent as EditSVG } from '../../assets/edit.svg';
import { ReactComponent as TrashSVG } from '../../assets/trash.svg';
import { TypedLink } from '../../router';
import { twMerge } from 'tailwind-merge';

export type Columns<DataType extends object = Record<string, unknown>> = readonly ColumnDef<DataType>[];

const PRODUCTS_ADMIN_PAGE_QUERY_KEY = 'browseArticles';

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
                            <p className="text-small text-gray text-ellipsis">{description}</p>
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
                    const queryClient = useQueryClient();

                    const { mutate: deleteArticle, isLoading: deleteIsLoading } = useMutation(
                        () => {
                            return api.article.deleteArticle({
                                articleDeleteRequest: {
                                    id,
                                },
                            });
                        },
                        {
                            onSuccess: () => {
                                queryClient.invalidateQueries(PRODUCTS_ADMIN_PAGE_QUERY_KEY);
                            },
                        },
                    );

                    return (
                        <div className="flex flex-col gap-2">
                            <TypedLink to="/admin/products/edit/:productId" params={{ productId: id.toString() }}>
                                <button className="flex items-center gap-2">
                                    <EditSVG className="stroke-primary h-4 w-4" />
                                    <span className="text-small text-primary">Изменить</span>
                                </button>
                            </TypedLink>
                            <button
                                className={twMerge('flex items-center gap-2', deleteIsLoading && 'opacity-50')}
                                disabled={deleteIsLoading}
                                onClick={() => deleteArticle()}
                            >
                                <TrashSVG className="stroke-primary h-4 w-4" />
                                <span className="text-small text-primary">Удалить</span>
                            </button>
                        </div>
                    );
                },
            },
        ],
        [],
    );

    return (
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
                queryKey={PRODUCTS_ADMIN_PAGE_QUERY_KEY}
            />
        </div>
    );
};

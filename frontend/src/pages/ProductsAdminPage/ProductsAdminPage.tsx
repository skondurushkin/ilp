import { ArticleResponse, PageRequest, api } from '../../api';
import { DeleteProductData, DeleteProductForm } from './DeleteProductForm';
import { useCallback, useMemo, useState } from 'react';

import { AdminTable } from '../../components/AdminTable';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import type { ColumnDef } from '@tanstack/react-table';
import { ReactComponent as EditSVG } from '../../assets/edit.svg';
import Modal from '../../components/Modal';
import { PRODUCTS_ADMIN_PAGE_QUERY_KEY } from '../../modules/admin';
import { ReactComponent as TrashSVG } from '../../assets/trash.svg';
import { TypedLink } from '../../router';
import { Zaps } from '../../components/Zaps';

export type Columns<DataType extends object = Record<string, unknown>> = readonly ColumnDef<DataType>[];

export const ProductsAdminPage = () => {
    const [removeProductModalData, setRemoveProductModalData] = useState<DeleteProductData | null>(null);

    const queryData = useCallback((pageRequest: PageRequest) => {
        return api.admin.browseArticlesForAdmin({
            pageRequest,
        });
    }, []);

    const columns = useMemo<ColumnDef<ArticleResponse>[]>(
        () => [
            {
                accessorKey: 'id',
                header: () => <span>ун</span>,
                cell: (info) => info.getValue(),
            },
            {
                accessorKey: 'name',
                header: () => <span>наименование</span>,
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
                header: () => <span>артикул</span>,
                cell: (info) => info.getValue(),
            },
            {
                accessorKey: 'price',
                header: () => <span>стоимость</span>,
                cell: (info) => {
                    const { price } = info.row.original;
                    return <Zaps length={5} amount={price} />;
                },
            },
            {
                accessorKey: 'actions',
                header: () => <span>действия</span>,
                cell: (info) => {
                    const { id, name, active } = info.row.original;

                    if (active) {
                        return (
                            <div className="flex flex-col gap-1">
                                <TypedLink
                                    to="/admin/products/edit/:productId"
                                    params={{ productId: id.toString() }}
                                    className="btn-table-text group flex items-center gap-2"
                                >
                                    <EditSVG className="btn-table-text-icon h-4 w-4" />
                                    <p>Изменить</p>
                                </TypedLink>
                                <button
                                    className="btn-table-text group flex items-center gap-2"
                                    onClick={() =>
                                        setRemoveProductModalData({
                                            id,
                                            name,
                                        })
                                    }
                                >
                                    <TrashSVG className="btn-table-text-icon h-4 w-4" />
                                    <p>Архивировать</p>
                                </button>
                            </div>
                        );
                    }

                    return <p className="text-error text-base">В архиве</p>;
                },
            },
        ],
        [],
    );

    return (
        <div className="flex flex-col gap-6">
            <Breadcrumbs items={[{ label: 'Администрирование', link: '/admin' }, { label: 'Товары' }]} />
            <div className="self-start">
                <div className="flex flex-col gap-4">
                    <h1 className="text-h1">Товары</h1>
                    <TypedLink to="/admin/products/create" className="btn btn-primary">
                        Добавить товар
                    </TypedLink>
                </div>
            </div>
            <AdminTable
                storage="query"
                queryStorageName="globalFilter"
                globalFilterPlaceholder="Поиск по Наименованию и Артиклу"
                columns={columns}
                queryData={queryData}
                queryKey={PRODUCTS_ADMIN_PAGE_QUERY_KEY}
            />
            <Modal
                id="DeleteProductForm"
                size="sm"
                isOpen={!!removeProductModalData}
                closeModal={() => setRemoveProductModalData(null)}
            >
                <Modal.Body>
                    {!!removeProductModalData && (
                        <DeleteProductForm
                            defaultValues={removeProductModalData}
                            queryKey={PRODUCTS_ADMIN_PAGE_QUERY_KEY}
                            closeModal={() => setRemoveProductModalData(null)}
                        />
                    )}
                </Modal.Body>
            </Modal>
        </div>
    );
};

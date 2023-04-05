import { Breadcrumbs } from '../../components/Breadcrumbs';
import { DataNotFound } from '../../components/DataNotFound';
import { EditProductForm } from './EditProductForm';
import { PageSpinner } from '../../components/Spinner';
import { useParams } from 'react-router-dom';
import { useQueryProductById } from '../../modules/admin';

export const EditProductAdminPage = () => {
    const { productId } = useParams();

    const { data: product, isLoading } = useQueryProductById({
        articleId: Number(productId),
    });

    if (isLoading) {
        return <PageSpinner />;
    }

    if (product) {
        return (
            <div className="flex flex-col gap-6">
                <h1 className="text-h1">Редактирование товара</h1>
                <Breadcrumbs
                    items={[
                        { label: 'Администрирование', link: '/admin' },
                        { label: 'Активности', link: '/admin/products' },
                        { label: 'Редактирование товара' },
                    ]}
                />
                <EditProductForm
                    values={{
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        available: product.available,
                        code: product.code,
                        description: product.description,
                    }}
                />
            </div>
        );
    }

    return <DataNotFound />;
};

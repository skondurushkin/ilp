import { DataNotFound } from '../../components/DataNotFound';
import { EditProductForm } from './EditProductForm';
import { Layout } from '../../components/Layout';
import { Spinner } from '../../components/Spinner';
import { useParams } from 'react-router-dom';
import { useQueryProductById } from '../../modules/admin';

export const EditProductAdminPage = () => {
    const { productId } = useParams();

    const { data: product, isLoading } = useQueryProductById({
        articleId: Number(productId),
    });

    if (isLoading) {
        return (
            <Layout>
                <Spinner />
            </Layout>
        );
    }

    if (product) {
        return (
            <Layout>
                <div className="flex flex-col gap-6">
                    <h1 className="text-h1">Редактирование товара</h1>
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
            </Layout>
        );
    }

    return (
        <Layout>
            <DataNotFound />
        </Layout>
    );
};

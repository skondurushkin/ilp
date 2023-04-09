import { Breadcrumbs } from '../../components/Breadcrumbs';
import { CreateProductForm } from './CreateProductForm';

export const CreateProductAdminPage = () => {
    return (
        <div className="flex flex-col gap-6">
            <h1 className="text-h1">Добавление товара</h1>
            <Breadcrumbs
                items={[
                    { label: 'Администрирование', link: '/admin' },
                    { label: 'Товары', link: '/admin/products' },
                    { label: 'Добавление товара' },
                ]}
            />
            <CreateProductForm
                defaultValues={{
                    price: 1,
                    name: '',
                    description: '',
                    code: '',
                    available: true,
                }}
            />
        </div>
    );
};

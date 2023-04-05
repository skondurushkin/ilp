import { CreateProductForm } from './CreateProductForm';

export const CreateProductAdminPage = () => {
    return (
        <div className="flex flex-col gap-6">
            <h1 className="text-h1">Добавление товара</h1>
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

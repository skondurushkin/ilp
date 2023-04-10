import { useMutation, useQueryClient } from 'react-query';

import { FormInput } from '../../components/Form';
import { api } from '../../api';
import { useForm } from 'react-hook-form';

export interface DeleteProductData {
    id: number;
    name: string;
}

export interface DeleteProductFormProps {
    queryKey: string;
    defaultValues: DeleteProductData;
    closeModal: () => void;
}

export const DeleteProductForm = (props: DeleteProductFormProps) => {
    const { defaultValues, closeModal, queryKey } = props;
    const queryClient = useQueryClient();
    const { control } = useForm<DeleteProductData>({
        defaultValues,
    });

    const { mutate: deleteArticle, isLoading: deleteIsLoading } = useMutation(
        () => {
            return api.article.deleteArticle({
                articleDeleteRequest: {
                    id: defaultValues.id,
                },
            });
        },
        {
            onSuccess: async () => {
                await queryClient.invalidateQueries(queryKey);
                closeModal();
            },
        },
    );

    return (
        <form>
            <div className="flex flex-col gap-6">
                <h1 className="text-h1 text-white">Вы действительно хотите архивировать Товар?</h1>
                <div className="flex flex-col gap-3">
                    <FormInput readOnly control={control} name="id" label="УН" />
                    <FormInput readOnly control={control} name="name" label="Название" />
                </div>
                <div className="flex gap-4">
                    <button type="button" className="btn" disabled={deleteIsLoading} onClick={() => deleteArticle()}>
                        Архивировать
                    </button>
                    <button type="button" className="btn btn-primary" onClick={() => closeModal()}>
                        Отменить
                    </button>
                </div>
            </div>
        </form>
    );
};

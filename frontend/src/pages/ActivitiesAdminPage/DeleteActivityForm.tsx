import { useMutation, useQueryClient } from 'react-query';

import { FormInput } from '../../components/Form';
import { api } from '../../api';
import { useForm } from 'react-hook-form';

export interface DeleteActivityData {
    id: number;
    name: string;
}

export interface DeleteActivityFormProps {
    queryKey: string;
    defaultValues: DeleteActivityData;
    closeModal: () => void;
}

export const DeleteActivityForm = (props: DeleteActivityFormProps) => {
    const { defaultValues, closeModal, queryKey } = props;
    const queryClient = useQueryClient();
    const { control } = useForm<DeleteActivityData>({
        defaultValues,
    });

    const { mutate: deleteActivity, isLoading: deleteIsLoading } = useMutation(
        () => {
            return api.activity.deleteActivity({
                activityDeleteRequest: {
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
                <h1 className="text-h1 text-white">Вы действительно хотите архивировать Активность?</h1>
                <div className="flex flex-col gap-3">
                    <FormInput readOnly control={control} name="id" label="УН" />
                    <FormInput readOnly control={control} name="name" label="Название" />
                </div>
                <div className="flex gap-4">
                    <button type="button" className="btn" disabled={deleteIsLoading} onClick={() => deleteActivity()}>
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

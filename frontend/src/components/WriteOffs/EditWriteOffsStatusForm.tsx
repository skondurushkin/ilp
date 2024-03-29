import { ErrorMessage, UpdateWriteOffRequest, WriteOffStatus, api } from '../../api';
import { FormInput, FormSelect, FormSelectOption } from '../Form';

import { DEFAULT_API_ERROR_MSG } from '../../api/constants';
import { WriteOffStatusName } from '../../modules/loyalty';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { useMemo } from 'react';
import { useQueryClient } from 'react-query';
import validationRules from '../../utils/validationRules';

export interface ReadonlyEditWriteOffsStatusFormRequest extends UpdateWriteOffRequest {
    id: number;
    date: string;
    articleName: string;
}

export interface EditWriteOffsStatusFormProps {
    queryKey: string;
    defaultValues: ReadonlyEditWriteOffsStatusFormRequest;
    closeModal: () => void;
}

export const EditWriteOffsStatusForm = (props: EditWriteOffsStatusFormProps) => {
    const { queryKey, defaultValues, closeModal } = props;
    const queryClient = useQueryClient();

    const { control, handleSubmit, formState, reset } = useForm<ReadonlyEditWriteOffsStatusFormRequest>({
        defaultValues,
    });

    const onSubmit = async (data: ReadonlyEditWriteOffsStatusFormRequest) => {
        try {
            await api.admin.updateWriteOff({
                writeoffId: defaultValues.id,
                updateWriteOffRequest: data,
            });
            await queryClient.invalidateQueries(queryKey);
            reset();
            toast.success('Статус заказа изменен');
            closeModal();
        } catch (err) {
            toast.error((err as ErrorMessage)?.message ?? DEFAULT_API_ERROR_MSG);
        }
    };

    const statusOptions = useMemo<FormSelectOption[]>(() => {
        return Object.values(WriteOffStatus).map((status) => ({
            value: status,
            label: WriteOffStatusName[status as WriteOffStatus],
        }));
    }, []);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
                <h1 className="text-h1 text-white">Изменение статуса</h1>
                <div className="flex flex-col gap-3">
                    <FormInput readOnly control={control} name="date" label="Дата заказа" labelClassName="text-white" />
                    <FormInput
                        readOnly
                        control={control}
                        name="articleName"
                        label="Товар"
                        labelClassName="text-white"
                    />
                    <FormSelect
                        control={control}
                        name="status"
                        label="Статус"
                        labelClassName="text-white"
                        rules={{
                            required: validationRules.required,
                        }}
                        options={statusOptions}
                    />
                </div>
                <div className="flex gap-4">
                    <button type="submit" className="btn" disabled={formState.isSubmitting}>
                        Сохранить
                    </button>
                    <button type="button" className="btn btn-primary" onClick={() => closeModal()}>
                        Отменить
                    </button>
                </div>
            </div>
        </form>
    );
};

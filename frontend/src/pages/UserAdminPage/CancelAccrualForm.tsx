import { ErrorMessage, OperationResponse, api } from '../../api';

import { DEFAULT_API_ERROR_MSG } from '../../api/constants';
import { FormInput } from '../../components/Form';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { useInvalidateQueriesArray } from '../../components/useInvalidateQueriesArray';
import validationRules from '../../utils/validationRules';

export interface CancelAccrualFormData extends Omit<OperationResponse, 'type' | 'date' | 'active'> {
    date: string;
}

export interface CancelAccrualFormProps {
    userId: number;
    queryKey: string | string[];
    closeModal: () => void;
    values: CancelAccrualFormData;
}

export const CancelAccrualForm = (props: CancelAccrualFormProps) => {
    const { userId, values, closeModal, queryKey } = props;
    const { invalidateQueries } = useInvalidateQueriesArray();

    const { control, handleSubmit, formState, reset } = useForm<CancelAccrualFormData>({
        values,
    });

    const onSubmit = async (data: CancelAccrualFormData) => {
        try {
            await api.admin.cancelAccrualForUser({
                userId,
                cancelAccrualBody: {
                    accrualId: Number(data.id),
                },
            });
            await invalidateQueries(queryKey);
            reset();
            toast.success('Начисление отменено');
            closeModal();
        } catch (err) {
            toast.error((err as ErrorMessage)?.message ?? DEFAULT_API_ERROR_MSG);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
                <h1 className="text-h1 text-white">Отмена начисления вольт</h1>
                <div className="flex flex-col gap-3">
                    <FormInput
                        readOnly
                        control={control}
                        name="date"
                        label="Дата начисления"
                        labelClassName="text-white"
                        rules={{
                            required: validationRules.required,
                        }}
                    />
                    <FormInput
                        readOnly
                        control={control}
                        name="name"
                        label="Название активности"
                        labelClassName="text-white"
                    />
                    <FormInput
                        readOnly
                        control={control}
                        name="amount"
                        label="Сумма в вольтах"
                        labelClassName="text-white"
                    />
                </div>
                <div className="flex gap-4">
                    <button type="submit" className="btn" disabled={formState.isSubmitting}>
                        Отменить начисление
                    </button>
                    <button type="button" className="btn btn-primary" onClick={() => closeModal()}>
                        Отменить
                    </button>
                </div>
            </div>
        </form>
    );
};

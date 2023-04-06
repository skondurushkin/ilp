import { ErrorMessage, PageRequestConfig, api } from '../../api';
import { useMutation, useQueryClient } from 'react-query';

import { FormAsyncSelect } from '../../components/Form/FormAsyncSelect';
import { FormInput } from '../../components/Form';
import { GET_WALLET_HISTORY_FOR_USER_ID_QUERY_KEY_FN } from '../../modules/admin';
import debounce from 'debounce-promise';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import validationRules from '../../utils/validationRules';

export interface EditBalanceFormProps {
    userId: number;
    closeModal: () => void;
}

export interface FormData {
    activity: {
        value: number;
        label: string;
        amount: number;
    };
}

export const EditBalanceForm = (props: EditBalanceFormProps) => {
    const { userId, closeModal } = props;
    const queryClient = useQueryClient();

    const { control, handleSubmit, formState, reset, setValue } = useForm<FormData>();

    const onSubmit = async (data: FormData) => {
        try {
            await api.admin.createNewAccrual({
                userId,
                createNewAccrualRequest: {
                    activityId: Number(data.activity.value),
                },
            });
            reset();
            toast('Вольты начислены');
            closeModal();
            queryClient.invalidateQueries(GET_WALLET_HISTORY_FOR_USER_ID_QUERY_KEY_FN(userId));
        } catch (err) {
            toast((err as ErrorMessage).message ?? 'Ошибка');
        }
    };
    const { mutateAsync: browseActivities } = useMutation(['activity.browseActivities'], (config: PageRequestConfig) =>
        api.activity.browseActivities({
            pageRequest: {
                page: 0,
                pageSize: 20,
                config,
            },
        }),
    );

    const loadOptions = debounce(async (globalFilter: string) => {
        const data = await browseActivities({
            globalFilter,
        });

        return data.results?.map((activity) => ({
            value: activity.id,
            label: activity.name,
            amount: activity.amount,
        }));
    }, 500);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
                <h1 className="text-h1 text-white">Начисление вольт</h1>
                <div className="flex flex-col gap-3">
                    <FormAsyncSelect
                        control={control}
                        name="activity"
                        label="Название активности"
                        labelClassName="text-white"
                        loadOptions={loadOptions}
                        rules={{
                            required: validationRules.required,
                            onChange: (data) => {
                                setValue('activity.amount', data.target.value.amount);
                            },
                        }}
                    />
                    <FormInput
                        readOnly
                        control={control}
                        name="activity.amount"
                        label="Сумма в вольтах"
                        labelClassName="text-white"
                    />
                </div>
                <div className="flex gap-4">
                    <button type="submit" className="btn" disabled={formState.isSubmitting}>
                        Начислить вольты
                    </button>
                    <button type="button" className="btn btn-primary" onClick={() => closeModal()}>
                        Отменить
                    </button>
                </div>
            </div>
        </form>
    );
};

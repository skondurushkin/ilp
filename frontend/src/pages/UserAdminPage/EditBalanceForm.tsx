import { ErrorMessage, PageRequestConfig, api } from '../../api';

import { DEFAULT_API_ERROR_MSG } from '../../api/constants';
import { FormAsyncSelect } from '../../components/Form/FormAsyncSelect';
import { FormInput } from '../../components/Form';
import debounce from 'debounce-promise';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { useInvalidateQueriesArray } from '../../components/useInvalidateQueriesArray';
import { useMutation } from 'react-query';
import validationRules from '../../utils/validationRules';

export interface EditBalanceFormProps {
    userId: number;
    queryKey: string | string[];
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
    const { userId, closeModal, queryKey } = props;
    const { invalidateQueries } = useInvalidateQueriesArray();

    const { control, handleSubmit, formState, reset, setValue } = useForm<FormData>();

    const onSubmit = async (data: FormData) => {
        try {
            await api.admin.createNewAccrual({
                userId,
                createNewAccrualRequest: {
                    activityId: Number(data.activity.value),
                },
            });
            await invalidateQueries(queryKey);
            reset();
            toast.success('Вольты начислены');
            closeModal();
        } catch (err) {
            toast.error((err as ErrorMessage)?.message ?? DEFAULT_API_ERROR_MSG);
        }
    };
    const { mutateAsync: browseActivities } = useMutation(['activity.browseActivities'], (config: PageRequestConfig) =>
        api.admin.browseActivitiesAsAdmin({
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
                            validate: (value) => {
                                return value?.value ? undefined : validationRules.required;
                            },
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
                        placeholder="Значение из активности"
                        labelClassName="text-white"
                        rules={{
                            required: validationRules.required,
                        }}
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

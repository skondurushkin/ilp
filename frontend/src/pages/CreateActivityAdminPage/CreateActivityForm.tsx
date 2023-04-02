import { ActivityRequest, ErrorMessage, api } from '../../api';

import { FormInput } from '../../components/Form';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import validationRules from '../../utils/validationRules';

export interface CreateActivityFormProps {
    defaultValues: ActivityRequest;
}

export const CreateActivityForm = (props: CreateActivityFormProps) => {
    const { defaultValues } = props;

    const { control, handleSubmit, formState, reset } = useForm<ActivityRequest>({
        defaultValues,
    });

    const onSubmit = async (activityRequest: ActivityRequest) => {
        try {
            await api.activity.createActivity({
                activityRequest,
            });
            reset();
            toast('Активность добавлена');
        } catch (err) {
            toast((err as ErrorMessage).message ?? 'Ошибка');
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-3">
                    <FormInput
                        control={control}
                        name="name"
                        label="Название активности"
                        rules={{
                            required: validationRules.required,
                        }}
                    />
                    <FormInput
                        control={control}
                        type="number"
                        name="amount"
                        label="Стоимость"
                        rules={{
                            min: validationRules.min(1),
                            required: validationRules.required,
                        }}
                    />
                    <FormInput control={control} name="infoLink" label="Ссылка на описание" />
                </div>
                <button type="submit" className="btn btn-primary md:self-start" disabled={formState.isSubmitting}>
                    Добавить
                </button>
            </div>
        </form>
    );
};

import { ActivityUpdateRequest, ErrorMessage, api } from '../../api';

import { FormInput } from '../../components/Form';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import validationRules from '../../utils/validationRules';

export interface EditActivityFormProps {
    values: ActivityUpdateRequest;
}

export const EditActivityForm = (props: EditActivityFormProps) => {
    const { values } = props;

    const { control, handleSubmit, formState } = useForm<ActivityUpdateRequest>({
        values,
    });

    const onSubmit = async (data: ActivityUpdateRequest) => {
        try {
            await api.activity.updateActivity({
                activityUpdateRequest: data,
            });
            toast('Активность обновлена');
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
                    <FormInput
                        control={control}
                        name="infoLink"
                        label="Ссылка на описание"
                        rules={{
                            validate: validationRules.isUrl,
                        }}
                    />
                </div>
                <button type="submit" className="btn btn-primary md:self-start" disabled={formState.isSubmitting}>
                    Сохранить
                </button>
            </div>
        </form>
    );
};

import { ActivityUpdateRequest, ErrorMessage, api } from '../../api';
import { FormInput, FormTextArea } from '../../components/Form';

import { DEFAULT_API_ERROR_MSG } from '../../api/constants';
import formatters from '../../utils/formatters';
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
            toast.success('Активность обновлена');
        } catch (err) {
            toast.error((err as ErrorMessage)?.message ?? DEFAULT_API_ERROR_MSG);
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
                            minLength: validationRules.maxLength(1),
                            maxLength: validationRules.maxLength(50),
                        }}
                    />
                    <FormInput
                        control={control}
                        type="number"
                        name="amount"
                        label="Стоимость в вольтах"
                        rules={{
                            valueAsNumber: true,
                            min: validationRules.min(1),
                            max: validationRules.max(9999),
                            required: validationRules.required,
                        }}
                        transform={{
                            input: formatters.numberOnly,
                        }}
                    />
                    <FormInput
                        control={control}
                        name="infoLink"
                        label="Ссылка на описание"
                        rules={{
                            validate: validationRules.isUrl,
                            required: validationRules.required,
                        }}
                    />
                    <FormTextArea
                        control={control}
                        name="description"
                        label="Описание активности"
                        rows={4}
                        cols={50}
                        rules={{
                            minLength: validationRules.maxLength(1),
                            maxLength: validationRules.maxLength(500),
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

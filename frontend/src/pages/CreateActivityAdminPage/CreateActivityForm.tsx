import { ActivityRequest, ErrorMessage, api } from '../../api';
import { FormInput, FormTextArea } from '../../components/Form';

import { DEFAULT_API_ERROR_MSG } from '../../api/constants';
import { TypedLink } from '../../router';
import formatters from '../../utils/formatters';
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
            const newActivity = await api.activity.createActivity({
                activityRequest,
            });
            reset();
            toast.success(
                <div>
                    <p>Активность добавлена</p>
                    <TypedLink
                        to="/admin/activities/edit/:activityId"
                        params={{ activityId: newActivity.id.toString() }}
                        className="flex items-center gap-2"
                    >
                        <span className="text-primary">Посмотреть</span>
                    </TypedLink>
                </div>,
                {
                    autoClose: false,
                },
            );
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
                    Добавить
                </button>
            </div>
        </form>
    );
};

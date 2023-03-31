import { ActivityRequest, api } from '../../api';

import { FormInput } from '../../components/FormInput';
import { useForm } from 'react-hook-form';

export const CreateActivitiesAdminPage = () => {
    const { control, handleSubmit } = useForm<ActivityRequest>({
        defaultValues: {
            name: '',
            infoLink: '',
            amount: 0,
        },
    });
    const onSubmit = (activityRequest: ActivityRequest) => {
        console.log('activityRequest', JSON.stringify(activityRequest, null, 2));
        return api.activity.createActivity({
            activityRequest,
        });
    };

    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-h1">Добавление активности</h1>
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col gap-3">
                            <FormInput
                                control={control}
                                name="name"
                                label="Название активности"
                                rules={{
                                    required: 'Обязательное поле',
                                }}
                            />
                            <FormInput control={control} type="number" name="amount" label="Стоимость в вольтах" />
                            <FormInput control={control} name="infoLink" label="Ссылка на описание" />
                        </div>
                        <button type="submit" className="btn btn-primary md:self-start">
                            Добавить
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

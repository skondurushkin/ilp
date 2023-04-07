import { ArticleRequest, ErrorMessage, api } from '../../api';
import { FormCheckbox, FormInput, FormTextArea } from '../../components/Form';

import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import validationRules from '../../utils/validationRules';

export interface CreateProductFormProps {
    defaultValues: ArticleRequest;
}

export const CreateProductForm = (props: CreateProductFormProps) => {
    const { defaultValues } = props;

    const { control, handleSubmit, formState, reset } = useForm<ArticleRequest>({
        defaultValues,
    });

    const onSubmit = async (articleRequest: ArticleRequest) => {
        try {
            await api.article.createArticle({
                articleRequest,
            });
            reset();
            toast('Товар добавлен');
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
                        name="code"
                        label="Артикул"
                        rules={{
                            required: validationRules.required,
                            minLength: validationRules.maxLength(1),
                            maxLength: validationRules.maxLength(50),
                        }}
                    />
                    <FormInput
                        control={control}
                        name="name"
                        label="Наименование товара"
                        rules={{
                            required: validationRules.required,
                            minLength: validationRules.maxLength(1),
                            maxLength: validationRules.maxLength(50),
                        }}
                    />
                    <FormInput
                        control={control}
                        type="number"
                        name="price"
                        label="Стоимость в вольтах"
                        rules={{
                            valueAsNumber: true,
                            min: validationRules.min(1),
                            max: validationRules.max(9999),
                            required: validationRules.required,
                        }}
                    />
                    <FormTextArea
                        control={control}
                        name="description"
                        label="Описание товара"
                        rows={4}
                        cols={50}
                        rules={{
                            minLength: validationRules.maxLength(1),
                            maxLength: validationRules.maxLength(500),
                        }}
                    />
                    <FormCheckbox control={control} name="available" label="Товар в наличии" />
                </div>
                <button type="submit" className="btn btn-primary md:self-start" disabled={formState.isSubmitting}>
                    Добавить
                </button>
            </div>
        </form>
    );
};

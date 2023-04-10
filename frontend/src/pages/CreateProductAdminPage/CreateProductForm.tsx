import { ArticleRequest, ErrorMessage, api } from '../../api';
import { FormCheckbox, FormInput, FormTextArea } from '../../components/Form';

import { DEFAULT_API_ERROR_MSG } from '../../api/constants';
import PhotoInput from '../../components/Form/PhotoInput';
import { PhotoRequirements } from '../../components/Form/PhotoInput/PhotoRest';
import { TypedLink } from '../../router';
import formatters from '../../utils/formatters';
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
            const newProduct = await api.article.createArticle({
                articleRequest,
            });
            reset();
            toast.success(
                <div>
                    <p>Товар добавлен</p>
                    <TypedLink
                        to="/admin/products/edit/:productId"
                        params={{ productId: newProduct.id.toString() }}
                        className="flex items-center gap-2"
                    >
                        <p className="text-gray font-bold">Посмотреть</p>
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
                <div className="self-start">
                    <PhotoInput
                        control={control}
                        name="imageLink"
                        scope="article"
                        rules={{
                            required: validationRules.required,
                        }}
                    />
                    <PhotoRequirements />
                </div>
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
                        transform={{
                            input: formatters.numberOnly,
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

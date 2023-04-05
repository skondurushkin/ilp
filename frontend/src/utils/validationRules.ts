import isURL from 'validator/lib/isURL';

const validationRules = {
    required: 'Не заполнено обязательное поле',
    min: (value: number) => ({
        value,
        message: `Минимальное значение ${value}`,
    }),
    max: (value: number) => ({
        value,
        message: `Максимальное значение ${value}`,
    }),
    minLength: (value: number) => ({
        value,
        message: `Минимальное количество символов ${value}`,
    }),
    maxLength: (value: number) => ({
        value,
        message: `Максимальное количество символов ${value}`,
    }),
    isUrl: (value?: string) => {
        if (value) {
            const isValidUrl = isURL(value);
            return isValidUrl ? undefined : 'Неправильный адрес страницы';
        }
        return undefined;
    },
};

export default validationRules;

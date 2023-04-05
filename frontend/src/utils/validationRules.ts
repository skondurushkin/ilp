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
    isUrl: (value?: string) => {
        if (value) {
            const isValidUrl = isURL(value);
            return isValidUrl ? undefined : 'Неправильный url';
        }
        return undefined;
    },
};

export default validationRules;

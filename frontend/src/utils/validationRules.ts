import validator from 'validator';

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
            const isValidUrl = validator.isURL(value);
            return isValidUrl ? undefined : 'Неправильный url';
        }
        return undefined;
    },
};

export default validationRules;

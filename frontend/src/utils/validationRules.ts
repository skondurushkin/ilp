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
};

export default validationRules;

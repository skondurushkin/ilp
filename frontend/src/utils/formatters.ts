const numberOnly = (value: string): string => {
    return value ? value.toString().replace(/[^0-9]+/g, '') : '';
};

export default {
    numberOnly,
};

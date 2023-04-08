export const toIsoString = (date: Date): Date => {
    const tzo = -date.getTimezoneOffset(),
        dif = tzo >= 0 ? '+' : '-',
        pad = (num: number) => {
            return (num < 10 ? '0' : '') + num;
        };

    return (date.getFullYear() +
        '-' +
        pad(date.getMonth() + 1) +
        '-' +
        pad(date.getDate()) +
        'T' +
        pad(date.getHours()) +
        ':' +
        pad(date.getMinutes()) +
        ':' +
        pad(date.getSeconds()) +
        dif +
        pad(Math.floor(Math.abs(tzo) / 60)) +
        ':' +
        pad(Math.abs(tzo) % 60)) as unknown as Date;
};

export const toISODateString = (date: Date): Date => {
    const pad = (num: number) => {
        return (num < 10 ? '0' : '') + num;
    };

    return (date.getFullYear() + '-' + pad(date.getMonth() + 1) + '-' + pad(date.getDate())) as unknown as Date;
};

export const getDateMinusDays = (days: number, date: Date | undefined = new Date()) => {
    return new Date(date.setDate(date.getDate() - days));
};

export const getDateMinusMonths = (months: number, date: Date | undefined = new Date()) => {
    return new Date(date.setMonth(date.getMonth() - months));
};

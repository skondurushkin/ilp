export type DailyStars = {
    date: Date;
    stars: number;
};

export type Series = {
    label: string;
    data: DailyStars[];
    color: string;
};

export const data: Series[] = [
    {
        label: 'Начисления',
        color: '#AAE632',
        data: [
            {
                date: new Date(new Date().setMonth(0)),
                stars: 20,
            },
            {
                date: new Date(new Date().setMonth(2)),
                stars: 102,
            },
            {
                date: new Date(new Date().setMonth(3)),
                stars: 120,
            },
            {
                date: new Date(new Date().setMonth(4)),
                stars: 520,
            },
            {
                date: new Date(new Date().setMonth(5)),
                stars: 320,
            },
            {
                date: new Date(new Date().setMonth(6)),
                stars: 820,
            },
        ],
    },
    {
        label: 'Списания',
        color: '#F84E4E',
        data: [
            {
                date: new Date(new Date().setMonth(0)),
                stars: 102,
            },
            {
                date: new Date(new Date().setMonth(2)),
                stars: 1093,
            },
            {
                date: new Date(new Date().setMonth(3)),
                stars: 1021,
            },
            {
                date: new Date(new Date().setMonth(4)),
                stars: 1121,
            },
            {
                date: new Date(new Date().setMonth(5)),
                stars: 1921,
            },
            {
                date: new Date(new Date().setMonth(6)),
                stars: 2002,
            },
        ],
    },
];

export const dataWeek: Series[] = [
    {
        label: 'Списания',
        color: '#F84E4E',
        data: [
            {
                date: new Date(new Date().setDate(new Date().getDate() - 7)),
                stars: 1023,
            },
            {
                date: new Date(new Date().setDate(new Date().getDate() - 6)),
                stars: 1093,
            },
            {
                date: new Date(new Date().setDate(new Date().getDate() - 5)),
                stars: 1021,
            },
            {
                date: new Date(new Date().setDate(new Date().getDate() - 4)),
                stars: 1121,
            },
            {
                date: new Date(new Date().setDate(new Date().getDate() - 3)),
                stars: 1921,
            },
            {
                date: new Date(new Date().setDate(new Date().getDate() - 2)),
                stars: 2502,
            },
            {
                date: new Date(new Date().setDate(new Date().getDate() - 1)),
                stars: 2002,
            },
            {
                date: new Date(),
                stars: 2102,
            },
        ],
    },
    {
        label: 'Начисления',
        color: '#AAE632',
        data: [
            {
                date: new Date(new Date().setDate(new Date().getDate() - 7)),
                stars: 523,
            },
            {
                date: new Date(new Date().setDate(new Date().getDate() - 6)),
                stars: 1093,
            },
            {
                date: new Date(new Date().setDate(new Date().getDate() - 5)),
                stars: 881,
            },
            {
                date: new Date(new Date().setDate(new Date().getDate() - 4)),
                stars: 1121,
            },
            {
                date: new Date(new Date().setDate(new Date().getDate() - 3)),
                stars: 131,
            },
            {
                date: new Date(new Date().setDate(new Date().getDate() - 2)),
                stars: 2502,
            },
            {
                date: new Date(new Date().setDate(new Date().getDate() - 1)),
                stars: 3002,
            },
            {
                date: new Date(),
                stars: 212,
            },
        ],
    },
];

export const dataDay: Series[] = [
    {
        label: 'Списания',
        color: '#F84E4E',
        data: [
            {
                date: new Date(new Date().setHours(1)),
                stars: 523,
            },
            {
                date: new Date(new Date().setHours(2)),
                stars: 193,
            },
            {
                date: new Date(new Date().setHours(3)),
                stars: 621,
            },
            {
                date: new Date(new Date().setHours(4)),
                stars: 321,
            },
            {
                date: new Date(new Date().setHours(15)),
                stars: 121,
            },
            {
                date: new Date(new Date().setHours(18)),
                stars: 921,
            },
        ],
    },
    {
        label: 'Начисления',
        color: '#AAE632',
        data: [
            {
                date: new Date(new Date().setHours(1)),
                stars: 23,
            },
            {
                date: new Date(new Date().setHours(2)),
                stars: 1093,
            },
            {
                date: new Date(new Date().setHours(5)),
                stars: 1021,
            },
            {
                date: new Date(new Date().setHours(7)),
                stars: 111,
            },
            {
                date: new Date(new Date().setHours(15)),
                stars: 1921,
            },
            {
                date: new Date(new Date().setHours(18)),
                stars: 555,
            },
        ],
    },
];

export const dataUsersDay: Series[] = [
    {
        label: 'Списания',
        color: '#F84E4E',
        data: [
            {
                date: new Date(new Date().setHours(1)),
                stars: 523,
            },
            {
                date: new Date(new Date().setHours(2)),
                stars: 193,
            },
            {
                date: new Date(new Date().setHours(3)),
                stars: 621,
            },
            {
                date: new Date(new Date().setHours(4)),
                stars: 321,
            },
            {
                date: new Date(new Date().setHours(15)),
                stars: 121,
            },
            {
                date: new Date(new Date().setHours(18)),
                stars: 921,
            },
        ],
    },
];

export const dataUsersAllTime: Series[] = [
    {
        label: 'Списания',
        color: '#F84E4E',
        data: [
            {
                date: new Date(new Date().setMonth(0)),
                stars: 20,
            },
            {
                date: new Date(new Date().setMonth(2)),
                stars: 102,
            },
            {
                date: new Date(new Date().setMonth(3)),
                stars: 120,
            },
            {
                date: new Date(new Date().setMonth(4)),
                stars: 520,
            },
            {
                date: new Date(new Date().setMonth(5)),
                stars: 320,
            },
            {
                date: new Date(new Date().setMonth(6)),
                stars: 820,
            },
        ],
    },
];

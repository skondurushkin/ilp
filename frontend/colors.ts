export const colors = {
    black: '#000000',
    white: '#ffffff',
    primary: '#AAE632',
    gray: '#95979A',
    'secondary-green': '#CBFFCA',
    'gray-dark': '#111111',
    error: '#F84E4E',
    success: '#029C08',
    transparent: {
        '0%': 'rgba(255, 255, 255, 0)',
    },
    'white-transparent': {
        '5%': 'rgba(255, 255, 255, 0.05)',
        '10%': 'rgba(255, 255, 255, 0.1)',
        '20%': 'rgba(255, 255, 255, 0.2)',
        '30%': 'rgba(255, 255, 255, 0.3)',
        '50%': 'rgba(255, 255, 255, 0.5)',
        '70%': 'rgba(255, 255, 255, 0.7)',
    },
    'black-transparent': {
        '0%': 'rgba(0, 0, 0, 0)',
        '5%': 'rgba(0, 0, 0, 0.05)',
        '10%': 'rgba(0, 0, 0, 0.1)',
        '20%': 'rgba(0, 0, 0, 0.2)',
        '30%': 'rgba(0, 0, 0, 0.3)',
        '50%': 'rgba(0, 0, 0, 0.5)',
        '70%': 'rgba(0, 0, 0, 0.7)',
    },
};

export type Color = keyof typeof colors;

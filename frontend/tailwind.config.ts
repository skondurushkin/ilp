import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';
import { screens } from './screens';
import tailwindForms from '@tailwindcss/forms';

export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    darkMode: 'class',
    theme: {
        extend: {
            fontFamily: {
                sans: ['Lab Grotesque', ...defaultTheme.fontFamily.sans],
            },
            spacing: {
                sidebar: '312px',
            },
        },
        colors: {
            black: '#000000',
            white: '#ffffff',
            primary: '#AAE632',
            gray: '#95979A',
            'gray-dark': '#111111',
            error: '#F84E4E',
            success: '#029C08',
        },
        screens: Object.keys(screens).reduce((acc, screen) => ({ ...acc, [screen]: `${screens[screen]}px` }), {}),
    },
    plugins: [
        tailwindForms({
            strategy: 'class',
        }),
    ],
} satisfies Config;

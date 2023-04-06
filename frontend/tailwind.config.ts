import type { Config } from 'tailwindcss';
import { colors } from './colors';
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
                'header-mobile': '72px',
                header: '92px',
            },
            zIndex: {
                header: '99',
                sidebar: '98',
                modal: '100',
            },
        },
        colors,
        screens: Object.keys(screens).reduce((acc, screen) => ({ ...acc, [screen]: `${screens[screen]}px` }), {}),
    },
    plugins: [
        tailwindForms({
            strategy: 'class',
        }),
    ],
} satisfies Config;

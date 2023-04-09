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
                header: '64px',
                'header-md': '88px',
                'app-content-v-padding': 'theme(spacing.6)',
                'app-content-v-padding-md': 'theme(spacing.8)',
                'app-content-v-offset': 'calc(theme(spacing[header]) + theme(spacing[app-content-v-padding]))',
                'app-content-v-offset-md': 'calc(theme(spacing[header-md]) + theme(spacing[app-content-v-padding-md]))',
            },
            zIndex: {
                header: '98',
                sidebar: '99',
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

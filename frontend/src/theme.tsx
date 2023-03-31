import { ReactElement, useEffect } from 'react';

import { ReactComponent as MoonDarkIcon } from './assets/moon-dark.svg';
import { ReactComponent as MoonLightIcon } from './assets/moon-light.svg';
import { ReactComponent as SunDarkIcon } from './assets/sun-dark.svg';
import { ReactComponent as SunLightIcon } from './assets/sun-light.svg';
import { twMerge } from 'tailwind-merge';
import useLocalStorageState from 'use-local-storage-state';

export type Theme = 'light' | 'dark';

function activateCurrentTheme(): void {
    // On page load or when changing themes, best to add inline in `head` to avoid FOUC

    const theme = localStorage.theme ? JSON.parse(localStorage.theme) : undefined;
    if (isDarkTheme(theme)) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
}

function isDarkTheme(theme: Theme | undefined): boolean {
    return theme === 'dark' || (theme === undefined && window.matchMedia('(prefers-color-scheme: dark)').matches);
}

export interface ThemeToggleProps {
    className?: string;
}

export function ThemeToggle(props: ThemeToggleProps): ReactElement {
    const { className } = props;
    const [themeOrUndefined, setTheme] = useThemeManager();
    const theme = normalizeTheme(themeOrUndefined);

    useEffect(activateCurrentTheme, [themeOrUndefined]);

    return (
        <div className={className}>
            <button
                className="flex items-center gap-2 rounded-full border-2 border-white bg-black p-2"
                type="button"
                title={theme === 'dark' ? 'Включить светлую тему' : 'Включить темную тему'}
                onClick={() => {
                    setTheme((t) => (t === 'dark' ? 'light' : 'dark'));
                }}
            >
                <div
                    className={twMerge(
                        'flex-inline items-center justify-center rounded-full p-1',
                        theme === 'dark' && 'bg-white',
                        theme === 'light' && 'bg-black',
                    )}
                >
                    {theme === 'dark' && <MoonLightIcon />}
                    {theme === 'light' && <MoonDarkIcon />}
                </div>
                <div
                    className={twMerge(
                        'flex-inline items-center justify-center rounded-full p-1',
                        theme === 'dark' && 'bg-black',
                        theme === 'light' && 'bg-white',
                    )}
                >
                    {theme === 'dark' && <SunDarkIcon />}
                    {theme === 'light' && <SunLightIcon />}
                </div>
            </button>
        </div>
    );
}

function useThemeManager(): [Theme | undefined, React.Dispatch<React.SetStateAction<Theme | undefined>>] {
    const [theme, setTheme] = useLocalStorageState<Theme | undefined>('theme', {
        storageSync: true,
    });
    return [theme, setTheme];
}

export function useTheme(): Theme {
    const [theme] = useThemeManager();
    return normalizeTheme(theme);
}

function normalizeTheme(theme: Theme | undefined): Theme {
    return isDarkTheme(theme) ? 'dark' : 'light';
}

activateCurrentTheme();

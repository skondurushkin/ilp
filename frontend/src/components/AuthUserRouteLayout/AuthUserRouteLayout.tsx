import { Outlet, useLocation } from 'react-router-dom';
import { ReactElement, Suspense, useRef, useState } from 'react';

import { ReactComponent as BurgerIcon } from '../../assets/burger.svg';
import { ReactComponent as CloseIcon } from '../../assets/close.svg';
import { ReactComponent as Logo } from '../../assets/logo-light.svg';
import { Nav } from './Nav';
import { Profile } from './Profile';
import { Spinner } from '../Spinner';
import { ThemeToggle } from '../../theme';
import { TypedLink } from '../../router';
import { twMerge } from 'tailwind-merge';
import useClickAway from 'react-use/lib/useClickAway';

export function AuthUserRouteLayout(): ReactElement {
    const [mobileSidebarVisible, setMobileSidebarVisible] = useState(false);
    const sidebarRef = useRef<HTMLDivElement | null>(null);
    useClickAway(sidebarRef, () => setMobileSidebarVisible(false));

    const { pathname } = useLocation();
    const isMainPage = pathname === '/';

    return (
        <div className="relative flex min-h-[100vh] w-full flex-col">
            <header className="z-header sticky top-0 bg-black text-white">
                <div className="flex justify-between px-4 py-4 xl:container sm:px-8 md:px-14 xl:mx-auto xl:py-6 xl:pl-0 xl:pr-8">
                    <div className="xl:w-sidebar flex items-center xl:pl-8">
                        <TypedLink to="/">
                            <Logo />
                        </TypedLink>
                    </div>
                    <div className="hidden grow justify-center pl-8 md:flex xl:justify-start">
                        {isMainPage && (
                            <ul className="flex items-center gap-4">
                                <li>
                                    <a href="#balance">Мой баланс</a>
                                </li>
                                <li>
                                    <a href="#activities">Как заработать баллы</a>
                                </li>
                                <li>
                                    <a href="#products">На что потратить баллы</a>
                                </li>
                            </ul>
                        )}
                    </div>
                    <ThemeToggle className="hidden xl:block" />
                    <button
                        className="xl:hidden"
                        title="Открыть меню"
                        onClick={() => {
                            // The default behavior:
                            // 1. The sidebar is hidden
                            // 2. onClick shows the sidebar
                            // 3. useOutsideClick hides the sidebar
                            //
                            // To prevent this behavior we put onClick into setTimeout
                            // thereby we change the invokation order to:
                            // 1. The sidebar is hidden
                            // 2. useOutsideClick hides the sidebar
                            // 3. onClick shows the sidebar
                            setTimeout(() => setMobileSidebarVisible(true));
                        }}
                    >
                        <BurgerIcon />
                    </button>
                </div>
            </header>
            <div className="app-bg flex grow flex-col">
                <div className="relative flex w-full grow xl:container xl:mx-auto">
                    <aside
                        ref={sidebarRef}
                        className={twMerge(
                            //common
                            'bg-gray-dark dark:bg-gray-dark text-white dark:text-white xl:bg-white xl:text-black',
                            'border-r-gray flex flex-col overflow-y-auto border-r',
                            //mobile
                            mobileSidebarVisible ? 'translate-x-0' : 'translate-x-full',
                            'z-sidebar fixed bottom-0 left-0 right-0 top-0 transition-transform',
                            // tablet, screen
                            'sm:w-sidebar sm:left-auto',
                            // wide screen
                            'xl:right-auto xl:top-[92px] xl:translate-x-0',
                        )}
                    >
                        <div className="flex justify-between px-4 py-3 sm:px-8 sm:py-6 md:px-14 xl:hidden">
                            <ThemeToggle />
                            <button title="Закрыть меню" onClick={() => setMobileSidebarVisible(false)}>
                                <CloseIcon />
                            </button>
                        </div>
                        <Profile className="mt-14 sm:mt-8 xl:mt-8" />
                        <Nav className="mt-8 grow px-9 pb-3 sm:px-8 sm:pb-6 md:pb-10" />
                    </aside>
                    <main className="xl:pl-sidebar flex w-full grow flex-col xl:container">
                        <div className="grow px-4 pb-10 pt-6 sm:px-8 sm:py-8 md:px-14 md:pb-10 md:pt-8 xl:px-8 xl:pb-10 xl:pt-8">
                            <Suspense fallback={<Spinner />}>
                                <Outlet />
                            </Suspense>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}

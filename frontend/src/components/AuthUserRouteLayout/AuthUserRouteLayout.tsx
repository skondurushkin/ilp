import { ReactElement, ReactNode, Suspense, useEffect, useRef, useState } from 'react';

import { ReactComponent as BurgerIcon } from '../../assets/burger.svg';
import { ReactComponent as CloseIcon } from '../../assets/close.svg';
import { Logo } from '../Logo';
import { Nav } from './Nav';
import { Outlet } from 'react-router-dom';
import { PageSpinner } from '../Spinner';
import { Profile } from './Profile';
import { RouteLink } from '../../components/RouteLink';
import { ThemeToggle } from '../../theme';
import { createPortal } from 'react-dom';
import { twMerge } from 'tailwind-merge';
import useClickAway from 'react-use/lib/useClickAway';

const PAGE_NAV_NODE_ID = 'page-nav';

export function AuthUserRouteLayout(): ReactElement {
    const [mobileSidebarVisible, setMobileSidebarVisible] = useState(false);
    const sidebarRef = useRef<HTMLDivElement | null>(null);
    useClickAway(sidebarRef, () => setMobileSidebarVisible(false));

    return (
        <div className="relative flex min-h-[100vh] w-full flex-col">
            <header className="z-header h-header md:h-header-md fixed top-0 flex w-full bg-black text-white">
                <div className="flex grow justify-between px-4 py-3 xl:container sm:px-8 md:px-14 md:py-4 xl:mx-auto xl:pl-0 xl:pr-8">
                    <div className="xl:w-sidebar flex items-center xl:pl-8">
                        <RouteLink className="flex flex-col justify-between" to="/">
                            <Logo />
                        </RouteLink>
                    </div>
                    <div className="hidden grow pl-8 md:flex">
                        <nav id={PAGE_NAV_NODE_ID} className="flex grow justify-center xl:justify-start" />
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
            <div className="z-header dark:bg-gray-dark top-header md:top-header-md fixed -mt-0.5 h-0.5 w-full bg-white opacity-20 dark:opacity-100" />
            <div className="app-bg pt-header md:pt-header-md flex grow flex-col">
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
                            'xl:top-header-md xl:right-auto xl:translate-x-0',
                        )}
                    >
                        <div className="flex justify-between px-4 py-3 sm:px-8 sm:py-6 md:px-14 xl:hidden">
                            <ThemeToggle />
                            <button title="Закрыть меню" onClick={() => setMobileSidebarVisible(false)}>
                                <CloseIcon />
                            </button>
                        </div>
                        <Profile className="mt-14 sm:mt-8 xl:mt-8" />
                        <Nav
                            className="mt-8 grow px-9 pb-3 sm:px-8 sm:pb-6 md:pb-10"
                            onRequestNavClosing={() => {
                                setMobileSidebarVisible(false);
                            }}
                        />
                    </aside>
                    <main className="xl:pl-sidebar flex w-full grow flex-col xl:container">
                        <div className="pt-app-content-v-padding sm:py-app-content-v-padding-md grow px-4 pb-10 sm:px-8 md:px-14 md:pb-10 xl:px-8">
                            <Suspense fallback={<PageSpinner />}>
                                <Outlet />
                            </Suspense>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}

export interface PageNavProps {
    children?: ReactNode;
}

export function PageNav(props: PageNavProps): ReactElement | null {
    const { children } = props;
    const [domNode, setDomNode] = useState<HTMLElement | null>(null);
    useEffect(() => {
        const node = document.getElementById(PAGE_NAV_NODE_ID);
        if (node) {
            setDomNode(node);
        }
    }, []);
    if (!domNode) {
        return null;
    }
    return createPortal(children, domNode);
}

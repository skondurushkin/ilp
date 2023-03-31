import { ReactElement, ReactNode, useRef, useState } from 'react';

import { ReactComponent as BurgerIcon } from '../../assets/burger.svg';
import { ReactComponent as CloseIcon } from '../../assets/close.svg';
import { ReactComponent as Logo } from '../../assets/logo-light.svg';
import { Nav } from './Nav';
import { Profile } from './Profile';
import { ThemeToggle } from '../../theme';
import { TypedLink } from '../../router';
import { twMerge } from 'tailwind-merge';
import { useClickAway } from 'react-use';

export interface LayoutProps {
    menu?: ReactNode;
    children?: ReactNode;
}

export function Layout(props: LayoutProps): ReactElement {
    const { menu, children } = props;

    const [mobileSidebarVisible, setMobileSidebarVisible] = useState(false);
    const sidebarRef = useRef<HTMLDivElement | null>(null);
    useClickAway(sidebarRef, () => setMobileSidebarVisible(false));

    return (
        <div className="relative flex min-h-[100vh] w-full flex-col">
            <header className="sticky top-0 z-40 bg-black text-white">
                <div className="flex justify-between py-4 px-4 sm:px-8 md:px-14 xl:mx-auto xl:max-w-[1280px] xl:py-6 xl:pr-8 xl:pl-0">
                    <div className="flex items-center xl:w-[312px] xl:pl-8">
                        <TypedLink to="/">
                            <Logo />
                        </TypedLink>
                    </div>
                    <div className="hidden grow justify-center pl-8 md:flex xl:justify-start">{menu}</div>
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
                <div className="relative flex w-full w-full grow xl:mx-auto xl:max-w-[1280px]">
                    <aside
                        ref={sidebarRef}
                        className={twMerge(
                            //common
                            'bg-gray-dark text-white dark:bg-gray-dark dark:text-white xl:bg-white xl:text-black',
                            'flex flex-col border-r border-r-gray ',
                            //mobile
                            mobileSidebarVisible ? 'translate-x-0' : 'translate-x-full',
                            'fixed top-0 bottom-0 right-0 left-0 z-40 transition-transform',
                            // tablet, screen
                            'sm:left-auto sm:w-[312px]',
                            // wide screen
                            'xl:top-[92px] xl:right-auto xl:translate-x-0',
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
                    <main className="grow px-4 pt-6 pb-10 sm:py-8 sm:px-8 md:px-14 md:pb-10 md:pt-8 xl:ml-[312px] xl:px-8 xl:pt-8 xl:pb-10">
                        {children}
                    </main>
                </div>
            </div>
        </div>
    );
}

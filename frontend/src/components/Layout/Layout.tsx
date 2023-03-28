import { ReactElement, ReactNode } from 'react';

import { ReactComponent as Logo } from '../../assets/logo-light.svg';
import { Nav } from './Nav';
import { Profile } from './Profile';
import { ThemeToggle } from '../../theme';
import { TypedLink } from '../../router';

export interface LayoutProps {
    menu?: ReactNode;
    children?: ReactNode;
}

export function Layout(props: LayoutProps): ReactElement {
    const { menu, children } = props;

    return (
        <div className="relative flex min-h-[100vh] w-full flex-col">
            <header className="sticky top-0 z-40 bg-black text-white">
                <div className="flex justify-between py-6 pr-8 xl:mx-auto xl:max-w-[1280px]">
                    <div className="flex min-w-[312px] items-center pl-8">
                        <TypedLink to="/">
                            <Logo />
                        </TypedLink>
                    </div>
                    <div className="flex grow pl-8">{menu}</div>
                    <ThemeToggle />
                </div>
            </header>
            <div className="flex grow flex-col bg-white text-black dark:bg-gray-dark dark:text-white">
                <div className="flex grow xl:mx-auto xl:max-w-[1280px]">
                    <aside className="flex min-w-[312px] flex-col border-r border-r-gray px-8 pt-8 pb-10">
                        <Profile />
                        <Nav className="mt-8 grow" />
                    </aside>
                    <main className="grow px-8 pt-8 pb-10">{children}</main>
                </div>
            </div>
        </div>
    );
}

import { ComponentType, ReactElement, ReactNode } from 'react';
import { UserRole, hasRole, useAuth, useAuthActions } from '../../modules/auth';

import { ReactComponent as HomeIcon } from '../../assets/home.svg';
import { Link } from 'react-router-dom';
import { ReactComponent as LogoutIcon } from '../../assets/logout.svg';
import { ReactComponent as MessageIcon } from '../../assets/message.svg';
import { ReactComponent as SlidersIcon } from '../../assets/sliders.svg';
import { ReactComponent as TextFileIcon } from '../../assets/text-file.svg';
import { TypedNavLink } from '../../router';
import { ReactComponent as UserIcon } from '../../assets/user.svg';
import { twMerge } from 'tailwind-merge';
import { useConfig } from '../../modules/config';

export interface NavProps {
    className?: string;
}

type SvgProps = JSX.IntrinsicElements['svg'];

export function Nav(props: NavProps): ReactElement {
    const { className } = props;
    const { signOut } = useAuthActions();
    const auth = useAuth();

    const navItemClassNameFn = (state: { isActive: boolean }): string | undefined => {
        return state.isActive ? 'block bg-primary text-black' : undefined;
    };

    const navItemFn =
        (label: string, lightIcon: ComponentType<SvgProps>) =>
        /* eslint-disable-next-line react/display-name */
        (state: { isActive: boolean }): ReactElement => {
            return (
                <NavItem icon={lightIcon} active={state.isActive}>
                    {label}
                </NavItem>
            );
        };

    const config = useConfig();
    const supportUrl = config ? `mailto:${config.adminEmail}?subject=${config.supportSubject}` : '#';

    return (
        <nav className={twMerge('flex flex-col', className)}>
            <ul className="flex grow flex-col">
                <li>
                    <TypedNavLink to="/" className={navItemClassNameFn}>
                        {navItemFn('Главная страница', HomeIcon)}
                    </TypedNavLink>
                </li>
                <li>
                    <TypedNavLink to="/profile" className={navItemClassNameFn}>
                        {navItemFn('Личный кабинет', UserIcon)}
                    </TypedNavLink>
                </li>
                <li>
                    <TypedNavLink to="/rules" className={navItemClassNameFn}>
                        {navItemFn('Правила программы', TextFileIcon)}
                    </TypedNavLink>
                </li>
                <li>
                    <Link to={supportUrl}>
                        <NavItem icon={MessageIcon}>Написать в поддержку</NavItem>
                    </Link>
                </li>
                {hasRole(auth, UserRole.ADMIN) && (
                    <li>
                        <TypedNavLink to="/admin" className={navItemClassNameFn}>
                            {navItemFn('Администрирование', SlidersIcon)}
                        </TypedNavLink>
                    </li>
                )}
                <li className="grow"></li>
                <li>
                    <button onClick={() => signOut()}>
                        <NavItem icon={LogoutIcon}>Выйти из аккаунта</NavItem>
                    </button>
                </li>
            </ul>
        </nav>
    );
}

interface NavItemProps {
    children?: ReactNode;
    icon: ComponentType<SvgProps>;
    active?: boolean;
}

function NavItem(props: NavItemProps): ReactElement {
    const { children, icon: Icon, active } = props;
    return (
        <div className="flex items-center gap-4 whitespace-nowrap py-2 px-4 text-left leading-[18px]">
            <Icon
                className={
                    active
                        ? 'outlined-icon-light'
                        : 'outlined-icon-dark xl:outlined-icon-light dark:xl:outlined-icon-dark'
                }
            />
            {children}
        </div>
    );
}

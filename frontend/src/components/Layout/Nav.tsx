import { ComponentType, ReactElement, ReactNode } from 'react';
import { UserRole, hasRole, useAuth, useAuthActions } from '../../modules/auth';

import { ReactComponent as HomeDarkIcon } from '../../assets/home-dark.svg';
import { ReactComponent as HomeLightIcon } from '../../assets/home-light.svg';
import { ReactComponent as LogoutDarkIcon } from '../../assets/logout-dark.svg';
import { ReactComponent as LogoutLightIcon } from '../../assets/logout-light.svg';
import { ReactComponent as MessageDarkIcon } from '../../assets/message-dark.svg';
import { ReactComponent as MessageLightIcon } from '../../assets/message-light.svg';
import { ReactComponent as SlidersDarkIcon } from '../../assets/sliders-dark.svg';
import { ReactComponent as SlidersLightIcon } from '../../assets/sliders-light.svg';
import { ReactComponent as TextFileDarkIcon } from '../../assets/text-file-dark.svg';
import { ReactComponent as TextFileLightIcon } from '../../assets/text-file-light.svg';
import { TypedNavLink } from '../../router';
import { ReactComponent as UserDarkIcon } from '../../assets/user-dark.svg';
import { ReactComponent as UserLightIcon } from '../../assets/user-light.svg';
import { classnames } from '../../utils/classnames';
import { useTheme } from '../../theme';

export interface NavProps {
    className?: string;
}

type Svg = ComponentType<JSX.IntrinsicElements['svg']>;

export function Nav(props: NavProps): ReactElement {
    const { className } = props;
    const { signOut } = useAuthActions();
    const auth = useAuth();

    const navItemClassNameFn = (state: { isActive: boolean }): string | undefined => {
        return state.isActive ? 'block bg-green text-black' : undefined;
    };

    const navItemFn =
        (label: string, lightIcon: Svg, darkIcon: Svg) =>
        /* eslint-disable-next-line react/display-name */
        (state: { isActive: boolean }): ReactElement => {
            return (
                <NavItem lightIcon={state.isActive ? darkIcon : lightIcon} darkIcon={darkIcon}>
                    {label}
                </NavItem>
            );
        };

    return (
        <nav className={classnames('flex flex-col', className)}>
            <ul className="flex grow flex-col">
                <li>
                    <TypedNavLink to="/" className={navItemClassNameFn}>
                        {navItemFn('Главная страница', HomeLightIcon, HomeDarkIcon)}
                    </TypedNavLink>
                </li>
                <li>
                    <TypedNavLink to="/profile" className={navItemClassNameFn}>
                        {navItemFn('Личный кабинет', UserLightIcon, UserDarkIcon)}
                    </TypedNavLink>
                </li>
                {hasRole(auth, UserRole.ADMIN) && (
                    <li>
                        <TypedNavLink to="/admin" className={navItemClassNameFn}>
                            {navItemFn('Администрирование', SlidersLightIcon, SlidersDarkIcon)}
                        </TypedNavLink>
                    </li>
                )}
                <li>
                    <TypedNavLink to="/rules" className={navItemClassNameFn}>
                        {navItemFn('Правила программы', TextFileLightIcon, TextFileDarkIcon)}
                    </TypedNavLink>
                </li>
                <li>
                    <TypedNavLink to="/support" className={navItemClassNameFn}>
                        {navItemFn('Написать в поддержку', MessageLightIcon, MessageDarkIcon)}
                    </TypedNavLink>
                </li>
                <li className="grow"></li>
                <li>
                    <button onClick={() => signOut()}>
                        <NavItem lightIcon={LogoutLightIcon} darkIcon={LogoutDarkIcon}>
                            Выйти из аккаунта
                        </NavItem>
                    </button>
                </li>
            </ul>
        </nav>
    );
}

interface NavItemProps {
    children?: ReactNode;
    lightIcon: Svg;
    darkIcon: Svg;
}

function NavItem(props: NavItemProps): ReactElement {
    const { children, lightIcon, darkIcon } = props;
    const theme = useTheme();
    const Icon = theme === 'light' ? lightIcon : darkIcon;
    return (
        <div className="flex items-center gap-4 whitespace-nowrap py-2 px-4 text-left leading-[18px]">
            <Icon />
            {children}
        </div>
    );
}

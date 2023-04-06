import { ComponentType, ReactElement, ReactNode, useMemo } from 'react';
import { UserRole, hasRole, useAuth, useAuthActions } from '../../modules/auth';

import { ReactComponent as HomeIcon } from '../../assets/home.svg';
import { Link } from 'react-router-dom';
// import { Link } from 'react-router-dom';
import { ReactComponent as LogoutIcon } from '../../assets/logout.svg';
import { ReactComponent as MessageIcon } from '../../assets/message.svg';
import { ReactComponent as SlidersIcon } from '../../assets/sliders.svg';
import { ReactComponent as TextFileIcon } from '../../assets/text-file.svg';
import { TypedNavLink } from '../../router';
import { ReactComponent as UserIcon } from '../../assets/user.svg';
import { twMerge } from 'tailwind-merge';
import { useConfig } from '../../modules/config';
import { useIsXsScreen } from '../useBreakpoint';

export interface NavProps {
    className?: string;
    onRequestNavClosing: () => void;
}

type SvgProps = JSX.IntrinsicElements['svg'];

type NavItem = NavLinkItem | NavButtonItem | NavSpacerItem;

interface NavLinkItem {
    to: string;
    label: string;
    icon: ComponentType<SvgProps>;
    children?: NavItem[];
}

interface NavButtonItem {
    action: () => void;
    label: string;
    icon: ComponentType<SvgProps>;
}

interface NavSpacerItem {
    spacer: true;
}

export function Nav(props: NavProps): ReactElement {
    const { className, onRequestNavClosing } = props;
    const { signOut } = useAuthActions();
    const auth = useAuth();

    const config = useConfig();

    const nav = useMemo(() => {
        const supportUrl = config ? `mailto:${config.adminEmail}?subject=${config.supportEmailSubject}` : '#';
        const list: NavItem[] = [
            { to: '/', label: 'Главная страница', icon: HomeIcon },
            { to: '/profile', label: 'Личный кабинет', icon: UserIcon },
            { to: '/rules', label: 'Правила программы', icon: TextFileIcon },
            { to: supportUrl, label: 'Написать в поддержку', icon: MessageIcon },
        ];
        if (hasRole(auth, UserRole.ADMIN)) {
            list.push({
                to: '/admin',
                label: 'Администрирование',
                icon: SlidersIcon,
                children: [
                    { to: '/admin/products', label: 'Товары', icon: MessageIcon },
                    { to: '/admin/activities', label: 'Активности', icon: MessageIcon },
                    { to: '/admin/users', label: 'Пользователи', icon: MessageIcon },
                    { to: '/admin/write-offs', label: 'Заказы', icon: MessageIcon },
                ],
            });
        }
        list.push({ spacer: true });
        list.push({ action: () => signOut(), label: 'Выйти из аккаунта', icon: LogoutIcon });
        return list;
    }, [auth, signOut, config]);

    return (
        <nav className={twMerge('flex flex-col', className)}>
            <NavList className="grow" items={nav} onRequestNavClosing={onRequestNavClosing} />
        </nav>
    );
}

interface NavListProps {
    className?: string;
    items: NavItem[];
    onRequestNavClosing: () => void;
}

function NavList(props: NavListProps): ReactElement {
    const { className, items, onRequestNavClosing } = props;
    return (
        <ul className={twMerge('flex flex-col', className)}>
            {items.map((item, i) => {
                if ('spacer' in item) {
                    return <li className="grow" key={i} />;
                }

                if ('action' in item) {
                    return (
                        <li key={i}>
                            <NavButtonElement item={item} onRequestNavClosing={onRequestNavClosing} />
                        </li>
                    );
                }

                return (
                    <li key={i}>
                        <NavLinkElement item={item} onRequestNavClosing={onRequestNavClosing} />
                        {item.children && (
                            <NavList
                                className="ml-10"
                                items={item.children}
                                onRequestNavClosing={onRequestNavClosing}
                            />
                        )}
                    </li>
                );
            })}
        </ul>
    );
}

interface NavLinkElementProps {
    item: NavLinkItem;
    onRequestNavClosing: () => void;
}

function NavLinkElement(props: NavLinkElementProps): ReactElement {
    const { item, onRequestNavClosing } = props;

    const isXsScreen = useIsXsScreen();

    const navItemClassNameFn = (state: { isActive: boolean }): string | undefined => {
        return state.isActive ? 'block bg-primary text-black' : undefined;
    };

    const navItemFn =
        (label: string, lightIcon: ComponentType<SvgProps>) =>
        /* eslint-disable-next-line react/display-name */
        (state: { isActive: boolean }): ReactElement =>
            (
                <NavItemContent icon={lightIcon} active={state.isActive}>
                    {label}
                </NavItemContent>
            );

    const hadleClick = () => {
        if (isXsScreen) {
            onRequestNavClosing();
        }
    };

    if (item.to.startsWith('#') || item.to.startsWith('mailto:')) {
        return (
            <Link to={item.to} onClick={hadleClick}>
                <NavItemContent icon={item.icon}>{item.label}</NavItemContent>
            </Link>
        );
    }

    return (
        <TypedNavLink to={item.to} className={navItemClassNameFn} onClick={hadleClick}>
            {navItemFn(item.label, item.icon)}
        </TypedNavLink>
    );
}

interface NavButtonElementProps {
    item: NavButtonItem;
    onRequestNavClosing: () => void;
}

function NavButtonElement(props: NavButtonElementProps): ReactElement {
    const { item, onRequestNavClosing } = props;
    const isXsScreen = useIsXsScreen();

    return (
        <button
            onClick={() => {
                if (isXsScreen) {
                    onRequestNavClosing();
                }
                item.action();
            }}
        >
            <NavItemContent icon={item.icon}>{item.label}</NavItemContent>
        </button>
    );
}

interface NavItemContentProps {
    children?: ReactNode;
    icon: ComponentType<SvgProps>;
    active?: boolean;
}

function NavItemContent(props: NavItemContentProps): ReactElement {
    const { children, icon: Icon, active } = props;
    return (
        <div className="flex items-center gap-4 whitespace-nowrap px-4 py-2 text-left leading-[18px]">
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

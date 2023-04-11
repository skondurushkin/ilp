import { Link } from 'react-router-dom';
import { ReactElement } from 'react';
import styles from './Breadcrumbs.module.css';
import { twMerge } from 'tailwind-merge';

export interface BreadcrumbsProps {
    className?: string;
    items: Breadcrumb[];
}

export interface Breadcrumb {
    label: string;
    link?: string;
}

export function Breadcrumbs(props: BreadcrumbsProps): ReactElement {
    const { className, items } = props;

    return (
        <ul
            className={twMerge(
                styles.breadcrumbs,
                'flex flex-nowrap items-center gap-3 overflow-x-scroll text-ellipsis whitespace-nowrap',
                className,
            )}
        >
            {items.map((item, i) => {
                const isLast = i === items.length - 1;
                const content =
                    item.link && !isLast ? <Link to={item.link}>{item.label}</Link> : <span>{item.label}</span>;
                return (
                    <li
                        key={item.label}
                        className={twMerge(
                            "flex items-center gap-3 whitespace-nowrap transition-colors duration-300 after:block after:h-2 after:w-2 after:rounded-full after:bg-[#D9D9D9] after:content-[''] last:after:hidden hover:text-black dark:hover:text-white",
                            isLast ? 'text-black dark:text-white' : 'text-gray',
                        )}
                    >
                        <h2 className="text-h2">{content}</h2>
                    </li>
                );
            })}
        </ul>
    );
}

import { Link } from 'react-router-dom';
import { ReactElement } from 'react';
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
                'flex flex-nowrap items-center gap-3 overflow-hidden text-ellipsis whitespace-nowrap',
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
                            "text-h2 flex items-center gap-3 whitespace-nowrap after:block after:h-2 after:w-2 after:rounded-full after:bg-[#D9D9D9] after:content-[''] last:after:hidden",
                            isLast ? 'text-black dark:text-white' : 'text-gray',
                        )}
                    >
                        {content}
                    </li>
                );
            })}
        </ul>
    );
}
import { ReactElement, ReactNode } from 'react';

import { twMerge } from 'tailwind-merge';

export interface PageSectionProps {
    id?: string;
    className?: string;
    caption?: string;
    children?: ReactNode;
}

export function PageSection(props: PageSectionProps): ReactElement {
    const { id, className, caption, children } = props;

    return (
        <section className={twMerge('relative', className)}>
            <div id={id} className="-top-app-content-v-offset -md:top-app-content-v-offset-md absolute"></div>
            {caption && <h2 className="mb-3 text-xl md:mb-8 md:text-2xl">{caption}</h2>}
            {children}
        </section>
    );
}

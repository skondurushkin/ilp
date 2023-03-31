import { ReactElement, ReactNode } from 'react';

import { classnames } from '../utils/classnames';

export interface PageSectionProps {
    id?: string;
    className?: string;
    caption?: string;
    children?: ReactNode;
}

export function PageSection(props: PageSectionProps): ReactElement {
    const { id, className, caption, children } = props;

    // <div id={id} className="absolute -top-[126px]"></div> is just an anchor to smooth csrolling/
    //
    // 120 = 88 + 32, where 88 is the header height and 32 is the padding of the content area (<main>).
    return (
        <section className={classnames('relative', className)}>
            <div id={id} className="absolute -top-[120px]"></div>
            {caption && <h2 className="mb-3 text-xl md:mb-8 md:text-2xl">{caption}</h2>}
            {children}
        </section>
    );
}

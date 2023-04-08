import 'swiper/swiper.min.css';

import { Key, ReactElement, ReactNode } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import { twMerge } from 'tailwind-merge';
import { useIsXsScreen } from './useBreakpoint';

export interface GridProps {
    className?: string;
    children?: ReactNode;
}

/**
 * Render a three columns grid for all screens exept the XS screen. For the XL screen it renders a carousel.
 */
export function Grid(props: GridProps): ReactElement {
    const { className, children } = props;

    const isXsScreen = useIsXsScreen();

    const elements: ReactNode[] = [];
    if (Array.isArray(children)) {
        elements.push(...children.flat(Number.MAX_VALUE));
    } else {
        elements.push(children);
    }

    if (isXsScreen) {
        return (
            <Swiper className={className} cssMode slidesPerView={1.1} spaceBetween={16}>
                {elements
                    .filter(
                        (c): c is Exclude<ReactNode, boolean | null | undefined> =>
                            c !== undefined && c !== null && typeof c !== 'boolean',
                    )
                    .map((el, i) => {
                        let key: Key | null = null;
                        if (typeof el === 'string') {
                            key = el;
                        } else if (typeof el === 'number') {
                            key = el;
                        } else if ('key' in el) {
                            key = el.key;
                        }
                        if (key == null) {
                            key = i;
                        }
                        return <SwiperSlide key={key}>{el}</SwiperSlide>;
                    })}
            </Swiper>
        );
    }

    return <div className={twMerge('grid auto-rows-auto grid-cols-3 gap-3 xl:gap-8', className)}>{elements}</div>;
}

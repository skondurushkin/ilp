import 'swiper/swiper.min.css';

import { Swiper, SwiperSlide } from 'swiper/react';

import { ReactElement } from 'react';
import { twMerge } from 'tailwind-merge';
import { useIsXsScreen } from './useBreakpoint';

export interface GridProps {
    className?: string;
    children?: (boolean | JSX.Element[])[];
}

/**
 * Render a three columns grid for all screens exept the XS screen. For the XL screen it renders a carousel.
 */
export function Grid(props: GridProps): ReactElement {
    const { className, children } = props;

    const isXsScreen = useIsXsScreen();

    const elements: ReactElement[] = [];
    if (Array.isArray(children)) {
        elements.push(...children.flat().filter((c): c is ReactElement => typeof c !== 'boolean'));
    }

    if (isXsScreen) {
        return (
            <Swiper slidesPerView={1} spaceBetween={16} className={className}>
                {elements.map((el) => (
                    <SwiperSlide key={el.key}>{el}</SwiperSlide>
                ))}
            </Swiper>
        );
    }

    return <div className={twMerge('grid auto-rows-auto grid-cols-3 gap-3 xl:gap-8', className)}>{elements}</div>;
}

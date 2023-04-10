import { ReactElement, useState } from 'react';

import { ImageSkeleton } from './Skeleton';
import { VerticalBrackets } from './VerticalBrackets';
import { twMerge } from 'tailwind-merge';
import useUpdateEffect from 'react-use/lib/useUpdateEffect';

export interface ProductImageProps {
    className?: string;
    imageClassName?: string;
    src: string;
    alt: string;
}

export function ProductImage(props: ProductImageProps): ReactElement {
    const { className, imageClassName, src, alt } = props;

    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    useUpdateEffect(() => {
        setIsLoading(true);
        setIsError(false);
    }, [src]);

    const isPlaceholder = isError || isLoading;

    return (
        <div className={twMerge('relative w-full bg-black pt-[87%] sm:pt-[100%] md:pt-[81%] xl:pt-[78%]', className)}>
            <VerticalBrackets size="4" className="absolute left-0 top-0 h-full w-full">
                <div className={twMerge('h-full w-full', imageClassName)}>
                    {isPlaceholder && <ImageSkeleton className="h-full w-full rounded-none" />}
                    <img
                        className={twMerge(
                            'h-full w-full object-contain',
                            isPlaceholder && 'absolute left-0 top-0 opacity-0',
                        )}
                        src={src}
                        alt={alt}
                        onError={() => {
                            setIsLoading(false);
                            setIsError(true);
                        }}
                        onLoad={() => {
                            setIsLoading(false);
                            setIsError(false);
                        }}
                    />
                </div>
            </VerticalBrackets>
        </div>
    );
}

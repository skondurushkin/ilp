import { ReactElement, ReactNode } from 'react';

import { twMerge } from 'tailwind-merge';

export interface SkeletonContainerProps {
    className?: string;
    children?: ReactNode;
}

export function SkeletonContainer(props: SkeletonContainerProps): ReactElement {
    const { className, children } = props;
    return <div className={twMerge('animate-pulse', className)}>{children}</div>;
}

export interface SkeletonProps {
    className?: string;
}

export function Skeleton(props: SkeletonProps): ReactElement {
    const { className } = props;
    return <div className={twMerge('rounded-full bg-gray', className)} />;
}
export interface ImageSkeletonProps {
    className?: string;
}

export interface BigTextSkeletonProps {
    className?: string;
    textSize?: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10';
}

export function BigTextSkeleton(props: BigTextSkeletonProps): ReactElement {
    const { className, textSize = '4' } = props;
    const textSizeClassName = `h-${textSize}`;

    return (
        <div className={twMerge('max-w-lg space-y-2.5', className)}>
            <div className="flex w-full items-center space-x-2">
                <div className={twMerge('w-32 rounded-full bg-gray', textSizeClassName)}></div>
                <div className={twMerge('w-24 rounded-full bg-gray', textSizeClassName)}></div>
                <div className={twMerge('w-full rounded-full bg-gray', textSizeClassName)}></div>
            </div>
            <div className="flex w-full max-w-[480px] items-center space-x-2">
                <div className={twMerge('w-full rounded-full bg-gray', textSizeClassName)}></div>
                <div className={twMerge('w-full rounded-full bg-gray', textSizeClassName)}></div>
                <div className={twMerge('w-24 rounded-full bg-gray', textSizeClassName)}></div>
            </div>
            <div className="flex w-full max-w-[400px] items-center space-x-2">
                <div className={twMerge('w-full rounded-full bg-gray', textSizeClassName)}></div>
                <div className={twMerge('w-80 rounded-full bg-gray', textSizeClassName)}></div>
                <div className={twMerge('w-full rounded-full bg-gray', textSizeClassName)}></div>
            </div>
            <div className="flex w-full max-w-[480px] items-center space-x-2">
                <div className={twMerge('w-full rounded-full bg-gray', textSizeClassName)}></div>
                <div className={twMerge('w-full rounded-full bg-gray', textSizeClassName)}></div>
                <div className={twMerge('w-24 rounded-full bg-gray', textSizeClassName)}></div>
            </div>
            <div className="flex w-full max-w-[440px] items-center space-x-2">
                <div className={twMerge('w-32 rounded-full bg-gray', textSizeClassName)}></div>
                <div className={twMerge('w-24 rounded-full bg-gray', textSizeClassName)}></div>
                <div className={twMerge('w-full rounded-full bg-gray', textSizeClassName)}></div>
            </div>
            <div className="flex w-full max-w-[360px] items-center space-x-2">
                <div className={twMerge('w-full rounded-full bg-gray', textSizeClassName)}></div>
                <div className={twMerge('w-80 rounded-full bg-gray', textSizeClassName)}></div>
                <div className={twMerge('w-full rounded-full bg-gray', textSizeClassName)}></div>
            </div>
        </div>
    );
}

export function ImageSkeleton(props: ImageSkeletonProps): ReactElement {
    const { className } = props;
    return (
        <div className={twMerge('flex items-center justify-center rounded bg-gray', className)}>
            <svg
                className="text-gray-200 h-12 w-12"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 640 512"
            >
                <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
            </svg>
        </div>
    );
}

export interface ButtonSkeletonProps {
    className?: string;
}

export function ButtonSkeleton(props: ButtonSkeletonProps): ReactElement {
    const { className } = props;
    return <Skeleton className={twMerge('h-8 md:h-10', className)} />;
}

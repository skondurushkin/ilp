import { ReactComponent as SpinnerSVG } from '../assets/spinner.svg';
import { twMerge } from 'tailwind-merge';

export interface SpinnerProps {
    className?: string;
}

export const Spinner = (props: SpinnerProps) => {
    const { className } = props;
    return (
        <div className={twMerge('h-8 w-8 animate-spin', className)}>
            <SpinnerSVG />
        </div>
    );
};

export const PageSpinner = () => {
    return (
        <div className="flex h-full w-full items-center justify-center">
            <Spinner />
        </div>
    );
};

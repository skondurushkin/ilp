import { twMerge } from 'tailwind-merge';

export interface SpinnerProps {
    color?: string;
    className?: string;
}

export const Spinner = (props: SpinnerProps) => {
    const { className, color = 'currentColor' } = props;
    return (
        <svg
            className={twMerge('h-8 w-8 animate-spin', className)}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
        >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke={color} strokeWidth="4"></circle>
            <path
                className="opacity-75"
                fill={color}
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
        </svg>
    );
};

export const PageSpinner = () => {
    return (
        <div className="flex h-full w-full items-center justify-center">
            <Spinner />
        </div>
    );
};

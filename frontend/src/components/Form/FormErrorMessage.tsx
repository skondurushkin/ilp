import { ControllerFieldState } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

interface FormErrorMessageProps {
    error: ControllerFieldState['error'];
}

export const FormErrorMessage = (props: FormErrorMessageProps) => {
    const { error } = props;

    return (
        <div className={twMerge('h-3 opacity-0 transition-opacity duration-300 ease-in', !!error && 'opacity-100')}>
            {!!error && <p className="text-small text-error ">{error.message}</p>}
        </div>
    );
};

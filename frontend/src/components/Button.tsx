import { ReactElement } from 'react';
import { twMerge } from 'tailwind-merge';

export type ButtonProps = JSX.IntrinsicElements['button'] & {
    primary?: boolean;
    size?: 'normal' | 'small';
    black?: boolean;
    textBlack?: boolean;
};

export function Button(props: ButtonProps): ReactElement {
    const { className, black, primary, textBlack, size = 'normal', ...rest } = props;
    return (
        <button
            {...rest}
            className={twMerge(
                'btn',
                black && 'btn-black',
                primary && 'btn-primary',
                textBlack && 'text-black',
                size === 'small' && 'btn-small',
                className,
            )}
        />
    );
}

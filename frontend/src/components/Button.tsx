import { ReactElement } from 'react';
import { twMerge } from 'tailwind-merge';

export type ButtonProps = JSX.IntrinsicElements['button'] & { primary?: boolean };

export function Button(props: ButtonProps): ReactElement {
    const { className, primary, ...rest } = props;
    return <button {...rest} className={twMerge('btn', primary && 'btn-primary', className)} />;
}

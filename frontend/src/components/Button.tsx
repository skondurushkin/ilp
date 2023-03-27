import { ReactElement } from 'react';
import { classnames } from '../utils/classnames';

export type ButtonProps = JSX.IntrinsicElements['button'] & { primary?: boolean };

export function Button(props: ButtonProps): ReactElement {
    const { className, primary, ...rest } = props;
    return (
        <button
            {...rest}
            className={classnames(
                'py-2 px-3 leading-[18px] text-black',
                'border-0 disabled:text-gray',
                'focus:shadow-[0_4px_4px_rgba(0,0,0,0.25)]',
                !primary && 'border border-gray bg-white',
                primary && 'bg-green',
                className,
            )}
        />
    );
}

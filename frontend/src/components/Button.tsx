import { ReactElement } from 'react';
import { classnames } from '../utils/classnames';

export type ButtonProps = JSX.IntrinsicElements['button'] & { primary?: boolean };

export function Button(props: ButtonProps): ReactElement {
    const { className, primary, ...rest } = props;
    return <button {...rest} className={classnames('btn', primary && 'btn-primary', className)} />;
}

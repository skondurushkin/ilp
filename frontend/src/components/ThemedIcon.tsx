import { ComponentType, ReactElement } from 'react';

import { useTheme } from '../theme';

export type ThemedIconProps = SvgProps & {
    light: ComponentType<SvgProps>;
    dark: ComponentType<SvgProps>;
};

type SvgProps = JSX.IntrinsicElements['svg'];

export function ThemedIcon(props: ThemedIconProps): ReactElement {
    const { className, light, dark } = props;
    const theme = useTheme();
    const Icon = theme === 'light' ? light : dark;
    return <Icon className={className} />;
}

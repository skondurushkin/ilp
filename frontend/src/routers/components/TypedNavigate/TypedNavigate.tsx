import { Navigate } from 'react-router-dom';
import { RoutesPath } from '../../routes.types';
import type { NavigateProps } from 'react-router-dom';

export const TypedNavigate = <P extends RoutesPath>({ to, ...props }: NavigatePropsAll<P>) => {
    return <Navigate to={to} {...props} />;
};

interface TypedNavigateProps<P extends RoutesPath> {
    to: P;
}

export type NavigatePropsAll<P extends RoutesPath> = TypedNavigateProps<P> & NavigateProps;

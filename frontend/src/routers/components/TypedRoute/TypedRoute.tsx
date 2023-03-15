import { Route } from 'react-router-dom';
import { RoutesPath } from '../../routes.types';
import type { RouteProps } from 'react-router-dom';

export const TypedRoute = <P extends RoutesPath>({
    path,
    ...props
}: TypedRoutePropsAll<P>): React.ReactElement<RouteProps> | null => {
    return <Route path={path} {...props} />;
};

interface TypedRouteProps<P extends RoutesPath> {
    path: P;
}

export type TypedRoutePropsAll<P extends RoutesPath> = TypedRouteProps<P> & RouteProps;

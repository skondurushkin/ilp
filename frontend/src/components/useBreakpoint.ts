import createBreakpoint from 'react-use/lib/factory/createBreakpoint';
import { screens } from '../../screens';

const useBreakpoint = createBreakpoint(screens);

export function useIsXsScreen(): boolean {
    const breakpoint = useBreakpoint();
    return breakpoint === 'xs';
}

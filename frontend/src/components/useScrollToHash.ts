import { useEffect } from 'react';
import { useLocation } from 'react-router';

export function useScrollToHash(rerunOnHashChange = false): void {
    const { pathname, hash, key } = useLocation();

    const deps = rerunOnHashChange ? [pathname, hash, key] : [];
    useEffect(() => {
        if (hash === '') {
            window.scrollTo(0, 0);
            return;
        }

        setTimeout(() => {
            const id = hash.replace('#', '');
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView();
            }
        }, 0);
    }, deps);
}

import { PageRequest } from './generated';
import { range } from '../utils/range';

export interface PaginatedResponse<T> {
    total?: number;
    page?: number;
    pageSize?: number;
    hasNext?: boolean;
    hasPrev?: boolean;
    results?: Array<T>;
}

export function fetchAll<T>(
    loader: (requestParameter: { pageRequest: PageRequest }) => Promise<PaginatedResponse<T>>,
): Promise<T[]> {
    const pageSize = 30;
    return loader({ pageRequest: { pageSize, page: 0, config: {} } }).then((res) => {
        if (res.total === undefined || res.total === 0) {
            return [];
        }
        // const pageCount = Math.floor(res.total / pageSize) + (res.total % pageSize) === 0 ? 0 : 1;
        const firstPage = res.results || [];
        if (res.total === 1) {
            return firstPage;
        }
        return Promise.all(range(res.total - 1).map((p) => loader({ pageRequest: { page: p + 1, pageSize } }))).then(
            (responses) => {
                const pages = [firstPage, ...responses.map((r) => r.results)].filter(isDefined);
                return pages.flat();
            },
        );
    });
}

function isDefined<T>(v: T | undefined): v is T {
    return v !== undefined;
}

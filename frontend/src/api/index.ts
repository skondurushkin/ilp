import { createAPI } from './api';

export const api = createAPI({
    basePath: '',
});

export * from './generated';
export * from './fetchAll';

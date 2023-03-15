import { http } from '../services/http';
import { IlpApi } from './generated';

export const api = {
    IlpApi: new IlpApi(undefined, undefined, http.axios),
};

export * from './generated';

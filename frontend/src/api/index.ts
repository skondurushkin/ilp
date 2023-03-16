import { IlpApi, Configuration } from './generated';

const config = new Configuration({
    basePath: '',
});

export const api = {
    IlpApi: new IlpApi(config),
};

export * from './generated';

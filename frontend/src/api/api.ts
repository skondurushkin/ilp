import {
    ActivityApi,
    ArticleApi,
    AuthApi,
    Configuration,
    ConfigurationParameters,
    ProfileApi,
    SettingsApi,
    WalletApi,
} from './generated';

function createInternalApi(config: ConfigurationParameters) {
    const cnf = new Configuration(config);
    return {
        auth: new AuthApi(cnf),
        profile: new ProfileApi(cnf),
        activity: new ActivityApi(cnf),
        article: new ArticleApi(cnf),
        wallet: new WalletApi(cnf),
        settings: new SettingsApi(cnf),
    };
}

export type InternalAPI = ReturnType<typeof createInternalApi>;

export type API = InternalAPI & { setAuthToken: (token: string | undefined) => void };

export function createAPI(cnf: ConfigurationParameters): API {
    const inst: API = {
        ...createInternalApi(cnf),
        setAuthToken: function (this: API, token): void {
            const headers = token !== undefined ? { Authorization: `Bearer ${token}` } : undefined;
            Object.assign(this, createInternalApi({ ...cnf, headers }));
        },
    };
    return inst;
}

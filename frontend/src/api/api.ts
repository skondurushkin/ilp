import {
    ActivityApi,
    AdminApi,
    ArticleApi,
    AuthApi,
    Configuration,
    ConfigurationParameters,
    Middleware,
    ProfileApi,
    ResponseContext,
    SettingsApi,
    WalletApi,
} from './generated';

import { DEFAULT_API_ERROR_MSG } from './constants';
import { toast } from 'react-toastify';

function createInternalApi(config: ConfigurationParameters) {
    const cnf = new Configuration(config);
    return {
        auth: new AuthApi(cnf),
        profile: new ProfileApi(cnf),
        activity: new ActivityApi(cnf),
        article: new ArticleApi(cnf),
        wallet: new WalletApi(cnf),
        settings: new SettingsApi(cnf),
        admin: new AdminApi(cnf),
    };
}

class ErrorContentMiddleware implements Middleware {
    public async post?(context: ResponseContext): Promise<Response | void> {
        if (context.response.status >= 400) {
            const json = await context.response
                .clone()
                .json()
                .then((j) => j);

            if (context.response.status >= 500) {
                toast(DEFAULT_API_ERROR_MSG, {
                    autoClose: false,
                    type: 'error',
                });
            }

            return Promise.reject({
                status: context.response.status,
                ...json,
            });
        }

        return Promise.resolve(context.response);
    }
}

export type InternalAPI = ReturnType<typeof createInternalApi>;

export type API = InternalAPI & { setAuthToken: (token: string | undefined) => void };

export function createAPI(cnf: ConfigurationParameters): API {
    const inst: API = {
        ...createInternalApi(cnf),
        setAuthToken: function (this: API, token): void {
            const headers = token !== undefined ? { Authorization: `Bearer ${token}` } : undefined;
            Object.assign(this, createInternalApi({ ...cnf, headers, middleware: [new ErrorContentMiddleware()] }));
        },
    };
    return inst;
}

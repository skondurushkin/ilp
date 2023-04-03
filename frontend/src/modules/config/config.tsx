import { QueryObserverSuccessResult, UseQueryOptions, UseQueryResult, useQueries } from 'react-query';
import { ReactElement, ReactNode, createContext, useContext } from 'react';
import { SettingResponse, api } from '../../api';

export interface Config {
    adminEmail: string;
    supportEmailSubject: string;
    requestTokenEmailSubject: string;
}

const ConfigContext = createContext<Config | undefined>(undefined);

export interface ConfigContextProps {
    children?: ReactNode;
}

export function ConfigProvider(props: ConfigContextProps): ReactElement {
    const queries = useQueries([
        createSettingQuery('admin.email'),
        createSettingQuery('subject.accrual'),
        createSettingQuery('subject.support'),
    ]);
    const successQueries = queries.filter(isSuccessQuery);
    let config: Config | undefined;
    if (successQueries.length === queries.length) {
        const [adminEmailQuery, supportEmailSubjectQuery, requestTokenEmailSubjectQuery] = successQueries;
        config = {
            adminEmail: adminEmailQuery.data.value,
            supportEmailSubject: supportEmailSubjectQuery.data.value,
            requestTokenEmailSubject: requestTokenEmailSubjectQuery.data.value,
        };
    }
    return <ConfigContext.Provider value={config}>{props.children}</ConfigContext.Provider>;
}

function createSettingQuery(settingName: string): UseQueryOptions<SettingResponse> {
    return {
        queryKey: ['config', settingName],
        queryFn: () => api.settings.getProperty({ name: settingName }),
        retry: false,
        refetchOnWindowFocus: false,
    };
}

function isSuccessQuery(r: UseQueryResult<SettingResponse>): r is QueryObserverSuccessResult<SettingResponse> {
    return r.isSuccess;
}

export function useConfig(): Config | undefined {
    return useContext(ConfigContext);
}

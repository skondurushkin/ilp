import { ReactElement, ReactNode, createContext, useContext } from 'react';

import { useQuery } from 'react-query';

export interface Config {
    adminEmail: string;
    supportSubject: string;
}

const ConfigContext = createContext<Config | undefined>(undefined);

export interface ConfigContextProps {
    children?: ReactNode;
}

export function ConfigProvider(props: ConfigContextProps): ReactElement {
    const query = useQuery('config', () =>
        Promise.resolve<Config>({ adminEmail: 'loyalty-admin@it-one', supportSubject: 'test' }),
    );
    const config = query.isSuccess ? query.data : undefined;
    return <ConfigContext.Provider value={config}>{props.children}</ConfigContext.Provider>;
}

export function useConfig(): Config | undefined {
    return useContext(ConfigContext);
}

import { doGet } from './http';

export interface Greeting {
    greeting: string;
}

export const api = {
    getHello: async (): Promise<Greeting> => {
        const res = await doGet('/api/ilp/hello');
        return res.json();
    },
};

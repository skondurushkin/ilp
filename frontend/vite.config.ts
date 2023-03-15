import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import svgLoader from 'vite-plugin-svgr';

export default ({ mode }) => {
    const env = loadEnv(mode, process.cwd());

    const VITE_ILP_BACKEND_ENDPOINT = env.VITE_ILP_BACKEND_ENDPOINT || 'http://localhost:8191';

    return defineConfig({
        plugins: [react(), svgLoader()],
        server: {
            proxy: {
                '/api': VITE_ILP_BACKEND_ENDPOINT,
            },
        },
    });
};

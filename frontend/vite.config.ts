import { defineConfig, loadEnv } from 'vite';

import Unfonts from 'unplugin-fonts';
import react from '@vitejs/plugin-react';
import svgLoader from 'vite-plugin-svgr';
import vitePluginFaviconsInject from 'vite-plugin-favicons-inject';

export default ({ mode }) => {
    const env = loadEnv(mode, process.cwd());

    const VITE_ILP_BACKEND_ENDPOINT = env.VITE_ILP_BACKEND_ENDPOINT || 'http://localhost:8191';

    return defineConfig({
        plugins: [
            react(),
            svgLoader(),
            Unfonts.vite({
                custom: {
                    families: [
                        {
                            name: 'Lab Grotesque',
                            local: 'Lab Grotesque',
                            src: './src/assets/fonts/*.ttf',
                        },
                    ],
                    display: 'auto',
                    preload: true,
                    prefetch: false,
                    injectTo: 'head-prepend',
                },
            }),
            vitePluginFaviconsInject('./src/assets/favicon.svg'),
        ],
        define: {
            // Some libraries use the global object, even though it doesn't exist in the browser.
            // Alternatively, we could add `<script>window.global = window;</script>` to index.html.
            // https://github.com/vitejs/vite/discussions/5912
            global: {},
        },
        server: {
            proxy: {
                '/api': VITE_ILP_BACKEND_ENDPOINT,
            },
        },
    });
};

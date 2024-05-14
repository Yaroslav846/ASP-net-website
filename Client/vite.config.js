import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import plugin from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [plugin()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    server: {
        watch:{
            usePolling: true
        },
        proxy: {
            '^/submitdata': {
                changeOrigin: true,
                secure: false
            }
        },
        host: true,
        strictPort: true,
        port: 5173
    }
})

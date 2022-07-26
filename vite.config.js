import { fileURLToPath, URL } from 'url'

import { defineConfig } from 'vite'

import Icons from 'unplugin-icons/vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        Icons({
            autoInstall: true,
        }),
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
})

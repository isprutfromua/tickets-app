import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import path from 'node:path'

import vue from '@vitejs/plugin-vue'

export default defineConfig({
    resolve: {
        alias: {
            '~shared': path.resolve(__dirname, './src/shared')
        }
    },
    plugins: [
        vue(),
        AutoImport({
            include: [
                /\.[tj]s?$/, // .ts, .ts, .js, .js
                /\.vue$/,
                /\.vue\?vue/ // .vue
            ],
            dts: 'auto-imports.d.ts',
            imports: ['vue', '@vueuse/core', 'pinia'],
            eslintrc: {
                enabled: true
            }
        }),
        Components()
    ]
})

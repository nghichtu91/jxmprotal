import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import vitePluginImp from 'vite-plugin-imp';
import svgrPlugin from 'vite-plugin-svgr';
import legacy from '@vitejs/plugin-legacy';

// import mkcert from 'vite-plugin-mkcert';

// https://vitejs.dev/config/

export default defineConfig({
  resolve: {
    alias: {
      '@': path.join(__dirname, 'src'),
    },
  },
  plugins: [
    react({
      jsxImportSource: '@emotion/react',
      babel: {
        plugins: ['@emotion/babel-plugin'],
      },
    }),
    // mkcert(),
    vitePluginImp({
      libList: [
        {
          libName: 'lodash',
          libDirectory: '',
          camel2DashComponentName: false,
          style: () => {
            return false;
          },
        },
        {
          libName: 'antd',
        },
      ],
    }),
    svgrPlugin({
      svgrOptions: {
        icon: true,
      },
    }),
    legacy({
      targets: ['defaults', 'not IE 11'],
    }),
  ],
});

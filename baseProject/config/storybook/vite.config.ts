import react from '@vitejs/plugin-react';

import { Plugin, defineConfig } from 'vite';

export function reactNativeWeb(options: { babelPlugins: Array<any> }): Plugin {
  const plugin: Plugin = {
    name: 'vite:react-native-web',
    enforce: 'pre',
    config(_userConfig) {
      return {
        plugins: [
          react({
            babel: {
              plugins: options.babelPlugins,
            },
          }),
        ],
        optimizeDeps: {
          esbuildOptions: {
            jsx: 'transform',
            resolveExtensions: ['.web.js', '.web.ts', '.web.tsx', '.js', '.jsx', '.json', '.ts', '.tsx', '.mjs'],
            loader: {
              '.js': 'jsx',
            },
          },
        },
        resolve: {
          extensions: ['.web.js', '.web.ts', '.web.tsx', '.js', '.jsx', '.json', '.ts', '.tsx', '.mjs'],
          alias: {
            'react-native': 'react-native-web',
          },
        },
      };
    },
  };

  return plugin;
}

export default defineConfig({
  plugins: [
    reactNativeWeb({
      babelPlugins: ['@babel/plugin-proposal-export-namespace-from'],
    }),
  ],
});

import postcss from 'rollup-plugin-postcss';
import html from 'rollup-plugin-string-html';
import typescript from '@rollup/plugin-typescript';
import json from '@rollup/plugin-json';
import cleanup from 'rollup-plugin-cleanup';
import terser from '@rollup/plugin-terser';
import { glob } from 'glob';

export default {
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
      },
    },
  },
  esbuild: {
    target: 'es2022',
  },
  assetsInclude: ['**/*.html'],
  build: {
    minify: true,
    manifest: 'root-manifest.json',
    rollupOptions: {
      input: await glob([
        'src/client/index.ts',
        'src/client/polyfill.ts',
        'src/client/vendor.ts',
      ]),
      output: {
        // format: 'iife',
        name: 'window',
        sourcemap: false,
        extend: true,
      },
      plugins: [
        typescript({
          experimentalDecorators: true,
        }),
        json(),
        postcss({
          extract: false,
          modules: false,
          use: [
            [
              'sass',
              {
                includePaths: ['src/client/style'],
              },
            ],
          ],
          minimize: true,
          extensions: ['.scss', '.css'],
        }),
        html({
          include: ['**/*.html'],
          exclude: ['**/index.html'],
          minifier: {},
        }),
        terser(),
        cleanup({
          comments: 'none',
        }),
      ],
    },
  },
};

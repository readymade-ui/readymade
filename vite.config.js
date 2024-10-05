import postcss from 'rollup-plugin-postcss';
import html from 'rollup-plugin-string-html';
import typescript from '@rollup/plugin-typescript';
import json from '@rollup/plugin-json';
import terser from '@rollup/plugin-terser';

export default {
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
      },
    },
  },
  build: {
    minify: false,
    manifest: 'root-manifest.json',
    rollupOptions: {
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
      ],
      output: {
        name: 'window',
        sourcemap: false,
        extend: true,
      },
    },
  },
};

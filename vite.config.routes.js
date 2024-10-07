import { standardCssModules } from 'vite-plugin-standard-css-modules';
import pkgMinifyHTML from 'rollup-plugin-minify-html-literals';
import { glob } from 'glob';

const minifyHTML = pkgMinifyHTML.default;

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
    ssr: true,
    minify: true,
    manifest: 'manifest.json',
    rollupOptions: {
      input: await glob(['src/client/app/view/**/index.ts']),
      output: {
        name: 'window',
        format: 'esm',
        sourcemap: false,
        extend: true,
      },
      plugins: [
        minifyHTML(),
        standardCssModules({
          include: ['/**/*.css'],
          minify: true,
        }),
      ],
    },
  },
};

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
      plugins: [],
    },
  },
};

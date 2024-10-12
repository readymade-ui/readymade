import { glob } from 'glob';
import { tsconfigPaths } from 'vite-resolve-tsconfig-paths';

export default {
  plugins: [tsconfigPaths()],
  esbuild: {
    format: 'esm',
    target: 'es2022',
  },
  build: {
    ssr: true,
    minify: false,
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

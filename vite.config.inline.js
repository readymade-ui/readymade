import { tsconfigPaths } from 'vite-resolve-tsconfig-paths';
import { viteSingleFile } from 'vite-plugin-singlefile';
export default {
  plugins: [
    tsconfigPaths(),
    {
      name: 'remove-type-module',
      transformIndexHtml(html) {
        return html.replace(
          /<script type="module" crossorigin src="(\/assets\/index-[A-Za-z0-9]+\.js)"><\/script>/g,
          '<script src="$1"></script>'
        );
      },
    },
    viteSingleFile(),
  ],
  esbuild: {
    format: 'esm',
    target: 'es2022',
  },
  rollupOptions: {
    output: {
      name: 'window',
      sourcemap: false,
      extend: true,
    },
  },
  build: {
    minify: false,
    rollupOptions: {
      output: {
        name: 'window',
        sourcemap: false,
        extend: true,
      },
      plugins: [],
    },
  },
};

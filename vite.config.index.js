import { tsconfigPaths } from 'vite-resolve-tsconfig-paths';
// import { viteStaticCopy } from 'vite-plugin-static-copy';

export default {
  esbuild: {
    format: 'esm',
    target: 'es2022',
  },
  plugins: [
    tsconfigPaths(),
    // viteStaticCopy({
    //   targets: [
    //     {
    //       src: 'public/images',
    //       dest: 'images',
    //     },
    //   ],
    // }),
    {
      name: 'remove-type-module',
      transformIndexHtml(html) {
        return html.replace(
          /<script type="module" crossorigin src="(\/assets\/index-[A-Za-z0-9]+\.js)"><\/script>/g,
          '<script src="$1"></script>',
        );
      },
    },
  ],
  build: {
    minify: false,
    manifest: 'manifest-index.json',
    rollupOptions: {
      output: {
        format: 'esm',
        sourcemap: false,
        extend: true,
      },
      plugins: [],
    },
  },
};

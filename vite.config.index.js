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
  plugins: [
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
    minify: true,
    rollupOptions: {
      output: {
        format: 'esm',
        sourcemap: false,
        extend: true,
      },
    },
  },
};

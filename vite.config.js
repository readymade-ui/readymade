export default {
  css: {
    devSourcemap: true,
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
      },
    },
  },
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
};

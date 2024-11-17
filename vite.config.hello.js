import { tsconfigPaths } from 'vite-resolve-tsconfig-paths';

export default {
  plugins: [tsconfigPaths()],
  build: {
    minify: true,
    rollupOptions: {
      input: 'src/client/hello.ts',
    },
  },
};

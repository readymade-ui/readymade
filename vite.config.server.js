import { tsconfigPaths } from 'vite-resolve-tsconfig-paths';

export default {
  plugins: [tsconfigPaths()],
  build: {
    minify: true,
    rollupOptions: {
      external: ['crypto'],
    },
  },
};

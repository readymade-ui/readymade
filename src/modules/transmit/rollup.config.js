import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import cleanup from 'rollup-plugin-cleanup';

const clean = {
  comments: ['none'],
  extensions: ['ts', 'js'],
};

export default [
  {
    input: 'src/modules/transmit/index.ts',
    plugins: [
      resolve(),
      typescript({
        sourceMap: false,
        declarationDir: 'dist/packages/@readymade/transmit/fesm2022/typings',
      }),
      cleanup(clean),
    ],
    onwarn: (warning, next) => {
      if (warning.code === 'THIS_IS_UNDEFINED') return;
      next(warning);
    },
    output: {
      file: 'dist/packages/@readymade/transmit/fesm2022/index.js',
      format: 'esm',
      sourcemap: true,
    },
  },
];

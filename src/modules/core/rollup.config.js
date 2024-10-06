import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import cleanup from 'rollup-plugin-cleanup';
import terser from '@rollup/plugin-terser';

const clean = {
  comments: ['none'],
  extensions: ['ts', 'js']
};

export default [
  {
    input: 'src/modules/core/index.ts',
    plugins: [
      resolve(),
      typescript({
        sourceMap: false,
        declarationDir: 'packages/@readymade/core/fesm2022/typings'
      }),
      cleanup(clean),
    ],
    onwarn: (warning, next) => {
      if (warning.code === 'THIS_IS_UNDEFINED') return;
      next(warning);
    },
    output: {
      file: 'packages/@readymade/core/fesm2022/index.js',
      format: 'esm',
      sourcemap: true
    }
  }
];

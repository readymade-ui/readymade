import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import cleanup from 'rollup-plugin-cleanup';
import { terser } from 'rollup-plugin-terser';

const clean = {
  comments: ['none'],
  extensions: ['ts', 'js']
};

export default [
  {
    input: 'src/modules/core/index.ts',
    plugins: [resolve(), typescript({ declaration: false }), cleanup(clean)],
    onwarn: (warning, next) => {
      if (warning.code === 'THIS_IS_UNDEFINED') return;
      next(warning);
    },
    output: {
      file: 'packages/@readymade/core/fesm2015/core.js',
      format: 'esm',
      sourcemap: false
    }
  },
  {
    input: 'src/modules/core/index.ts',
    plugins: [
      resolve(),
      typescript({
        sourceMap: true
      }),
      cleanup(clean),
      terser()
    ],
    onwarn: (warning, next) => {
      if (warning.code === 'THIS_IS_UNDEFINED') return;
      next(warning);
    },
    output: {
      file: 'packages/@readymade/core/fesm2015/core.min.js',
      format: 'esm',
      sourcemap: true
    }
  },
  {
    input: 'src/modules/core/index.ts',
    plugins: [resolve(), typescript({ declaration: false }), cleanup(clean)],
    onwarn: (warning, next) => {
      if (warning.code === 'THIS_IS_UNDEFINED') return;
      next(warning);
    },
    output: {
      file: 'packages/@readymade/core/bundles/core.js',
      format: 'cjs',
      sourcemap: false
    }
  },
  {
    input: 'src/modules/core/index.ts',
    plugins: [
      resolve(),
      typescript({
        declaration: false,
        sourceMap: true
      }),
      cleanup(clean),
      terser()
    ],
    onwarn: (warning, next) => {
      if (warning.code === 'THIS_IS_UNDEFINED') return;
      next(warning);
    },
    output: {
      file: 'packages/@readymade/core/bundles/core.min.js',
      format: 'cjs',
      sourcemap: true
    }
  }
];

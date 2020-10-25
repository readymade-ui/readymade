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
    input: 'src/modules/dom/index.ts',
    plugins: [resolve(), typescript(), cleanup(clean)],
    onwarn: (warning, next) => {
      if (warning.code === 'THIS_IS_UNDEFINED') return;
      next(warning);
    },
    output: {
      file: 'packages/@readymade/dom/fesm2015/dom.js',
      format: 'esm',
      sourcemap: false
    }
  },
  {
    input: 'src/modules/dom/index.ts',
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
      file: 'packages/@readymade/dom/fesm2015/dom.min.js',
      format: 'esm',
      sourcemap: true
    }
  },
  {
    input: 'src/modules/dom/index.ts',
    plugins: [resolve(), typescript(), cleanup(clean)],
    onwarn: (warning, next) => {
      if (warning.code === 'THIS_IS_UNDEFINED') return;
      next(warning);
    },
    output: {
      file: 'packages/@readymade/dom/bundles/dom.js',
      format: 'cjs',
      sourcemap: false
    }
  },
  {
    input: 'src/modules/dom/index.ts',
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
      file: 'packages/@readymade/dom/bundles/dom.min.js',
      format: 'cjs',
      sourcemap: true
    }
  }
];

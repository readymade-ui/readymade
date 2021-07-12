import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import cleanup from 'rollup-plugin-cleanup';
import { terser } from 'rollup-plugin-terser';

const clean = {
  comments: ['none'],
  extensions: ['ts', 'js']
};

export default [
  {
    input: 'src/modules/ui/index.ts',
    plugins: [resolve(), typescript({ declaration: false }), cleanup(clean)],
    onwarn: (warning, next) => {
      if (warning.code === 'THIS_IS_UNDEFINED') return;
      next(warning);
    },
    output: {
      file: 'packages/@readymade/ui/fesm2015/index.js',
      format: 'esm',
      sourcemap: false
    }
  },
  {
    input: 'src/modules/ui/index.ts',
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
      file: 'packages/@readymade/ui/fesm2015/index.min.js',
      format: 'esm',
      sourcemap: true
    }
  },
  {
    input: 'src/modules/ui/index.ts',
    plugins: [resolve(), typescript({ declaration: false }), cleanup(clean)],
    onwarn: (warning, next) => {
      if (warning.code === 'THIS_IS_UNDEFINED') return;
      next(warning);
    },
    output: {
      file: 'packages/@readymade/ui/bundles/index.js',
      format: 'cjs',
      sourcemap: false
    }
  },
  {
    input: 'src/modules/ui/index.ts',
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
      file: 'packages/@readymade/ui/bundles/index.min.js',
      format: 'cjs',
      sourcemap: true
    }
  }
];

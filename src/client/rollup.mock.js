import cleanup from 'rollup-plugin-cleanup';
import commonjsResolve from '@rollup/plugin-commonjs';
import html from 'rollup-plugin-string-html';
import nodeResolve from '@rollup/plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';

const plugins = [
  nodeResolve({
    mainFields: ['module', 'jsnext']
  }),
  postcss({
    extract: false,
    modules: false,
    use: [
      [
        'sass',
        {
          includePaths: ['src/client/style']
        }
      ]
    ],
    minimize: true,
    extensions: ['.scss', '.css']
  }),
  html({
    include: ['**/*.html'],
    exclude: ['**/index.html'],
    minifier: {}
  }),
  typescript({
    experimentalDecorators: true,
    target: 'es5'
  }),
  commonjsResolve(),
  terser(),
  cleanup({
    comments: 'none'
  })
];

const onwarn = function(message) {
  console.log(message);
};

export default [
  {
    input: 'src/client/app/component/counter.ts',
    output: {
      name: 'counter',
      file: 'dist/client/counter.js',
      format: 'iife'
    },
    treeshake: true,
    external: ['path', 'html-minifier-terser'],
    plugins: plugins,
    onwarn: onwarn
  },
  {
    input: 'src/client/app/component/hello.ts',
    output: {
      name: 'hello',
      file: 'dist/client/hello-world.js',
      format: 'iife'
    },
    treeshake: true,
    external: ['path', 'html-minifier-terser'],
    plugins: plugins,
    onwarn: onwarn
  },
  {
    input: 'src/client/app/component/hello.state.ts',
    output: {
      name: 'statetest',
      file: 'dist/client/hello-state.js',
      format: 'iife'
    },
    treeshake: true,
    external: ['path', 'html-minifier-terser'],
    plugins: plugins,
    onwarn: onwarn
  },
  {
    input: 'src/client/app/component/button.ts',
    output: {
      name: 'button',
      file: 'dist/client/button.js',
      format: 'iife'
    },
    treeshake: true,
    external: ['path', 'html-minifier-terser'],
    plugins: plugins,
    onwarn: onwarn
  }
];

import nodeResolve from '@rollup/plugin-node-resolve';
import commonjsResolve from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss';
import html from 'rollup-plugin-string-html';
import json from '@rollup/plugin-json';

export default [
  {
    input: 'src/client/server.ts',
    treeshake: true,
    external: ['path', 'html-minifier-terser'],
    output: {
      file: 'src/server/view/index.js',
      format: 'esm'
    },
    plugins: [
      nodeResolve({
        mainFields: ['module', 'jsnext']
      }),
      json(),
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
        experimentalDecorators: true
      }),
      commonjsResolve()
    ],
    onwarn: function(message) {
      console.log(message);
    }
  }
];
